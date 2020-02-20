<template>
  <div class="human">
    <button
      @click="openInfoBox(name)"
      :aria-label="`Read about ${name}`"
    >
      {{name}}
      <div :style="`animation: float ${Math.random() * 4 + 3}s ease-in-out infinite;`">
        <Astronaut :style="{transform: `rotate(${rotation}deg)`}"/>
      </div>
    </button>
  </div>
</template>

<script>
import Astronaut from '../assets/human-in-space.svg'

export default {
  name: 'human',
  components: {
    Astronaut
  },
  data () {
    return {
      rotation: 0
    }
  },
  props: {
    name: String,
    openInfoBox: Function
  },
  created () {
    this.rotation = Math.random() * 90 - 45;
  }
}
</script>

<style lang="scss">
  .human {
    display: flex;
    flex-direction: column;
    align-items: center;
    display: inline-block;
    position: relative;
    margin: 0 40px;

    &:hover {
      .human__left-arm {
        transform-origin: 20% 40%;
        animation: wave 300ms 2;
      }
    }

    button {
      cursor: pointer;
      margin-bottom: 1px;
      padding: 20px;
      box-sizing: border-box;

      background: transparent;
      border: none;
      font-size: 16px;
      font-weight: bold;
      color: lighten(#c6e2ff, 20%);
    }

    @media screen and (max-width: 525px) {
      margin: 0;
      min-width: 100vw;
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

  @keyframes wave {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0);
    }
  }
</style>
