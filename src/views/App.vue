<template>
  <div id="app">
    <h1>What humans are in space?</h1>
    <div
      class="app__humans"
      v-for="human in humans"
      :key="human.name"
    >
      <Human :name="human.name"/>
    </div>
    <InfoBox v-bind:class="{ 'app__info-box--hide': !showInfoBox }" />
  </div>
</template>

<script>
import axios from 'axios';

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
      showInfoBox: true
    }
  },
  created () {
    axios.get(HUMANS_IN_SPACE)
      .then(res => {
        this.humans = res.data.people;
      })
      .catch(e => {
        // eslint-disable-next-line
        console.error(e);
      });
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

.app__humans {
  display: inline-block;
  position: relative;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}

.app__info-box--hide {
  display: none;
}

p {
  margin: 0;
}
</style>
