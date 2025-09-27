import { Text } from "react-native";
import FormCard from "@/src/components/report/FormCard";
import { Forminput } from "@/src/components/report/FormInput";
import DropdownBox from "@/src/components/report/DropdownBox";

const renderers: Record<string, (def: any, key: string) => JSX.Element> = {
  dropdown: (def, key) => (
    <DropdownBox
      key={key}
      title={def.name ?? ""}
      options={def.dropdown ?? []}
    />
  ),
  string: (def, key) => (
    <Forminput
      key={key}
      title={def.name ?? ""}
      onChangeText={() => ""}
    />
  ),
  date: (def, key) => (
    <Forminput
      key={key}
      title={def.name ?? ""}
      onChangeText={() => ""}
    />
  ),
};

function normalizeSection(section: any) {
  const container = section[section.name] ?? [];
  return Array.isArray(container) ? container : [container];
}

export function Section({ section }: { section: any }) {
  return (
    <FormCard title={section.name}>
      {normalizeSection(section).map((field, idx) =>
        renderers[field.type]?.(field, `${section.name}-${idx}`) ?? (
          <Text key={`${section.name}-${idx}`}>
            {field.name ?? "Campo"}
          </Text>
        )
      )}
    </FormCard>
  );
}
