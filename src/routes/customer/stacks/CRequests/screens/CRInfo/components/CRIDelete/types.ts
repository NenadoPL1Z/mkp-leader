import type { ServicesDetailModel } from "@app/lib/models/ServiceModel.ts";

export type CRIDeleteProps = Pick<ServicesDetailModel, "id"> & {
  onDelete: (callback: () => void) => void;
};
