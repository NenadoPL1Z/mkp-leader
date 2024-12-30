import React from "react";
import { generatePassword } from "@app/lib/functions/generatePassword";
import FieldAction from "@app/components/FieldAction";

type Props = {
  onChange: (text: string) => void;
};

const GeneratePassword = ({ onChange }: Props) => {
  const handleGenerate = () => {
    onChange(generatePassword());
  };

  return (
    <FieldAction
      title="Сгенерировать пароль"
      onPress={handleGenerate}
    />
  );
};
export default React.memo(GeneratePassword);
