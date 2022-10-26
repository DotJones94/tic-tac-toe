<template>
  <div class="block" @click="addPoint">
    <span v-if="player === 1">x</span>
    <span v-if="player === 2">o</span>
  </div>
</template>

<script>
export default {
  name: "tic-tac-block",
  props: {
    positionX : Number,
    positionY : Number,
  },
  data(){
    return{
      player: null,
    }
  },
  methods: {
    addPoint(){
      if(!this.player){
        this.player = this.$store.getters.getPlayer;
        this.$store.commit('changePlayer');
        this.$emit('playerMovement', { x : this.positionX, y : this.positionY});
      }

    }
  }
}
</script>

<style scoped>
  .block{
    border-radius: 10px;
    cursor: pointer;
    width: 100px;
    height: 100px;
    border: 14px solid #e35f0c99;
    font-size: 5rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .block:active{
    background: #ff9500;
  }
</style>