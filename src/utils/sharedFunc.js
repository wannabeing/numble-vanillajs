// API 통신이 성공적으로 이루어졌는지 확인하는 함수
export const isComplete = (statusCode) => {
  if (statusCode === 200 || statusCode === 201 || statusCode === true) {
    return true;
  } else {
    return false;
  }
};
