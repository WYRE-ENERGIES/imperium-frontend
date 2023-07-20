const nameRegEx = /^[a-zA-Z-]+$/g
const phoneRegEx = /^([789])[0-1](\d{6})+$/g
const urlRegEx = /^(www)[.][a-z0-9]+[.]([a-z]{2,3})/

const addressRegEx = /^[^!@#$%^*_+]+$/
const emailRegEx = /[a-z0-9]+[@][a-z]+[.](\D{2,3})/

export const emailValidation = (e, ref, message, setFormValid) => {
  if (emailRegEx.test(e.target.value)) {
    ref.current.innerHTML = ''
    setFormValid(true)
  } else if (!emailRegEx.test(e.target.value)) {
    ref.current.innerHTML = message
    ref.current.style.color = 'red'
    setFormValid(false)
  }
}
export const addressValidation = (e, ref, message, setFormValid) => {
  if (addressRegEx.test(e.target.value)) {
    ref.current.innerHTML = ''
    setFormValid(true)
  } else if (!addressRegEx.test(e.target.value)) {
    ref.current.innerHTML = message
    ref.current.style.color = 'red'
    setFormValid(false)
  }
}
export const nameValidation = (e, ref, message, setFormValid) => {
  if (nameRegEx.test(e.target.value)) {
    ref.current.innerHTML = ''
    setFormValid(true)
  } else if (!nameRegEx.test(e.target.value)) {
    ref.current.innerHTML = message
    ref.current.style.color = 'red'
    setFormValid(false)
  }
}
export const urlValidation = (e, ref, message, setFormValid) => {
  if (urlRegEx.test(e.target.value)) {
    ref.current.innerHTML = ''
    setFormValid(true)
  } else if (!urlRegEx.test(e.target.value)) {
    ref.current.innerHTML = message
    ref.current.style.color = 'red'
    setFormValid(false)
  }
}
export const phoneValidation = (
  value,
  ref,
  message,
  setFormValid,
  isValidPhoneNumber,
) => {
  if (value && isValidPhoneNumber(value)) {
    ref.current.innerHTML = ''
    setFormValid(true)
  } else {
    ref.current.innerHTML = message
    ref.current.style.color = 'red'
    setFormValid(false)
  }
}

export const passwordLengthValidation = (e, pwdRef, message, setFormValid) => {
  if (e.target.value.length < 8) {
    pwdRef.current.style.color = 'red'
    pwdRef.current.innerHTML = message
    setFormValid(false)
  } else if (e.target.value.length >= 8) {
    pwdRef.current.innerHTML = ''
    setFormValid(true)
  }
}
