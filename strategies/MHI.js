const OperationSignal ={
    Long: 0,
    Short: 1
}

const martingalas = 2
const period = 3

function run(series) {
    const results = []
    for(let i = series.close.length - period - 1; i >= martingalas; i--) {
        const currentMinute = (new Date(series.time[i])).getUTCMinutes()
        if(currentMinute % 5 === 0) {
            let count = 0
            for(let j = i + 1; j <= i + period; j++) {
                count += series.close[j] > series.open[j] ? -1 : 1
            }
            const signal = count > 0 ? OperationSignal.Long : OperationSignal.Short
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
            entryResult.success = series.close[idx - i] > series.open[idx - i]
        } else {
            entryResult.success = series.close[idx - i] < series.open[idx - i]
        }
        if(entryResult.success) break
    }
    return entryResult
}

// *** Run/Init
run(series)

// *** Test Runs
// exports.run = run
