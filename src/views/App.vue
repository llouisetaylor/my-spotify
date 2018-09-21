<template>
  <div class="app">
    <h1>What humans are in space? 💫</h1>
    <p class="app__subtitle">Click on an astronaut to find out more about them.</p>
    <div class="app__humans">
      <Human
        :name="human.name"
        v-for="human in humans"
        :key="human.name"
        :showAboutHuman="showAboutHuman"
      />
    </div>
    <InfoBox
      v-show="showInfoBox"
      :humanName="humanName"
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
      humanName: '',
      aboutHuman: ''
    }
  },
  async created () {
    this.getHumans();
  },
  methods: {
    async getHumans() {
      try {
        const response = await axios.get(HUMANS_IN_SPACE);
        this.humans = response.data.people;
      } catch (e) {
        console.error(e);
      }
    },
    async getWikiTitle(searchParam) {
      const SEARCH_WIKI = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchParam}%20astronaut&prop=info&inprop=url&utf8=&format=json`
      console.log(searchParam, SEARCH_WIKI)
      try {
        const response = await axios.get(SEARCH_WIKI);
        this.humanName = response.data.query.search[0].title
      } catch (e) {
        console.error(e);
      }
    },
    async getWikiContent() {
      const CONTENT_WIKI = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${this.humanName}`

      try {
        const response = await axios.get(CONTENT_WIKI);
        const pages = response.data.query.pages;
        const firstPage = Object.keys(pages)[0];
        this.aboutHuman = DOMPurify.sanitize(pages[firstPage].extract);
      } catch (e) {
        console.error(e);
      }
    },
    async showAboutHuman(name) {
      const wikiTitle = await this.getWikiTitle(name);
      const wikiContent = await this.getWikiContent();
      this.showInfoBox = true;
    },
    hideAboutHuman() {
      this.showInfoBox = false;
    }
  }
}
</script>

<style lang="scss">
body {
  background-image: url('../assets/backstars.png');
  background-size: contain;
  background-repeat: repeat;
  background-color: #0E1933;
}

.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
  height: 100vh;
  overflow: hidden;

  &__subtitle {
    font-size: 18px;
    margin-bottom: 40px;
  }
}

p {
  margin: 0;
}

button {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
