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
      size: 4,
      stones: [],
      turn: 1,
      directions: [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1],
      ],
    };
  },
  methods: {
    onSelect: function(yIndex, xIndex) {
      if (this.stones[yIndex][xIndex] !== 0) {
        alert('すでに石が置かれています。');
        return;
      }

      //隣が相手の石で、かつ自石と挟めてひっくり返せる場合、石が置ける
      let flag = false;
      this.directions.map(direction => {
        const yDirection = direction[0];
        const xDirection = direction[1];

        const canPutStone = this.checkNextStone(yIndex, xIndex, yDirection, xDirection);

        if(canPutStone) {
          flag = true;
          this.stones[yIndex].splice(xIndex, 1, this.getCurrentStone());
          this.changeStone(yIndex, xIndex, yDirection, xDirection);
          this.turn++;
        }
      });

      if (!flag) {
        console.log('置けません')
      }

      this.checkWinner();
    },
    getCurrentStone: function() {
      return this.turn % 2 ? -1 : 1;
    },
    changeStone: function(yIndex, xIndex, yDirection, xDirection) {
      let isExist = false;
      const stonePosition = { yIndex, xIndex };
      const returnStones = [];
      let gap = 0;

      for (let i = 1; i < this.size; i++) {
        const newYindex = yIndex + i * yDirection;
        const newXindex = xIndex + i * xDirection;

        if (newYindex < 0 || newYindex > this.size - 1 || newXindex < 0 || newXindex > this.size - 1) {
          break;
        }

        if (this.stones[newYindex][newXindex] === this.getCurrentStone()) {
          isExist = true;
          stonePosition.yIndex = newYindex;
          stonePosition.xIndex = newXindex;
          break;
        }

        if (this.stones[newYindex][newXindex] !== 0) {
          returnStones.push({ yIndex: newYindex, xIndex: newXindex });
        }
        gap++;
      }

      if (isExist && returnStones.length === gap) {
        returnStones.map(returnStone => {
          this.stones[returnStone.yIndex].splice(returnStone.xIndex, 1, this.getCurrentStone());
        });
        return;
      }
    },
    countStone: function() {
      const counts = {
        black: 0,
        white: 0,
      };

      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          if (this.stones[y][x] === -1) {
            counts.black++;
          } else if (this.stones[y][x] === 1) {
            counts.white++;
          }
        }
      }
      return counts;
    },
    checkWinner: function() {
      if (this.turn === this.size ** 2 + 1) {
        const counts = this.countStone();
        if (counts.black === counts.white) {
          console.log('draw');
          return;
        }
        const winner = counts.black > counts.white ? '黒' : '白';

        console.log(`${winner}の勝ちです`);
      }
    },
    createBoard: function() {
      if (this.size < 2 || this.size % 2 !== 0) {
        throw new Error('だめ');
      }

      const stones = [];
      for (let y = 0; y < this.size; y++) {
        const row = [];
        for (let x = 0; x < this.size; x++) {
          row.push(0);
        }
        stones.push(row);
      }

      const base = this.size / 2 - 1;
      for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 2; x++) {
          if (x === y) {
            stones[y + base][x + base] = 1;
          } else {
            stones[y + base][x + base] = -1;
          }
        }
      }

      this.stones = stones;
    },
    checkNextStone: function(yIndex, xIndex, yDirection, xDirection) {
      let isExist = false;
      const stonePosition = { yIndex, xIndex };
      const returnStones = [];
      let gap = 0;

      for (let i = 1; i < this.size; i++) {
        const newYindex = yIndex + i * yDirection;
        const newXindex = xIndex + i * xDirection;

        if (newYindex < 0 || newYindex > this.size - 1 || newXindex < 0 || newXindex > this.size - 1) {
          break;
        }

        if (this.stones[newYindex][newXindex] === this.getCurrentStone()) {
          isExist = true;
          stonePosition.yIndex = newYindex;
          stonePosition.xIndex = newXindex;
          break;
        }

        if (this.stones[newYindex][newXindex] !== 0) {
          returnStones.push({ yIndex: newYindex, xIndex: newXindex });
        }
        gap++;
      }

      const result = isExist && returnStones.length === gap && gap !== 0;
      return result;
    },
  },
  created: function() {
    try {
      this.createBoard();
    } catch (e) {
      console.log(e.message);
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
