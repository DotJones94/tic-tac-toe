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

    <h3 v-if="threeInRow">Winner is: Player {{player}}!!</h3>
    <h4 v-if="!spaceToPlay && !threeInRow">Board full, reset to play again</h4>

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
      threeInRow: false,
      spaceToPlay: false,
    }
  },
  mounted(){
    this.createBoard();
  },
  computed:{
    player(){
      return this.$store.getters.getPlayer;
    },
  },
  watch:{
    gameBoard: {
      handler(newGameBoard) {
        let fullSpot = false;
        newGameBoard.forEach(row => {
          for(let i = 0; i < row.length; i++){
            if(!row[i]) fullSpot = true;
          }
        })
        this.spaceToPlay = fullSpot;
      },
      deep: true,
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
      //Check if the board is full
      if(this.spaceToPlay) {
        //Add to the board
        this.gameBoard[newPosition.x-1][newPosition.y-1] = this.player;

        //Check if winner
        this.isThreeInRow();

        if(this.threeInRow) this.restartGame();
      }
    },
    isThreeInRow(){
      let win = false;
      let player = this.$store.getters.getPlayer;

      //Check the rows
      this.gameBoard.forEach(row => {
        if(row[0] === player && row[1] === player && row[2] === player) {
          win = true;
        }
      })

      //Check the columns
      for(let i = 0; i <=3; i++){
        if(this.gameBoard[0][i] === player && this.gameBoard[1][i] === player && this.gameBoard[2][i] === player){
          win = true;
        }
      }

      //Diagonal left to right
      if(this.gameBoard[0][0] === player && this.gameBoard[1][1] === player && this.gameBoard[2][2] === player) win = true;

      //Diagonal right to left
      if(this.gameBoard[0][2] === player && this.gameBoard[1][1] === player && this.gameBoard[2][0] === player) win = true;

      this.threeInRow = win;
    }
  }
}
</script>

<style scoped>
  .tic-tac-toe{
    width: 26em;
    height: 26em;
    padding-bottom: 50px;
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