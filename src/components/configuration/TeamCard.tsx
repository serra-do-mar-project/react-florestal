import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Image } from "expo-image";
import images from "@/src/constants/images";

interface TeamCardProps {

  image?: string;
  name: string;
  role: string;
  username: string;
  linkedin?: string;

}

const TeamCard = ({name, role, username, image, linkedin}: TeamCardProps) => {

  function handlePress () {
    linkedin && Linking.openURL(`https://${linkedin}`);
  }
  
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
    <View className="flex-row w-full h-28 border border-gray-300 gap-4 rounded-md overflow-hidden">
          <View className="bg-gray-900/30 w-28">
            <Image
              source={image}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          </View>

          <View className=" w-full justify-center gap-0.5 ">
            <Text className="font-BaiJamJuree_bold text-lg text-gray-900">{name}</Text>
            <Text className="font-semibold  text-gray-900">{role}</Text>
            <View className=" flex-row gap-1 items-center">
              <Image
                source={images.linkedin}
                style={{ width: 18, height: 18 }}
              />
              <Text className="font-BaiJamJuree_Medium  text-gray-900">{username}</Text>
            </View>
          </View>

        </View>
        </TouchableOpacity>
  );


}

export default TeamCard;