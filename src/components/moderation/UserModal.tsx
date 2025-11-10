
import { useState, } from "react";
import { DefaultModal, DefaultModalProps, useModal} from "../DefaultModal";
import { View, Text,  Pressable, Alert, ScrollView } from "react-native";
import images from "@/src/constants/images";
import { PasswordInput } from "../PasswordInput";
import { SubmitButton } from "../SubmitButton";
import { CancelButton } from "../CancelButton";


interface User {
  nome: string;
  cargo: string;
}

type ModerationModalProps = {
  selectedUser?: User;
}

export default function UserModal({selectedUser}: ModerationModalProps)  {

    const [changePasswordOpen, setChangePasswordOpen] = useState<boolean>(false);

  function UserOptionsModal() {

    const { closeWithAnimation } = useModal();

     function handleDeleteUser() {
    Alert.alert(
      "Excluir usuário",
      `Tem certeza que deseja excluir ${selectedUser?.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => closeWithAnimation() },
      ]

    );
  }

    return (
            <View className="w-full items-center mb-10">
            
              <Text className="text-xl font-semibold">{selectedUser?.nome}</Text>
              <Text className="text-lg ml-0.5 pb-10">{selectedUser?.cargo}</Text>
            
            <Pressable className="w-full" onPress={() => (setChangePasswordOpen(true))}>
              {({ pressed }) => (
                <View className={`w-full px-7 py-3 flex-row items-center justify-center ${pressed ? "bg-gray-300" : ""}`}>
                  <images.edit width={16} height={16} />
                  <Text className="text-xl font-medium pl-2.5">Alterar senha deste usuário</Text>
                </View>
              )}
            </Pressable>
            <Pressable className="w-full" onPress={handleDeleteUser}>
              {({ pressed }) => (
                <View className={`w-full px-7 py-3 flex-row items-center justify-center ${pressed ? "bg-gray-300" : ""}`}>
                  <images.trash width={16} height={16} />
                  <Text className="text-xl font-medium pl-2.5">Excluir este usuário</Text>
                </View>
              )}
            </Pressable>
            </View>

    )};

  function ChangePasswordModal() {

    const { closeWithAnimation } = useModal();

    const [password, setPassword] = useState("");      // Estado para senha
    const [newPassword, setNewPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState("");
    
    
      function handleCancel() {
        if (!password && !newPassword && !confirmPassword) {
          setChangePasswordOpen(false);
          closeWithAnimation();
          return;
        }
        Alert.alert(
          "Cancelar alteração",
          "Tem certeza que deseja cancelar a alteração de senha?",
          [
            { text: "Não", style: "cancel" },
            {
              text: "Sim",
              style: "destructive",
              onPress: () => {
                closeWithAnimation();
                setChangePasswordOpen(false);
                setPassword("");
                setNewPassword("");
                setConfirmPassword("");
              },
            },
          ]
        );
      }

  return (
    
      <ScrollView>
      <View className="flex-1 mx-3 mb-8">
    
          <View className="w-full items-center mb-10">
            <Text className="text-xl font-semibold">{selectedUser?.nome}</Text>
            <Text className="text-lg ml-0.5">{selectedUser?.cargo}</Text>
          </View>
          
          <View className="px-5">
                <Text className="text-2xl font-medium text-gray-900" >Alterar senha</Text>
                <Text className="w-full">
                  lembre-se, a nova senha deve ser forte e única.
                </Text>
          <View/>
          
                <View className="items-center gap-4 mt-6">
                  <PasswordInput
                    password={password}
                    setPassword={setPassword}
                    label="Senha de Moderador"
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
                  
                  <View className="mt-16 h-14 w-full flex-row justify-around gap-4">
                  
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
                        onPress={() => (closeWithAnimation(), Alert.alert("Senha alterada com sucesso!"))}
                      />
                  </View>
                  </View>
                  
                
              </View>
                
             </View> 
      </ScrollView>

  );
}

  return(
  
  <>
      {changePasswordOpen ? <ChangePasswordModal/> : <UserOptionsModal />}
  </>
  );

};