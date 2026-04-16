import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, OnInit, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { WordList } from '../../models/word-list.interface';
import { HttpClient } from '@angular/common/http';
import { WordStatus } from '../../models/word-status.enum';
import { WordData } from '../../models/word-data.interface';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Timer } from "../timer/timer";

const INIT_WORD_COUNT = 50

@Component({
    selector: 'app-typing-widget',
    imports: [ReactiveFormsModule, Timer],
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

    public wordListReady = signal(false)
    public currentWords = signal<WordData[]>([])
    public currentWordIdx = 0
    public inputValue = ''

    private _wordList?: WordList

    private _http = inject(HttpClient)

    ngOnInit(): void {
        this._http.get(this.wordListUrl).subscribe((wordList: any) => {
            this._wordList = wordList
            this.initWords()
            this.wordListReady.set(true)
        });
    }

    private initWords() {
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

    public submitWord(input: HTMLInputElement) {
        this.wordEntered(this.inputValue)
        this.inputValue = ''
        input.value = ''
    }

    public onInput(event: Event) {
        const input = event.target as HTMLInputElement
        if (/[\s\n]/.test(input.value)) {
            this.submitWord(input)
        } else {
            this.inputValue = input.value
            const currentWord = this.currentWords()[this.currentWordIdx]
            if(!input.classList.contains('incorrect') && !currentWord.word.startsWith(this.inputValue)) {
                input.classList.add('incorrect')
            } else if(input.classList.contains('incorrect') && currentWord.word.startsWith(this.inputValue)) {
                input.classList.remove('incorrect')
            }
        }

        if(!this.timer.isTimerRunning) {
            this.timer.start()
        }
    }

    public onTimeout() {
        // TODO: Show results
        // TODO: Clear input
    }

    public onTimerReset() {
        // TODO: Clear input
        this.initWords()
    }

    private wordEntered(word: string) {
        // Update current word status
        const currentWord = this.currentWords()[this.currentWordIdx]
        if(word.toLowerCase() === currentWord.word.toLowerCase()) {
            currentWord.status = WordStatus.CORRECT
        } else {
            currentWord.status = WordStatus.INCORRECT
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
