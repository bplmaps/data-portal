<template>
<div class="consideration-scorecard">

    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
        <td></td>
        <td>Missing, Problematic, or Not Evaluated</td>
        <td>Acceptable for Use</td>
        <td>Excellent or Noteworthy</td>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(consideration, key) in considerations" :key="consideration">
        <th>{{ keynames[key] }}</th>
        <td :class="consideration.value === 0 ? 'icon-selected' : ''"><font-awesome-icon icon="exclamation-triangle"></font-awesome-icon></td>
        <td :class="consideration.value === 1 ? 'icon-selected' : ''"><font-awesome-icon icon="thumbs-up"></font-awesome-icon></td>
        <td :class="consideration.value === 2 ? 'icon-selected' : ''"><font-awesome-icon icon="medal"></font-awesome-icon></td>
      </tr>
    
      </tbody>
     
    </table>  
    

</div>
</template>

<script>
export default {
  name: "ConsiderationScorecard",
  props: {
    "considerations": {
      type: Object,
      default: null
    }
  },
  methods: {
    
  },
  data () {
    return {
      keynames: {
        'machineReadability': "Machine Readability",
        'humanReadability': "Human Readability",
        'socialEmbeddedness': "Social Embeddedness",
      }
    }
  }
}
</script>

<style lang="scss" scoped>

thead td {
  font-size: 0.8em;
}

tbody td {
  font-size: 1.2em;
  color: #ddd;
  &.icon-selected {
    color: black;
  }
}


</style>