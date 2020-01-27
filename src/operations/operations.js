export const validEmail = (email) => {
  if (!/\S+@\S+\.\S+/.test(email)) {
    return true
  }
  return false
}

export const validPhone = (phone) => {
  if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)) {
    return true
  }
  return false
}

export const isNumber = (number) => {
  if (!/^[0-9]+$/.test(number)) {
    return true
  }
  return false
}

export const isRequired = (value) => {
  if (!value || value === '') {
    return true
  }
  return false
}

export const makeQueryParams = (defaultParams, requestParams) => {
  let queryParams = Object.assign({}, defaultParams)
  let queryString = '?';
  Object.keys(defaultParams).forEach((ele) => {
    if (requestParams[ele]) {
      queryParams[ele] = requestParams[ele];
      queryString = queryString + `${ele}=${requestParams[ele]}&`
    } else {
      queryString = queryString + `${ele}=${queryParams[ele]}&`
    }
  })
  queryString = queryString.substring(0, queryString.length - 1);
  return queryString
}
