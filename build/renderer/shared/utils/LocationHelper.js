'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const isTagRoute = exports.isTagRoute = pathname => pathname && pathname.includes('tags');

const isFolderRoute = exports.isFolderRoute = pathname => pathname && pathname.includes('folders');

const isImageRoute = exports.isImageRoute = pathname => pathname && pathname.includes('assets');

const getTagId = exports.getTagId = pathname => {
  if (!isTagRoute(pathname)) {
    return null;
  }

  const pathWithoutAsset = pathname.split('/assets')[0];

  return pathWithoutAsset.split('/').pop() || pathWithoutAsset.split('/').pop();
};

const getFolderId = exports.getFolderId = pathname => {
  if (!isFolderRoute(pathname)) {
    return null;
  }

  const pathWithoutAsset = pathname.split('/assets')[0];

  return pathWithoutAsset.split('/').pop() || pathWithoutAsset.split('/').pop();
};

const getImageId = exports.getImageId = pathname => {
  if (!pathname.includes('assets')) {
    return null;
  }

  return pathname.split('/').pop() || pathname.split('/').pop();
};
//# sourceMappingURL=LocationHelper.js.map