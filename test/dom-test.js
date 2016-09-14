const chai    = require('chai')
const assert = chai.assert
const Reegux = require('../lib/main')

describe('user uses controllux', function () {
  const { bindActionsToStore } = Reegux

  const appState = {number: 0}

  const stateActions = {
    UP: (state, num) => {
      const newState   = Object.assign({}, state)
      newState.number += 1
      return newState
    },
    DOWN: (state, num) => {
      const newState   = Object.assign({}, state)
      newState.number -= 1
      return newState
    },
    ORIGINAL_STATE: (state) => {
      return state
    },
    MODIFIED_ORIGINAL_STATE: (state) => {
      state.number += 1
      return state
    }
  }

  window.app = bindActionsToStore(
    appState,
    stateActions
  )

  // *** Mocking a mouse click **************
  this.clickEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: 20,
  })
  // *** End of mock *************************

  it('subscribes to the render function properly', () => {
    const render = newState => {
      document.getElementById('num').innerHTML = newState.number
    }

    window.app.sub(render)

    const ele = document.getElementById('up-btn');

    ele.dispatchEvent(this.clickEvent);

    assert.equal(document.getElementById('num').innerHTML, 1)

    ele.dispatchEvent(this.clickEvent);

    assert.equal(document.getElementById('num').innerHTML, 2)
  })
})
