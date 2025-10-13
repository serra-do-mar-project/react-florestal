// import { View, Text } from "react-native";
// import { Checkbox } from "./Checkbox";

// interface CheckboxWithLabelProps {
//   checked: boolean;
//   onCheckedChange: (value: boolean) => void;
//   label: string;  
// }

// export function CheckboxWithLabel({ checked, onCheckedChange, label }: CheckboxWithLabelProps) {
//   return (
//     <View className="flex flex-row items-center w-fit">
//       <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
//       <Text
//         className="w-full ml-1.5 text-black text-base font-semibold"
//         onPress={() => onCheckedChange(!checked)} // Alterna o estado ao clicar no texto
//       >
//         {label}
//       </Text>
//     </View>
//   );
// }