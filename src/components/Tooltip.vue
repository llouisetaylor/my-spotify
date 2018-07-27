<template>
  <div class="tooltip">
    <p class="tooltip__text">{{ name }}</p>
  </div>
</template>

<script>
export default {
  name: 'tooltip',
  props: {
    name: String
  }
}
</script>

<style>
  .tooltip {
    width: 75px;
    transform: skewX(-10deg);
    margin: 10px;
    background: linear-gradient(-90deg,#838BE3 90px, #CFF1E7 0px);
    padding: 5px 10px;
  }

  .tooltip__text {
    transform: skewX(10deg);
  }
</style>
