<template>
<div class="consideration-scorecard my-3">
    <div class="columns">
      <div class="column" :class="['score-0',score===0 ? 'selected' : 'unselected']">
        <p class="heading">Missing, Problematic, or Not Evaluated</p>
        <p class="title"><font-awesome-icon icon="exclamation-triangle"></font-awesome-icon></p>
      </div>
      <div class="column" :class="['score-1',score===1 ? 'selected' : 'unselected']">
        <p class="heading">Acceptable for Use</p>
        <p class="title"><font-awesome-icon icon="thumbs-up"></font-awesome-icon></p>
      </div>
      <div class="column" :class="['score-2',score===2 ? 'selected' : 'unselected']">
        <p class="heading">Excellent or Noteworthy</p>
        <p class="title"><font-awesome-icon icon="crown"></font-awesome-icon></p>

      </div>
    </div>

</div>
</template>

<script>
export default {
  name: "ConsiderationScorecard",
  props: {
    "score": {
      type: Number,
      default: 0
    }
  },
  methods: {
    
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.column {
  text-align: center;
  &.unselected {
    opacity: 0.2;
  }
  &.selected {
    font-weight: bold;
  }
  &.score-0.selected {
    color: rgb(136, 25, 25);
  }
  &.score-1.selected {
    color: rgb(15, 70, 58);
  }
  &.score-2.selected {
    color: rgb(204, 170, 20);
  }
}


</style>