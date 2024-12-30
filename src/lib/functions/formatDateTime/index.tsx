export const formatDateTime = (dateTimeString: string): string => {
  if (!dateTimeString) return "";
  return new Date(dateTimeString).toLocaleDateString();
};
