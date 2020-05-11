import { removeElement } from './utils'

export function setup() {
  removeElement('[data-testid="test-ref-div"]')
  setInterval(() => {
    removeElement('[data-testid="test-ref-div"]', false)
  }, 10000)
}