// -*- coding: utf-8, tab-width: 2 -*-


function ifFun(x, d) { return ((typeof x) === 'function' ? x : d); }


const EX = function makeTimer(opt) {
  const tmr = Object.create(EX.protoTimer);
  tmr.triggerNow = tmr.triggerNow.bind(tmr);
  tmr.ST = {
    tmo: null,
    maybeAgain() { if (tmr.again) { tmr.once(); } },
  };
  Object.assign(tmr, EX.defaultConfig, opt);
  return tmr;
};


EX.defaultConfig = {
  task: false,
  intervalMs: 60e3,
  name: 'unnamed timer',
  again: true,
  important: true,
};
Object.freeze(EX.defaultConfig);


EX.protoTimer = (function n3w() {
  const Cls = class SwitchableCleanupTimer {};
  return new Cls();
}());


Object.assign(EX.protoTimer, {

  ...EX.defaultConfig,

  toString() { return '[CleanupTimer ' + this.name + ']'; },

  once() {
    const st = this.ST;
    if (!st.tmo) {
      st.tmo = setTimeout(this.triggerNow, this.intervalMs);
      this.applyImportance();
    }
    return this;
  },

  enable() {
    this.again = true;
    this.once();
    return this;
  },

  disable() {
    this.again = false;
    return this.unschedule();
  },


  unschedule() {
    const st = this.ST;
    if (st.tmo) { clearTimeout(st.tmo); }
    st.tmo = null;
    return this;
  },


  restart() {
    const { tmo } = (this.ST || false);
    if (tmo && ifFun(tmo.refresh)) {
      tmo.refresh();
      return this;
    }
    this.unschedule();
    this.once();
    return this;
  },


  triggerNow() {
    const tmr = this;
    tmr.unschedule();
    const res = ifFun(tmr.task, Boolean).call(tmr);
    const may = res.ST.maybeAgain;
    if (res && ifFun(res.then)) {
      res.then(may);
    } else {
      may();
    }
    return tmr;
  },


  applyImportance(im) {
    const { tmo } = this.ST;
    if (im !== undefined) { this.important = im; }
    if (tmo) {
      try {
        if (this.important) { tmo.ref(); } else { tmo.unref(); }
      } finally { /* probably unsupported */ }
    }
    return this;
  },



});
Object.freeze(EX.protoTimer);
















export default EX;
