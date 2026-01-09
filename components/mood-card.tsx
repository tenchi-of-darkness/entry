import React from "react";
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View,} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useTheme} from "@/hooks/use-theme";

interface FeatureCardProps extends TouchableOpacityProps {
    title: string;
    iconName: React.ComponentProps<typeof FontAwesome>["name"];
}

const FeatureCard: React.FC<FeatureCardProps> = ({title, iconName, onPress, ...props
                                                 }) => {
    const theme = useTheme();

    const styles = React.useMemo(
        () =>
            StyleSheet.create({
                card: {
                    backgroundColor: theme.secondary,
                    borderRadius: 15,
                    padding: 10,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    // @ts-expect-error calculations and types don't go together
                    maxWidth: 100/3 + "%",
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
            }),
        [theme]
    );

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} {...props}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>

            <FontAwesome name={iconName} size={40} color={theme.accent}/>
        </TouchableOpacity>
    );
};

export default FeatureCard;