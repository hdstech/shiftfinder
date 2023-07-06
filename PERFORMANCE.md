### Rudimentary performance report

- requesting 50 records: **avg ~2s**
```json
    {"durationMs":2165,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:03:01.642Z"}
    {"durationMs":2029,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:03:07.961Z"}
    {"durationMs":2003,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:03:10.995Z"}
```

- requesting 100 records: **avg ~2s**
```json
{"durationMs":2136,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:06:37.835Z"}
{"durationMs":2139,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:06:56.665Z"}
{"durationMs":1992,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:06:59.712Z"}
{"durationMs":2033,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:07:02.587Z"}
{"durationMs":1993,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:07:07.867Z"}
```

- requesting 1000 records: **avg ~2s**
```json
{"durationMs":2166,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:08:30.790Z"}
{"durationMs":1968,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:08:41.345Z"}
{"durationMs":2018,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:08:44.289Z"}
{"durationMs":2007,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:08:47.030Z"}
{"durationMs":1978,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:08:49.730Z"}
```

- requesting 100 * 1000: **avg ~2.8s**
```json
{"durationMs":2897,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:10:20.664Z"}
{"durationMs":2786,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:10:24.465Z"}
{"durationMs":2704,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:10:27.924Z"}
{"durationMs":2770,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:10:31.414Z"}
{"durationMs":2699,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:10:34.855Z"}
```

- requesting 1000 * 1000 (1 million): **avg ~10s**
```json
{"durationMs":10622,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:11:52.002Z"}
{"durationMs":10345,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:12:05.107Z"}
{"durationMs":9964,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:12:16.610Z"}
{"durationMs":9936,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:12:27.320Z"}
{"durationMs":9989,"level":"info","message":"Get shifts","timestamp":"2023-07-06T20:12:37.623Z"}
```