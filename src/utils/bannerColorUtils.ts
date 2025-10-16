const BANNER_COLORS = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#a0c4ff",
  "#bdb2ff",
  "#ffc6ff",
];

export const getDeterministicColor = (title: string): string => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash += title.charCodeAt(i);
  }

  const index = hash % BANNER_COLORS.length;
  return BANNER_COLORS[index];
};
