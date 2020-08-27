import { removeElement } from './utils'

export function setup() {
  removeElement(['#google-one-tap-container', '#credential_picker_container'], true, (isRemove) => {
    if (isRemove) {
      setup()
    }
  })
}
