import React from "react";
import HeaderUI from "@app/ui/HeaderUI";
import ScreenContainer from "@app/containers/ScreenContainer";
import { Colors } from "@app/theme/colors";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import RequestForm from "@app/components/RequestForm";
import { useCRNew } from "./useCRNew";
import type { CRNewScreenProps } from "../../types";

const CRNew = (props: CRNewScreenProps) => {
  const { initialData, isEdit, isDisplayDate, handleEditCards } =
    useCRNew(props);

  return (
    <ScreenContainer>
      <HeaderUI
        right={{
          variant: isEdit ? "edit" : "",
          subtitle: isDisplayDate
            ? formatDateTime(initialData?.created_at || "")
            : "",
          iconProps: { color: Colors.PRIMARY },
          activeOpacity: 1,
        }}
      />
      <RequestForm
        isEdit={isEdit}
        initialData={initialData}
        callbackEdit={handleEditCards}
      />
    </ScreenContainer>
  );
};

export default React.memo(CRNew);
