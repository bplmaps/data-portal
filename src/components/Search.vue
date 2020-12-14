<template>
  <div class="search-results">
    <router-link to="/" id="start-over">Start over ↩️</router-link>
      <ais-instant-search :search-client="searchClient" index-name="metadata-sandbox">
        <div id="search-container">
          <ais-search-box placeholder="Search here…" class="searchbox" />
        </div>
        <h1>Search Results</h1>
        <ais-hits>
          <a :href ="getId(item.coreCitation.$id)" slot="item" slot-scope="{ item }">
            <h2>{{ item.coreCitation.title}}</h2>
          </a>
        </ais-hits>
  </ais-instant-search>

  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/algolia.css';



export default {
  name: 'Search',
  data () {
    return {
      searchClient: algoliasearch(
        'LFBGYLWA9I',
        '681beca54a39455539a017bafb337a83'
      )
    }
  },
  methods: {
    getId (arkURI){
      var splitURI = arkURI.split("/")[2]
      var recordPath = "#/catalog/" + splitURI
      return recordPath
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
a {
  color: #810002;
  text-decoration:none;
  border-bottom: 2px solid;
  border-color: #D2E0E8;
}

#search-container {
  display:flex;
  width: 100%;
  margin-bottom:.5rem;
}

.searchbox{
  justify-content:stretch;
  width:100%;
  font-family: hero-new, Avenir, Helvetica, Arial, sans-serif;
}

div.search-results{
  margin: 10rem;
}

a#start-over{
  float:left;
  margin-bottom:1rem;
}

a:hover{
  border-bottom: 4px solid;
  border-color: #D2E0E8;
}




</style>
