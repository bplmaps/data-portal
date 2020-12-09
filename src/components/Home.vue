<template>
  <div class="home">
    <h1>Search for Data</h1>
      <ais-instant-search :search-client="searchClient" index-name="metadata-sandbox">
        <div id="search-container">
          <ais-search-box placeholder="Search here…" class="searchbox" />
        </div>
        <div id ="suggestion-container">
          <div class = "suggestion-text">
            <h2>You could try...</h2>
          </div>
          <div id = "specific-suggestions">
            <ul>
              <li>
                <router-link id = "everything-link" to="/Search">Borders</router-link>
              </li>
              <li>
                <router-link id = "everything-link" to="/Search">Data from the 90s</router-link>
              </li>
              <li>
                <router-link id = "everything-link" to="/Search">All geoJSONs</router-link>
              </li>
              <li>
                <router-link id = "everything-link" to="/Search">Maptivist data</router-link>
              </li>
            </ul>

          </div>
          <div id = "everything">
            <div class = "everything-item" id="everything-text">
                <h2>Or ...</h2>
            </div>
            <div class ="suggestion-text" id ="everything-link-box">
              <router-link id = "everything-link" to="/Search">Show me everything!</router-link></div>
          </div>
        </div>
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
html, body{
    font-family: hero-new, Avenir, Helvetica, Arial, sans-serif;
}


h1{
  font-size: 270%;
  font-weight:normal;
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
}

.searchbox{
  width:100%;
  font-family: hero-new, Avenir, Helvetica, Arial, sans-serif;
}

.home{
  display:flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 10rem;
  width: 65%;
  margin-right: 10rem;
  margin-left: 15rem;
}

a {
  color: rgb(31,31,75);
  text-decoration:none;
  font-size: 120%;
}

a:hover{
  color: #054671;
}

#suggestion-container{
  display:flex;
  flex-direction: column;
}

.suggestion-text{
  display:flex;
  flex-direction: column;
}

#everything{
  display:flex;
  flex-direction: column;
  justify-content:flex-start;
  align-content: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
}


#everything-link-box{
  /* margin-left:30%; */
  align-self:center;
  display:flex;
}

a#everything-link{
  align-self: center;
  color: #810002;
  text-decoration:none;
  border-bottom: 2px solid;
  border-color: #D2E0E8;
}

a#everything-link:hover{
  border-bottom: 4px solid;
  border-color: #D2E0E8;
}




#specific-suggestions{
  flex-wrap: wrap;
  display:flex;
  flex-direction: row;
  justify-content: space-around;
}

#show-all-container{
  flex-wrap: wrap;
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom:1rem;
}

.item{
  max-width: 150px;
  border-style: none none solid none;
  border-color:rgb(237,237,241);
  border-width:.1rem;
  border-radius: .5rem;
  padding: 10px 30px 10px 20px;
  cursor: pointer;
  /* box-shadow: 0 0 5px 0 rgba(0,0,0,0.1); */
  background-color: #ffffff;
}


h4{
  margin:0;
}

.item:hover{
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.1);
}

img.suggestion-pics{
  width: 150px;
}




</style>
