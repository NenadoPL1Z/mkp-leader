import React, { useState } from "react";
import TFSearch from "@app/ui/TextField/variant/TFSearch";
import { debounce } from "@app/lib/functions/debounce";
import type { TextFieldProps } from "@app/ui/TextField/types";

type Props = Partial<Pick<TextFieldProps, "left">> & {
  placeholder: string;
  handleChangeSearch: (text: string) => void;
};

const handleDebounce = debounce(1000);

const PaginationSearch = ({
  placeholder,
  handleChangeSearch,
  ...props
}: Props) => {
  const [value, setValue] = useState<string>("");

  const onChangeText = (text: string) => {
    setValue(text);

    handleDebounce(() => {
      handleChangeSearch(text);
    });
  };

  const handlePressClear = () => {
    setValue("");
    handleChangeSearch("");
  };

  return (
    <TFSearch
      {...props}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onClear={handlePressClear}
    />
  );
};

export default React.memo(PaginationSearch);
