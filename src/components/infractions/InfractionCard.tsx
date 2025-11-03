import { View, Text, Image, TouchableOpacity, Pressable} from "react-native";
import images from "@/src/constants/images";
import { useEffect, useState } from "react";

export interface InfractionCardProps {
  title?: string;
  date?: string;
  tag?: string | null;
  onPress?: () => void;
  onSelect?: () => void;
  onlongPress?: () => void;
  selectMode?: boolean;
  isSelected?: boolean;
}


export default function InfractionCard({ title = "Abate ilegal de Animais Silvestres", date, tag = "Com presença", onPress, onSelect, onlongPress, selectMode, isSelected }: InfractionCardProps) {

  const [longPressed, setLongPressed] = useState(false);
  const [selected, setSelected] = useState(false);
  const tags = tag?.split(",") || [];
  const formattedDate = date&& date.replace(', ', ' às '); ;

    function handleSelect() {
      setSelected(!selected);
      onSelect && onSelect()
    }

    useEffect(() => {
      if (selectMode !== undefined) {
        setLongPressed(!!selectMode);
      }
    }, [selectMode]);

    // sync selected with parent-controlled `isSelected` when provided
    useEffect(() => {
      if (typeof isSelected !== 'undefined') {
        setSelected(!!isSelected);
      }
    }, [isSelected]);

  
    const handleLongPress = () => {
      setLongPressed(true);
      onlongPress && onlongPress();
    }


  return (
      <TouchableOpacity 
        className="w-full py-4 px-5 bg-white border border-gray-800/80  rounded-xl"
        onPress={() => {longPressed == true? handleSelect() : onPress && onPress()}}
        onLongPress={() => {handleLongPress()} }
        activeOpacity={0.6}
      >
        <View className="flex-row justify-between items-end">
          <Text className="font-semibold text-lg">{title}</Text>
          {longPressed && 
            <View className={`w-6 h-6 border border-gray-800/80 rounded-sm ${selected ==true && 'bg-green-600 items-center justify-center'}`}>
              { selected && <images.check width={14} height={15} className=""/>}
            </View>}
        </View>
  <Text className="text-gray-900/70">{formattedDate?? ''}</Text>
        {tags[0] && (
          <View className="bg-[#EFEFEF] rounded-lg px-2 py-1 mb-1.5 mt-3 flex flex-col border border-gray-900/30">
            {tags.map((tag, index) => (
              <View className="flex flex-row items-center" key={index}>
                <Image
                  source={images.pin}
                  className="w-4 h-4"
                  resizeMode="contain"
                />
                <Text key={index} className="text-black font-BaiJamJuree_Medium  pl-1.5">{tag}</Text>
              </View>
            ))}
          </View>
        )}
         
      </TouchableOpacity>
  );

}