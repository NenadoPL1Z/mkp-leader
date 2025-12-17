import React from "react";
import BottomSheetUI from "@app/ui/BottomSheetUI/BottomSheetUI";
import Typography from "@app/ui/Typography";
import { View } from "react-native";
import AvatarUI from "@app/ui/AvatarUI";
import { Font } from "@app/theme/font";
import { Colors } from "@app/theme/colors";
import CheckBoxUI from "@app/ui/CheckBoxUI";
import { useAboutBottomSheet } from "@app/components/AboutBottomSheet/useAboutBottomSheet";
import { styles } from "./styles";
import type { CompanyContactsModel } from "@app/lib/models/CompanyModel";

import type { AboutBottomSheetProps } from "./types";

const AboutBottomSheet = (props: AboutBottomSheetProps) => {
  const { bottomSheet, customer_company } = props;
  const { time, secondContacts, firstContacts, height } =
    useAboutBottomSheet(props);

  return (
    <BottomSheetUI
      {...bottomSheet}
      bottomSheetProps={{ snapPoints: [height] }}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={styles.headerAvatar}>
            <AvatarUI
              name={customer_company.name}
              phone={customer_company.id + ""}
              size={40}
              isDefault={true}
            />
          </View>
          <View style={styles.headerText}>
            <Typography
              style={styles.headerTextName}
              fontFamily={Font.TITLE}
              fontSize={26}
              lineHeight={32}
              fontWeight="500"
              numberOfLines={1}>
              {customer_company.name}
            </Typography>
            {customer_company.address && (
              <Typography
                style={styles.headerTextAddress}
                fontSize={15}
                lineHeight={20}
                fontWeight="400"
                color={Colors.GRAY_ELEVEN}
                numberOfLines={1}>
                {customer_company.address}
              </Typography>
            )}
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.mainText}>
            <Typography
              style={styles.mainTextWorkName}
              fontSize={15}
              lineHeight={20}
              fontWeight="600"
              color={Colors.WHITE}>
              Время работы
            </Typography>
            <Typography
              style={styles.mainTextWorkTime}
              fontSize={15}
              lineHeight={20}
              fontWeight="400">
              {time}
            </Typography>
            <CheckBoxUI
              title="Только по будням"
              checked={customer_company.only_weekdays}
              disabled={true}
              containerStyle={styles.mainTextWorkWeekdays}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Contacts {...firstContacts} />
          <Contacts {...secondContacts} />
        </View>
      </View>
    </BottomSheetUI>
  );
};

const Contacts = (data: CompanyContactsModel | undefined) => {
  if (data === undefined) {
    return null;
  }
  return (
    <View style={styles.footerWrapper}>
      {Boolean(data.phone || data.person) && (
        <Typography
          style={styles.footerName}
          fontSize={15}
          lineHeight={20}
          fontWeight="600"
          numberOfLines={1}>
          {data.person || "ФИО не указано"}
        </Typography>
      )}
      {data.phone && (
        <Typography
          style={styles.footerPhone}
          fontSize={15}
          lineHeight={20}
          fontWeight="400"
          numberOfLines={1}>
          {data.phone}
        </Typography>
      )}
    </View>
  );
};

export default React.memo(AboutBottomSheet);
