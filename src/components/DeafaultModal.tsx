import { useEffect } from "react";
import { Modal, ModalProps, Pressable, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export type DefaultModalProps = ModalProps & {
  visible: boolean;
  onClose: () => void;
}

export function DefaultModal({visible, onClose, ...rest}: DefaultModalProps) {

  const translateY = useSharedValue(0);

  function closeWithAnimation() {
    translateY.value = withTiming(1000, { duration: 300}, (finished) => {
      if (finished && onClose) runOnJS(onClose)();
    });
  }

  const panGesture = Gesture.Pan()
  .onUpdate(e => {
    if (e.translationY > 0) translateY.value = e.translationY;
  })
  .onEnd(() => {
    if (translateY.value > 120) {
      translateY.value = withTiming(1000, { duration: 180 }, (finished) => {
        if (finished && onClose) runOnJS(onClose)();
      });
    } else {
      translateY.value = withTiming(0, { duration: 180 });
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: translateY.value }],
}));
  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 350 });
    }
  }, [visible, translateY]);

  return(
    <Modal statusBarTranslucent visible={visible} transparent animationType="fade" onRequestClose={closeWithAnimation}>
      {/* GestureHandlerRootView dentro do Modal para que os gestures funcionem */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className="flex-1 justify-end bg-black/50">
          <Pressable className="flex-1" onPress={closeWithAnimation}/>
          
            <Animated.View
              className="w-full min-h-1/3 items-center bg-white p-4 mt-24"
              style={[animatedStyle, { borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden' }]}
            >
              <GestureDetector gesture={panGesture}>
              <Pressable className="w-full h-14 " onPress={closeWithAnimation}>
              <View
                className="h-1.5 w-16 bg-gray-400/50 rounded-full mx-auto mt-2"
                
              />
              </Pressable>
              </GestureDetector>
              {rest.children}
            </Animated.View>
        
        </View>
      </GestureHandlerRootView>
    </Modal>
 
   );
 }