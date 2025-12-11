import { View, Text, Alert } from "react-native";
import { PasswordInput } from "../PasswordInput";
import { SubmitButton } from "../SubmitButton";
import { useState } from "react";
import { ChangeOwnPassword } from "@/src/lib/utils";
import { useModal } from "../DefaultModal";
import { useUserStore } from "@/src/store/userStore";

interface ChangeOwnPasswordModalProps {
  token: string;
  id: number;
}

const ChangeOwnPasswordModal = ({token, id} : ChangeOwnPasswordModalProps) => {

  const [password, setPassword] = useState("");      // Estado para senha
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { closeWithAnimation } = useModal();

  
  

  async function handleChangePassword() {
    if ((newPassword || password) == "") {
      Alert.alert("Atenção","os campos devem ser preenchidos");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Erro de confirmação","As senhas não coincidem.");
      return;
    }
    if (newPassword.length < 5) {
      Alert.alert("Senha inválida","A nova senha deve ter pelo menos 5 caracteres");
      return;
    }

    if (token && id) {
      const result = await ChangeOwnPassword(token, password, newPassword, id)
      if (result.status === "success") {
        closeWithAnimation();
        setPassword("")
        setNewPassword("")
        setConfirmPassword("")
        Alert.alert("Sucesso","Senha alterada com sucesso!");
      }
      else{
        Alert.alert("Erro", result.message)
      }

    }
  }

   return(
          <View className="px-5 transition-all duration-500 overflow-hidden opacity-100">
            <Text className="w-full font-sans px-0.5">
              lembre-se, a nova senha deve ser forte e única.
            </Text>

            <View className="items-center w-full mt-5 px-3 gap-4">
              <PasswordInput
                password={password}
                setPassword={setPassword}
                label="Senha atual"
              />

              <PasswordInput
                password={newPassword}
                setPassword={setNewPassword}
                label="Senha nova"
              />

              <PasswordInput
                password={confirmPassword}
                setPassword={setConfirmPassword}
                label="Confirmar nova senha"
              />

              <SubmitButton
                classname="h-fit w-3/4 py-2 mt-8 mb-10"
                textClass="text-xl"
                title="Salvar"
                onPress={handleChangePassword}
              />
            </View>
          </View>
   )
        

}

export default ChangeOwnPasswordModal;