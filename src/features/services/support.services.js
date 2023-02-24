import axios from 'axios'

const ADMIN_SUPPORT_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/imperium-admin/list-support-tickets/`

const getAllAdminSupportTickets = (config, { ordering, page, search }) => {
  let url = `${ADMIN_SUPPORT_BASE_URL}?page=${page}`
  if (search) {
    url += `&search=${search}`
  }

  if (ordering) {
    url += `&ordering=${ordering}`
  }

  return axios.get(url, config)
}

const getSupportPageAnalytics = (config) => {
  return axios.get(`${ADMIN_SUPPORT_BASE_URL}analytics/`, config)
}

const getAdminSupportPageData = async (token, query) => {
  const controller = new AbortController()
  const result = { err: {} }
  const config = {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // eslint-disable-next-line no-undef
  const [analyticsResult, ticketsResult] = await Promise.allSettled([
    getSupportPageAnalytics(config),
    getAllAdminSupportTickets(config, query),
  ])

  if (analyticsResult.status === 'rejected') {
    result.err.analytics = analyticsResult.reason.message
  } else {
    result.analytics = analyticsResult.value.data
  }

  if (ticketsResult.status === 'rejected') {
    result.err.tickets = ticketsResult.reason.message
  } else {
    result.tickets = ticketsResult.value.data
  }

  controller.abort()
  return result
}

const adminResolveTicket = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    `${ADMIN_SUPPORT_BASE_URL}resolve/`,
    data,
    config,
  )
  return response.data
}

const supportServices = {
  adminResolveTicket,
  getAdminSupportPageData,
  getAllAdminSupportTickets,
}

export default supportServices
