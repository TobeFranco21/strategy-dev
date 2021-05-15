const readline = require("readline")
const { createReadStream } = require("fs")
const path = require("path")
const _ = require("lodash")

exports.getSeries = async function(pair) {
    const inputStream = createReadStream(path.join("testfiles", pair))
    const rl = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity
    })
    const series = { open: [], close:[], high:[], low:[], time:[] }
    for await (const line of rl) {
        const [bDateTime, bClose, bHigh, bLow, bOpen] = line.split(";")
        series.close.push(_.toNumber(bClose))
        series.open.push(_.toNumber(bOpen))
        series.high.push(_.toNumber(bHigh))
        series.low.push(_.toNumber(bLow))
        series.time.push(_.toNumber(toTimestamp(bDateTime)))
    }
    return series
}

function toTimestamp(dateTime) {
    const [date, time] = dateTime.split(" ")
    const [year, month, day] = date.split(".").map((val) => _.toInteger(val))
    const [hour, minute, seconds] = time.split(":").map((val) => _.toInteger(val))
    return Date.UTC(year, month, day, hour, minute, seconds)
}