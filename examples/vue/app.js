// Set up actions and state ***
const { bindActionsToStore } = Reegux
const appState = {number: 0}

const appActions = {
UP: (state, num) => {
  const newState   = Object.assign({}, state)
  newState.number += 1
  return newState
},
DOWN: (state, num) => {
  const newState   = Object.assign({}, state)
  newState.number -= 1
  return newState
  }
}

window.app = bindActionsToStore(appState, appActions)
// Done with setting up actions and state -> Moving on to Vue *\o/*

Vue.component('counter', {
  props: ['store'],
  methods: { /* all component methods have access to 'app' :D */
    up() { app.send('UP', 1) },
    down() { app.send('DOWN', 1) }
  },
  template: `
  <section>
    <h2> {{ store.number }} </h2>
    <button @click='up'>+ 1</button>
    <button @click='down'>- 1</button>
    <sub-counter :number='store.number'></sub-counter>
  </section>
  `
})

// Just to show that the state change re-renders all components!
Vue.component('sub-counter', {
  props: ['number'],
  template: `
  <section>
    <h3>Sub Counter: {{ number }}</h3>
  </section>
  `
})

const vm = new Vue({
  el: '#app',
  template: `<counter :store='app'></counter>` // pass down the store as a prop
})

// Final steps for Reegux: Define render and then subscribe to the render function! ***
const render = app => {
  vm.$set('app', app) /* Easiest way to set 'app' on the Vue instance */
}

window.app.sub(render) /* Have the app run the render function on each action */