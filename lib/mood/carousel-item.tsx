import React from "react";
import {Emotion} from "@/constants/emotions";

export interface CarouselItem {
    id: string;
    Icon: React.ReactElement;
    emotion: Emotion;
}