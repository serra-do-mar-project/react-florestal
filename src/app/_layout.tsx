import './global.css'
import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import db from '../db/connection';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../../drizzle/migrations';
import { useEffect } from 'react';
import { infracoesTable } from '../db/schema';

export default function MainLayout() {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (!success) return;
    (async () => {
      await db.delete(infracoesTable);
      await db.insert(infracoesTable).values([
        {
          nome_resumo: "Abate de animal",
          nome_compelto: "Flagrar o individuo matando/abatendo o animal",
          palavra_chave: "Matar animal",
          categoria: "fauna",
          tags: "",
          exemplo: "nada",
          definição: "nada",
          proc_OP: `
            1- Verificar se é possível uma abordagem segura;
            2- Fazer a abordagem do indíviduo;
            2- Registrar a ação com foto e/ou vídeo; 
            3- Informá-lo sobre o crime ambiental utilizando a legislação infringida (se possível o Artigo);
            4- Comunicar imediatamente a PAMB para a devida autuação e apoio;
            5- Comunicar imediatamente o Gestor da UC para ciência e apoio;
            6- Apreender o armamento, instrumento ou armadilha;
            7- Apreender o animal abatido (prova do crime);
            8- Elaborar o ACIA/RVA (qualificação, coordenadas, etc.);
            9- Encaminhar o(s) infratores(es) ao DP responsável pela área para lavratura do BOPC (sempre na presença de um funcionário da FF ou IF).`,
          proc_ADM: "Elaboração de ACIA",
          enquad_PEN: "Art. 29, § 4º(A pena é aumentada de metade por ser praticado em Unidade de Conservação) da Lei Federal nº 9.605/1998 § 5 .",
          enquad_ADM: "Art. 25 da Resolução SIMA 05/2021",
          formulario: `
            Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 25 da Resolução SIMA N° 05/2021, por matar animal (is) silvestre (s) da(s) espécie (s)_______________, mediante atividade de caça. Foram qualificada (s) a(s) seguintes pessoas: _____(Nome completo). Com o infrator foi localizado (tipo da arma de fogo, instrumento ou armadilha)_____________. Tal crime foi constatado no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). O infrator, o instrumento de caça e o animal abatido foram encaminhados ao (informar o distrito policial)_______________ para lavratura do boletim de ocorrência e registro da apreensão.`,
          tipo_ocorrencia: "Art. 25 da Resolução SIMA 05/2021 MATAR, PERSEGUIR, CAÇAR, APANHAR, COLETAR OU UTILIZAR ESPÉCIMES DA FAUNA SILVESTRE, NATIVOS OU EM ROTA MIGRATÓRIA, SEM A DEVIDA PERMISSÃO, LICENÇA OU AUTORIZAÇÃO DA AUTORIDADE COMPETENTE, OU EM DESACORDO COM A OBTIDA",
          campos: "[]",
        },
        {
          nome_resumo: "perseguição de animal",
          nome_compelto: "Flagrar o individuo seguindo/perseguindo de perto, indo ao encalço do animal silvestre;",
          palavra_chave: "Perseguir animal",
          categoria: "fauna",
          tags: "",
          exemplo: "nada",
          definição: "nada",
          proc_OP: `
            1- Verificar se é possível uma abordagem segura;
            2- Fazer a abordagem do indíviduo;
            2- Registrar a ação com foto e/ou vídeo; 
            3- Informá-lo sobre o crime ambiental utilizando a legislação infringida (se possível o Artigo);
            4- Comunicar imediatamente a PAMB para a devida autuação e apoio;
            5- Comunicar imediatamente o Gestor da UC para ciência e apoio;
            6- Apreender o armamento, instrumento ou armadilha;
            7- Elaborar o ACIA/RVA (qualificação, coordenadas, etc.);
            8- Encaminhar o(s) infratores(es) ao DP responsável pela área para lavratura do BOPC (sempre na presença de um funcionário da FF ou IF).`,
          proc_ADM: "Elaboração de ACIA",
          enquad_PEN: "Art. 29, § 4º(A pena é aumentada de metade por ser praticado em Unidade de Conservação) da Lei Federal nº 9.605/1998 § 5 .",
          enquad_ADM: "Art. 25 da Resolução SIMA 05/2021",
          formulario: `
            Em fiscalização ________(de rotina ou integrada ao PELOTÃO/COMPANHIA/BATALHÃO),  na Estrada XXXXXX, Bairro XXXXXX, Setor XXXXXXXX, às XX:XX horas, foi constatada a infração tipificada no Art. 25 da Resolução SIMA N° 05/2021, por perseguir animal (is) silvestre (s) da(s) espécie (s)_______________, mediante atividade de caça. Foram qualificada (s) a(s) seguintes pessoas: _____(Nome completo). Com o infrator foi localizado (tipo da arma de fogo, instrumento ou armadilha)_____________. Tal crime foi constatado no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, sob as coordenadas Lat. -XXXXXXX° / Long. -XXXXXXXXX° (colher coordenadas no interior da área da ocorrência). O infrator e o instrumento de caça foram encaminhados ao (informar o distrito policial)_______________ para lavratura do boletim de ocorrência e registro da apreensão.`,
          tipo_ocorrencia: "Art. 25 da Resolução SIMA 05/2021 MATAR, PERSEGUIR, CAÇAR, APANHAR, COLETAR OU UTILIZAR ESPÉCIMES DA FAUNA SILVESTRE, NATIVOS OU EM ROTA MIGRATÓRIA, SEM A DEVIDA PERMISSÃO, LICENÇA OU AUTORIZAÇÃO DA AUTORIDADE COMPETENTE, OU EM DESACORDO COM A OBTIDA",
          campos: "[]",
        },
        {
          nome_resumo: "Aves nativas engaioladas",
          nome_compelto: "Encontrar aves de espécies nativas engaioladas sem a devida autorização - Com a presença do infrator",
          palavra_chave: "Aves",
          categoria: "fauna",
          tags: "Com a presença do infrator",
          exemplo: "nada",
          definição: "nada",
          proc_OP: `
            AÇÃO PRIMÁRIA:
            1-Fazer a abordagem do indíviduo;
            2- Registrar a ação com foto e/ou vídeo; 
            3- Informá-lo sobre o crime ambiental utilizando a legislação infringida (se possível o Artigo);

            AÇÃO SECUNDÁRIA:
            - Comunicar imediatamente a PAMB para a devida autuação e apoio.
            - Apreender o instrumento ou ferramenta;
            - Elaborar o ACIA/RMA (qualificação, coordenadas, etc.);
            - Encaminhar o(s) infratores(es) ao DP responsável pela área para lavratura do BOPC (sempre na presença de um funcionário da FF ou IF).`,
          proc_ADM: "Elaboração de ACIA",
          enquad_PEN: "Art. 29, § 1º, § 4º(A pena é aumentada de metade por ser praticado em Unidade de Conservação) da Lei Federal nº 9.605/1998 I - contra espécie rara ou considerada ameaçada de extinção, ainda que somente no local da infração",
          enquad_ADM: "Art. 25 da Resolução SIMA 05/2021",
          formulario: `
            Em fiscalização ________(de rotina/integrada ao pelotão X/DEJEM), o(s) infrator(es) _____(ex. AD 01) foi/foram qualificados por _________ Vender, expôr à venda, exportar ou adquirir, guardar, ter em cativeiro ou depósito, utilizar ou transportar ovos ou espécimes da fauna silvestre, nativa ou em rota migratória, bem como produtos e objetos dela oriundos, provenientes de criadouros não autorizados, sem a devida permissão, licença ou autorização da autoridade ambiental competente ou em desacordo com a obtida), no interior do Parque Estadual Serra do Mar- Núcleo Caraguatatuba, Unidade de Conservação de Proteção Integral, incorrendo no disposto do art. 25 § 3º da Resolução SMA 48/2014 e do art. 29,§1º,§ 4º da Lei Federal nº 9.605/1998`,
          tipo_ocorrencia: "Art. 25 da Resolução SIMA 05/2021 § 3°, Item III VENDER, EXPÔR À VENDA, EXPORTAR OU ADQUIRIR, GUARDAR, TER EM CATIVEIRO OU DEPÓSITO, UTILIZAR OU TRANSPORTAR OVOS, LARVAS OU ESPÉCIMES DA FAUNA SILVESTRE, NATIVA OU EM ROTA MIGRATÓRIA, BEM COMO PRODUTOS E OBJETOS DELA ORIUNDOS, PROVENIENTES DE CRIADOUROS NÃO AUTORIZADOS, SEM A DEVIDA PERMISSÃO, LICENÇA OU AUTORIZAÇÃO DA AUTORIDADE AMBIENTAL COMPETENTE OU EM DESACORDO COM A OBTIDA",
          campos: "[]",
        },
      ]);
    })();
  }, [success]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false}}/>
      <StatusBar translucent style="dark" />
    </>
  );
}
