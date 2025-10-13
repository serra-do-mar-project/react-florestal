import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';

type Props = {
  label: string;
  icon: React.ReactNode;
  isFocused: boolean;
  onPress: () => void;
};

function TabItem({ label, icon, isFocused, onPress }: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      className="items-center justify-center flex-1"
    >
      {icon}
      <Text
        className={`text-sm ${
          isFocused ? 'text-green-600 font-semibold' : 'text-gray-600'
        }`}
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.8}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default memo(TabItem);
