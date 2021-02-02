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
      turn: 1,
      // flug:'',
      // reverseStones:[],
    }
  },
  methods: {
    onSelect: function(yIndex,xIndex) {
      if(this.stones[yIndex][xIndex] !== 0) {
        alert('すでに石が置かれています。');
        //ガード説
        return;
      }

      this.stones[yIndex].splice(xIndex, 1, this.getCurrentStone());
      this.changeStoneRight(yIndex,xIndex); //右側チェック
      // this.changeStoneLeft(yIndex,xIndex); // 左側チェック
      this.turn ++;
    },
    
    changeStoneRight: function(yIndex,xIndex) {
      let reverseStones = [];
      let flug = false;
      
        for(let i = 1; i < this.size - xIndex ; i++) {
          if(this.stones[yIndex][xIndex + 1] === 0) {
            break;
          }
          if(this.stones[yIndex][xIndex + i] !== this.getCurrentStone()) {
            reverseStones.push({yIndex : yIndex, xIndex : xIndex + i});
          }else{
            flug = true;
            break;
          }
        }

      if(flug) {
        reverseStones.map(i => {
          return this.stones[i.yIndex].splice(i.xIndex, 1, this.getCurrentStone());
        })
      }
    },

    // changeStoneLeft: function(yIndex,xIndex) {
    //   let reverseStones = [];
    //   let flug = false;
    //   console.log(xIndex)
    //     for(let i = xIndex - 1; i < xIndex - 1 ; i--) {

    //       if(this.stones[yIndex][xIndex - i] !== this.getCurrentStone()) {
    //         reverseStones.push({yIndex : yIndex, xIndex : xIndex - i});
    //         console.log(reverseStones)
    //       }else{
    //         flug = true;
    //         break;
    //       }
    //     }

    //   if(flug) {
    //     reverseStones.map(i => {
    //       return this.stones[i.yIndex].splice(i.xIndex, 1, this.getCurrentStone());
    //     })
    //   }
    // },




    getCurrentStone: function() {
      return this.turn % 2 !== 0 ? -1 : 1;
    }
  },
  created: function() {
    let stones = [];
    for(let y = 0; y < this.size; y++) {
      let row = [];
      for(let x = 0; x < this.size; x++) {
        row.push(0)
      }
      stones.push(row);
    }
    this.stones = stones;
    console.log(this.stones);
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
