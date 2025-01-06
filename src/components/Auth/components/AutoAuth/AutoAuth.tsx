import { View } from "react-native";
import ButtonUI from "@app/ui/ButtonUI";
import {
  ADMIN_LOGIN,
  ADMIN_PASSWORD,
  CUSTOMER_LOGIN,
  CUSTOMER_PASSWORD,
  EXECUTOR_LOGIN,
  EXECUTOR_PASSWORD,
} from "@env";
import { styles } from "./index.styles.ts";
import type { AutoAuthProps } from "./types.ts";

export const AutoAuth = ({ methods, onSubmit }: AutoAuthProps) => {
  const setAuth = (username: string, password: string) => {
    methods.setValue("username", username);
    methods.setValue("password", password);
    onSubmit();
  };

  const handleAuthAdmin = () => {
    setAuth(ADMIN_LOGIN, ADMIN_PASSWORD);
  };

  const handleAuthCustomer = () => {
    setAuth(CUSTOMER_LOGIN, CUSTOMER_PASSWORD);
  };

  const handeAuthExecutor = () => {
    setAuth(EXECUTOR_LOGIN, EXECUTOR_PASSWORD);
  };

  return (
    <View style={styles.container}>
      <ButtonUI
        variant="inverted"
        onPress={handleAuthAdmin}>
        Админ
      </ButtonUI>
      <ButtonUI
        variant="inverted"
        onPress={handleAuthCustomer}>
        Заказчик
      </ButtonUI>
      <ButtonUI
        variant="inverted"
        onPress={handeAuthExecutor}>
        Исполнитель
      </ButtonUI>
    </View>
  );
};
