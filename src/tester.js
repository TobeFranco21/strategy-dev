const { getSeries } = require("./series")
const { VM, VMScript } = require("vm2")
const fs = require("fs")
const path = require("path")
const _ = require("lodash")

exports.runTest = async function(strategies, testData) {
    const results = []
    try {
        for(const data of testData) {
            const series = await getSeries(data)
            for(const strat of strategies) {
                const vm = new VM({
                    timeout: 1000,
                    sandbox: {series,}
                })
                console.log(`Executing:${data}:${strat}`)
                const script = getStrategyScript(strat)
                const stratResults = JSON.parse(vm.run(script))
                if(!_.isArray(stratResults)) throw new Error("Not an Array")
                const resultItem = {
                    strategy: strat,
                    dataset: data,
                    results: stratResults
                }
                results.push(resultItem)
            }
        }
        return results
    } catch (error) {
        throw error
    }
}

function getStrategyScript(strategy) {
    const file = path.join(__dirname, "..", "strategies", strategy)
    return new VMScript(fs.readFileSync(file), file)
}
