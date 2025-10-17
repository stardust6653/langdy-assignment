export const formatSubscriberCount = (count: number) => {
  if (count < 1000) return count.toString();
  if (count < 10000) return `${(count / 1000).toFixed(3)}천`;
  if (count < 1000000) return `${(count / 10000).toFixed(2)}만`;
};
