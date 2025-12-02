import { TextInput, View, TouchableOpacity, TextInputProps } from 'react-native';
import { forwardRef, useEffect, useState } from 'react';
import images from "@/src/constants/images";

export type SearchBarProps = TextInputProps & {
  data: any[];
  filterKey: string | string[];
  onFiltered: (results: any[]) => void;
}

const SearchBar = forwardRef<TextInput, SearchBarProps>(({data, filterKey, onFiltered, ...rest}, ref) => {

  const [query, setQuery] = useState("");

  useEffect(() => {
    onFiltered(data);
  }, [data]);

  const normalize = (text: string) => {
  return text
    .normalize("NFD")                     
    .replace(/[\u0300-\u036f]/g, "")      
    .replace(/\s+/g, " ")                
    .trim()
    .toLowerCase();
};


  const handleSearch = (searchText?: string) => {
  const q = normalize(searchText ?? query);

  // Se a busca estiver vazia, retorna todos os dados
  if (q === "") {
    onFiltered?.(data);
    return;
  }

  const keys = Array.isArray(filterKey) ? filterKey : [filterKey];

  const results = data.filter((item) =>
    keys.some(key => {
      const value = item[key] ?? "";
      return normalize(String(value)).includes(q);
    })
  );

  onFiltered?.(results);
};

  const handleChange = (text: string) => {
    setQuery(text);
    if (text.trim() === "") {
      onFiltered(data);
    } else {
      handleSearch(text);
    }
  };

  return (
    <View className="w-full h-fit mt-6">
        <View className=" flex-row items-center justify-between w-fit h-16 border border-gray-900/30 bg-white pl-4 rounded-2xl">
          <TextInput
            ref={ref}
            editable={rest.editable}
            onFocus={rest.onFocus}
            autoFocus={rest.autoFocus}
            placeholder="Pesquisar"
            onChangeText={handleChange}
            className="flex-1 font-BaiJamJuree_Medium text-lg text-black justify-center "
          />
          <TouchableOpacity className="h-full justify-center px-4" onPress={() => handleSearch()}>
            <images.search width={24} height={24} stroke="black" strokeWidth={0.5} />
          </TouchableOpacity>
          
      </View>
    </View>
  )
});

export default SearchBar;
