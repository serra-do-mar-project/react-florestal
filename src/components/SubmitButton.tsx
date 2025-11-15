import { Text, Pressable, StyleSheet, PixelRatio, ActivityIndicator } from "react-native";
import { useState } from "react";
import { cn } from "../lib/utils";


interface ButtonProps {
  title: string;
  onPress: () => void | Promise<void>;
  classname?: string;
  textClass?: string;
  showLoading?: boolean;
}

export function SubmitButton({ title, onPress, classname, textClass, showLoading = true }: ButtonProps) {
  const [loading, setLoading] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handlePress = async () => {
    if (loading) return;

    if (!showLoading) {
      onPress();
      return;
    }

    setLoading(true);
    try {
      await onPress();
    } catch (error) {
      console.error('Error in SubmitButton:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      disabled={loading}
      onPress={handlePress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={cn(`
        items-center justify-center w-44 h-14 pb-0.5 rounded-2xl
        border-b-2 border-stone-700 shadow-xl
        ${loading || pressed ? "bg-green-900" : "bg-green-500"}
      `, classname)}
      style={{
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <Text
          className={`w-full text-center text-white text-2xl font-semibold ${textClass}`}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
