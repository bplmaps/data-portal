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
          <div class="column is-one-fifth">

            <div class="py-3">
              <h4 class="title is-size-6">Theme subjects</h4>
              <ais-refinement-list attribute="subjectTagging.thematic.LCSH.subjectTag" ></ais-refinement-list>
            </div>

            <div class="py-3">
              <h4 class="title is-size-6">Place subjects</h4>
              <ais-refinement-list attribute="subjectTagging.geographic.geonames.placeTag" ></ais-refinement-list>
            </div>

            <div class="py-3">
              <h4 class="title is-size-6">Maintainer</h4>
              <ais-refinement-list attribute="dataLifecycle.maintenance.officialMaintainer" ></ais-refinement-list>
            </div>

            <div class="py-3">
              <h4 class="title is-size-6">Format</h4>
              <ais-refinement-list attribute="dataEndpoints.format" ></ais-refinement-list>
            </div>

            <div class="py-3">
              <h4 class="title is-size-6">Record Type</h4>
              <ais-refinement-list attribute="coreCitation.recordType" ></ais-refinement-list>
            </div>


          </div>
          <div class="column">
          <ais-hits>
          <div slot="item" slot-scope="{ item }">
            <a :href="getId(item.coreCitation.$id)"><h2 class="title is-size-5">{{ item.coreCitation.title}}</h2></a>
            <p class="is-family-secondary is-muted is-size-6">{{ item.coreCitation.briefDescription.substring(0,240) }}</p>
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
      var recordPath = "#/catalog/" + splitURI
      return recordPath
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "~/style-vars.scss";

.ais-Hits-item {
  width: 100%;
  &:hover {
    background-color: lighten($link,70%);
  }
}




</style>
