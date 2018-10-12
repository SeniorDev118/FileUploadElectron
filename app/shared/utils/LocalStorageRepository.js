import uuidv1 from 'uuid/v1'

export const getRequest = resource =>
  new Promise(resolve =>
    resolve(JSON.parse(localStorage.getItem(resource)) || [])
  )

export const find = (resource, id) =>
  getRequest(resource).then(
    items => new Promise(resolve => resolve(items.find(item => item.id === id)))
  )

export const postRequest = (resource, data) =>
  getRequest(resource).then((items) => {
    let createData = { ...data }

    if (!createData.id) {
      createData = { ...createData, id: uuidv1() }
    }

    items.push(createData)
    return new Promise(resolve =>
      resolve(localStorage.setItem(resource, JSON.stringify(items)))
    )
  })

export const batchCreate = (resource, data) => {
  const items = []
  data.forEach(item => items.push(Object.assign({}, item, { id: uuidv1() })))
  return new Promise(resolve =>
    resolve(localStorage.setItem(resource, JSON.stringify(items)))
  )
}

export const deleteRequest = (resource, id) =>
  getRequest(resource).then((items) => {
    const newData = items.filter(item => item.id !== id)
    return new Promise(resolve =>
      resolve(localStorage.setItem(resource, JSON.stringify(newData)))
    )
  })

export const update = (resource, id, data) =>
  find(resource, id).then((item) => {
    const newData = Object.assign({}, item, data)
    return deleteRequest(resource, id).then(() => postRequest(resource, newData))
  })
