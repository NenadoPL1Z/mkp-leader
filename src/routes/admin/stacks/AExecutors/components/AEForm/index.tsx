import React from "react";
import { View } from "react-native";
import TextField from "@app/ui/TextField";
import GeneratePassword from "@app/components/GeneratePassword";
import { formatPhoneNumber } from "@app/lib/functions/formatPhoneNumber";
import { formatOnlyNumber } from "@app/lib/functions/formatOnlyNumber";
import { styles } from "./index.styles";
import { useAEForm } from "./useAEEForm";

const AEForm = () => {
  const { username, password, name, phone } = useAEForm();

  return (
    <>
      <View style={styles.form}>
        <View style={styles.field}>
          <TextField
            label="Логин"
            required={true}
            autoCorrect={false}
            autoCapitalize="none"
            value={username.field.value}
            onChangeText={username.field.onChange}
            onClear={() => username.field.onChange("")}
            error={username.fieldState.error}
          />
        </View>
        <View>
          <TextField
            label="Пароль"
            required={true}
            autoCorrect={false}
            secureTextEntry={false}
            autoCapitalize="none"
            value={password.field.value}
            onChangeText={password.field.onChange}
            onClear={() => password.field.onChange("")}
            error={password.fieldState.error}
          />
          <View style={styles.generate}>
            <GeneratePassword onChange={password.field.onChange} />
          </View>
        </View>
      </View>
      <View style={styles.field}>
        <TextField
          label="ФИО"
          required={true}
          autoCorrect={false}
          autoCapitalize="none"
          value={name.field.value}
          onChangeText={name.field.onChange}
          onClear={() => name.field.onChange("")}
          error={name.fieldState.error}
        />
      </View>
      <View>
        <TextField
          label="Телефон"
          required={true}
          autoCorrect={false}
          autoCapitalize="none"
          value={formatPhoneNumber(phone.field.value)}
          onChangeText={(e) => phone.field.onChange(formatOnlyNumber(e))}
          onClear={() => phone.field.onChange("")}
          error={phone.fieldState.error}
        />
      </View>
    </>
  );
};

export default React.memo(AEForm);
