import React from "react";
import { View, TouchableOpacity } from "react-native";
import TextField from "@app/ui/TextField";
import FieldTitle from "@app/components/FieldTitle";
import { BeforeDateIcon, AfterDateIcon } from "@app/assets/icons/dist";
import { Colors } from "@app/theme/colors";
import CheckBoxUI from "@app/ui/CheckBoxUI";
import DatePickerUI from "@app/ui/DatePickerUI";
import {
  FIRST_EXECUTOR_NAME,
  SECOND_EXECUTOR_NAME,
} from "@app/lib/constants/executors.ts";
import { getExecutorControllerValue } from "./helpers";
import { useACCompanyForm } from "./useACCompanyForm";
import { styles } from "../../index.styles";

const ACCompanyForm = () => {
  const {
    name,
    address,
    executorDefault,
    executorAdditional,
    openingTime,
    closingTime,
    onlyWeekdays,
    handlePressAddress,
    handlePressDefaultExecutor,
    handlePressAdditionalExecutor,
  } = useACCompanyForm();

  return (
    <>
      <View style={styles.form}>
        <View style={styles.field}>
          <TextField
            label="Название"
            required={true}
            autoCorrect={false}
            autoCapitalize="none"
            value={name.field.value}
            onChangeText={name.field.onChange}
            onClear={() => name.field.onChange("")}
            error={name.fieldState.error}
          />
        </View>
        <TouchableOpacity
          style={styles.field}
          onPress={handlePressAddress}>
          <TextField
            label="Адрес"
            required={true}
            disabled={true}
            scrollEnabled={false}
            inputStyle={styles.pointer}
            value={address.field.value || ""}
            error={address.fieldState.error}
            onClear={() => address.field.onChange("")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.field}
          onPress={handlePressDefaultExecutor}>
          <TextField
            label={FIRST_EXECUTOR_NAME}
            value={getExecutorControllerValue(executorDefault)}
            disabled={true}
            required={true}
            inputStyle={styles.pointer}
            error={executorDefault.fieldState.error}
            isClear={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressAdditionalExecutor}>
          <TextField
            label={SECOND_EXECUTOR_NAME}
            value={getExecutorControllerValue(executorAdditional)}
            disabled={true}
            inputStyle={styles.pointer}
            error={executorAdditional.fieldState.error}
            onClear={() => executorAdditional.field.onChange(null)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <FieldTitle title="Время работы:">
          <View style={[styles.fields, styles.field]}>
            <View style={styles.field50}>
              <DatePickerUI
                value={openingTime.field.value}
                onChange={openingTime.field.onChange}
                beforeIcon={BeforeDateIcon}
                iconProps={{ width: 13, height: 20, color: Colors.GRAY_SEVEN }}
                pickerProps={{ mode: "time" }}
              />
            </View>
            <View style={styles.field50}>
              <DatePickerUI
                value={closingTime.field.value}
                onChange={closingTime.field.onChange}
                beforeIcon={AfterDateIcon}
                iconProps={{ width: 23, height: 20, color: Colors.GRAY_SEVEN }}
                pickerProps={{ mode: "time" }}
              />
            </View>
          </View>
          <View>
            <CheckBoxUI
              containerStyle={styles.checkbox}
              title="Только по будням"
              checked={onlyWeekdays.field.value}
              onPress={() =>
                onlyWeekdays.field.onChange(!onlyWeekdays.field.value)
              }
            />
          </View>
        </FieldTitle>
      </View>
    </>
  );
};

export default React.memo(ACCompanyForm);
