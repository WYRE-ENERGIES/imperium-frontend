export const getCurrentDate = (dateString) => {
  const date = dateString ? new Date(dateString) : new Date()
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
  const labels = {
    yearly: 'For the last 12 months',
    monthly: 'For the last month',
    weekly: 'For the last 7 days',
    daily: 'For the last 24 hours',
  }

  return labels[value] || value
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
  hour12: true,
  hour: 'numeric',
  minute: 'numeric',
  seconds: 'numeric',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}
export const dateTimeConverter = (value, param) => {
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
  return dataList.map((value) =>
    value?.[key] === undefined || null ? 0 : value?.[key],
  )
}

export const getHourFromDate = (dateString) => {
  const dateObj = new Date(dateString)
  const hour = dateObj.getHours()

  const hour12 = hour % 12 || 12
  const period = hour < 12 ? 'AM' : 'PM'

  return `${hour12}${period}`
}

export const emptyLocalStorage = () => localStorage.clear()

export const chartLabelFormatter = (value) => {
  if (value >= 100000) {
    return value / 1000000000 + 'M'
  } else if (value >= 1000) {
    return value / 1000 + 'K'
  }

  return value
}

export const userRole = () => {
  const USER_ROLE = getItemFromLocalStorage('user_role')
  return USER_ROLE
}

export const clientDeviceSelectedGetter = (deviceList) => {
  const deviceInLocaStorage = getItemFromLocalStorage('c_device')
  let deviceRes = deviceList[0] || {}
  if (deviceInLocaStorage) {
    // check if device is in list
    const deviceExist = deviceList.find(
      (device) => device.id === deviceInLocaStorage.id,
    )
    if (deviceExist) {
      deviceRes = deviceExist
    }
  }
  return deviceRes
}
