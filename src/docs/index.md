---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "nicetix"
  text: "for scalebars and graphs"
  # tagline: My great project tagline
  #actions:
  #  - theme: brand
  #    text: Markdown Examples
  #    link: /markdown-examples
  #  - theme: alt
  #    text: API Examples
  #    link: /api-examples

features:
  - title: Usage
    details: The <strong>nicetix</strong> function returns an array of evenly spaced, "nice" numbers based on a given minimum, maximum, and an upper limit on the number of values you want.
  - title: Note
    details: The number of values returned may not exactly match the requested number. In some cases, it may be only half of the specified amount, but it will never exceed the requested limit.
---

```sh
$ npm install nicetix
```

```JS
import nicetix from "nicetix";
// nicetix(min, max, <num = 5>)

let ticks = nicetix(-1.23, 12.3, 7);
//-> [-2.5, 0, 2.5, 5, 7.5, 10, 12.5]
```

<script setup>
import { useTemplateRef, ref, onMounted } from 'vue'
import {Pane} from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import dvScalebar from "dv-scalebar/sfc"

import nicetix from "../nicetix.ts";

const tp = useTemplateRef('tp');
const ticks = ref([]);
const classes = ref([]);

const PARAMS = {
  range: {min: -1.23, max: 12.3},
  num: 7
};

const update = ()=>{
  let {range,num} = PARAMS;
  let {min,max} = range;

  if (min > max) [min, max] = [max, min];

  let t = nicetix(min,max,num), c;

  let min_ = t[0];
  let max_ = t[t.length-1];
  let d = max_ -min_;

  c = [0,(min-min_)/d,1-((max_-max)/d),1]

  ticks.value = t;
  classes.value = c;
}
update();

let e = 0.1

onMounted(() => {
    const pane = new Pane({ container: tp.value });
    pane.registerPlugin(EssentialsPlugin);

    let range = pane.addBinding(PARAMS, 'range', { label: "min / max" })
        .on('change', ({ value}) => {
            if (value.min == value.max) {
                    PARAMS.range.max = value.min + e;
                range.refresh();
            } else {
                update()
            }
        });
    pane.addBinding(PARAMS, 'num', { min: 3, max: 30, step: 1 }).on('change', update);

})
</script>

<div class="row">
<div id="tp" ref="tp"></div>
<div id="sb">
<dv-scalebar id="sb0" colors="hotpink,#8888,hotpink" :classes="classes" labels=",min,max," ticks/>
<dv-scalebar id="sb1" colors="transparent,transparent" :labels="ticks" ticks/>
</div>
</div>

<small>(The scalebar in this example was created with
[dv-scalebar](https://dv-scalebar.js.org/), a versatile framework-agnostic
scalebar component)</small>

<style>
.row {
  display:flex;
  flex-flow:wrap;
  gap:3em;
  margin-top:3em;
}

#tp {
  margin: auto;
}

#sb {
  align-content: center;
  position:relative;
  flex-grow:1;
  margin-top:1em;
}

#sb0 {
  position: absolute;
  color:hotpink;
  --label-offset:-22px;
  --tick-size:20;
  --tick-offset:-6px;
  --tick-size0:24;
  --tick-offset0:0;
  --tick-color0: var(--vp-c-text-2);
}

#sb1 {
  --tick-color0: transparent;
}

small {
  display:block;
  margin-top:2em;
  font-size:.7em;
  line-height:1;
  text-align:left;
  @media (min-width: 700px) {
  text-align:right;
  }
}

.tp-rotv {
  font-size: 1em !important;
  --tp-container-unit-size:30px;
  --tp-label-foreground-color:currentColor;
  --tp-input-foreground-color:currentColor;
  --tp-input-background-color: #0002;
  --tp-base-background-color: var(--vp-c-bg-soft);
}

</style>
