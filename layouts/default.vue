<template>
	<div class="h-100">
		<nuxt/>
	</div>
</template>

<script>
import socket from '~/plugins/socket.io.js'

export default {
  watch: {
    $route(newVal, oldVal) {
      if (oldVal.name == 'chat') {
        socket.disconnect()
        console.log('disconnected')
      }
    }
  }
}
</script>
<style>
  html {
    height: 100%;
  }
  
  body {
    background-color: #f8f9fa;
    height: 100%;
  }

  #__nuxt {
    height: 100%;
  }

  #__layout {
    height: 100%;
  }
</style>