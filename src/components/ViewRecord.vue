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
            <div id = "genealogy">
                <h2>Data Genealogy</h2>


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
            record: []
        }
    },
    methods: {
        printStuff (){
            console.log(this.record)
        },
        updateId(){
            this.recordId = this.$route.params.record_id
        }
    },
    created() {
        //returns a promise
        axios.get("https://raw.githubusercontent.com/nblmc/metadata/main/" + this.recordId + ".json")
            .then(response => {
                this.record = response.data
            }).catch(err => {
                console.log(err)
            })
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



</style>