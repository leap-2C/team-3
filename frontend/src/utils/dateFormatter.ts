import { formatDistanceToNow } from "date-fns";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });

  return relativeTime
    .replace("about a minute ago", "1m ago")
    .replace("about a month ago", "1mo ago")
    .replace("about a year ago", "1y ago")
    .replace(/(\d+) minutes ago/g, "$1m ago")
    .replace(/(\d+) hours ago/g, "$1h ago")
    .replace(/(\d+) days ago/g, "$1d ago")
    .replace(/(\d+) months ago/g, "$1mo ago")
    .replace(/(\d+) years ago/g, "$1y ago");
}
