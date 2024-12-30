import React from "react";
import { StyleSheet, View } from "react-native";
import AvatarUI from "@app/ui/AvatarUI";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors";
import { callPhone } from "@app/lib/functions/callPhone";
import { formatPhoneNumber } from "@app/lib/functions/formatPhoneNumber";
import { Font } from "@app/theme/font";
import ACompany from "@app/components/About/ACompany";
import type { CompanyModel } from "@app/lib/models/CompanyModel";
import type { Nullable } from "@app/types/general";
import type { AvatarUIProps } from "@app/ui/AvatarUI/types";

type Props = {
  title: string;
  phone?: string;
  address?: string;
  login: Nullable<string>;
  avatar: AvatarUIProps;
  company?: CompanyModel;
};

const About = ({ title, phone, address, login, avatar, company }: Props) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <AvatarUI {...avatar} />
        </View>
        {title && (
          <Typography
            variant="h2"
            style={styles.title}>
            {title}
          </Typography>
        )}
        {phone && (
          <Typography
            variant="h2"
            style={styles.phone}
            color={Colors.MAIN}
            onPress={() => callPhone(phone)}>
            {formatPhoneNumber(phone) || phone}
          </Typography>
        )}
        {address && (
          <Typography
            variant="h2"
            style={styles.address}>
            {address}
          </Typography>
        )}
        {login && (
          <Typography
            fontFamily={Font.TEXT}
            fontSize={17}
            lineHeight={20}
            fontWeight="600">
            Логин:{" "}
            <Typography
              fontSize={17}
              lineHeight={20}
              fontWeight="400">
              {login}
            </Typography>
          </Typography>
        )}
      </View>
      {company && (
        <View style={styles.company}>
          <ACompany {...company} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  avatar: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 11,
    textAlign: "center",
  },
  phone: {
    marginBottom: 8,
    textAlign: "center",
  },
  address: {
    marginBottom: 8,
    textAlign: "center",
  },
  company: {
    marginTop: 64,
  },
});

export default React.memo(About);
