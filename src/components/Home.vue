<template>
<section class="home">
  <div class="container is-fluid py-6">
    <h1 class="title is-size-1">Search for data</h1>
        <div class="field has-addons">
          <div class="control has-icons-left is-expanded">
          <input v-model="inputQuery" type="text" placeholder="Enter keywords, topics, dates ..." class="input is-large" @keyup.enter="submitMainSearch" >
          <span class="icon is-large is-left">
            <font-awesome-icon icon="search"></font-awesome-icon>
          </span>
          </div>
          <div class="control">
            <button class="button is-primary is-large" @click="submitMainSearch">Search</button>
          </div>
        </div>
  </div>

  <div class="container is-fluid  mt-5">
    <h3 class="title">You could try ...</h3>
    <div class="card m-2 suggestion-card" v-for="suggestion in suggestions">
      <div class="card-content">
      <p class="title is-size-4">{{suggestion.title}}</p>
      <p class="is-family-secondary">{{suggestion.description}}</p>
      </div>
    </div>
  </div>


  </section>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

      suggestions: [
        {title: "Borders", description: "Boundary files and so on", searchString: ""},
        {title: "GeoJSONs", description: "Files in GeoJSON format", searchString: ""},
        {title: "Maptivist Collections", description: "Collections selected for teaching in the Maptivist program", searchString: ""},
        {title: "Something", description: "Blah blah", searchString: ""},
        {title: "Something", description: "Blah blah", searchString: ""},
        {title: "Something", description: "Blah blah", searchString: ""},
        {title: "Something", description: "Blah blah", searchString: ""},
        {title: "Something", description: "Blah blah", searchString: ""},

      ],

     inputQuery: ''
    }
  },
  methods: {
    submitMainSearch: function() {
      this.$router.push({path: 'search', query: {s: this.inputQuery}});
    }
  }

}
</script>

<style lang="scss" scoped>
@import "~/style-vars.scss";

.suggestion-card { 
  width: 30%;
  float: left;
  cursor: pointer;

  &:hover { 
    background-color: lighten($link,70%);}
  }


</style>
