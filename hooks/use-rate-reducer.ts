import { useReducer } from "react";
import {RateState, WeekRateState} from "@/lib/rate/week-rate-state";

const MaxMeasurements = 1;

export function createEmptyWeekRateState(): WeekRateState {
    return {
        1: { measurements: [] },
        2: { measurements: [] },
        3: { measurements: [] },
        4: { measurements: [] },
        5: { measurements: [] },
        6: { measurements: [] },
        7: { measurements: [] },
    };
}

export enum RateActionKind {
    add = "add",
    update = "update",
    hydrate = "hydrate",
}

export type RateAction =
    | {
    type: RateActionKind.add;
    dayOfWeek: number;
    weekYear: string;
    rating: number;
}
    | {
    type: RateActionKind.update;
    dayOfWeek: number;
    weekYear: string;
    index: number;
    rating: number;
}
    | {
    type: RateActionKind.hydrate;
    weekYear: string;
    state: RateState;
};

function rateReducer(state: RateState, action: RateAction): RateState {
    switch (action.type) {
        case RateActionKind.add: {
            const week =
                state[action.weekYear] ??
                createEmptyWeekRateState();

            const newMeasurements = [
                {
                    rating: action.rating,
                    date: new Date(),
                }
            ];

            return {
                ...state,
                [action.weekYear]: {
                    ...week,
                    [action.dayOfWeek]: {
                        measurements: newMeasurements,
                    },
                },
            };
        }

        case RateActionKind.update: {
            const { weekYear, dayOfWeek, index, rating } = action;

            const week = state[weekYear];
            if (!week) return state;

            const measurement = week[dayOfWeek].measurements[index];
            if (!measurement) return state;

            const cutoffTime = new Date();
            cutoffTime.setHours(cutoffTime.getHours() - 2);

            if (measurement.date <= cutoffTime) {
                return state;
            }

            return {
                ...state,
                [weekYear]: {
                    ...week,
                    [dayOfWeek]: {
                        measurements: week[dayOfWeek].measurements.map(
                            (m, i) =>
                                i === index
                                    ? { ...m, rating }
                                    : m
                        ),
                    },
                },
            };
        }

        case RateActionKind.hydrate: {
            return action.state;
        }

        default:
            return state;
    }
}

export function useRateReducer() {
    return useReducer(rateReducer, {});
}