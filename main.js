import Alert from './Alert.vue'

document.addEventListener('datashare:ready', async ({ detail }) => {
  detail.core.registerHook({ target: 'landing.form:before', definition: Alert })
  detail.core.registerHook({ target: 'page-header:before', definition: Alert })
}, false)
