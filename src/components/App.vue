<template>
  <div>
    <table>
      <tr v-for="(y,yIndex) in size" :key="yIndex">
        <td v-for="(x,xIndex) in size" :key="xIndex">
          <Stone :type="-1"></Stone>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Stone from './Stone.vue';

export default {
  components: { Stone },
  data: function() {
    return {
      size: 8,
      stones: [],
      currentStoneId: -1 //先手は黒
    }
  },
};
</script>

<style scoped>
table {
    border-collapse: collapse;
}

td {
    border: 1px solid #999;
    background: #f0f0f0;
    width: 30px;
    height: 30px;
    text-align: center;
    vertical-align: middle;
}
</style>
