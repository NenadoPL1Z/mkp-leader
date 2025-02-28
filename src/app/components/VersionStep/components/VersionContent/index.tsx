import { SafeAreaView, View } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { Colors, linear } from "@app/theme/colors.ts";
import Typography from "@app/ui/Typography";
import ButtonUI from "@app/ui/ButtonUI";
import Documentation from "@app/components/Documentation";
import { openIndexWebsite } from "@app/lib/functions/openIndexWebsite";
import { IS_IOS } from "@app/lib/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./index.styles.ts";
import { openStore } from "./helpers.ts";
import type {
  VersionGlobal,
  VersionsDetails,
} from "@app/store/reducers/global/type.ts";

const platform = IS_IOS ? "App Store" : "Google Play";

export const VersionContent = ({
  actualVersion,
  currentVersion,
  details,
}: VersionGlobal) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <LinearGradient
      style={styles.container}
      colors={linear.authorization}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.top}>
          <Typography
            variant="h1"
            style={styles.title}>
            Вышло обновление
          </Typography>
          <Typography
            color={Colors.WHITE}
            style={styles.subtitle}
            fontSize={20}
            lineHeight={20}>
            Для корректной работы приложения, установите обновление!
          </Typography>
        </View>
        <View style={[styles.bottom, bottom === 0 && styles.bottomMargin]}>
          <View style={styles.block}>
            <Typography
              variant="h3"
              color={Colors.WHITE}>
              Установленная версия: {currentVersion}
            </Typography>
            <Typography
              variant="h3"
              color={Colors.WHITE}>
              Актуальная версия: {actualVersion}
            </Typography>
          </View>
          <View style={styles.button}>
            <ButtonUI
              variant="inverted"
              onPress={() => openStore(details as unknown as VersionsDetails)}>
              Обновить ({platform})
            </ButtonUI>
          </View>
          <Documentation />
          <Typography
            variant="h4"
            fontWeight="400"
            fontSize={15}
            lineHeight={20}
            color={Colors.WHITE}>
            Разработано{" "}
            <Typography
              variant="h4"
              fontWeight="400"
              fontSize={15}
              lineHeight={20}
              color={Colors.WHITE}
              style={styles.url}
              onPress={openIndexWebsite}>
              INDEX studio
            </Typography>
          </Typography>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
