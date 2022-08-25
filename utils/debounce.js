export default function debounce(fn, delay) {
  let timer;
  return (...args) => {
    timer = clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
