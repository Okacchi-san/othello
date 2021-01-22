<template>
  <div>
    <table>
      <tr v-for="(y,yIndex) in size" :key="yIndex">
        <td v-for="(x,xIndex) in size" :key="xIndex" v-on:click="onStoneSet(x,y)">
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
      stones: [],
      currentStoneId: -1 //先手は黒
    }
  },
  methods: {
    initStone() {
      let stones = [];
      let size = this.size;

      for(let x = 0; x < size; x++) {
        let stoneLine = []; //縦size行

        for(let y =0; y < size; y++) {
          stoneLine.push(0); //初期の石の値　1:白、-1；黒、0:なし
          //横size列
        }
          
          stones.push(stoneLine);

      }
      
      this.stones = stones; //縦size行 x 横size列の盤面を作成(初期値：0)

    },
    getStone(x, y) {
      console.log(this.stones[x-1][y-1])
      return this.stones[x-1][y-1];

    },
    copyStone() {
      return JSON.parse(JSON.stringify(this.stones));
    },
    onStoneSet(x,y) {

      if(this.stones[x-1][y-1] === 0) {
        let newStones = this.copyStone();
        newStones[x-1][y-1] = this.currentStoneId;
        this.stones = newStones;
        this.currentStoneId *= -1;

      }else{
        alert('すでに石が置かれています');
      }
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
