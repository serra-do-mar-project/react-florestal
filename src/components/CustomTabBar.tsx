import React, { useEffect, useState } from 'react';
import { View, Keyboard, Platform } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabItem from './TabItem';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showListener = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
    const hideListener = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false));

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  if (isKeyboardVisible) return null;

  return (
    <View className="flex-row  bg-white border-t border-gray-300 h-[60px] items-center px-2 gap-2">
      {state.routes
        .filter((r) => {
          const options = (descriptors[r.key]?.options as any);
          // Filtra rotas que têm href null OU que não têm tabBarIcon
          return options?.href !== null && options?.tabBarIcon;
        })
        .map((route) => {
          const options = descriptors[route.key].options as any;
          const routeIndex = state.routes.findIndex((r) => r.key === route.key);
          const isFocused = state.index === routeIndex;

          const icon = options.tabBarIcon?.({ focused: isFocused, color: '', size: 24 });

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
          };

          return (
            <TabItem
              key={route.key}
              label={options.title ?? route.name}
              icon={icon}
              isFocused={isFocused}
              onPress={onPress}
            />
          );
        })}
    </View>
  );
}
