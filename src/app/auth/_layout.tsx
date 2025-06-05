import { router, Stack, Tabs, useSegments } from "expo-router";
import Tab from "@/src/components/Tab";
import React, { useEffect, useState } from "react";
import { Pressable, View, Text } from "react-native";
import images from "@/src/constants/images";
import { StatusBar } from "react-native";

const TabIcon = ({focused, icon, iconActive, name}: any) => {
  return (
    <View className="items-center justify-center gap-1 pt-7">
      {focused ? (
        <>
          {iconActive}
          <Text className={`${focused ? 'font-semibold' : 'font-regular'} text-green-600 text-sm h-[20px] w-full px-2 rounded-full bg-green-500/20`}>{name}</Text>
        </>
      ) : (
        <>  
          {icon}
          <Text className={`${focused ? 'font-semibold' : 'font-regular'} text-sm h-[20px] w-full`}>{name}</Text>
        </>
      )}
      
    </View>
  )
}

const TabsLayout = () => {

  const segment = useSegments()
  const [hidden, setHidden] = useState(false)
  
  useEffect(() => {
    if (segment[1] == 'search' && segment[2]) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  }, [segment])

  return (
    <>
      <Tabs
        safeAreaInsets={{
          bottom: hidden ? 110 : 0
        }}
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#FEFEFE',
            borderTopWidth: 1,
            borderTopColor: '#C4C4C4',
            height: 60
          }
        }}
      >
        <Tabs.Screen
          name="search/index" 
          options={{
            title: "Pesquisar",
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <TabIcon 
                icon={<images.search width={24} height={24} />}
                iconActive={<images.search width={24} height={24} stroke="green" strokeWidth={0.5} />}
                name="Pesquisar"
                focused={focused}
              />
            )
          }}  
        />
        <Tabs.Screen
          name="report" 
          options={{
            title: "Relatório",
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <TabIcon 
                icon={<images.note width={24} height={24}/>}
                iconActive={<images.note width={24} height={24} stroke="green" strokeWidth={0.5} />}
                name="Relatório"
                focused={focused}
              />
            )
          }}  
        />
        <Tabs.Screen
          name="config" 
          options={{
            title: "Configurações",
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <TabIcon 
                icon={<images.settings width={24} height={24} />}
                iconActive={<images.settings width={24} height={24} stroke="green" strokeWidth={0.5} />}
                name="Configurações"
                focused={focused}
              />
            )
          }}  
        />
        <Tabs.Screen name="search/fauna" options={{ href: null, headerShown: false, }} />
      </Tabs>
    </>
  )
}

export default TabsLayout