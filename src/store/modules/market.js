/**
 * Initializes the state values for the market
 * @param {boolean} reset - Init from local storage if false, otherwise reset
 * to default values
 */
const getDefaultState = (reset) => {
    let hogPrice;
    let hogPriceHistory;

    const initHogPrice = 10;
    let isMarketRunning;

    if (reset) {
        isMarketRunning = true;
        hogPrice = initHogPrice;
        hogPriceHistory = [initHogPrice];
        localStorage.setItem('hogPrice', initHogPrice);
        localStorage.setItem('hogPriceHistory', JSON.stringify(hogPriceHistory));
    } else {
        isMarketRunning = false;
        hogPrice = parseInt(localStorage.getItem('hogPrice')) || initHogPrice;
        const hogPriceHistoryString = localStorage.getItem('hogPriceHistory');
        hogPriceHistory = hogPriceHistoryString != null ? JSON.parse(hogPriceHistoryString) : [initHogPrice]
    }

    return {
        market: {
            isMarketRunning,
            hog: {
                name: "Hog",
                price: hogPrice,
                priceHistory: hogPriceHistory
            }
        }
    }
}

const state = getDefaultState(false)

const getters = {
    getMarketItems(state) {
        return state.market
    },
    getMarketItemPriceHistory(state) {
        return state.market.hog.priceHistory.map((price, idx) => {
            return { idx, price }
        })
    },
}

const mutations = {
    updateHogPrice(state, hogPriceValue) {
        state.market.hog.price += hogPriceValue
        if (state.market.hog.priceHistory.length > 20)
            state.market.hog.priceHistory.shift()
        state.market.hog.priceHistory.push(state.market.hog.price)
        localStorage.setItem('hogPrice', state.market.hog.price)
        localStorage.setItem('hogPriceHistory', JSON.stringify(state.market.hog.priceHistory))
    },
    setIsMarketRunning(state, isRunning) {
        state.market.isMarketRunning = isRunning
    },
    resetMarketState(state) {
        Object.assign(state, getDefaultState(true))
    }
}

const actions = {
    initMarket({ commit, state }) {
        if (state.market.isMarketRunning)
            return;
        commit("setIsMarketRunning", true)

        const marketPriceUpdateIntervalInSec = 5
        const positiveUpdateProbability = 0.55
        const hogRange = 3

        setInterval(() => {
            const modifier = Math.sign(positiveUpdateProbability - Math.random())
            const baseValue = Math.round(hogRange * Math.random())
            let proposedChangeValue = modifier * baseValue;
            if (state.market.hog.price + proposedChangeValue <= 0)
                proposedChangeValue *= -1

            commit("updateHogPrice", proposedChangeValue)
        }, marketPriceUpdateIntervalInSec * 1000);
    },
    sellHog({ commit, rootGetters, state }) {
        if (rootGetters["resources/hogs"].value > 0) {
            commit("resources/updateHogs", -1, { root: true })
            commit("resources/updateGold", state.market.hog.price, { root: true })
        }
    },
    buyHog({ commit, rootGetters, state }) {
        if (rootGetters["resources/gold"].value >= state.market.hog.price) {
            commit("resources/updateGold", -state.market.hog.price, { root: true })
            commit("resources/updateHogs", 1, { root: true })
        }
    }
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}