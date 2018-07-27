<template>
  <div class="human">
    <img
      class="human__svg"
      src="../assets/human-in-space.png"
      alt="A waving astronaut"
      :style="{transform:`rotate(${rotation}deg)`}"
      @mouseover="showToolTip = true"
      @mouseleave="showToolTip = false"
    />
    <div v-show="showToolTip" class="human__tooltip">
      <Tooltip :name="name"/>
    </div>
  </div>
</template>

<script>
import Tooltip from './Tooltip.vue'

export default {
  name: 'human',
  components: {
    Tooltip
  },
  data () {
    return {
      showToolTip: false,
      rotation: 0
    }
  },
  props: {
    name: String
  },
  created () {
    this.rotation = Math.random()*70 - 35;
  }
}
</script>

<style scoped>
  .human {
    cursor: pointer;
    position: relative;
    margin: 40px;
    transform: translatey(0px);
	  animation: float 4s ease-in-out infinite;
  }

  .human__tooltip {
    position: absolute;
    z-index: 1;
  }

  .human__svg {
    height: 160px;
  }

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-10px);
    }
    100% {
      transform: translatey(0px);
    }
  }
</style>
