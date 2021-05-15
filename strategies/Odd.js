const OperationSignal ={
    Long: 0,
    Short: 1
}

const martingalas = 2
const period = 5

function run(series) {
    const results = []
    for(let i = series.close.length - (period * 2) - 1; i >= period; i--) {
        const currentMinute = (new Date(series.time[i])).getUTCMinutes()
        if(currentMinute % 5 === 0) {
            // Calculate signal from last block's middle bar
            const signal = series.close[i + 3] > series.open[i + 3] 
              ? OperationSignal.Long
              : OperationSignal.Short

            const result = evaluateEntry(i, signal, series)
            results.push(result)
        }
    }
    return JSON.stringify(results)
}

function evaluateEntry(idx, signal, series) {
    const entryResult = {timestamp: series.time[idx], success: false, tries: 0}
    for(let i = 0; i <= martingalas; i++) {
        entryResult.tries++
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
