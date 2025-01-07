import React from "react";
import { StyleSheet, View } from "react-native";

import ErrorIcon from "@app/assets/icons/dist/404";

import Typography from "@app/ui/Typography";
import ButtonUI from "@app/ui/ButtonUI";
import { Size } from "@app/lib/constants/size";
import { Colors } from "@app/theme/colors";
import type { ErrorContainerProps } from "../../types";

const ErrorContainer = ({
  onPress,
  containerProps = {},
}: ErrorContainerProps) => {
  return (
    <View
      {...containerProps}
      style={[styles.container, containerProps?.style]}>
      <View style={styles.wrapperTop}>
        <ErrorIcon
          width={133}
          height={83}
          style={styles.icon}
          color={Colors.MAIN}
        />
        <Typography
          variant="h2"
          style={styles.text}>
          Упс, что-то пошло не так
        </Typography>
        <Typography
          variant="h4"
          style={styles.subtitle}>
          Что-то пошло не так. Проверьте подключение к интернету или зайдите
          позже
        </Typography>
      </View>
      <View style={styles.wrapperBottom}>
        <ButtonUI
          onPress={onPress}
          title="Попробовать еще раз"
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
  icon: {
    marginBottom: 5,
  },
  wrapperTop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginBottom: 15,
  },
  subtitle: {
    textAlign: "center",
    maxWidth: 233,
  },
  wrapperBottom: {},
  buttonContainer: {
    marginBottom: 10,
  },
});

export default React.memo(ErrorContainer);
