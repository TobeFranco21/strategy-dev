# StrategyDev

A test and development environment for binary options strategies.

# Get The Project

Download the repository and run:

``` console
npm install
```

You can use the lists in main.js to configure the how to run the tests by commenting some elements like so:

``` js
const testDataFiles = [
    "AUDJPY.M1.csv",
    // "AUDUSD.M5.csv",
    "EURAUD.M5.csv",
    "EURGBP.M1.csv",
    "EURJPY.M15.csv",
    "EURJPY.M1.csv",
    "EURJPY.M30.csv",
    // "EURJPY.M5.csv",
    "EURUSD.M1.csv",
    "EURUSD.M5.csv",
    "GBPUSD.M5.csv",
    "USDJPY.M5.csv",
]

const strategies = [
    "BestOfThree.js",
    "C3.js",
    "CandleDisplacement.js",
    // "MHI2.js",
    "MHI2Mayority.js",
    "MHI3.js",
    "MHI3Mayority.js",
    "MHI.js",
    // "MHIMayority.js",
    "MillionMayority.js",
    "MillionMinority.js",
    "Odd.js",
    "Pattern23.js",
    "ThreeMusketeers.js",
    "TwinTowers.js",
]
```

If you add a new **strategy** or **test file**, they need to be on the correponding folder in the root of the project.

The *testDataFiles* list references the file names of the data sources on the **testfiles** folder on the root of the project.

The *strategies* list references the file names of the strategy files on the **strategies** folder

## Strategy Structure

The strategies are executed in a Sandbox using [vm2](https://github.com/patriksimek/vm2) to avoid breaking other strategies in case of failure or infinite loops in the same ones.

The series data is provided to the Sandbox before execution and can be accessed in the global scope inside the *strategy script* with the name **series** and the following structure.

``` js
{
    time: [ ... ]   // Timestamp array
    close: [ ... ], // close prices array
    open: [ ... ],  // open prices array
    high: [ ... ],  // high prices array
    low: [ ... ],   // low prices array
}
```

In order to obtain a result from the strategy script you need to execute a function that returns the results uppon call from the root of the file, like so:

``` js
function runScript() {
    ... // Your script execution code here
    return result;
}

// Return result
runScript();
```

The result has to be an array with all the operations that took place with the provided series data as a JSON string.

Every operation object needs to have the following structure:

``` js
{
    timestamp: ... , // The timestamp for this operation
    success: ... ,   // Boolean for operation success state 
    tries: ...       // (martingalas + normal entry)
}
```

# Run The Project

Open a terminal from the root of the project and run:

``` command
npm start
```

# Strategies

The following strategies are provided as of now:

- [BestOfThree](#BestOfThree)
- [C3](#C3)
- [MHI 1, 2, & 3](<#MHI 1, 2 & 3>)
- [Million](#Million)
- [Odd](#Odd)
- [Pattern23](#Pattern23)
- [ThreeMusketeers](#ThreeMusketeers)
- [TwinTowers](#TwinTowers)

## BestOfThree

### Setup

Take the middle candle of a group of 5, groupping them every 5 minutes (e.g. 13:00 - 13:05 -> Group 1, 12:45 - 12:50 -> Group 2)

### Operative

- Take the three middle bars of a group
- Take the prominent direction (Long/Short) and take that as the signal.
- Operate in 1 minute on the middle bar of the next group in the signal direction.

## C3

### Setup

Take the middle candle of a group of 5, groupping them every 5 minutes (e.g. 13:00 - 13:05 -> Group 1, 12:45 - 12:50 -> Group 2)

### Operative

- Take the first candle of a group as the signal
- Enter on the first candle of the next block
- **On Martinagala**
	- 1st Martingala: Enter on the middle candle and take the middle candle from the last block as entry signal.
	- 2nd Martingala: Enter on the last candle of the block and take the last candle from the last block as the entry signal.

## MHI 1, 2 & 3

This is just [Million](#Million) with the last 3 candles of a group

### Setup

Take the middle candle of a group of 5, groupping them every 5 minutes (e.g. 13:00 - 13:05 -> Group 1, 12:45 - 12:50 -> Group 2)

### Operative

Determine the candle types of the last three candles in the group

- **For MH1:** Enter on the the first candle of the next block
- **For MH2:** Enter on the second candle of the next block
- **For MH3:** Enter on the third candle of the next block

### Variations

Note: The strategies of MHI default to Minority if not specified in the name.

- **Mayority:** Take the direction of the last 3 candles and operate in the direction with the **most** candles.
- **Minority:** Take the direction of the last 3 candles and operate in the direction with the **least** candles.

## Million

### Setup

Take the middle candle of a group of 5, groupping them every 5 minutes (e.g. 13:00 - 13:05 -> Group 1, 12:45 - 12:50 -> Group 2)

### Operative

- Take a full group and count the direction of the candles
- Operate at the beginning of the next block

### Variations

- **Mayority:** operate in the direction with the **most** candles.
- **Minority:** Operate in the direction with the **least** candles.

## Odd

### Setup

Take the middle candle of a group of 5, groupping them every 5 minutes (e.g. 13:00 - 13:05 -> Group 1, 12:45 - 12:50 -> Group 2)

### Operative

- Take the middle candle in a group and use it as the signal
- Enter on at the beginning of the next block for 1 candle
- **On Martingalas**
	- Enter the first martingala at the middle candle of the block
	- Enter the second martingala at the last candle of the same block.

## Pattern23

### Setup

Take the middle candle of a group of 5, groupping them every 5 minutes (e.g. 13:00 - 13:05 -> Group 1, 12:45 - 12:50 -> Group 2)

### Operative

- Take the first candle of a group and determine its type.
- Enter on the next candle in the same direction
- 2 Martingalas

## ThreeMusketeers

### Setup

Take the middle candle of a group of 5, groupping them every 5 minutes (e.g. 13:00 - 13:05 -> Group 1, 12:45 - 12:50 -> Group 2)

### Operative

-Take the middle candle in one group
- Enter at the beggining of the next candle in the same direction. 
- 2 Martingalas

## TwinTowers

### Setup

Take the middle candle of a group of 5, groupping them every 5 minutes (e.g. 13:00 - 13:05 -> Group 1, 12:45 - 12:50 -> Group 2)

### Operative

- Take the first candle in the group.
- Enter at the last candle in the same direction.
- 2 martingalas