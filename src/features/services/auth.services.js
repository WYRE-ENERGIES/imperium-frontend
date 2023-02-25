// all api calls for authentication goes here
import axios from 'axios'

// const AUTH_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const baseURL = 'https://d39f-197-210-28-50.eu.ngrok.io/auth/login/'
const registerUser = async () => {}

const loginUSer = async (email, password) => {
  const res = await axios
    .post(baseURL, { email: email, password: password })
    .then((response) => {
      if (response.data.accessn) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
    })
    .catch((error) => {
      error.status
    })
}

const authServices = {
  registerUser,
  loginUSer,
}

export default authServices
