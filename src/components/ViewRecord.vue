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
<!-- py-4 adds 1rem padding on the top and bottom -->
<section class="view-record py-4">

    <!-- 🧺 Main content container, if the metadata has loaded 🧺-->
    <!-- 🧺 This data flag is by default false & turned true via a successful async call 🧺  -->
    <div v-if="recordLoaded">

        <!-- ⬆️ Container to hold dataset header info ⬆️ -->
        <!-- Includes: title, recordType, and identifier  -->
        <div class="container is-fluid my-2">

            <!-- Dataset title -->
            <h2 class="title is-size-3">{{record.coreCitation.title}}</h2>

            <!-- container to hold tags -->
            <div class="mt-1">
                <!-- class that achieves the tag grouping -->
                <div class="field is-grouped is-grouped-multiline">

                    <!-- Dataset vs. Collection tag --> 
                    <!-- Calls function 'recordTypeIcon' to determine which icon to show -->
                    <div class="tag is-medium is-light mr-2">
                        <font-awesome-icon :icon="recordTypeIcon" class="mr-2"></font-awesome-icon> 
                        {{record.coreCitation.recordType}}
                    </div>

                    <!-- Record type, calls function 'recordTypeIcon' to determine which icon to show -->
                    <div class="tags has-addons">

                        <!-- ID label + icon -->
                        <div class="tag is-medium is-light">
                            <font-awesome-icon icon="anchor" class="mr-2"></font-awesome-icon>
                            Identifier
                        </div>

                        <!-- Record identifier -->
                        <div class="tag is-medium is-light is-info">
                            {{record.coreCitation.$id}}
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <!-- page divider -->
        <hr>
        <!-- Container to hold dataset brief description -->
        <div class="container is-fluid my-4">
            <div>
                <p class="is-family-secondary">{{record.coreCitation.briefDescription}}</p>
            </div>
        </div>
        <!-- page divider -->
        <hr>
        <!-- ⬆️ End of DATATSET HEADER content ⬆️  -->



        <!-- 🥇 MOST PROMINENTLY FEATURED SECTIONS CONTAINER  🥇 -->
        <!-- core citations + data endpoints sections-->
        <div class="container is-fluid">

            <!-- Holds the columns! -->
            <div class="columns">

                <!-- 👈 Left-hand column content 👈  -->
                <div class="column is-two-thirds">

                    <!-- 📇 CORE CITATION SECTION 📇 -->
                    <div class="panel is-primary">

                        <!-- Core Citation Header -->
                        <p class="panel-heading">
                            About this data
                        </p>

                        <!-- Core Citation Content -->
                        <!-- Each "panel block" is a field -->

                        <!-- Full Notes  -->
                        <div class="panel-block">
                            <div class="py-2">
                                <hideable-box title="Dataset overview" >
                                    {{record.coreCitation.fullNotes}}
                                </hideable-box>
                            </div>
                        </div>

                        <!-- Access Conditions  -->
                        <div class="panel-block">
                            <div class="py-2">
                            <h5>Access conditions</h5>
                            <p class="is-family-secondary">{{record.coreCitation.accessCondition}}</p>
                            </div>
                        </div>

                        <!-- Official Maintainer / Source -->
                        <div class="panel-block">
                            <div class="py-2">
                            <h5>Maintained by</h5>
                            <p class="is-family-secondary">{{record.dataLifecycle.maintenance.officialMaintainer}}</p>
                            </div>
                        </div>

                        <!-- Important = True  -->
                        <div class="panel-block">
                            <div class="py-2">
                            <h5>Important caveats</h5>
                            <span class="tag is-warning mr-2">🚧 under construction</span>
                            </div>
                        </div>

                        <!-- Suggested Entry Point = True -->
                        <div class="panel-block">
                            <div class="py-2">
                            <h5>Suggested places to start</h5>
                            <span class="tag is-warning mr-2">🚧 under construction</span>
                            </div>
                        </div>
                    </div>
                    <!-- 📇 End of Core Citation Section 📇 -->
                </div>
                <!-- end of 2/3 columns -->

                <!-- columns herein are 1/3 of page -->
                <div class="column is-one-third">

                    <!-- 🧮 DATA ENDPOINTS SECTION 🧮 -->
                    <div class="panel is-info" v-if="record.dataEndpoints">

                        <!-- Data Endpoints Heading -->
                        <p class="panel-heading">
                            Get this data
                        </p>

                        <!-- Iteratively creates panel blocks for each endpoint -->
                        <!-- Sorts them based on whether or not they are 'suggested'  -->
                        <div class="panel-block" v-for="endpoint in this.sortedEndpoints" v-bind:key="endpoint.$id">
                            
                            <!-- Little dataset file icon  -->
                            <div class="panel-icon"><font-awesome-icon icon="file-alt"></font-awesome-icon></div>
                            
                            <!-- Text for each endpoint  -->
                            <div class="endpoint-text">

                                <!-- Link with title label that navigates to the data  -->
                                <p class="is-size-5"><a :href="endpoint.accessURL">{{endpoint.title}}</a></p>

                                <!-- Host label -->
                                <p class="is-size-7 mt-1">{{endpoint.source}}</p>

                                <!-- tag for suggested endpoints -->
                                <div class="tag is-light is-success mt-2" v-if="endpoint.suggestedEntryPoint"><font-awesome-icon icon="smile" class="mr-2"></font-awesome-icon> Suggested</div>
                            </div>
                        </div>
                    </div>
                    <!-- 🧮 End of Data Endpoints Section 🧮 -->
                </div>
            </div>
        </div>
        <!-- 🥇 End of most prominently featured sections container 🥇 -->
        <!-- page divider --> 
        <hr>

        <!-- 🥈 ALL THE ONE-HALF PAGE ELEMENTS !!! (Secondary important info) !!! 🥈 -->
        <div class="container is-fluid">

            <!-- Holds the columns -->
            <div class="columns">

                <!-- 👈 Left-hand 1/2 columns content 👈  -->
                <div class="column is-half">

                    <!-- 🐛 DATA LIFECYCLE SECTION 🐛 -->
                    <div class="panel">
                        <!-- Data Lifecycle Header -->
                        <p class="panel-heading">
                            People Involved With This Data
                        </p>

                        <!-- Data Lifecycle Content  -->
                        <div class="panel-block" v-for="(firstLevelItem, firstLevelIndex) in record.dataLifecycle" :key="firstLevelIndex">
                            <!-- acquisiton field is necessary in the metadata because it speaks to where we obtained ingredients -->
                            <!-- but it needs to be skipped here because we display ingredients elsewhere -->
                            <!-- we can ameliorate in upcoming schema udpates -->
                            <div v-if="firstLevelIndex != 'acquisition'">
                                
                                <!-- Creates headings for all the resource sub-sections  -->
                                <hideable-box :title="getFieldAlias(firstLevelIndex)" :hidden="['maintenance','manipulation'].includes(firstLevelIndex)">
                                    
                                    <!-- Within the different categories, each item  -->
                                    <div v-for="(secondLevelItem, secondLevelIndex) in firstLevelItem" :key="secondLevelIndex">
                            

                                    <!-- Description -->
                                    <div v-if ="firstLevelIndex == 'description'">
                                        <div v-if="secondLevelIndex == 'contextProvider'">
                                            <h2 class="mt-3"><strong>{{getFieldAlias(secondLevelIndex)}}</strong></h2>
                                            <p>{{secondLevelItem.name}}, {{secondLevelItem.relationshipToData}}</p>
                                        </div>
                                        <div v-if="secondLevelIndex == 'contextOnBehalfOf'">
                                            <h2 class="mt-3"><strong>{{getFieldAlias(secondLevelIndex)}}</strong></h2>
                                            <p>{{secondLevelItem.name}}, {{secondLevelItem.relationshipToData}}</p>
                                        </div>
                                        <div v-if="secondLevelIndex == 'contextPublicationDate'">
                                            <h2 class="mt-3"><strong>{{getFieldAlias(secondLevelIndex)}}</strong></h2>
                                            <p>{{secondLevelItem}}</p>
                                        </div>
                                    </div>

                                    <!-- Maintenance -->
                                    <div v-if ="firstLevelIndex == 'maintenance'">
                                        <div >
                                            <h2 class="mt-3"><strong>{{getFieldAlias(secondLevelIndex)}}</strong></h2>
                                            <p>{{secondLevelItem}}</p>
                                        </div>
                                    </div>

                                    <!-- Manipulation -->
                                    <div v-if ="firstLevelIndex == 'manipulation'">

                                        <!-- Records -->
                                        <div v-if ="secondLevelIndex == 'records'">
                                            <div v-if="allRecords.length > 0">
                                                <h1 class="mt-3"><strong>Records</strong></h1>
                                                <div class = "resource-box p-3 my-2" v-for="(item, index) in allRecords" :key="index">
                                                    <p>Title: <strong>{{item.title}}</strong></p>
                                                    <p>Author: <strong>{{item.author}}</strong></p>
                                                    <p>Format: <a target = "_blank" :href="item.relatedResourceURL">{{item.format}}</a></p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Actors -->
                                        <div v-if ="secondLevelIndex == 'actors'">
                                            <div v-if="allActors.length > 0">
                                                <p class="mt-3"><strong>Actors</strong></p>
                                                <div class = "resource-box p-3 my-2" v-for="(item, index) in allActors" :key="index">
                                                    <p>{{humanReadableIndex(index)}}. <strong>{{item.name}}</strong></p>
                                                    <p>{{item.notes}}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Process -->
                                        <div v-if ="secondLevelIndex == 'process'">
                                            <h1 class="mt-3"><strong>Data Manipulation Takeaways</strong></h1>
                                            <div v-if="secondLevelItem.successes">
                                                <h2 class="mt-3"><strong>Successes</strong></h2>
                                                <p>{{secondLevelItem.successes}}</p>
                                            </div>

                                            <div v-if="secondLevelItem.challenges">
                                                <h2 class="mt-3"><strong>Challenges</strong></h2>
                                                <p>{{secondLevelItem.challenges}}</p>
                                            </div>

                                            <div v-if="secondLevelItem.sandtraps">
                                                <h2 class="mt-3"><strong>Challenges</strong></h2>
                                                <p>{{secondLevelItem.sandtraps}}</p>
                                            </div>

                                            <div  v-if="secondLevelItem.missingProcessingInformation">
                                                <h2 class="mt-3"><strong>Missing Information</strong></h2>
                                                <p>{{secondLevelItem.missingProcessingInformation}}</p>
                                            </div>
                                        </div>
                                    </div>

                                </hideable-box>
                            </div>
                        </div>
                    </div>
                    <!-- 🐛 End of Data Lifecycle Section 🐛 -->


                    <!-- 📖 DATA BIOGRAPHY SECTION 📖 -->
                    <div class="panel" v-if="record.dataBiography">
                        <!-- Data Biography Header -->
                        <p class="panel-heading">
                            Data Biography
                        </p>

                        <!-- Data Biography Content  -->
                        <div class="panel-block" v-for="(firstLevelItem, firstLevelIndex) in record.dataBiography" :key="firstLevelIndex">
                            <div>
                                <hideable-box :title="getFieldAlias(firstLevelIndex)" hidden>
                                    <!-- Within the different categories, each item  -->
                                    <div v-for="(secondLevelItem, secondLevelIndex) in firstLevelItem" :key="secondLevelIndex">
                                        <strong>{{getFieldAlias(secondLevelIndex)}}</strong>
                                        <ul>
                                            <li v-for="(item, index) in secondLevelItem" :key="index">
                                                {{item.notes}}
                                            </li>
                                        </ul>
                                    </div>
                                </hideable-box>
                            </div>
                        </div>

                    </div>
                    <!-- 📖 End of Data Biography Section 📖 -->
                </div>
                <!-- 👈 End of left-hand 1/2 columns content 👈  -->



                <!-- 👉 Right-hand 1/2 columns content 👉 -->
                <div class="column is-half">
                    
                    <!-- 🌌 RELATED RESOURCES SECTION 🌌 -->
                    <div class="panel" v-if="record.resourceConstellation">
                        <!-- Related Resources Heading -->
                        <p class="panel-heading">
                            Resources
                        </p>

                        <!-- Related Resources Content  -->
                        <div class="panel-block" v-for="(firstLevelItem, firstLevelIndex) in record.resourceConstellation" :key="firstLevelIndex">
                            <div class="p-2">

                            <!-- Creates panel headings for all the resource sub-sections  -->
                                <h6 class="is-size-6">{{getFieldAlias(firstLevelIndex)}}</h6>
                             <!-- Within the different categories, each item  -->
                            <div class="resource-box p-3 my-2" v-for="(secondLevelItem, secondLevelIndex) in firstLevelItem" :key="secondLevelIndex">
                                 <!-- Every resource has a title -->
                                <p class="is-size-6"><a target="_blank" :href="secondLevelItem.$id">{{secondLevelItem.title}}</a></p>
                                 <!-- Unique author + publication date display for tutorials -->
                                <span class="is-family-secondary" v-if="firstLevelIndex =='tutorials'">
                                    <p v-if="secondLevelItem.author || secondLevelItem.datePublished">{{secondLevelItem.author}}, {{secondLevelItem.datePublished.substring(0,4)}}</p>
                                    <p></p>
                                </span>
                                 <!-- Unique author, publisher + date display for published works  -->
                                <span class="is-family-secondary" v-if="firstLevelIndex =='publishedWorks'">
                                    <p>{{secondLevelItem.author}}, {{secondLevelItem.publisher}}, {{secondLevelItem.datePublished.substring(0,4)}}.</p>
                                </span>
                                 <!-- Only codebooks have maintainedBy  -->
                                <span class="is-family-secondary" v-if="firstLevelIndex =='codebooks'">
                                    <p>{{secondLevelItem.maintainedBy}}</p>
                                </span>
                                 <!-- Every resource has notes  -->
                                <p class="is-family-secondary">{{secondLevelItem.notes}}</p>
                            </div>
                            </div>
                        </div>
                        
                    </div>
                    <!-- 🌌 End of Related Resources Section 🌌 -->


                    <!-- 🥣 DATA RECIPE SECTION 🥣 -->
                    <div class="panel">

                        <!-- Data Recipe Heading -->
                        <p class="panel-heading">
                            Recipe
                        </p>
                        
                        <!-- DATA RECIPE Content -->
                        <!-- Brief Genealogy Description -->
                        <div class="panel-block">
                            <div class="py-2">
                                <hideable-box title="What are ingredients and recipes?" hidden>
                                    <span class="tag is-warning mr-2">🚧 under construction</span>
                                </hideable-box>
                            </div>
                        </div>

                        <!-- Brief Genealogy Description -->
                        <div class="panel-block">
                            <div class="py-2">
                                <hideable-box title="Recipe overview">
                                    {{record.coreCitation.briefGenealogy}}
                                </hideable-box>
                            </div>
                        </div>

                        <div class="panel-block" v-if="allIngredients.length > 0">
                            <div class="py-2">
                                <hideable-box title="Ingredients" hidden>
                                    <div class="resource-box p-3 mb-2" v-for="ingredient in allIngredients" :key="ingredient.$id">
                                    <!-- Title lable with link to the ingredient  -->
                                    <p class="is-size-6"><router-link :to="'/catalog/' + ingredient.arkID">{{ingredient.title}}</router-link></p>
                                    <!-- Ingredient ID + ID anchor icon -->
                                    <div class="tags has-addons my-1"><span class="tag"><font-awesome-icon icon="anchor" class="mr-2"></font-awesome-icon>Identifier</span><span class="tag is-info is-light">{{ingredient.$id}}</span></div>
                                    <!-- Ingredient processing notes -->
                                    <p class="is-family-secondary">{{ingredient.notes}}</p>
                                </div>
                                </hideable-box>
                            </div>
                        </div>
                    </div>
                    <!-- 🥣 End of Data Recipe section 🥣-->

                </div>
                <!-- 👉 End of right-hand 1/2 columns content 👉 -->     
            </div> 
        </div>
        <!-- 🥈 End of the one-half page elements, secondary sections container 🥈 -->

    </div>
    <!-- 🧺 End of main content bucket 🧺 -->

    <!-- ❌ Error message, if the metadata does not load ❌ -->
    <div v-else>
        This record was not loaded.
    </div>
    <!-- ❌ Fin ❌ -->


