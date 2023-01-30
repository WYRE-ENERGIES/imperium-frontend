export const getCurrentDate = () => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}

export const saveToLocalStorage = (key, item, ttl) => {
  if (ttl) {
    item = {
      ...item,
      ttl,
    }
  }

  localStorage.setItem(key, JSON.stringify(item))
}

export const getItemFromLocalStorage = (key, ttl) => {
  const item = JSON.parse(localStorage.getItem(key))

  if (!item || (ttl && ttl !== item?.ttl)) {
    localStorage.removeItem(key)
    return null
  }

  return item
}
