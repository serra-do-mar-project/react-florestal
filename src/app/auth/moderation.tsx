import CardUser from "@/src/components/moderationComponents/CardUser";
import images from "@/src/constants/images";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Modal, Pressable, Alert } from "react-native";
import { ChangePassword } from "@/src/components/ChangePassword";
import { SubmitButton } from "@/src/components/SubmitButton";
import { CancelButton } from "@/src/components/CancelButton";

export default function ModerationPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [password, setPassword] = useState("");      // Estado para senha
  const [newPassword, setNewPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 

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

  const [selectedUser, setSelectedUser] = useState<{ nome: string; cargo: string } | null>(null);

  function handleOpenModal(user: { nome: string; cargo: string }) {
    setSelectedUser(user);
    setModalOpen(true);
  }

  function handleDeleteUser() {
    Alert.alert(
      "Excluir usuário",
      `Tem certeza que deseja excluir ${selectedUser?.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => {setModalOpen(false)} }
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
      setModalOpen(false);
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
            setModalOpen(false)
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
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#fffdfd] pt-10 pb-5 shadow shadow-black">
        <Text className="text-gray-900 font-semibold text-3xl ml-7">Moderação</Text>
      </View>

      {/* Título e botão */}
      <View className="w-full mt-12 pl-3 pr-2 flex-row items-center justify-between">
        <Text className="text-3xl font-normal">Lista de usuários</Text>
        <TouchableOpacity className="py-2 px-2.5 w-fit bg-green-500 flex-row items-center justify-center rounded-lg">
          <images.addUser width={14} height={14} />
          <Text className="font-semibold text-white text-sm pl-1.5">Adicionar usuário</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de usuários */}
      <ScrollView className="flex-1 mt-20 mb-16">
        {usuarios.map((user, idx) => (
          <CardUser
            key={idx}
            nome={user.nome}
            cargo={user.cargo}
            onOptionsPress={() => handleOpenModal(user)}
            isFirst={idx === 0}
          />
        ))}
      </ScrollView>

      
      <Modal
        visible={modalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setModalOpen(false)}
      >
        <View className="flex-1 justify-end">
          <Pressable
            className="flex-1 bg-black/30"
            onPress={() => {
              if (changePasswordOpen) {
                handleCancel();
              } else {
                setModalOpen(false);
              }
            }}
          />
          <SafeAreaView className={`${changePasswordOpen ? "h-[80%]" : "h-[40%]"} bg-white rounded-t-3xl absolute bottom-0 w-full`}>
            {changePasswordOpen? 
              <>

                <Pressable
                    className="h-1.5 w-16 bg-gray-400/50 rounded-full mx-auto mt-3 mb-10"
                    onPress={() => setModalOpen(false)}
                  />
                  <View className="w-full items-center pb-10">
                    <Text className="text-xl font-semibold">{selectedUser?.nome}</Text>
                    <Text className="text-lg ml-0.5">{selectedUser?.cargo}</Text>
                  </View>


                  <View className="px-5">
                        <Text className="text-2xl font-medium text-gray-900 px-3" >Alterar senha</Text>
                        <Text className="w-full px-3">
                          lembre-se, a nova senha deve ser forte e única.
                        </Text>
                  
                        <View className="items-center w-full mt-6">
                          <ChangePassword
                            password={password}
                            setPassword={setPassword}
                            label="Senha de Moderador"
                          />
                  
                          <ChangePassword
                            password={newPassword}
                            setPassword={setNewPassword}
                            label="Senha nova"
                          />
                  
                          <ChangePassword
                            password={confirmPassword}
                            setPassword={setConfirmPassword}
                            label="Confirmar nova senha"
                          />
                  
                          <View className="mt-10 mb-10 w-full flex-row justify-around px-14">
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
                      </View>
  


              </> 
              
              :

              <SafeAreaView>
                    <Pressable
                    className="h-1.5 w-16 bg-gray-400/50 rounded-full mx-auto mt-3 mb-10"
                    onPress={() => setModalOpen(false)}
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
      
     
    </View>
  );
}