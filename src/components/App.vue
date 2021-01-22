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
      // console.log(this.stones[x-1][y-1])
      return this.stones[x-1][y-1]; //Q1:ここが何をしているのかわからない

    },
    copyStone() {
      return JSON.parse(JSON.stringify(this.stones));
    },
    onStoneSet(x,y) {

      if(this.stones[x-1][y-1] === 0) {

        let newStones = this.copyStone();
        newStones[x-1][y-1] = this.currentStoneId;
        this.stones = newStones;
        this.changeStone(x,y); //裏返し
        this.currentStoneId *= -1; //Q2:ここが何をしているのかわからない

      }else{
        alert('すでに石が置かれています');
      }
    },
    changeStone(x,y) {

      let movingCollection = [
        {x: -1, y: -1}, //左上
        {x: 0, y: -1}, //上
        {x: 1, y: -1}, //右上
        {x: 1, y: 0}, //右
        {x: 1, y: 1}, //右下
        {x: 0, y: 1}, //下
        {x: -1, y: 1}, //左下
        {x: -1, y: 0} //左
      ];

      let baseX = x - 1;
      let baseY = y - 1;
      let changingStoneId = this.currentStoneId * -1; //相手の石の色

      for(let i = 0; i < movingCollection.length; i++) {
        
        let moving = movingCollection[i];
        
        let checkingX = baseX;
        let checkingY = baseY;
        let changingPositions = []; //ひっくり返すかもしれない座標

        innerLoop:
          for(let j = 0; j < this.size; j++) {

            checkingX += moving.x; //movingCollection[i]のx　初項:-1
            checkingY += moving.y; //movingCollection[i]のy　初項:-1

            if(checkingX < 0 ||
                checkingY < 0 ||
                checkingX >= this.size ||
                checkingY >= this.size) {
                
                break innerLoop;
            }
            let checkingStoneId = this.stones[checkingX][checkingY];

            if(checkingStoneId == this.currentStoneId) { //自色の場合

              let newStones = this.copyStone();

              for(let k = 0; k < changingPositions.length; k++) {
                
                let changingPosition = changingPositions[k];
                let changingX = changingPosition.x;
                let changingY = changingPosition.y;
                newStones[changingX][changingY] = this.currentStoneId;
              }

              this.stones = newStones;
              break innerLoop;

            }else if(checkingStoneId == changingStoneId) { //相手色の場合
              changingPositions.push({
                x: checkingX,
                y: checkingY
              });

            }else{

              break innerLoop;
            }
          }
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
