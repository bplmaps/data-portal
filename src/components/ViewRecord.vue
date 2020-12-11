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
                    <span v-if="this.record.coreCitation.shortGenealogyDescription">
                    <details>
                        <!-- dataset genealogy description drop-down label -->
                        <summary class = "little-more-details">Genealogy overview</summary>
                        <!-- dataset genealogy description expanded content -->
                        <p> {{this.record.coreCitation.shortGenealogyDescription}}</p>
                    </details>
                    </span>
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

                <!-- SUGGESTED ENTRY POINTS: fields flagged as suggested entry points -->
                <div id="suggested-entry">
                    <!-- suggested entry points section title -->
                    <h2>Suggested Entry Points</h2>
                    <!-- 🚧 under development 🚧 -->
                    <ul class = "under-development">
                        <li>field: <strong>suggested entrypoint example</strong></li>
                        <li>tutorial: <a href = "www.youtube.com">Join Census Data to Shapefiles</a></li>
                    </ul>
                </div>

            </div>
            <!-- RIGHT: top section with basic content is split into two columns -->
            <!-- data access endpoints are in the right-hand column -->
            <div class = "right">
                <!-- DATA ENDPOINTS: container for data endpoints-->
                <div v-if="this.record.dataEndpoints" id ="dataEndpoints">
                    <!-- data endpoint section title -->
                    <h2>Data Endpoints</h2>
                    <!-- loop through all the data endpoints -->
                    <ul v-for="item in this.record.dataEndpoints" v-bind:key="item.$id">
                        <!-- link to the access URL -->
                        <li v-if="item.source == 'Leventhal Map & Education Center'">
                            <!-- give the file link -->
                            <a :href="item.accessURL">{{getFileName(item.accessURL)}}</a>
                            <!-- cite the source -->
                            <p id = "source">Source: <strong>{{item.source}}</strong></p>
                        </li>
                        <li v-else>
                            <!-- where we can't control the file name, display the file format -->
                            <a :href="item.accessURL">{{item.format}}</a>
                            <!-- cite the source -->
                            <p id = "source">Source: 
                                <a :href="item.accessedViaURL" target="_blank"><strong>{{item.source}}</strong></a>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>

        <!-- End of Basic Content Container -->    
        </div>




        <!-- MORE CONTENT CONTAINER: big container for all the detailed content -->
        <!-- more content is defined as data biography, resource constellation and data lifecycle -->
        <div id = "more-content-container">

            <!-- MORE DETAILS: contains data biography, resource constellation and data lifecycle -->
            <div id ="more-details" class = "under-development">
                <!-- more details section title -->
                <h2>More Details </h2>
                <!-- data biography, resource constellation and data lifecycle are tucked into a dropdown so as not to overwhelm -->
                <details ref="showdetails">
                    <!-- more details drop-down label -->
                    <summary >Information we know about this data</summary>
                
                    <!-- page divider splitting the sections -->
                    <hr class="solid">

                    <!-- DATA BIOGRAPHY: container for data biography section -->
                    <div v-if="this.record.dataBiography" id = "dataBiography">
                        <!-- data biography section title -->
                        <h3>Data Biography <a class = "schema-info" target="_blank" :href="'https://geoservices.leventhalmap.org/cartinal/documentation/schema/dataBiography.html'"><font-awesome-icon icon="info-circle" /></a></h3>
                        <!-- go through all the top level categories in the Data Biography section -->
                        <!-- for example: Sampling, Privacy, Data Collection, Funding, Potential Harm-->
                        <div v-for="firstLevelItem, firstLevelIndex in this.record.dataBiography" v-bind:key="firstLevelIndex">
                            <!-- print the section head, using the field alias -->
                            <h4>{{getFieldAlias(firstLevelIndex)}} </h4>
                            <!-- go through all the 2nd level categories in the Data Biography section -->
                            <!-- for example: Universe, Sample Size, Start Date, Who Conceived, etc etc -->
                            <span v-for="secondLevelItem, secondLevelIndex in firstLevelItem" v-bind:key="secondLevelIndex">
                                <!-- the items reached by these 2nd level category indices are ARRAYS, so we need to get the array items -->
                                <details v-for="arrayItem, arrayIndex in secondLevelItem" v-bind:key="arrayIndex">
                                    <summary v-show="arrayItem.notes != undefined ">{{getFieldAlias(secondLevelIndex)}}</summary>
                                    <ul >
                                        <li>
                                            <p class = "context-notes">{{arrayItem.notes}}</p>
                                            <p class = "related-resource"><a target="_blank" :href="arrayItem.relatedResourceURL">Learn More <font-awesome-icon icon="external-link-alt" /></a></p>
                                        </li>
                                    </ul>
                                </details>
                            </span>
                        </div>
                    </div>

                    <!-- page divider splitting the sections -->
                    <hr class="solid">

                    <!-- RESOURCE CONSTELLATION: container for resource constellation section -->
                    <div v-if="this.record.resourceConstellation" id = "resourceConstellation">
                        <!-- resource constellation section title -->
                        <h3>Constellation of Resources <a class = "schema-info" target="_blank" :href="'https://geoservices.leventhalmap.org/cartinal/documentation/schema/resourceConstellation.html'"><font-awesome-icon icon="info-circle" /></a></h3>
                        <!-- 🚧 under development 🚧 -->
                        <div v-for="item, index in this.record.resourceConstellation" v-bind:key="item.$id">
                            <h4><a target ="_blank" :href="'https://geoservices.leventhalmap.org/cartinal/documentation/schema/' + index + '.html'"> {{index}}: </a></h4>
                        </div>
                    </div>

                    <!-- page divider splitting the sections -->
                    <hr class="solid">

                    <!-- DATA LIFECYCLE: container for data lifecycle section -->
                    <div v-if="this.record.dataLifecycle" id = "dataLifecycle">
                        <!-- data lifecycle section title -->
                        <h3 ref="manipulation">Data Information Lifecycle <a class = "schema-info" target="_blank" :href="'https://geoservices.leventhalmap.org/cartinal/documentation/schema/dataLifecycle.html'"><font-awesome-icon icon="info-circle" /></a></h3>
                        <!-- 🚧 under development 🚧 -->
                        <div v-for="item, index in this.record.dataLifecycle" v-bind:key="item.$id">
                            <h4>{{index}}</h4>
                        </div>
                    </div>

                </details>
            </div>
            <!-- End of More Details Container -->  


            <!-- GENEALOGY SECTION: big container for the genealogy section -->
            <div v-if="this.record.dataLifecycle" id="genealogy-section">
                <!-- does not appear if there are no ingredients -->
                <div v-if="this.record.dataLifecycle.acquisition">
                    <!-- data lifecycle section title -->
                    <h2 v-if="this.record.dataLifecycle.acquisition">Data Genealogy</h2>
                    <!-- genealogy section is tucked into a dropdown so as not to overwhelm -->
                    <details>
                        <!-- genealogy section drop-down label -->
                        <summary>Learn more about where this data came from</summary>

                        <!-- genealogy section expanded content -->
                        <!-- GENEALOGY DROPDOWN CONTENT: big container for dropdown content in genealogy section -->
                        <div id = "genealogy-dropdown-content">

                            <div id = "genealogy-overview">
                                <!-- genealogy section overview title -->
                                <h3>Overview</h3>
                                <!-- genealogy overview content text -->
                                <p>Many times, when people work on data projects, they alter or combine already existing datasets to create new datasets that are more useful for their project goals. </p>
                                <p>This is similar to cooking, where people form a recipe by picking and choosing ingredients to try to get as close as possible to an outcome that is exactly what they are looking for.</p>
                                <p>This activity, called <strong>data cleaning</strong> or <strong>data processing</strong> can involve:</p>
                                <ul>
                                    <li>combining dataset ingredients together</li>
                                    <li>trimming or kneading certain parts of the ingredients</li>
                                    <li>cooking the data to compute new values with math</li>
                                </ul>
                                <p>Just like in in cooking, sometimes the perfect ingredients aren't available, and people have to work with what they have. </p>
                            </div>

                            <!-- genealogy section project details title -->
                            <h3 id ="this-data-project">Ingredients for this Data Project</h3>
                            <!-- genealogy section project details text -->
                            <p>To create this dataset, someone used this ingredient data:</p>

                            <!-- RECIPE TREE CONTAINER: container for genealogy tree elements --> 
                            <div id = "recipe-tree-container">

                                <!-- INGREDIENTS CONTAINER: container for ingredients --> 
                                <!-- function getAllIngredients() populates Vue data object titled "allIngredients" with info about the ingredients --> 
                                <div v-if="this.allIngredients" id="ingredients-container">

                                    <!-- button loops through allIngredients and creates a card for each --> 
                                    <button @click ="switchRecords(item.arkID)" v-for="item in this.allIngredients" v-bind:key="item.$id" >
                                        <!-- ingredient card title -->
                                        <h3 class = "card-title">INGREDIENT</h3>
                                        <!-- ingredient dataset title -->
                                        <p class = "dataset-title"> {{item.title}}</p>
                                        <!-- ingredient dataset processing notes -->
                                        <p>{{item.notes}}</p>
                                    </button>

                                </div>
                                <!-- ingredient dataset title -->
                                <div v-else>Trouble finding ingredients...</div>

                                <!-- recipe segue text -->
                                <p>To make ⬇ </p>

                                <!-- RECIPE RESULTS: container for recipe results --> 
                                <div v-if="this.record.coreCitation" id="recipe-results">
                                    <button @click ="jumpToTop()">
                                        <!-- recipe card title -->
                                        <h3 class = "card-title">RECIPE</h3>
                                        <!-- current record title -->
                                        <p class = "dataset-title">{{this.record.coreCitation.title}}</p>
                                        <!-- clarifying note -->
                                        <p><strong>The dataset you are currently viewing</strong></p>
                                    </button>
                                </div>

                            </div>
                            <!-- End of Recipe Tree Container -->
                            <h3 id="processing-nod">Learn More</h3>
                            <p id="processing-nod">To find out everything we know about how someone created this dataset, check out the processing section in
                                <a @click="showManipulation()">Data Lifecycle</a>.
                            </p>
                        </div>
                        <!-- End of Genealogy Container -->

                    </details>
                </div>
            </div>
            <!-- End of Genealogy Section Big Container --> 

            <!-- MISSING INFO: big container for the missing context section -->
            <div id = "missingInfo" class="under-development">
                <!-- missing context title -->
                <h2>Missing Context</h2>
                <!-- missing context content-->
                <p>Context we don't know:</p>
                <!-- 🚧 under development 🚧 -->
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
            //variable to store the watched route in case it changes
            recordId: this.$route.params.record_id,
            //place to store source metadata JSON
            record: [],
            //place to store the field aliases
            aliases: [],
            //place to store attributes pulled from ingredient datasets
            allIngredients: []
        }
    },
    methods: {
        //function to reload the page if the route changes
        updateId(){
            this.recordId = this.$route.params.record_id
            this.$router.go()
        },
        //function to scroll to the top of the page
        jumpToTop(){
            window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        //upon clicking on the ingredients, change the record
        switchRecords(newURL){
            this.$route.params.record_id = newURL
            this.recordId = newURL
            this.$router.push({ name: 'ViewRecord' })
            this.$router.go()
        },
        //to navigate to the data lifecycle > manipuation section from the genealogy section
        //need to expand the more details drop down and scroll to that part of the page
        showManipulation(){
            var moreDetails = this.$refs.showdetails
            var manipulation = this.$refs.manipulation
            moreDetails.open = "true"
            manipulation.scrollIntoView({behavior: 'smooth' })
        },
        //function to split whole path from file name for display
        getFileName(fullpath){
            var splitPath = fullpath.split("/");
            var fileName = splitPath.pop()
            return fileName
        },
        //function to return appropriate field aliases
        getFieldAlias(realFieldName){
            for (var key in this.aliases) {
                if (this.aliases.hasOwnProperty(realFieldName)) {
                    var fieldAlias = this.aliases[realFieldName];
                    return fieldAlias
                } else {
                    return realFieldName
                }
            }
        },
        //function to push ingredient attributes to a Vue data object
        getAllIngredients (){
            //if there are no ingredients do nothing
            var dataLifecycle = this.record.dataLifecycle
            if (!('acquisition' in dataLifecycle)){
                console.log("There are no ingredients")
            } 
            //if there are ingredients
            else{
                //create a variable for ingredients, pulled from the original source data
                var ingredients = dataLifecycle.acquisition.ingredients
                //loop through all the ingredients
                for (let i = 0; i < ingredients.length; i ++){
                    //create an empty object
                    var ingredientProps = {}
                    //get the ID
                    var splitURI = ingredients[i].$id.split("/")[2]
                    //add the id, title, catalogURL & processing notes to the new data object
                    ingredientProps = {"$id": ingredients[i].$id, "arkID": splitURI, "catalogURL": '#/catalog/' + splitURI, "notes": ingredients[i].notes, "title": ""}
                    //push the new object to the Vue data
                    this.allIngredients.push(ingredientProps)
                }

                //the source record doesn't have ingredient titles & we want those, so have to get them from Github
                //for all the items in the new ingredient data
                for (let i = 0; i < this.allIngredients.length; i ++){
                    var current = this.allIngredients[i]
                    var currentSplit = current.$id.split("/")[2]
                    //grab metadata associated with that ingredient
                    axios.get("https://raw.githubusercontent.com/nblmc/metadata/main/" + currentSplit + ".json")
                        .then(response => {
                                //add the ingredient dataset title to the new ingredient data object
                                this.allIngredients[i].title = response.data.coreCitation.title
                            }).catch(err => {
                                console.log("Couldn't retrieve ingredient metadata")
                            })
                }
            }

        }
    },
    created() {
        //get the source metadata
        axios.get("https://raw.githubusercontent.com/nblmc/metadata/main/" + this.recordId + ".json")
            .then(response => {
                //add it to the Vue data
                this.record = response.data
                //run the function to get all the ingredients, too
                this.getAllIngredients()
            }).catch(err => {
                console.log("Couldn't retrieve record metadata")
            })
        
        //get the field aliases
        axios.get("https://raw.githubusercontent.com/nblmc/Data-Context/master/aliases.json")
            .then(response => {
                //add it to the Vue data
                this.aliases = response.data
            }).catch(err => {
                console.log("Couldn't retrieve aliases")
            })

    },
    watch:{
        //watch the route in case it changes
        $route: 'updateId'
    }
}
</script>

