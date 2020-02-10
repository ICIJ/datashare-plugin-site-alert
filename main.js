import Alert from './Alert.vue'

document.addEventListener('datashare:ready', async ({ detail }) => {
  detail.app.registerHook({ target: 'landing.form:before', definition: Alert })
  detail.app.registerHook({ target: 'search.nav:before', definition: Alert })
}, false)
