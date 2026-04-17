import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, OnInit, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { WordList } from '../../models/word-list.interface';
import { HttpClient } from '@angular/common/http';
import { WordStatus } from '../../models/word-status.enum';
import { WordData } from '../../models/word-data.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Timer } from "../timer/timer";
import { ResultsData } from '../../models/results-data.interface';
import { Results } from "./results/results";

const INIT_WORD_COUNT = 50

@Component({
    selector: 'app-typing-widget',
    imports: [ReactiveFormsModule, Timer, Results],
    templateUrl: './typing-widget.html',
    styleUrl: './typing-widget.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypingWidget implements OnInit {
    @Input()
    public wordListUrl!: string
    @ViewChildren('wordSpan')
    public wordSpans!: QueryList<ElementRef<HTMLSpanElement>>
    @ViewChild('wordContainer')
    public wordContainer!: ElementRef<HTMLDivElement>
    @ViewChild('timer')
    public timer!: Timer

    public inputControl = new FormControl('')
    public badInput = signal(false)
    public wordListReady = signal(false)
    public currentWords = signal<WordData[]>([])
    public currentWordIdx = 0

    public showResults = signal(false)
    private _nextResults: ResultsData = {
        correctWords: 0,
        incorrectWords: 0,
        minutesElapsed: 0,
    }
    public resultsData = signal<ResultsData>(this._nextResults)

    private _wordList?: WordList

    private _http = inject(HttpClient)

    ngOnInit(): void {
        this.inputControl.disable()
        this._http.get(this.wordListUrl).subscribe((wordList: any) => {
            this._wordList = wordList
            this.initWords()
            this.wordListReady.set(true)
        });
    }

    private initWords() {
        this._nextResults = {
            correctWords: 0,
            incorrectWords: 0,
            minutesElapsed: 0,
        }
        this.showResults.set(false)
        this.inputControl.setValue('')
        this.inputControl.enable()
        this.badInput.set(false)
        this.currentWords.set([])
        this.currentWordIdx = 0
        for(let i = 0; i < INIT_WORD_COUNT; i++) {
            this.generateWord()
        }
    }

    private generateWord() {
        if(this._wordList == undefined) return;
        const randomWordIdx = Math.floor(Math.random() * this._wordList.words.length)
        const randomWord = this._wordList.words[randomWordIdx]
        const wordData: WordData = {
            word: randomWord,
            status: WordStatus.QUEUED,
        }
        this.currentWords.update((currentWords) => [...currentWords, wordData])
    }

    public onInput() {
        const input = this.inputControl.value
        if(input === null) return
        if (/[\s\n]/.test(input)) {
            this.submitWord()
            this.badInput.set(false)
        } else {
            const currentWord = this.currentWords()[this.currentWordIdx]
            this.badInput.set(!currentWord.word.toLowerCase().startsWith(input.toLowerCase()))
        }

        if(!this.timer.isTimerRunning) {
            this.timer.start()
        }
    }

    public onTimeout(minutes: number) {
        this._nextResults.minutesElapsed = minutes
        this.resultsData.set(this._nextResults)
        this.showResults.set(true)
        this.inputControl.disable()
    }

    public onTimerReset() {
        this.initWords()
    }

    public submitWord() {
        const word = this.inputControl.value?.trim()
        if(word == null) return

        // Update current word status
        this.inputControl.setValue('', { emitEvent: false })
        const currentWord = this.currentWords()[this.currentWordIdx]
        if(word.toLowerCase() === currentWord.word.toLowerCase()) {
            currentWord.status = WordStatus.CORRECT
            this._nextResults.correctWords += 1
        } else {
            currentWord.status = WordStatus.INCORRECT
            this._nextResults.incorrectWords += 1
        }
        this.currentWords.update((currentWords) => {
            const newWords = [...currentWords]
            newWords[this.currentWordIdx] = currentWord
            return newWords
        })

        // Scroll to next word
        this.currentWordIdx += 1
        const nextWord = this.currentWords()[this.currentWordIdx]

        const currentWordSpanRef = this.wordSpans.toArray().find((spanRef) => {
            const span = spanRef.nativeElement
            return span.innerText.trim() === nextWord.word && !span.classList.contains('correct') && !span.classList.contains('incorrect')
        })
        if(currentWordSpanRef !== undefined) {
            this.wordContainer.nativeElement.scrollTo({
                top: currentWordSpanRef.nativeElement.offsetTop - this.wordContainer.nativeElement.offsetTop,
                behavior: 'smooth',
            })
        }

        this.generateWord()
    }
}
