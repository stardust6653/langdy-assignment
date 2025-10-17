export const formatRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const past = typeof date === "string" ? new Date(date) : date;

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;

  const elapsed = now.getTime() - past.getTime();

  if (elapsed < msPerMinute) {
    return "방금 전";
  } else if (elapsed < msPerHour) {
    const minutes = Math.floor(elapsed / msPerMinute);
    return `${minutes}분 전`;
  } else if (elapsed < msPerDay) {
    const hours = Math.floor(elapsed / msPerHour);
    return `${hours}시간 전`;
  } else if (elapsed < msPerWeek) {
    const days = Math.floor(elapsed / msPerDay);
    return `${days}일 전`;
  } else if (elapsed < msPerWeek * 4) {
    const weeks = Math.floor(elapsed / msPerWeek);
    return `${weeks}주 전`;
  } else {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(past)
      .replace(/\s/g, "");
  }
};
