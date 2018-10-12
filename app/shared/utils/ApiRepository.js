/* global API_URL */

const getData = (response) => {
  if (response.status === 401) {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return response.json()
}

const formatAPIError = (data) => {
  let str = ''

  if (data instanceof Object) {
    Object.keys(data).forEach((key) => {
      str += `\n${key}: ${data[key]}`
    })
  } else {
    str = `\n${data}`
  }

  return str
}

const getRequestBody = (data) => {
  if (data instanceof FormData || typeof data === 'string') {
    return data
  }
  return JSON.stringify(data)
}

const buildHeaders = (data) => {
  let headers = {
    Accept: 'application/json'
  }

  if (localStorage.getItem('token')) {
    headers = {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

  if (data && data instanceof FormData) {
    return headers
  }

  return {
    ...headers,
    'Content-Type': 'application/json'
  }
}

const buildURL = (url, params) => {
  if (!params) {
    return url
  }

  const parts = []
  Object.keys(params).forEach((key) => {
    parts.push(`${key}=${params[key]}`)
  })

  const serializedParams = parts.join('&')

  if (serializedParams) {
    url += `?${serializedParams}`
  }

  return url
}

const checkInternalError = (response) => {
  if (response.status >= 500) {
    throw new Error('There was an internal Error')
  }

  return response
}

export const getRequest = (url, parameters = null) =>
  fetch(buildURL(global.API_URL + `/${url}.json`, parameters), {
    method: 'GET',
    headers: buildHeaders()
  })
    .then(checkInternalError)
    .then(response => getData(response))
    .catch((error) => {
      console.log(`Error fetching ${url}`, error.message)
      throw error
    })

export const postRequest = (resource, data) =>
  fetch(global.API_URL + `/${resource}`, {
    method: 'POST',
    headers: buildHeaders(data),
    body: getRequestBody(data)
  })
    .then(checkInternalError)
    .then((response) => {
      if ([201, 400, 401].includes(response.status)) {
        return getData(response)
      }

      throw new Error(formatAPIError(response))
    })
    .catch((error) => {
      console.log(`Error creating ${resource}`, error.message)
      throw error
    })

export const deleteRequest = (resource, id) =>
  fetch(global.API_URL + `/${resource}/${id}`, {
    method: 'DELETE',
    headers: buildHeaders()
  })
    .then(checkInternalError)
    .then((response) => {
      if (response.status === 204) {
        return { id }
      }

      throw new Error(formatAPIError(response))
    })
    .catch((error) => {
      console.log(`Error deleting ${resource}`, error.message)
      throw error
    })

export const putRequest = (resource, id, data) => {
  let failed = false
  return fetch(global.API_URL + `/${resource}/${id}`, {
    method: 'PUT',
    headers: buildHeaders(data),
    body: getRequestBody(data)
  })
    .then(checkInternalError)
    .then((response) => {
      if (response.status !== 200) {
        failed = true
      }
      return getData(response)
    })
    .then((json) => {
      if (failed) {
        throw new Error(formatAPIError(json))
      }
      return json
    })
    .catch((error) => {
      console.log(`Error editing ${resource} ${id}`, error.message)
      throw error
    })
}
