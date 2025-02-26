import React from "react";
import { View } from "react-native";
import TextField from "@app/ui/TextField";
import TFPassword from "@app/ui/TextField/variant/TFPassword";
import { useAuthForm } from "./useAuthForm";
import { styles } from "./index.styles";

const AuthForm = () => {
  const { username, password, onChangeUsername, onChangePassword } =
    useAuthForm();

  const usernameValue = username.field.value;
  const passwordValue = password.field.value;

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextField
          isClear={false}
          variant="outlined"
          label={usernameValue.length ? "Логин" : ""}
          placeholder={!usernameValue.length ? "Логин" : ""}
          autoCapitalize="none"
          value={usernameValue}
          onChangeText={onChangeUsername}
          errorMessage={username.fieldState.error?.message || ""}
        />
      </View>
      <TFPassword
        isClear={false}
        variant="outlined"
        label={passwordValue.length ? "Пароль" : ""}
        placeholder={!passwordValue.length ? "Пароль" : ""}
        autoCapitalize="none"
        value={passwordValue}
        onChangeText={onChangePassword}
        errorMessage={password.fieldState.error?.message || ""}
      />
    </View>
  );
};

export default React.memo(AuthForm);
