import { createStore } from "vuex";

export const GameState = createStore({
    state() {
        return {
            hogs: 0,
        };
    },
    mutations: {
        addHog (state, hogs) {
            state.hogs += hogs;
            console.log(state.hogs)
        }
    }
})