<template>
  <div class="alert-banner" v-if="open">
    <slot></slot>
    <div class="closer"><font-awesome-icon class="closer-icon is-clickable" @click="open = false" icon="times-circle"></font-awesome-icon></div>
  </div>

</template>

<script>


export default {
  name: 'AlertBanner',
  data () {
    return {
      open: true
    }
  }
}
</script>

<style scoped lang="scss">
.alert-banner {
  background: linear-gradient(57deg, rgba(255,247,15,0.3) 0%, rgba(250,161,16,0.4) 99%, rgba(250,161,17,0.4) 100%); 
  font-size: 0.9em;
  width: 100%;
  padding: 5px;
  text-align: center;
}
.closer {
  float: right;

}
</style>