</section>
</template>

<script>
import axios from 'axios'
import HideableBox from './HideableBox.vue'

export default {
    name: "ViewRecord",
    components: {
       HideableBox
    },
    data (){
        return {
            //set to true from the async data grab
            recordLoaded: false, 
            //variable to store the watched route in case it changes
            recordId: this.$route.params.record_id,
            //place to store source metadata JSON
            record: [],
            //place to store the field aliases
            aliases: [],
            //place to store attributes pulled from ingredient datasets
            allIngredients: [],
            //place to store info about READMEs
            allRecords: [],
            //place to store info about actors
            allActors: []
        }
    },

    computed: {
        // Helper function to map record types onto FA icons. 
        recordTypeIcon: function() { 
            try{
                if(this.record.coreCitation.recordType === 'Dataset') { return "server"; }
                else if(this.record.coreCitation.recordType === 'Collection') { return "shapes"; }
                else { return "asterisk" }
            }
            catch(e) {
                return "asterisk"
            }
        },
        // Garrett can you comment this
        // somehow orders the endpoints based on if there is a suggested entrypoint
        sortedEndpoints: function() {
            if(this.record.dataEndpoints) {
                return this.record.dataEndpoints.sort((b,a) => {  return (typeof a.suggestedEntryPoint === "undefined" ? false : a.suggestedEntryPoint) - (typeof b.suggestedEntryPoint === "undefined" ? false : b.suggestedEntryPoint) ; })
            } else {
                return null;
            }
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
        //display human readable indices
        humanReadableIndex(inputIndex){
            var index = parseInt(inputIndex, 10)
            var index = index + 1
            return index
        },
        //function to push ingredient attributes to a Vue data object
        getAllIngredients (){
            //if there are no ingredients do nothing
            var dataLifecycle = this.record.dataLifecycle
            if (!('acquisition' in dataLifecycle)){
                
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
                    //add the id, title, processing notes to the new data object
                    ingredientProps = {"$id": ingredients[i].$id, "arkID": splitURI, "notes": ingredients[i].notes, "title": ""}
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

        },
        //function to push README records + info to a Vue data object
        getAllRecords(){
            //if there are records, get them
            if (this.record.dataLifecycle.manipulation.records[0].relatedResourceURL){
                var records = this.record.dataLifecycle.manipulation.records
                for (let i = 0; i < records.length; i ++){
                    var recordProps = {}
                    recordProps = {"format": records[i].format, "relatedResourceURL": records[i].relatedResourceURL, "author": records[i].author, "title": records[i].title}
                    this.allRecords.push(recordProps)
                }
            }
        },
        getAllActors(){
            //if there are actors, get them
            if (this.record.dataLifecycle.manipulation.actors[0].name){
                console.log("there ARE actors")
                var actors = this.record.dataLifecycle.manipulation.actors
                for (let i = 0; i < actors.length; i ++){
                    var actorProps = {}
                    actorProps = {"name": actors[i].name, "notes": actors[i].notes}
                    this.allActors.push(actorProps)
                }
            }
        }
    },
    mounted() {
        //get the source metadata
        axios.get("https://raw.githubusercontent.com/nblmc/metadata/main/" + this.recordId + ".json")
            .then(response => {
                //add it to the Vue data
                this.record = response.data
                this.recordLoaded = true;
                //run the function to get all the ingredients, too
                this.getAllIngredients()
                this.getAllRecords()
                this.getAllActors()
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

.resource-box {
    border: 2px solid #f0f0f0;
    border-radius: 3px;
}

</style>