import './global.css'
import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StatusBar as HiddenBar } from 'react-native';
import db from '../db/connection';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../../drizzle/migrations';
import { useEffect } from 'react';
import { ExemploDeCasoTable } from '../db/schema';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { loadExemploDeCaso } from '../lib/utils';
import { useUserStore } from '../store/userStore';

// Desabilita o modo strict do Reanimated para evitar warnings
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});



export default function MainLayout() {
  const { token } = useUserStore();

  // Carregue as fontes aqui
  const [fontsLoaded] = useFonts({
    'BaiJamjuree-Regular': require('../../assets/fonts/BaiJamjuree-Regular.ttf'),
    'BaiJamjuree-Bold': require('../../assets/fonts/BaiJamjuree-Bold.ttf'),
    'BaiJamjuree-Italic': require('../../assets/fonts/BaiJamjuree-Italic.ttf'),
    'BaiJamjuree-SemiBold': require('../../assets/fonts/BaiJamjuree-SemiBold.ttf'),
    'BaiJamjuree-Medium': require('../../assets/fonts/BaiJamjuree-Medium.ttf'),
    // adicione outros estilos se quiser
  });


  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    console.log("Migrations success:", success);
  }, [success]);

  useEffect(() => {
    if (error) console.error("Migration error:", error);
  }, [error]);

  useEffect(() => {
    if (!success) return console.log("Aguardando migrações...");
    (async () => {
      try {

        await db.delete(ExemploDeCasoTable);
        if (token) {
          const exemploDeCaso = await loadExemploDeCaso(token);
          exemploDeCaso.map(async item => await db.insert(ExemploDeCasoTable).values([
            {
              id: item.id,
              nome_resumo: item.nome_resumo,
              nome_completo: item.nome_completo,
              palavra_chave: item.palavra_chave,
              categoria: item.categoria,
              tags: item.tags,
              proc_op: item.proc_op,
              proc_adm: item.proc_adm,
              enq_pen: item.enq_pen,
              enq_adm: item.enq_adm,
              modelo: item.modelo,
              tipo_ocorrencia: item.tipo_ocorrencia,
              campos: item.campos,
            }
          ]));
        }
      } catch (error) {
        console.error("Error during migration:", error);
      }
    })();
  }, [success, error, token]);

  return (

    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar translucent style="dark" />
      </GestureHandlerRootView>
    </>
  );
}
