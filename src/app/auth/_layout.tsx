import { Tabs, router } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import CustomTabBar from '@/src/components/CustomTabBar';
import { useUserStore } from "@/src/store/userStore";
import images from "@/src/constants/images";
import { cn } from "@/src/lib/utils";

const TabIcon = ({ focused, icon, iconActive, className }: any) => {
  return (
    <View className={cn("items-center justify-center", className)}>
      {focused ? iconActive : icon}
    </View>
  );
};



const TabsLayout = () => {
  const { isLogged, tipo } = useUserStore();

  useEffect(() => {
    if (!isLogged) {
      router.replace("/loginPage");
    }
  }, [isLogged]);

  const isAdmin = tipo?.trim().toLowerCase() === 'admin';

  if (isAdmin)
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen
          name="search"
          options={{
            title: "Pesquisar",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={<Image source={images.search} style={{ width: 24, height: 24 }} contentFit="contain" />}
                iconActive={
                  <Image source={images.search} style={{ width: 24, height: 24 }} contentFit="contain" tintColor="green" />
                }
                name="Pesquisar"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="infractions"
          options={{
            title: "Autos",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={<Image source={images.folder} style={{ width: 24, height: 24 }} contentFit="contain" />}
                iconActive={
                  <Image source={images.folder} style={{ width: 24, height: 24 }} contentFit="contain" tintColor="green" />
                }
                name="Autos"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="report"
          options={{
            title: "Relatório",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                className="pb-0.5 mt-0.5"
                icon={<Image source={images.note} style={{ width: 24, height: 22 }} contentFit="contain" />}
                iconActive={
                  <Image source={images.note} style={{ width: 24, height: 22 }} contentFit="contain" tintColor="green" />
                }
                name="Relatório"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="moderation"
          options={{
            title: "Moderação",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={<Image source={images.moderacao} style={{ width: 24, height: 24 }} contentFit="contain" />}
                iconActive={
                  <Image source={images.moderacao} style={{ width: 24, height: 24 }} contentFit="contain" tintColor="green" />
                }
                name="Moderação"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="config"
          options={{
            title: "Configurações",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                className="mt-1"
                icon={<Image source={images.settings} style={{ width: 22, height: 22 }} contentFit="contain" />}
                iconActive={
                  <Image source={images.settings} style={{ width: 22, height: 22 }} contentFit="contain" tintColor="green" />
                }
                name="Configurações"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="search"
        options={{
          title: "Pesquisar",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<Image source={images.search} style={{ width: 24, height: 24 }} contentFit="contain" />}
              iconActive={
                <Image source={images.search} style={{ width: 24, height: 24 }} contentFit="contain" tintColor="green" />
              }
              name="Pesquisar"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="infractions"
        options={{
          title: "Autos",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<Image source={images.folder} style={{ width: 24, height: 24 }} contentFit="contain" />}
              iconActive={
                <Image source={images.folder} style={{ width: 24, height: 24 }} contentFit="contain" tintColor="green" />
              }
              name="Autos"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "Relatório",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              className="pb-0.5 mt-0.5"
              icon={<Image source={images.note} style={{ width: 24, height: 22 }} contentFit="contain" />}
              iconActive={
                <Image source={images.note} style={{ width: 24, height: 22 }} contentFit="contain" tintColor="green" />
              }
              name="Relatório"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: "Configurações",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              className="mt-1"
              icon={<Image source={images.settings} style={{ width: 22, height: 22 }} contentFit="contain" />}
              iconActive={
                <Image source={images.settings} style={{ width: 22, height: 22 }} contentFit="contain" tintColor="green" />
              }
              name="Configurações"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="moderation"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
