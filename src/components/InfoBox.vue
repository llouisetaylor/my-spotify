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
  $info-box-skew: 10deg;

  .info-box {
    position: absolute;
    overflow: hidden;
    width: 50%;
    right: 5vw;
    bottom: 5vh;
    border-left: $border-width solid #82B3D0;
    background: #434384;
    transform: skewX(-$info-box-skew);
    animation: expandInfoBox 800ms cubic-bezier(0.19, 1, 0.22, 1);

    &--hide {
      display: none;
    }

    &__contents {
      transform: skewX($info-box-skew);

      @media only screen and (max-width: 900px) {
        transform: none;
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

    @media only screen and (max-width: 900px) {
      width: 90%;
      height: fit-content;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      right: unset;
      animation: none;
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
