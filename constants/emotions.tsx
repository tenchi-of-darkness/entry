import {HappyCat} from "@/components/icons/cats/happy-cat";
import {AngryCat} from "@/components/icons/cats/angry-cat";
import {SadCat} from "@/components/icons/cats/sad-cat";

export enum Emotion {
    Happy,
    Energetic,
    Calm,
    Okay,
    Tired,
    Anxious,
    Stressed,
    Lonely,
    Sad,
    Angry,
}

export function getEmotionIcon(emotion: Emotion) {
    switch (emotion) {
        case Emotion.Happy:
            return <HappyCat/>;
        case Emotion.Angry:
            return <AngryCat/>;
        case Emotion.Sad:
            return <SadCat/>;
    }
}

export function getEmotionTitle(emotion: Emotion) {
    return Emotion[emotion]
}