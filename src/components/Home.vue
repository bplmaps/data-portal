<template>
<section class="home">
  <div class="container py-6">
    <h1 class="title is-size-1">Search for data</h1>
    <ais-instant-search :search-client="searchClient" index-name="metadata-sandbox">
        <div class="field">
          <div class="control">
          <ais-search-box placeholder="Enter keywords, topics, dates ..." class="searchbox" :class-names="{ 'ais-SearchBox-input': 'input is-large'  }" />
          </div>
        </div>
    </ais-instant-search>
  </div>

  <div class="container mt-5">
    <h3 class="title">You could try ...</h3>
    <div class="card m-2" v-for="suggestion in suggestions">
      <div class="card-content">
      <p class="title is-size-4">{{suggestion.title}}</p>
      <p>{{suggestion.description}}</p>
      </div>
    </div>
  </div>


  </section>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/algolia.css';



export default {
  name: 'Home',
  data () {
    return {

      suggestions: [
        {title: "Borders", description: "Boundary files and so on", searchString: ""},
        {title: "GeoJSONs", description: "Files in GeoJSON format", searchString: ""},
        {title: "Something", description: "Blah blah", searchString: ""},
        {title: "Something", description: "Blah blah", searchString: ""},
        {title: "Something", description: "Blah blah", searchString: ""},
        {title: "Something", description: "Blah blah", searchString: ""},
        {title: "Something", description: "Blah blah", searchString: ""},
        {title: "Something", description: "Blah blah", searchString: ""},

      ],

      searchClient: algoliasearch(
        'LFBGYLWA9I',
        '403d4e78612290db2c0fd2d837a1137e'
      )
    }
  },
  methods: {
    runSearch(){
      console.log("u searched.")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/style-vars.scss";

.card { width: 30%; float: left; }
.card {
  &:hover { background-color: lighten($primary,70%);}
}

</style>
