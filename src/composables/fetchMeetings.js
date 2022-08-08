const { VITE_DATA_SOURCE, VITE_APP_KEY } = import.meta.env

export const get = async () => {
  const res = await fetch(`${VITE_DATA_SOURCE}/values/A:ZZ?key=${VITE_APP_KEY}`)
  const fetchJson = await res.json()
  return fetchJson
}
