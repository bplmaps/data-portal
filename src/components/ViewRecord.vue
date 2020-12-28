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
<section class="view-record py-4">
    <div v-if="recordLoaded">
    <div class="container is-fluid my-2">
        <h2 class="title is-size-3">{{record.coreCitation.title}}</h2>
        <div class="mt-1">
            <div class="field is-grouped is-grouped-multiline">
                <div class="tag is-medium is-light mr-2"><font-awesome-icon :icon="recordTypeIcon" class="mr-2"></font-awesome-icon> {{record.coreCitation.recordType}}</div><div class="tags has-addons"><div class="tag is-medium is-light"><font-awesome-icon icon="anchor" class="mr-2"></font-awesome-icon>Identifier</div><div class="tag is-medium is-light is-info">{{record.coreCitation.$id}}</div></div>
            </div>
        </div>

    </div>

    <hr>

    <div class="container is-fluid my-4">
        <div>
            <p class="is-family-secondary">{{record.coreCitation.shortDataDescription}}</p>
        </div>
    </div>

    <hr>

    <div class="container is-fluid">
        <div class="columns">
            <div class="column is-two-thirds">
                <div class="panel is-primary">
                    <p class="panel-heading">
                        About this data
                    </p>
                    <div class="panel-block">
                        <div class="py-2">
                        <h5>Access conditions</h5>
                        <p class="is-family-secondary">{{record.coreCitation.accessCondition}}</p>
                        </div>
                    </div>

                    <div class="panel-block">
                        <div class="py-2">
                        <h5>Maintained by</h5>
                        <p class="is-family-secondary">{{record.dataLifecycle.maintenance.officialMaintainer}}</p>
                        </div>
                    </div>

                    <div class="panel-block">
                        <div class="py-2">
                        <h5>Important caveats</h5>
                        <p class="is-family-secondary"></p>
                        </div>
                    </div>

                </div>
            </div>
            <div class="column is-one-third">
                <div class="panel is-info">
                    <p class="panel-heading">
                        Get this data
                    </p>
                    <div class="panel-block" v-for="endpoint in this.sortedEndpoints" v-bind:key="endpoint.$id">
                        <div class="panel-icon"><font-awesome-icon icon="file-alt"></font-awesome-icon></div>
                        <div class="endpoint-text">
                            <p><a :href="endpoint.accessURL">{{endpoint.format}}</a></p>
                            <p class="is-size-7 mt-1">{{endpoint.source}}</p>
                            <div class="tag is-light is-success" v-if="endpoint.suggestedEntryPoint"><font-awesome-icon icon="smile" class="mr-2"></font-awesome-icon> Suggested</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <hr>

    <div class="container is-fluid my-4">
        <div class="columns">
        
        <div class="column is-one-half">
            <div class="panel is-secondary">
                <p class="panel-heading">
                    Genealogy
                </p>
                <div class="panel-block" v-if="record.dataLifecycle.acquisition && record.dataLifecycle.acquisition.ingredients">
                    <div class="py-3">
                        <h6>Created from</h6>
                        <ul>
                            <li v-for="ingredient in record.dataLifecycle.acquisition.ingredients" :key="ingredient.$id">{{ingredient.$id}}</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>

        <div class="column is-one-half">
            <div class="panel is-secondary">
                <p class="panel-heading">
                    Related Resources
                </p>
                <div class="panel-block" v-if="record.resourceConstellation.publishedWorks">
                    <div class="py-3">
                        <h6>Published Works</h6>
                        <ul class="is-family-secondary">
                            <li v-for="work in record.resourceConstellation.publishedWorks" :key="work.title">{{work.title}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        </div>
    </div>


    <div v-if="!recordLoaded">
        This record was not loaded.
    </div>
        
</section>
</template>

<script>
import axios from 'axios'

export default {
    name: "ViewRecord",
    data (){
        return {
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
        recordTypeIcon: function() { 
            // Helper function to map record types onto FA icons. 
            try{
            if(this.record.coreCitation.recordType === 'Dataset') { return "server"; }
            else if(this.record.coreCitation.recordType === 'Collection') { return "shapes"; }
            else { return "asterisk" }
            }
            catch(e) {
                return "asterisk"
            }
        },
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

/* BELLE'S DEV */

.under-development{
    background-color:plum;
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