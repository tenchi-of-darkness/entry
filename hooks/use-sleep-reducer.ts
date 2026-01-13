import React from "react";

export interface SleepMeasurement {
    hours: number;
    timestamp: string;
}

export interface SleepState {
    measurements: SleepMeasurement[];
}

export type MonthSleepState = SleepState[];

export enum SleepActionKind {
    add = "add",
    hydrate = "hydrate",
}

export interface SleepAction {
    type: SleepActionKind.add;
    dayOfMonth: number;
    hours: number;
}

export interface HydrateSleepAction {
    type: SleepActionKind.hydrate;
    state: MonthSleepState;
}

const initialSleepState: MonthSleepState = Array.from({ length: 31 }, () => ({ measurements: [] }));

export function sleepReducer(
    state: MonthSleepState,
    action: SleepAction | HydrateSleepAction
): MonthSleepState {
    switch (action.type) {
        case SleepActionKind.hydrate:
            // Ensure the hydrated state has entries for all 31 days
            if (action.state.length < 31) {
                const newState = [...action.state];
                while (newState.length < 31) {
                    newState.push({ measurements: [] });
                }
                return newState;
            }
            return action.state;
        case SleepActionKind.add:
            const newMeasurement: SleepMeasurement = {
                hours: action.hours,
                timestamp: new Date().toISOString(),
            };
            const dayIndex = action.dayOfMonth - 1;
            const newState = [...state];
            newState[dayIndex] = {
                measurements: [newMeasurement], // For now, only one measurement per day
            };
            return newState;
        default:
            return state;
    }
}

export function useSleepReducer() {
    return React.useReducer(sleepReducer, initialSleepState);
}
