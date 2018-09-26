<template>
  <div class="app">
    <h1>What humans are in space? 💫</h1>

    <div class="app__humans-container" v-if="isLoading === false && humans.length > 0">
      <p class="app__subtitle">Click on an astronaut to find out more about them.</p>
      <div class="app__humans">
        <Human
          :name="human.name"
          v-for="human in humans"
          :key="human.name"
          :openInfoBox="openInfoBox"
        />
      </div>
    </div>

    <div class="app__no-humans" v-if="isLoading === false && humans.length === 0">
      <p class="app__subtitle">It looks rather lonely out there...</p>
      <a href="https://astronauts.nasa.gov/">
        <img
          class="app__rocket"
          src="https://ubisafe.org/images/rocket-transparent-space-6.png"
          alt=""
        />
        Could you be the next human in space?
        <br/>
        Find out what it takes to become an astronaut!
      </a>
    </div>

    <InfoBox
      v-if="showInfoBox"
      :humanName="humanName"
      :text="aboutHuman"
      :closeInfoBox="closeInfoBox"
    />

  </div>
</template>

<script>
import axios from 'axios';
import DOMPurify from 'dompurify'

import Human from '../components/Human.vue'
import InfoBox from '../components/InfoBox.vue'

const HUMANS_IN_SPACE = '/api/astronauts';

export default {
  name: 'app',
  components: {
    Human,
    InfoBox
  },
  data () {
    return {
      humans: [],
      humanName: '',
      showInfoBox: false,
      aboutHuman: '',
      isLoading: true
    }
  },
  async created () {
    this.getHumans();
  },
  methods: {
    async getHumans() {
      this.isLoading = true;
      try {
        const response = await axios.get(HUMANS_IN_SPACE);
        this.humans = response.data.people;
        this.isLoading = false;
      } catch (e) {
        console.error(e);
        this.isLoading = false;
      }
    },
    async getWikiTitle(searchParam) {
      const SEARCH_WIKI = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchParam}%20astronaut&prop=info&inprop=url&utf8=&format=json`
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
    async openInfoBox(name) {
      const wikiTitle = await this.getWikiTitle(name);
      const wikiContent = await this.getWikiContent();
      this.showInfoBox = true;
    },
    closeInfoBox() {
      this.showInfoBox = false;
    }
  }
}
</script>

<style lang="scss">

/* Global styles */
body {
  background-image: url('../assets/backstars.png');
  background-size: contain;
  background-repeat: repeat;
  background-color: #0E1933;
}

p {
  margin: 0;
}

button {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

/* Scoped styles */
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
  height: 100vh;

  &__subtitle {
    font-size: 18px;
    margin-bottom: 40px;
  }

  &__rocket {
    display: block;
    margin: 30px auto;
    height: 300px;
  }

  a {
  background: #434384;
  color: white;
  font-size: 20px;
  line-height: 1.5;

  &:hover {
    background: white;
    color: #434384;
  }
}
}

</style>
