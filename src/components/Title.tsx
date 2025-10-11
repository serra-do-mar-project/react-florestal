import {Text} from "react-native";

interface props{
  children : any
}


const Title = ({children}: props) => {
  return (
    
        <Text className="text-gray-900 font-semibold text-3xl">
          {children}
        </Text>
  );
}

export default Title