import Alert from './Alert.vue'

window.app.ready.then(() => {

  window.app.registerHook({
    target: 'landing.form:before',
    definition: Alert
  })
})
