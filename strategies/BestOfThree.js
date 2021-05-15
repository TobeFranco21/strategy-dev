// ONLY WORKS ON 1M

const OperationSignal ={
    Long: 0,
    Short: 1
}

const martingalas = 2
const period = 5

function run(series) {
    const results = []
    for(let i = series.close.length - (period - 3) - 1; i >= martingalas; i--) {
        const currentMinute = (new Date(series.time[i])).getUTCMinutes()
        if(currentMinute % 10 === 7 || currentMinute % 10 === 2) { // Is midbar of group?
            let count = 0;
            // Last block middle candles
            count += isLong(i - 6, series) ? 1 : count
            count += isLong(i - 5, series) ? 1 : count
            count += isLong(i - 4, series) ? 1 : count
            
            // Calculate signal
            const signal = count >= 2
              ? OperationSignal.Long
              : OperationSignal.Short

            const result = evaluateEntry(i, signal, series)
            results.push(result)
        }
    }
    return JSON.stringify(results)
}

function isLong(idx, series) {
    return series.close[idx] > series.open[idx]
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
