const state = () => {
    const hogPrice = parseInt(localStorage.getItem('hogPrice')) || 10;
    const hogPriceHistoryString = localStorage.getItem('hogPriceHistory');
    const hogPriceHistory = hogPriceHistoryString != null ? JSON.parse(hogPriceHistoryString) : [10]

    return {
        market: {
            isMarketRunning: false,
            hog: {
                name: "Hog",
                price: hogPrice,
                priceHistory: hogPriceHistory
            }
        }
    }
}

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
    }
}


export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}