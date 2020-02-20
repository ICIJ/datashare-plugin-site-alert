import Alert from './Alert.vue'

document.addEventListener('datashare:ready', async ({ detail }) => {
  detail.core.registerHook({ target: 'landing.form:before', definition: Alert })
  detail.core.registerHook({ target: 'search.nav:before', definition: Alert })
}, false)
