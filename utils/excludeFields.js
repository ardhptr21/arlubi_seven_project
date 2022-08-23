export default function excludeFields(data, ...keys) {
  for (let key of keys) {
    delete data[key];
  }

  return data;
}
