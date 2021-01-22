<template>
  <div>
    <Stone :type="1"></Stone>
    <Stone :type="-1"></Stone>
    <Stone :type="0"></Stone>
  </div>
</template>

<script>
import Stone from './Stone.vue';

export default {
  components: { Stone },
};
</script>
