import * as React from "react";
import Svg, {Ellipse, G, Path, SvgProps} from "react-native-svg";
import {Colors} from "@/constants/theme";
import {useColorScheme} from "@/hooks/use-color-scheme";

export const SadCat = (props: SvgProps) => {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <Svg
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="1.5"
            clipRule="evenodd"
            viewBox="0 0 128 128"

            {...props}
        >
            <G id="SadCat" transform="matrix(.59143 0 0 2.78814 -192.773 -1162.39)">
                <Path
                    fill={Colors[colorScheme].cats.sad}
                    stroke={Colors[colorScheme].cats.border}
                    strokeWidth="2.3"
                    d="M160.2 920.8c-5.4 25.2 7.4 51.6 23.1 52.1h25.4c14.8-.6 28-26.9 21.3-49.8-.2-.6 2.1-30.1-2.8-31.8s-26 19.5-26 19.5c-3.6-1.3-7.5-1-11.5 0 0 0-19.5-21.1-24.4-19.4s-5.1 29.4-5.1 29.4"
                    transform="matrix(2.22392 0 0 .47183 -.532 .075)"
                ></Path>

                <Ellipse
                    cx="192.8"
                    cy="948.5"
                    fill={Colors[colorScheme].cats.insideBorders}
                    stroke={Colors[colorScheme].cats.insideBorders}
                    strokeWidth="1.9"
                    rx="12.5"
                    ry="11.5"
                    transform="matrix(.8577 0 0 .19576 231.63 252.463)"
                ></Ellipse>

                <Ellipse
                    cx="192.8"
                    cy="948.5"
                    fill={Colors[colorScheme].cats.insideBorders}
                    stroke={Colors[colorScheme].cats.insideBorders}
                    strokeWidth="1.9"
                    rx="12.5"
                    ry="11.5"
                    transform="matrix(.8577 0 0 .19576 306.935 252.463)"
                ></Ellipse>

                <G id="Mouth">
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.border}
                        strokeWidth="0.9"
                        d="M772.5 1183.2v8"
                        transform="matrix(2.22392 0 0 .47183 -1284.743 -111.778)"
                    ></Path>

                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.border}
                        strokeWidth="0.9"
                        d="M872.3 1191.2c-6.9.1-11.4 2.9-14 7.9"
                        transform="matrix(2.22392 0 0 .47183 -1506.63 -111.778)"
                    ></Path>

                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.border}
                        strokeWidth="0.9"
                        d="M872.3 1191.2c-6.9.1-11.4 2.9-14 7.9"
                        transform="matrix(-2.22392 0 0 .47183 2372.998 -111.778)"
                    ></Path>
                </G>

                <Path
                    id="Nose"
                    stroke={Colors[colorScheme].cats.border}
                    fill={Colors[colorScheme].cats.insideBorders}
                    strokeWidth="0.9"
                    d="m194.5 947-4.4-3.3c-.2-.1-.2-.4-.2-.6.1-.2.3-.3.5-.3h8.3c.3 0 .4.2.5.4s0 .4-.1.5l-4 3.3c-.1.2-.4.2-.6 0"
                    transform="matrix(2.22392 0 0 .47183 0 -.613)"
                ></Path>

                <G id="Whiskers-Right">
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.border}
                        strokeWidth="0.9"
                        d="M205.5 943.1c8 1.6 25.8 6.3 33 6.7M205.5 939.5c7.4-1.2 33-.9 33-.9M205.5 941.4c8-.1 25.8 2.5 33 3.1"
                        transform="matrix(2.22392 0 0 .47183 2.604 1.435)"
                    ></Path>
                </G>

                <G id="Whiskers-Left">
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.border}
                        strokeWidth="0.9"
                        d="M205.5 943.1c8 1.6 25.8 6.3 33 6.7M205.5 939.5c7.4-1.2 33-.9 33-.9M205.5 941.4c8-.1 25.8 2.5 33 3.1"
                        transform="matrix(-2.22392 0 0 .47183 865.708 1.435)"
                    ></Path>
                </G>
            </G>
        </Svg>
    );
};