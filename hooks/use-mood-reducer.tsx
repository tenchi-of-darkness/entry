import {useReducer} from "react";
import {MoodState, WeekMoodState} from "@/lib/mood/week-mood-state";
import {Emotion} from "@/constants/emotions";

const MaxMeasurements = 1;

export const EmptyWeekMoodState: WeekMoodState = {
    1: {
        measurements: []
    },
    2: {
        measurements: []
    },
    3: {
        measurements: []
    },
    4: {
        measurements: []
    },
    5: {
        measurements: []
    },
    6: {
        measurements: []
    },
    7: {
        measurements: []
    },
}

export enum MoodActionKind {
    add = "add",
    update = "update",
    hydrate = "hydrate",
}

export type MoodAction = {
    type: MoodActionKind.add;
    dayOfWeek: number;
    weekYear: string;
    emotion: Emotion;
} | {
    type: MoodActionKind.update;
    dayOfWeek: number;
    weekYear: string;
    index: number;
    emotion: Emotion;
} | {
    type: MoodActionKind.hydrate;
    weekYear: string;
    state: MoodState;
}

function moodReducer(state: MoodState, action: MoodAction) {
    const type = action.type;

    switch (type) {
        case MoodActionKind.add:
            if (state[action.weekYear]===undefined){
                state[action.weekYear]=EmptyWeekMoodState;
            }
            if (state[action.weekYear][action.dayOfWeek].measurements.length >= MaxMeasurements) {
                return state;
            }
        {

            let newState = {...state};
            newState[action.weekYear][action.dayOfWeek].measurements.push({
                emotion: action.emotion,
                date: new Date(),
            })
            return newState;
        }
        case MoodActionKind.update:
            const index = action.index;
            const cutoffTime = new Date();
            cutoffTime.setHours(cutoffTime.getHours() - 2);
            if (!state[action.weekYear][action.dayOfWeek].measurements[index] || state[action.weekYear][action.dayOfWeek].measurements[index].date <= cutoffTime) {
                return state;
            }
        {
            const emotion = action.emotion;
            const dayOfWeek = action.dayOfWeek;

            let newState = {...state};

            newState[action.weekYear][dayOfWeek].measurements[index] = {
                emotion: emotion,
                date: state[action.weekYear][dayOfWeek].measurements[index].date
            };
            return newState;
        }
        case MoodActionKind.hydrate:
            if (action.state[action.weekYear]===undefined){
                action.state[action.weekYear]=EmptyWeekMoodState;
            }
            return action.state;
        default:
            return state;
    }
}

export function useMoodReducer() {
    return useReducer(moodReducer, {})
}