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
  scrollClassName?: string;
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
      animationType="none"
      statusBarTranslucent
      onRequestClose={closeWithAnimation}
      {...rest}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <Pressable
            style={{ flex: 1, justifyContent: "flex-end" }}
            onPress={closeWithAnimation}
            pointerEvents="box-none"
          />
          <Animated.View
            {...panResponder.panHandlers} // 👈 aplica gesto
            style={{
              transform: [{ translateY }],
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              marginTop: 30,
              backgroundColor: "white",
              width: "100%",
              minHeight: "33%",
              maxHeight: "95%",
            }}
          >
            <Pressable
              style={{ width: "100%", height: 50 }}
              onPress={closeWithAnimation}
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
