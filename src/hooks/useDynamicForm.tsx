import { Text } from "react-native";
import FormCard from "@/src/components/report/FormCard";
import { Forminput } from "@/src/components/report/FormInput";
import DropdownBox from "@/src/components/report/DropdownBox";
import DateTimePicker from "../components/report/DateTimePicker";
import RadioButton from "@/src/components/report/RadioButton";

interface SectionProps {
  section: any;
  currentPage: number;
  totalPages: number;
  setFieldDynamic: (id: number, value: string | undefined) => void;
  showError: boolean;
}

const renderers: Record<
  string,
  (def: any, key: string, setFieldDynamic: SectionProps["setFieldDynamic"], showError: boolean) => JSX.Element
> = {
  dropdown: (def, key, setFieldDynamic, showError) => (
    <DropdownBox
      key={key}
      title={def.name ?? ""}
      options={def.dropdown ?? []}
      onSelect={(value) => setFieldDynamic(def.id, value ?? undefined)}
      showError={showError}
    />
  ),
  string: (def, key, setFieldDynamic, showError) => (
    <Forminput
      key={key}
      title={def.name ?? ""}
      label={def?.description ?? ""}
      onChangeText={(value) => setFieldDynamic(def.id, value ?? undefined)}
      showError={showError}
    />
  ),
  integer: (def, key, setFieldDynamic, showError) => (
    <Forminput
      key={key}
      title={def.name ?? ""}
      label={def?.description ?? ""}
      onChangeText={(value) => setFieldDynamic(def.id, value ?? undefined)}
      showError={showError}
      keyboardType="number-pad"
    />
  ),
  date: (def, key, setFieldDynamic, showError) => (
    <DateTimePicker
      key={key}
      title={def.name ?? ""}
      onDateChange={(value) => setFieldDynamic(def.id, value ? value.join(" ") : undefined)}
      showError={showError}
    />
  ),
  boolean: (def, key, setFieldDynamic, showError) => (
    <RadioButton
      key={key}
      title={def.name ?? ""}
      options={["Sim", "Não"]}
      onSelect={(value) => setFieldDynamic(def.id, value as string )}
      showError={showError}
      multiSelect={false}
    />
  ),
};


function normalizeSection(section: any) {
  const container = section[section.name] ?? [];
  return Array.isArray(container) ? container : [container];
}

export function Section({ section, setFieldDynamic, showError, currentPage, totalPages }: SectionProps & { showError: boolean }) {

  return (
    <FormCard title={section.name} currentPage={currentPage} totalPages={totalPages}>
      {normalizeSection(section).map((field, idx) =>
        renderers[field.type]?.(field, `${section.name}-${idx}`, setFieldDynamic, showError) ?? (
          <Text key={`${section.name}-${idx}`}>{field.name ?? "Campo"}</Text>
        )
      )}
    </FormCard>
  );
}

