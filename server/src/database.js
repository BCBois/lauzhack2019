const fs = require('fs')

const state = []

module.exports = {
    getAllThreads: () => {
        return new Promise((resolve, reject) => {
            resolve(state)
        })
    },

    createThread: (thread) => {
        state.push(thread)
    },

    createMessage: (threadID, msg) => {
        var threads = state.filter(thread => thread.id === threadID)
        threads[0].messages.push(msg)
    }
}