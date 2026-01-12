import {DayMoodState} from "@/lib/mood/day-mood-state";

export interface WeekMoodState {
    [dayOfWeek: number]: DayMoodState;
}

export type MoodState = {[weekYear: string]: WeekMoodState};