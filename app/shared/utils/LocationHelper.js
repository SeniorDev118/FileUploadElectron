export const isTagRoute = pathname => pathname && pathname.includes('tags')

export const isFolderRoute = pathname => pathname && pathname.includes('folders')

export const isImageRoute = pathname => pathname && pathname.includes('assets')

export const getTagId = (pathname) => {
  if (!isTagRoute(pathname)) {
    return null
  }

  const pathWithoutAsset = pathname.split('/assets')[0]

  return pathWithoutAsset.split('/').pop() || pathWithoutAsset.split('/').pop()
}

export const getFolderId = (pathname) => {
  if (!isFolderRoute(pathname)) {
    return null
  }

  const pathWithoutAsset = pathname.split('/assets')[0]

  return pathWithoutAsset.split('/').pop() || pathWithoutAsset.split('/').pop()
}

export const getImageId = (pathname) => {
  if (!pathname.includes('assets')) {
    return null
  }

  return pathname.split('/').pop() || pathname.split('/').pop()
}
