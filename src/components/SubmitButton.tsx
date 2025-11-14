import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";


interface ButtonProps {
  title: string;
  onPress: () => void | Promise<void>;
  classname?: string;
  textClass?: string;
  showLoading?: boolean;
}

export function SubmitButton({ title, onPress, classname, textClass, showLoading = true }: ButtonProps) {
  const [loading, setLoading] = useState(false);

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
    <TouchableOpacity
      onPress={handlePress}
      disabled={loading}
      className={`flex items-center justify-center w-44 h-14 rounded-2xl bg-green-500 ${classname}`}
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
    </TouchableOpacity>
  );
}
