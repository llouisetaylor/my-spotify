<template>
  <div
    class="human"
    :style="`animation: float ${Math.random() * 4 + 3}s ease-in-out infinite;`"
  >
    <button
      @click="showAboutHuman(name)"
      :aria-label="`Read about ${name}`"
    >
      <img
        src="../assets/human-in-space.png"
        alt=""
        :style="{transform: `rotate(${rotation}deg)`}"
        @mouseover="showToolTip = true"
        @mouseleave="showToolTip = false"
      />
      <span class="human__button-text">{{name}}</span>
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
    margin: 0 40px;

    &__button-text {
      display: none;

      @media screen and (max-width:900px) {
        display: inline;
      }
    }

    button {
      margin-bottom: 1px;
      cursor: pointer;
      background: transparent;
      border: none;
      padding: 20px;
      box-sizing: border-box;

      img {
        @media screen and (max-width:900px) {
          display: none;
        }
      }

      @media screen and (max-width:900px) {
        opacity: 0.85;
        background: #C6E2FF;
        width: 100%;
        font-size: 26px;
      }
    }

    @media screen and (max-width: 900px) {
      margin: 0;
      animation: none;
      width: 100%;
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
