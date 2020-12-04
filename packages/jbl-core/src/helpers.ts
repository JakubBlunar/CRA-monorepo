export function formatDate(date: Date) {
  // eslint-disable-next-line lodash/prefer-lodash-method
  return date.toISOString().slice(0, 19).replace(/-/g, '/').replace('T', ' ')
}
