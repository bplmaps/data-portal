<template>

  <div class="hideable-box p-4">
    <h4 class="is-size-5" @click="showHide"><font-awesome-icon :icon="hidden ? 'eye-slash' : 'eye' " class="eye-icon mr-2"></font-awesome-icon>{{title}}</h4>
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

h4 {
  cursor: pointer;
}

h4 > .eye-icon {
  transition: color 0.5s;
}

h4:hover > .eye-icon {
  color: $highlight;
}
</style>