import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { WordList } from '../../models/word-list.interface';
import { HttpClient } from '@angular/common/http';
import { WordStatus } from '../../models/word-status.enum';
import { WordData } from '../../models/word-data.interface';

const INIT_WORD_COUNT = 50

@Component({
    selector: 'app-typing-widget',
    imports: [],
    templateUrl: './typing-widget.html',
    styleUrl: './typing-widget.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypingWidget implements OnInit {
    @Input()
    public wordListUrl!: string
    @ViewChildren('wordSpan')
    public wordSpans!: QueryList<ElementRef>

    public wordListReady = signal(false)
    public currentWords = signal<WordData[]>([])
    public currentWordIdx = 0
    public inputValue = ''

    private _wordList?: WordList

    constructor(private _http: HttpClient) {}

    ngOnInit(): void {
        this._http.get(this.wordListUrl).subscribe((wordList: any) => {
            this._wordList = wordList
            for(let i = 0; i < INIT_WORD_COUNT; i++) {
                this.generateWord()
            }
            this.wordListReady.set(true)
        });
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

    public onInput(event: Event) {
        const input = event.target as HTMLInputElement
        if (/[\s\n]/.test(input.value)) {
            this.wordEntered(this.inputValue)
            this.inputValue = ''
            input.value = ''
        } else {
            this.inputValue = input.value
        }
    }

    private wordEntered(word: string) {
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
        this.currentWordIdx += 1
        const nextWord = this.currentWords()[this.currentWordIdx]

        const currentWordSpanRef = this.wordSpans.toArray().find((spanRef) => {
            const span: HTMLSpanElement = spanRef.nativeElement
            return span.innerText.trim() === nextWord.word && !span.classList.contains('correct') && !span.classList.contains('incorrect')
        })
        const currentWordSpan: HTMLSpanElement = currentWordSpanRef?.nativeElement
        currentWordSpan.scrollIntoView({ behavior: 'smooth', block: 'start' })

        this.generateWord()
    }
}
