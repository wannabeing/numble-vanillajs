// API 통신이 성공적으로 이루어졌는지 확인하는 함수
export const isComplete = (statusCode) => {
  if (statusCode === 200 || statusCode === 201 || statusCode === true) {
    return true;
  } else {
    return false;
  }
};

// JSON List 내림차순 정렬 함수
export const sortDesc = (data, key, type) => {
  return data.sort((a, b) => {
    var x = a[key];
    var y = b[key];
    if (type == "desc") {
      return x > y ? -1 : x < y ? 1 : 0;
    } else if (type == "asc") {
      return x < y ? -1 : x > y ? 1 : 0;
    }
  });
};

// createdAt 시간표시 변경 함수
export const displayedAt = (createdAt) => {
  const newCreatedAt = new Date(createdAt);
  const milliSeconds = new Date() - newCreatedAt;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};
