const Reegux = {
  bindActionsToStore: (state, actions) => {
    return new class {
      constructor(state, actions) {
        this.state = state
        this.actions = actions
      }

      send(message, arg) {
        const newState = this.actions[message](this.state, arg)
        if (newState === this.state) {
          console.error('please return a copy/clone')
          return 'please return a copy/clone'
        }
        this.state = newState
        if (this.render) this.render(this.state)
      }

      sub(fn) {
        fn(this.state)
        this.render = fn
      }
    }(state, actions)
  }
}

module.exports = Reegux
