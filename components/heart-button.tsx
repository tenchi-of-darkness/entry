import {useColorScheme} from "@/hooks/use-color-scheme";
import {ColorValue, Text, TouchableOpacity, TouchableOpacityProps, useWindowDimensions} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import {useTheme} from "@/hooks/use-theme";

import * as chroma from "chroma.ts"

export const HeartButtonSize = 115;

export interface HeartButtonProps extends TouchableOpacityProps {
    colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
    centeredText: string;
    reversed?: boolean;
}

export function HeartButton({reversed, children, colors, ...props}: HeartButtonProps) {
    const theme = useTheme();

    const {width, height} = useWindowDimensions();

    return (
        <TouchableOpacity {...props}>
            <MaskedView
                style={{ width: HeartButtonSize, height: HeartButtonSize }}
                maskElement={
                    <FontAwesome
                        name="heart"
                        size={HeartButtonSize}
                        color={"transparent"}
                        style={reversed && {transform: [{rotate: "180deg"}]}}
                    />
                }
            >
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1 }}
                />
            </MaskedView>
            {props.centeredText && (
                <Text style={{
                    alignSelf: "center",
                    verticalAlign: "middle",
                    position: "absolute",
                    height: reversed ? HeartButtonSize + 5 : HeartButtonSize - 5,
                    fontSize: 24,
                    color: theme.text,
                    textShadowColor: chroma.css(theme.background).hex("rgb")+"55",
                    textShadowOffset:{width: 1, height: 1},
                    textShadowRadius: 2,
                }}>
                    {props.centeredText}
                </Text>
            )}
        </TouchableOpacity>
    )
}