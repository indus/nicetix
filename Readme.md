# nicetix

The <strong>nicetix</strong> function returns an array of evenly spaced, "nice" numbers based on a given minimum, maximum, and an upper limit on the number of values you want.

**Note:** The number of values returned may not exactly match the requested number. In some cases, it may be only half of the specified amount, but it will never exceed the requested limit.

```sh
$ npm install nicetix
```

```JS
import nicetix from "nicetix";
// nicetix(min, max, <num = 5>)

let ticks = nicetix(-1.23, 12.3, 5);
// -> [-5, 0, 5, 10, 15]
```