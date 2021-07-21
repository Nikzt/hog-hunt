const state = () => {
    const hogsValue = parseInt(localStorage.getItem('hogs')) || 0;
    const goldValue = parseInt(localStorage.getItem('gold')) || 100;
    return {
        resources: {
            hogs: { name: "Hogs", value: hogsValue },
            gold: { name: "Gold", value: goldValue }
        }
    }
}

const getters = {
    resources(state) {
        return state.resources;
    },
    hogs(state) {
        return state.resources.hogs;
    },
    gold(state) {
        return state.resources.gold;
    },
}

const mutations = {
    updateHogs(state, hogsValue) {
        state.resources.hogs.value += hogsValue;
        localStorage.setItem('hogs', state.resources.hogs.value);
    },
    updateGold(state, goldValue) {
        state.resources.gold.value += goldValue
        localStorage.setItem('gold', state.resources.gold.value);
    },
}

export default {
    namespaced: true,
    state, 
    getters,
    mutations
}