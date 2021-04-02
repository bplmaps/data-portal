<template>

 <div class="panel-block pb-4">
                <!-- Text for each endpoint  -->
                <div class="endpoint-text">
                  <!-- Link with title label that navigates to the data  -->
                  <p class="is-size-6">
                    {{ endpoint.title }}
                  </p>
                  <p class="my-1" v-if="endpoint.suggested"><span class="tag is-success is-light"><font-awesome-icon icon="certificate" class="mr-2"></font-awesome-icon> Suggested</span></p>
                  <p class="my-2">
                    <a
                      class="mb-1 button is-small is-link is-outlined"
                      :href="endpoint.accessURL"
                      ><font-awesome-icon
                        :icon="endpointIcon"
                        class="mr-2"
                      ></font-awesome-icon>
                      {{endpointButtonText}}</a
                    >
                    <a
                      v-if="endpoint.format.toLowerCase() === 'geojson'"
                      class="button is-small is-link is-outlined"
                      :href="
                        'https://geojson.io/#data=data:text/x-url,' +
                        endpoint.accessURL
                      "
                      target="_blank"
                      ><font-awesome-icon
                        icon="cloud-upload-alt"
                        class="mr-2"
                      ></font-awesome-icon>
                      Preview on GeoJSON.io</a
                    >
                  </p>


                  <!-- Host label -->
                  <p class="is-size-7 is-family-secondary mt-1">
                    <em class="has-text-grey">Provider</em>
                    {{ endpoint.source }}
                  </p>

                  <p class="is-size-7 mt-2"><a href="https://cartinal.leventhalmap.org/guides/file-formats.html"><font-awesome-icon icon="question-circle" class="mr-2"></font-awesome-icon>How can I make a map from a <strong>{{ endpoint.format }}</strong> file?</a></p>
                </div>
              </div>

</template>

<script>
export default {
  name: "EndpointBlock",
  props: {
    "endpoint": {
      type: Object,
      default: null
    }
  },
  computed: {
    endpointIcon: function() {
      if(this.downloadableFormats.includes(this.endpoint.format.toLowerCase())) { return "download" }
      else if(this.webViewableFormats.includes(this.endpoint.format.toLowerCase())) { return "window-restore" }
      else { return "square" }
    },

    endpointButtonText: function() {
      if(this.downloadableFormats.includes(this.endpoint.format.toLowerCase())) { return "Download to your computer" }
      else if(this.webViewableFormats.includes(this.endpoint.format.toLowerCase())) { return "View online" }
      else { return "Open this data" }
    }
  },
  data () {
    return {
      downloadableFormats: ['geojson','shapefile','geopackage','csv','zipped shapefile'],
      webViewableFormats: ['arcgis web service']
    }
  }
}
</script>

<style lang="scss" scoped>

@import "~/style-vars.scss";

h5 {
  cursor: pointer;
}

h5 > .eye-icon {
  transition: color 0.5s;
}

h5:hover > .eye-icon {
  color: $highlight;
}
</style>