import { useState } from 'react';

export interface UseFormManagerProps {
  onSubmitSuccess?: (form: any[]) => void;
  onSubmitError?: (form: any[]) => void;
}

export const useFormManager = ({ onSubmitSuccess, onSubmitError }: UseFormManagerProps = {}) => {
  const [form, setForm] = useState<any[]>([]);
  const [trowError, setTrowError] = useState<boolean>(false);

  const setField = (fieldIndex: number, valueIndex: number, value: string | string[] | null | undefined) => {
    const stringValue = Array.isArray(value) ? value.join(', ') : (value as string | null | undefined);
    setForm(prev => {
      const next = Array.isArray(prev) ? [...prev] : [];
      if (!next[fieldIndex]) next[fieldIndex] = { [fieldIndex]: [] } as any;
      if (!next[fieldIndex][fieldIndex]) next[fieldIndex][fieldIndex] = [];
      next[fieldIndex][fieldIndex][valueIndex] = stringValue;
      return next;
    });
  };

  const validateForm = (formData: any[]) => {
    return formData.some((field: any) => {
      if (!field) return true;
      const valores = Object.values(field)[0] as any[];
      return valores?.some((v: any) => v === undefined || v === "");
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
    setField,
    handleSubmit,
    validateForm,
    resetForm,
    trowError,
    setTrowError
  };
};