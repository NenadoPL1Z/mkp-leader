import React from "react";
import { View } from "react-native";
import FieldTitle from "@app/components/FieldTitle";
import TextField from "@app/ui/TextField";
import FieldAction from "@app/components/FieldAction";
import { formatPhoneNumber } from "@app/lib/functions/formatPhoneNumber";
import { useACPersonalForm } from "./useACPersonalForm";
import { styles } from "../../index.styles";

const ACPersonalForm = () => {
  const {
    firstPhone,
    firstName,
    secondPhone,
    secondName,
    onCloserFirst,
    onCloserSecond,
  } = useACPersonalForm();

  return (
    <FieldTitle title="Контакты:">
      <View style={styles.field}>
        <View style={styles.field}>
          <TextField
            label="Телефон"
            required={true}
            value={formatPhoneNumber(firstPhone.field.value)}
            onChangeText={firstPhone.field.onChange}
            onClear={() => firstPhone.field.onChange("")}
            error={firstPhone.fieldState.error}
          />
        </View>
        <TextField
          label="Контактное лицо (ФИО)"
          required={true}
          value={firstName.field.value}
          onChangeText={firstName.field.onChange}
          onClear={() => firstName.field.onChange("")}
          error={firstName.fieldState.error}
        />
        <View style={styles.FMT8}>
          <FieldAction
            title="Очистить контакт"
            onPress={onCloserFirst}
          />
        </View>
      </View>
      <View style={[styles.FMT8, styles.field]}>
        <View style={styles.field}>
          <TextField
            label="Телефон"
            autoCorrect={false}
            autoCapitalize="none"
            value={formatPhoneNumber(secondPhone.field.value)}
            onChangeText={secondPhone.field.onChange}
            onClear={() => secondPhone.field.onChange("")}
            error={secondPhone.fieldState.error}
          />
        </View>
        <TextField
          label="Контактное лицо (ФИО)"
          autoCorrect={false}
          autoCapitalize="none"
          value={secondName.field.value}
          onChangeText={secondName.field.onChange}
          onClear={() => secondName.field.onChange("")}
          error={secondName.fieldState.error}
        />
        <View style={styles.FMT8}>
          <FieldAction
            title="Очистить контакт"
            onPress={onCloserSecond}
          />
        </View>
      </View>
    </FieldTitle>
  );
};

export default React.memo(ACPersonalForm);
