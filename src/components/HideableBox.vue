<template>

  <div class="hideable-box is-6">
    <h5 class="is-6" @click="showHide"><font-awesome-icon :icon="hidden ? 'caret-right' : 'caret-down' " class="eye-icon mr-2"></font-awesome-icon>{{title}}</h5>
    <div class="is-family-secondary" v-if="!hidden">
    <slot></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "HideableBox",
  props: {
    "title": String,
    "hidden": {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showHide() {
      this.hidden = !this.hidden;
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

@import "~/style-vars.scss";

h5 {
  cursor: pointer;
}

h5 > .eye-icon {
  transition: color 0.5s;
}

h5:hover > .eye-icon {
  color: $highlight;
}
</style>