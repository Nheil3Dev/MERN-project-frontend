export const useSessionStorage = (key: string) => {
  const storedValue = sessionStorage.getItem(key)

  if (!storedValue) return false

  return storedValue
}
