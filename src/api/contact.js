export const submitContactForm = formikData => {
  const formData = new FormData()

  formData.append('email', formikData.email)
  formData.append('name', formikData.name)
  formData.append('phone', formikData.phone)
  formData.append('message', formikData.message);

  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData
  }

  const BASE_URL = `https://amiotaliouniversity.herokuapp.com/api/v1/contactUs`

  return fetch(BASE_URL, config)
}