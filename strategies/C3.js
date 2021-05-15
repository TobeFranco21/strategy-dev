const OperationSignal ={
    Long: 0,
    Short: 1
}

const martingalas = 2
const period = 5

function run(series) {
    const results = []
    for(let i = series.close.length - (period) - 1; i >= period; i--) {
        const currentMinute = (new Date(series.time[i])).getUTCMinutes()
        if(currentMinute % 5 === 0) {
            // Calculate signal from last block's first bar
            const signal = getType(i + period, series)

            const result = evaluateEntry(i, signal, series)
            results.push(result)
        }
    }
    return JSON.stringify(results)
}

function getType(idx, series) {
    return series.close[idx] > series.open[idx]
        ? OperationSignal.Long
        : OperationSignal.Short
}

function evaluateEntry(idx, signal, series) {
    const entryResult = {timestamp: series.time[idx], success: false, tries: 0}
    for(let i = 0; i <= martingalas; i++) {
        entryResult.tries++
        if(i > 0) {
            const signalIdx = idx - (i * 2) + period
            signal = getType(signalIdx, series)
        }
        if(signal === OperationSignal.Long) {
            entryResult.success = series.close[idx - (i * 2)] > series.open[idx - (i * 2)]
        } else {
            entryResult.success = series.close[idx - (i * 2)] < series.open[idx - (i * 2)]
        }
        if(entryResult.success) break
    }
    return entryResult
}

// *** Run/Init
run(series)

// *** Test Runs
// exports.run = run
