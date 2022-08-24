export default function parseSearchParams(url) {
  if (!url) return null;
  const parseURL = new URL(url);
  return parseURL.searchParams;
}
