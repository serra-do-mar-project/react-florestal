import { Tabs, router } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CustomTabBar from '@/src/components/CustomTabBar';
import { useUserStore } from "@/src/store/userStore";
import images from "@/src/constants/images";

const TabIcon = ({ focused, icon, iconActive }: any) => {
  return (
    <View className="items-center justify-center">
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
          href: "/auth/search",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<images.search width={24} height={24} />}
              iconActive={
                <images.search
                  width={24}
                  height={24}
                  stroke="green"
                  strokeWidth={0.5}
                />
              }
              name="Pesquisar"
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
              icon={<images.note width={24} height={24} />}
              iconActive={
                <images.note
                  width={24}
                  height={24}
                  stroke="green"
                  strokeWidth={0.5}
                />
              }
              name="Relatório"
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
              icon={<images.folder width={24} height={24} />}
              iconActive={
                <images.folder
                  width={24}
                  height={24}
                  stroke="green"
                  strokeWidth={0.5}
                />
              }
              name="Autos"
              focused={focused}
            />
          ),
        }}
      />
      {tipo === "Admin" ? (
        <Tabs.Screen
          name="moderation"
          options={{
            title: "Moderação",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={<images.moderacao width={24} height={24} />}
                iconActive={
                  <images.moderacao
                    width={24}
                    height={24}
                    color="green"
                    strokeWidth={0.5}
                  />
                }
                name="Moderação"
                focused={focused}
              />
            ),
          }}
        />
      ) : (
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
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<images.settings width={24} height={24} />}
              iconActive={
                <images.settings
                  width={24}
                  height={24}
                  stroke="green"
                  strokeWidth={0.5}
                />
              }
              name="Configurações"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
