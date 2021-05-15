// const { run } = require("./strategies/TwinTowers")
// const test = "TwinTowers"
// const { run } = require("./strategies/HMI")
// const test = "HMI"
// const { run } = require("./strategies/ThreeMusketeers")
// const test = "ThreeMusketeers"
// const { run } = require("./strategies/BestOfThree")
// const test = "BestOfThree"
// const { run } = require("./strategies/Odd")
// const test = "Odd"
// const { run } = require("./strategies/Pattern23")
// const test = "Pattern23"
// const { run } = require("./strategies/C3")
// const test = "C3"

const testFiles = [
  "AUDJPY.M1.csv",
  // "AUDUSD.M5.csv",
  // "EURAUD.M5.csv",
  "EURGBP.M1.csv",
  // "EURJPY.M15.csv",
  "EURJPY.M1.csv",
  // "EURJPY.M30.csv",
  // "EURJPY.M5.csv",
  "EURUSD.M1.csv",
  // "EURUSD.M5.csv",
  // "GBPUSD.M5.csv",
  // "USDJPY.M5.csv"
]
const { getSeries } = require("./src/series")

for(file of testFiles) {
  getSeries(file).then(
    series => {
      let results = JSON.parse(run(series))
      console.log(file)
      console.log(test)
      console.table(results)

    }
  )
}
