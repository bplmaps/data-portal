<!-- OBTAINING THE SOURCE METADATA -->
<!-- The majority of values on this page are displayed dynamically from source metadata -->
<!-- Source metadata is archived in a repository available via https://github.com/nblmc/metadata -->
<!-- Each metadata record's path is accessible via https://github.com/nblmc/metadata/{record_id} -->
<!-- In this app component, source metadata is obtained in the create() lifecycle hook using the record ID -->
<!-- After the initial async call, source metadata values are pushed to a Vue data object titled "record" -->
<!-- Anything in this component beginning with 'this.record' has been obtained in this manner -->

<!-- CONDITIONAL DISPLAY -->
<!-- Due to the conceptually diverse materials represented by the metadata, any field may or may not be present for a given record -->
<!-- For this reason, most template elements are wrapped in v-if statements, to display only if they are present -->
<!-- These v-if statements also ensure that the source has been correctly loaded before the app tries to display the values -->
<!-- Especially with the deeply nested metadata JSON structure, v-if statements will help to display any additional source data values -->


<template>
    <!-- VIEW RECORD: big container for whole records page -->
    <div class="view-record">

        <!-- TOP BAR: container for everything above the actual page details (sub-navigation menu, dataset title) -->
        <div id = "top-bar">
            <!-- LINK CONTAINER: container for sub-navigation menu: links for moving around the portal -->
            <div id ="link-container">
                <!-- START OVER: link back to data portal landing page -->
                <router-link to="/" id="start-over">Start over ↩️</router-link>
            </div>
            <!-- TITLE CONTAINER: container for the dataset title -->
            <div id = "title-container" v-if="this.record.coreCitation">
                <!-- dataset title: pulled from source metadata -->
                <h1>{{this.record.coreCitation.title}}</h1>
            </div>
        </div>

        <!-- page divider splitting top bar from record details -->
        <hr class="solid">

        <!-- BASIC CONTENT CONTAINER: big container for all the basic content -->
        <!-- basic content is defined as core citation info, fields flagged as important = true, and data access endpoints -->
        <div id = "basic-content-container">

            <!-- LEFT: top section with basic content is split into two columns -->
            <!-- core citation info and important = true is in the left-hand column -->
            <div class = "left">

                <!-- ⬇️ Record Details ⬇️ -->

                <!-- CORE CITATION: section pertaining to dataset's core citation information -->
                <div v-if="this.record.coreCitation" id="coreCitation">
                    <!-- core citation section title -->
                    <h2>Core Citation</h2>
                    <!-- dataset ID -->
                    <p>id: <strong>{{this.record.coreCitation.$id}}</strong></p>
                    <!-- dataset record type -->
                    <p>Collection or dataset: <strong>{{this.record.coreCitation.recordType}}</strong></p>
                    <!-- dataset general description is tucked into a dropdown, as they can be lengthy -->
                    <details>
                        <!-- dataset description drop-down label -->
                        <summary class = "little-more-details">Dataset overview</summary>
                        <!-- dataset description expanded content -->
                        <p> {{this.record.coreCitation.shortDataDescription}}</p>
                    </details>
                    <!-- dataset genealogy description is tucked into a dropdown, as they can be lengthy -->
                    <details>
                        <!-- dataset genealogy description drop-down label -->
                        <summary id="genealogy-to-do" class = "little-more-details">Genealogy overview</summary>
                        <!-- dataset genealogy description expanded content -->
                        <p> {{this.record.coreCitation.shortGenealogyDescription}}</p>
                    </details>
                    <!-- dataset access condition -->
                    <p>Access Condition: <strong>{{this.record.coreCitation.accessCondition}}</strong></p>
                </div>

                <!-- IMPORTANT CONTEXT: section pertaining to fields flagged anywhere in the metadata as 'important' -->
                <div id="important">
                    <!-- important context section title -->
                    <h2>Important Context</h2>
                    <!-- 🚧 under development 🚧 -->
                    <ul class = "under-development">
                        <li>field: <strong>important context example</strong></li>
                        <li>tutorial: <a href = "www.youtube.com">Join Census Data to Shapefiles</a></li>
                    </ul>
                </div>

            </div>
            <!-- RIGHT: top section with basic content is split into two columns -->
            <!-- data access endpoints are in the right-hand column -->
            <div class = "right">
                <!-- DATA ENDPOINTS: container for data endpoints-->
                <div class = "under-development" v-if="this.record.dataEndpoints" id ="dataEndpoints">
                    <!-- 🚧 under development 🚧 -->
                    <p>{{this.record.dataEndpoints}}</p>
                </div>
            </div>

        <!-- End of Basic Content Container -->    
        </div>




        <!-- MORE CONTENT CONTAINER: big container for all the detailed content -->
        <!-- more content is defined as data biography, resource constellation and data lifecycle -->
        <div id = "more-content-container">
            <div id ="more-details">
                <h2>More Details </h2>
                <details>
                <summary >Everything we know about this data
                </summary>
                    <div v-if="this.record.dataBiography" id = "dataBiography">
                        <h3>Data Biography</h3>
                        {{this.record.dataBiography}}
                    </div>
                    <div v-if="this.record.resourceConstellation" id = "resourceConstellation">
                        <h3>Constellation of Resources</h3>
                        {{this.record.resourceConstellation}}
                    </div>
                    <div v-if="this.record.dataLifecycle" id = "dataLifecycle">
                        <h3>Data Information Lifecycle</h3>
                        {{this.record.dataLifecycle}}
                    </div>
                </details>
            </div>
            <div id = "genealogy-composite">
                <h2 id="genealogy">Data Genealogy</h2>
                <details>
                <summary>Learn more about how this data came to be</summary>
                <div id = "card-container">
                    <h3>Overview</h3>
                    <p>Many times, when people work on data projects, they alter or combine already existing datasets to create new datasets that are more useful for their project goals.</p> 
                    <p>This process can involve:</p>
                    <ul>
                        <li>joining datasets together</li>
                        <li>keeping, changing or removing certain parts of the data</li>
                        <li>running mathematical computations to create new values</li>
                    </ul>
                    <h3>This data project</h3>
                    <p>For this dataset, someone used this ingredient data:</p>
                    <div id = "card-rows">
                        <div v-if="this.allIngredients" id="composite-ingredients-row">
                            <div class="ingredient" v-for="item in this.allIngredients" v-bind:key="item.$id">
                                <button @click ="switchRecords(item.arkID)" >
                                    <h3>INGREDIENT</h3>
                                    <p class = "dataset-title"> {{item.title}}</p>
                                    <p>{{item.notes}}</p>
                                </button>

                            </div>
                        </div>
                        <div v-else>Trouble finding ingredients...</div>
                        <p>To create ⬇ </p>
                        <div v-if="this.record.coreCitation" id="composite-results">
                            <div class = "ingredient">
                                <button @click ="jumpToTop()">
                                    <h3>RECIPE</h3>
                                    <p class = "dataset-title">{{this.record.coreCitation.title}}</p>
                                    <p>The dataset you are currently viewing</p>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                 </details>
            </div>
            <div id = "missingInfo">
                <h2>Missing Context</h2>
                <p>Context we don't know:</p>
                <ul>
                    <li>field: <strong>example description</strong></li>
                    <li>field: <strong>example description</strong></li>
                    <li>field: <strong>example description</strong></li>
                    <li>field: <strong>example description</strong></li>
                </ul>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "ViewRecord",
    data (){
        return {
            recordId: this.$route.params.record_id,
            record: [],
            allIngredients: []
        }
    },
    methods: {
        updateId(){
            this.recordId = this.$route.params.record_id
            this.$router.go()
        },
        jumpToTop(){
            window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        switchRecords(newURL){
            this.$route.params.record_id = newURL
            this.recordId = newURL
            this.$router.push({ name: 'ViewRecord' })
            this.$router.go()
        },
        getAllIngredients (){
            //if there are no ingredients do nothing
            var dataLifecycle = this.record.dataLifecycle
            if (!('acquisition' in dataLifecycle)){
                console.log("There are no ingredients")
            } 
            else{
                var ingredients = dataLifecycle.acquisition.ingredients
                //create a data object with some info about each ingredient
                for (let i = 0; i < ingredients.length; i ++){
                    var ingredientProps = {}
                    var splitURI = ingredients[i].$id.split("/")[2]
                    ingredientProps = {"$id": ingredients[i].$id, "arkID": splitURI, "catalogURL": '#/catalog/' + splitURI, "notes": ingredients[i].notes, "title": ""}
                    this.allIngredients.push(ingredientProps)
                }

                //add some data from the ingredient records to the new ingredient data objects
                for (let i = 0; i < this.allIngredients.length; i ++){
                    var current = this.allIngredients[i]
                    var currentSplit = current.$id.split("/")[2]
                    axios.get("https://raw.githubusercontent.com/nblmc/metadata/main/" + currentSplit + ".json")
                        .then(response => {
                                //Vue.set(this.allIngredients[i], "title", response.data.coreCitation.title)
                                this.allIngredients[i].title = response.data.coreCitation.title
                            }).catch(err => {
                                console.log("Couldn't retrieve ingredient metadata")
                            })
                }
            }

        }
    },
    created() {
        //returns a promise
        axios.get("https://raw.githubusercontent.com/nblmc/metadata/main/" + this.recordId + ".json")
            .then(response => {
                //get the metadata for the main record
                this.record = response.data
                this.getAllIngredients()
            }).catch(err => {
                console.log("Couldn't retrieve record metadata")
            })

    },
    watch:{
        $route: 'updateId'
    }
}
</script>

