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
  const userInfo = getItemFromLocalStorage('userInfo')
  if (!userInfo) {
    return 'User'
  }

  const { first_name, last_name } = userInfo
  return `${first_name} ${last_name}`
}

const dateTimeOption = {
  timeZone: 'Africa/Accra',
  hour12: true,
  hour: 'numeric',
  minute: 'numeric',
  seconds: 'numeric',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}
export const dateTimeConverter = (value) => {
  const dateTime = new Date(value).toLocaleTimeString('en-US', dateTimeOption)

  return dateTime
}

export const DataStatistics = (data, key) => {
  const dataList = [
    data?.[0]?.[1],
    data?.[0]?.[2],
    data?.[0]?.[3],
    data?.[0]?.[4],
    data?.[0]?.[5],
    data?.[0]?.[6],
    data?.[0]?.[7],
    data?.[0]?.[8],
    data?.[0]?.[9],
    data?.[0]?.[10],
    data?.[0]?.[11],
    data?.[0]?.[12],
  ]
  return dataList.map((value) => (value?.[key] !== null ? value?.[key] : 0))
}

export const emptyLocalStorage = () => localStorage.clear()
