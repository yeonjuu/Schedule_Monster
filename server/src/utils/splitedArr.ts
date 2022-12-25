export function splitedArr(arr: string) {
  const splited = arr.split('-').map((v) => parseInt(v));
  return splited;
}

export function splitedError(errstr: string) {
  const splitedArr = errstr.split(',');
  const errType = splitedArr[0].split(':')[1];
  const errMessage = splitedArr[1].split(':')[1];
  return { errType, errMessage };
}
