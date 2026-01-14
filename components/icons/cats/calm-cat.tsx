import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const CalmCat = (props: SvgProps) => {
    const colorScheme = useColorScheme() ?? "light";

    return (
        <Svg
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={1.5}
            clipRule="evenodd"
            viewBox="0 0 128 128"
            {...props}
        >
            <G id="CalmCat" transform="matrix(.59215 0 0 2.79102 -192.403 -1163.659)">
                <Path
                    fill={Colors[colorScheme].cats.calm}
                    stroke={Colors[colorScheme].cats.border}
                    strokeWidth={2.28}
                    d="M160.196 920.811c-5.435 25.171 7.451 51.624 23.15 52.129h25.355c14.841-.591 27.999-26.903 21.283-49.798-.199-.679 2.121-30.151-2.8-31.824-4.92-1.672-26.005 19.459-26.005 19.459-3.601-1.319-7.47-1.024-11.461 0 0 0-19.475-21.036-24.395-19.364-4.921 1.672-5.127 29.398-5.127 29.398"
                    transform="matrix(2.22392 0 0 .47183 -.532 .075)"
                />

                <Path
                    fill="none"
                    stroke={Colors[colorScheme].cats.insideBorders}
                    strokeWidth={0.89}
                    d="M490.825 928.162c.1 1.108.45 3.25 1.368 4.571 2.491 3.589 6.381 3.559 8.788.065.836-1.213 1.383-3.119 1.63-4.419"
                    transform="matrix(2.22392 0 0 .47183 -706.993 -.48)"
                />
                <Path
                    fill="none"
                    stroke={Colors[colorScheme].cats.insideBorders}
                    strokeWidth={0.89}
                    d="M502.611 928.162c-.1 1.108-.45 3.25-1.367 4.571-2.492 3.589-6.382 3.559-8.789.065-.836-1.213-1.383-3.119-1.63-4.419"
                    transform="matrix(2.22392 0 0 .47183 -632.524 -.556)"
                />

                <G id="Mouth">
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.insideBorders}
                        strokeWidth={0.89}
                        d="M194.816 946.654s-.615 2.287-2.636 4.449a13 13 0 0 1-1.835 1.594c-1.54 1.122-3.322 1.915-4.425 2.154-4.634 1.003-9.57-2.478-11.462-3.76-.479-.326-.751-.534-.751-.534M194.816 946.654s.182 1.001 1.001 2.132c1.673 2.311 4.123 4.88 6.523 5.648 1.714.549 5.117 1.116 8.715-.249 3.509-1.332 6.13-3.343 6.13-3.343"
                        transform="scale(2.22392 .47183)"
                    />
                </G>

                <Path
                    id="Nose"
                    stroke={Colors[colorScheme].cats.insideBorders}
                    strokeWidth={0.89}
                    d="m194.517 947.047-4.409-3.354a.493.493 0 0 1 .301-.885l8.339.034a.494.494 0 0 1 .317.87l-3.931 3.319a.49.49 0 0 1-.617.016"
                    transform="matrix(2.22392 0 0 .47183 0 -.613)"
                />

                <G id="Whiskers-Right">
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.insideBorders}
                        strokeWidth={0.89}
                        d="M205.476 943.062c8.038 1.655 25.812 6.367 33.051 6.69M205.476 939.549c7.441-1.26 33.051-.991 33.051-.991M205.476 941.352c8.038-.032 25.812 2.504 33.051 3.138"
                        transform="matrix(2.22392 0 0 .47183 1.333 1.452)"
                    />
                </G>

                <G id="Whiskers-Left">
                    <Path
                        fill="none"
                        stroke={Colors[colorScheme].cats.insideBorders}
                        strokeWidth={0.89}
                        d="M205.476 943.062c8.038 1.655 25.812 6.367 33.051 6.69M205.476 939.549c7.441-1.26 33.051-.991 33.051-.991M205.476 941.352c8.038-.032 25.812 2.504 33.051 3.138"
                        transform="matrix(-2.22392 0 0 .47183 864.677 1.452)"
                    />
                </G>
            </G>
        </Svg>
    );
};