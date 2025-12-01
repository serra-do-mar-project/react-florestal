import { Modal, ModalProps, View, Animated, Dimensions, TextInput, Keyboard, FlatList, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import ReturnButton from "../ReturnButton";
import Title from "../Title";
import SearchBar from "../SearchBar";
import db from "@/src/db/connection";
import { ExemploDeCaso, ExemploDeCasoTable } from "@/src/db/schema";
import Dropdown from "./Dropdown";
import { router } from "expo-router";
import { asc } from "drizzle-orm";


export type searchModalProps = ModalProps & {
    onClose: () => void;
}

const { width } = Dimensions.get('window');

export default function SearchModal({onClose, ...rest}: searchModalProps) {
    const slideAnim = useRef(new Animated.Value(width)).current;
    const searchBarRef = useRef<TextInput>(null);
    const [data, setData] = useState<ExemploDeCaso[]>([]);
    const [filteredData, setFilteredData] = useState<ExemploDeCaso[]>([]);

    useEffect(() => {
        if (!rest.visible) return;
        
        db.select()
      .from(ExemploDeCasoTable)
      .orderBy(asc(ExemploDeCasoTable.nome_resumo))
      .then((res) => {
        const casos = res as ExemploDeCaso[];
        setData(casos);
        setFilteredData(casos); 
      })
      .catch((error) => {
        console.error('Erro ao carregar dados:', error);
      });

    }, [rest.visible]);

    
    const openAnimation = () => {

        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            searchBarRef.current?.focus();
            
        });
    };
        
    const closeAnimation = () => {
        Keyboard.dismiss();
        Animated.timing(slideAnim, {
            toValue: width,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            
            onClose();
        });
    }
    
 

    return(
        <Modal visible={rest.visible} onShow={openAnimation} transparent onRequestClose={closeAnimation} >
            <View className=" flex-1 bg-black/50" pointerEvents="auto" >

           
            <Animated.View 
                className="flex-1 bg-gray-200"
                style={{
                    transform: [{ translateX: slideAnim }]
                }}
            >       
                    <View className="px-5 border-b border-gray-300 pb-7">
                         <View className="w-full flex-row mt-4 items-center gap-3">
                                <ReturnButton onPress={closeAnimation}/>
                                <Title>Buscar Infração</Title>
                            </View>
                
                            <SearchBar ref={searchBarRef} data={data} filterKey={["nome_resumo", "nome_completo", "tipo_ocorrencia", "palavra_chave"]} onFiltered={(e) => setFilteredData(e)} />
                    </View>
                
                    <FlatList
                        className="flex-1 px-5"
                        data={filteredData}
                        ListHeaderComponent={
                            <View className="w-full pb-10">
                           

                            </View>
                        }
                        renderItem={ ({item, index}) =>
                            <Dropdown
                            key={index}
                            title={item.nome_resumo}
                            tag={item.tags}
                            tipoOcorrencia={item.tipo_ocorrencia}
                            onPress={() => 
                                
                            (router.push({
                            pathname: "/auth/search/procedimentos",
                            params: {
                            id: item.id,
                            },
                            }),
                            closeAnimation())
                            }
                            />
                        }
                        ListEmptyComponent={
                            <View className="w-full items-center">
                             <Text className="font-semibold text-green-500 text-xl">Nenhum resultado encontrado</Text>
                            </View>}
                        ItemSeparatorComponent={() => <View className="h-4" />}
                        ListFooterComponent={() => <View className="h-10" />}
                    />
                    
            </Animated.View>
             </View>
        </Modal>
    );
}