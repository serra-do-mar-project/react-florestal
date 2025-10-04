import { useState } from "react";

export interface UseFormManagerProps {
  onSubmitSuccess?: (form: any[]) => void;
  onSubmitError?: (form: any[]) => void;
}

export const useFormManager = ({ onSubmitSuccess, onSubmitError }: UseFormManagerProps = {}) => {
  const [form, setForm] = useState<any[]>([]);
  const [trowError, setTrowError] = useState<boolean>(false);

  // (para formulários estáticos)
  const setField = (fieldIndex: number, valueIndex: number, value: string | string[] | null | undefined) => {
    const stringValue = Array.isArray(value) ? value.join(", ") : (value as string | null | undefined);
    setForm(prev => {
      const next = Array.isArray(prev) ? [...prev] : [];
      if (!next[fieldIndex]) next[fieldIndex] = { [fieldIndex]: [] } as any;
      if (!next[fieldIndex][fieldIndex]) next[fieldIndex][fieldIndex] = [];
      next[fieldIndex][fieldIndex][valueIndex] = stringValue;
      return next;
    });
  };

  // (para formulários vindos do backend)
  const setDynamicField = (id: number, value: string | string[] | undefined) => {
    setForm(prev => {
      const next = [...prev];
      const index = next.findIndex(f => f.id === id);
      
      const stringValue = Array.isArray(value) ? value.join(", ") : (value ?? undefined);

      if (index !== -1) {
        next[index] = { ...next[index], value: stringValue };
      } else {
        next.push({ id, value: stringValue });
      }
      
      return next;
    });
  };

  const validateForm = (formData: any[]) => {
    return formData.some(field => {
      // caso antigo: estrutura aninhada
      if (typeof field === "object" && Object.keys(field)[0]?.match(/^\d+$/)) {
        const valores = Object.values(field)[0] as any[];
        return valores?.some(v => v === undefined || v === "");
      }
      // caso novo: {id, type, value}
      return !field.value || field.value.trim() === "";
    });
  };

  const handleSubmit = () => {
    const hasUndefined = validateForm(form);

    if (hasUndefined) {
      console.log("Erro: Existem campos undefined");
      console.log(form);
      setTrowError(true);
      onSubmitError?.(form);
      return false;
    }

    console.log("Formulário válido");
    console.log(form);
    setTrowError(false);
    onSubmitSuccess?.(form);
    return true;
  };

  const resetForm = () => {
    setForm([]);
    setTrowError(false);
  };

  return {
    form,
    setForm,
    setField,        // usado em forms estáticos
    setDynamicField, // usado em forms dinâmicos
    handleSubmit,
    validateForm,
    resetForm,
    trowError,
    setTrowError,
  };
};
