// API 통신이 성공적으로 이루어졌는지 확인하는 함수
export const isComplete = (statusCode) => {
  if (statusCode === 200 || statusCode === 201 || statusCode === true) {
    return true;
  } else {
    return false;
  }
};

// JSON List 내림차순 정렬
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
