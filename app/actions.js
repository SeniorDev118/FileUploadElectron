export const INITIAL_LOAD = 'INITIAL_LOAD'

export function setInitialLoadAction(initialLoad) {
  return {
    type: INITIAL_LOAD,
    initialLoad
  }
}
