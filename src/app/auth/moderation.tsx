import React from "react";
import CardUser from "@/src/components/moderation/CardUser";
import images from "@/src/constants/images";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import UserModal from "@/src/components/moderation/UserModal";
import AddUserModal from "@/src/components/moderation/AddUserModal";
import { DefaultModal } from "@/src/components/DefaultModal";

export default function ModerationPage() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ nome: string; cargo: string }>();


  // Exemplo de lista de usuários
  const usuarios = [
    { nome: "Nome de usuário", cargo: "Guarda florestal" },
    { nome: "Gabriel D'Errico Rodrigues", cargo: "Guarda Florestal" },
   
    // ...adicione mais usuários se quiser
  ];
 

  function handleOpenEditModal(user: { nome: string; cargo: string }) {
    setEditModalOpen(true);
    setSelectedUser(user);
  }


  return (
    <View className="h-full w-full bg-gray-200">
      {/* Header */}
      <View className="bg-[#fffdfd] pt-10 pb-5 shadow shadow-black">
        <Text className="text-gray-900 font-semibold text-3xl ml-7">Moderação</Text>
      </View>

      {/* Título e botão */}
      <View className="w-full mt-12 pl-3 pr-2 flex-row items-center justify-between">
        <Text className="text-3xl font-sans">Lista de usuários</Text>

        <TouchableOpacity 
          className="py-2 px-2.5 w-fit bg-green-500 flex-row items-center justify-center rounded-lg" 
          onPress={()=> {setAddModalOpen(true)}}
        >
          <images.addUser width={14} height={14} />
          <Text className="font-semibold text-white text-sm pl-1.5">Adicionar usuário</Text>
        </TouchableOpacity>

      </View>

      <View style={{ flex: 1 }} pointerEvents={editModalOpen ? 'none' : 'auto'}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          scrollEnabled={!editModalOpen}
          className="flex-1 mt-6"
          contentContainerStyle={{ paddingBottom: 24 }}
        >
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
      </View>

      <DefaultModal visible={editModalOpen || addModalOpen} onClose={() =>(setEditModalOpen(false), setAddModalOpen(false))} >
        {editModalOpen? 
          <UserModal selectedUser={selectedUser} /> 
          :
          <AddUserModal visible={addModalOpen}  onClose={() => setAddModalOpen(false)}/>}
      </DefaultModal>




       {/* {
        editModalOpen?
        <UserModal selectedUser={selectedUser} visible={editModalOpen} onClose={() => setEditModalOpen(false)}/>
        :
        <AddUserModal visible={addModalOpen}  onClose={() => setAddModalOpen(false)}/>
       }                    */}
      
    </View>
    
  );
}