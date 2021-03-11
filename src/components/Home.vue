<template>
<div>
<section>
  <div class="container is-fluid py-6">
    <h1 class="title is-size-1">Search for data</h1>
        <div class="field has-addons">
          <div class="control has-icons-left is-expanded">
          <input v-model="inputQuery" type="text" placeholder="Enter keywords, topics, dates ..." class="input is-large" @keyup.enter="submitMainSearch" >
          <span class="icon is-large is-left">
            <font-awesome-icon icon="search"></font-awesome-icon>
          </span>
          </div>
          <div class="control">
            <button class="button is-primary is-large" @click="submitMainSearch">Search</button>
          </div>
        </div>
  </div>
</section>

<section class="hero">
  <div class="hero-body">
    <p class="subtitle">
      The <strong class="shadow">Leventhal Map &amp; Education Center</strong> collects geospatial data sets that<br><strong class="underline">🎨&nbsp;we’ve created ourselves</strong> <br><strong class="underline">🔧&nbsp;we’ve improved upon for research or teaching</strong><br><strong class="underline">📍&nbsp;relate to our focus on Boston and New England</strong>
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

  <section>
    <div class="container is-fluid mt-5">
      <h3 class="title">Don’t know where to start?</h3>
      <div class="box">
        <div class="level">
          <div class="level-item">
            
             <a href="https://www.leventhalmap.org/research/geospatial/">🙋‍♀️ Talk to a GIS librarian</a>
          </div>
          <div class="level-item">
            
            <a href="https://geoservices.leventhalmap.org/cartinal/guides/clip-by-extent.html#acquiring-data">✍🏼 Try out a quick data exercise</a>
          </div>
          <div class="level-item">
            
            <a href="https://www.leventhalmap.org/education/adult/">📓 Join one of our instruction courses</a>
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
        {title: "Boundaries", description: "Political and physical outlines like neighborhoods, towns, and coastlines", searchString: "Boundary | Boundaries"},
        {title: "Boston", description: "Geography and data about the City of Boston", searchString: "Boston"},
        {title: "American Community Survey", description: "Demographic data extracted from the Census Bureau's American Community Survey program", searchString: "American Community Survey"}
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
    }
  }

}
</script>

<style lang="scss" scoped>
@import "~/style-vars.scss";

.hero-body {
  background: linear-gradient(179deg, rgba(225,255,204,0) 0%, rgba(225,255,204,0.31) 14%, rgba(225,253,212,0.6) 27%, rgba(228,247,245,0.75) 74%, rgba(228,247,245,0) 100%);

  p {
    line-height: 200%;
    text-align: center;
  }

  strong.underline {
    background-color: rgba($link, 0.2);
    padding: 3px 10px;
    text-shadow: 1px 1px 1px rgba(255,255,255,0.7);
  }

  strong.shadow {
    text-shadow: 2px 2px 0px $shadow-popper;
  }
}
.level-item {
  flex-shrink: unset;
  text-align: center;
  a {
    margin: 0 10px;
  }

}

.suggestion-card { 
  cursor: pointer;

  &:hover { 
    box-shadow: inset 0px 0px 2px 2px $link;
  }

}

</style>
