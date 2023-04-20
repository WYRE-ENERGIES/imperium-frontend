const nameRegEx = /^[a-zA-Z]+$/g
// const phoneRegEx = /((\+(234)[789])|(0)([789]))[0-1]\d{8}/
const phoneRegEx = /((\+(234)[789]))[0-1]\d{8}/
const addressRegEx = /^[^!@#$%^*_+]+$/
export const addressValidation = (e, ref, message) => {
  if (addressRegEx.test(e.target.value)) {
    ref.current.innerHTML = ''
    console.log('working')
  } else if (!addressRegEx.test(e.target.value)) {
    ref.current.innerHTML = message
    ref.current.style.color = 'red'
    console.log('working as well')
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
export const phoneValidation = (e, ref, message) => {
  if (phoneRegEx.test(e.target.value)) {
    ref.current.innerHTML = ''
  } else if (!phoneRegEx.test(e.target.value)) {
    ref.current.innerHTML = message
    ref.current.style.color = 'red'
  } else if (e.target.value.length > 14) {
    console.log('light on')
    ref.current.innerHTML = 'Limited Exceed'
    ref.current.style.color = 'red'
  } else if (e.target.value.length < 14) {
    ref.current.innerHTML = 'Incorrect phone number'
    ref.current.style.color = 'red'
  }
}
