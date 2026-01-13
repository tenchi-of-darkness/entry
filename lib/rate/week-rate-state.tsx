import {DayRateState} from "@/lib/rate/day-rate-state";

export interface WeekRateState {
    [dayOfWeek: number]: DayRateState;
}

export type RateState = {[weekYear: string]: WeekRateState};