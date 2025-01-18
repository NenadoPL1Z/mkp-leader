import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "@app/ui/Typography";
import { Font } from "@app/theme/font";
import { Colors } from "@app/theme/colors";
import CheckBoxUI from "@app/ui/CheckBoxUI";
import { getWorkTime } from "@app/lib/functions/getWorkTime";
import AboutCardExecutor from "@app/components/AboutCard/variant/AboutCardExecutor";
import {
  FIRST_EXECUTOR_NAME,
  SECOND_EXECUTOR_NAME,
} from "@app/lib/constants/executors.ts";
import type { CompanyModel } from "@app/lib/models/CompanyModel";

const ACompany = ({
  opening_time,
  closing_time,
  only_weekdays,
  executor_default,
  executor_additional,
  contacts,
}: CompanyModel) => {
  const time = getWorkTime(opening_time, closing_time);

  return (
    <View style={styles.root}>
      <TextBlock
        text1={FIRST_EXECUTOR_NAME}
        marginBottom="small"
      />
      <AboutCardExecutor {...executor_default} />
      {executor_additional ? (
        <View>
          <TextBlock
            text1={SECOND_EXECUTOR_NAME}
            marginBottom="small"
          />
          <AboutCardExecutor {...executor_additional} />
        </View>
      ) : null}
      <View style={[styles.item, styles.shadow]}>
        <TextBlock
          text1="Время работы"
          text2={time}
        />
        <View style={styles.weekdays}>
          <CheckBoxUI
            title="Только по будням"
            checked={only_weekdays}
            disabled={true}
            containerStyle={styles.check}
          />
        </View>
      </View>
      <View style={[styles.item, styles.shadow, styles.itemBottom]}>
        {contacts.map((item) => (
          <TextBlock
            key={item.id}
            text1={item.person || `ФИО не указано`}
            text2={item.phone}
            isDisplay={Boolean(item.person || item.phone)}
          />
        ))}
      </View>
    </View>
  );
};

const TextBlock = ({
  text1,
  text2,
  isDisplay = true,
  marginBottom = "large",
}: {
  text1: string;
  text2?: string;
  isDisplay?: boolean;
  marginBottom?: "small" | "large";
}) => {
  if (!isDisplay) {
    return null;
  }
  return (
    <View style={{ marginBottom: marginBottom === "large" ? 15 : 5 }}>
      <Typography
        style={styles.title}
        fontFamily={Font.TEXT}
        fontWeight="600"
        fontSize={17}
        lineHeight={20}>
        {text1}
      </Typography>
      {text2 ? (
        <Typography
          style={styles.subtitle}
          fontFamily={Font.TEXT}
          fontWeight="400"
          fontSize={17}
          lineHeight={20}>
          {text2}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
  item: {
    width: "100%",
    padding: 15,
    marginBottom: 16,

    borderRadius: 12,
    backgroundColor: Colors.WHITE,
  },
  itemBottom: {
    paddingBottom: 0,
  },
  shadow: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,

    elevation: 4,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {},
  weekdays: {},
  check: { marginLeft: 0, paddingVertical: 0 },
});

export default React.memo(ACompany);
