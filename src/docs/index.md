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

let ticks = nicetix(-1.23, 12.3, 5);
// -> [-5, 0, 5, 10, 15]
```

<script setup>
import { useTemplateRef, ref, onMounted } from 'vue'
import {Pane} from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import dvScalebar from "dv-scalebar/sfc"

import nicetix from "../nicetix.ts";

const tp = useTemplateRef('tp');
const ticks = ref([1,2,34]);
const classes = ref([0,0.1,0.9,1]);

const PARAMS = {
  range: {min: -1.23, max: 12.3},
  num: 5
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
<hr>
<div class="row">
<div id="tp" ref="tp"></div>
<div id="sb">
<dv-scalebar id="sb0" colors="hotpink,#00000088,hotpink" :classes="classes" labels=",min,max," ticks/>
<dv-scalebar id="sb1" colors="transparent,transparent" :labels="ticks" ticks/>
</div>
</div>

<style>
.row {
  display:flex;
  flex-flow:wrap;
  gap:3em;
}

#tp {
  margin: auto;
}

#sb {
  align-content: center;
  position:relative;
  flex-grow:1;
}

#sb0 {
  position: absolute;
  color:hotpink;
  --label-offset:-22px;
  --tick-size:20;
  --tick-offset:-6px;
  --tick-size0:28;
  --tick-offset0:0;
  --tick-color0: #fff;
}

</style>
