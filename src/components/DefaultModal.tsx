
import { useEffect } from "react";
import { Modal, ModalProps, Pressable, View, Dimensions, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import React from "react";


export type DefaultModalProps = ModalProps & {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export function DefaultModal({ visible, onClose, children, ...rest }: DefaultModalProps) {

  const translateY = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  useEffect(() => {
    translateY.value = SCREEN_HEIGHT;
    overlayOpacity.value = 0;
  }, [SCREEN_HEIGHT, translateY, overlayOpacity]);

  useEffect(() => {
    if (visible) {
      overlayOpacity.value = withTiming(0.5, { duration: 180 });
      translateY.value = withTiming(0, { duration: 250 });
    }
  }, [visible, overlayOpacity, translateY]);

  function closeWithAnimation() {
    console.log("teste")
    overlayOpacity.value = withTiming(0, { duration: 150 });
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 }, (finished) => {
      if (finished) runOnJS(onClose)();
    });
  }

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      'worklet';
      if (e.translationY > 0) translateY.value = e.translationY;
    })
    .onEnd(() => {
      'worklet';
      if (translateY.value > 120) {
        overlayOpacity.value = withTiming(0, { duration: 150 });
        translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 }, (finished) => {
          if (finished) runOnJS(onClose)();
        });
      } else {
        // volta
        overlayOpacity.value = withTiming(0.5, { duration: 150 });
        translateY.value = withTiming(0, { duration: 150 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ translateY: translateY.value }],
    };
  });


  return (
    // desativa animação nativa e animamos nós mesmos
    <Modal className="flex-1" statusBarTranslucent visible={visible} transparent animationType="none" onRequestClose={closeWithAnimation}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className="flex-1 bg-black/50">
          <Pressable className="flex-1" onPress={closeWithAnimation} pointerEvents="box-only" />
          <Animated.View
            className="w-full min-h-1/3 items-center bg-white mt-20"
            style={[
              animatedStyle,
              { borderTopLeftRadius: 24, borderTopRightRadius: 24 }
            ]}
          >
            <View className="w-full items-center">
              <GestureDetector gesture={panGesture}>
                <Pressable className="w-full h-14" onPress={closeWithAnimation}>
                  <View
                    className="h-1.5 w-16 bg-gray-400/50 rounded-full mx-auto mt-6"
                  />
                </Pressable>
              </GestureDetector>

              <ScrollView
                className="w-full"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
              >
                {children && React.cloneElement(children as React.ReactElement<any>, { closeWithAnimation })}
              </ScrollView>
            </View>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}