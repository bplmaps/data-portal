<template>
  <section class="search-results mt-5">
    <ais-instant-search 
        :initial-ui-state="initialUiState" 
        :search-client="searchClient"
        index-name="metadata-sandbox" >
    <div class="container is-fluid">
      <ais-search-box placeholder="Search here…" class="searchbox" />
    </div>
    
    <div class="container is-fluid mt-5">
        <h2 class="title is-size-3.5">Search Results</h2>

        <div class="columns">
          <div class="column is-one-fifth" v-if="$root.$data.viewComplexityMode === 'extended' ">

            <div class="py-3">
              <h4 class="title is-size-6">Theme subjects</h4>
              <ais-refinement-list attribute="tags.thematic.LCSH.subjectTag" ></ais-refinement-list>
            </div>

            <div class="py-3">
              <h4 class="title is-size-6">Place subjects</h4>
              <ais-refinement-list attribute="tags.geographic.placeTag" ></ais-refinement-list>
            </div>

            <div class="py-3">
              <h4 class="title is-size-6">Data Types</h4>
              <ais-refinement-list attribute="core.dataTypes" ></ais-refinement-list>
            </div>

          </div>


          <div class="column">
          <ais-hits>
          <div slot="item" slot-scope="{ item }" @click="$router.push({ path: `/catalog/${getId(item.core.$id)}` })">
            <a :href="'#/catalog/' + getId(item.core.$id)"><h2 class="title is-size-5 mb-3">{{ item.core.title}}</h2></a>
            <p class="is-family-secondary is-muted is-size-6">{{ item.core.shortDescription.substring(0,240) }}</p>
            <span v-if="item.lifecycle.acquisition.creator" class="tag is-light is-info mt-2"><font-awesome-icon icon="atlas" class="mr-2"></font-awesome-icon> {{item.lifecycle.acquisition.creator}}</span>
          </div>

        </ais-hits></div>
        </div>
        
        <ais-pagination />
    </div>
  </ais-instant-search>

  </section>
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
      ),
      
    }
  },
  computed: {
    urlQuery: function() {return this.$route.query.s },
    initialUiState: function() { return {"metadata-sandbox": {"query": this.urlQuery}} }
  },
  methods: {
    getId (arkURI){
      var splitURI = arkURI.split("/")[2]
      return splitURI
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "~/style-vars.scss";
.ais-Hits-item {
  border: 1px solid #eee;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  &:hover {
    border: 1px solid #aaa;
  }
}
</style>