import React from "react";

export interface PagesMeasurement {
    pages: number;
    timestamp: string;
}

export interface PagesState {
    measurements: PagesMeasurement[];
}

export type MonthPagesState = PagesState[];

export enum PagesActionKind {
    add = "add",
    hydrate = "hydrate",
}

export interface PagesAction {
    type: PagesActionKind.add;
    dayOfMonth: number;
    pages: number;
}

export interface HydratePagesAction {
    type: PagesActionKind.hydrate;
    state: MonthPagesState;
}

const initialPagesState: MonthPagesState = Array.from({ length: 31 }, () => ({ measurements: [] }));

export function pagesReducer(
    state: MonthPagesState,
    action: PagesAction | HydratePagesAction
): MonthPagesState {
    switch (action.type) {
        case PagesActionKind.hydrate:
            if (action.state.length < 31) {
                const newState = [...action.state];
                while (newState.length < 31) {
                    newState.push({ measurements: [] });
                }
                return newState;
            }
            return action.state;
        case PagesActionKind.add:
            const newMeasurement: PagesMeasurement = {
                pages: action.pages,
                timestamp: new Date().toISOString(),
            };
            const dayIndex = action.dayOfMonth - 1;
            const newState = [...state];
            newState[dayIndex] = {
                measurements: [newMeasurement],
            };
            return newState;
        default:
            return state;
    }
}

export function usePagesReducer() {
    return React.useReducer(pagesReducer, initialPagesState);
}
