<template>
  <div
    class="info-box"
    v-bind:class="{'info-box--hide': !showModal}"
  >
    <button
      class="info-box__close-button info-box__contents"
      v-on:click="closeModal()"
    >
        CLOSE
    </button>

    <p class="info-box__text info-box__contents">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor leo arcu, sed fermentum eros sagittis id. Cras iaculis mi sed erat accumsan, non auctor elit tristique. Aliquam congue sagittis lorem, id feugiat ante euismod at. Cras risus ex, volutpat at varius semper, scelerisque at odio. Phasellus sollicitudin ligula felis, ut sollicitudin enim semper luctus. Aliquam diam elit, tempor sed justo sit amet, congue viverra eros. Maecenas faucibus augue nisl, in scelerisque nibh pulvinar vitae. Maecenas et dapibus nibh. Sed ullamcorper eleifend posuere. Donec congue, erat dignissim lacinia tempor, purus risus aliquam purus, eu ornare urna odio nec dui. Ut in rutrum libero. Sed libero erat, interdum dignissim feugiat et, faucibus a quam. Etiam vitae molestie diam. Sed mattis finibus tincidunt.
    </p>
  </div>
</template>

<script>
export default {
  name: 'infobox',
  data () {
    return {
      showModal: true
    }
  },
  methods: {
    closeModal: function() {
      this.showModal = false
    }
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
