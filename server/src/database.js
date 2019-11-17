const fs = require('fs')

const state = []

function save() {
    fs.writeFileSync('db.json', JSON.stringify(state))
}

function load() {
    return require('./db.json')
}

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