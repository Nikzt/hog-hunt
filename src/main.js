import { createApp } from 'vue';
import { createStore } from "vuex";
//import {GameState} from './stores/GameState'
import App from './App.vue'

const GameState = createStore({
    state() {
        return {
            hogs: 0,
        };
    },
    mutations: {
        addHog (state, hogs) {
            state.hogs += hogs;
            console.log(state.hogs);
        }
    }
})

const app = createApp(App).use(GameState);

app.mount('#app');
