import Alert from './Alert.vue'

document.addEventListener('datashare:ready', async ({ detail }) => {
  const project = detail.core.config.get('appAlertProject', null)
  if (project) {
    detail.core.registerHookForProject(project, { target: 'landing.form:before', definition: Alert })
    detail.core.registerHookForProject(project, { target: 'search:before', definition: Alert })
  } else {
    detail.core.registerHook({ target: 'landing.form:before', definition: Alert })
    detail.core.registerHook({ target: 'search:before', definition: Alert })
  }
}, false)
