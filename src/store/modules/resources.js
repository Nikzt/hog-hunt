
/**
 * Initializes the state values for resources.
 * @param {boolean} reset - Init from local storage if false, otherwise reset
 * to default values
 */
const getDefaultState = (reset) => {
    let hogsValue;
    let goldValue;

    const initHogsValue = 10;
    const initGoldValue = 100;

    if (reset)  {
        hogsValue = initHogsValue;
        goldValue = initGoldValue;
        localStorage.setItem('hogs', hogsValue)
        localStorage.setItem('gold', goldValue)
    } else {
        // On first load, attempt to get values from local storage
        hogsValue = parseInt(localStorage.getItem('hogs')) || initHogsValue;
        goldValue = parseInt(localStorage.getItem('gold')) || initGoldValue;
    }
    return {
        resources: {
            hogs: { name: "Hogs", value: hogsValue },
            gold: { name: "Gold", value: goldValue }
        }
    }
}

const state = getDefaultState(false);

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
    resetResourcesState(state) {
        Object.assign(state, getDefaultState(true));
    }
}

export default {
    namespaced: true,
    state, 
    getters,
    mutations
}