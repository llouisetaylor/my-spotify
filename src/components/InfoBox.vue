<template>
  <div class="info-box">
    <button
      class="info-box__close-button info-box__contents"
      @click="hideAboutHuman()"
    >
        CLOSE
    </button>
    <p
      class="info-box__text info-box__contents"
      v-html="text"
    ></p>
  </div>
</template>

<script>
export default {
  name: 'infobox',
  props: {
    text: String,
    hideAboutHuman: Function
  }
}
</script>

<style lang="scss">
  .info-box {
    position: absolute;
    width: 50%;
    right: 5vw;
    bottom: 5vh;
    background: linear-gradient(-90deg,#434384 99%, #82B3D0 0px);
    transform: skewX(-10deg);
    opacity: 0.95;

    &--hide {
      display: none;
    }

    &__contents {
      transform: skewX(10deg);
    }

    &__text {
      padding: 50px;
      box-sizing: border-box;
    }

    &__close-button {
      cursor: pointer;
      position: absolute;
      z-index: 1;
      right: 0;
      top: 0;
      margin: 10px;
      background: none;
      border: none;
      font-size: 20px;
      color: white;

      &:hover {
        color: lightblue;
      }
    }
  }
</style>
