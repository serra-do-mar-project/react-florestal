import { Text } from "react-native";
import FormCard from "@/src/components/report/FormCard";
import { Forminput } from "@/src/components/report/FormInput";
import DropdownBox from "@/src/components/report/DropdownBox";
import DateTimePicker from "../components/report/DateTimePicker";
import { useFormManager } from "@/src/hooks/useFormManager"; // importa o hook

interface SectionProps {
  section: any;
  setFieldDynamic: (id: number, type: string, value: string | undefined) => void;
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
      onSelect={(value) => setFieldDynamic(def.id, def.type, value ?? undefined)}
      showError={showError}
    />
  ),
  string: (def, key, setFieldDynamic, showError) => (
    <Forminput
      key={key}
      title={def.name ?? ""}
      onChangeText={(value) => setFieldDynamic(def.id, def.type, value ?? undefined)}
      showError={showError}
    />
  ),
  date: (def, key, setFieldDynamic, showError) => (
    <DateTimePicker
      key={key}
      title={def.name ?? ""}
      onDateChange={(value) => setFieldDynamic(def.id, def.type, value ? value.join(" ") : undefined)}
      showError={showError}
    />
  ),
};


function normalizeSection(section: any) {
  const container = section[section.name] ?? [];
  return Array.isArray(container) ? container : [container];
}

export function Section({ section, setFieldDynamic, showError }: SectionProps & { showError: boolean }) {
  return (
    <FormCard title={section.name}>
      {normalizeSection(section).map((field, idx) =>
        renderers[field.type]?.(field, `${section.name}-${idx}`, setFieldDynamic, showError) ?? (
          <Text key={`${section.name}-${idx}`}>{field.name ?? "Campo"}</Text>
        )
      )}
    </FormCard>
  );
}

