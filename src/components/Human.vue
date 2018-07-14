<template>
  <div class="human">
    <img
      class="human__svg"
      src="../assets/human-in-space.png"
      alt="A waving astronaut"
      @mouseover="showToolTip = true"
      @mouseleave="showToolTip = false"
    />
    <div v-show="showToolTip" class="human__tooltip">
      <div class="human__tooltip-contents">
        <p>{{ name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'human',
  data () {
    return {
      showToolTip: false
    }
  },
  props: {
    name: String
  }
}
</script>

<style scoped>
  .human {
    position: relative;
    margin: 40px;
  }

  .human__tooltip {
    position: absolute;
    z-index: 1;
    margin: 10px;
    background-color: #5F5980;
    padding: 5px 10px;
    transform: skewX(-10deg);
  }

  .human__tooltip-contents {
    transform: skewX(10deg);
  }

  .human__svg {
    height: 160px;
  }
</style>
