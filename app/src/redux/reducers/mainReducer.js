import {
    UPDATE_CHAPTER_LIST,
    UPDATE_BOOK
} from '../constants/mainConstants'

const defaultState = {
    chapterList:[],
    currentBook:null,
}

export default function (state = defaultState, action) {
    switch (action.type) {
        case UPDATE_CHAPTER_LIST:
        return {
            ...state,
            chapterList:action.data
        }
        case UPDATE_BOOK:
        return {
            ...state,
            currentBook:action.data
        }
        default:
            return state
    }
}