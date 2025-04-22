import { Children } from "react";
import { View, Text} from "react-native";

interface props{
  children : any
}


const Title = ({children}: props) => {
  return (
    
        <Text className="font-semibold text-3xl">
          {children}
        </Text>
  );
}

export default Title