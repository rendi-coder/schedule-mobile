import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

interface ILoaderProps {
    size?: "small" | "large";
    loading: boolean;
    color: string;
}

export const Loader: React.FC<ILoaderProps> = ({ size, color, loading }) => loading ? (
    <View style={styles.container}>
        <ActivityIndicator size={size} color={color} />
    </View>
) : null;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: '50%',
        top: '50%'
    }
})