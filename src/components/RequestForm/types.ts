import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";

export type RequestFormProps = {
  isEdit: boolean;
  initialData: ServicesDetailModel | null;
  callbackEdit: (data: ServicesDetailModel | null) => void;
};
