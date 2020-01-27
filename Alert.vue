<script>
export default {
  data () {
    return {
      username: null
    }
  },
  async mounted () {
    this.username = await window.app.auth.getUsername()
  }
}
</script>

<template>
  <div class="bg-warning text-center position-absolute sticky-top w-100 p-2">
    This is a demo site for Datashare. You are connected
    as <strong>{{ username }}</strong>, a temporary user.
  </div>
</template>
