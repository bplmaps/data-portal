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
  <!-- py-4 denotes Bulma style notation for adding padding on the top and bottom -->
  <section class="view-record py-4">
    <div class="container is-fluid">
      <button class="button is-link is-outlined is-small" @click="$router.back()"><font-awesome-icon icon="arrow-left" class="mr-2"></font-awesome-icon>Go Back</button>
      <router-link to="/" class="button is-link is-outlined is-small"><font-awesome-icon icon="search" class="mr-2"></font-awesome-icon>New Search</router-link>
    </div>
    <hr>
    <!-- MAIN CONTENT CONTAINER -->
    <!-- This data flag is by default false & turned true via a successful async call  -->
    <div v-if="recordLoaded">
      <!-- DATASET HEADER TAGS -->
      <div class="container is-fluid my-2">
        <!-- TITLE -->
        <h2 class="title is-size-3">{{ record.core.title }}</h2>
        <!-- container to hold tags -->
        <div class="mt-1">
          <!-- class that achieves the tag grouping -->
          <div class="field is-grouped is-grouped-multiline">
            <!-- DATASET VS. COLLECTION TAG -->
            <!-- Calls function 'recordTypeIcon' to determine which icon to show -->
            <div class="control">
              <span class="tag is-medium is-dark mr-2">
                <font-awesome-icon
                  :icon="recordTypeIcon"
                  class="mr-2"
                ></font-awesome-icon>
                {{ record.core.recordType }}
              </span>
            </div>

            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-medium is-dark">
                  <font-awesome-icon
                    icon="anchor"
                    class="mr-2"
                  ></font-awesome-icon>
                  Identifier
                </span>

                <span class="tag is-medium is-primary is-light mr-2">
                  {{ record.core.$id }}
                </span>
              </div>
            </div>

            <div class="control">
              <div
                class="tags has-addons"
                v-if="record.tags.temporal.temporalPublication"
              >
                <span
                  class="tag is-medium is-dark"
                  v-if="record.tags.temporal.temporalPublication"
                >
                  <font-awesome-icon
                    icon="clock"
                    class="mr-2"
                  ></font-awesome-icon>
                  Published
                </span>
                <span class="tag is-medium is-light is-primary">
                  {{ record.tags.temporal.temporalPublication.singleDate }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- END OF HEADER TAGS  -->
      </div>
      <hr />
      <!-- SHORT DESCRIPTION IN THE HEADER -->
      <div class="container is-fluid my-4">
        <div>
          <p class="is-family-secondary is-size-5">
            {{ record.core.shortDescription }}
          </p>
        </div>
      </div>
      <hr />
      <!-- END OF DATASET HEADER CONTENT -->

      <!-- TOP ROW OF PANEL BLOCKS -->
      <!-- core cores + data endpoints sections-->
      <div class="container is-fluid">
        <!-- Holds the columns! -->
        <div class="columns">
          <!-- Left-hand column -->
          <div class="column is-two-thirds">
            <!-- CORE core SECTION  -->
            <div class="panel is-primary">
              <!-- CORE core PANEL TITLE -->
              <p class="panel-heading">About this data</p>
              <!-- LONG DESCRIPTION -->
              <div class="panel-block">
                <div class="py-2">
                  <div class="markdown py-2">
                    <h5>Dataset Overview</h5>
                    <markdown-part
                      :source-markdown="record.core.fullDescription"
                    ></markdown-part>
                  </div>
                </div>
              </div>
              <!-- KEY ATTRIBUTES -->
              <div v-if="record.core.keyAttributes" class="panel-block">
                <div class="py-2">
                  <h5 class="mb-2">Key Attributes</h5>
                  <div class="container is-fluid px-0">
                    <div class="field is-grouped is-grouped-multiline">
                      <div
                        v-for="(item, index) in record.core.keyAttributes"
                        :key="index"
                      >
                        <div
                          class="is-family-secondary tag is-medium is-light mx-2 my-2"
                        >
                          {{ item }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- GEOMETRY -->
              <div v-if="record.core.dataTypes" class="panel-block">
                <div class="py-2">
                  <h5>Geometry</h5>
                  <div
                    class="content my-0 py-0"
                    v-for="(item, index) in record.core.dataTypes"
                    :key="index"
                  >
                    <p class="is-family-secondary">{{ item }}</p>
                  </div>
                </div>
              </div>
              <!-- TIME PERIOD  -->
              <div
                class="panel-block"
                v-if="record.tags.temporal.temporalRepresentation"
              >
                <div class="py-2">
                  <h5>Time Period</h5>
                  <div
                    v-if="
                      record.tags.temporal.temporalRepresentation.valueType ==
                      'singleDate'
                    "
                  >
                    <p class="is-family-secondary">
                      {{
                        record.tags.temporal.temporalRepresentation.singleDate
                      }}
                    </p>
                  </div>
                  <div
                    v-if="
                      record.tags.temporal.temporalRepresentation.valueType ==
                      'range'
                    "
                  >
                    <p class="is-family-secondary">
                      {{
                        record.tags.temporal.temporalRepresentation.rangeStart
                      }}
                      -
                      {{ record.tags.temporal.temporalRepresentation.rangeEnd }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- OFFICIAL MAINTAINER / SOURCE -->
              <div class="panel-block">
                <div class="py-2">
                  <h5>Maintained by</h5>
                  <p class="is-family-secondary">
                    {{ record.lifecycle.maintenance.officialMaintainer }}
                  </p>
                </div>
              </div>
              <!-- ACCESS CONDITIONS  -->
              <div class="panel-block">
                <div class="py-2">
                  <h5>Access conditions</h5>
                  <p class="is-family-secondary">
                    {{ record.core.accessCondition }}
                  </p>
                </div>
              </div>
            </div>
            <!-- END OF CORE core SECTION -->
          </div>
          <!-- END OF LEFT HAND COLUMN IN THE TOP ROW OF CONTENT -->

          <!-- START TOP RIGHT HAND COLUMN -->
          <div class="column is-one-third">
            <!-- DATA ENDPOINT SECTION -->
            <div class="panel is-info" v-if="record.access">
              <!-- DATA ENDPOINTS PANEL TITLE -->
              <p class="panel-heading">Get this data</p>
              <!-- Iteratively creates panel blocks for each endpoint -->
              <!-- Sorts them based on whether or not they are 'suggested'  -->

              <endpoint-block 
                v-for="endpoint in this.sortedEndpoints"
                :key="endpoint.$id"
                :endpoint="endpoint"
              ></endpoint-block>
              
              
            </div>
            <!-- END OF DATA ENDPOINT SECTION -->
          </div>
        </div>
      </div>
      <!-- END OF TOP CORE core / ENDPOINTS SECTION -->
      <hr />

      <!-- ALL THE BOTTOM ONE-HALF PAGE ELEMENTS !!! -->
      <div class="container is-fluid pb-4">
        <!-- Holds the columns -->
        <div class="columns">
          <!-- START BOTTOM LEFT-HAND COLUMNS (Lifecycle + Documentation) -->
          <div class="column is-half">

            <!-- START CONSIDERATIONS -->
            <div class="panel">
              <div class="panel-heading">
                Considerations
                 <a href = "https://cartinal.leventhalmap.org/documentation/schema/considerations.html" target="_blank">
                    <font-awesome-icon
                      icon="info-circle"
                      class="mr-2"
                    ></font-awesome-icon>
                 </a>
              </div>
              <consideration-scorecard :considerations="record.considerations"></consideration-scorecard>
            </div>
            <!-- END CONSIDERATIONS -->

            <!-- DATA GENEALOGY SECTION -->
            <div class="panel" v-if="record.lifecycle.processing">
              <!-- DATA GENEALOGY PANEL TITLE -->
              <p class="panel-heading">Data Genealogy</p>

              <!-- DATA GENEALOGY SOURCE INGREDIENTS SECTION -->
              <div class="panel-block" v-if="allIngredients.length > 0">
                <div class="py-2">
                  <h5 class="my-2 mx-2">Source Datasets</h5>
                  <div
                    class="resource-box p-3 mb-2 my-2"
                    v-for="ingredient in allIngredients"
                    :key="ingredient.$id"
                  >
                    <!-- Title lable with link to the ingredient  -->
                    <p class="is-size-6">
                      <router-link :to="'/catalog/' + ingredient.arkID">{{
                        ingredient.title
                      }}</router-link>
                    </p>
                    <!-- Ingredient ID + ID anchor icon -->
                    <div class="tags has-addons my-1">
                      <span class="tag"
                        ><font-awesome-icon
                          icon="anchor"
                          class="mr-2"
                        ></font-awesome-icon
                        >Identifier</span
                      ><span class="tag is-info is-light">{{
                        ingredient.$id
                      }}</span>
                    </div>
                    <!-- Ingredient processing notes -->
                    <p class="is-family-secondary">{{ ingredient.notes }}</p>
                  </div>
                </div>
              </div>

              <!-- DATA GENEALOGY PROCESSING STEPS -->
              <div class="panel-block" v-if="record.lifecycle.processing.steps">
                <div class="py-2">
                  <h5 class="my-2 mx-2">Processing Steps</h5>
                  <markdown-part
                    class="mx-2 mt-2 mb-4"
                    :source-markdown="record.lifecycle.processing.steps"
                  ></markdown-part>
                </div>
              </div>
            </div>
            <!-- END OF DATA GENEALOGY SECTION -->
          </div>
          <!-- END OF BOTTOM LEFT HAND COLUMNS  -->

          <!-- START BOTTOM RIGHT COLUMNS (Related Resources + Data Genealogy Sections) -->
          <div class="column is-half">
            <!-- DATA LIFECYCLE SECTION -->
            <div class="panel">
              <!-- DATA LIFECYCLE PANEL TITLE -->
              <p class="panel-heading">Data Lifecycle</p>

              <!-- DATA LIFECYCLE CONTENT -->
              <div class="panel-block">
                <div class="py-2" v-if="record.lifecycle.description">
                  <!-- DESCRIPTION -->
                  <div v-if="record.lifecycle.description.contextProvider">
                    <div class="resource-box my-3">
                      <h5>Describing</h5>
                      <p class="is-family-secondary mt-1">
                        <strong>Metadata by:</strong>
                        {{ record.lifecycle.description.contextProvider.name }},
                        Data
                        {{
                          record.lifecycle.description.contextProvider
                            .relationshipToData
                        }}
                      </p>
                    </div>
                    <!-- MAINTENANCE -->
                    <div
                      class="resource-box my-3"
                      v-if="record.lifecycle.maintenance"
                    >
                      <h5 class="my-2">Maintaining</h5>
                      <div class="is-family-secondary">
                        <p>
                          <strong>Maintainer: </strong
                          >{{
                            record.lifecycle.maintenance.officialMaintainer
                          }}.
                        </p>
                        <p
                          class="my-1"
                          v-if="
                            record.lifecycle.maintenance.maintenanceFrequency
                          "
                        >
                          <strong>Maintenance Frequency:</strong>
                          {{
                            record.lifecycle.maintenance.maintenanceFrequency
                          }}.
                        </p>
                      </div>
                    </div>
                    <!-- PROCESSING -->
                    <div
                      class="resource-box my-3"
                      v-if="record.lifecycle.description.contextOnBehalfOf"
                    >
                      <div v-if="record.lifecycle.description.contextOnBehalfOf">
                        <h5
                          v-if="record.lifecycle.description.contextOnBehalfOf"
                        >
                          Processing
                        </h5>
                        <p class="is-family-secondary mt-2">
                          <strong>Processor:</strong>
                          {{
                            record.lifecycle.description.contextOnBehalfOf.name
                          }}, Data
                          {{
                            record.lifecycle.description.contextOnBehalfOf
                              .relationshipToData
                          }}
                        </p>
                        <div
                          class="content"
                          v-if="record.lifecycle.processing.choices"
                        >
                          <p
                            v-for="(item, index) in record.lifecycle.processing
                              .choices"
                            :key="index"
                            class="is-family-secondary mt-1"
                          >
                            <strong>Processor's Record:</strong>
                            <a target="_blank" :href="item.accessURL">{{
                              item.title
                            }}</a>
                          </p>
                        </div>
                        <div
                          class="content"
                          v-if="record.lifecycle.processing.tools"
                        >
                          <p
                            class="is-family-secondary mt-1"
                            v-for="(item, index) in record.lifecycle.processing
                              .tools"
                            :key="index"
                          >
                            <strong>Processor's Record:</strong>
                            <a target="_blank" :href="item.accessURL">{{
                              item.format
                            }}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END OF DATA LIFECYCLE SECTION -->

            <!-- RELATED RESOURCES SECTION -->
            <div class="panel" v-if="record.resources">
              <!-- RELATED RESOURCES PANEL TITLE -->
              <p class="panel-heading">Related Resources</p>

              <!-- RELATED RESOURCES CONTENT -->
              <div
                class="panel-block"
                v-for="(firstLevelItem, firstLevelIndex) in record.resources"
                :key="firstLevelIndex"
              >
                <div class="p-2">
                  <!-- Creates panel headings for all the resource sub-sections  -->
                  <h6 class="is-size-6">
                    {{ getFieldAlias(firstLevelIndex) }}
                  </h6>
                  <!-- Within the different categories, each item  -->
                  <div
                    class="resource-box p-3 my-2"
                    v-for="(
                      secondLevelItem, secondLevelIndex
                    ) in firstLevelItem"
                    :key="secondLevelIndex"
                  >
                    <!-- Every resource has a title -->
                    <div v-if="firstLevelIndex == 'documentation'">
                      <p class="is-size-6">
                        <font-awesome-icon
                          icon="file-signature"
                          class="mr-2"
                        ></font-awesome-icon
                        ><a target="_blank" :href="secondLevelItem.$id">{{
                          secondLevelItem.title
                        }}</a>
                      </p>
                      <p
                        class="is-family-secondary"
                        v-if="secondLevelItem.maintainedBy"
                      >
                        {{ secondLevelItem.maintainedBy }}
                      </p>
                      <p></p>
                    </div>
                    <!-- Unique author + publication date display for tutorials -->
                    <div v-if="firstLevelIndex == 'tutorials'">
                      <p class="is-size-6">
                        <font-awesome-icon
                          icon="chalkboard-teacher"
                          class="mr-2"
                        ></font-awesome-icon
                        ><a target="_blank" :href="secondLevelItem.$id">{{
                          secondLevelItem.title
                        }}</a>
                      </p>
                      <p
                        class="is-family-secondary"
                        v-if="
                          secondLevelItem.author ||
                          secondLevelItem.datePublished
                        "
                      >
                        {{ secondLevelItem.author }},
                        {{ secondLevelItem.datePublished.substring(0, 4) }}
                      </p>
                      <p></p>
                    </div>
                    <!-- Unique author, publisher + date display for published works  -->
                    <div v-if="firstLevelIndex == 'publishedWorks'">
                      <div v-if="secondLevelItem.format == 'Map'">
                        <p class="is-size-6">
                          <font-awesome-icon
                            icon="globe-americas"
                            class="mr-2"
                          ></font-awesome-icon
                          ><a target="_blank" :href="secondLevelItem.$id">{{
                            secondLevelItem.title
                          }}</a>
                        </p>
                      </div>
                      <div v-else>
                        <p class="is-size-6">
                          <a target="_blank" :href="secondLevelItem.$id">{{
                            secondLevelItem.title
                          }}</a>
                        </p>
                      </div>
                      <p class="is-family-secondary" v-if="secondLevelItem.datePublished">
                        {{ secondLevelItem.author }},
                        {{ secondLevelItem.publisher }},
                        {{ secondLevelItem.datePublished.substring(0, 4) }}.
                      </p>
                    </div>
                    <!-- Only codebooks have maintainedBy  -->
                    <div v-if="firstLevelIndex == 'codebooks'">
                      <p class="is-size-6">
                        <font-awesome-icon
                          icon="spell-check"
                          class="mr-2"
                        ></font-awesome-icon
                        ><a target="_blank" :href="secondLevelItem.$id">{{
                          secondLevelItem.title
                        }}</a>
                      </p>
                      <p class="is-family-secondary">
                        {{ secondLevelItem.maintainedBy }}
                      </p>
                    </div>
                    <!-- Every resource has notes  -->
                    <p class="is-family-secondary">
                      {{ secondLevelItem.notes }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- END OF RELATED RESOURCES SECTION -->
          </div>
          <!-- END BOTTOM RIGHT HAND COLUMNS -->
        </div>
      </div>
      <!-- END OF THE ONE-HALF PAGE ELEMENTS -->
    </div>
    <!-- END OF THE MAIN CONTENT CONTAINER -->

    <!-- ❌ Error message, if the metadata does not load ❌ -->
    <div v-else>Loading this record ...</div>
    <!-- ❌ Fin ❌ -->
  </section>
</template>

<script>
import axios from "axios";
import HideableBox from "./HideableBox.vue";
import MarkdownPart from "./MarkdownPart.vue";
import ConsiderationScorecard from "./ConsiderationScorecard.vue";
import EndpointBlock from "./EndpointBlock.vue";

export default {
  name: "ViewRecord",

  components: {
    HideableBox,
    MarkdownPart,
    ConsiderationScorecard,
    EndpointBlock
  },

  data() {
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
    };
  },
  computed: {
    // Helper function to map record types onto FA icons.
    recordTypeIcon: function () {
      try {
        if (this.record.core.recordType === "Dataset") {
          return "server";
        } else if (this.record.core.recordType === "Collection") {
          return "shapes";
        } else {
          return "asterisk";
        }
      } catch (e) {
        return "asterisk";
      }
    },
    // Orders the endpoints based on if there is a suggested entrypoint
    sortedEndpoints: function () {
      if (this.record.access) {
        return this.record.access.sort((b, a) => {
          return (
            (typeof a.suggestedEntryPoint === "undefined"
              ? false
              : a.suggestedEntryPoint) -
            (typeof b.suggestedEntryPoint === "undefined"
              ? false
              : b.suggestedEntryPoint)
          );
        });
      } else {
        return null;
      }
    },
  },
  methods: {
    //function to reload the page if the route changes
    updateId() {
      this.recordId = this.$route.params.record_id;
      this.$router.go();
    },
    //function to split whole path from file name for display
    getFileName(fullpath) {
      var splitPath = fullpath.split("/");
      var fileName = splitPath.pop();
      return fileName;
    },
    //function to return appropriate field aliases
    getFieldAlias(realFieldName) {
      for (var key in this.aliases) {
        if (this.aliases.hasOwnProperty(realFieldName)) {
          var fieldAlias = this.aliases[realFieldName];
          return fieldAlias;
        } else {
          return realFieldName;
        }
      }
    },
    //function to push ingredient attributes to a Vue data object
    getAllIngredients() {
      //if there are no ingredients do nothing
      var lifecycle = this.record.lifecycle;
      if (!("acquisition" in lifecycle)) {
      }
      //if there are ingredients
      else {
        //create a variable for ingredients, pulled from the original source data
        var ingredients = lifecycle.acquisition.ingredients;
        //loop through all the ingredients
        for (let i = 0; i < ingredients.length; i++) {
          //create an empty object
          var ingredientProps = {};
          //get the ID
          var splitURI = ingredients[i].$id.split("/")[2];
          //add the id, title, processing notes to the new data object
          ingredientProps = {
            $id: ingredients[i].$id,
            arkID: splitURI,
            notes: ingredients[i].notes,
            title: "",
          };
          //push the new object to the Vue data
          this.allIngredients.push(ingredientProps);
        }

        //the source record doesn't have ingredient titles & we want those, so have to get them from Github
        //for all the items in the new ingredient data
        for (let i = 0; i < this.allIngredients.length; i++) {
          var current = this.allIngredients[i];
          var currentSplit = current.$id.split("/")[2];
          //grab metadata associated with that ingredient
          axios
            .get(
              "https://raw.githubusercontent.com/nblmc/metadata/main/" +
                currentSplit +
                ".json"
            )
            .then((response) => {
              //add the ingredient dataset title to the new ingredient data object
              this.allIngredients[i].title = response.data.core.title;
            })
            .catch((err) => {
              console.log("Couldn't retrieve ingredient metadata");
            });
        }
      }
    },
  },
  mounted() {
    //get the field aliases
    axios
      .get(
        "https://raw.githubusercontent.com/nblmc/Data-Context/master/aliases.json"
      )
      .then((response) => {
        //add it to the Vue data
        this.aliases = response.data;
      })
      .catch((err) => {
        console.log("Couldn't retrieve aliases");
      });

    //get the source metadata
    axios
      .get(
        "https://raw.githubusercontent.com/nblmc/metadata/main/" +
          this.recordId +
          ".json"
      )
      .then((response) => {
        //add it to the Vue data
        this.record = response.data;
        this.recordLoaded = true;
        //run the function to get all the ingredients, too
        this.getAllIngredients();
      })
      .catch((err) => {
        console.log("Record loading...");
      });
  },
  watch: {
    //watch the route in case it changes
    $route: "updateId",
  },
};
</script>

<style lang="scss" scoped>
@import "~/style-vars.scss";

hr {
  background-color: rgba(255, 255, 255, 0.7);
}

.panel-block {
  background-color: rgba(255, 255, 255, 0.85);
}
.resource-box {
  border: 2px solid #f0f0f0;
  border-radius: 3px;
  flex-basis: 100%;
  padding: 1rem;
}
</style>