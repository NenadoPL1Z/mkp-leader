import React from "react";
import { View } from "react-native";
import TextField from "@app/ui/TextField";
import GeneratePassword from "@app/components/GeneratePassword";
import { useACUserForm } from "./useACUserForm";
import { styles } from "../../index.styles";

const ACUserForm = () => {
  const { username, password } = useACUserForm();

  return (
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
        <View style={styles.FMT8}>
          <GeneratePassword onChange={password.field.onChange} />
        </View>
      </View>
    </View>
  );
};

export default React.memo(ACUserForm);
