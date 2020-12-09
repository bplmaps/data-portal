<template>
    <div class="view-record">
        <div id = "top-bar">
            <div id ="link-container">
                <router-link to="/" id="start-over">Start over ↩️</router-link>
            </div>
            <div id = "title-container" v-if="this.record.coreCitation">
                <h1>{{this.record.coreCitation.title}}</h1>
            </div>
        </div>
        <hr class="solid">
        <div id = "content-container">
            <div class = "left">
                <div v-if="this.record.coreCitation" id="coreCitation">
                    <h2>Core Citation</h2>
                    <p>id: <strong>{{this.record.coreCitation.$id}}</strong></p>
                    <p>Collection or dataset: <strong>{{this.record.coreCitation.recordType}}</strong></p>
                    <details>
                        <summary class = "little-more-details">Dataset overview</summary>
                        <p> {{this.record.coreCitation.shortDataDescription}}</p>
                    </details>
                    <details>
                        <summary class = "little-more-details">Genealogy overview</summary>
                        <p> {{this.record.coreCitation.shortGenealogyDescription}}</p>
                    </details>
                    <p>Access Condition: <strong>{{this.record.coreCitation.accessCondition}}</strong></p>

                </div>
                <div id="important">
                    <h2>Important Context</h2>
                    <ul>
                        <li>field: <strong>important context example</strong></li>
                        <li>tutorial: <a href = "www.youtube.com">Join Census Data to Shapefiles</a></li>
                    </ul>
                    
                </div>
            </div>
            <div class = "right">
                <div v-if="this.record.dataEndpoints" id ="dataEndpoints">
                    <p>
                        {{this.record.dataEndpoints}}
                    </p>
                </div>
            </div>
        </div>
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
            <div v-if="this.record.dataLifecycle.acquisition" id = "genealogy-composite">
                <h2 id="genealogy">Data Genealogy</h2>
                <details>
                <summary>Learn more about how this data came to be</summary>
                <div id = "card-container">
                    <p>Oftentimes, people working on data projects combine together other datasets to create new ones that work better for their own purposes. This can involve joining datasets together, keeping or removing certain aspects of the data, or running mathematical computations to create new values.</p>
                    <p>In this case, someone used this ingredient data:</p>
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
        // this.getAllIngredients()

    },
    watch:{
        $route: 'updateId'
    }
}
</script>

<style scoped>


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


#content-container{
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