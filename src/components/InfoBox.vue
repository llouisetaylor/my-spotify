<template>
  <div class="info-box">
    <button
      class="info-box__close-button info-box__contents"
      @click="hideAboutHuman()"
    >
        CLOSE
    </button>
    <h2>{{ humanName }}</h2>
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
    humanName: String,
    text: String,
    hideAboutHuman: Function
  }
}
</script>

<style lang="scss">
  $border-width: 10px;

  .info-box {
    position: absolute;
    overflow: hidden;
    width: 50%;
    right: 5vw;
    bottom: 5vh;
    border-left: $border-width solid #82B3D0;
    background: #434384;
    transform: skewX(-10deg);
    opacity: 0.95;
    animation: expandInfoBox 800ms cubic-bezier(0.19, 1, 0.22, 1);

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

  @keyframes expandInfoBox {
    0% {
      width: 0;
      height: $border-width;
    }
    40% {
      width: 0;
      height: 20%;
    }
    100% {
      width: 50%;
      height: 20%;
    }
  }
</style>
