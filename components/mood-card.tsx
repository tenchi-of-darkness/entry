import React from "react";
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View,} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useTheme} from "@/hooks/use-theme";

interface FeatureCardProps extends TouchableOpacityProps {
    title: string;
    iconName: React.ComponentProps<typeof FontAwesome>["name"];
}

const cardPadding = 10;

export const EmptyFeatureCard: React.FC = () => <View style={{flex: 1, padding: cardPadding, backgroundColor: 'transparent'}}/>
export const FeatureCard: React.FC<FeatureCardProps> = ({
                                                     title, iconName, onPress, ...props
                                                 }) => {
    const theme = useTheme();

    const styles = React.useMemo(
        () =>
            (StyleSheet.create({
                card: {
                    flex: 1,
                    backgroundColor: theme.secondary,
                    borderRadius: 15,
                    padding: cardPadding,
                    justifyContent: "center",
                    alignItems: "center",
                },
                header: {
                    marginBottom: 10,
                    alignItems: "center",
                },
                title: {
                    fontSize: 20,
                    fontWeight: "bold",
                    color: theme.text,
                },
            })),
        [theme]
    );

    return (
        <TouchableOpacity style={[styles.card]} onPress={onPress} {...props}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>

            <FontAwesome name={iconName} size={40} color={theme.accent}/>
        </TouchableOpacity>
    );
};