import { sortDataInitial } from "@app/components/Sort/constants";

export const createQuery = (
  sort: string,
  isEmergency: boolean,
  isCustomPosition: boolean,
) => {
  const result: string[] = [];
  const pushResult = (query: string) => result.push(query);

  pushResult(`sort=${sort || sortDataInitial.value}`);
  if (isEmergency) pushResult(`emergency=${isEmergency}`);
  if (isCustomPosition) pushResult(`custom_position=${isCustomPosition}`);

  return result;
};
