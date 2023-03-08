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
    removeItemFromLocalStorage(key)
    return null
  }
  return item
}

export const removeItemFromLocalStorage = (key) => localStorage.removeItem(key)

export const isAuthenticated = () => {
  const token = getItemFromLocalStorage('access')
  return !!token
}

export const formatLabel = (value) => {
  let label = ''
  switch (value) {
    case 'yearly':
      label = 'For the last 12 months'
      break
    case 'monthly':
      label = 'For the last month'
      break
    case 'weekly':
      label = 'For the last 7 days'
      break
    case 'daily':
      label = 'For the last 24 hours'
      break
    default:
      label = 'For the last 12 months'
      break
  }
  return label
}

export const getUserFullName = () => {
  const { first_name, last_name } = getItemFromLocalStorage('userInfo')
  return `${first_name} ${last_name}`
}