<style scoped>

.under-development{
    background-color:hotpink;
}

summary#genealogy-to-do{
    background-color:hotpink;
}

.view-record{
    display:flex;
    flex-direction: column;
    margin:10rem;
}

/* Solid border */
hr {
  border: 0;
  clear:both;
  display:block;
  width: 96%;               
  background-color:rgb(237,237,241);
  height: .1rem;
}


#basic-content-container{
    display:flex;
    flex-direction: row;
    margin-bottom: .5rem;
}

#more-content-container{
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
}

.left{
    display:flex;
    flex-direction:column;
    width: 55%;
    padding: 0 .75rem;
}

.right {
    width: 45%;
    overflow-wrap: break-word;
}

#dataEndpoints{
border-style: solid;
  border-color:#054671;
  padding: 0 .75rem;
  border-width:.5rem;
  box-shadow: .25rem .25rem;
}

#content{
    max-width:100%;
    overflow-wrap: break-word;
}



a#start-over{
  margin-bottom:1rem;
  float:left;
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

p.dataset-title{
  color: #810002;
}


#top-bar{
    display:flex;
    flex-direction: column;
}

/* Remove the default carrot from the details dropdown */
details summary#big-more-details::-webkit-details-marker {
  display:none;
}

summary.little-more-details{
    margin-bottom: .75rem;
}

/* Remove the auto box highlight from the details dropdown */
*:focus {
  outline: none;
}

#card-container{
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap;
}

#card-rows{
    display:flex;
    flex-direction:column;
}


#composite-ingredients-row{
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-self: flex-start;
}

                           
div#composite-process{
    text-align: center;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-self: flex-start;
}
                            
#composite-results{
    display:flex;
    justify-content: center;
    align-self:flex-start;
}

.ingredient{
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 200px;
    padding: .5rem;
    margin: .5rem;
    overflow-wrap: break-word;
    border-color:rgb(237,237,241);
    border-width:.1rem;
}

button{
    font-family: hero-new, Avenir, Helvetica, Arial, sans-serif;
    color: rgb(31,31,75);
    text-align: left;
}

button:hover{
    cursor:pointer;
}

.ingredient:hover{
  box-shadow: 0 0 15px 0 rgba(0,0,0,0.1);
}

img.process-img{
    height:100px;
    width: 150px;
    align-self:center;
}

.process-desc{
    width: 100px;
    align-self:center;
}
                            


</style>