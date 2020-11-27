<template>
  <div class="search-results">
    <div id="nav-container">
      <div id="lmec-logo">
        <a href="https://www.leventhalmap.org/"><img id = "lmec-logo" src="../assets/logo.png"></a>
        <div id ="nav-menu-items">
          <ul>
            <li><a href = "https://www.leventhalmap.org/research/geospatial">Make a Data Request</a></li>
            <li><a href = "https://geoservices.leventhalmap.org/cartinal/">Guides</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Navbar',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: white;
  text-decoration:none;
  font-weight: 600;
  font-size:95%;
}

a:hover{
  border-bottom: 3px solid;

}

#nav-container{
  position:absolute;
  top:0;
  left:0;
  display:flex;
  height: 100px;
  background-color: #054670;
  padding:0;
  margin:0;
}

#lmec-logo{
  position:relative;
  max-height:100%;
  float:left;
}

#nav-menu-items {
  display:flex;
  float: right;
  padding-right: 2rem;
  align-items: center;
  height:100%;
  padding-right: 11rem;
}

img#lmec-logo{
  padding: 0 4rem;
  background-color: rgb(26,26,55);
}



</style>
