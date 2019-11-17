const fs = require('fs')

const state = load()

function save() {
    fs.writeFile('db.json', JSON.stringify(state), (err) => { console.log("save error") })
}

function load() {
    return require('../db.json')
}

module.exports = {
    getAllThreads: () => {
        return new Promise((resolve, reject) => {
            resolve(state)
        })
    },

    createThread: (thread) => {
        state.push(thread)
        save()
    },

    createMessage: (threadID, msg) => {
        var threads = state.filter(thread => thread.id === threadID)
        threads[0].messages.push(msg)
    }
}