const { VITE_DATA_SOURCE, VITE_APP_KEY } = import.meta.env

export let Storage = {}

export const sync = async () => {
  const res = await fetch(`${VITE_DATA_SOURCE}/values/A:ZZ?key=${VITE_APP_KEY}`)
  const fetchJson = await res.json()
  Storage = fetchJson
  return fetchJson
}

export const getRows = () => {
  return Storage.values.filter((element, index) => {
    return index > 0
  })
}

export const getHeaders = () => Storage.values && Storage.values[0]

export const getPreparedCards = () => {
  const preparedList = []
  const rows = getRows()
  const headers = getHeaders()

  rows.forEach((row, index) => {
    const obj = {}
    row.forEach((cell, index) => {
      obj[headers[index]] = cell
    })
    preparedList.push(obj)
  })

  return preparedList
}
