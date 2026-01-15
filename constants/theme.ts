/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import {Platform} from 'react-native';

export const ColorPalette = {
    lightGreen: "#72EB9B",
    aquamarine: "#78E9C8",
    electricAqua: "#7EE6F5",
    frozenWater: "#DCF9EC",
    evergreen: "#062320",
    jungleTrail: "#3F8675"
};

export const Colors = {
    light: {
        text: ColorPalette.evergreen,
        background: ColorPalette.frozenWater,
        primary: ColorPalette.lightGreen,
        secondary: ColorPalette.jungleTrail,
        onSecondary: ColorPalette.frozenWater,
        aquamarine: ColorPalette.aquamarine,
        accent: ColorPalette.electricAqua,
        card: ColorPalette.lightGreen,
        cats: {
            border: ColorPalette.evergreen,
            insideBorders: ColorPalette.evergreen,
            happy: "#f0e056",
            angry: "#d20131",
            sad: "#204fe7",
            anxious: "#e34840",
            lonely: "#95A0C5",
            excited: "#F0962C",
            calm: "#56ADEE",
            proud: "#56EEEE",
            okay: "#b4b754",
            shocked: "#b65265",
        },
        rating: {
            0: "#101835",
            1: "#d20131",
            2: "#F0962C",
            3: "#f0e056",
            4: "#6fa000",
            5: "#56EEEE",
        },
        pages: {
            none: "#101835",
            belowTen: "#d20131",
            betweenTenAndTwenty: "#204fe7",
            betweenTwentyAndForty: "#9579e1",
            BetweenFortyAndSixty: "#F0962C",
            BetweenSixtyAndSeventy: "#f0e056",
            AboveSeventy: "#6fa000",
        }
    },
    dark: {
        text: "#E6E9F2",
        background: "#0B1020",
        primary: "#6C8CFF",
        secondary: "#7A8CA8",
        onSecondary: "#2A3351",
        aquamarine: ColorPalette.aquamarine,
        accent: "#8FE3E1",
        card: "#151A33",
        cats: {
            border: ColorPalette.evergreen,
            insideBorders: ColorPalette.evergreen,
            happy: "#bfaf02",
            angry: "#a4001b",
            sad: "#102F95",
            anxious: "#e34840",
            lonely: "#677194",
            excited: "#a35700",
            calm: "#227fbd",
            proud: "#00a2a3",
            okay: "#A3A542",
            shocked: "#933356",
        },
        rating: {
            0: "#141927",
            1: "#a4001b",
            2: "#a35700",
            3: "#bfaf02",
            4: "#617943",
            5: "#00a2a3",
        },
        pages: {
            none: "#141927",
            belowTen: "red",
            betweenTenAndTwenty: "227fbd",
            betweenTwentyAndForty: "#564583",
            BetweenFortyAndSixty: "orange",
            BetweenSixtyAndSeventy: "yellow",
            AboveSeventy: "green",
        }
    },
};

export const Fonts = Platform.select({
    ios: {
        /** iOS `UIFontDescriptorSystemDesignDefault` */
        sans: 'system-ui',
        /** iOS `UIFontDescriptorSystemDesignSerif` */
        serif: 'ui-serif',
        /** iOS `UIFontDescriptorSystemDesignRounded` */
        rounded: 'ui-rounded',
        /** iOS `UIFontDescriptorSystemDesignMonospaced` */
        mono: 'ui-monospace',
    },
    default: {
        sans: 'normal',
        serif: 'serif',
        rounded: 'normal',
        mono: 'monospace',
    },
    web: {
        sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        serif: "Georgia, 'Times New Roman', serif",
        rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
});
