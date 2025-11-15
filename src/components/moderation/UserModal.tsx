import { DefaultModal, DefaultModalProps, useModal } from "../DefaultModal";
import { View, Text, Pressable, Alert, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import images from "@/src/constants/images";
import { PasswordInput } from "../PasswordInput";
import { SubmitButton } from "../SubmitButton";
import { CancelButton } from "../CancelButton";
import { ChangeOtherUserPassword, DeleteUser } from "@/src/lib/utils";
import { useUserStore } from "@/src/store/userStore";


interface User {
  id: number;
  nome: string;
  tipo: string;
}

type ModerationModalProps = {
  selectedUser: User | null;
}

export default function UserModal({ selectedUser }: ModerationModalProps) {

  const [changePasswordOpen, setChangePasswordOpen] = useState<boolean>(false);
  const { closeWithAnimation } = useModal()

  const { token } = useUserStore();

  function UserOptionsModal() {
    function handleDeleteUser() {
      Alert.alert(
        "Excluir usuário",
        `Tem certeza que deseja excluir ${selectedUser?.nome}?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Excluir", style: "destructive", onPress: async () => {
              if (!token || !selectedUser) {
                return;
              }

              const result = await DeleteUser(token, selectedUser.id);
              if (result.status === "success") {
                closeWithAnimation()
                setChangePasswordOpen(false);
              } else {
                Alert.alert("Erro", "Não foi possível excluir o usuário.");
              }
            }
          },
        ]
      );
    }

    return (
      <View className="w-full items-center mb-10">
        <Text className="text-xl font-semibold">{selectedUser?.nome}</Text>
        <Text className="text-lg ml-0.5 pb-10">{selectedUser?.tipo}</Text>
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
    )
  };

  function ChangePasswordModal() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { token } = useUserStore();

    const handlePasswordChange = async () => {
      if (!(password && newPassword && confirmPassword)) {
        setError("Por favor, preencha todos os campos.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("As senhas novas não coincidem.");
        return;
      }

      if (!selectedUser) {
        setError("Usuário não selecionado.");
        return;
      }

      if (!token) {
        setError("Token não disponível.");
        return;
      }

      const result = await ChangeOtherUserPassword(token, password, newPassword, selectedUser.id);
      if (result.status === "success") {
        closeWithAnimation();
        setChangePasswordOpen(false);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(result.message);
      }
    }

    useEffect(() => {
      setError("");
    }, [password, newPassword, confirmPassword])

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
      <ScrollView className="mx-3 mb-16"
        contentContainerClassName="items-center"
      >
        <View className="w-full items-center mb-10">
          <Text className="text-xl font-semibold">{selectedUser?.nome}</Text>
          <Text className="text-lg ml-0.5">{selectedUser?.tipo}</Text>
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
            <Text className="text-red-500">
              {error}
            </Text>
            <View className="mt-16 w-full flex-row justify-around px-14">
              <SubmitButton
                classname="h-[3rem] w-[7rem] "
                textClass="text-xl"
                title="Salvar"
                onPress={handlePasswordChange}
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
      </ScrollView>
    );
  }

  return (
    <>
      {changePasswordOpen ? <ChangePasswordModal /> : <UserOptionsModal />}
    </>
  );
};