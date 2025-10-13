import InfractionCard from "@/src/components/infractions/InfractionCard";
import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import infractionsMock from '@/src/mock/infractions';
import OptionsBar from "@/src/components/infractions/OptionsBar";

function formatDate(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString();
}

export default function Infractions() {

  const [cardSelected, setCardSelected] = useState<string[]>([]);
  const [longPressed, setlongPressed] = useState(false)
  const [selectAll, setSelectAll] = useState(false);
  const [cancel, setCancel] = useState(false);

    useEffect(() => {
      console.log(cardSelected);
    }, [cardSelected]);

    useEffect(() => {
      if (selectAll) {
        setCardSelected(infractionsMock.map((i) => i.id));
      } else {
        setCardSelected([]);
      }
    }, [selectAll]);

    useEffect(() => {
      if (cancel) {
        setlongPressed(false);
        setSelectAll(false);
        setCardSelected([]);
        setCancel(false);
      }
    }, [cancel]);

  return(
    <View className="flex w-full h-full">
          <View className="bg-[#fffdfd] pt-7 pb-5 shadow shadow-black ">
            <View className="w-full flex-row items-center justify-between mb-3 px-5 ">
            </View>
            <Text className="text-gray-900 font-semibold text-3xl ml-7 ">Autos de infração</Text>
          </View>

          
            <FlatList
              className="flex-1 px-5"
              ListHeaderComponent={
                <View className="mb-2 pt-8">
                  {longPressed && <OptionsBar onSelectAll={(e) => setSelectAll(e)} numberSelected={cardSelected.length} onCancel={() => setCancel(true)} />}
                </View>
                }
              data={infractionsMock}
              keyExtractor={(item) => item.id}
              extraData={cardSelected}
              ItemSeparatorComponent={  () => <View className="h-4" /> }
              renderItem={({ item }) => (

                <InfractionCard
                key={item.id} 
                title={item.title}
                date={formatDate(item.date)}
                tags={item.tags}
                onPress={() => console.log('open', item.id)}
                onSelect={() => {
                  setCardSelected((prev) =>
                    prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
                  );
                }}
                selectMode={longPressed || selectAll}
                onlongPress={() => setlongPressed(true)}
                groupSelect={selectAll}
              />
               )}
               ListFooterComponent={<View className="h-10" />}
            />
            <View></View>
          </View>
  )
}