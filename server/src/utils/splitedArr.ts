export function splitedArr(str: string) {
  let year, month, date, time;
  year = Number(str.slice(0, 4));
  month = Number(str.slice(4, 6));
  date = Number(str.slice(6, 8));
  if (str.length > 8) time = Number(str.slice(8));

  const splited = {
    year,
    month,
    date,
    ...(time && { time }),
  };
  return splited;
}

export function splitedError(errstr: string) {
  const splitedArr = errstr.split(',');
  const errType = splitedArr[0].split(':')[1];
  const errMessage = splitedArr[1].split(':')[1];
  return { errType, errMessage };
}
