export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: "year", short: "y", seconds: 31536000 },
    { label: "month", short: "mo", seconds: 2592000 },
    { label: "week", short: "w", seconds: 604800 },
    { label: "day", short: "d", seconds: 86400 },
    { label: "hour", short: "h", seconds: 3600 },
    { label: "minute", short: "m", seconds: 60 },
    { label: "second", short: "s", seconds: 1 },
  ];

  for (const unit of units) {
    const value = Math.floor(diff / unit.seconds);
    if (value > 0) {
      return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};
