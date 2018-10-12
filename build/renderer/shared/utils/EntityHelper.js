'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const updateWithItem = exports.updateWithItem = (items, item) => {
  if (!items) {
    return [item];
  }

  const index = items.findIndex(el => el.id === item.id);
  const result = items.filter(i => i.id !== item.id);

  result.splice(index, 0, item);

  return result;
};

const removeItem = exports.removeItem = (items, id) => {
  if (!items) {
    return [];
  }

  return items.filter(i => i.id !== id);
};

const getData = exports.getData = (entity, id) => {
  const isUrl = id.startsWith(`/${entity}/`);
  const url = isUrl ? id.replace('/', '') : `${entity}/${id}`;

  return {
    id: isUrl ? id.replace(`/${entity}/`, '') : id,
    url: url.replace('//', '/')
  };
};
//# sourceMappingURL=EntityHelper.js.map