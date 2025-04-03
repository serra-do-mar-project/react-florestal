import { View, Text} from "react-native";


const LoginTitle = () => {
  return (
    <View className="flex items-center w-full h-20 mt-20">
        <Text className="font-semibold text-3xl">
            Seja Bem-Vindo(a)
        </Text>
        <Text className="font-semibold text-3xl">
            ao EcoGuarda!
        </Text>
    </View>
  );
}

export default LoginTitle