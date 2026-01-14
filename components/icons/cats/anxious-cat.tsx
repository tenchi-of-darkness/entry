import * as React from "react";
import Svg, {Ellipse, G, Path, SvgProps} from "react-native-svg";
import {Colors} from "@/constants/theme";
import {useColorScheme} from "@/hooks/use-color-scheme";

export const AnxiousCat = (props: SvgProps) => {
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
            <G
                id="AnxiousCat"
                transform="matrix(.59143 0 0 2.78764 -192.773 -1162.172)"
            >
                <Path
                    fill={Colors[colorScheme].cats.anxious}
                    stroke={Colors[colorScheme].cats.border}
                    strokeWidth="2.28"
                    d="M160.196 920.811c-5.435 25.171 7.451 51.624 23.15 52.129h25.355c14.841-.591 27.999-26.903 21.283-49.798-.199-.679 2.121-30.151-2.8-31.824-4.92-1.672-26.005 19.459-26.005 19.459-3.601-1.319-7.47-1.024-11.461 0 0 0-19.475-21.036-24.395-19.364-4.921 1.672-5.127 29.398-5.127 29.398"
                    transform="matrix(2.22392 0 0 .47183 -.532 .075)"
                ></Path>
                <Ellipse
                    cx="192.811"
                    cy="948.508"
                    stroke={Colors[colorScheme].cats.insideBorders}
                    strokeWidth="1.9"
                    rx="12.469"
                    ry="11.466"
                    transform="matrix(.8577 0 0 .19576 231.63 252.463)"
                ></Ellipse>
                <Ellipse
                    cx="192.811"
                    cy="948.508"
                    stroke={Colors[colorScheme].cats.insideBorders}
                    strokeWidth="1.9"
                    rx="12.469"
                    ry="11.466"
                    transform="matrix(.8577 0 0 .19576 306.935 252.463)"
                ></Ellipse>
                <G id="Mouth">
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.insideBorders}
                        strokeWidth="0.89"
                        d="M679.577 954.559a.854.854 0 0 1 1.017.353c1.066 1.786.917 3.709.141 5.464a1.06 1.06 0 0 1-1.533.468c-3.641-1.873-10.272-1.105-17.735.382a1.44 1.44 0 0 1-1.617-.881c-.671-1.79-.688-3.519.086-5.188a1.4 1.4 0 0 1 1.344-.793c5.695.328 9.185 3.656 18.297.195"
                        transform="matrix(2.22392 0 0 .47183 -1058.305 .013)"
                    ></Path>
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.insideBorders}
                        strokeWidth="0.89"
                        d="m659.948 957.42 21.372-.035"
                        transform="matrix(2.22392 0 0 .47183 -1058.96 .19)"
                    ></Path>
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.insideBorders}
                        strokeWidth="1.1"
                        d="m670.5 939.833-.066 17.099"
                        transform="matrix(2.22389 .0012 .00563 .25988 -1063.134 201.467)"
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
    )
};