<script>
  const BOOTSTRAP_VARIANTS = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark']

  export default {
    data () {
      return {
        username: null
      }
    },
    async mounted () {
      this.username = await window.datashare.auth.getUsername()
    },
    methods: {
      castVariant (color, defaultValue = 'dark') {
        if (BOOTSTRAP_VARIANTS.indexOf(color) > -1) {
          return color
        }
        return defaultValue
      },
      castConfigToVariant (name, defaultValue = 'dark') {
        return this.castVariant(this.$config.get(name, defaultValue), defaultValue)
      }
    },
    computed: {
      message () {
        const defaultValue = 'Hello <strong>{username}</strong>, welcome to Datashare! Please set the <code>appAlertMessage</code> configuration variable to change this message.'
        const message = this.$config.get('appAlertMessage', defaultValue)
        // Returns the message and inject the username
        return message.split('{username}').join(this.username)
      },
      variant () {
        const defaultValue = 'info'
        return this.castConfigToVariant('appAlertVariant', defaultValue)
      },
      color () {
        const defaultValue = 'dark'
        return this.castConfigToVariant('appAlertColor', defaultValue)
      },
      classList () {
        return [`bg-${this.variant}`, `text-${this.color}`]
      }
    }
  }
</script>

<template>
  <div class="text-center p-2 width-100" :class="classList" v-html="message"></div>
</template>
