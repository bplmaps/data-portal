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

    <!-- Content to show if the metadata record has loaded -->
    <!-- This data flag is by default false & turned true via a successful async call  -->
    <div v-if="recordLoaded">

        <!-- Container to hold dataset header info -->
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

        <!-- Container for Core Citation and Data Endpoints -->
        <div class="container is-fluid">

            <!-- Divides the page into two columns -->
            <div class="columns">

                <!-- Core Citation Column -->
                <div class="column is-two-thirds">

                    <!-- CORE CITATION PANEL-->
                    <div class="panel is-primary">

                        <!-- Core Citation Header -->
                        <p class="panel-heading">
                            About this data
                        </p>

                        <!-- Core Citation Content -->
                        <!-- Each "panel block" is a coreCitation field -->

                        <!-- Full Notes Panel Block -->
                        <div class="panel-block">
                            <div class="py-2">
                                <hideable-box title="Dataset overview" hidden>
                                    {{record.coreCitation.fullNotes}}
                                </hideable-box>
                            </div>
                        </div>

                        <!-- Access Conditions Panel Block -->
                        <div class="panel-block">
                            <div class="py-2">
                            <h5>Access conditions</h5>
                            <p class="is-family-secondary">{{record.coreCitation.accessCondition}}</p>
                            </div>
                        </div>

                        <!-- Source Panel Block -->
                        <div class="panel-block">
                            <div class="py-2">
                            <h5>Maintained by</h5>
                            <p class="is-family-secondary">{{record.dataLifecycle.maintenance.officialMaintainer}}</p>
                            </div>
                        </div>

                        <!-- Important = True Panel Block -->
                        <div class="panel-block">
                            <div class="py-2">
                            <h5>Important caveats</h5>
                            <span class="tag is-warning mr-2">🚧 under construction</span>
                            </div>
                        </div>

                        <!-- Suggested Entry Point = True Panel Block -->
                        <div class="panel-block">
                            <div class="py-2">
                            <h5>Suggested places to start</h5>
                            <span class="tag is-warning mr-2">🚧 under construction</span>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- End of Core Citation -->


                <!-- Data Endpoints Column -->
                <div class="column is-one-third">

                    <!-- DATA ENDPOINTS PANEL -->
                    <div class="panel is-info">

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
                                <p><a :href="endpoint.accessURL">{{endpoint.title}}</a></p>

                                <!-- Host label -->
                                <p class="is-size-7 mt-1">{{endpoint.source}}</p>

                                <!-- tag for suggested endpoints -->
                                <div class="tag is-light is-success" v-if="endpoint.suggestedEntryPoint"><font-awesome-icon icon="smile" class="mr-2"></font-awesome-icon> Suggested</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End of Data Endpoints -->

            </div>
        </div>
        <!-- End of Container for Core Citation and Data Endpoints -->
        <!-- page divider -->
        <hr>

        <!-- Container for Data Biography and Related Resources -->
        <div class="container is-fluid">

            <!-- Divides the page into two columns -->
            <div class="columns">

                <!-- Data Biography Column -->
                <div class="column is-two-thirds">

                    <!-- DATA BIOGRAPHY PANEL-->
                    <div class="panel">

                        <!-- Data Biography Header -->
                        <p class="panel-heading">
                            Biography
                        </p>

                        <!-- Data Biography Content -->
                        <div class = "panel-block">
                            <span class="tag is-warning mr-2">🚧 under construction</span>
                        </div>

                    </div>
                </div>
                <!-- End of Data Biography Section -->


                <!-- Related Resources Column -->
                <div class="column is-one-third">

                    <!-- RELATED RESOURCES PANEL -->
                    <div class="panel">

                        <!-- Related Resources Heading -->
                        <p class="panel-heading">
                            Related Resources
                        </p>
                        
                        <!-- Related Resources Content -->
                        <div class = "panel-block">
                            <span class="tag is-warning mr-2">🚧 under construction</span>
                        </div>

                    </div>
                </div>
                <!-- End of Related Resources -->

            </div>
        </div>
        <!-- End of Container for Data Biography and Related Resources -->
        <!-- page divider -->
        <hr>


        <!-- Container for Data Lifecycle and Data Recipe -->
        <div class="container is-fluid">

            <!-- Divides the page into two columns -->
            <div class="columns">

                <!-- Data Lifecycle Column -->
                <div class="column is-two-thirds">

                    <!-- DATA LIFECYCLE PANEL-->
                    <div class="panel">

                        <!-- Data Biography Header -->
                        <p class="panel-heading">
                            Lifecycle
                        </p>

                        <!-- Data Lifecycle Content -->
                        <div class = "panel-block">
                            <span class="tag is-warning mr-2">🚧 under construction</span>
                        </div>

                    </div>
                </div>
                <!-- End of Data Lifecycle Section -->


                <!-- Data Recipe Column -->
                <div class="column is-one-third">

                    <!-- DATA RECIPE PANEL -->
                    <div class="panel">

                        <!-- Related Resources Heading -->
                        <p class="panel-heading">
                            Data Recipe
                        </p>
                        
                        <!-- Data Recipe Content -->

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
                                <hideable-box title="Recipe overview" hidden>
                                    {{record.coreCitation.briefGenealogy}}
                                </hideable-box>
                            </div>
                        </div>

                        <p class="panel-heading">
                            Ingredients
                        </p>

                        <!-- Ingredients panel block if there are ingredients -->
                        <div class="panel-block" v-if="allIngredients.length > 0">



                            <!-- Ingredient box container -->
                            <div class="py-3">
                                <!-- Create a new box for each ingredient -->
                                <div class="ingredient-box p-3 mb-2" v-for="ingredient in allIngredients" :key="ingredient.$id">
                                    
                                    <!-- Title lable with link to the ingredient  -->
                                    <p class="is-size-6"><router-link :to="'/catalog/' + ingredient.arkID">{{ingredient.title}}</router-link></p>
                                    
                                    <!-- Ingredient ID + ID anchor icon -->
                                    <div class="tags has-addons my-1"><span class="tag"><font-awesome-icon icon="anchor" class="mr-2"></font-awesome-icon>Identifier</span><span class="tag is-info is-light">{{ingredient.$id}}</span></div>
                                    
                                    <!-- Ingredient processing notes -->
                                    <p class="is-family-secondary">{{ingredient.notes}}</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <!-- End of Data Recipe -->

            </div>
        </div>
        <!-- End of Container for Data Biography and Related Resources -->
        <!-- page divider -->
        <hr>

    </div>

    <!-- Error message, if the metadata does not load -->
    <div v-else>
        This record was not loaded.
    </div>


    <!-- 🌀 BELLE TEMPORARY DEV ONLY 🌀 -->
    <h1>BELLE DEV NOTES</h1>
    <hr>

    <div>
        <h1>CORE CITATION</h1>
        <p>{{record.coreCitation}}</p>
        <hr>

        <h1>ENDPOINTS</h1>
        <p v-if="record.dataEndpoints">{{record.dataEndpoints}}</p>
        <p v-else>No endpoints</p>
        <hr>

        <h1>BIOGRAPHY</h1>
        <p v-if="record.dataBiography">{{record.dataBiography}}</p>
        <p v-else>No biography</p>
        <hr>

        <h1>DATA LIFECYCLE</h1>
        <p>{{record.dataLifecycle}}</p>
        <hr>

        <h1>INGREDIENTS</h1>
        <div class="panel-block" v-if="allIngredients.length === 0">
            No ingredients
        </div>
        <div class="panel-block" v-else>
            {{allIngredients}}
        </div>
        <hr>

        <h1>RELATED RESOURCES</h1>
        <p v-if="record.resourceConstellation">{{record.resourceConstellation}}</p>
        <p v-else>No extra resources</p>
        <hr>
        
    </div>
    <!-- 🌀 END BELLE DEV 🌀 -->
        

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
            allIngredients: []
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

.ingredient-box {
    border: 2px solid #f0f0f0;
    border-radius: 3px;
}

</style>