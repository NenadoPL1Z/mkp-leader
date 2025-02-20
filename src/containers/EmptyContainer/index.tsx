import { View, StyleSheet } from "react-native";
import { EmptyServicesIcon } from "@app/assets/icons/dist";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors";
import { useMarginBottom } from "@app/hooks/useMarginBottom";
import type { SvgProps } from "react-native-svg";
import type { FC } from "react";

type Props = {
  title?: string;
  Icon?: FC<SvgProps>;
};

const EmptyContainer = ({
  title = "Пока нет заявок",
  Icon = EmptyServicesIcon,
}: Props) => {
  const { bottom } = useMarginBottom();
  return (
    <View style={[styles.container, { marginBottom: bottom }]}>
      <Icon style={styles.icon} />
      <Typography
        fontSize={15}
        color={Colors.GRAY_ELEVEN}
        variant="h4">
        {title}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { marginBottom: 20 },
});

export default EmptyContainer;
