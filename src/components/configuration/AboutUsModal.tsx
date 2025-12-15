import { View, Text, ScrollView} from "react-native";
import ReturnButton from "../ReturnButton";
import { useModal } from "../DefaultModal";
import TeamCard from "./TeamCard";
import teamImages from "@/src/constants/teamImages";
import { Image } from "expo-image";


const AboutUsModal = () => {

  const { closeWithAnimation } = useModal();

  return(
    <ScrollView className="w-full h-full ">
    <View className="items-center mb-12">
      <View className="px-6 w-full flex-row mb-8">
        <ReturnButton onPress={closeWithAnimation} size={32}/>
        <Text className="text-3xl flex-1 text-center font-semibold pr-8 pt-1 text-gray-900">
        Quem somos
      </Text>
      </View>


      <Text className="text-lg font-sans text-gray-900 px-5 mb-2 text-justify">
      O MPOA foi desenvolvido por alunos do curso de Análise e Desenvolvimento de Sistemas do IFSP Campus Caraguatatuba, o projeto ganhou vida entre o 5º e o 6º semestre, unindo o aprendizado técnico à prática real durante as disciplinas de Projeto de Extensão
      </Text>
      <Text className="text-lg font-sans text-gray-900 px-5 mb-10 text-justify">
        O aplicativo foi projetado especificamente para auxiliar os vigilantes florestais do Parque Estadual da Serra do Mar. O MPOA atua como um guia digital que democratiza o acesso a legislações ambientais e padroniza os procedimentos de fiscalização, permitindo o registro de autos de infração e relatórios diários, garantindo que a proteção da nossa biodiversidade seja feita com segurança, eficiência e total conformidade com a lei.
      </Text>
      
      <View className="w-full px-2">
        <View className="w-full border-2 border-gray-300 rounded-md overflow-hidden">
          <Image source={teamImages.visitaTecnica} style={{width: '100%', height: 200}}/>
        </View>

        <View className="w-full border-2 border-gray-300 mt-6 rounded-md overflow-hidden"> 
          <Image source={teamImages.entregaApp} style={{width: '100%', height: 250}}/>
        </View>
      </View>
      
      <Text className="text-3xl font-semibold text-gray-900 mb-10 mt-16">
        Nossa equipe
      </Text>

      <View className="w-full gap-7 px-2">
        
        <TeamCard name="Emanuel Cardoso" role="Tech Lead" username="emanuel-cac" image={teamImages.emanuel} linkedin="www.linkedin.com/in/emanuel-cac"/>
        <TeamCard name="Renata Briet" role="Project Owner" username="renata-briet-a8036b241" image={teamImages.renata} linkedin="www.linkedin.com/in/renata-briet-a8036b241"/>
        <TeamCard name="Gabriel D'Errico" role="Desenvolvedor Front End Mobile" username="gabrielderrico" image={teamImages.gabrielDerrico} linkedin="www.linkedin.com/in/gabrielderrico"/>
        <TeamCard name="Lucas Laidens" role="Desenvolvedor Back End" username="lucaslaidens0" image={teamImages.lucasLaidens} linkedin="www.linkedin.com/in/lucaslaidens0"/>
        <TeamCard name="Rafael Cesar" role="Desenvolvedor Back End" username="rafael-cesar-54220634b" image={teamImages.rafaelCesar} linkedin="www.linkedin.com/in/rafael-cesar-54220634b"/>
        <TeamCard name="Kleiton Ferreira" role="Desenvolvedor Back End" username="kleitonfr" image={teamImages.kleiton} linkedin="www.linkedin.com/in/kleiton-ferreira"/>
             
      </View>
      
    </View>
    </ScrollView>

  );
}

export default AboutUsModal;