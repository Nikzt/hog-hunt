import { createStore } from "vuex";
import { actions } from "./actions";
import { mutations } from "./mutations";
import resources from "./modules/resources";
import market from "./modules/market";

export const GameState = createStore({
    modules: {
        resources,
        market
    },
    state() {
        return {
            showModal: false,

            cooldowns: {
                "hogHuntCooldown": {
                    remainingCooldown: 10,
                    baseCooldown: 10,
                    isOnCooldown: false
                }
            },
        };
    },
    mutations,
    actions: {
        ...actions,
        reset({commit}) {
            commit("resources/resetResourcesState");
            commit("market/resetMarketState");
        }
    },
    getters: {
        getIsOnCooldown: (state) => (cdName) => {
            return state.cooldowns[cdName].isOnCooldown
        },
        getRemainingCooldown: (state) => (cdName) => {
            return state.cooldowns[cdName].remainingCooldown
        },
        getShowModal(state) {
            return state.showModal
        }
    }
})