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
      directions: [
        [0, 1],[0, -1],[1, 0],[-1, 0],[1, 1],[-1, 1],[1, -1],[-1, -1],
      ],
    };
  },
  methods: {
    onSelect: function(yIndex, xIndex) {
      if (this.stones[yIndex][xIndex] !== 0) {
        alert('すでに石が置かれています。');
        return;
      }
      this.stones[yIndex].splice(xIndex, 1, this.getCurrentStone());
      this.directions.map(direction => {
        let yDirection = direction[0];
        let xDirection = direction[1];
        this.changeStone(yIndex, xIndex , yDirection , xDirection)
      });

      this.turn++;
      console.log(this.checkStone());
    },
    getCurrentStone: function() {
      return this.turn % 2 ? -1 : 1;
    },
    changeStone: function(yIndex, xIndex, yDirection, xDirection) {
      let isExist = false;
      let stonePosition = {yIndex, xIndex};

      for (let i = 2; i < this.size; i++) {
        const newYindex = yIndex + (i * yDirection);
        const newXindex = xIndex + (i * xDirection);

        if(newYindex < 0 || newYindex > this.size - 1 ||
           newXindex < 0 || newXindex > this.size - 1) {
             break;
           }

        if (this.stones[newYindex][newXindex] === this.getCurrentStone()) {
          isExist = true;
          stonePosition.yIndex = newYindex;
          stonePosition.xIndex = newXindex;
          break;
        }
      }

      if (isExist) {
        let reverseStones = [];
        let stoneLength = 
          !(yDirection) ? (stonePosition.xIndex - xIndex) * xDirection
          :(stonePosition.yIndex - yIndex) * yDirection;

        for(let i = 1; i < stoneLength; i++) {
          const newYindex = yIndex + (i * yDirection);
          const newXindex = xIndex + (i * xDirection);
          let reverseStone = {yIndex, xIndex};

          if(this.stones[newYindex][newXindex] !== this.getCurrentStone()) {
            if(this.stones[newYindex][newXindex] === 0) {
              break;
            }else{
              reverseStone.yIndex = newYindex;
              reverseStone.xIndex = newXindex;
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
    checkStone: function() {
      let counts = {
        black: 0,
        white: 0,
      }

      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          if(this.stones[y][x] === -1) {
            counts.black++;
          }else if(this.stones[y][x] === 1) {
            counts.white++;
          }
        } 
      }
      return counts;
    },
    checkWinner: function() {
      
    }
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
