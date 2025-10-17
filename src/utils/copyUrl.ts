export const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("URL이 복사되었습니다.");
  } catch (err) {
    alert("URL 복사에 실패했습니다.");
  }
};
