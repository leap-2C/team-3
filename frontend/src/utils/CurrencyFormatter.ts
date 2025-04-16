export const formatNumber = (num?: number): string => {
  if (typeof num !== "number") return "0";
  return num.toLocaleString("fr-CH").replace(/\s/g, "'");
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("en-US", options).replace(",", "");
};
