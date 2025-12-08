import React from "react";
import { View } from "react-native";
import TextField from "@app/ui/TextField";
import TFPassword from "@app/ui/TextField/variant/TFPassword";
import ButtonUI from "@app/ui/ButtonUI";
import { Colors } from "@app/theme/colors.ts";
import { useAuthForm } from "./useAuthForm";
import { styles } from "./index.styles";
import type { AuthFormProps } from "./types";

const AuthForm = ({ onPressReset }: AuthFormProps) => {
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
          label={usernameValue.length ? "Логин или почта" : ""}
          placeholder={!usernameValue.length ? "Логин или почта" : ""}
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
      <View style={{ alignItems: "flex-end", paddingTop: 5 }}>
        <ButtonUI
          variant="text"
          buttonStyle={{ paddingRight: 0 }}
          titleStyle={{ color: Colors.WHITE }}
          onPress={onPressReset}>
          Восстановление пароля
        </ButtonUI>
      </View>
    </View>
  );
};

export default React.memo(AuthForm);
