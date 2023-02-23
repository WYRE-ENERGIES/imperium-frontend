// all api calls for authentication goes here
import axios from 'axios'

// const AUTH_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const baseURL = 'https://d39f-197-210-28-50.eu.ngrok.io/auth/login/'

const registerUser = async () => {}

const loginUser = async (data) => {
  try {
    const response = await axios
      .post(baseURL, data)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  } catch (error) {
    console.error(error)
  }
}

const authServices = {
  registerUser,
  loginUser,
}

export default authServices
