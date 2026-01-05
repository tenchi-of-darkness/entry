import React, {useReducer, useState} from "react";
import {useColorScheme} from "@/hooks/use-color-scheme";
import {StyleSheet} from "react-native";
import {Colors} from "@/constants/theme";
import {HeartButtonSize} from "@/components/heart-button";
import {WeekMoodState} from "@/lib/mood/week-mood-state";
import {Emotion} from "@/constants/emotions";
import {MoodState} from "@/lib/mood/mood-state";

const MaxMeasurements = 3;

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
}

export type MoodAction = {
    type: MoodActionKind.add;
    dayOfWeek: number;
    emotion: Emotion;
} | {
    type: MoodActionKind.update;
    dayOfWeek: number;
    index: number;
    emotion: Emotion;
}

function moodReducer(state: WeekMoodState, action: MoodAction) {
    const type = action.type;
    const emotion = action.emotion;
    const dayOfWeek = action.dayOfWeek;

    switch (type) {
        case MoodActionKind.add:
            if (state[dayOfWeek].measurements.length >= MaxMeasurements) {
                return state;
            }
        {
            let newState = {...state};
            newState[dayOfWeek].measurements.push({
                emotion: emotion,
                date: new Date(),
            })
            return newState;
        }
        case MoodActionKind.update:
            const index = action.index;
            const cutoffTime = new Date();
            cutoffTime.setHours(cutoffTime.getHours() - 2);
            if (!state[dayOfWeek].measurements[index] || state[dayOfWeek].measurements[index].date <= cutoffTime) {
                return state;
            }
        {
            let newState = {...state};

            newState[dayOfWeek].measurements[index] = {
                emotion: emotion,
                date: state[dayOfWeek].measurements[index].date
            };
            return newState;
        }
        default:
            return state;
    }
}

export function useMoodReducer() {
    const [moodData, setMoodData] = useReducer(moodReducer, EmptyWeekMoodState);
    return [moodData, setMoodData]
}