<template>
  <section class="search-results mt-5">
    <ais-instant-search 
        :initial-ui-state="initialUiState" 
        :search-client="searchClient"
        index-name="metadata-sandbox" >

        <ais-configure
          :hits-per-page.camel="5">
        </ais-configure>

    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-10">
          <ais-search-box placeholder="Enter keywords, topics, dates ..." :class-names="{'ais-SearchBox-input': 'input is-medium'}"></ais-search-box> 

        </div>
        <div class="column">
          <router-link to="/" class="button is-medium is-fullwidth"><font-awesome-icon icon="home" class="mr-2"></font-awesome-icon>Home</router-link>
        </div>
      </div>
      
    </div>
    
    <div class="container is-fluid mt-5">
        <h2 class="title is-size-3.5">Search Results</h2>


        <div class="columns">
          <div class="column is-one-fifth" v-if="$root.$data.viewComplexityMode === 'extended' ">
            <h3 class="title is-size-5">Filters</h3>
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

            <div class="py-3">
              <ais-clear-refinements>
                <span slot="resetLabel">Clear filters</span>
              </ais-clear-refinements>
            </div>

          </div>


          <div class="column">

            <ais-state-results>
  <template slot-scope="{ results: { hits, query } }">
    <div v-if="hits.length > 0" >

    <div v-if="$root.$data.viewComplexityMode === 'simple' " class="mb-5 is-size-7 has-text-primary" >
          <button class="button is-primary is-outlined is-small is-multiline" @click="$root.$data.viewComplexityMode = 'extended'"><font-awesome-icon icon="th" class="mr-2"></font-awesome-icon>For filters and more details, switch to Extended View</button> 
        </div>

        <div v-if="$root.$data.viewComplexityMode === 'extended' " class="mb-5">
          <button class="button is-primary is-outlined is-small is-multiline" @click="$root.$data.viewComplexityMode = 'simple'"><font-awesome-icon icon="th-large" class="mr-2"></font-awesome-icon> For easier browsing, switch to Simple View</button>
        </div>

    <ais-hits>

      <div slot="item" :class="item.access ? '' : 'no-endpoints'" slot-scope="{ item }" @click="$router.push({ path: `/catalog/${getId(item.core.$id)}` })">
            <a :href="'#/catalog/' + getId(item.core.$id)"><h2 class="title is-size-5 mb-3">{{ item.core.title}}</h2></a>
            <p class="is-family-secondary is-muted is-size-6">{{ item.core.shortDescription.substring(0,240) }}</p>
            <span v-if="item.lifecycle.acquisition.creator=='Leventhal Map & Education Center'" class="tag is-light is-info mt-2"> 🎨 Created by LMEC</span>
            <span v-if="item.lifecycle.maintenance.officialMaintainer=='Leventhal Map & Education Center'" class="tag is-light is-info mt-2"> 🔧 Maintained by LMEC</span>
            <span v-if="!item.access || item.access.length < 1" class="tag is-light is-gray mt-2"><font-awesome-icon icon="exclamation-circle" class="mr-2"></font-awesome-icon> Information Only · No Data Access</span>

            <div v-if="$root.$data.viewComplexityMode === 'extended'">
              <table class="table is-size-7 has-background-light mt-2">
                <tr><th>Identifier</th><td>{{item.core.$id}}</td></tr>
                <tr><th>Date Published</th><td>{{item.tags.temporal.temporalPublication ? item.tags.temporal.temporalPublication.singleDate : "None"}}</td></tr>
                <tr><th>Access</th>
                <td>{{item.core.accessCondition}}</td></tr>
              </table>
            </div>

          </div>
      
    </ais-hits>
    </div>
    <div v-else class="message is-warning p-5 has-text-centered" >
      <p><font-awesome-icon icon="sad-tear" class="mr-2"></font-awesome-icon>Sorry, we don't have anything right now for <strong>{{ query }}</strong><span v-if="$root.$data.viewComplexityMode === 'extended'"> and these filters</span>!</p>
      <p>We'd be happy to help you find data if you <a href="https://www.leventhalmap.org/research/geospatial/" target="_blank">make a GIS Reference Request</a>.</p>
    </div>
  </template>
</ais-state-results>

            

        
        </div>
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

.button {
  max-width: 100%;
}

.ais-Hits-item {
  border: 1px solid #eee;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  background-color: rgba(255,255,255,0.85);
  .no-endpoints {
    h2 {
      opacity: 0.3;
    }
    p {
      opacity: 0.5;
    }
  }
  &:hover {
    box-shadow: inset 0px 0px 3px 0px $link;
  }
}
</style>