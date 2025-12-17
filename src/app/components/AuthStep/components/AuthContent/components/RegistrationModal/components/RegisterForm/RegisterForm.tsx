import { useController, useFormContext } from "react-hook-form";
import { View } from "react-native";
import TextField from "@app/ui/TextField";
import TFPassword from "@app/ui/TextField/variant/TFPassword";
import { ValidateRulesUI } from "@app/ui/ValidateRulesUI";
import CheckBoxUI from "@app/ui/CheckBoxUI";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors.ts";
import DocItem from "@app/components/Documentation/components/DocItem";
import { BASE_URL } from "@app/lib/constants";
import { Api } from "@app/lib/constants/api.ts";
import { useState } from "react";
import { styles } from "./styles";
import type { RegisterForm as RegisterFormType } from "@app/lib/models/form/RegisterForm";

export const RegisterForm = () => {
  const { control } = useFormContext<RegisterFormType>();
  const [userAccept, setUserAccept] = useState(false);
  const [policy, setPolicy] = useState(false);

  const username = useController({
    name: "username",
    control,
    rules: {
      required: "Обязательное поле",
      maxLength: { value: 30, message: "Макс. количество символов 30" },
    },
  });

  const password = useController({
    name: "password",
    control,
    rules: {
      required: "Обязательное поле",
      maxLength: { value: 30, message: "Макс. количество символов 30" },
    },
  });

  const acceptDocs = useController({
    name: "acceptDocs",
    control,
  });

  const onChangeUsername = (text: string) => {
    username.field.onChange(text.trim());
  };

  const onChangePassword = (text: string) => {
    password.field.onChange(text.trim());
  };

  const usernameValue = username.field.value;
  const passwordValue = password.field.value;

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextField
          isClear={false}
          variant="outlined"
          label={usernameValue.length ? "Почта" : ""}
          placeholder={!usernameValue.length ? "Почта" : ""}
          autoCapitalize="none"
          value={usernameValue}
          keyboardType="email-address"
          autoCorrect={false}
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
      <ValidateRulesUI value={passwordValue} />
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
        }}>
        <CheckBoxUI
          checked={acceptDocs.field.value}
          onPress={() => acceptDocs.field.onChange(!acceptDocs.field.value)}
          containerStyle={{
            backgroundColor: "transparent",
            paddingVertical: 0,
            margin: 0,
            marginLeft: 0,
          }}
        />
        <Typography
          fontSize={14}
          lineHeight={16}
          color={Colors.WHITE}>
          Я согласен с{" "}
          <Typography
            fontSize={14}
            lineHeight={16}
            color={Colors.PRIMARY}
            onPress={() => setUserAccept(true)}>
            пользовательским соглашением
          </Typography>{" "}
          и{" "}
          <Typography
            fontSize={14}
            lineHeight={16}
            color={Colors.PRIMARY}
            onPress={() => setPolicy(true)}>
            политикой конфиденциальности
          </Typography>
        </Typography>
      </View>
      <DocItem
        isPreview={false}
        open={userAccept}
        onClose={() => setUserAccept(false)}
        title="Пользовательское соглашение"
        uri={BASE_URL + Api.docs.userAccept}
      />
      <DocItem
        isPreview={false}
        open={policy}
        onClose={() => setPolicy(false)}
        title="Политика конфиденциальности"
        uri={BASE_URL + Api.docs.policy}
      />
    </View>
  );
};
