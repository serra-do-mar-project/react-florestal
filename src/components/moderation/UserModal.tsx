
import { useState } from "react";
import { DefaultModal, DefaultModalProps} from "../DeafaultModal";
import { View, Text,  Pressable, Alert } from "react-native";
import images from "@/src/constants/images";
import { PasswordInput } from "../PasswordInput";
import { SubmitButton } from "../SubmitButton";
import { CancelButton } from "../CancelButton";

type ModerationModalProps = DefaultModalProps & {
  selectedUser: any;
}

export default function UserModal({selectedUser, ...rest}: ModerationModalProps)  {

    const [changePasswordOpen, setChangePasswordOpen] = useState<boolean>(false);

    function handleClose() {
       
    rest.onClose();             
    setChangePasswordOpen(false);
    }


  function UserOptionsModal() {

     function handleDeleteUser() {
    Alert.alert(
      "Excluir usuário",
      `Tem certeza que deseja excluir ${selectedUser?.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => rest.onClose() },
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

  function ChangePasswordModal({...rest}: DefaultModalProps) {

    const [password, setPassword] = useState("");      // Estado para senha
    const [newPassword, setNewPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    
      function handleCancel() {
        if (!password && !newPassword && !confirmPassword) {
          setChangePasswordOpen(false);
          rest.onClose();
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
                rest.onClose();
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
    

      <View className="mx-3 items-center mb-16">
    
          <View className="w-full items-center mb-10">
            <Text className="text-xl font-semibold">{selectedUser?.nome}</Text>
            <Text className="text-lg ml-0.5">{selectedUser?.cargo}</Text>
          </View>
          
          <View className="px-5">
                <Text className="text-2xl font-medium text-gray-900" >Alterar senha</Text>
                <Text className="w-full">
                  lembre-se, a nova senha deve ser forte e única.
                </Text>
          
                <View className="mt-6 h-fit justify-between">
                <View className="items-center gap-4">
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
                  </View>
                  <View className="mt-16 w-full flex-row justify-around px-14">
                    <SubmitButton
                    classname="h-[3rem] w-[7rem] "
                    textClass="text-xl"
                    title="Salvar"
                    onPress={() => Alert.alert("Senha alterada com sucesso!")}
                  />

                  <CancelButton
                    classname="h-[3rem] w-[7rem] "
                    textClass="text-xl"
                    title="Cancelar"
                    onPress={handleCancel}
                  />
                  </View>
                  
                </View>
              </View>
                
      </View> 

  );
}

  return(
    <DefaultModal
      visible={rest.visible || changePasswordOpen}
      onClose={handleClose}
    >
    {changePasswordOpen ? (
    <ChangePasswordModal {...rest} />
    ) : (
    <UserOptionsModal {...rest} />
    )}
    </DefaultModal>
    
  );

};