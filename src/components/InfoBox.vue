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
  $info-box-height: 300px;
  $info-box-width: 800px;
  $border-width: 10px;
  $info-box-skew: 10deg;

  .info-box {
    padding: 50px;
    box-sizing: border-box;
    width: $info-box-width;
    height: $info-box-height;

    right: 5vw;
    bottom: 5vh;
    position: absolute;

    overflow: scroll;
    border-left: $border-width solid #82B3D0;
    background: #434384;
    transform: skewX(-$info-box-skew);
    animation: expandInfoBox 800ms cubic-bezier(0.19, 1, 0.22, 1);

    h2 {
      margin: 0 0 20px 0;
    }

    &__contents {
      transform: skewX($info-box-skew);

      @media only screen and (max-width: 900px) {
        transform: none;
      }
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
    }

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
      height: $info-box-height;
    }
    100% {
      width: $info-box-width;
    }
  }
</style>
