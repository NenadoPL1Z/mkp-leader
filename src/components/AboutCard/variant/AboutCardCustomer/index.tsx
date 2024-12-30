import React from "react";
import AboutCard from "@app/components/AboutCard";
import type { AboutCardProps } from "@app/components/AboutCard/types";
import type { ReactNode } from "react";
import type { CustomerModel } from "@app/lib/models/CustomerModel";

type Props = CustomerModel & {
  nativeProps?: Partial<AboutCardProps>;
  onPress: (item: CustomerModel) => void;
  children?: ReactNode;
};
const AboutCardCustomer = (props: Props) => {
  const { customer_company, nativeProps, onPress, children } = props;

  return (
    <AboutCard
      {...nativeProps}
      title={customer_company.name}
      subtitle={customer_company.address || ""}
      avatar={{
        name: customer_company.name,
        phone: `${customer_company.id}`,
        size: 40,
        isDefault: true,
      }}
      onPress={() => onPress(props)}>
      {children}
    </AboutCard>
  );
};

export default React.memo(AboutCardCustomer);
