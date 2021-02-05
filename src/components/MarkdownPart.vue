<template>

  <div class="content markdown is-family-secondary" v-html="renderedMarkdown">
  </div>

</template>

<script>

import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

export default {
  name: "MarkdownPart",
  props: {
    "sourceMarkdown": String
  },
  computed: {
    renderedMarkdown: function(){
      return this.sourceMarkdown.length > 0 ? md.render(this.sourceMarkdown) : "";
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

div.content.markdown.is-family-secondary ul{
    list-style: square;
}

</style>