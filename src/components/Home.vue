<template>
  <div class="home">
    <h1>Search for Data</h1>
      <ais-instant-search :search-client="searchClient" index-name="metadata-sandbox">
        <div id="search-container">
          <ais-search-box placeholder="Search here…" class="searchbox" />
        </div>
        <button @click ="runSearch">SUBMIT QUERY</button>
        <router-link to="/Search">SEARCH RESULTS</router-link>
        <!-- <ais-hits>
          <div slot="item" slot-scope="{ item }">
            <h2>{{ item.coreCitation.$id }}</h2>
          </div>
        </ais-hits> -->
  </ais-instant-search>

  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/algolia.css';



export default {
  name: 'Home',
  data () {
    return {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

#search-container {
  display:flex;
  width: 75%;
  margin: .5rem 10rem;
}

.searchbox{
  justify-content:stretch;
  width:100%;
  font-family: hero-new, Avenir, Helvetica, Arial, sans-serif;
}

.home{
  margin-top: 10rem;
}

a:hover{
  border-bottom: 4px solid;
  border-color: #D2E0E8;
}

a {
  color: #810002;
  text-decoration:none;
  border-bottom: 2px solid;
  border-color: #D2E0E8;
}





</style>
