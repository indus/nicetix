# nicetix

The **nicetix** function returns an array of evenly spaced, "nice" numbers based on a given minimum, maximum, and an upper limit on the number of values you want.

**Note:** The number of values returned may not exactly match the requested number. In some cases, it may be only half of the specified amount, but it will never exceed the requested limit.

```sh
$ npm install nicetix
```

```JS
import nicetix from "nicetix";
// nicetix(min, max, <num = 5>)

let ticks = nicetix(-1.23, 12.3, 7);
//-> [-2.5, 0, 2.5, 5, 7.5, 10, 12.5]
```