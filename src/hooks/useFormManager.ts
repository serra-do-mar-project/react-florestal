import { useState } from "react";

export interface UseFormManagerProps {
  onSubmitSuccess?: (form: Record<string, any>) => void;
  onSubmitError?: (form: Record<string, any>) => void;
}

export const useFormManager = ({ onSubmitSuccess, onSubmitError }: UseFormManagerProps = {}) => {
  const [form, setForm] = useState<Record<string, any>>({});
  const [dynamicForm, setDynamicForm] = useState<Array<Record<string, any>>>([]);
  const [trowError, setTrowError] = useState<boolean>(false);
  const [requiredFields, setRequiredFields] = useState<Set<string>>(new Set());

  // (para formulários estáticos)
  const setField = (fieldName: string, value: string | string[] | boolean | (string | boolean)[] | null | undefined, required: boolean = true) => {
    // Sempre registra o campo como obrigatório ou não, independentemente do valor
    // Isso garante que o campo seja rastreado desde a montagem
    setRequiredFields(prevRequired => {
      const newSet = new Set(prevRequired);
      if (required) {
        newSet.add(fieldName);
      } else {
        newSet.delete(fieldName);
      }
      return newSet;
    });

    // Atualiza o formulário
    setForm(prev => {
      const next = { ...prev };
      
      // Se o valor for null ou undefined, marca como vazio mas mantém no form
      if (value === null || value === undefined) {
        next[fieldName] = "";
        return next;
      }
      
      // Se o valor for booleano, mantém como booleano
      if (typeof value === 'boolean') {
        next[fieldName] = value;
        return next;
      }
      
      // Converte array para string
      const stringValue = Array.isArray(value) ? value.join(", ") : value;
      
      // Adiciona o valor (mesmo que vazio)
      next[fieldName] = stringValue;
      
      return next;
    });
  };

  // (para formulários vindos do backend)
  const setDynamicField = (id: number, value: string | string[] | undefined) => {
    setDynamicForm(prev => {
      const stringValue = Array.isArray(value) ? value.join(", ") : (value ?? "");
      
      // Busca se já existe um campo com este id
      const existingIndex = prev.findIndex(field => field.id === id);

      if (existingIndex !== -1) {
        // Atualiza o campo existente
        const updated = [...prev];
        updated[existingIndex] = { id, value: stringValue };
        return updated;
      } else {
        // Adiciona novo campo
        return [...prev, { id, value: stringValue }];
      }
    });
  };

  const validateForm = (formData: Record<string, any>) => {
    // Verifica se todos os campos obrigatórios estão presentes e preenchidos
    for (const fieldName of requiredFields) {
      const fieldValue = formData[fieldName];
      
      // Verifica se o campo existe
      if (!(fieldName in formData)) {
        return true; // tem erro
      }
      
      // Para booleanos, qualquer valor (true/false) é válido
      if (typeof fieldValue === "boolean") {
        continue; // campo válido
      }
      
      // Para strings, verifica se não está vazio
      if (typeof fieldValue === "string" && fieldValue.trim() === "") {
        return true; // tem erro
      }
      
      // Para outros tipos, verifica se não é null/undefined
      if (fieldValue === null || fieldValue === undefined) {
        return true; // tem erro
      }
    }
    
    return false; // sem erros
  };

  const handleSubmit = () => {
    // Se dynamicForm tem dados, usa ele; senão, usa form
    const formToSubmit = dynamicForm.length > 0 ? dynamicForm : form;
    
    const hasUndefined = validateForm(form);

    // Validação adicional para dynamicForm
    let hasDynamicError = false;
    if (dynamicForm.length > 0) {
      // Verifica se algum campo dinâmico está vazio ou undefined
      hasDynamicError = dynamicForm.some(field => {
        const value = field.value;
        return value === undefined || value === null || value === "" || (typeof value === "string" && value.trim() === "");
      });
    }

    if (hasUndefined || hasDynamicError) {
      setTrowError(true);
      onSubmitError?.(formToSubmit);
      return false;
    }

    setTrowError(false);
    onSubmitSuccess?.(formToSubmit);
    return true;
  };

  const resetForm = () => {
    setForm({});
    setDynamicForm([]);
    setRequiredFields(new Set());
    setTrowError(false);
  };

  return {
    form,
    dynamicForm,     // array para formulários dinâmicos
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
