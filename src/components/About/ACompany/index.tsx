import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "@app/ui/Typography";
import { Font } from "@app/theme/font";
import { Colors } from "@app/theme/colors";
import CheckBoxUI from "@app/ui/CheckBoxUI";
import { getWorkTime } from "@app/lib/functions/getWorkTime";
import type { CompanyModel } from "@app/lib/models/CompanyModel";

const ACompany = ({
  opening_time,
  closing_time,
  only_weekdays,
  contacts,
}: CompanyModel) => {
  const time = getWorkTime(opening_time, closing_time);

  return (
    <View style={styles.root}>
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
}: {
  text1: string;
  text2: string;
  isDisplay?: boolean;
}) => {
  if (!isDisplay) {
    return null;
  }
  return (
    <View style={styles.wrapper}>
      <Typography
        style={styles.title}
        fontFamily={Font.TEXT}
        fontWeight="600"
        fontSize={17}
        lineHeight={20}>
        {text1}
      </Typography>
      <Typography
        style={styles.subtitle}
        fontFamily={Font.TEXT}
        fontWeight="400"
        fontSize={17}
        lineHeight={20}>
        {text2}
      </Typography>
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
  wrapper: {
    marginBottom: 15,
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
