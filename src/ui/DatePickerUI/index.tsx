import React, { useMemo, useState } from "react";
import TextField from "@app/ui/TextField";
import DatePicker from "react-native-date-picker";
import { StyleSheet, TouchableOpacity } from "react-native";
import { getTime } from "@app/lib/functions/getTime";
import { getYear } from "@app/lib/functions/getYear";
import type { TextFieldProps } from "@app/ui/TextField/types";
import type { DatePickerProps } from "react-native-date-picker";
import type { SvgFC, SvgPropsFixed } from "@app/types/general";

type Props = {
  value: string;
  onChange: (value: string) => void;
  beforeIcon?: SvgFC;
  iconProps?: SvgPropsFixed;
  textFieldProps?: Partial<Omit<TextFieldProps, "ref">>;
  pickerProps?: Partial<DatePickerProps>;
};

const DatePickerUI = ({
  value,
  onChange,
  beforeIcon,
  iconProps = {},
  textFieldProps = {},
  pickerProps = {},
}: Props) => {
  const { mode } = pickerProps;

  const date = new Date(value || Date.now());
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const mutationDate = useMemo(() => {
    if (mode === "time") {
      return getTime;
    }
    if (mode === "date") {
      return getYear;
    }
    return (localDate: Date) => localDate.toString();
  }, [mode]);

  const displayDate = value ? mutationDate(date) : "";

  const onPress = () => {
    setIsVisible(true);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <TextField
        disabled={true}
        inputStyle={styles.pointer}
        left={
          beforeIcon
            ? {
                activeOpacity: 0,
                disabled: true,
                inputStyle: { paddingLeft: 40 },
                Icon: beforeIcon,
                iconProps,
              }
            : undefined
        }
        {...textFieldProps}
        value={displayDate}
        onClear={() => onChange("")}
      />
      <DatePicker
        modal={true}
        theme="light"
        title=" "
        cancelText="Отменить"
        confirmText="Подтвердить"
        {...pickerProps}
        open={isVisible}
        date={date}
        onConfirm={(date) => {
          setIsVisible(false);
          onChange(date.toString());
        }}
        onCancel={() => {
          setIsVisible(false);
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pointer: {
    pointerEvents: "none",
  },
});

export default React.memo(DatePickerUI);
