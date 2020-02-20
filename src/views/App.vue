<template>
  <div class="app">
    <a class="github-corner" aria-label="View source on GitHub" href="https://github.com/llouisetaylor/humans-in-space">
      <GithubIcon />
    </a>
    <h1>What humans are in space? 💫</h1>

    <div class="app__humans-container" v-if="isLoading === false && humans.length > 0">
      <p class="app__subtitle">Click on an astronaut to find out more about them.</p>
      <div class="app__humans">
        <div class="app__humans-inner-wrap">
          <Human
            :name="human.name"
            v-for="human in humans"
            :key="human.name"
            :openInfoBox="openInfoBox"
          />
        </div>
      </div>
    </div>

    <div class="app__no-humans" v-if="isLoading === false && humans.length === 0">
      <p class="app__subtitle">It looks rather lonely out there...</p>
      <a href="https://astronauts.nasa.gov/" class="app__link">
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
      :wikiPageId="wikiPageId"
      :closeInfoBox="closeInfoBox"
    />

  </div>
</template>

<script>
import axios from 'axios';
import DOMPurify from 'dompurify';
import bugsnagClient from '../lib/bugsnag';

import GithubIcon from '../assets/github-icon.svg';
import Human from '../components/Human.vue';
import InfoBox from '../components/InfoBox.vue';

const HUMANS_IN_SPACE = '/api/astronauts';

export default {
  name: 'app',
  components: {
    Human,
    InfoBox,
    GithubIcon
  },
  data() {
    return {
      humans: [],
      humanName: '',
      showInfoBox: false,
      aboutHuman: '',
      wikiPageId: null,
      isLoading: true
    };
  },
  async created() {
    this.getHumans();
  },
  methods: {
    async getHumans() {
      this.isLoading = true;
      try {
        const response = await axios.get(HUMANS_IN_SPACE);
        if (!response.data.people) {
          throw new Error('No people present in response');
        } else {
          this.humans = response.data.people;
        }
        this.isLoading = false;
      } catch (e) {
        bugsnagClient.notify(e);
        this.isLoading = false;
      }
    },
    async getWikiTitle(searchParam) {
      const SEARCH_WIKI = `/api/astronauts/name/${searchParam}`;
      const response = await axios.get(SEARCH_WIKI);

      if (response.data.query.search.length > 0) {
        this.humanName = response.data.query.search[0].title;
      } else {
        throw new Error(`No wikipedia page found for ${searchParam}`);
      }
    },
    async getWikiContent() {
      const CONTENT_WIKI = `/api/astronauts/bio/${this.humanName}`;

      const response = await axios.get(CONTENT_WIKI);
      if (response.data.query) {
        const pages = response.data.query.pages;
        const firstPage = Object.keys(pages)[0];
        this.aboutHuman = DOMPurify.sanitize(pages[firstPage].extract);
        this.wikiPageId = pages[firstPage].pageid;
      } else {
        throw new Error(`No wikipedia content found for ${this.humanName}`);
      }
    },
    async openInfoBox(name) {
      try {
        const wikiTitle = await this.getWikiTitle(name);
        const wikiContent = await this.getWikiContent();
      } catch (e) {
        bugsnagClient.notify(e);
        this.aboutHuman = 'I couldn\'t find a wikipedia page for this human 😭';
      }
      this.showInfoBox = true;
    },
    closeInfoBox() {
      this.showInfoBox = false;
    }
  }
};
</script>

<style lang="scss">
/* Global styles */
body {
  background-image: url('../assets/backstars.png');
  background-size: contain;
  background-repeat: repeat;
  background-color: #0e1933;
}

p {
  margin: 0;
}

button {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}
@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}
@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}

/* Scoped styles */
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

  &__humans {
    display: flex;
    justify-content: center;
  }

  &__humans-inner-wrap {
    @media screen and (max-width: 900px) {
      display: flex;
      max-height: 340px; // height of astronaut
      overflow-y: hidden;
      overflow-x: scroll;
    }
  }

  &__rocket {
    display: block;
    margin: 30px auto;
    height: 300px;
  }

  &__link {
    font-size: 18px;
  }

  a {
    background: #434384;
    color: white;
    line-height: 1.5;

    &:hover {
      background: white;
      color: #434384;
    }
  }
}
</style>
