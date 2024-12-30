import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";

export type RIContentProps = Pick<
  ServicesDetailModel,
  "title" | "description" | "material_availability" | "media_files"
>;
