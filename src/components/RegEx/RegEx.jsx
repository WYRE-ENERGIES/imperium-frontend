const nameRegEx = /^[a-zA-Z-]+$/g
const phoneRegEx = /((\+(234)[789])|(0)([789]))[0-1]\d{8}/
// const phoneRegEx = /((\+(234)[789]))[0-1]\d{8}/
const urlRegEx = /(www)[.][a-zA-Z]+[.]([a-z]{3})+/
const addressRegEx = /^[^!@#$%^*_+]+$/
export const addressValidation = (e, ref, message) => {
  if (addressRegEx.test(e.target.value)) {
    ref.current.innerHTML = ''
  } else if (!addressRegEx.test(e.target.value)) {
    ref.current.innerHTML = message
    ref.current.style.color = 'red'
  }
}
export const nameValidation = (e, ref, message) => {
  if (nameRegEx.test(e.target.value)) {
    ref.current.innerHTML = ''
  } else if (!nameRegEx.test(e.target.value)) {
    ref.current.innerHTML = message
    ref.current.style.color = 'red'
  }
}
export const urlValidation = (e, ref, message) => {
  if (urlRegEx.test(e.target.value)) {
    ref.current.innerHTML = ''
  } else if (!urlRegEx.test(e.target.value)) {
    ref.current.innerHTML = message
    ref.current.style.color = 'red'
  }
}
export const phoneValidation = (e, ref, message) => {
  if (phoneRegEx.test(e.target.value)) {
    ref.current.innerHTML = ''
  } else if (!phoneRegEx.test(e.target.value)) {
    ref.current.innerHTML = message
    ref.current.style.color = 'red'
  } else if (e.target.value.length > 14) {
    ref.current.innerHTML = 'Limited Exceed'
    ref.current.style.color = 'red'
  } else if (e.target.value.length < 14) {
    ref.current.innerHTML = 'Incorrect phone number'
    ref.current.style.color = 'red'
  }
}

export const passwordLengthValidation = (e, pwdRef, setPwdValid) => {
  if (e.target.value.length < 8) {
    pwdRef.current.style.color = 'red'
    pwdRef.current.innerHTML = 'Password too short.'
    setPwdValid(false)
  } else if (e.target.value.length >= 8) {
    pwdRef.current.style.color = 'green'
    pwdRef.current.innerHTML = 'Password valid !'
    setPwdValid(true)
  }
}
