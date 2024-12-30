import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ScreenContainer from "@app/containers/ScreenContainer";
import ButtonUI from "@app/ui/ButtonUI";
import { Size } from "@app/lib/constants/size";
import { useMarginBottom } from "@app/hooks/useMarginBottom";
import TextField from "@app/ui/TextField";
import { useACAddress } from "@app/routes/admin/stacks/ACustomers/screens/ACAddress/useACAddress";
import ACAItem from "@app/routes/admin/stacks/ACustomers/screens/ACAddress/components/ACAItem";
import KeyboardContainer from "@app/containers/KeyboardContainer";
import { TFLBack } from "@app/ui/TextField/left/TFLBack";
import { TFRClear } from "@app/ui/TextField/right/TFRClear";
import type { ListRenderItem } from "react-native";
import type { DadataSuggestionItemType } from "@app/lib/models/Dadata";
import type { ACAddressProps } from "@app/routes/admin/stacks/ACustomers/types";

const ACAddress = (props: ACAddressProps) => {
  const { navigation } = props;
  const { offset } = useMarginBottom();
  const {
    value,
    suggestions,
    activeSuggestion,

    onChangeText,
    handleSelect,
    handlePress,
    handleClear,
  } = useACAddress(props);

  const left = TFLBack(navigation.goBack);

  const right = useMemo(
    () => TFRClear(!!value.length, false, handleClear),
    [value],
  );

  const renderItem = useCallback<ListRenderItem<DadataSuggestionItemType>>(
    ({ item }) => {
      return (
        <ACAItem
          address={item}
          onPress={handlePress}
          isActive={item.value === activeSuggestion?.value}
        />
      );
    },
    [value, activeSuggestion],
  );

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <TextField
          placeholder="Адрес"
          autoCorrect={false}
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
          onClear={handleClear}
          left={left}
          right={right}
        />
      </View>
      <KeyboardContainer>
        <FlatList
          keyboardDismissMode="interactive"
          style={styles.middle}
          data={suggestions}
          renderItem={renderItem}
        />
      </KeyboardContainer>
      <View style={[styles.bottom, { marginBottom: offset }]}>
        <ButtonUI onPress={() => handleSelect()}>Продолжить</ButtonUI>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0,
    paddingTop: Size.HEADER_TOP,
    marginBottom: 8,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
  middle: {
    flexGrow: 1,
  },
  bottom: {
    flex: 0,
    marginTop: 8,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
});

export default React.memo(ACAddress);
