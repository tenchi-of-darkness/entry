import * as React from "react";
import Svg, {Defs, Ellipse, G, Mask, Path} from "react-native-svg";
import {Colors} from "@/constants/theme";
import {useColorScheme} from "@/hooks/use-color-scheme";

export const AngryCat = () => {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <Svg
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="1.5"
            clipRule="evenodd"
            viewBox="0 0 128 128"
        >
            <G id="SadCat" transform="matrix(.59143 0 0 2.78764 -192.773 -1162.172)">
                <Path
                    fill={Colors[colorScheme].cats.angry}
                    stroke={Colors[colorScheme].cats.border}
                    strokeWidth="2.28"
                    d="M160.196 920.811c-5.435 25.171 7.451 51.624 23.15 52.129h25.355c14.841-.591 27.999-26.903 21.283-49.798-.199-.679 2.121-30.151-2.8-31.824-4.92-1.672-26.005 19.459-26.005 19.459-3.601-1.319-7.47-1.024-11.461 0 0 0-19.475-21.036-24.395-19.364-4.921 1.672-5.127 29.398-5.127 29.398"
                    transform="matrix(2.22392 0 0 .47183 -.532 .075)"
                ></Path>
                <Path
                    stroke={Colors[colorScheme].cats.insideBorders}
                    strokeWidth="0.89"
                    d="M1022.978 1168.181c5.456 5.331 11.716-.258 11.356-7.511z"
                    transform="matrix(2.22392 0 0 .47183 -1814.025 -111.968)"
                ></Path>
                <Path
                    stroke={Colors[colorScheme].cats.insideBorders}
                    strokeWidth="0.89"
                    d="M1022.978 1168.181c5.456 5.331 11.716-.258 11.356-7.511z"
                    transform="matrix(-2.22392 0 0 .47183 2682.584 -111.968)"
                ></Path>
                <G id="Mouth">
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.insideBorders}
                        strokeWidth="0.89"
                        d="M772.478 1183.244v7.977"
                        transform="matrix(2.22392 0 0 .47183 -1284.743 -111.778)"
                    ></Path>
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.insideBorders}
                        strokeWidth="0.89"
                        d="M872.25 1191.221c-6.822.034-11.317 2.839-13.943 7.869"
                        transform="matrix(2.22392 0 0 .47183 -1506.63 -111.778)"
                    ></Path>
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.insideBorders}
                        strokeWidth="0.89"
                        d="M872.25 1191.221c-6.822.034-11.317 2.839-13.943 7.869"
                        transform="matrix(-2.22392 0 0 .47183 2372.998 -111.778)"
                    ></Path>
                </G>
                <Path
                    id="Nose"
                    stroke={Colors[colorScheme].cats.insideBorders}
                    strokeWidth="0.89"
                    d="m194.517 947.047-4.409-3.353a.495.495 0 0 1 .301-.887l8.339.034a.494.494 0 0 1 .317.871l-3.931 3.319a.49.49 0 0 1-.617.016"
                    transform="matrix(2.22392 0 0 .47183 0 -.613)"
                ></Path>
                <G id="Whiskers-Right">
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.insideBorders}
                        strokeWidth="0.89"
                        d="M205.476 943.062c8.038 1.655 25.812 6.367 33.051 6.69M205.476 939.549c7.441-1.26 33.051-.991 33.051-.991M205.476 941.352c8.038-.032 25.812 2.504 33.051 3.138"
                        transform="matrix(2.22392 0 0 .47183 2.604 1.435)"
                    ></Path>
                </G>
                <G id="Whiskers-Left">
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.insideBorders}
                        strokeWidth="0.89"
                        d="M205.476 943.062c8.038 1.655 25.812 6.367 33.051 6.69M205.476 939.549c7.441-1.26 33.051-.991 33.051-.991M205.476 941.352c8.038-.032 25.812 2.504 33.051 3.138"
                        transform="matrix(-2.22392 0 0 .47183 865.708 1.435)"
                    ></Path>
                </G>
            </G>
        </Svg>
    );
};