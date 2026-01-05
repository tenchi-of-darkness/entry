import {MoodState} from "@/lib/mood/mood-state";

export interface WeekMoodState {
    [dayOfWeek: number]: MoodState;
}