import { useReducer } from "react";
import { BookMeasurement } from "@/lib/books/book-measurement";
import {randomUUID} from "expo-crypto";

export type BooksState = BookMeasurement[];

export enum BooksActionKind {
    add = "add",
    update = "update",
    remove = "remove",
    hydrate = "hydrate",
}

export type BooksAction =
    | {
    type: BooksActionKind.add;
    title: string;
    author: string;
    note: string;
    rating: number;
}
    | {
    type: BooksActionKind.update;
    book: BookMeasurement;
}
    | {
    type: BooksActionKind.remove;
    id: string;
}
    | {
    type: BooksActionKind.hydrate;
    state: BooksState;
};

function booksReducer(state: BooksState, action: BooksAction): BooksState {
    switch (action.type) {
        case BooksActionKind.add: {
            const newBook: BookMeasurement = {
                id: randomUUID(),
                title: action.title,
                author: action.author,
                note: action.note,
                rating: action.rating,
                date: new Date(),
            };
            return [...state, newBook];
        }

        case BooksActionKind.update: {
            return state.map((book) =>
                book.id === action.book.id ? { ...action.book, date: new Date() } : book
            );
        }

        case BooksActionKind.remove: {
            return state.filter((book) => book.id !== action.id);
        }

        case BooksActionKind.hydrate: {
            if (!action.state) return [];
            return action.state.map(b => ({...b, date: new Date(b.date)}));
        }

        default:
            return state;
    }
}

export function useBooksReducer() {
    return useReducer(booksReducer, []);
}
