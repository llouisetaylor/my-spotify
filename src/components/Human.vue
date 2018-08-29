<template>
  <div class="human">
    <img
      class="human__svg"
      src="../assets/human-in-space.png"
      alt="A waving astronaut"
      :style="{transform:`translateY(${verticalPosition}px) rotate(${rotation}deg)`}"
      @mouseover="showToolTip = true"
      @mouseleave="showToolTip = false"
    />
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
      rotation: 0,
      verticalPosition: 0
    }
  },
  props: {
    name: String
  },
  created () {
    this.rotation = Math.random()*360;
    this.verticalPosition = Math.random()*(window.innerHeight*0.5);
  }
}
</script>

<style lang="scss">
  .human {
    cursor: pointer;
    position: relative;
    margin: 40px;
    transform: translatey(0px);
    animation: float 4s ease-in-out infinite;

    &__svg {
      height: 220px;
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
