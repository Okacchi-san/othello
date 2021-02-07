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
      // this.changeStoneRight(yIndex, xIndex, 0, 1);
      // this.changeStoneLeft(yIndex, xIndex, 0, -1);
      // this.changeStoneTop(yIndex, xIndex, -1, 0);
      this.changeStoneBottom(yIndex, xIndex, 1, 0);
      // this.changeStoneDiagonalRightBottom(yIndex, xIndex);
      // this.changeStoneDiagonalRightTop(yIndex, xIndex);
      this.turn++;
    },
    getCurrentStone: function() {
      return this.turn % 2 ? -1 : 1;
    },
    changeStoneRight: function(yIndex, xIndex, yDirection,xDirection) {
      let isExist = false;
      let rightStonePosition = {yIndex,xIndex};

      for (let i = 2; i < this.size; i++) {
        const newYindex = yIndex + (i * yDirection);
        const newXindex = xIndex + (i * xDirection);

        if(newYindex < 0 || newYindex > this.size - 1 ||
           newXindex < 0 || newXindex > this.size - 1) {
             break;
           }
// console.log(newXindex)
        if (this.stones[newYindex][newXindex] === this.getCurrentStone()) {
          isExist = true;
          rightStonePosition.yIndex = newYindex;
          rightStonePosition.xIndex = newXindex;
          break;
        }
      }
// console.log(rightStonePosition,isExist)
      if (isExist) {
        let reverseStones = [];
        let stoneLength = (rightStonePosition.xIndex - xIndex) * xDirection;
      
        for(let i = 1; i < stoneLength; i++) {
          const newYindex = yIndex + (i * yDirection);
          const newXindex = xIndex + (i * xDirection);
          let reverseStone = {yIndex,xIndex};

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
// console.log(reverseStones)
        let reverseStonesLength = Object.keys(reverseStones).length;

        if(stoneLength - 1 === reverseStonesLength) {
          for(let i = 0; i < reverseStonesLength; i++) {
            this.stones[reverseStones[i].yIndex].splice(reverseStones[i].xIndex, 1 ,this.getCurrentStone());
          }
        }
      }
    },
    changeStoneLeft: function(yIndex, xIndex, yDirection, xDirection) {
      let isExist = false;
      let leftStonePosition = {yIndex,xIndex};

      for (let i = 2; i < this.size; i++) {
        const newYindex = yIndex + (i * yDirection);
        const newXindex = xIndex + (i * xDirection);

        if(newYindex < 0 || newYindex > this.size - 1 ||
           newXindex < 0 || newXindex > this.size - 1) {
             break;
           }
        
        if (this.stones[newYindex][newXindex] === this.getCurrentStone()) {
          isExist = true;
          leftStonePosition.yIndex = newYindex;
          leftStonePosition.xIndex = newXindex;
          break;
        }
      }

      if (isExist) {
        let reverseStones = [];
        let stoneLength = (leftStonePosition.xIndex - xIndex) * xDirection;
      
        for(let i = 1; i < stoneLength; i++) {
          const newYindex = yIndex + (i * yDirection);
          const newXindex = xIndex + (i * xDirection);
          let reverseStone = {yIndex,xIndex};

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
    changeStoneTop: function(yIndex, xIndex, yDirection, xDirection) {
      let isExist = false;
      let topStonePosition = {yIndex,xIndex};

      for (let i = 2; i < this.size; i++) {
        const newYindex = yIndex + (i * yDirection);
        const newXindex = xIndex + (i * xDirection);

        if(newYindex < 0 || newYindex > this.size - 1 ||
           newXindex < 0 || newXindex > this.size - 1) {
             break;
           }

        if (this.stones[newYindex][newXindex] === this.getCurrentStone()) {
          isExist = true;
          topStonePosition.yIndex = newYindex;
          topStonePosition.xIndex = newXindex;
          break;
        }
      }
     
      if (isExist) {
        let reverseStones = [];
        // TODO: stoneLengthの場合分け
        let stoneLength = (topStonePosition.yIndex - yIndex) * yDirection;
      
        for(let i = 1; i < stoneLength; i++) {
          const newYindex = yIndex + (i * yDirection);
          const newXindex = xIndex + (i * xDirection);
          let reverseStone = {yIndex,xIndex};

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
    changeStoneBottom: function(yIndex, xIndex, yDirection, xDirection) {
      let isExist = false;
      let bottomStonePosition = {yIndex,xIndex};

      for (let i = 2; i < this.size; i++) {
        const newYindex = yIndex + (i * yDirection);
        const newXindex = xIndex + (i * xDirection);

        if(newYindex < 0 || newYindex > this.size - 1 ||
           newXindex < 0 || newXindex > this.size - 1) {
             break;
           }

        if (this.stones[newYindex][newXindex] === this.getCurrentStone()) {
          isExist = true;
          bottomStonePosition.yIndex = newYindex;
          bottomStonePosition.xIndex = newXindex;
          break;
        }
      }
// console.log(bottomStonePosition,isExist)
      if (isExist) {
        let reverseStones = [];
        let stoneLength = (bottomStonePosition.yIndex - yIndex) * yDirection;
      
        for(let i = 1; i < stoneLength; i++) {
          const newYindex = yIndex + (i * yDirection);
          const newXindex = xIndex + (i * xDirection);
          let reverseStone = {yIndex,xIndex};

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
// console.log(reverseStones)
        let reverseStonesLength = Object.keys(reverseStones).length;

        if(stoneLength - 1 === reverseStonesLength) {
          for(let i = 0; i < reverseStonesLength; i++) {
            this.stones[reverseStones[i].yIndex].splice(reverseStones[i].xIndex, 1 ,this.getCurrentStone());
          }
        }
      }
    },
    changeStoneDiagonalRightBottom: function(yIndex, xIndex) {
      let isExist = false;
      let diagonalRightBottomStonePosition = {yIndex,xIndex};

      for (let i = 2; i < this.size - yIndex; i++) { //this.size - xIndex、yIndex < this.sizeではエラー
        if (xIndex < this.size && this.stones[yIndex + i][xIndex + i] === this.getCurrentStone()) {
          isExist = true;
          diagonalRightBottomStonePosition.yIndex = yIndex + i;
          diagonalRightBottomStonePosition.xIndex = xIndex + i;
          break;
        }
      }
      
      if (isExist) {
        let reverseStones = [];
        let stoneLength = diagonalRightBottomStonePosition.xIndex - xIndex;
      
        for(let i = 1; i < stoneLength; i++) {
          let reverseStone = {yIndex,xIndex};

          if(this.stones[yIndex + i][xIndex + i] !== this.getCurrentStone()) {
            if(this.stones[yIndex + i][xIndex + i] === 0) {
              break;
            }else{
              reverseStone.yIndex = yIndex + i;
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
    changeStoneDiagonalRightTop: function(yIndex, xIndex) {
      let isExist = false;
      let diagonalRightTopStonePosition = {yIndex,xIndex};
      let roopNum = yIndex < this.size - xIndex ? yIndex : this.size - xIndex -1;
  
      for(let i = 2 ; i <= roopNum; i++) {
        if (this.stones[yIndex - i][xIndex + i] === this.getCurrentStone()) {
          isExist = true;
          diagonalRightTopStonePosition.yIndex = yIndex - i;
          diagonalRightTopStonePosition.xIndex = xIndex + i;
          break;
        }
      }

      if (isExist) {
        let reverseStones = [];
        let stoneLength = diagonalRightTopStonePosition.xIndex - xIndex;
      
        for(let i = 1; i < stoneLength; i++) {
          let reverseStone = {yIndex,xIndex};

          if(this.stones[yIndex - i][xIndex + i] !== this.getCurrentStone()) {
            if(this.stones[yIndex - i][xIndex + i] === 0) {
              break;
            }else{
              reverseStone.yIndex = yIndex - i;
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
