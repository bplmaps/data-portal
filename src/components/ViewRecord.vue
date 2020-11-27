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
        <div id = "content">{{this.record}}</div>
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
     margin-right: 15rem;
    margin-left: 15rem;
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



</style>