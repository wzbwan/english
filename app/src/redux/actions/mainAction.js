import {
    UPDATE_CHAPTER_LIST,
    UPDATE_BOOK
} from '../constants/mainConstants'

export function updateChapterList(data){
    return {
        type: UPDATE_CHAPTER_LIST,
        data: data,
    }
}

export function updateBook(data){
    return {
        type: UPDATE_BOOK,
        data: data,
    }
}