import { useEffect, useMemo, useState } from "react";
import { debounce } from "@app/lib/functions/debounce";
import { fetchPostSuggestionsAddress } from "@app/lib/api/dadata/fetchPostSuggestionsAddress";
import type { Nullable } from "@app/types/general";
import type { DadataSuggestionItemType } from "@app/lib/models/Dadata";
import type { ACAddressProps } from "@app/routes/admin/stacks/ACustomers/types";

type Suggestion = Nullable<DadataSuggestionItemType>;
type Suggestions = DadataSuggestionItemType[];

export const useACAddress = ({ navigation, route }: ACAddressProps) => {
  //? PROPS
  const { initialValue, callbackAddress } = route.params;

  //? STATES
  const [value, setValue] = useState<string>("");
  const [activeSuggestion, setActiveSuggestion] = useState<Suggestion>(null);
  const [suggestions, setSuggestions] = useState<Suggestions>([]);

  //? MEMO
  const onDebounce = useMemo(() => debounce(500), []);

  const loadData = (address: string, isActiveFirst = false) => {
    fetchPostSuggestionsAddress(address).then((response) => {
      const result = response.data.suggestions;
      if (result.length) {
        setSuggestions(result);
        if (isActiveFirst) {
          setActiveSuggestion(result[0]);
        }
      }
    });
  };

  const handleClear = () => {
    setValue("");
    setSuggestions([]);
    setActiveSuggestion(null);
  };

  const handleSelect = (result = activeSuggestion) => {
    callbackAddress(result?.value || value, navigation.goBack);
  };

  const handlePress = (address: DadataSuggestionItemType) => {
    //? IF PRESS HOUSE
    if (address.data.house) {
      handleSelect(address);
      return;
    }
    //? IF PRESS ACTIVE
    if (address.value === activeSuggestion?.value) {
      handleSelect(address);
      return;
    }
    setValue(address.value);
    loadData(address.value);
    setActiveSuggestion(address);
  };

  const onChangeText = (text: string) => {
    setValue(text);
    setActiveSuggestion(null);

    if (text.length) {
      onDebounce(() => loadData(text));
    }
    if (!text.length) {
      handleClear();
    }
  };

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
      loadData(initialValue, true);
    }
  }, []);

  return {
    value,
    suggestions,
    activeSuggestion,

    handlePress,
    handleClear,
    handleSelect,
    onChangeText,
  };
};