<style scoped>

/* BELLE'S DEV */

.under-development{
    background-color:plum;
}


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Page layout ~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* WHOLE PAGE */

/* Component template */
.view-record{
    display:flex;
    flex-direction: column;
    margin:10rem;
}

/* Divider between top section and page details */
hr {
  border: 0;
  clear:both;
  display:block;
  width: 100%;               
  background-color:rgb(237,237,241);
  height: 2px;
}

/* Start over link */
a#start-over{
  margin-bottom:1rem;
  float:left;
}

/* Content above record details */
#top-bar{
    display:flex;
    flex-direction: column
}

/* All links */
a {
  color: #810002;
  text-decoration:none;
  border-bottom: 2px solid;
  border-color: #D2E0E8;
}

/* All links on hover */
a:hover{
  border-bottom: 4px solid;
  border-color: #D2E0E8;
}

a.schema-info{
    color: #2c3e50;
    border-bottom:0;
    font-size:.9rem;
}

p.context-notes{
    margin-bottom:0;
}

p.related-resource{
    margin-top:0;
    font-size: .9rem;
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



/* ~~~~~~~~~~~~~~~~~~~~~~~~ Metadata Content ~~~~~~~~~~~~~~~~~~~~~~~~ */

/* BASIC CONTENT */

#content{
    max-width:100%;
    overflow-wrap: break-word;
}

