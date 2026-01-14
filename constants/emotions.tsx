import {HappyCat} from "@/components/icons/cats/happy-cat";
import {AngryCat} from "@/components/icons/cats/angry-cat";
import {SadCat} from "@/components/icons/cats/sad-cat";
import {AnxiousCat} from "@/components/icons/cats/anxious-cat";
import {LonelyCat} from "@/components/icons/cats/lonely-cat";
import {ExcitedCat} from "@/components/icons/cats/excited-cat";
import {CalmCat} from "@/components/icons/cats/calm-cat";
import {ProudCat} from "@/components/icons/cats/proud-cat";
import {ShockedCat} from "@/components/icons/cats/shocked-cat";
import {OkayCat} from "@/components/icons/cats/okay-cat";

export const Emotion = {
    Happy: "happy",
    Excited: "excited",
    Calm: "calm",
    Okay: "okay",
    Proud: "proud",
    Anxious: "anxious",
    Shocked: "shocked",
    Lonely: "lonely",
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
        case Emotion.Lonely:
            return <LonelyCat/>;
        case Emotion.Excited:
            return <ExcitedCat/>;
        case Emotion.Calm:
            return <CalmCat/>;
        case Emotion.Proud:
            return <ProudCat/>;
        case Emotion.Shocked:
            return <ShockedCat/>;
        case Emotion.Okay:
            return <OkayCat/>;
    }
}