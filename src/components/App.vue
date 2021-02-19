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
      notPutCount: 0,
      notPutCor: [],
    };
  },
  methods: {
    onSelect: function(yIndex, xIndex) {
      if (this.stones[yIndex][xIndex] !== 0) {
        alert('すでに石が置かれています。');
        return;
      }

      let flag = false;
      this.directions.map(direction => {
        const yDirection = direction[0];
        const xDirection = direction[1];

        const returnStones = this.getReversibleStones(yIndex, xIndex, yDirection, xDirection);

        if (returnStones.length) {
          flag = true;
          //自石を置く
          this.stones[yIndex].splice(xIndex, 1, this.getCurrentStone());
          //挟んだ相手の石をひっくり返す
          returnStones.map(returnStone => {
            this.stones[returnStone.yIndex].splice(returnStone.xIndex, 1, this.getCurrentStone());
          });

          this.turn++;
        }
      });

      if (!flag) {
        this.checkPossiblePutStone(yIndex, xIndex);
      }

      this.checkWinner();
    },
    getCurrentStone: function() {
      return this.turn % 2 ? -1 : 1;
    },
    countStone: function() {
      const counts = {
        black: 0,
        white: 0,
        empty: 0,
      };

      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          if (this.stones[y][x] === -1) {
            counts.black++;
          } else if (this.stones[y][x] === 1) {
            counts.white++;
          } else {
            counts.empty++;
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
    getReversibleStones: function(yIndex, xIndex, yDirection, xDirection) {
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
      if (gap !== returnStones.length || !isExist) {
        return [];
      }

      return returnStones;
    },
    checkPossiblePutStone: function(y, x) {
      const counts = this.countStone();
      const winner = this.getCurrentStone() !== -1 ? '黒' : '白';
      const loser = this.getCurrentStone() === -1 ? '黒' : '白';

      if (counts.empty === this.notPutCount) {
        console.log(`${loser}が置けなくなりました。${winner}の勝ちです。`);
      }

      if (!this.notPutCor.some(n => n.x === x && n.y === y)) {
        this.notPutCor.push({ y, x });
        this.notPutCount++;
      }

      console.log('ここには置けません。他の場所を探してください。');
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
