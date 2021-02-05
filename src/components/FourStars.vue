<template>

<div class="my-2 mx-3">
    <font-awesome-icon icon="star" class="checked" ></font-awesome-icon>
    <font-awesome-icon icon="star" class="checked"></font-awesome-icon>
    <font-awesome-icon icon="star" class="checked"></font-awesome-icon>
    <font-awesome-icon icon="star" class="checked"></font-awesome-icon>
    <font-awesome-icon icon="star" class="unchecked"></font-awesome-icon>
</div>


</template>

<script>


export default {
  name: "FourStars",
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

.checked {
  color: orange;
}

.unchecked {
  color: lightgray;
}


</style>