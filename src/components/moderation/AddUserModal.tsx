import { useEffect, useState } from "react";
import { DefaultModal, DefaultModalProps, useModal } from "../DefaultModal";
import { View, Text, Alert } from "react-native";
import { PasswordInput } from "../PasswordInput";
import { SubmitButton } from "../SubmitButton";
import { CancelButton } from "../CancelButton";
import { Configinput } from "../ConfigInput";
import DropdownBox from "../report/DropdownBox";
import { ScrollView } from "react-native-gesture-handler";
import { CreateUser } from "@/src/lib/utils";
import { useUserStore } from "@/src/store/userStore";


export default function AddUserModal({ ...rest }: DefaultModalProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newCpf, setNewCpf] = useState("");
  const [newCargo, setNewCargo] = useState("");
  const [error, setError] = useState("");

  const { token } = useUserStore();

  useEffect(() => {
    setError("");
  }, [newName, newCpf, newCargo, newPassword, confirmPassword]);

  const { closeWithAnimation } = useModal();

  function formatCPF(text: string) {
    // Remove tudo que não é número
    const numbers = text.replace(/\D/g, '');

    // Limita a 11 dígitos
    const limited = numbers.slice(0, 11);

    // Aplica a formatação XXX.XXX.XXX-XX
    let formatted = limited;
    if (limited.length > 3) {
      formatted = limited.slice(0, 3) + '.' + limited.slice(3);
    }
    if (limited.length > 6) {
      formatted = limited.slice(0, 3) + '.' + limited.slice(3, 6) + '.' + limited.slice(6);
    }
    if (limited.length > 9) {
      formatted = limited.slice(0, 3) + '.' + limited.slice(3, 6) + '.' + limited.slice(6, 9) + '-' + limited.slice(9);
    }

    return formatted;
  }

  function handleCpfChange(text: string) {
    const formatted = formatCPF(text);
    setNewCpf(formatted);
  }

  async function handleCreateUser() {
    if (!(newName && newCpf && newCargo && newPassword && confirmPassword)) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (!token) {
      setError("Token de autenticação não encontrado.");
      return;
    }

    setError("");
    const response = await CreateUser(token, { nome: newName, cpf: newCpf.replace(/\D/g, ''), tipo: newCargo, senha: newPassword });
    if (response.status === "success") {
      closeWithAnimation()
      setNewName("");
      setNewCpf("");
      setNewCargo("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setError(response.message);
    }
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
            closeWithAnimation()
            setNewName("");
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

    <ScrollView>
      <View className="mb-8">
        <View className="px-5 mb-10">
          <Text className="text-3xl font-semibold text-gray-900 px-3" >Adicionar Novo Usuário</Text>
        </View>

        <View className="flex-1 items-center px-8 gap-4">

          <Configinput
            value={newName}
            onChangeText={setNewName}
            label="Nome Completo"
          />

          <Configinput
            value={newCpf}
            onChangeText={handleCpfChange}
            label="CPF"
            keyboardType="numeric"
            maxLength={14}
          />

          <View className="w-full">
            <DropdownBox
              className="bg-gray-100 border-green-600 overflow-hidden"
              optionsClassName="bg-gray-100 border-green-600"
              title="Cargo"
              options={["Admin", "Campo", "Administrativo"]}
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
              onPress={handleCreateUser}
            />
          </View>
        </View>
      </View>
    </ScrollView>

  );
}