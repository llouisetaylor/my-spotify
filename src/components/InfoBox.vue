<template>
  <div
    class="mask"
    @click="closeInfoBox()"
  >
    <div
      class="info-box"
      role="dialog"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-body"
      @click.stop
    >
    <div class="info-box__inner">
      <button
        id="close-button"
        class="info-box__close-button info-box__text"
        @click="closeInfoBox()"
      >
          CLOSE
      </button>
        <div class="info-box__content">
          <h2 id="dialog-title">{{ humanName }}</h2>
          <p
            id="dialog-body"
            class="info-box__text info-box__text"
            v-html="text"
          ></p>
          <a 
            :v-if="typeof wikiPageId === Number"
            :href="`http://en.wikipedia.org/?curid=${wikiPageId}`" 
            class="info-box__link"
          >
            Find out more on Wikipedia
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'infobox',
  data() {
    return {
      focusedElBeforeOpen: {}
    };
  },
  props: {
    humanName: String,
    text: String,
    wikiPageId: Number,
    closeInfoBox: Function
  },
  mounted() {
    this.focusedElBeforeOpen = document.activeElement;
    document.addEventListener('keydown', this.handleKeyDown);
    document.getElementById('close-button').focus();
  },
  methods: {
    handleKeyDown(e) {
      switch (e.keyCode) {
        case 27:
          this.closeInfoBox();
          break;
        case 9:
          e.preventDefault();
          document.getElementById('close-button').focus();
          break;
        default:
          break;
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeyDown);
  },
  destroyed() {
    this.focusedElBeforeOpen.focus();
  }
};
</script>

<style lang="scss">
$info-box-height: 300px;
$info-box-height-mobile: 400px;
$info-box-width: 800px;
$info-box-width-mobile: 90vw;
$border-width: 10px;
$info-box-skew: 10deg;

.mask {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 30, .5);
  transition: opacity .3s ease;
}

.info-box {
  overflow: hidden;
  right: 5vw;
  bottom: 5vh;
  position: absolute;
  z-index: 2;

  border-left: $border-width solid #82b3d0;
  background: #434384;
  transform: skewX(-$info-box-skew);
  animation: expandInfoBox 800ms cubic-bezier(0.19, 1, 0.22, 1);

  h2 {
    margin: 0 0 20px 0;
  }

  &__text {
    transform: skewX($info-box-skew);

    @media only screen and (max-width: 900px) {
      transform: none;
    }
  }

  &__link {
    font-size: 14px;
  }

  &__inner {
    position: relative;
    max-width: 100%;
    width: $info-box-width;
    height: $info-box-height;

    @media only screen and (max-width: 900px) {
      height: unset;
    }
  }

  &__content {
    max-height: 100%;
    padding: 50px;
    box-sizing: border-box;
    overflow: scroll;
  }

  &__close-button {
    cursor: pointer;
    position: absolute;
    z-index: 3;
    right: 0;
    top: 0;
    margin: 10px;
    background: none;
    border: none;
    font-size: 20px;
    color: white;
  }

  @media only screen and (max-width: 900px) {
    height: $info-box-height-mobile;
    width: $info-box-width-mobile;
    right: unset;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    overflow-y: scroll;
    animation: expandInfoBoxMobile 800ms cubic-bezier(0.19, 1, 0.22, 1);
  }
}

@keyframes expandInfoBox {
  0% {
    width: 0;
    height: $border-width;
    padding: 0;
  }
  40% {
    width: 0;
    height: $info-box-height;
    padding: 0;
  }
  100% {
    width: $info-box-width;
  }
}

@keyframes expandInfoBoxMobile {
  0% {
    width: 0;
    height: $border-width;
    padding: 0;
  }
  40% {
    width: 0;
    height: $info-box-height-mobile;
    padding: 0;
  }
  100% {
    width: $info-box-width-mobile;
  }
}
</style>
