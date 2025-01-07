import React from "react";
import { View, StyleSheet } from "react-native";
import { useToggle } from "@app/hooks/useToggle";
import ArrowDown from "@app/assets/icons/dist/ArrowDown";
import AboutBottomSheet from "@app/components/AboutBottomSheet";
import AboutCardCustomer from "@app/components/AboutCard/variant/AboutCardCustomer";
import type { CustomerDetailModel } from "@app/lib/models/CustomerModel";

const RICompany = (props: CustomerDetailModel) => {
  const {
    isToggle: isOpen,
    handleToggleTrue: handleOpen,
    handleToggleFalse: handleClose,
  } = useToggle();

  return (
    <View style={styles.container}>
      <AboutCardCustomer
        {...props}
        nativeProps={{ marginBottom: 16 }}
        onPress={handleOpen}>
        <View style={isOpen && styles.open}>
          <ArrowDown />
        </View>
      </AboutCardCustomer>
      <AboutBottomSheet
        bottomSheet={{ isOpen, handleClose }}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  open: {
    transform: [{ rotate: "180deg" }],
  },
});

export default React.memo(RICompany);
