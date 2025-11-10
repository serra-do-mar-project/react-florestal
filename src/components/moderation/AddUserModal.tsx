
import { useState } from "react";
import { DefaultModal, DefaultModalProps, useModal} from "../DefaultModal";
import { View, Text, Alert } from "react-native";
import { PasswordInput } from "../PasswordInput";
import { SubmitButton } from "../SubmitButton";
import { CancelButton } from "../CancelButton";
import { Configinput } from "../ConfigInput";
import DropdownBox from "../report/DropdownBox";
import { ScrollView } from "react-native-gesture-handler";

type AddUserModalProps = DefaultModalProps & {
 onCreateUser?: () => void;
}


export default function AddUserModal({onCreateUser, ...rest}: AddUserModalProps)  {

   const [newPassword, setNewPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [newName, setnNewName] = useState("");
    const [newCpf, setNewCpf] = useState("");
    const [newCargo, setNewCargo] = useState("");

    const { closeWithAnimation } = useModal();
    
    function handleCreateUser() {
      onCreateUser && onCreateUser(); 
    }

    function handleCancel() {
      if (!newName && !newCpf && !newCargo && !newPassword && !confirmPassword) {
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
              setnNewName("");
              setNewCpf("");
              setNewCargo("");
              setNewPassword("");
              setConfirmPassword("");
              rest.onClose();
              
            },
          },
        ]
      );
    }

    return (
     
      <ScrollView>
            <View className="mb-8">
            <View className="px-5 mb-10">
                <Text className="text-3xl font-semibold text-gray-900 px-3" >Adicionar Novo Usuário</Text>
            </View>

            <View className="flex-1 items-center px-8 gap-4">

                      <Configinput
                        value={newName}
                        onChangeText={setnNewName}
                        label="Nome Completo"
                      />

                      <Configinput
                        value={newCpf}
                        onChangeText={setNewCpf}
                        label="CPF"
                      />

                      <View className="w-full">
                        <DropdownBox
                        className="bg-gray-100 border-green-600 overflow-hidden"
                        optionsClassName="bg-gray-100 border-green-600"
                        title="Cargo"
                        options={["Administrador", "Guarda florestal"]}
                        onSelect={(e) => setNewCargo(e ?? "")}
                      />

                      </View>

                      <PasswordInput
                        password={newPassword}
                        setPassword={setNewPassword}
                        label="Senha"
                      />
              
                      <PasswordInput
                        password={confirmPassword}
                        setPassword={setConfirmPassword}
                        label="Confirmar senha"
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
        </ScrollView>
        
    );
  }
