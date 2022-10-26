import { createStore } from "vuex";

export default createStore({
    state () {
        return {
            player: 1
        }
    },
    mutations: {
        changePlayer (state) {
            if(state.player === 1) state.player = 2
            else state.player = 1;
        }
    },
    getters: {
        getPlayer(state){
            return state.player;
        }
    }
})