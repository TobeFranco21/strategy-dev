const { runTest } = require("./src/tester")
const _ = require("lodash")

const testDataFiles = [
    "AUDJPY.M1.csv",
    "AUDUSD.M5.csv",
    "EURAUD.M5.csv",
    "EURGBP.M1.csv",
    "EURJPY.M15.csv",
    "EURJPY.M1.csv",
    "EURJPY.M30.csv",
    "EURJPY.M5.csv",
    "EURUSD.M1.csv",
    "EURUSD.M5.csv",
    "GBPUSD.M5.csv",
    "USDJPY.M5.csv",
]

const strategies = [
    "BestOfThree.js",
    "C3.js",
    "CandleDisplacement.js",
    "MHI2.js",
    "MHI2Mayority.js",
    "MHI3.js",
    "MHI3Mayority.js",
    "MHI.js",
    "MHIMayority.js",
    "MillionMayority.js",
    "MillionMinority.js",
    "Odd.js",
    "Pattern23.js",
    "ThreeMusketeers.js",
    "TwinTowers.js",
]

runTest(strategies, testDataFiles).then(results => {
    // Result Count
    const display = _.map(results, itm => {
        return ({
            dataset: itm.dataset,
            strategy: itm.strategy,
            resultCount: itm.results.length
        })
    })
    console.table(display)
})

