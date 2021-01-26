<template>
  <div>
    <table>
      <tr v-for="(y,yIndex) of stones" :key="yIndex">
        <td v-for="(x,xIndex) of stones" :key="xIndex" v-on:click="onSelect(yIndex,xIndex)">
          <Stone :type="stones[yIndex][xIndex]"></Stone>
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
      turn: 1 //
    }
  },
  methods: {
    onSelect: function(yIndex,xIndex) {
      if(this.stones[yIndex][xIndex] != 0) {
        alert('すでに石が置かれています。')
      }else{
        let stones = JSON.parse(JSON.stringify(this.stones));
        
        if((Number(this.turn) % 2) != 0 ) {
          stones[yIndex][xIndex] = -1;
          this.changeStone(yIndex,xIndex);
        }else{
          stones[yIndex][xIndex] = 1;
        }
        this.stones = stones;
        this.turn ++;
        // console.log(this.stones,this.turn)
        // console.log(yIndex,xIndex)
      }
    },
    changeStone: function(yIndex,xIndex) {
      //TODO : 置いた石の右側だけ調べてみる
      // 右側に石がなく、番外に出た　何もしない
      // 右側が相手の石　石の座標を配列に格納　
      // 右側が自石　配列の長さが1以上の場合、配列の石を裏返す
      let reverseStones = [];
      let researchSize = this.size -1;
      console.log(researchSize,xIndex)
      // console.log(yIndex,xIndex)
      for(let i = 1; i < this.size - xIndex; i++) {
 
        if(this.stones[yIndex][xIndex + i] != this.stones[yIndex][xIndex]) {
          reverseStones.push(this.stones[yIndex][xIndex + i]);
        }else{
          break;
        }
      }
      console.log(reverseStones);
    }
  },
  created: function() {
    const stones = [];
    for(let y = 0; y < this.size; y++) {
      const row = [];
      for(let x = 0; x < this.size; x++) {
        row.push(0)
      }
      stones.push(row);
    }
    this.stones = stones;
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
