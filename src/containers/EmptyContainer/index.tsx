import { View, StyleSheet } from "react-native";
import EmptyServiceIcon from "@app/assets/icons/dist/EmptyServices";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors";
import { useMarginBottom } from "@app/hooks/useMarginBottom";

type Props = {
  title?: string;
};

const EmptyContainer = ({ title = "Пока нет заявок" }: Props) => {
  const { bottom } = useMarginBottom();
  return (
    <View style={[styles.container, { marginBottom: bottom }]}>
      <EmptyServiceIcon style={styles.icon} />
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
