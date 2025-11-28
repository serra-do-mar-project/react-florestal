import React, { createContext, useContext, useEffect, useRef } from "react";
import {
  Modal,
  ModalProps,
  Pressable,
  View,
  Dimensions,
  Animated, // 👈 nativo
  PanResponder,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export type DefaultModalProps = ModalProps & {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  beforeClose?: () => void;
};

type ModalContextType = {
  closeWithAnimation: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal deve ser usado dentro de <DefaultModal>");
  return context;
};

export function DefaultModal({
  visible,
  onClose,
  children,
  beforeClose,
  ...rest
}: DefaultModalProps) {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // ✅ Abre e fecha com animação
  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const closeWithAnimation = () => {
    beforeClose && beforeClose();
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) onClose();
    });
  };

  // ✅ Usa PanResponder em vez de GestureDetector (sem Reanimated)
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        gestureState.dy > 10, // só ativa se arrastar pra baixo
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 120) {
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 250,
            useNativeDriver: true,
          }).start(({ finished }) => {
            if (finished) onClose();
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={closeWithAnimation}
      {...rest}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className="relative" style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <Pressable className="flex-1" onPress={closeWithAnimation} />

          <Animated.View
            {...panResponder.panHandlers} // 👈 aplica gesto
            style={{
              transform: [{ translateY }],
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              backgroundColor: "white",
              maxHeight: '85%',
              width: '100%',
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0
            }}
          >
            <Pressable
              style={{ width: "100%", height: 40 }}
            >
              <View
                style={{
                  height: 6,
                  width: 60,
                  backgroundColor: "#ccc",
                  borderRadius: 3,
                  alignSelf: "center",
                  marginTop: 10,
                }}
              />
            </Pressable>

            <ModalContext.Provider value={{ closeWithAnimation }}>
              {children}
            </ModalContext.Provider>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}