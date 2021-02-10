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

                    <div class="tags has-addons">

                        <!-- ID label + icon -->
                        <div class="tag is-medium is-light">
                            <font-awesome-icon icon="anchor" class="mr-2"></font-awesome-icon>
                            Identifier
                        </div>

                        <!-- Record identifier -->
                        <div class="tag is-medium is-light is-info mr-2">
                            {{record.coreCitation.$id}}
                        </div>

                        <!-- Published label + icon -->
                        <div class="tag is-medium is-light" v-if = "record.subjectTagging.temporal.temporalPublication" >
                            <font-awesome-icon icon="clock" class="mr-2"></font-awesome-icon>
                            Published
                        </div>

                        <!-- Record identifier -->
                        <div v-if = "record.subjectTagging.temporal.temporalPublication" class="tag is-medium is-light is-info">
                            {{record.subjectTagging.temporal.temporalPublication.singularExpressionValue}}
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
                                <div class = "markdown px-2 py-2">
                                    <h5>Dataset Overview</h5>
                                    <markdown-part :source-markdown="record.coreCitation.fullNotes"></markdown-part>
                                </div>
                            </div>
                        </div>

                        <!-- Important Attributes -->
                        <div v-if="record.coreCitation.importantAttributes" class="panel-block">
                            <div class="py-2">
                                <h5 class="mb-2">Key Attributes</h5>
                                <div class="container is-fluid px-0">
                                    <div class="field is-grouped is-grouped-multiline">
                                        <div v-for="(item, index) in record.coreCitation.importantAttributes" :key="index">
                                            <div class="is-family-secondary tag is-medium is-light mx-2 my-2">{{item}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Geometry -->
                        <div v-if="record.coreCitation.includesDataTypes" class="panel-block">
                            <div class="py-2">
                            <h5>Geometry</h5>
                            <div class = "content my-0 py-0" v-for="(item, index) in record.coreCitation.includesDataTypes" :key="index">
                                <p class="is-family-secondary">{{item}}</p>
                            </div>
                            </div>
                        </div>

                        <!-- Time Period  -->
                        <div class="panel-block" v-if="record.subjectTagging.temporal.temporalRepresentation">
                            <div class="py-2">
                                <h5>Time Period</h5>
                                <div v-if="record.subjectTagging.temporal.temporalRepresentation.temporalType == 'singularExpression'">
                                    <p class="is-family-secondary">{{record.subjectTagging.temporal.temporalRepresentation.singularExpressionValue}}</p>
                                </div>
                                <div v-if="record.subjectTagging.temporal.temporalRepresentation.temporalType == 'temporalRange'">
                                    <p class="is-family-secondary">{{record.subjectTagging.temporal.temporalRepresentation.startRangeValue}} - {{record.subjectTagging.temporal.temporalRepresentation.endRangeValue}}</p>
                                </div>
                            </div>
                        </div>


                        <!-- Official Maintainer / Source -->
                        <div class="panel-block">
                            <div class="py-2">
                            <h5>Maintained by</h5>
                            <p class="is-family-secondary">{{record.dataLifecycle.maintenance.officialMaintainer}}</p>
                            </div>
                        </div>

                        <!-- Access Conditions  -->
                        <div class="panel-block">
                            <div class="py-2">
                            <h5>Access conditions</h5>
                            <p class="is-family-secondary">{{record.coreCitation.accessCondition}}</p>
                            </div>
                        </div>

                        <!-- Suggested Entry Point = True -->
                        <!-- <div class="panel-block">
                            <div class="py-2">
                                <h5 class="mb-3">Suggested places to start</h5>
                            
                                <div v-if ="allSuggested" class = "content">
                                    <div class = "is-family-secondary" v-for="(item, index) in allSuggested" :key="index">
                                        <div>
                                            <strong> <a  :href="item.link">{{item.title}}</a></strong>  <p class="tag mr-2">{{item.type}} </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div> -->
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
                                <!-- was incorrectly printing for all, regardless of flag status, address when returning to flags work -->
                                <!-- <div class="tag is-light is-success mt-2" v-if="endpoint.suggestedEntryPoint"><font-awesome-icon icon="smile" class="mr-2"></font-awesome-icon> Suggested</div> -->
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
        <div class="container is-fluid pb-4">

            <!-- Holds the columns -->
            <div class="columns">

                <!-- 👈 Left-hand 1/2 columns content 👈  -->
                <div class="column is-half">

                    <!-- 🐛 DATA LIFECYCLE SECTION 🐛 -->
                    <div class="panel">
                        <!-- Data Lifecycle Header -->
                        <p class="panel-heading">
                            <font-awesome-icon icon="user-check" class="mr-2"></font-awesome-icon>People Involved in the Data Lifecycle
                        </p>

                        <!-- Description  -->
                        <div class="panel-block">
                            <div class="py-2" v-if="record.dataLifecycle.description">
                                    <div v-if="record.dataLifecycle.description.contextProvider">
                                        <h5>Describing</h5>
                                        <div class="content">
                                            <p class= "is-family-secondary mt-1" >
                                               <strong>Context Provider:</strong> The name of the person who wrote this metadata is
                                                    {{record.dataLifecycle.description.contextProvider.name}}. They are the Data {{record.dataLifecycle.description.contextProvider.relationshipToData}}.
                                            </p>
                                        </div>
                                        <h5>Maintaining</h5>
                                        <div class="content">
                                            <div class= "is-family-secondary mt-1" >
                                                <p class="my-1"><strong>Maintainer: </strong>The organization responsible for maintaining this dataset is {{record.dataLifecycle.maintenance.officialMaintainer}}. </p>
                                                <p class="my-1" v-if="record.dataLifecycle.maintenance.maintenanceFrequency">
                                                <strong>Maintenance Frequency:</strong> {{record.dataLifecycle.maintenance.maintenanceFrequency}}.</p>
                                               
                                            </div>
                                        </div>
                                        <h5 v-if="record.dataLifecycle.description.contextOnBehalfOf">Processing</h5>
                                        <div class="content" v-if="record.dataLifecycle.description.contextOnBehalfOf">
                                            <div class= "is-family-secondary mt-1" >
                                                 <strong>Processor:</strong> {{record.dataLifecycle.description.contextOnBehalfOf.name}} is the Data {{record.dataLifecycle.description.contextOnBehalfOf.relationshipToData}}.
                                                <div class = "content" v-if="record.dataLifecycle.processing.choices">
                                                   <p v-for="(item, index) in record.dataLifecycle.processing.choices" :key="index" class="mt-1"><strong>Processor's Record:</strong> {{item.author}} recorded their thoughts and choices in their own words as a {{item.format}}: <a target="_blank" :href="item.relatedResourceURL">{{item.title}}.</a>
                                                   </p> 
                                                </div>
                                                <div class = "content" v-if="record.dataLifecycle.processing.tools">
                                                   <p class="mt-1" v-for="(item, index) in record.dataLifecycle.processing.tools" :key="index"> <strong>Processor's Record:</strong> {{item.author}} shared the <a target="_blank" :href="item.relatedResourceURL">{{item.format}}</a> they created to process this data.
                                                   </p> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>

                        
                    </div>
                    <!-- 🐛 End of Data Lifecycle Section 🐛 -->


                    <!-- 📖 DATA BIOGRAPHY SECTION 📖 -->
                    <div class="panel" v-if="record.dataBiography">
                        <!-- Data Biography Header -->
                        <p class="panel-heading"> 
                            Can You Trust This Data?
                        </p>

                        <!-- Data Biography Content  -->
                        <div class="panel-block" v-if="record.dataBiography">
                             <div class= "is-flex is-flex-direction-column ">
                                <section class="section is-small py-0">
                                    <hideable-box class = "is-family-secondary mt-5" title="Did the data collectors or project designers consider the voices of those who are most likely to be impacted by the dataset?" hidden>
                                        <markdown-part class="mx-2 mt-5 mb-4" :source-markdown="record.dataBiography.representation.healthCheckQualifier"></markdown-part>
                                    </hideable-box> 
                                    <hr>
                                </section>
                                <section class="section is-small py-0">
                                    <hideable-box class = "is-family-secondary mt-5" title="Are the data publishers committed to relationships of trust with the public, and if so, how?" hidden>
                                        <markdown-part class="mx-2 mt-5 mb-4" :source-markdown="record.dataBiography.publicResponsibility.healthCheckQualifier"></markdown-part>
                                    </hideable-box> 
                                    <hr>
                                </section>
                                <section class="section is-small py-0">
                                    <hideable-box class = "is-family-secondary mt-5" title="What actions have the data creators taken to avoid the perpetuation of systemic injustice or the repeat of past harms?" hidden>
                                        <markdown-part class="mx-2 mt-5 mb-4" :source-markdown="record.dataBiography.historicContext.healthCheckQualifier"></markdown-part>
                                    </hideable-box> 
                                    <hr>
                                </section>
                                <section class="section is-small py-0">
                                    <hideable-box class = "is-family-secondary mt-5" title="Can we fully understand the processes and methodologies by which the data was funded, collected and analyzed?" hidden>
                                        <markdown-part class="mx-2 mt-5 mb-4" :source-markdown="record.dataBiography.methodology.healthCheckQualifier"></markdown-part>
                                    </hideable-box> 
                                    <hr>
                                </section>
                                <section class="section is-small py-0">
                                    <hideable-box class = "is-family-secondary mt-5 mb-5" title="Can we understand the potential future impact of this dataset, including what it should and should not be used to show?" hidden>
                                        <markdown-part class="mx-2 mt-5 mb-4" :source-markdown="record.dataBiography.potentialImpact.healthCheckQualifier"></markdown-part>
                                    </hideable-box> 
                                </section>
                                

                            </div> 
                        </div>

                        <div class ="panel-block" v-if="record.dataBiography">
                            <div>
                                <h5 class="mt-1 ml-1">How we evaluate documentation health</h5>
                                <div class = "content is-family-secondary mx-1 my-2">
                                    <p>
                                        This dataset's documentation health was evaluated by: <strong> {{record.dataLifecycle.description.contextProvider.name}}, LMEC's Data {{record.dataLifecycle.description.contextProvider.relationshipToData}}</strong>.
                                    </p>
                                    <p>
                                    To learn more about our documentation health check evaluations, you can visit our <a href="https://geoservices.leventhalmap.org/cartinal/documentation/schema/healthcheck.html" target="_blank"><strong>Health Score Checklist</strong></a>.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- 📖 End of Data Biography Section 📖 -->

                    
                    
                    <!-- TAKEAWAYS -->
                    <!-- <div class="panel" v-if="allMissing.length > 0 ">
                        <!-- Missing context header -->
                        <!-- <p class="panel-heading">
                            Missing Information
                        </p>

                        <div class= "panel-block is-family-secondary">
                            <p>Information that would have been helpful for better understanding this dataset which is not prominently featured or easily discoverable by the maintainter's official documentation</p>
                        </div> -->

                        <!-- Missing Content -->
                        <!-- <div class="panel-block is-family-secondary" v-for="(item, index) in allMissing" :key="index">                               
                                <ul>
                                    <li><a target="_blank" :href="'https://geoservices.leventhalmap.org/cartinal/documentation/schema/' + item.property +'.html' "  ><strong>{{getFieldAlias(item.property)}}  </strong></a></li>
                                </ul>
                        </div>

                    </div> --> 



                    <!-- 🤷🏻‍♀️ MISSING CONTEXT SECTION 🤷🏻‍♀️ -->
                    <!-- <div class="panel" v-if="allMissing.length > 0 "> -->
                        <!-- Missing context header -->
                        <!-- <p class="panel-heading">
                            Missing Information
                        </p>
                        <div class= "panel-block is-family-secondary">
                            <p>Information that would have been helpful for better understanding this dataset which is not prominently featured or easily discoverable by the maintainter's official documentation</p>
                        </div> -->
                        <!-- Missing Content -->
                        <!-- <div class="panel-block is-family-secondary" v-for="(item, index) in allMissing" :key="index">                               
                                <ul>
                                    <li><a target="_blank" :href="'https://geoservices.leventhalmap.org/cartinal/documentation/schema/' + item.property +'.html' "  ><strong>{{getFieldAlias(item.property)}}  </strong></a></li>
                                </ul>
                        </div>
                    </div> -->
                    <!-- 🤷🏻‍♀️ End of missing context section 🤷🏻‍♀️ -->
                </div> 
                <!-- 👈 End of left-hand 1/2 columns content 👈  -->



                <!-- 👉 Right-hand 1/2 columns content 👉 -->
                <div class="column is-half">
                    
                    <!-- 🌌 RELATED RESOURCES SECTION 🌌 -->
                    <div class="panel" v-if="record.resourceConstellation">
                        <!-- Related Resources Heading -->
                        <p class="panel-heading">
                            Related Resources
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
                                <span class="is-family-secondary" v-if="firstLevelIndex =='documentation'">
                                    <p v-if="secondLevelItem.maintainedBy">{{secondLevelItem.maintainedBy}}</p>
                                    <p></p>
                                </span>
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
                    <div class="panel" v-if="allIngredients.length > 0">

                        <!-- Data Recipe Heading -->
                        <p class="panel-heading">
                            Data Genealogy
                        </p>
                        
                        <!-- DATA RECIPE Content -->

                        <div class="panel-block" v-if="allIngredients.length > 0">
                            <div class="py-2">
                                <h5 class = "my-2 mx-2">Source Datasets</h5>
                                <div class="resource-box p-3 mb-2 my-2" v-for="ingredient in allIngredients" :key="ingredient.$id">
                                    <!-- Title lable with link to the ingredient  -->
                                    <p class="is-size-6"><router-link :to="'/catalog/' + ingredient.arkID">{{ingredient.title}}</router-link></p>
                                    <!-- Ingredient ID + ID anchor icon -->
                                    <div class="tags has-addons my-1"><span class="tag"><font-awesome-icon icon="anchor" class="mr-2"></font-awesome-icon>Identifier</span><span class="tag is-info is-light">{{ingredient.$id}}</span></div>
                                    <!-- Ingredient processing notes -->
                                    <p class="is-family-secondary">{{ingredient.notes}}</p>
                                </div>
                                
                            </div>
                        </div>


                        <!-- Brief Genealogy Description -->
                        <div class="panel-block">
                            <div class="py-2">
                                <h5 class = "my-2 mx-2">Processing Steps</h5>
                                <markdown-part class="mx-2 mt-2 mb-4" :source-markdown="record.coreCitation.briefGenealogy"></markdown-part>
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
import MarkdownPart from './MarkdownPart.vue'





export default {
    name: "ViewRecord",
    components: {
       HideableBox,
       MarkdownPart
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
            allActors: [],
            allMissing: [],
            allSuggested: [],
            documentationQualifierToggle: false,
            healthCategory: ""
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
        updateHealthCategory(categoryValue){
            this.healthCategory = categoryValue
            console.log(this.healthCategory)
        },
        clearHealthCategory(){
            this.healthCategory = ''
            console.log(this.healthCategory)
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
        getGraphic(metadataValue){
            if (metadataValue == 0) {
                return "no-stars"
            } else if (metadataValue == 1) {
                return "one-star"
            } else if (metadataValue == 2) {
                return "two-stars"
            } else if (metadataValue == 3) {
                return "three-stars"
            }
            else if (metadataValue == 4) {
                return "four-stars"
            } else if (metadataValue == 5) {
                return "five-stars"
            }
        },
        getModalHeaders(){
            if (this.healthCategory == "representation") {
                return "How does the official documentation address social justice and representation?"
            } else if (this.healthCategory == "publicResponsibility") {
                return "How does the official documentation address ethical governance and public responsibility?"
            } else if (this.healthCategory == "historicContext") {
                return "How does the official documentation address historic context?"
            } else if (this.healthCategory == "potentialImpact") {
                return "How does the official documentation address potential future impact?"
            } 
        },
        getModalContent(){
            if (this.healthCategory == "representation") {
                return this.record.dataBiography.representation.healthCheckQualifier
            }   else if (this.healthCategory == "publicResponsibility") {
                return this.record.dataBiography.publicResponsibility.healthCheckQualifier
            } else if (this.healthCategory == "historicContext") {
                return this.record.dataBiography.historicContext.healthCheckQualifier
            } else if (this.healthCategory == "potentialImpact") {
                return this.record.dataBiography.potentialImpact.healthCheckQualifier
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
        //function to push README records + actors to Vue data objects
        getReadmes(){
            var readMes = this.record.dataLifecycle
            if (!('manipulation' in readMes)){

            } else{
                var manipulation = this.record.dataLifecycle.manipulation
                if (!('records' in manipulation)){

                } else{
                    var records = this.record.dataLifecycle.manipulation.records
                    if (records[0].relatedResourceURL){
                        for (let i = 0; i < records.length; i ++){
                            var recordProps = {}
                            recordProps = {"format": records[i].format, "relatedResourceURL": records[i].relatedResourceURL, "author": records[i].author, "title": records[i].title}
                            this.allRecords.push(recordProps)
                        }
                    }
                }
                if (!('actors' in manipulation)){
                } else{
                    var actors = this.record.dataLifecycle.manipulation.actors
                    if (actors[0].name){
                        for (let i = 0; i < actors.length; i ++){
                            var actorProps = {}
                            actorProps = {"name": actors[i].name, "notes": actors[i].notes}
                            this.allActors.push(actorProps)
                        }
                    }
                }
            } 
        },
        getMissing(){
            var missingProps = {}

            //DATABIO
            if (!('dataBiography' in this.record)){

            } else {
                var dataBiography = this.record.dataBiography
            
                // data bio, all the normal sections
                for (const property in dataBiography) {
                    var secondLevelProp = dataBiography[property]
                    for (const property in secondLevelProp) {
                        for (let i = 0; i < secondLevelProp[property].length; i ++){
                            if (!('contextMissing' in secondLevelProp[property][i])){

                            } else {
                                missingProps = {"property": property}
                                this.allMissing.push(missingProps)
                            }
                        }
                    }


                    // data bio, weird sections
                    for (let i = 0; i < dataBiography[property].length; i ++){
                            if (!('contextMissing' in dataBiography[property][i])){

                            } else {
                                missingProps = {"property": property}
                                this.allMissing.push(missingProps)
                            }
                    }
                }
            }

            //DATA LIFECYCLE
            if (!('dataLifecycle' in this.record)){

            } else {
                var dataLifecycle = this.record.dataLifecycle
            }
            //maintenance
            if (!('maintenance' in dataLifecycle)){

            } else {
                var maintenance = dataLifecycle.maintenance
                if (!('contextMissing' in maintenance)){

                } else {
                    missingProps = {"property": "maintenance"}
                    this.allMissing.push(missingProps)
                }
            }
        },
        //get the suggested flags && their fieldnames
        getAllSuggested(){
            var suggestedProps = {}

            if (!('dataEndpoints' in this.record)){

            } else{
                var endpoints = this.record.dataEndpoints 
                for (let i = 0; i < endpoints.length; i ++){
                    if (endpoints[i].suggestedEntryPoint = true){
                        suggestedProps = {"type": "Dataset", "title": endpoints[i].title, "link": endpoints[i].accessURL}
                        this.allSuggested.push(suggestedProps)
                    }
                } 
            }

            if (!('resourceConstellation' in this.record)){

            } else {
                var resources = this.record.resourceConstellation
                for (const property in resources) {
                    for (let i = 0; i < resources[property].length; i ++){
                        if (resources[property][i].suggestedEntryPoint = true){
                            suggestedProps = {"type": this.getFieldAlias(property), "title": resources[property][i].title, "link": resources[property][i].relatedResourceURL}
                            this.allSuggested.push(suggestedProps)
                        }
                    }

                }
            }

        }
    },
    mounted() {        
        //get the field aliases
        axios.get("https://raw.githubusercontent.com/nblmc/Data-Context/master/aliases.json")
            .then(response => {
                //add it to the Vue data
                this.aliases = response.data
            }).catch(err => {
                console.log("Couldn't retrieve aliases")
            })

        //get the source metadata
        axios.get("https://raw.githubusercontent.com/nblmc/metadata/main/" + this.recordId + ".json")
            .then(response => {
                //add it to the Vue data
                this.record = response.data
                this.recordLoaded = true;
                //run the function to get all the ingredients, too
                this.getAllIngredients()
                this.getReadmes()
                this.getMissing()
                this.getAllSuggested()
            }).catch(err => {
                console.log("Couldn't retrieve record metadata")
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
    flex-basis: 100%;
}

.dev{
    background-color:lime;
}




</style>