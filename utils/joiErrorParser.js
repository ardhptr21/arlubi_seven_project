export default function joiErrorParser(error) {
  const errors = {};
  error.details.forEach((e) => {
    errors[e.context.key] = e.message;
  });
  return errors;
}
