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
        },
        rating: {
            0: "black",
            1: "red",
            2: "orange",
            3: "yellow",
            4: "green",
            5: "blue",
        },
        pages: {
            none: "black",
            belowTen: "red",
            betweenTenAndTwenty: "blue",
            betweenTwentyAndForty: "purple",
            BetweenFortyAndSixty: "orange",
            BetweenSixtyAndSeventy: "yellow",
            AboveSeventy: "green",
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
        },
        rating: {
            0: "black",
            1: "red",
            2: "orange",
            3: "yellow",
            4: "green",
            5: "blue",
        },
        pages: {
            none: "black",
            belowTen: "red",
            betweenTenAndTwenty: "blue",
            betweenTwentyAndForty: "purple",
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
