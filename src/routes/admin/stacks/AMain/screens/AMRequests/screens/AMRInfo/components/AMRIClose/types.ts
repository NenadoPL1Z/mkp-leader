import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";

export type AMRICloseProps = Pick<ServicesDetailModel, "id"> & {
  onClose: (data: ServicesDetailModel, callback: () => void) => void;
};
