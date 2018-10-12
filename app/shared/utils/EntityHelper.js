export const updateWithItem = (items, item) => {
  if (!items) {
    return [item]
  }

  const index = items.findIndex(el => el.id === item.id)
  const result = items.filter(i => i.id !== item.id)

  result.splice(index, 0, item)

  return result
}

export const removeItem = (items, id) => {
  if (!items) {
    return []
  }

  return items.filter(i => i.id !== id)
}

export const getData = (entity, id) => {
  const isUrl = id.startsWith(`/${entity}/`)
  const url = isUrl ? id.replace('/', '') : `${entity}/${id}`

  return {
    id: isUrl ? id.replace(`/${entity}/`, '') : id,
    url: url.replace('//', '/')
  }
}
