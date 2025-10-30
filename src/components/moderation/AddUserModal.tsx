
import { useState } from "react";
import { DefaultModal, DefaultModalProps} from "../DeafaultModal";
import { View, Text, Alert } from "react-native";
import { PasswordInput } from "../PasswordInput";
import { SubmitButton } from "../SubmitButton";
import { CancelButton } from "../CancelButton";
import { Configinput } from "../ConfigInput";
import DropdownBox from "../report/DropdownBox";

type AddUserModalProps = DefaultModalProps & {
 onCreateUser?: () => void;
}


export default function AddUserModal({onCreateUser, ...rest}: AddUserModalProps)  {

   const [newPassword, setNewPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [newName, setnNewName] = useState("");
    const [newCpf, setNewCpf] = useState("");
    const [newCargo, setNewCargo] = useState("");


  function handleCreateUser() {

    onCreateUser && onCreateUser(); 
  }

  function handleCancel() {
    if (!newName && !newCpf && !newCargo && !newPassword && !confirmPassword) {
      rest.onClose();
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
            rest.onClose();
            setnNewName("");
            setNewCpf("");
            setNewCargo("");
            setNewPassword("");
            setConfirmPassword("");
          },
        },
      ]
    );
  }

  return(

    <DefaultModal {...rest}>
      <View className="mb-16">
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
                  
                      <View className="mt-10 w-full flex-row justify-around px-7">
                          <SubmitButton
                            classname="h-[3rem] w-[7rem] "
                            textClass="text-xl"
                            title="Salvar"
                            onPress={handleCreateUser}
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
      
    </DefaultModal>

  );

};