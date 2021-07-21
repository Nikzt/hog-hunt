export const mutations = {
    setIsOnCooldown(state, cooldownPayload) {
        state.cooldowns[cooldownPayload.name].isOnCooldown = cooldownPayload.isOnCooldown
    },
    resetCooldown(state, cooldownName) {
        state.cooldowns[cooldownName].remainingCooldown = state.cooldowns[cooldownName].baseCooldown
    },
    decrementCooldown(state, cooldownName) {
        state.cooldowns[cooldownName].remainingCooldown--
    },
    toggleModal(state) {
        state.showModal = !state.showModal
    }

}