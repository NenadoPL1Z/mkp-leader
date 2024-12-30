import React from "react";

import Typography from "@app/ui/Typography";
import { StyleSheet, View } from "react-native";
import ButtonUI from "@app/ui/ButtonUI";

type Props = {
  onPress: () => void;
  marginVertical?: number;
};

const PaginationError = ({ marginVertical = 0, onPress }: Props) => {
  return (
    <View style={[styles.container, { marginVertical }]}>
      <Typography
        variant="h2"
        style={styles.title}>
        Что-то пошло не так.
      </Typography>
      <Typography
        variant="h4"
        style={styles.description}>
        Проверьте подключение к интернету или попробуйте еще раз
      </Typography>
      <View>
        <ButtonUI
          variant="inverted"
          onPress={onPress}>
          Повторить
        </ButtonUI>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 10,
  },
  description: {
    maxWidth: 235,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default React.memo(PaginationError);
