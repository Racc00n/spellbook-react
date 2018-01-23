export const mapToArray = (ids, map) => {
  return ids.map(id => map[id]);
}

export const arrayToMap = (array, idProp) => {
  const result = {};
  if (!array) {
    return result;
  }
  for (let item of array) {
    result[item[idProp]] = item;
  }
  return result;
}