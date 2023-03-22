/**
 * set
 * @param data
 * @param key
 */
function set(key: string, data: string | number | boolean | null | undefined) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * get
 * @param key
 */
function get(key: string) {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(key);
}

/**
 * remove
 * @param key
 */
function remove(key: string) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(key);
}

export const localStorageExtra = { get, set, remove };
