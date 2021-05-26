import { createStore } from "vuex";

export const GameState = createStore({
    state() {
        return {
            resources: {
                hogs: { name: "Hogs", value: 0 },
                gold: { name: "Gold", value: 100 }
            },
            cooldowns: {
                "hogHuntCooldown": {
                    remainingCooldown: 10,
                    baseCooldown: 10,
                    isOnCooldown: false
                }
            },
            market: {
                hog: {
                    name: "Hog",
                    price: 10,
                    priceHistory: [10]
                }
            }
        };
    },
    mutations: {
        updateHogs(state, hogsValue) {
            state.resources.hogs.value += hogsValue;
        },
        updateGold(state, goldValue) {
            state.resources.gold.value += goldValue
        },
        setIsOnCooldown(state, cooldownPayload) {
            state.cooldowns[cooldownPayload.name].isOnCooldown = cooldownPayload.isOnCooldown
        },
        resetCooldown(state, cooldownName) {
            state.cooldowns[cooldownName].remainingCooldown = state.cooldowns[cooldownName].baseCooldown
        },
        decrementCooldown(state, cooldownName) {
            state.cooldowns[cooldownName].remainingCooldown--
        },
        updateHogPrice(state, hogPriceValue) {
            state.market.hog.price += hogPriceValue
            state.market.hog.priceHistory.push(hogPriceValue)
        }
    },
    actions: {
        hogHunt({ commit, state }) {
            const cdName = "hogHuntCooldown";
            const cd = state.cooldowns[cdName];
            if (cd.isOnCooldown)
                return;

            commit("setIsOnCooldown", { name: cdName, isOnCooldown: true })
            commit("resetCooldown", cdName)
            const cooldownTimer = setInterval(() => {
                commit("decrementCooldown", cdName)

                if (cd.remainingCooldown <= 0) {
                    commit("setIsOnCooldown", { name: cdName, isOnCooldown: false })
                    commit("updateHogs", Math.round(5 * Math.random()))
                    clearInterval(cooldownTimer)
                }
            }, 1000)
        },
        sellHog({ commit, state }) {
            if (state.resources.hogs.value > 0) {
                commit("updateHogs", -1)
                commit("updateGold", state.market.hog.price)
            }
        },
        buyHog({ commit, state }) {
            if (state.resources.gold.value >= state.market.hog.price) {
                commit("updateGold", -state.market.hog.price)
                commit("updateHogs", 1)
            }
        },
        initMarket({ commit, state }) {
            setInterval(() => {
                const modifier = Math.sign(0.55 - Math.random())
                const baseValue = Math.round(10 * Math.random())
                let proposedChangeValue = modifier * baseValue;
                if (state.market.hog.price + proposedChangeValue <= 0)
                    proposedChangeValue *= -1

                commit("updateHogPrice", proposedChangeValue)
            }, 10000);
        }
    },
    getters: {
        resources(state) {
            return state.resources;
        },
        hogs(state) {
            return state.resources.hogs;
        },
        gold(state) {
            return state.resources.gold;
        },
        getIsOnCooldown: (state) => (cdName) => {
            return state.cooldowns[cdName].isOnCooldown
        },
        getRemainingCooldown: (state) => (cdName) => {
            return state.cooldowns[cdName].remainingCooldown
        },
        getMarketItems(state) {
            return state.market
        },
        getMarketItemPriceHistory(state) {
            return state.market.hog.priceHistory.map((price, idx) => {
                return {idx, price}
            })
        }
    }
})