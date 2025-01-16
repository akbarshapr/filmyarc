/**
 * Deduplicates an array of items based on a specified unique key.
 *
 * @param {Array} items - The array of items to be deduplicated.
 * @param {string} key - The key used to determine uniqueness for each item.
 * @returns {Array} - A new array with duplicate items removed.
 */
export const getUniqueItems = (items, key) => {
    return Array.from(new Map(items.map(item => [item[key], item])).values());
};