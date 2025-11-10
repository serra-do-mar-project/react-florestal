import { createContext, useContext, useEffect,} from "react";
import { Modal, ModalProps, Pressable, View, Dimensions, ScrollView } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView,  } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming, useAnimatedReaction } from "react-native-reanimated";
import { PasswordInput } from "./PasswordInput";
import React from "react";
import { cn } from "../lib/utils";

export type DefaultModalProps = ModalProps & {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  beforeClose?: () => void;
  scrollClassName?: string;
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

export function DefaultModal({visible, onClose, children, beforeClose, scrollClassName, ...rest}: DefaultModalProps) {

  const translateY = useSharedValue(0);

  const SCREEN_HEIGHT = Dimensions.get('window').height;
  

  useEffect(() => {
    translateY.value = SCREEN_HEIGHT;
  }, [SCREEN_HEIGHT, translateY, ]);


  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 250 });
    }
  }, [visible, , translateY]);



  const closeWithAnimation = () => {
  beforeClose && beforeClose();

  translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 }, (finished) => {
    if (finished) {

    runOnJS(onClose)();
    }
  });
};

  const panGesture = Gesture.Pan()
  .onUpdate(e => {
    if (e.translationY > 0) translateY.value = e.translationY;
  })
  .onEnd(() => {
    if (translateY.value > 120) {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 }, (finished) => {
        if (finished) runOnJS(onClose)();
      });
    } else {
      // volta
     translateY.value = withTiming(0, { duration: 150 });
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));


  return(
    // desativa animação nativa e animamos nós mesmos
    <Modal className="flex-1" statusBarTranslucent visible={visible} transparent animationType="none" onRequestClose={closeWithAnimation} {...rest} >
      
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className="flex-1 bg-black/50">
          <Pressable className="flex-1 justify-end" onPress={closeWithAnimation} pointerEvents="box-none"/>
          

            <Animated.View
              pointerEvents="box-none"
              className={`w-full min-h-1/3 max-h-[${SCREEN_HEIGHT}] items-center bg-white mt-10`}
              style={[animatedStyle, { borderTopLeftRadius: 24, borderTopRightRadius: 24,}]}
            >
              <GestureDetector gesture={panGesture}>

              <Pressable className="w-full h-14" onPress={closeWithAnimation}>
              <View className="h-1.5 w-16 bg-gray-400/50 rounded-full mx-auto mt-6"/>
              </Pressable>

              </GestureDetector>

                <ModalContext.Provider value={{ closeWithAnimation }} >
                    <View className="w-full" pointerEvents="auto">
                        {children}
                    </View>
                </ModalContext.Provider>
            </Animated.View>
            
        </View>
      </GestureHandlerRootView>
      
    </Modal>
 
   );
 }

    