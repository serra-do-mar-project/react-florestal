import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatReport(response: any[]) {
  const formatedResponse: Record<string, any> = {};

  // Mapeamento de campos específicos
  const customMapping: Record<string, (response: any[]) => any> = {
    "1": () => response[1],
    "2": () => `${response[2]}, ${response[3]}`,
    "3": () => response[4],
    "4": () => response[5],
    "5": () => `${response[6]}, ${response[7]}`,
    "6": () => `${response[8]}, ${response[9]}`,
    "7": () => response[10],

    "8": () => response[11],
    "9": () => response[9],
    "10": () => response[10],
    "11": () => response[11],
    "12": () => response[12],
    "13": () => response[13],
    "14": () => response[14],
    "15": () => response[15],
    "16": () => response[16],
    "17": () => response[17],
    "18": () => response[18],
    "19": () => response[19],
    "20": () => response[20],
    "21": () => response[21],
    "22": () => response[22],
    "23": () => response[23],
    "24": () => response[24],
    "25": () => response[25],
    "26": () => response[26],
  };

  
  for (let i = 1; i <= 26; i++) {
    const key = i.toString();
    formatedResponse[key] = customMapping[key]
      ? customMapping[key](response) // Aplica a lógica customizada
      : response[i - 1]; // Mantém o valor original
  }

  return console.log(response[1]);
}