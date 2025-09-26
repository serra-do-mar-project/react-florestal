import { router, Stack, Tabs, useSegments } from "expo-router";
import Tab from "@/src/components/Tab";
import React, { useEffect, useState } from "react";
import { Pressable, View, Text } from "react-native";
import images from "@/src/constants/images";
import { StatusBar } from "react-native";
import { useUserStore } from "@/src/store/userStore";

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

  const { isLogged, tipo } = useUserStore();

  useEffect(() => {
    if (!isLogged) {
      router.replace("/loginPage");
    }
  }, [isLogged]);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#FEFEFE',
            borderTopWidth: 1,
            borderTopColor: '#C4C4C4',
            height: 60,
          }
        }}
      >
        <Tabs.Screen
          name="search" 
          options={{
            title: "Pesquisar",
            href: "/auth/search",
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
        {tipo === "Admin" ? (
        <Tabs.Screen
          name="moderation" 
          options={{
            title: "Moderação",
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <TabIcon 
                icon={<images.moderacao width={24} height={24} />}
                iconActive={<images.moderacao width={24} height={24} color="green" strokeWidth={0.5} />}
                name="Moderação"
                focused={focused}
              />
            )
          }}  
        />) : (
          <Tabs.Screen
            name="moderation" 
            options={{
              href: null,
            }}
          />
        )}
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
      </Tabs>
    </>
  )
}

export default TabsLayout