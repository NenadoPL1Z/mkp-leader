import type { ServicesDetailModel } from "@app/lib/models/ServiceModel.ts";

export type AMRIRefuseProps = Pick<ServicesDetailModel, "id"> & {
  onRefuse: (data: ServicesDetailModel, callback: () => void) => void;
};
