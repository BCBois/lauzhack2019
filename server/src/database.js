const fs = require('fs')

const state = []
var tid = 0

module.exports = {
    getAllThreads: () => {
        return new Promise((resolve, reject) => {
            resolve(state)
        })
    },

    createThread: (thread) => {
        thread.id = tid
        tid += 1
        state.push(thread)
    },

    createMessage: (threadID, msg) => {
        var threads = state.filter(thread => thread.id === threadID)
        threads[0].messages.push(msg)
    }
}