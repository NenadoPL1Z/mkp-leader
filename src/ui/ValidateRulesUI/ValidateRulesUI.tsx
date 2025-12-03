import { View } from "react-native";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors.ts";
import { CircleCheck, CircleWarning } from "@app/assets/icons/dist";
import { matchOnlyLatinCharacters } from "@app/lib/functions/matchOnlyLatinCharacters";
import { matchLength } from "@app/lib/functions/matchLength";
import { matchAtLeastOneDigit } from "@app/lib/functions/matchAtLeastOneDigit";
import { matchAtLeastOneSpecialCharacter } from "@app/lib/functions/matchAtLeastOneSpecialCharacter";
import type { ValidateRulesUIProps } from "./types";

export const ValidateRulesUI = ({ value }: ValidateRulesUIProps) => {
  const isOnlyLatinCharacters = matchOnlyLatinCharacters(value);
  const isLength = matchLength(value);
  const isAtLeastOneDigit = matchAtLeastOneDigit(value);
  const isAtLeastOneSpecialCharacter = matchAtLeastOneSpecialCharacter(value);

  return (
    <View style={{ paddingTop: 20, gap: 8 }}>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        {isOnlyLatinCharacters ? <CircleCheck /> : <CircleWarning />}
        <Typography
          fontSize={16}
          lineHeight={16}
          color={Colors.WHITE}>
          Только латинские символы
        </Typography>
      </View>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        {isLength ? <CircleCheck /> : <CircleWarning />}
        <Typography
          fontSize={16}
          lineHeight={16}
          color={Colors.WHITE}>
          От 8 до 30 символов
        </Typography>
      </View>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        {isAtLeastOneDigit ? <CircleCheck /> : <CircleWarning />}
        <Typography
          fontSize={16}
          lineHeight={16}
          color={Colors.WHITE}>
          Минимум одна цифра
        </Typography>
      </View>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        {isAtLeastOneSpecialCharacter ? <CircleCheck /> : <CircleWarning />}
        <Typography
          fontSize={16}
          lineHeight={16}
          color={Colors.WHITE}>
          Минимум один спец. символ
        </Typography>
      </View>
    </View>
  );
};
