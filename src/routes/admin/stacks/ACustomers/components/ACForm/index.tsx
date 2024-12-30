import React from "react";
import ACCompanyForm from "@app/routes/admin/stacks/ACustomers/components/ACForm/components/ACCompanyForm";
import ACPersonalForm from "@app/routes/admin/stacks/ACustomers/components/ACForm/components/ACPersonalForm";
import ACUserForm from "./components/ACUserForm";

const ACForm = () => {
  return (
    <>
      <ACUserForm />
      <ACCompanyForm />
      <ACPersonalForm />
    </>
  );
};

export default React.memo(ACForm);
