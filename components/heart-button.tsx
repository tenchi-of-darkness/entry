import {useColorScheme} from "@/hooks/use-color-scheme";
import {Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Colors} from "@/constants/theme";
import React from "react";

export const HeartButtonSize = 115;

export interface HeartButtonProps extends TouchableOpacityProps {
    reversed?: boolean;
    color?: string;
    centeredText?: string;
}

export function HeartButton({reversed, children, color, ...props}: HeartButtonProps) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <TouchableOpacity {...props}>
            <FontAwesome
                name="heart"
                size={HeartButtonSize}
                color={color ?? Colors[colorScheme].accent}
                style={reversed && {transform: [{rotate: "180deg"}]}}
            />
            {props.centeredText && (
                <Text style={{
                    alignSelf: "center",
                    verticalAlign: "middle",
                    position: "absolute",
                    height: reversed ? HeartButtonSize + 5 : HeartButtonSize - 5,
                    fontSize: 24
                }}>
                    {props.centeredText}
                </Text>
            )}
        </TouchableOpacity>
    )
}