#basic-content-container{
    display:flex;
    flex-direction: row;
    margin-bottom: .5rem;
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

p#source{
    margin-top:.5rem;
}



/* MORE CONTENT SECTION */
/* data bio, constellation resources, data lifecycle */

#more-content-container{
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 .75rem;
}


/* GENEALOGY */

#genealogy-dropdown-content{
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap;
}

#genealogy-overview{
    margin-top:1rem;
}

#recipe-tree-container{
    display:flex;
    flex-direction:column;
}

#ingredients-container{
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-self: flex-start;
}

button{
    padding: .5rem;
    margin: .5rem;
    width: 250px;
    display: flex;
    flex-direction: column;
    font-family: hero-new, Avenir, Helvetica, Arial, sans-serif;
    color: rgb(31,31,75);
    text-align: left;
    overflow-wrap: break-word;
    background-color: white;
    border-style: solid;
    border-color:#054671;
    padding: 0 .75rem;
    border-width:.5rem;
    box-shadow: .25rem .25rem;
}

button:hover{
    cursor:pointer;
    background-color: rgb(239, 239, 239);
}
                               
#recipe-results{
    display:flex;
    justify-content: center;
    align-self:flex-start;
}

h3.card-title{
    font-size:1.2rem;
    margin-bottom:0;
}

h3#this-data-project{
    margin-bottom:0;
}

p.dataset-title{
    color: #810002;
    margin-bottom:0;
}

h3#processing-nod{
    margin-top:1.5rem;
}

p#processing-nod{
    margin-top:0;
}

</style>