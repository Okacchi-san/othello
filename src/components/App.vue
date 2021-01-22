<template>
  <div>
    <table>
      <tr v-for="(y,yIndex) in size" :key="yIndex">
        <td v-for="(x,xIndex) in size" :key="xIndex">
          <Stone :type="getStone(x,y)"></Stone>
        </td>
      </tr>
    </table>
    <!-- <Stone :type="1"></Stone>
    <Stone :type="-1"></Stone>
    <Stone :type="0"></Stone> -->
  </div>
</template>

<script>
import Stone from './Stone.vue';

export default {
  components: { Stone },

  data: function() {
    return {
      size: 8,
      stones: []
    }
  },
  methods: {
    initStone() {
      let stones = [];
      let size = this.size;

      for(let x = 0; x < size; x++) {
        let stoneLine = []; //縦８マス

        for(let y =0; y < size; y++) {
          stoneLine.push(0); //初期の石の値　1:白、-1；黒、0:なし
          console.log(stoneLine)
        }
          
          stones.push(stoneLine);

      }
      
      this.stones = stones;

    },
    getStone(x, y) {

      return this.stones[x-1][y-1];

    }
  },
  created() {
    this.initStone();
  }

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
