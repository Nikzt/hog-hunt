export const actions = {
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
}