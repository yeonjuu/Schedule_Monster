export function splitedArr(arr: string) {
  const splited = arr.split('-').map((v) => parseInt(v));

  return splited;
}
