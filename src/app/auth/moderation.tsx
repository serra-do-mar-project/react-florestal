import React from "react";
import CardUser from "@/src/components/moderation/CardUser";
import images from "@/src/constants/images";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Modal, Pressable, Alert, Keyboard } from "react-native";
import { PasswordInput } from "@/src/components/PasswordInput";
import { SubmitButton } from "@/src/components/SubmitButton";
import { CancelButton } from "@/src/components/CancelButton";
import { Configinput } from "@/src/components/ConfigInput";
import { OptionBox } from "@/src/components/OptionBox";

export default function ModerationPage() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [password, setPassword] = useState("");      // Estado para senha
  const [newPassword, setNewPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [newName, setnNewName] = useState("");
  const [newCpf, setNewCpf] = useState("");
  const [newCargo, setNewCargo] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ nome: string; cargo: string } | null>(null);

  

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardOpen(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  // Exemplo de lista de usuários
  const usuarios = [
    { nome: "Nome de usuário", cargo: "Guarda florestal" },
    { nome: "Gabriel D'Errico Rodrigues", cargo: "Guarda Florestal" },
    { nome: "Emanuel Cardoso", cargo: "Administrador" },
    { nome: "Lucas Almeida", cargo: "Guarda florestal" },
    { nome: "Juliana Souza", cargo: "Administrador" },
    { nome: "Patrícia Lima", cargo: "Guarda florestal" },
    // ...adicione mais usuários se quiser

  ];

   const cargoOptions = [
    { label: "Administrador", value: "Administrador" },
    { label: "Guarda florestal", value: "Guarda florestal" },
  ];

 

  function handleOpenEditModal(user: { nome: string; cargo: string }) {
    setSelectedUser(user);
    setEditModalOpen(true);
  }

  function handleDeleteUser() {
    Alert.alert(
      "Excluir usuário",
      `Tem certeza que deseja excluir ${selectedUser?.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => {setEditModalOpen(false)} }
      ]

    );
  }

  function handleChangePassword() {
    setChangePasswordOpen(true);
    // Aqui você pode abrir um modal de alteração de senha
  }

  function handleCancel() {
    if (!password && !newPassword && !confirmPassword) {
      setChangePasswordOpen(false);
      setEditModalOpen(false);
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
            setEditModalOpen(false)
            setChangePasswordOpen(false);
            setPassword("");
            setNewPassword("");
            setConfirmPassword("");
          },
        },
      ]
    );
  }

  function handleCreateUser() {

  }

  function handleCancelCreateUser() {
    if (!newName && !newCpf && !newCargo && !newPassword && !confirmPassword) {
      setAddModalOpen(false);
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
            setAddModalOpen(false);
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

  return (
    <View className="flex-1 bg-gray-200">
      {/* Header */}
      <View className="bg-[#fffdfd] pt-10 pb-5 shadow shadow-black">
        <Text className="text-gray-900 font-semibold text-3xl ml-7">Moderação</Text>
      </View>

      {/* Título e botão */}
      <View className="w-full mt-12 pl-3 pr-2 flex-row items-center justify-between">
        <Text className="text-3xl font-normal">Lista de usuários</Text>

        <TouchableOpacity 
          className="py-2 px-2.5 w-fit bg-green-500 flex-row items-center justify-center rounded-lg" 
          onPress={()=> {setAddModalOpen(true)}}
        >
          <images.addUser width={14} height={14} />
          <Text className="font-semibold text-white text-sm pl-1.5">Adicionar usuário</Text>
        </TouchableOpacity>

      </View>

      {/* Lista de usuários */}
      <ScrollView className="flex-1 mt-6 ">
        {usuarios.map((user, idx) => (
          <CardUser
            key={idx}
            nome={user.nome}
            cargo={user.cargo}
            onOptionsPress={() => handleOpenEditModal(user)}
            isFirst={idx === 0}
          />
        ))}
      </ScrollView>

      
      <Modal
        visible={editModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalOpen(false)}
      >
        <View className="flex-1 justify-end">
          <Pressable
            className="flex-1 bg-black/30"
            onPress={() => {
              if (changePasswordOpen) {
                handleCancel();
              } else {
                setEditModalOpen(false);
              }
            }}
          />
          <SafeAreaView className={`${changePasswordOpen ? "h-[80%]" : "h-[40%]"} bg-white rounded-t-3xl absolute bottom-0 w-full`}>
            {changePasswordOpen? 
              <>

                <Pressable
                    className="h-1.5 w-16 bg-gray-400/50 rounded-full mx-auto mt-3 mb-10"
                    onPress={() => setEditModalOpen(false)}
                  />

                  {!keyboardOpen && 
                  <View className="w-full items-center pb-10">
                    <Text className="text-xl font-semibold">{selectedUser?.nome}</Text>
                    <Text className="text-lg ml-0.5">{selectedUser?.cargo}</Text>
                  </View>}
                  
                  <View className="h-full px-5">
                        <Text className="text-2xl font-medium text-gray-900 px-3" >Alterar senha</Text>
                        <Text className="w-full px-3">
                          lembre-se, a nova senha deve ser forte e única.
                        </Text>
                  
                        <ScrollView className="mt-6">
                        <View className="flex-1 items-center gap-4">
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
                  
                          <View className="mt-16 mb-10 w-full flex-row justify-around px-14">
                            <SubmitButton
                            classname="h-[3rem] w-[7rem] "
                            textClass="text-xl"
                            title="Salvar"
                            onPress={handleChangePassword}
                          />

                          <CancelButton
                            classname="h-[3rem] w-[7rem] "
                            textClass="text-xl"
                            title="Cancelar"
                            onPress={handleCancel}
                          />
                          </View>
                          </View>
                        </ScrollView>
                      </View>
  


              </> 
              
              :

              <SafeAreaView>
                    <Pressable
                    className="h-1.5 w-16 bg-gray-400/50 rounded-full mx-auto mt-3 mb-10"
                    onPress={() => setEditModalOpen(false)}
                  />
                  <View className="w-full items-center pb-14">
                    <Text className="text-xl font-semibold">{selectedUser?.nome}</Text>
                    <Text className="text-lg ml-0.5">{selectedUser?.cargo}</Text>
                  </View>
                  <Pressable onPress={() => setChangePasswordOpen(true)}>
                    {({ pressed }) => (
                      <View className={`w-full px-7 py-3 flex-row items-center justify-center ${pressed ? "bg-gray-300" : ""}`}>
                        <images.edit width={16} height={16} />
                        <Text className="text-xl font-medium pl-2.5">Alterar senha deste usuário</Text>
                      </View>
                    )}
                  </Pressable>
                  <Pressable onPress={handleDeleteUser}>
                    {({ pressed }) => (
                      <View className={`w-full px-7 py-3 flex-row items-center justify-center ${pressed ? "bg-gray-300" : ""}`}>
                        <images.trash width={16} height={16} />
                        <Text className="text-xl font-medium pl-2.5">Excluir este usuário</Text>
                      </View>
                    )}
                  </Pressable>
              </SafeAreaView>
            }
          </SafeAreaView>
        </View>
      </Modal>


      <Modal
        visible={addModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setAddModalOpen(false)}
      >
        <Pressable
            className="flex-1 bg-black/30"
            onPress={() => {
               
                setAddModalOpen(false);
            
            }}
          />
        <SafeAreaView className={`h-[90%] bg-white rounded-t-3xl absolute bottom-0 w-full`}>
            <Pressable
              className="h-1.5 w-16 bg-gray-400/50 rounded-full mx-auto mt-3 mb-14"
              onPress={() => setEditModalOpen(false)}
            />

             <View className="px-5 ">
                        <Text className="text-3xl font-medium text-gray-900 px-3" >Adicionar Novo Usuário</Text>

            </View>
              <ScrollView className="mt-6">
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

                         <OptionBox 
                            title="Designar um Cargo"
                            options={cargoOptions}
                            value={newCargo}
                            onChange={setNewCargo}
                            placeholder="Selecione o cargo"
                         />

   
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
                  
                          <View className="mt-10 mb-10 w-full flex-row justify-around px-7">
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
                            onPress={handleCancelCreateUser}
                          />
                          </View>
                </View>
                          
              </ScrollView>
                                      
        </SafeAreaView>

      </Modal>
      
     
    </View>
  );
}