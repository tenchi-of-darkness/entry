import { useReducer } from "react";
import { MoodState, WeekMoodState } from "@/lib/mood/week-mood-state";
import { Emotion } from "@/constants/emotions";

const MaxMeasurements = 3;

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

            const newMeasurements = [...week[action.dayOfWeek]?.measurements];

            if(newMeasurements.length === MaxMeasurements){
                return state;
            }

            newMeasurements.push({emotion: action.emotion, date: new Date()});

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