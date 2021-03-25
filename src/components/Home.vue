<template>
<div>
<section>
  <div class="container is-fluid py-6">
    <h1 class="title is-size-1">Search for data</h1>
        <div class="field">
          <div class="control has-icons-left is-expanded">
          <input v-model="inputQuery" type="text" placeholder="Enter keywords, topics, dates ..." class="input is-large" @keyup.enter="submitMainSearch" >
          <span class="icon is-large is-left">
            <font-awesome-icon icon="search"></font-awesome-icon>
          </span>
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered ">
          <div class="control">
            <button class="button is-primary is-medium" @click="submitMainSearch"><font-awesome-icon icon="search" class="mr-2"></font-awesome-icon> Search</button>
            <button class="button is-primary is-medium" @click="submitBrowse"><font-awesome-icon icon="columns" class="mr-2"></font-awesome-icon> Browse<span class="is-hidden-mobile">&nbsp;everything</span></button>
          </div>

        </div>
  </div>
</section>

<section class="hero">
  <div class="hero-body">
    <p class="title">What can you find here?</p>
    <p class="subtitle">
      The Leventhal Map &amp; Education Center collects datasets which support our daily efforts towards educational programming, collections interpretation, and research support services. We have created these datasets, or acquired and processed them to ensure they are accessible.  Our collections focus on Boston and New England. 
    </p>
  </div>
</section>

  <section>
  <div class="container is-fluid  mt-5">
    <h3 class="title">You could try ...</h3>
    <div class="columns is-multiline">
    <div class="column is-one-third" v-for="suggestion in suggestions" :key="suggestion.title">
    <div class="card suggestion-card" @click="triggerExampleSearch(suggestion.searchString)">
      <div class="card-content">
      <p class="title is-size-4">{{suggestion.title}}</p>
      <p class="is-family-secondary">{{suggestion.description}}</p>
      </div>
    </div>
    </div>
    </div>
  </div>
  </section>

</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      suggestions: [
        {title: "Boston", description: "Geography and data about the City of Boston", searchString: "Boston"},
        {title: "Historic GIS", description: "Datasets which were created or derived from historic materials", searchString: "Historic GIS"},
        {title: "Teaching collections", description: "Datasets the LMEC has cleaned up and prepared for use in K-12 classrooms", searchString: "Teaching collections"},
        {title: "Census", description: "Demographic data extracted from the United States Census Bureau's extract tools", searchString: "Census"},
        {title: "Boundaries", description: "Political and physical outlines like neighborhoods, towns, and coastlines", searchString: "Boundary | Boundaries"},
        {title: "Transportation", description: "Datasets that help us peer into and ask questions about the topic of transportation", searchString: "Transportation"},
        {title: "Gentrification", description: "Datasets that help us peer into and ask questions about the topic of race and neighborhood demographic change", searchString: "Gentrification"},
        {title: "Housing", description: "Datasets that help us peer into and ask questions about the topic of housing", searchString: "Housing"},
        {title: "Internet Connectivity", description: "Datasets that help us peer into and ask questions about the topic of internet access", searchString: "Internet"}
      ],
     inputQuery: ''
    }
  },
  methods: {
    submitMainSearch: function() {
      this.$router.push({path: 'search', query: {s: this.inputQuery}});
    },
    triggerExampleSearch: function(q) {
      this.$router.push({path: 'search', query: {s: q}});
    },
    submitBrowse: function() {
            this.$router.push({path: 'search', query: {s: ''}});
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/style-vars.scss";
.hero-body {
background: linear-gradient(179.5deg, rgba(66,46,89,0) 10%, rgba(66,46,89,0.1) 35%, rgba(33,31,76,0.1) 75%, rgba(30,30,75,0) 90%);
text-align: center;
  p {
    line-height: 200%;
    &.title {
    text-shadow: 2px 2px 0px $shadow-popper;
    }
  }
  strong.underline {
   ::before {
     content: "\A";
     white-space: pre;
   }
  }
}
.suggestion-card { 
  cursor: pointer;
  &:hover { 
    box-shadow: inset 0px 0px 2px 2px $link;
  }
}
</style>