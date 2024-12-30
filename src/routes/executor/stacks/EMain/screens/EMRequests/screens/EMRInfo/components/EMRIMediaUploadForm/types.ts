import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";

export type EMRIMediaUploadFormProps = Pick<ServicesDetailModel, "id"> & {
  onVerify: (data: ServicesDetailModel) => void;
};
