/**
 * set
 * @param data
 * @param key
 */
function set(key: string, data: string) {
  if (typeof window === "undefined") {
    return;
  }
  sessionStorage.setItem(key, JSON.stringify(data));
}

/**
 * remove
 * @param key
 */
function remove(key: string) {
  if (typeof window === "undefined") {
    return;
  }
  sessionStorage.removeItem(key);
}

/**
 * get
 * @param key
 */
function get(key: string) {
  if (typeof window === "undefined") {
    return "";
  }

  return sessionStorage.getItem(key);
}

export const sessionStorageExtra = { get, set, remove };
