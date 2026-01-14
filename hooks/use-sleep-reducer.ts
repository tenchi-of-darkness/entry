import React from "react";

export function createEmptyMonthSleepState(): MonthSleepState {
    return Array.from({ length: 31 }, () => ({
        measurements: [],
    }));
}

export const initialSleepState: MonthSleepState =
    createEmptyMonthSleepState();

export interface SleepMeasurement {
    timestamp: string;
    hours: number;
    dayOfWeek: number;
    weekYear: number;
}

export interface SleepState {
    measurements: SleepMeasurement[];
}

export type MonthSleepState = SleepState[];

export enum SleepActionKind {
    add = "add",
    hydrate = "hydrate",
    update = "update",
}

export type SleepAction =
    | {
    type: SleepActionKind.add;
    dayOfMonth: number;
    dayOfWeek: number;
    weekYear: number;
    hours: number;
}
    | {
    type: SleepActionKind.update;
    dayOfMonth: number;
    index: number;
    hours: number;
}
    | {
    type: SleepActionKind.hydrate;
    state: MonthSleepState;
};

export function sleepReducer(
    state: MonthSleepState,
    action: SleepAction
): MonthSleepState {
    switch (action.type) {
        case SleepActionKind.hydrate:
            return action.state.length === 31
                ? action.state
                : createEmptyMonthSleepState();

        case SleepActionKind.add: {
            const dayIndex = action.dayOfMonth - 1;
            if (dayIndex < 0 || dayIndex > 30) return state;

            const newMeasurement: SleepMeasurement = {
                timestamp: new Date().toISOString(),
                hours: action.hours,
                dayOfWeek: action.dayOfWeek,
                weekYear: action.weekYear,
            };

            const newState = [...state];
            newState[dayIndex] = {
                measurements: [
                    ...newState[dayIndex].measurements,
                    newMeasurement,
                ],
            };

            return newState;
        }

        case SleepActionKind.update: {
            const dayIndex = action.dayOfMonth - 1;
            if (dayIndex < 0 || dayIndex > 30) return state;

            const day = state[dayIndex];
            if (!day) return state;

            if (!day.measurements[action.index]) return state;

            const newMeasurements = day.measurements.map((m, i) =>
                i === action.index ? { ...m, hours: action.hours } : m
            );

            const newState = [...state];
            newState[dayIndex] = { measurements: newMeasurements };

            return newState;
        }

        default:
            return state;
    }
}

export function useSleepReducer() {
    return React.useReducer(sleepReducer, initialSleepState);
}
