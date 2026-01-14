import { useReducer } from "react";
import { MoodState, WeekMoodState } from "@/lib/mood/week-mood-state";
import { Emotion } from "@/constants/emotions";

const MaxMeasurements = 1;

export function createEmptyWeekMoodState(): WeekMoodState {
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

export enum MoodActionKind {
    add = "add",
    update = "update",
    hydrate = "hydrate",
}

export type MoodAction =
    | {
    type: MoodActionKind.add;
    dayOfWeek: number;
    weekYear: string;
    emotion: Emotion;
}
    | {
    type: MoodActionKind.update;
    dayOfWeek: number;
    weekYear: string;
    index: number;
    emotion: Emotion;
}
    | {
    type: MoodActionKind.hydrate;
    weekYear: string;
    state: MoodState;
};

function moodReducer(state: MoodState, action: MoodAction): MoodState {
    switch (action.type) {
        case MoodActionKind.add: {
            const week =
                state[action.weekYear] ??
                createEmptyWeekMoodState();

            const newMeasurements = [
                ...(week[action.dayOfWeek]?.measurements ?? []),
                {
                    emotion: action.emotion,
                    date: new Date(),
                },
            ].slice(-MaxMeasurements);

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

        case MoodActionKind.update: {
            const { weekYear, dayOfWeek, index, emotion } = action;

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
                                    ? { ...m, emotion }
                                    : m
                        ),
                    },
                },
            };
        }

        case MoodActionKind.hydrate: {
            return {
                ...action.state,
                [action.weekYear]:
                    action.state[action.weekYear] ??
                    createEmptyWeekMoodState(),
            };
        }
        default:
            return state;
    }
}

export function useMoodReducer() {
    return useReducer(moodReducer, {});
}