
import { useEffect, useState } from "react";
import { loadMoodData } from "@/lib/storage/moodStorage";
import { MoodState } from "@/lib/mood/week-mood-state";
import { loadRateData } from "@/lib/storage/rateStorage";
import { RateState } from "@/lib/rate/week-rate-state";
import { loadSleepData } from "@/lib/storage/sleepStorage";
import { MonthSleepState } from "@/hooks/use-sleep-reducer";
import { loadPagesData } from "@/lib/storage/pagesStorage";
import { MonthPagesState } from "@/hooks/use-pages-reducer";
import { loadBooksData } from "@/lib/storage/booksStorage";
import { BooksState } from "@/hooks/use-books-reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRefresh } from "@/contexts/refresh-context";

const DIARY_CONTENT_KEY = 'diary_content_v1';

// ... (all the async getLast...Date functions remain the same)
async function getLastMoodDate(): Promise<Date | null> {
    const data = await loadMoodData<MoodState>();
    if (!data) return null;

    let lastDate: Date | null = null;
    for (const weekYear in data) {
        const week = data[weekYear];
        for (const day in week) {
            const dayData = week[day];
            if (dayData) {
                for (const measurement of dayData.measurements) {
                    const measurementDate = new Date(measurement.date);
                    if (!lastDate || measurementDate > lastDate) {
                        lastDate = measurementDate;
                    }
                }
            }
        }
    }
    return lastDate;
}

async function getLastRateDate(): Promise<Date | null> {
    const data = await loadRateData<RateState>();
    if (!data) return null;

    let lastDate: Date | null = null;
    for (const weekYear in data) {
        const week = data[weekYear];
        for (const day in week) {
            const dayData = week[day];
            if (dayData) {
                for (const measurement of dayData.measurements) {
                    const measurementDate = new Date(measurement.date);
                    if (!lastDate || measurementDate > lastDate) {
                        lastDate = measurementDate;
                    }
                }
            }
        }
    }
    return lastDate;
}

async function getLastSleepDate(): Promise<Date | null> {
    const data = await loadSleepData<MonthSleepState>();
    if (!data || !Array.isArray(data)) return null;

    let lastDate: Date | null = null;
    for (const day of data) {
        if (day && day.measurements) {
            for (const measurement of day.measurements) {
                const measurementDate = new Date(measurement.timestamp);
                if (!lastDate || measurementDate > lastDate) {
                    lastDate = measurementDate;
                }
            }
        }
    }
    return lastDate;
}

async function getLastPagesDate(): Promise<Date | null> {
    const data = await loadPagesData<MonthPagesState>();
    if (!data || !Array.isArray(data)) return null;

    let lastDate: Date | null = null;
    for (const day of data) {
        if (day && day.measurements) {
            for (const measurement of day.measurements) {
                const measurementDate = new Date(measurement.timestamp);
                if (!lastDate || measurementDate > lastDate) {
                    lastDate = measurementDate;
                }
            }
        }
    }
    return lastDate;
}

async function getLastBooksDate(): Promise<Date | null> {
    const data = await loadBooksData<BooksState>();
    if (!data || !Array.isArray(data)) return null;

    let lastDate: Date | null = null;
    for (const book of data) {
        const bookDate = new Date(book.date);
        if (!lastDate || bookDate > lastDate) {
            lastDate = bookDate;
        }
    }
    return lastDate;
}

async function getLastDiaryDate(): Promise<Date | null> {
    const content = await AsyncStorage.getItem(DIARY_CONTENT_KEY);
    if (!content) return null;

    const dateMarkers = content.match(/--- (\d{4}-\d{2}-\d{2}) ---/g);
    if (!dateMarkers) return null;

    let lastDate: Date | null = null;
    for (const marker of dateMarkers) {
        const dateString = marker.substring(4, 14);
        const date = new Date(dateString);
        // The date in the diary is just a date, so we should add time to it to make sure it's not in the past.
        date.setHours(23, 59, 59, 999);
        if (!lastDate || date > lastDate) {
            lastDate = date;
        }
    }
    return lastDate;
}


export function useLastEntryDate(feature: string): Date | null | undefined {
    const [lastUpdate, setLastUpdate] = useState<Date | null>();
    const { refreshCount } = useRefresh();

    useEffect(() => {
        let isMounted = true;
        async function fetchLastDate() {
            let date: Date | null = null;
            try {
                switch (feature.toLowerCase()) {
                    case "mood":
                        date = await getLastMoodDate();
                        break;
                    case "day":
                        date = await getLastRateDate();
                        break;

                    case "sleep":
                        date = await getLastSleepDate();
                        break;
                    case "diary":
                        date = await getLastDiaryDate();
                        break;
                    case "pages":
                        date = await getLastPagesDate();
                        break;
                    case "books":
                        date = await getLastBooksDate();
                        break;
                }
            } catch (e) {
                // If any of the above functions throw an error, we'll catch it here.
                // For debugging, we can log this. In production, you might want better error handling.
                console.error(`Failed to fetch last entry date for ${feature}`, e);
                // We'll set the date to null to indicate no valid entry could be found.
                date = null;
            }

            if (isMounted) {
                setLastUpdate(date);
            }
        }

        if (feature) {
            fetchLastDate();
        } else {
            // For empty features (like from the placeholder cards), we can immediately set it to null.
            setLastUpdate(null);
        }

        return () => {
            isMounted = false;
        };
    }, [feature, refreshCount]);

    // Returns undefined when loading, null if no entry, Date if entry exists
    return lastUpdate;
}
