import { WordStatus } from "./word-status.enum"

export interface WordData {
    id: number
    word: string
    status: WordStatus
}
