export const formatPassword = (str: string) => {
  return str.replace(/[^\w\d+\-!@#$5^&*(()_+!"№%:,.;{}[\]|"><?/~`±§<>]/g, "");
};
