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

  this.app = bindActionsToStore(
    appState,
    stateActions
  )

  it('modifies data', () => {
    const arrayOfTen = [...Array(10).keys()]

    assert.deepEqual(this.app.state, {number: 0})
    this.app.send('UP', 1)

    assert.deepEqual(this.app.state, {number: 1})
    this.app.send('DOWN', 1)

    assert.deepEqual(this.app.state, {number: 0})

    for (const i in arrayOfTen) this.app.send('UP', 1)
    assert.deepEqual(this.app.state, {number: 10})

    for (const i in arrayOfTen) this.app.send('DOWN', 1)
    assert.deepEqual(this.app.state, {number: 0})
  })

  it('returns error message if original state is returned', () => {
    assert.equal(
      this.app.send('ORIGINAL_STATE'),
      'please return a copy/clone'
    )
  })

  it('returns error message if modified original state is returned', () => {
    assert.equal(
      this.app.send('MODIFIED_ORIGINAL_STATE'),
      'please return a copy/clone'
    )
  })
})
