<template>
  <div class="human">
    <button @click="showAboutHuman(name)">
      <img
        src="../assets/human-in-space.png"
        alt="A waving astronaut"
        :style="{transform: `rotate(${rotation}deg)`}"
        @mouseover="showToolTip = true"
        @mouseleave="showToolTip = false"
      />
    </button>
    <Tooltip
      :name="name"
      v-show="showToolTip"
    />
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
    name: String,
    showAboutHuman: Function
  },
  created () {
    this.rotation = Math.random() * 90 - 45;
  }
}
</script>

<style lang="scss">
  .human {
    display: inline-block;
    position: relative;
    margin: 40px;
    animation: float 4s ease-in-out infinite;

    button {
      cursor: pointer;
      background: transparent;
      border: none;
    }
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
