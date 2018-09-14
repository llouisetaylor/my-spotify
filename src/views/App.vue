<template>
  <div id="app">
    <h1>What humans are in space?</h1>
    <div class="app__humans">
      <Human
        :name="human.name"
        v-for="human in humans"
        :key="human.name"
        :showAboutHuman="showAboutHuman"
      />
    </div>
    <InfoBox
      v-show="showInfoBox && !isLoading"
      :text="aboutHuman"
      :hideAboutHuman="hideAboutHuman"
    />
  </div>
</template>

<script>
import axios from 'axios';
import DOMPurify from 'dompurify'

import Human from '../components/Human.vue'
import InfoBox from '../components/InfoBox.vue'

const HUMANS_IN_SPACE = 'http://api.open-notify.org/astros.json';

export default {
  name: 'app',
  components: {
    Human,
    InfoBox
  },
  data () {
    return {
      humans: [],
      showInfoBox: false,
      aboutHuman: '',
      isLoading: false
    }
  },
  async created () {
    try {
      const response = await axios.get(HUMANS_IN_SPACE);
      this.humans = response.data.people;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async getWikiTitle(searchParam) {
      this.isLoading = true;
      const SEARCH_WIKI = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchParam}%20astronaut&prop=info&inprop=url&utf8=&format=json`

      try {
        const response = await axios.get(SEARCH_WIKI);
        const wikiPageTitle = response.data.query.search[0].title
        this.getWikiContent(wikiPageTitle);
      } catch (e) {
        console.error(e);
      }
    },
    async getWikiContent(wikiPageTitle) {
      const CONTENT_WIKI = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${wikiPageTitle}`

      try {
        const response = await axios.get(CONTENT_WIKI);
        const pages = response.data.query.pages;
        const firstPage = Object.keys(pages)[0];
        this.aboutHuman = DOMPurify.sanitize(pages[firstPage].extract);
        this.isLoading = false;
      } catch (e) {
        console.error(e);
      }
    },
    showAboutHuman(name) {
      this.getWikiTitle(name);
      this.showInfoBox = true;
    },
    hideAboutHuman() {
      this.showInfoBox = false;
    }
  }
}
</script>

<style>
body {
  background-image: url('../assets/backstars.png');
  background-size: contain;
  background-repeat: repeat;
  background-color: #0E1933;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}

p {
  margin: 0;
}
</style>
