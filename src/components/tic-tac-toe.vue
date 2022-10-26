<template>
  <div>
    <h1>Tic Tac Toe</h1>

    <h2> Player: {{ player }}</h2>

    <div class="tic-tac-toe" :key="gameNumber">
      <div v-for="row in 3" :key="row" class="row">
        <div v-for="column in 3" :key="column">
          <tic-tac-block
              :position-x="row"
              :position-y="column"
              @playerMovement="updateGameBoard"/>
        </div>
      </div>
    </div>

    <button @click="restartGame">Reset</button>
  </div>
</template>

<script>
import TicTacBlock from "./tic-tac/tic-tac-block";
export default {
  name: "tic-tac-toe",
  components: {TicTacBlock},
  data(){
    return{
      gameNumber: 0,
      gameBoard: [],
    }
  },
  mounted(){
    this.createBoard();
  },
  computed:{
    player(){
      return this.$store.getters.getPlayer;
    }
  },
  methods:{
    createBoard(){
      this.gameBoard =[];
      for(let i=0; i< 3; i++){
          this.gameBoard.push(Array(3));
      }
    },
    restartGame(){
      this.gameNumber++;
      this.createBoard();
    },
    updateGameBoard(newPosition){
      //Add to the board
      this.gameBoard[newPosition.x-1][newPosition.y-1] = this.player;
    },
    isBoardFull(){
      this.gameBoard.forEach(row => {
        row.forEach(item => {
          if(item){
            return true;
          }
        })
      })
      return false;
    },
    isThreeInRow(){
      let win = null;
      let player = this.$store.getters.getPlayer;

      for(let i = 0; i <=3; i++){
        win = true;
        for(let j = 0; i <=3; j++){
          if(this.gameBoard[i][j] !== player) {
            win = false;
            break;
          }
          if(win) return win;
        }
      }

      for(let i = 0; i <=3; i++){
        win = true;
        for(let j = 0; i <=3; j++){
          if(this.gameBoard[j][i] !== player) {
            win = false;
            break;
          }
          if(win) return win;
        }
      }


    }
  }
}
</script>

<style scoped>
  .tic-tac-toe{
    margin-left: 34.5vw;
    padding-bottom: 50px;
    width: 30vw;
    gap: 5px;
  }
  .row{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-bottom: 10px;
  }
  button{
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
</style>