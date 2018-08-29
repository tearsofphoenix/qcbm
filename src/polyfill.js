/**
 * argsort like python
 * @param {number[]} array
 * @return {number[]}
 */
export function argsort(array) {
  if (Array.isArray(array)) {
    const result = array.slice(0).sort((a, b) => a - b)
    return result.map((n) => array.indexOf(n))
  }
  return []
}

/**
 *
 * @param {Array} array
 * @param {number[]} indices
 */
export function partial(array, indices) {
  return indices.map(i => array[i])
}

/**
 *
 * @param {number[]} array
 */
export function arrayDiff(array) {
  if (Array.isArray(array) && array.length > 1) {
    const result = new Array(array.length - 1)
    for (let i = 0; i < array.length - 1; i += 1) {
      result[i] = array[i + 1] - array[i]
    }
  }
  return []
}
