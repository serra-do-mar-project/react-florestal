import { View, Text, Alert } from "react-native";
import { PasswordInput } from "../PasswordInput";
import { SubmitButton } from "../SubmitButton";
import { useState } from "react";
import { ChangeOwnPassword } from "@/src/lib/utils";
import { useModal } from "../DefaultModal";
import { CancelButton } from "../CancelButton";

interface ChangeOwnPasswordModalProps {
  token: string | null;
  id: number | null;
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

  function handleCancel() {
    if (!newPassword && !confirmPassword) {
      closeWithAnimation();
      return;
    }
    Alert.alert(
      "Cancelar cadastro",
      "Tem certeza que deseja cancelar o cadastro do novo usuário?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => {
            closeWithAnimation()
            setPassword("")
            setNewPassword("");
            setConfirmPassword("");
          },
        },
      ]
    );
  }

   return(
          <View className="px-8">

            <Text className="w-full text-2xl font-semibold px-0.5">
              Alterar senha
            </Text>

            <Text className="w-full font-sans px-0.5">
              lembre-se, a nova senha deve ser forte e única.
            </Text>

            <View className="items-center w-full mt-5 gap-4">
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

              <View className="flex-row gap-4 w-full mb-8 mt-10">

                <CancelButton
                classname="flex-1"
                textClass="text-xl"
                title="Cancelar"
                onPress={handleCancel}
              />

              <SubmitButton
                classname="flex-1"
                textClass="text-xl"
                title="Salvar"
                onPress={handleChangePassword}
              />

              </View>

              
            </View>
          </View>
   )
        

}

export default ChangeOwnPasswordModal;