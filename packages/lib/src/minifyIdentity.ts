/**
 * Minifies an identity string by taking the first letter of the first two parts of the identity
 * (split by dots, spaces, or @), concatenating them together, and converting
 * the resulting string to uppercase.
 *
 * @example "john.doe@gmail.com" or "john DOE" => "JD"
 * @param identity The identity string to minify (e.g. an email address or full name)
 * @returns The minified identity string
 */
export function minifyIdentity(identity = '') {
  // first: clean spaces
  return identity.trim().replace(/ +/g, ' ')
    // then split the identity string by dots, spaces, or at signs and take the first two parts
    .split(/\.|\ |@/, 2)
    // then map each part to its first letter and join the resulting array of letters together
    .map(str => str[0]).join('').toUpperCase()
}

export default minifyIdentity
