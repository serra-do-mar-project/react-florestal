
import { createContext, useContext, useEffect, useState } from "react";
import { Modal, ModalProps, Pressable, View, Dimensions, ScrollView, Keyboard } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView,  } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import React from "react";


export type DefaultModalProps = ModalProps & {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

type ModalContextType = {
  closeWithAnimation: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal deve ser usado dentro de <DefaultModal>");
  return context;
};

export function DefaultModal({visible, onClose, children, ...rest}: DefaultModalProps) {

  const translateY = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);

  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

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
    overlayOpacity.value = withTiming(0, { duration: 150 });
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 }, (finished) => {
      if (finished) runOnJS(onClose)();
    });
  }

  const panGesture = Gesture.Pan()
  .onUpdate(e => {
    if (e.translationY > 0) translateY.value = e.translationY;
  })
  .onEnd(() => {
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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));


  return(
    // desativa animação nativa e animamos nós mesmos
    <Modal className="flex-" statusBarTranslucent visible={visible} transparent animationType="none" onRequestClose={closeWithAnimation} {...rest} >
      <ModalContext.Provider value={{ closeWithAnimation }}>
      <GestureHandlerRootView style={{ flex: 1 }} >
        <View className="flex-1 bg-black/50" pointerEvents="box-none">
          <Pressable className="flex-1" onPress={closeWithAnimation}  pointerEvents="box-only"/>
          
            <Animated.View
              className={`w-full min-h-1/3 absolute bottom-0 ${keyboardVisible && "top-safe"} max-h-[${SCREEN_HEIGHT}] items-center bg-white z-10`}
              style={[animatedStyle, { borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden'}]}
            >
              <GestureDetector gesture={panGesture}>
              <Pressable className="w-full h-14" onPress={closeWithAnimation}>
              <View
                className="h-1.5 w-16 bg-gray-400/50 rounded-full mx-auto mt-6"
                
              />
              </Pressable>
              </GestureDetector>
                <ScrollView className="w-full h-full z-20" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

                  {children}
                </ScrollView>
                 
            </Animated.View>
        
        </View>
      </GestureHandlerRootView>
      </ModalContext.Provider>
    </Modal>
 
   );
 }