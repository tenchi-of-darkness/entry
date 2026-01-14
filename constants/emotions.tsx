import {HappyCat} from "@/components/icons/cats/happy-cat";
import {AngryCat} from "@/components/icons/cats/angry-cat";
import {SadCat} from "@/components/icons/cats/sad-cat";
import {AnxiousCat} from "@/components/icons/cats/anxious-cat";

export const Emotion = {
    Happy: "happy",
    // Energetic: "energetic",
    // Calm: "calm",
    // Okay: "okay",
    // Tired: "tired",
    Anxious: "anxious",
    // Stressed: "stressed",
    // Lonely: "lonely",
    Sad: "sad",
    Angry: "angry",
} as const;

export type Emotion = typeof Emotion[keyof typeof Emotion];

export function getEmotionEnumValues() {
    return Object.values(Emotion) as Emotion[]
}

export function getEmotionTitle(emotion: Emotion) {
    return String(emotion).charAt(0).toUpperCase() + String(emotion).slice(1).toLowerCase()
}

export function getEmotionIcon(emotion: Emotion) {
    switch (emotion) {
        case Emotion.Happy:
            return <HappyCat/>;
        case Emotion.Angry:
            return <AngryCat/>;
        case Emotion.Sad:
            return <SadCat/>;
        case Emotion.Anxious:
            return <AnxiousCat/>;
    }
}