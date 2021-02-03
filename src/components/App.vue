<template>
  <div>
    <table>
      <tr v-for="(y, yIndex) of stones" :key="yIndex">
        <td v-for="(x, xIndex) of stones" :key="xIndex" v-on:click="onSelect(yIndex, xIndex)">
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
      turn: 1,
    };
  },
  methods: {
    onSelect: function(yIndex, xIndex) {
      if (this.stones[yIndex][xIndex] !== 0) {
        alert('すでに石が置かれています。');
        return;
      }

      this.stones[yIndex].splice(xIndex, 1, this.getCurrentStone());
      this.changeStoneRight(yIndex, xIndex);
      this.turn++;
    },
    getCurrentStone: function() {
      return this.turn % 2 ? -1 : 1;
    },
    changeStoneRight: function(yIndex, xIndex) {
      let isExist = false;
      let rightStonePosition = {yIndex,xIndex};

      for (let i = 2; i < this.size - xIndex; i++) {
        if (this.stones[yIndex][xIndex + i] === this.getCurrentStone()) {
          isExist = true;
          rightStonePosition.yIndex = yIndex;
          rightStonePosition.xIndex = xIndex + i;
          break;
        }
      }

      if (isExist) {
        let reverseStones = [];
        let stoneLength = rightStonePosition.xIndex - xIndex;
      
        for(let i = 1; i < stoneLength; i++) {
          let reverseStone = {yIndex,xIndex};

          if(this.stones[yIndex][xIndex + i] !== this.getCurrentStone()) {
            if(this.stones[yIndex][xIndex + i] === 0) {
              break;
            }else{
              reverseStone.yIndex = yIndex;
              reverseStone.xIndex = xIndex + i;
            }
          }
          reverseStones.push(reverseStone);
        }

        let reverseStonesLength = Object.keys(reverseStones).length;

        if(stoneLength - 1 === reverseStonesLength) {
          for(let i = 0; i < reverseStonesLength; i++) {
            this.stones[reverseStones[i].yIndex].splice(reverseStones[i].xIndex, 1 ,this.getCurrentStone());
          }
        }
      }
    },
  },
  created: function() {
    let stones = [];
    for (let y = 0; y < this.size; y++) {
      let row = [];
      for (let x = 0; x < this.size; x++) {
        row.push(0);
      }
      stones.push(row);
    }
    this.stones = stones;
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
