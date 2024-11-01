const R = [50, 25, 20, 10];
const nicetix = (
  min: number,
  max: number,
  num: number = 5,
): number[] => {
  if (
    !Number.isInteger(num) || num < 3 || Number.isNaN(min) ||
    Number.isNaN(max) || min === max
  ) return [];
  const l = Math.max(3, num);
  if (min > max) [min, max] = [max, min];

  let e = Math.pow(10, -Math.floor(Math.log10(max - min)));
  let min__: number = 0,
    max__: number = 0,
    step: number = 0,
    min_,
    max_,
    min$,
    max$;

  e: do {
    e *= 10;
    for (const r of R) {
      min_ = min * e;
      max_ = max * e;

      min$ = min_ % r;
      max$ = max_ % r;

      min_ -= min$ ? min$ > 0 ? +min$ : r + min$ : 0;
      max_ += max$ ? max$ < 0 ? -max$ : r - max$ : 0;

      if (l < (max_ - min_) / r + 1) {
        if (r == R[0]) e /= 10;
        break e;
      }
      step = r;
      min__ = min_;
      max__ = max_;
    }
  } while (true);

  if (num < 3) {
    if (step == 20) max__ += 10;
    return [min__ / e, max__ / e];
  }

  let ticks: number[] = [];

  for (let i = min__; i <= max__; i += step) {
    ticks.push(i / e);
  }

  if (ticks.length > num) { // precision-error e.g. nicetix(123456.789, 123456.789000101, 5101)
    console.warn("precision");
    return ticks.filter((_n, i) => !(i % 2) || (i == ticks.length - 1));
  }

  return ticks;
};

export default nicetix;
