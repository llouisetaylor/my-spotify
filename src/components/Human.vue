<template>
  <div class="human">
    <button
      @click="openInfoBox(name)"
      :aria-label="`Read about ${name}`"
    >
      {{name}}
      <div :style="`animation: float ${Math.random() * 4 + 3}s ease-in-out infinite;`">
        <img
          src="../assets/human-in-space.png"
          alt=""
          :style="{transform: `rotate(${rotation}deg)`}"
        />
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'human',
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

      img {
        @media screen and (max-width:900px) {
          display: none;
        }
      }

      @media screen and (max-width:900px) {
        opacity: 0.85;
        background: #C6E2FF;
        color: black;
        width: 100%;
        font-size: 26px;
        animation: none !important;
      }
    }

    @media screen and (max-width: 900px) {
      margin: 0;
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
