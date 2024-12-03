(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) {
    return;
  }
  for (const o of document.querySelectorAll("link[rel=\"modulepreload\"]")) {
    n(o);
  }
  new MutationObserver(o => {
    for (const l of o) {
      if (l.type === "childList") {
        for (const i of l.addedNodes) {
          if (i.tagName === "LINK" && i.rel === "modulepreload") {
            n(i);
          }
        }
      }
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function r(o) {
    const l = {};
    if (o.integrity) {
      l.integrity = o.integrity;
    }
    if (o.referrerPolicy) {
      l.referrerPolicy = o.referrerPolicy;
    }
    if (o.crossOrigin === "use-credentials") {
      l.credentials = "include";
    } else if (o.crossOrigin === "anonymous") {
      l.credentials = "omit";
    } else {
      l.credentials = "same-origin";
    }
    return l;
  }
  function n(o) {
    if (o.ep) {
      return;
    }
    o.ep = true;
    const l = r(o);
    fetch(o.href, l);
  }
})();
var $ = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function Rf(e) {
  if (e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")) {
    return e.default;
  } else {
    return e;
  }
}
function Lf(e) {
  if (e.__esModule) {
    return e;
  }
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      if (this instanceof n) {
        return Reflect.construct(t, arguments, this.constructor);
      } else {
        return t.apply(this, arguments);
      }
    };
    r.prototype = t.prototype;
  } else {
    r = {};
  }
  Object.defineProperty(r, "__esModule", {
    value: true
  });
  Object.keys(e).forEach(function (n) {
    var o = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, o.get ? o : {
      enumerable: true,
      get: function () {
        return e[n];
      }
    });
  });
  return r;
}
var es = {
  exports: {}
};
var R0 = {};
var ts = {
  exports: {}
};
var Q = {};
/**
* @license React
* react.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Dn = Symbol.for("react.element");
var Tf = Symbol.for("react.portal");
var Hf = Symbol.for("react.fragment");
var Of = Symbol.for("react.strict_mode");
var jf = Symbol.for("react.profiler");
var If = Symbol.for("react.provider");
var Mf = Symbol.for("react.context");
var Uf = Symbol.for("react.forward_ref");
var Wf = Symbol.for("react.suspense");
var $f = Symbol.for("react.memo");
var Vf = Symbol.for("react.lazy");
var uu = Symbol.iterator;
function Qf(e) {
  if (e === null || typeof e != "object") {
    return null;
  } else {
    e = uu && e[uu] || e["@@iterator"];
    if (typeof e == "function") {
      return e;
    } else {
      return null;
    }
  }
}
var rs = {
  isMounted: function () {
    return false;
  },
  enqueueForceUpdate: function () {},
  enqueueReplaceState: function () {},
  enqueueSetState: function () {}
};
var ns = Object.assign;
var os = {};
function Pr(e, t, r) {
  this.props = e;
  this.context = t;
  this.refs = os;
  this.updater = r || rs;
}
Pr.prototype.isReactComponent = {};
Pr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) {
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  }
  this.updater.enqueueSetState(this, e, t, "setState");
};
Pr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ls() {}
ls.prototype = Pr.prototype;
function bl(e, t, r) {
  this.props = e;
  this.context = t;
  this.refs = os;
  this.updater = r || rs;
}
var ei = bl.prototype = new ls();
ei.constructor = bl;
ns(ei, Pr.prototype);
ei.isPureReactComponent = true;
var au = Array.isArray;
var is = Object.prototype.hasOwnProperty;
var ti = {
  current: null
};
var us = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
function as(e, t, r) {
  var n;
  var o = {};
  var l = null;
  var i = null;
  if (t != null) {
    if (t.ref !== undefined) {
      i = t.ref;
    }
    if (t.key !== undefined) {
      l = "" + t.key;
    }
    for (n in t) {
      if (is.call(t, n) && !us.hasOwnProperty(n)) {
        o[n] = t[n];
      }
    }
  }
  var a = arguments.length - 2;
  if (a === 1) {
    o.children = r;
  } else if (a > 1) {
    var c = Array(a);
    for (var u = 0; u < a; u++) {
      c[u] = arguments[u + 2];
    }
    o.children = c;
  }
  if (e && e.defaultProps) {
    a = e.defaultProps;
    for (n in a) {
      if (o[n] === undefined) {
        o[n] = a[n];
      }
    }
  }
  return {
    $$typeof: Dn,
    type: e,
    key: l,
    ref: i,
    props: o,
    _owner: ti.current
  };
}
function Kf(e, t) {
  return {
    $$typeof: Dn,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner
  };
}
function ri(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Dn;
}
function qf(e) {
  var t = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + e.replace(/[=:]/g, function (r) {
    return t[r];
  });
}
var su = /\/+/g;
function J0(e, t) {
  if (typeof e == "object" && e !== null && e.key != null) {
    return qf("" + e.key);
  } else {
    return t.toString(36);
  }
}
function Zn(e, t, r, n, o) {
  var l = typeof e;
  if (l === "undefined" || l === "boolean") {
    e = null;
  }
  var i = false;
  if (e === null) {
    i = true;
  } else {
    switch (l) {
      case "string":
      case "number":
        i = true;
        break;
      case "object":
        switch (e.$$typeof) {
          case Dn:
          case Tf:
            i = true;
        }
    }
  }
  if (i) {
    i = e;
    o = o(i);
    e = n === "" ? "." + J0(i, 0) : n;
    if (au(o)) {
      r = "";
      if (e != null) {
        r = e.replace(su, "$&/") + "/";
      }
      Zn(o, t, r, "", function (u) {
        return u;
      });
    } else if (o != null) {
      if (ri(o)) {
        o = Kf(o, r + (!o.key || i && i.key === o.key ? "" : ("" + o.key).replace(su, "$&/") + "/") + e);
      }
      t.push(o);
    }
    return 1;
  }
  i = 0;
  n = n === "" ? "." : n + ":";
  if (au(e)) {
    for (var a = 0; a < e.length; a++) {
      l = e[a];
      var c = n + J0(l, a);
      i += Zn(l, t, r, c, o);
    }
  } else {
    c = Qf(e);
    if (typeof c == "function") {
      e = c.call(e);
      a = 0;
      while (!(l = e.next()).done) {
        l = l.value;
        c = n + J0(l, a++);
        i += Zn(l, t, r, c, o);
      }
    } else if (l === "object") {
      t = String(e);
      throw Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    }
  }
  return i;
}
function Ln(e, t, r) {
  if (e == null) {
    return e;
  }
  var n = [];
  var o = 0;
  Zn(e, n, "", "", function (l) {
    return t.call(r, l, o++);
  });
  return n;
}
function Gf(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t();
    t.then(function (r) {
      if (e._status === 0 || e._status === -1) {
        e._status = 1;
        e._result = r;
      }
    }, function (r) {
      if (e._status === 0 || e._status === -1) {
        e._status = 2;
        e._result = r;
      }
    });
    if (e._status === -1) {
      e._status = 0;
      e._result = t;
    }
  }
  if (e._status === 1) {
    return e._result.default;
  }
  throw e._result;
}
var Fe = {
  current: null
};
var Jn = {
  transition: null
};
var Xf = {
  ReactCurrentDispatcher: Fe,
  ReactCurrentBatchConfig: Jn,
  ReactCurrentOwner: ti
};
function ss() {
  throw Error("act(...) is not supported in production builds of React.");
}
Q.Children = {
  map: Ln,
  forEach: function (e, t, r) {
    Ln(e, function () {
      t.apply(this, arguments);
    }, r);
  },
  count: function (e) {
    var t = 0;
    Ln(e, function () {
      t++;
    });
    return t;
  },
  toArray: function (e) {
    return Ln(e, function (t) {
      return t;
    }) || [];
  },
  only: function (e) {
    if (!ri(e)) {
      throw Error("React.Children.only expected to receive a single React element child.");
    }
    return e;
  }
};
Q.Component = Pr;
Q.Fragment = Hf;
Q.Profiler = jf;
Q.PureComponent = bl;
Q.StrictMode = Of;
Q.Suspense = Wf;
Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Xf;
Q.act = ss;
Q.cloneElement = function (e, t, r) {
  if (e == null) {
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  }
  var n = ns({}, e.props);
  var o = e.key;
  var l = e.ref;
  var i = e._owner;
  if (t != null) {
    if (t.ref !== undefined) {
      l = t.ref;
      i = ti.current;
    }
    if (t.key !== undefined) {
      o = "" + t.key;
    }
    if (e.type && e.type.defaultProps) {
      var a = e.type.defaultProps;
    }
    for (c in t) {
      if (is.call(t, c) && !us.hasOwnProperty(c)) {
        n[c] = t[c] === undefined && a !== undefined ? a[c] : t[c];
      }
    }
  }
  var c = arguments.length - 2;
  if (c === 1) {
    n.children = r;
  } else if (c > 1) {
    a = Array(c);
    for (var u = 0; u < c; u++) {
      a[u] = arguments[u + 2];
    }
    n.children = a;
  }
  return {
    $$typeof: Dn,
    type: e.type,
    key: o,
    ref: l,
    props: n,
    _owner: i
  };
};
Q.createContext = function (e) {
  e = {
    $$typeof: Mf,
    _currentValue: e,
    _currentValue2: e,
    _threadCount: 0,
    Provider: null,
    Consumer: null,
    _defaultValue: null,
    _globalName: null
  };
  e.Provider = {
    $$typeof: If,
    _context: e
  };
  return e.Consumer = e;
};
Q.createElement = as;
Q.createFactory = function (e) {
  var t = as.bind(null, e);
  t.type = e;
  return t;
};
Q.createRef = function () {
  return {
    current: null
  };
};
Q.forwardRef = function (e) {
  return {
    $$typeof: Uf,
    render: e
  };
};
Q.isValidElement = ri;
Q.lazy = function (e) {
  return {
    $$typeof: Vf,
    _payload: {
      _status: -1,
      _result: e
    },
    _init: Gf
  };
};
Q.memo = function (e, t) {
  return {
    $$typeof: $f,
    type: e,
    compare: t === undefined ? null : t
  };
};
Q.startTransition = function (e) {
  var t = Jn.transition;
  Jn.transition = {};
  try {
    e();
  } finally {
    Jn.transition = t;
  }
};
Q.unstable_act = ss;
Q.useCallback = function (e, t) {
  return Fe.current.useCallback(e, t);
};
Q.useContext = function (e) {
  return Fe.current.useContext(e);
};
Q.useDebugValue = function () {};
Q.useDeferredValue = function (e) {
  return Fe.current.useDeferredValue(e);
};
Q.useEffect = function (e, t) {
  return Fe.current.useEffect(e, t);
};
Q.useId = function () {
  return Fe.current.useId();
};
Q.useImperativeHandle = function (e, t, r) {
  return Fe.current.useImperativeHandle(e, t, r);
};
Q.useInsertionEffect = function (e, t) {
  return Fe.current.useInsertionEffect(e, t);
};
Q.useLayoutEffect = function (e, t) {
  return Fe.current.useLayoutEffect(e, t);
};
Q.useMemo = function (e, t) {
  return Fe.current.useMemo(e, t);
};
Q.useReducer = function (e, t, r) {
  return Fe.current.useReducer(e, t, r);
};
Q.useRef = function (e) {
  return Fe.current.useRef(e);
};
Q.useState = function (e) {
  return Fe.current.useState(e);
};
Q.useSyncExternalStore = function (e, t, r) {
  return Fe.current.useSyncExternalStore(e, t, r);
};
Q.useTransition = function () {
  return Fe.current.useTransition();
};
Q.version = "18.3.1";
ts.exports = Q;
var Y = ts.exports; /**
                    * @license React
                    * react-jsx-runtime.production.min.js
                    *
                    * Copyright (c) Facebook, Inc. and its affiliates.
                    *
                    * This source code is licensed under the MIT license found in the
                    * LICENSE file in the root directory of this source tree.
                    */
var Yf = Y;
var Zf = Symbol.for("react.element");
var Jf = Symbol.for("react.fragment");
var bf = Object.prototype.hasOwnProperty;
var ex = Yf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
var tx = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
function cs(e, t, r) {
  var n;
  var o = {};
  var l = null;
  var i = null;
  if (r !== undefined) {
    l = "" + r;
  }
  if (t.key !== undefined) {
    l = "" + t.key;
  }
  if (t.ref !== undefined) {
    i = t.ref;
  }
  for (n in t) {
    if (bf.call(t, n) && !tx.hasOwnProperty(n)) {
      o[n] = t[n];
    }
  }
  if (e && e.defaultProps) {
    t = e.defaultProps;
    for (n in t) {
      if (o[n] === undefined) {
        o[n] = t[n];
      }
    }
  }
  return {
    $$typeof: Zf,
    type: e,
    key: l,
    ref: i,
    props: o,
    _owner: ex.current
  };
}
R0.Fragment = Jf;
R0.jsx = cs;
R0.jsxs = cs;
es.exports = R0;
var U = es.exports;
var fs = {
  exports: {}
};
var Oe = {};
var xs = {
  exports: {}
};
var ds = {};
/**
* @license React
* scheduler.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
(function (e) {
  function t(L, H) {
    var O = L.length;
    L.push(H);
    e: while (O > 0) {
      var _ = O - 1 >>> 1;
      var S = L[_];
      if (o(S, H) > 0) {
        L[_] = H;
        L[O] = S;
        O = _;
      } else {
        break e;
      }
    }
  }
  function r(L) {
    if (L.length === 0) {
      return null;
    } else {
      return L[0];
    }
  }
  function n(L) {
    if (L.length === 0) {
      return null;
    }
    var H = L[0];
    var O = L.pop();
    if (O !== H) {
      L[0] = O;
      e: for (var _ = 0, S = L.length, R = S >>> 1; _ < R;) {
        var N = (_ + 1) * 2 - 1;
        var J = L[N];
        var q = N + 1;
        var se = L[q];
        if (o(J, O) < 0) {
          if (q < S && o(se, J) < 0) {
            L[_] = se;
            L[q] = O;
            _ = q;
          } else {
            L[_] = J;
            L[N] = O;
            _ = N;
          }
        } else if (q < S && o(se, O) < 0) {
          L[_] = se;
          L[q] = O;
          _ = q;
        } else {
          break e;
        }
      }
    }
    return H;
  }
  function o(L, H) {
    var O = L.sortIndex - H.sortIndex;
    if (O !== 0) {
      return O;
    } else {
      return L.id - H.id;
    }
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var l = performance;
    e.unstable_now = function () {
      return l.now();
    };
  } else {
    var i = Date;
    var a = i.now();
    e.unstable_now = function () {
      return i.now() - a;
    };
  }
  var c = [];
  var u = [];
  var d = 1;
  var y = null;
  var x = 3;
  var m = false;
  var h = false;
  var g = false;
  var E = typeof setTimeout == "function" ? setTimeout : null;
  var p = typeof clearTimeout == "function" ? clearTimeout : null;
  var s = typeof setImmediate !== "undefined" ? setImmediate : null;
  if (typeof navigator !== "undefined" && navigator.scheduling !== undefined && navigator.scheduling.isInputPending !== undefined) {
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  }
  function f(L) {
    for (var H = r(u); H !== null;) {
      if (H.callback === null) {
        n(u);
      } else if (H.startTime <= L) {
        n(u);
        H.sortIndex = H.expirationTime;
        t(c, H);
      } else {
        break;
      }
      H = r(u);
    }
  }
  function v(L) {
    g = false;
    f(L);
    if (!h) {
      if (r(c) !== null) {
        h = true;
        W(C);
      } else {
        var H = r(u);
        if (H !== null) {
          X(v, H.startTime - L);
        }
      }
    }
  }
  function C(L, H) {
    h = false;
    if (g) {
      g = false;
      p(A);
      A = -1;
    }
    m = true;
    var O = x;
    try {
      f(H);
      y = r(c);
      while (y !== null && (!(y.expirationTime > H) || L && !D())) {
        var _ = y.callback;
        if (typeof _ == "function") {
          y.callback = null;
          x = y.priorityLevel;
          var S = _(y.expirationTime <= H);
          H = e.unstable_now();
          if (typeof S == "function") {
            y.callback = S;
          } else if (y === r(c)) {
            n(c);
          }
          f(H);
        } else {
          n(c);
        }
        y = r(c);
      }
      if (y !== null) {
        var R = true;
      } else {
        var N = r(u);
        if (N !== null) {
          X(v, N.startTime - H);
        }
        R = false;
      }
      return R;
    } finally {
      y = null;
      x = O;
      m = false;
    }
  }
  var B = false;
  var w = null;
  var A = -1;
  var k = 5;
  var F = -1;
  function D() {
    return !(e.unstable_now() - F < k);
  }
  function z() {
    if (w !== null) {
      var L = e.unstable_now();
      F = L;
      var H = true;
      try {
        H = w(true, L);
      } finally {
        if (H) {
          P();
        } else {
          B = false;
          w = null;
        }
      }
    } else {
      B = false;
    }
  }
  var P;
  if (typeof s == "function") {
    P = function () {
      s(z);
    };
  } else if (typeof MessageChannel !== "undefined") {
    var I = new MessageChannel();
    var M = I.port2;
    I.port1.onmessage = z;
    P = function () {
      M.postMessage(null);
    };
  } else {
    P = function () {
      E(z, 0);
    };
  }
  function W(L) {
    w = L;
    if (!B) {
      B = true;
      P();
    }
  }
  function X(L, H) {
    A = E(function () {
      L(e.unstable_now());
    }, H);
  }
  e.unstable_IdlePriority = 5;
  e.unstable_ImmediatePriority = 1;
  e.unstable_LowPriority = 4;
  e.unstable_NormalPriority = 3;
  e.unstable_Profiling = null;
  e.unstable_UserBlockingPriority = 2;
  e.unstable_cancelCallback = function (L) {
    L.callback = null;
  };
  e.unstable_continueExecution = function () {
    if (!h && !m) {
      h = true;
      W(C);
    }
  };
  e.unstable_forceFrameRate = function (L) {
    if (L < 0 || L > 125) {
      console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
    } else {
      k = L > 0 ? Math.floor(1000 / L) : 5;
    }
  };
  e.unstable_getCurrentPriorityLevel = function () {
    return x;
  };
  e.unstable_getFirstCallbackNode = function () {
    return r(c);
  };
  e.unstable_next = function (L) {
    switch (x) {
      case 1:
      case 2:
      case 3:
        var H = 3;
        break;
      default:
        H = x;
    }
    var O = x;
    x = H;
    try {
      return L();
    } finally {
      x = O;
    }
  };
  e.unstable_pauseExecution = function () {};
  e.unstable_requestPaint = function () {};
  e.unstable_runWithPriority = function (L, H) {
    switch (L) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        L = 3;
    }
    var O = x;
    x = L;
    try {
      return H();
    } finally {
      x = O;
    }
  };
  e.unstable_scheduleCallback = function (L, H, O) {
    var _ = e.unstable_now();
    if (typeof O == "object" && O !== null) {
      O = O.delay;
      O = typeof O == "number" && O > 0 ? _ + O : _;
    } else {
      O = _;
    }
    switch (L) {
      case 1:
        var S = -1;
        break;
      case 2:
        S = 250;
        break;
      case 5:
        S = 1073741823;
        break;
      case 4:
        S = 10000;
        break;
      default:
        S = 5000;
    }
    S = O + S;
    L = {
      id: d++,
      callback: H,
      priorityLevel: L,
      startTime: O,
      expirationTime: S,
      sortIndex: -1
    };
    if (O > _) {
      L.sortIndex = O;
      t(u, L);
      if (r(c) === null && L === r(u)) {
        if (g) {
          p(A);
          A = -1;
        } else {
          g = true;
        }
        X(v, O - _);
      }
    } else {
      L.sortIndex = S;
      t(c, L);
      if (!h && !m) {
        h = true;
        W(C);
      }
    }
    return L;
  };
  e.unstable_shouldYield = D;
  e.unstable_wrapCallback = function (L) {
    var H = x;
    return function () {
      var O = x;
      x = H;
      try {
        return L.apply(this, arguments);
      } finally {
        x = O;
      }
    };
  };
})(ds);
xs.exports = ds;
var rx = xs.exports; /**
                     * @license React
                     * react-dom.production.min.js
                     *
                     * Copyright (c) Facebook, Inc. and its affiliates.
                     *
                     * This source code is licensed under the MIT license found in the
                     * LICENSE file in the root directory of this source tree.
                     */
var nx = Y;
var He = rx;
function T(e) {
  var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e;
  for (var r = 1; r < arguments.length; r++) {
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  }
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ps = new Set();
var sn = {};
function Jt(e, t) {
  Fr(e, t);
  Fr(e + "Capture", t);
}
function Fr(e, t) {
  sn[e] = t;
  e = 0;
  for (; e < t.length; e++) {
    ps.add(t[e]);
  }
}
var ft = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var ul = Object.prototype.hasOwnProperty;
var ox = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
var cu = {};
var fu = {};
function lx(e) {
  if (ul.call(fu, e)) {
    return true;
  } else if (ul.call(cu, e)) {
    return false;
  } else if (ox.test(e)) {
    return fu[e] = true;
  } else {
    cu[e] = true;
    return false;
  }
}
function ix(e, t, r, n) {
  if (r !== null && r.type === 0) {
    return false;
  }
  switch (typeof t) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (n) {
        return false;
      } else if (r !== null) {
        return !r.acceptsBooleans;
      } else {
        e = e.toLowerCase().slice(0, 5);
        return e !== "data-" && e !== "aria-";
      }
    default:
      return false;
  }
}
function ux(e, t, r, n) {
  if (t === null || typeof t === "undefined" || ix(e, t, r, n)) {
    return true;
  }
  if (n) {
    return false;
  }
  if (r !== null) {
    switch (r.type) {
      case 3:
        return !t;
      case 4:
        return t === false;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || t < 1;
    }
  }
  return false;
}
function Ae(e, t, r, n, o, l, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4;
  this.attributeName = n;
  this.attributeNamespace = o;
  this.mustUseProperty = r;
  this.propertyName = e;
  this.type = t;
  this.sanitizeURL = l;
  this.removeEmptyString = i;
}
var me = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (e) {
  me[e] = new Ae(e, 0, false, e, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (e) {
  var t = e[0];
  me[t] = new Ae(t, 1, false, e[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  me[e] = new Ae(e, 2, false, e.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
  me[e] = new Ae(e, 2, false, e, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (e) {
  me[e] = new Ae(e, 3, false, e.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  me[e] = new Ae(e, 3, true, e, null, false, false);
});
["capture", "download"].forEach(function (e) {
  me[e] = new Ae(e, 4, false, e, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  me[e] = new Ae(e, 6, false, e, null, false, false);
});
["rowSpan", "start"].forEach(function (e) {
  me[e] = new Ae(e, 5, false, e.toLowerCase(), null, false, false);
});
var ni = /[\-:]([a-z])/g;
function oi(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (e) {
  var t = e.replace(ni, oi);
  me[t] = new Ae(t, 1, false, e, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
  var t = e.replace(ni, oi);
  me[t] = new Ae(t, 1, false, e, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(ni, oi);
  me[t] = new Ae(t, 1, false, e, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  me[e] = new Ae(e, 1, false, e.toLowerCase(), null, false, false);
});
me.xlinkHref = new Ae("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function (e) {
  me[e] = new Ae(e, 1, false, e.toLowerCase(), null, true, true);
});
function li(e, t, r, n) {
  var o = me.hasOwnProperty(t) ? me[t] : null;
  if (o !== null ? o.type !== 0 : n || !(t.length > 2) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") {
    if (ux(t, r, o, n)) {
      r = null;
    }
    if (n || o === null) {
      if (lx(t)) {
        if (r === null) {
          e.removeAttribute(t);
        } else {
          e.setAttribute(t, "" + r);
        }
      }
    } else if (o.mustUseProperty) {
      e[o.propertyName] = r === null ? o.type === 3 ? false : "" : r;
    } else {
      t = o.attributeName;
      n = o.attributeNamespace;
      if (r === null) {
        e.removeAttribute(t);
      } else {
        o = o.type;
        r = o === 3 || o === 4 && r === true ? "" : "" + r;
        if (n) {
          e.setAttributeNS(n, t, r);
        } else {
          e.setAttribute(t, r);
        }
      }
    }
  }
}
var vt = nx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
var Tn = Symbol.for("react.element");
var ir = Symbol.for("react.portal");
var ur = Symbol.for("react.fragment");
var ii = Symbol.for("react.strict_mode");
var al = Symbol.for("react.profiler");
var vs = Symbol.for("react.provider");
var hs = Symbol.for("react.context");
var ui = Symbol.for("react.forward_ref");
var sl = Symbol.for("react.suspense");
var cl = Symbol.for("react.suspense_list");
var ai = Symbol.for("react.memo");
var gt = Symbol.for("react.lazy");
var ms = Symbol.for("react.offscreen");
var xu = Symbol.iterator;
function Ur(e) {
  if (e === null || typeof e != "object") {
    return null;
  } else {
    e = xu && e[xu] || e["@@iterator"];
    if (typeof e == "function") {
      return e;
    } else {
      return null;
    }
  }
}
var le = Object.assign;
var b0;
function Xr(e) {
  if (b0 === undefined) {
    try {
      throw Error();
    } catch (r) {
      var t = r.stack.trim().match(/\n( *(at )?)/);
      b0 = t && t[1] || "";
    }
  }
  return `
${b0}${e}`;
}
var eo = false;
function to(e, t) {
  if (!e || eo) {
    return "";
  }
  eo = true;
  var r = Error.prepareStackTrace;
  Error.prepareStackTrace = undefined;
  try {
    if (t) {
      t = function () {
        throw Error();
      };
      Object.defineProperty(t.prototype, "props", {
        set: function () {
          throw Error();
        }
      });
      if (typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var n = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          n = u;
        }
        e.call(t.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (u) {
        n = u;
      }
      e();
    }
  } catch (u) {
    if (u && n && typeof u.stack == "string") {
      for (var o = u.stack.split(`
`), l = n.stack.split(`
`), i = o.length - 1, a = l.length - 1; i >= 1 && a >= 0 && o[i] !== l[a];) {
        a--;
      }
      for (; i >= 1 && a >= 0; i--, a--) {
        if (o[i] !== l[a]) {
          if (i !== 1 || a !== 1) {
            do {
              i--;
              a--;
              if (a < 0 || o[i] !== l[a]) {
                var c = `
${o[i].replace(" at new ", " at ")}`;
                if (e.displayName && c.includes("<anonymous>")) {
                  c = c.replace("<anonymous>", e.displayName);
                }
                return c;
              }
            } while (i >= 1 && a >= 0);
          }
          break;
        }
      }
    }
  } finally {
    eo = false;
    Error.prepareStackTrace = r;
  }
  if (e = e ? e.displayName || e.name : "") {
    return Xr(e);
  } else {
    return "";
  }
}
function ax(e) {
  switch (e.tag) {
    case 5:
      return Xr(e.type);
    case 16:
      return Xr("Lazy");
    case 13:
      return Xr("Suspense");
    case 19:
      return Xr("SuspenseList");
    case 0:
    case 2:
    case 15:
      e = to(e.type, false);
      return e;
    case 11:
      e = to(e.type.render, false);
      return e;
    case 1:
      e = to(e.type, true);
      return e;
    default:
      return "";
  }
}
function fl(e) {
  if (e == null) {
    return null;
  }
  if (typeof e == "function") {
    return e.displayName || e.name || null;
  }
  if (typeof e == "string") {
    return e;
  }
  switch (e) {
    case ur:
      return "Fragment";
    case ir:
      return "Portal";
    case al:
      return "Profiler";
    case ii:
      return "StrictMode";
    case sl:
      return "Suspense";
    case cl:
      return "SuspenseList";
  }
  if (typeof e == "object") {
    switch (e.$$typeof) {
      case hs:
        return (e.displayName || "Context") + ".Consumer";
      case vs:
        return (e._context.displayName || "Context") + ".Provider";
      case ui:
        var t = e.render;
        e = e.displayName;
        if (!e) {
          e = t.displayName || t.name || "";
          e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef";
        }
        return e;
      case ai:
        t = e.displayName || null;
        if (t !== null) {
          return t;
        } else {
          return fl(e.type) || "Memo";
        }
      case gt:
        t = e._payload;
        e = e._init;
        try {
          return fl(e(t));
        } catch {}
    }
  }
  return null;
}
function sx(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      e = t.render;
      e = e.displayName || e.name || "";
      return t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return fl(t);
    case 8:
      if (t === ii) {
        return "StrictMode";
      } else {
        return "Mode";
      }
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") {
        return t.displayName || t.name || null;
      }
      if (typeof t == "string") {
        return t;
      }
  }
  return null;
}
function Rt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function ys(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function cx(e) {
  var t = ys(e) ? "checked" : "value";
  var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
  var n = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof r !== "undefined" && typeof r.get == "function" && typeof r.set == "function") {
    var o = r.get;
    var l = r.set;
    Object.defineProperty(e, t, {
      configurable: true,
      get: function () {
        return o.call(this);
      },
      set: function (i) {
        n = "" + i;
        l.call(this, i);
      }
    });
    Object.defineProperty(e, t, {
      enumerable: r.enumerable
    });
    return {
      getValue: function () {
        return n;
      },
      setValue: function (i) {
        n = "" + i;
      },
      stopTracking: function () {
        e._valueTracker = null;
        delete e[t];
      }
    };
  }
}
function Hn(e) {
  e._valueTracker ||= cx(e);
}
function gs(e) {
  if (!e) {
    return false;
  }
  var t = e._valueTracker;
  if (!t) {
    return true;
  }
  var r = t.getValue();
  var n = "";
  if (e) {
    n = ys(e) ? e.checked ? "true" : "false" : e.value;
  }
  e = n;
  if (e !== r) {
    t.setValue(e);
    return true;
  } else {
    return false;
  }
}
function s0(e) {
  e = e || (typeof document !== "undefined" ? document : undefined);
  if (typeof e === "undefined") {
    return null;
  }
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function xl(e, t) {
  var r = t.checked;
  return le({}, t, {
    defaultChecked: undefined,
    defaultValue: undefined,
    value: undefined,
    checked: r ?? e._wrapperState.initialChecked
  });
}
function du(e, t) {
  var r = t.defaultValue == null ? "" : t.defaultValue;
  var n = t.checked ?? t.defaultChecked;
  r = Rt(t.value ?? r);
  e._wrapperState = {
    initialChecked: n,
    initialValue: r,
    controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
  };
}
function Es(e, t) {
  t = t.checked;
  if (t != null) {
    li(e, "checked", t, false);
  }
}
function dl(e, t) {
  Es(e, t);
  var r = Rt(t.value);
  var n = t.type;
  if (r != null) {
    if (n === "number") {
      if (r === 0 && e.value === "" || e.value != r) {
        e.value = "" + r;
      }
    } else if (e.value !== "" + r) {
      e.value = "" + r;
    }
  } else if (n === "submit" || n === "reset") {
    e.removeAttribute("value");
    return;
  }
  if (t.hasOwnProperty("value")) {
    pl(e, t.type, r);
  } else if (t.hasOwnProperty("defaultValue")) {
    pl(e, t.type, Rt(t.defaultValue));
  }
  if (t.checked == null && t.defaultChecked != null) {
    e.defaultChecked = !!t.defaultChecked;
  }
}
function pu(e, t, r) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var n = t.type;
    if ((n === "submit" || n === "reset") && (t.value === undefined || t.value === null)) {
      return;
    }
    t = "" + e._wrapperState.initialValue;
    if (!r && t !== e.value) {
      e.value = t;
    }
    e.defaultValue = t;
  }
  r = e.name;
  if (r !== "") {
    e.name = "";
  }
  e.defaultChecked = !!e._wrapperState.initialChecked;
  if (r !== "") {
    e.name = r;
  }
}
function pl(e, t, r) {
  if (t !== "number" || s0(e.ownerDocument) !== e) {
    if (r == null) {
      e.defaultValue = "" + e._wrapperState.initialValue;
    } else if (e.defaultValue !== "" + r) {
      e.defaultValue = "" + r;
    }
  }
}
var Yr = Array.isArray;
function yr(e, t, r, n) {
  e = e.options;
  if (t) {
    t = {};
    for (var o = 0; o < r.length; o++) {
      t["$" + r[o]] = true;
    }
    for (r = 0; r < e.length; r++) {
      o = t.hasOwnProperty("$" + e[r].value);
      if (e[r].selected !== o) {
        e[r].selected = o;
      }
      if (o && n) {
        e[r].defaultSelected = true;
      }
    }
  } else {
    r = "" + Rt(r);
    t = null;
    o = 0;
    for (; o < e.length; o++) {
      if (e[o].value === r) {
        e[o].selected = true;
        if (n) {
          e[o].defaultSelected = true;
        }
        return;
      }
      if (t === null && !e[o].disabled) {
        t = e[o];
      }
    }
    if (t !== null) {
      t.selected = true;
    }
  }
}
function vl(e, t) {
  if (t.dangerouslySetInnerHTML != null) {
    throw Error(T(91));
  }
  return le({}, t, {
    value: undefined,
    defaultValue: undefined,
    children: "" + e._wrapperState.initialValue
  });
}
function vu(e, t) {
  var r = t.value;
  if (r == null) {
    r = t.children;
    t = t.defaultValue;
    if (r != null) {
      if (t != null) {
        throw Error(T(92));
      }
      if (Yr(r)) {
        if (r.length > 1) {
          throw Error(T(93));
        }
        r = r[0];
      }
      t = r;
    }
    if (t == null) {
      t = "";
    }
    r = t;
  }
  e._wrapperState = {
    initialValue: Rt(r)
  };
}
function Cs(e, t) {
  var r = Rt(t.value);
  var n = Rt(t.defaultValue);
  if (r != null) {
    r = "" + r;
    if (r !== e.value) {
      e.value = r;
    }
    if (t.defaultValue == null && e.defaultValue !== r) {
      e.defaultValue = r;
    }
  }
  if (n != null) {
    e.defaultValue = "" + n;
  }
}
function hu(e) {
  var t = e.textContent;
  if (t === e._wrapperState.initialValue && t !== "" && t !== null) {
    e.value = t;
  }
}
function Bs(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function hl(e, t) {
  if (e == null || e === "http://www.w3.org/1999/xhtml") {
    return Bs(t);
  } else if (e === "http://www.w3.org/2000/svg" && t === "foreignObject") {
    return "http://www.w3.org/1999/xhtml";
  } else {
    return e;
  }
}
var On;
var ws = function (e) {
  if (typeof MSApp !== "undefined" && MSApp.execUnsafeLocalFunction) {
    return function (t, r, n, o) {
      MSApp.execUnsafeLocalFunction(function () {
        return e(t, r, n, o);
      });
    };
  } else {
    return e;
  }
}(function (e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) {
    e.innerHTML = t;
  } else {
    On = On || document.createElement("div");
    On.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
    t = On.firstChild;
    while (e.firstChild) {
      e.removeChild(e.firstChild);
    }
    while (t.firstChild) {
      e.appendChild(t.firstChild);
    }
  }
});
function cn(e, t) {
  if (t) {
    var r = e.firstChild;
    if (r && r === e.lastChild && r.nodeType === 3) {
      r.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var br = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
var fx = ["Webkit", "ms", "Moz", "O"];
Object.keys(br).forEach(function (e) {
  fx.forEach(function (t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1);
    br[t] = br[e];
  });
});
function Fs(e, t, r) {
  if (t == null || typeof t == "boolean" || t === "") {
    return "";
  } else if (r || typeof t != "number" || t === 0 || br.hasOwnProperty(e) && br[e]) {
    return ("" + t).trim();
  } else {
    return t + "px";
  }
}
function As(e, t) {
  e = e.style;
  for (var r in t) {
    if (t.hasOwnProperty(r)) {
      var n = r.indexOf("--") === 0;
      var o = Fs(r, t[r], n);
      if (r === "float") {
        r = "cssFloat";
      }
      if (n) {
        e.setProperty(r, o);
      } else {
        e[r] = o;
      }
    }
  }
}
var xx = le({
  menuitem: true
}, {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
});
function ml(e, t) {
  if (t) {
    if (xx[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) {
      throw Error(T(137, e));
    }
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) {
        throw Error(T(60));
      }
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) {
        throw Error(T(61));
      }
    }
    if (t.style != null && typeof t.style != "object") {
      throw Error(T(62));
    }
  }
}
function yl(e, t) {
  if (e.indexOf("-") === -1) {
    return typeof t.is == "string";
  }
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var gl = null;
function si(e) {
  e = e.target || e.srcElement || window;
  if (e.correspondingUseElement) {
    e = e.correspondingUseElement;
  }
  if (e.nodeType === 3) {
    return e.parentNode;
  } else {
    return e;
  }
}
var El = null;
var gr = null;
var Er = null;
function mu(e) {
  if (e = Sn(e)) {
    if (typeof El != "function") {
      throw Error(T(280));
    }
    var t = e.stateNode;
    if (t) {
      t = j0(t);
      El(e.stateNode, e.type, t);
    }
  }
}
function Ds(e) {
  if (gr) {
    if (Er) {
      Er.push(e);
    } else {
      Er = [e];
    }
  } else {
    gr = e;
  }
}
function _s() {
  if (gr) {
    var e = gr;
    var t = Er;
    Er = gr = null;
    mu(e);
    if (t) {
      for (e = 0; e < t.length; e++) {
        mu(t[e]);
      }
    }
  }
}
function ks(e, t) {
  return e(t);
}
function Ss() {}
var ro = false;
function zs(e, t, r) {
  if (ro) {
    return e(t, r);
  }
  ro = true;
  try {
    return ks(e, t, r);
  } finally {
    ro = false;
    if (gr !== null || Er !== null) {
      Ss();
      _s();
    }
  }
}
function fn(e, t) {
  var r = e.stateNode;
  if (r === null) {
    return null;
  }
  var n = j0(r);
  if (n === null) {
    return null;
  }
  r = n[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      if (!(n = !n.disabled)) {
        e = e.type;
        n = e !== "button" && e !== "input" && e !== "select" && e !== "textarea";
      }
      e = !n;
      break e;
    default:
      e = false;
  }
  if (e) {
    return null;
  }
  if (r && typeof r != "function") {
    throw Error(T(231, t, typeof r));
  }
  return r;
}
var Cl = false;
if (ft) {
  try {
    var Wr = {};
    Object.defineProperty(Wr, "passive", {
      get: function () {
        Cl = true;
      }
    });
    window.addEventListener("test", Wr, Wr);
    window.removeEventListener("test", Wr, Wr);
  } catch {
    Cl = false;
  }
}
function dx(e, t, r, n, o, l, i, a, c) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(r, u);
  } catch (d) {
    this.onError(d);
  }
}
var en = false;
var c0 = null;
var f0 = false;
var Bl = null;
var px = {
  onError: function (e) {
    en = true;
    c0 = e;
  }
};
function vx(e, t, r, n, o, l, i, a, c) {
  en = false;
  c0 = null;
  dx.apply(px, arguments);
}
function hx(e, t, r, n, o, l, i, a, c) {
  vx.apply(this, arguments);
  if (en) {
    if (en) {
      var u = c0;
      en = false;
      c0 = null;
    } else {
      throw Error(T(198));
    }
    if (!f0) {
      f0 = true;
      Bl = u;
    }
  }
}
function bt(e) {
  var t = e;
  var r = e;
  if (e.alternate) {
    while (t.return) {
      t = t.return;
    }
  } else {
    e = t;
    do {
      t = e;
      if (t.flags & 4098) {
        r = t.return;
      }
      e = t.return;
    } while (e);
  }
  if (t.tag === 3) {
    return r;
  } else {
    return null;
  }
}
function Ps(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null) {
      e = e.alternate;
      if (e !== null) {
        t = e.memoizedState;
      }
    }
    if (t !== null) {
      return t.dehydrated;
    }
  }
  return null;
}
function yu(e) {
  if (bt(e) !== e) {
    throw Error(T(188));
  }
}
function mx(e) {
  var t = e.alternate;
  if (!t) {
    t = bt(e);
    if (t === null) {
      throw Error(T(188));
    }
    if (t !== e) {
      return null;
    } else {
      return e;
    }
  }
  var r = e;
  var n = t;
  while (true) {
    var o = r.return;
    if (o === null) {
      break;
    }
    var l = o.alternate;
    if (l === null) {
      n = o.return;
      if (n !== null) {
        r = n;
        continue;
      }
      break;
    }
    if (o.child === l.child) {
      for (l = o.child; l;) {
        if (l === r) {
          yu(o);
          return e;
        }
        if (l === n) {
          yu(o);
          return t;
        }
        l = l.sibling;
      }
      throw Error(T(188));
    }
    if (r.return !== n.return) {
      r = o;
      n = l;
    } else {
      var i = false;
      for (var a = o.child; a;) {
        if (a === r) {
          i = true;
          r = o;
          n = l;
          break;
        }
        if (a === n) {
          i = true;
          n = o;
          r = l;
          break;
        }
        a = a.sibling;
      }
      if (!i) {
        for (a = l.child; a;) {
          if (a === r) {
            i = true;
            r = l;
            n = o;
            break;
          }
          if (a === n) {
            i = true;
            n = l;
            r = o;
            break;
          }
          a = a.sibling;
        }
        if (!i) {
          throw Error(T(189));
        }
      }
    }
    if (r.alternate !== n) {
      throw Error(T(190));
    }
  }
  if (r.tag !== 3) {
    throw Error(T(188));
  }
  if (r.stateNode.current === r) {
    return e;
  } else {
    return t;
  }
}
function Ns(e) {
  e = mx(e);
  if (e !== null) {
    return Rs(e);
  } else {
    return null;
  }
}
function Rs(e) {
  if (e.tag === 5 || e.tag === 6) {
    return e;
  }
  for (e = e.child; e !== null;) {
    var t = Rs(e);
    if (t !== null) {
      return t;
    }
    e = e.sibling;
  }
  return null;
}
var Ls = He.unstable_scheduleCallback;
var gu = He.unstable_cancelCallback;
var yx = He.unstable_shouldYield;
var gx = He.unstable_requestPaint;
var ue = He.unstable_now;
var Ex = He.unstable_getCurrentPriorityLevel;
var ci = He.unstable_ImmediatePriority;
var Ts = He.unstable_UserBlockingPriority;
var x0 = He.unstable_NormalPriority;
var Cx = He.unstable_LowPriority;
var Hs = He.unstable_IdlePriority;
var L0 = null;
var ot = null;
function Bx(e) {
  if (ot && typeof ot.onCommitFiberRoot == "function") {
    try {
      ot.onCommitFiberRoot(L0, e, undefined, (e.current.flags & 128) === 128);
    } catch {}
  }
}
var Je = Math.clz32 ? Math.clz32 : Ax;
var wx = Math.log;
var Fx = Math.LN2;
function Ax(e) {
  e >>>= 0;
  if (e === 0) {
    return 32;
  } else {
    return 31 - (wx(e) / Fx | 0) | 0;
  }
}
var jn = 64;
var In = 4194304;
function Zr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function d0(e, t) {
  var r = e.pendingLanes;
  if (r === 0) {
    return 0;
  }
  var n = 0;
  var o = e.suspendedLanes;
  var l = e.pingedLanes;
  var i = r & 268435455;
  if (i !== 0) {
    var a = i & ~o;
    if (a !== 0) {
      n = Zr(a);
    } else {
      l &= i;
      if (l !== 0) {
        n = Zr(l);
      }
    }
  } else {
    i = r & ~o;
    if (i !== 0) {
      n = Zr(i);
    } else if (l !== 0) {
      n = Zr(l);
    }
  }
  if (n === 0) {
    return 0;
  }
  if (t !== 0 && t !== n && !(t & o) && (o = n & -n, l = t & -t, o >= l || o === 16 && (l & 4194240) !== 0)) {
    return t;
  }
  if (n & 4) {
    n |= r & 16;
  }
  t = e.entangledLanes;
  if (t !== 0) {
    e = e.entanglements;
    t &= n;
    while (t > 0) {
      r = 31 - Je(t);
      o = 1 << r;
      n |= e[r];
      t &= ~o;
    }
  }
  return n;
}
function Dx(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5000;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function _x(e, t) {
  var r = e.suspendedLanes;
  var n = e.pingedLanes;
  var o = e.expirationTimes;
  for (var l = e.pendingLanes; l > 0;) {
    var i = 31 - Je(l);
    var a = 1 << i;
    var c = o[i];
    if (c === -1) {
      if (!(a & r) || a & n) {
        o[i] = Dx(a, t);
      }
    } else if (c <= t) {
      e.expiredLanes |= a;
    }
    l &= ~a;
  }
}
function wl(e) {
  e = e.pendingLanes & -1073741825;
  if (e !== 0) {
    return e;
  } else if (e & 1073741824) {
    return 1073741824;
  } else {
    return 0;
  }
}
function Os() {
  var e = jn;
  jn <<= 1;
  if (!(jn & 4194240)) {
    jn = 64;
  }
  return e;
}
function no(e) {
  var t = [];
  for (var r = 0; r < 31; r++) {
    t.push(e);
  }
  return t;
}
function _n(e, t, r) {
  e.pendingLanes |= t;
  if (t !== 536870912) {
    e.suspendedLanes = 0;
    e.pingedLanes = 0;
  }
  e = e.eventTimes;
  t = 31 - Je(t);
  e[t] = r;
}
function kx(e, t) {
  var r = e.pendingLanes & ~t;
  e.pendingLanes = t;
  e.suspendedLanes = 0;
  e.pingedLanes = 0;
  e.expiredLanes &= t;
  e.mutableReadLanes &= t;
  e.entangledLanes &= t;
  t = e.entanglements;
  var n = e.eventTimes;
  for (e = e.expirationTimes; r > 0;) {
    var o = 31 - Je(r);
    var l = 1 << o;
    t[o] = 0;
    n[o] = -1;
    e[o] = -1;
    r &= ~l;
  }
}
function fi(e, t) {
  var r = e.entangledLanes |= t;
  for (e = e.entanglements; r;) {
    var n = 31 - Je(r);
    var o = 1 << n;
    if (o & t | e[n] & t) {
      e[n] |= t;
    }
    r &= ~o;
  }
}
var Z = 0;
function js(e) {
  e &= -e;
  if (e > 1) {
    if (e > 4) {
      if (e & 268435455) {
        return 16;
      } else {
        return 536870912;
      }
    } else {
      return 4;
    }
  } else {
    return 1;
  }
}
var Is;
var xi;
var Ms;
var Us;
var Ws;
var Fl = false;
var Mn = [];
var At = null;
var Dt = null;
var _t = null;
var xn = new Map();
var dn = new Map();
var Ct = [];
var Sx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Eu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      At = null;
      break;
    case "dragenter":
    case "dragleave":
      Dt = null;
      break;
    case "mouseover":
    case "mouseout":
      _t = null;
      break;
    case "pointerover":
    case "pointerout":
      xn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      dn.delete(t.pointerId);
  }
}
function $r(e, t, r, n, o, l) {
  if (e === null || e.nativeEvent !== l) {
    e = {
      blockedOn: t,
      domEventName: r,
      eventSystemFlags: n,
      nativeEvent: l,
      targetContainers: [o]
    };
    if (t !== null) {
      t = Sn(t);
      if (t !== null) {
        xi(t);
      }
    }
    return e;
  } else {
    e.eventSystemFlags |= n;
    t = e.targetContainers;
    if (o !== null && t.indexOf(o) === -1) {
      t.push(o);
    }
    return e;
  }
}
function zx(e, t, r, n, o) {
  switch (t) {
    case "focusin":
      At = $r(At, e, t, r, n, o);
      return true;
    case "dragenter":
      Dt = $r(Dt, e, t, r, n, o);
      return true;
    case "mouseover":
      _t = $r(_t, e, t, r, n, o);
      return true;
    case "pointerover":
      var l = o.pointerId;
      xn.set(l, $r(xn.get(l) || null, e, t, r, n, o));
      return true;
    case "gotpointercapture":
      l = o.pointerId;
      dn.set(l, $r(dn.get(l) || null, e, t, r, n, o));
      return true;
  }
  return false;
}
function $s(e) {
  var t = Wt(e.target);
  if (t !== null) {
    var r = bt(t);
    if (r !== null) {
      t = r.tag;
      if (t === 13) {
        t = Ps(r);
        if (t !== null) {
          e.blockedOn = t;
          Ws(e.priority, function () {
            Ms(r);
          });
          return;
        }
      } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function bn(e) {
  if (e.blockedOn !== null) {
    return false;
  }
  for (var t = e.targetContainers; t.length > 0;) {
    var r = Al(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (r === null) {
      r = e.nativeEvent;
      var n = new r.constructor(r.type, r);
      gl = n;
      r.target.dispatchEvent(n);
      gl = null;
    } else {
      t = Sn(r);
      if (t !== null) {
        xi(t);
      }
      e.blockedOn = r;
      return false;
    }
    t.shift();
  }
  return true;
}
function Cu(e, t, r) {
  if (bn(e)) {
    r.delete(t);
  }
}
function Px() {
  Fl = false;
  if (At !== null && bn(At)) {
    At = null;
  }
  if (Dt !== null && bn(Dt)) {
    Dt = null;
  }
  if (_t !== null && bn(_t)) {
    _t = null;
  }
  xn.forEach(Cu);
  dn.forEach(Cu);
}
function Vr(e, t) {
  if (e.blockedOn === t) {
    e.blockedOn = null;
    if (!Fl) {
      Fl = true;
      He.unstable_scheduleCallback(He.unstable_NormalPriority, Px);
    }
  }
}
function pn(e) {
  function t(o) {
    return Vr(o, e);
  }
  if (Mn.length > 0) {
    Vr(Mn[0], e);
    for (var r = 1; r < Mn.length; r++) {
      var n = Mn[r];
      if (n.blockedOn === e) {
        n.blockedOn = null;
      }
    }
  }
  if (At !== null) {
    Vr(At, e);
  }
  if (Dt !== null) {
    Vr(Dt, e);
  }
  if (_t !== null) {
    Vr(_t, e);
  }
  xn.forEach(t);
  dn.forEach(t);
  r = 0;
  for (; r < Ct.length; r++) {
    n = Ct[r];
    if (n.blockedOn === e) {
      n.blockedOn = null;
    }
  }
  while (Ct.length > 0 && (r = Ct[0], r.blockedOn === null)) {
    $s(r);
    if (r.blockedOn === null) {
      Ct.shift();
    }
  }
}
var Cr = vt.ReactCurrentBatchConfig;
var p0 = true;
function Nx(e, t, r, n) {
  var o = Z;
  var l = Cr.transition;
  Cr.transition = null;
  try {
    Z = 1;
    di(e, t, r, n);
  } finally {
    Z = o;
    Cr.transition = l;
  }
}
function Rx(e, t, r, n) {
  var o = Z;
  var l = Cr.transition;
  Cr.transition = null;
  try {
    Z = 4;
    di(e, t, r, n);
  } finally {
    Z = o;
    Cr.transition = l;
  }
}
function di(e, t, r, n) {
  if (p0) {
    var o = Al(e, t, r, n);
    if (o === null) {
      po(e, t, n, v0, r);
      Eu(e, n);
    } else if (zx(o, e, t, r, n)) {
      n.stopPropagation();
    } else {
      Eu(e, n);
      if (t & 4 && Sx.indexOf(e) > -1) {
        while (o !== null) {
          var l = Sn(o);
          if (l !== null) {
            Is(l);
          }
          l = Al(e, t, r, n);
          if (l === null) {
            po(e, t, n, v0, r);
          }
          if (l === o) {
            break;
          }
          o = l;
        }
        if (o !== null) {
          n.stopPropagation();
        }
      } else {
        po(e, t, n, null, r);
      }
    }
  }
}
var v0 = null;
function Al(e, t, r, n) {
  v0 = null;
  e = si(n);
  e = Wt(e);
  if (e !== null) {
    t = bt(e);
    if (t === null) {
      e = null;
    } else {
      r = t.tag;
      if (r === 13) {
        e = Ps(t);
        if (e !== null) {
          return e;
        }
        e = null;
      } else if (r === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) {
          if (t.tag === 3) {
            return t.stateNode.containerInfo;
          } else {
            return null;
          }
        }
        e = null;
      } else if (t !== e) {
        e = null;
      }
    }
  }
  v0 = e;
  return null;
}
function Vs(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Ex()) {
        case ci:
          return 1;
        case Ts:
          return 4;
        case x0:
        case Cx:
          return 16;
        case Hs:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var wt = null;
var pi = null;
var e0 = null;
function Qs() {
  if (e0) {
    return e0;
  }
  var e;
  var t = pi;
  var r = t.length;
  var n;
  var o = "value" in wt ? wt.value : wt.textContent;
  var l = o.length;
  for (e = 0; e < r && t[e] === o[e]; e++);
  var i = r - e;
  for (n = 1; n <= i && t[r - n] === o[l - n]; n++);
  return e0 = o.slice(e, n > 1 ? 1 - n : undefined);
}
function t0(e) {
  var t = e.keyCode;
  if ("charCode" in e) {
    e = e.charCode;
    if (e === 0 && t === 13) {
      e = 13;
    }
  } else {
    e = t;
  }
  if (e === 10) {
    e = 13;
  }
  if (e >= 32 || e === 13) {
    return e;
  } else {
    return 0;
  }
}
function Un() {
  return true;
}
function Bu() {
  return false;
}
function je(e) {
  function t(r, n, o, l, i) {
    this._reactName = r;
    this._targetInst = o;
    this.type = n;
    this.nativeEvent = l;
    this.target = i;
    this.currentTarget = null;
    for (var a in e) {
      if (e.hasOwnProperty(a)) {
        r = e[a];
        this[a] = r ? r(l) : l[a];
      }
    }
    this.isDefaultPrevented = l.defaultPrevented ?? l.returnValue === false ? Un : Bu;
    this.isPropagationStopped = Bu;
    return this;
  }
  le(t.prototype, {
    preventDefault: function () {
      this.defaultPrevented = true;
      var r = this.nativeEvent;
      if (r) {
        if (r.preventDefault) {
          r.preventDefault();
        } else if (typeof r.returnValue != "unknown") {
          r.returnValue = false;
        }
        this.isDefaultPrevented = Un;
      }
    },
    stopPropagation: function () {
      var r = this.nativeEvent;
      if (r) {
        if (r.stopPropagation) {
          r.stopPropagation();
        } else if (typeof r.cancelBubble != "unknown") {
          r.cancelBubble = true;
        }
        this.isPropagationStopped = Un;
      }
    },
    persist: function () {},
    isPersistent: Un
  });
  return t;
}
var Nr = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function (e) {
    return e.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
};
var vi = je(Nr);
var kn = le({}, Nr, {
  view: 0,
  detail: 0
});
var Lx = je(kn);
var oo;
var lo;
var Qr;
var T0 = le({}, kn, {
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  getModifierState: hi,
  button: 0,
  buttons: 0,
  relatedTarget: function (e) {
    if (e.relatedTarget === undefined) {
      if (e.fromElement === e.srcElement) {
        return e.toElement;
      } else {
        return e.fromElement;
      }
    } else {
      return e.relatedTarget;
    }
  },
  movementX: function (e) {
    if ("movementX" in e) {
      return e.movementX;
    } else {
      if (e !== Qr) {
        if (Qr && e.type === "mousemove") {
          oo = e.screenX - Qr.screenX;
          lo = e.screenY - Qr.screenY;
        } else {
          lo = oo = 0;
        }
        Qr = e;
      }
      return oo;
    }
  },
  movementY: function (e) {
    if ("movementY" in e) {
      return e.movementY;
    } else {
      return lo;
    }
  }
});
var wu = je(T0);
var Tx = le({}, T0, {
  dataTransfer: 0
});
var Hx = je(Tx);
var Ox = le({}, kn, {
  relatedTarget: 0
});
var io = je(Ox);
var jx = le({}, Nr, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
});
var Ix = je(jx);
var Mx = le({}, Nr, {
  clipboardData: function (e) {
    if ("clipboardData" in e) {
      return e.clipboardData;
    } else {
      return window.clipboardData;
    }
  }
});
var Ux = je(Mx);
var Wx = le({}, Nr, {
  data: 0
});
var Fu = je(Wx);
var $x = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
};
var Vx = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
};
var Qx = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function Kx(e) {
  var t = this.nativeEvent;
  if (t.getModifierState) {
    return t.getModifierState(e);
  } else if (e = Qx[e]) {
    return !!t[e];
  } else {
    return false;
  }
}
function hi() {
  return Kx;
}
var qx = le({}, kn, {
  key: function (e) {
    if (e.key) {
      var t = $x[e.key] || e.key;
      if (t !== "Unidentified") {
        return t;
      }
    }
    if (e.type === "keypress") {
      e = t0(e);
      if (e === 13) {
        return "Enter";
      } else {
        return String.fromCharCode(e);
      }
    } else if (e.type === "keydown" || e.type === "keyup") {
      return Vx[e.keyCode] || "Unidentified";
    } else {
      return "";
    }
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: hi,
  charCode: function (e) {
    if (e.type === "keypress") {
      return t0(e);
    } else {
      return 0;
    }
  },
  keyCode: function (e) {
    if (e.type === "keydown" || e.type === "keyup") {
      return e.keyCode;
    } else {
      return 0;
    }
  },
  which: function (e) {
    if (e.type === "keypress") {
      return t0(e);
    } else if (e.type === "keydown" || e.type === "keyup") {
      return e.keyCode;
    } else {
      return 0;
    }
  }
});
var Gx = je(qx);
var Xx = le({}, T0, {
  pointerId: 0,
  width: 0,
  height: 0,
  pressure: 0,
  tangentialPressure: 0,
  tiltX: 0,
  tiltY: 0,
  twist: 0,
  pointerType: 0,
  isPrimary: 0
});
var Au = je(Xx);
var Yx = le({}, kn, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: hi
});
var Zx = je(Yx);
var Jx = le({}, Nr, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
});
var bx = je(Jx);
var e1 = le({}, T0, {
  deltaX: function (e) {
    if ("deltaX" in e) {
      return e.deltaX;
    } else if ("wheelDeltaX" in e) {
      return -e.wheelDeltaX;
    } else {
      return 0;
    }
  },
  deltaY: function (e) {
    if ("deltaY" in e) {
      return e.deltaY;
    } else if ("wheelDeltaY" in e) {
      return -e.wheelDeltaY;
    } else if ("wheelDelta" in e) {
      return -e.wheelDelta;
    } else {
      return 0;
    }
  },
  deltaZ: 0,
  deltaMode: 0
});
var t1 = je(e1);
var r1 = [9, 13, 27, 32];
var mi = ft && "CompositionEvent" in window;
var tn = null;
if (ft && "documentMode" in document) {
  tn = document.documentMode;
}
var n1 = ft && "TextEvent" in window && !tn;
var Ks = ft && (!mi || tn && tn > 8 && tn <= 11);
var Du = " ";
var _u = false;
function qs(e, t) {
  switch (e) {
    case "keyup":
      return r1.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function Gs(e) {
  e = e.detail;
  if (typeof e == "object" && "data" in e) {
    return e.data;
  } else {
    return null;
  }
}
var ar = false;
function o1(e, t) {
  switch (e) {
    case "compositionend":
      return Gs(t);
    case "keypress":
      if (t.which !== 32) {
        return null;
      } else {
        _u = true;
        return Du;
      }
    case "textInput":
      e = t.data;
      if (e === Du && _u) {
        return null;
      } else {
        return e;
      }
    default:
      return null;
  }
}
function l1(e, t) {
  if (ar) {
    if (e === "compositionend" || !mi && qs(e, t)) {
      e = Qs();
      e0 = pi = wt = null;
      ar = false;
      return e;
    } else {
      return null;
    }
  }
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!t.ctrlKey && !t.altKey && !t.metaKey || t.ctrlKey && t.altKey) {
        if (t.char && t.char.length > 1) {
          return t.char;
        }
        if (t.which) {
          return String.fromCharCode(t.which);
        }
      }
      return null;
    case "compositionend":
      if (Ks && t.locale !== "ko") {
        return null;
      } else {
        return t.data;
      }
    default:
      return null;
  }
}
var i1 = {
  color: true,
  date: true,
  datetime: true,
  "datetime-local": true,
  email: true,
  month: true,
  number: true,
  password: true,
  range: true,
  search: true,
  tel: true,
  text: true,
  time: true,
  url: true,
  week: true
};
function ku(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  if (t === "input") {
    return !!i1[e.type];
  } else {
    return t === "textarea";
  }
}
function Xs(e, t, r, n) {
  Ds(n);
  t = h0(t, "onChange");
  if (t.length > 0) {
    r = new vi("onChange", "change", null, r, n);
    e.push({
      event: r,
      listeners: t
    });
  }
}
var rn = null;
var vn = null;
function u1(e) {
  ic(e, 0);
}
function H0(e) {
  var t = fr(e);
  if (gs(t)) {
    return e;
  }
}
function a1(e, t) {
  if (e === "change") {
    return t;
  }
}
var Ys = false;
if (ft) {
  var uo;
  if (ft) {
    var ao = "oninput" in document;
    if (!ao) {
      var Su = document.createElement("div");
      Su.setAttribute("oninput", "return;");
      ao = typeof Su.oninput == "function";
    }
    uo = ao;
  } else {
    uo = false;
  }
  Ys = uo && (!document.documentMode || document.documentMode > 9);
}
function zu() {
  if (rn) {
    rn.detachEvent("onpropertychange", Zs);
    vn = rn = null;
  }
}
function Zs(e) {
  if (e.propertyName === "value" && H0(vn)) {
    var t = [];
    Xs(t, vn, e, si(e));
    zs(u1, t);
  }
}
function s1(e, t, r) {
  if (e === "focusin") {
    zu();
    rn = t;
    vn = r;
    rn.attachEvent("onpropertychange", Zs);
  } else if (e === "focusout") {
    zu();
  }
}
function c1(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") {
    return H0(vn);
  }
}
function f1(e, t) {
  if (e === "click") {
    return H0(t);
  }
}
function x1(e, t) {
  if (e === "input" || e === "change") {
    return H0(t);
  }
}
function d1(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var et = typeof Object.is == "function" ? Object.is : d1;
function hn(e, t) {
  if (et(e, t)) {
    return true;
  }
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) {
    return false;
  }
  var r = Object.keys(e);
  var n = Object.keys(t);
  if (r.length !== n.length) {
    return false;
  }
  for (n = 0; n < r.length; n++) {
    var o = r[n];
    if (!ul.call(t, o) || !et(e[o], t[o])) {
      return false;
    }
  }
  return true;
}
function Pu(e) {
  while (e && e.firstChild) {
    e = e.firstChild;
  }
  return e;
}
function Nu(e, t) {
  var r = Pu(e);
  e = 0;
  var n;
  for (; r;) {
    if (r.nodeType === 3) {
      n = e + r.textContent.length;
      if (e <= t && n >= t) {
        return {
          node: r,
          offset: t - e
        };
      }
      e = n;
    }
    e: {
      while (r) {
        if (r.nextSibling) {
          r = r.nextSibling;
          break e;
        }
        r = r.parentNode;
      }
      r = undefined;
    }
    r = Pu(r);
  }
}
function Js(e, t) {
  if (e && t) {
    if (e === t) {
      return true;
    } else if (e && e.nodeType === 3) {
      return false;
    } else if (t && t.nodeType === 3) {
      return Js(e, t.parentNode);
    } else if ("contains" in e) {
      return e.contains(t);
    } else if (e.compareDocumentPosition) {
      return !!(e.compareDocumentPosition(t) & 16);
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function bs() {
  for (var e = window, t = s0(); t instanceof e.HTMLIFrameElement;) {
    try {
      var r = typeof t.contentWindow.location.href == "string";
    } catch {
      r = false;
    }
    if (r) {
      e = t.contentWindow;
    } else {
      break;
    }
    t = s0(e.document);
  }
  return t;
}
function yi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function p1(e) {
  var t = bs();
  var r = e.focusedElem;
  var n = e.selectionRange;
  if (t !== r && r && r.ownerDocument && Js(r.ownerDocument.documentElement, r)) {
    if (n !== null && yi(r)) {
      t = n.start;
      e = n.end;
      if (e === undefined) {
        e = t;
      }
      if ("selectionStart" in r) {
        r.selectionStart = t;
        r.selectionEnd = Math.min(e, r.value.length);
      } else {
        e = (t = r.ownerDocument || document) && t.defaultView || window;
        if (e.getSelection) {
          e = e.getSelection();
          var o = r.textContent.length;
          var l = Math.min(n.start, o);
          n = n.end === undefined ? l : Math.min(n.end, o);
          if (!e.extend && l > n) {
            o = n;
            n = l;
            l = o;
          }
          o = Nu(r, l);
          var i = Nu(r, n);
          if (o && i && (e.rangeCount !== 1 || e.anchorNode !== o.node || e.anchorOffset !== o.offset || e.focusNode !== i.node || e.focusOffset !== i.offset)) {
            t = t.createRange();
            t.setStart(o.node, o.offset);
            e.removeAllRanges();
            if (l > n) {
              e.addRange(t);
              e.extend(i.node, i.offset);
            } else {
              t.setEnd(i.node, i.offset);
              e.addRange(t);
            }
          }
        }
      }
    }
    t = [];
    e = r;
    while (e = e.parentNode) {
      if (e.nodeType === 1) {
        t.push({
          element: e,
          left: e.scrollLeft,
          top: e.scrollTop
        });
      }
    }
    if (typeof r.focus == "function") {
      r.focus();
    }
    r = 0;
    for (; r < t.length; r++) {
      e = t[r];
      e.element.scrollLeft = e.left;
      e.element.scrollTop = e.top;
    }
  }
}
var v1 = ft && "documentMode" in document && document.documentMode <= 11;
var sr = null;
var Dl = null;
var nn = null;
var _l = false;
function Ru(e, t, r) {
  var n = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
  if (!_l && sr != null && sr === s0(n)) {
    n = sr;
    if ("selectionStart" in n && yi(n)) {
      n = {
        start: n.selectionStart,
        end: n.selectionEnd
      };
    } else {
      n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection();
      n = {
        anchorNode: n.anchorNode,
        anchorOffset: n.anchorOffset,
        focusNode: n.focusNode,
        focusOffset: n.focusOffset
      };
    }
    if (!nn || !hn(nn, n)) {
      nn = n;
      n = h0(Dl, "onSelect");
      if (n.length > 0) {
        t = new vi("onSelect", "select", null, t, r);
        e.push({
          event: t,
          listeners: n
        });
        t.target = sr;
      }
    }
  }
}
function Wn(e, t) {
  var r = {};
  r[e.toLowerCase()] = t.toLowerCase();
  r["Webkit" + e] = "webkit" + t;
  r["Moz" + e] = "moz" + t;
  return r;
}
var cr = {
  animationend: Wn("Animation", "AnimationEnd"),
  animationiteration: Wn("Animation", "AnimationIteration"),
  animationstart: Wn("Animation", "AnimationStart"),
  transitionend: Wn("Transition", "TransitionEnd")
};
var so = {};
var ec = {};
if (ft) {
  ec = document.createElement("div").style;
  if (!("AnimationEvent" in window)) {
    delete cr.animationend.animation;
    delete cr.animationiteration.animation;
    delete cr.animationstart.animation;
  }
  if (!("TransitionEvent" in window)) {
    delete cr.transitionend.transition;
  }
}
function O0(e) {
  if (so[e]) {
    return so[e];
  }
  if (!cr[e]) {
    return e;
  }
  var t = cr[e];
  var r;
  for (r in t) {
    if (t.hasOwnProperty(r) && r in ec) {
      return so[e] = t[r];
    }
  }
  return e;
}
var tc = O0("animationend");
var rc = O0("animationiteration");
var nc = O0("animationstart");
var oc = O0("transitionend");
var lc = new Map();
var Lu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Tt(e, t) {
  lc.set(e, t);
  Jt(t, [e]);
}
for (var co = 0; co < Lu.length; co++) {
  var fo = Lu[co];
  var h1 = fo.toLowerCase();
  var m1 = fo[0].toUpperCase() + fo.slice(1);
  Tt(h1, "on" + m1);
}
Tt(tc, "onAnimationEnd");
Tt(rc, "onAnimationIteration");
Tt(nc, "onAnimationStart");
Tt("dblclick", "onDoubleClick");
Tt("focusin", "onFocus");
Tt("focusout", "onBlur");
Tt(oc, "onTransitionEnd");
Fr("onMouseEnter", ["mouseout", "mouseover"]);
Fr("onMouseLeave", ["mouseout", "mouseover"]);
Fr("onPointerEnter", ["pointerout", "pointerover"]);
Fr("onPointerLeave", ["pointerout", "pointerover"]);
Jt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Jt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Jt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Jt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Jt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Jt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Jr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
var y1 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Jr));
function Tu(e, t, r) {
  var n = e.type || "unknown-event";
  e.currentTarget = r;
  hx(n, t, undefined, e);
  e.currentTarget = null;
}
function ic(e, t) {
  t = (t & 4) !== 0;
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    var o = n.event;
    n = n.listeners;
    e: {
      var l = undefined;
      if (t) {
        for (var i = n.length - 1; i >= 0; i--) {
          var a = n[i];
          var c = a.instance;
          var u = a.currentTarget;
          a = a.listener;
          if (c !== l && o.isPropagationStopped()) {
            break e;
          }
          Tu(o, a, u);
          l = c;
        }
      } else {
        for (i = 0; i < n.length; i++) {
          a = n[i];
          c = a.instance;
          u = a.currentTarget;
          a = a.listener;
          if (c !== l && o.isPropagationStopped()) {
            break e;
          }
          Tu(o, a, u);
          l = c;
        }
      }
    }
  }
  if (f0) {
    e = Bl;
    f0 = false;
    Bl = null;
    throw e;
  }
}
function ee(e, t) {
  var r = t[Nl];
  if (r === undefined) {
    r = t[Nl] = new Set();
  }
  var n = e + "__bubble";
  if (!r.has(n)) {
    uc(t, e, 2, false);
    r.add(n);
  }
}
function xo(e, t, r) {
  var n = 0;
  if (t) {
    n |= 4;
  }
  uc(r, e, n, t);
}
var $n = "_reactListening" + Math.random().toString(36).slice(2);
function mn(e) {
  if (!e[$n]) {
    e[$n] = true;
    ps.forEach(function (r) {
      if (r !== "selectionchange") {
        if (!y1.has(r)) {
          xo(r, false, e);
        }
        xo(r, true, e);
      }
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    if (t !== null && !t[$n]) {
      t[$n] = true;
      xo("selectionchange", false, t);
    }
  }
}
function uc(e, t, r, n) {
  switch (Vs(t)) {
    case 1:
      var o = Nx;
      break;
    case 4:
      o = Rx;
      break;
    default:
      o = di;
  }
  r = o.bind(null, t, r, e);
  o = undefined;
  if (!!Cl && (t === "touchstart" || t === "touchmove" || t === "wheel")) {
    o = true;
  }
  if (n) {
    if (o !== undefined) {
      e.addEventListener(t, r, {
        capture: true,
        passive: o
      });
    } else {
      e.addEventListener(t, r, true);
    }
  } else if (o !== undefined) {
    e.addEventListener(t, r, {
      passive: o
    });
  } else {
    e.addEventListener(t, r, false);
  }
}
function po(e, t, r, n, o) {
  var l = n;
  if (!(t & 1) && !(t & 2) && n !== null) {
    e: while (true) {
      if (n === null) {
        return;
      }
      var i = n.tag;
      if (i === 3 || i === 4) {
        var a = n.stateNode.containerInfo;
        if (a === o || a.nodeType === 8 && a.parentNode === o) {
          break;
        }
        if (i === 4) {
          for (i = n.return; i !== null;) {
            var c = i.tag;
            if ((c === 3 || c === 4) && (c = i.stateNode.containerInfo, c === o || c.nodeType === 8 && c.parentNode === o)) {
              return;
            }
            i = i.return;
          }
        }
        while (a !== null) {
          i = Wt(a);
          if (i === null) {
            return;
          }
          c = i.tag;
          if (c === 5 || c === 6) {
            n = l = i;
            continue e;
          }
          a = a.parentNode;
        }
      }
      n = n.return;
    }
  }
  zs(function () {
    var u = l;
    var d = si(r);
    var y = [];
    e: {
      var x = lc.get(e);
      if (x !== undefined) {
        var m = vi;
        var h = e;
        switch (e) {
          case "keypress":
            if (t0(r) === 0) {
              break e;
            }
          case "keydown":
          case "keyup":
            m = Gx;
            break;
          case "focusin":
            h = "focus";
            m = io;
            break;
          case "focusout":
            h = "blur";
            m = io;
            break;
          case "beforeblur":
          case "afterblur":
            m = io;
            break;
          case "click":
            if (r.button === 2) {
              break e;
            }
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            m = wu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = Hx;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = Zx;
            break;
          case tc:
          case rc:
          case nc:
            m = Ix;
            break;
          case oc:
            m = bx;
            break;
          case "scroll":
            m = Lx;
            break;
          case "wheel":
            m = t1;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = Ux;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = Au;
        }
        var g = (t & 4) !== 0;
        var E = !g && e === "scroll";
        var p = g ? x !== null ? x + "Capture" : null : x;
        g = [];
        for (var s = u, f; s !== null;) {
          f = s;
          var v = f.stateNode;
          if (f.tag === 5 && v !== null) {
            f = v;
            if (p !== null) {
              v = fn(s, p);
              if (v != null) {
                g.push(yn(s, v, f));
              }
            }
          }
          if (E) {
            break;
          }
          s = s.return;
        }
        if (g.length > 0) {
          x = new m(x, h, null, r, d);
          y.push({
            event: x,
            listeners: g
          });
        }
      }
    }
    if (!(t & 7)) {
      e: {
        x = e === "mouseover" || e === "pointerover";
        m = e === "mouseout" || e === "pointerout";
        if (x && r !== gl && (h = r.relatedTarget || r.fromElement) && (Wt(h) || h[xt])) {
          break e;
        }
        if ((m || x) && (x = d.window === d ? d : (x = d.ownerDocument) ? x.defaultView || x.parentWindow : window, m ? (h = r.relatedTarget || r.toElement, m = u, h = h ? Wt(h) : null, h !== null && (E = bt(h), h !== E || h.tag !== 5 && h.tag !== 6) && (h = null)) : (m = null, h = u), m !== h)) {
          g = wu;
          v = "onMouseLeave";
          p = "onMouseEnter";
          s = "mouse";
          if (e === "pointerout" || e === "pointerover") {
            g = Au;
            v = "onPointerLeave";
            p = "onPointerEnter";
            s = "pointer";
          }
          E = m == null ? x : fr(m);
          f = h == null ? x : fr(h);
          x = new g(v, s + "leave", m, r, d);
          x.target = E;
          x.relatedTarget = f;
          v = null;
          if (Wt(d) === u) {
            g = new g(p, s + "enter", h, r, d);
            g.target = f;
            g.relatedTarget = E;
            v = g;
          }
          E = v;
          if (m && h) {
            t: {
              g = m;
              p = h;
              s = 0;
              f = g;
              for (; f; f = lr(f)) {
                s++;
              }
              f = 0;
              v = p;
              for (; v; v = lr(v)) {
                f++;
              }
              while (s - f > 0) {
                g = lr(g);
                s--;
              }
              while (f - s > 0) {
                p = lr(p);
                f--;
              }
              while (s--) {
                if (g === p || p !== null && g === p.alternate) {
                  break t;
                }
                g = lr(g);
                p = lr(p);
              }
              g = null;
            }
          } else {
            g = null;
          }
          if (m !== null) {
            Hu(y, x, m, g, false);
          }
          if (h !== null && E !== null) {
            Hu(y, E, h, g, true);
          }
        }
      }
      e: {
        x = u ? fr(u) : window;
        m = x.nodeName && x.nodeName.toLowerCase();
        if (m === "select" || m === "input" && x.type === "file") {
          var C = a1;
        } else if (ku(x)) {
          if (Ys) {
            C = x1;
          } else {
            C = c1;
            var B = s1;
          }
        } else if ((m = x.nodeName) && m.toLowerCase() === "input" && (x.type === "checkbox" || x.type === "radio")) {
          C = f1;
        }
        if (C &&= C(e, u)) {
          Xs(y, C, r, d);
          break e;
        }
        if (B) {
          B(e, x, u);
        }
        if (e === "focusout" && (B = x._wrapperState) && B.controlled && x.type === "number") {
          pl(x, "number", x.value);
        }
      }
      B = u ? fr(u) : window;
      switch (e) {
        case "focusin":
          if (ku(B) || B.contentEditable === "true") {
            sr = B;
            Dl = u;
            nn = null;
          }
          break;
        case "focusout":
          nn = Dl = sr = null;
          break;
        case "mousedown":
          _l = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          _l = false;
          Ru(y, r, d);
          break;
        case "selectionchange":
          if (v1) {
            break;
          }
        case "keydown":
        case "keyup":
          Ru(y, r, d);
      }
      var w;
      if (mi) {
        e: {
          switch (e) {
            case "compositionstart":
              var A = "onCompositionStart";
              break e;
            case "compositionend":
              A = "onCompositionEnd";
              break e;
            case "compositionupdate":
              A = "onCompositionUpdate";
              break e;
          }
          A = undefined;
        }
      } else if (ar) {
        if (qs(e, r)) {
          A = "onCompositionEnd";
        }
      } else if (e === "keydown" && r.keyCode === 229) {
        A = "onCompositionStart";
      }
      if (A) {
        if (Ks && r.locale !== "ko") {
          if (ar || A !== "onCompositionStart") {
            if (A === "onCompositionEnd" && ar) {
              w = Qs();
            }
          } else {
            wt = d;
            pi = "value" in wt ? wt.value : wt.textContent;
            ar = true;
          }
        }
        B = h0(u, A);
        if (B.length > 0) {
          A = new Fu(A, e, null, r, d);
          y.push({
            event: A,
            listeners: B
          });
          if (w) {
            A.data = w;
          } else {
            w = Gs(r);
            if (w !== null) {
              A.data = w;
            }
          }
        }
      }
      if (w = n1 ? o1(e, r) : l1(e, r)) {
        u = h0(u, "onBeforeInput");
        if (u.length > 0) {
          d = new Fu("onBeforeInput", "beforeinput", null, r, d);
          y.push({
            event: d,
            listeners: u
          });
          d.data = w;
        }
      }
    }
    ic(y, t);
  });
}
function yn(e, t, r) {
  return {
    instance: e,
    listener: t,
    currentTarget: r
  };
}
function h0(e, t) {
  var r = t + "Capture";
  var n = [];
  for (; e !== null;) {
    var o = e;
    var l = o.stateNode;
    if (o.tag === 5 && l !== null) {
      o = l;
      l = fn(e, r);
      if (l != null) {
        n.unshift(yn(e, l, o));
      }
      l = fn(e, t);
      if (l != null) {
        n.push(yn(e, l, o));
      }
    }
    e = e.return;
  }
  return n;
}
function lr(e) {
  if (e === null) {
    return null;
  }
  do {
    e = e.return;
  } while (e && e.tag !== 5);
  return e || null;
}
function Hu(e, t, r, n, o) {
  var l = t._reactName;
  var i = [];
  for (; r !== null && r !== n;) {
    var a = r;
    var c = a.alternate;
    var u = a.stateNode;
    if (c !== null && c === n) {
      break;
    }
    if (a.tag === 5 && u !== null) {
      a = u;
      if (o) {
        c = fn(r, l);
        if (c != null) {
          i.unshift(yn(r, c, a));
        }
      } else if (!o) {
        c = fn(r, l);
        if (c != null) {
          i.push(yn(r, c, a));
        }
      }
    }
    r = r.return;
  }
  if (i.length !== 0) {
    e.push({
      event: t,
      listeners: i
    });
  }
}
var g1 = /\r\n?/g;
var E1 = /\u0000|\uFFFD/g;
function Ou(e) {
  return (typeof e == "string" ? e : "" + e).replace(g1, `
`).replace(E1, "");
}
function Vn(e, t, r) {
  t = Ou(t);
  if (Ou(e) !== t && r) {
    throw Error(T(425));
  }
}
function m0() {}
var kl = null;
var Sl = null;
function zl(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Pl = typeof setTimeout == "function" ? setTimeout : undefined;
var C1 = typeof clearTimeout == "function" ? clearTimeout : undefined;
var ju = typeof Promise == "function" ? Promise : undefined;
var B1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof ju !== "undefined" ? function (e) {
  return ju.resolve(null).then(e).catch(w1);
} : Pl;
function w1(e) {
  setTimeout(function () {
    throw e;
  });
}
function vo(e, t) {
  var r = t;
  var n = 0;
  do {
    var o = r.nextSibling;
    e.removeChild(r);
    if (o && o.nodeType === 8) {
      r = o.data;
      if (r === "/$") {
        if (n === 0) {
          e.removeChild(o);
          pn(t);
          return;
        }
        n--;
      } else if (r === "$" || r === "$?" || r === "$!") {
        n++;
      }
    }
    r = o;
  } while (r);
  pn(t);
}
function kt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) {
      break;
    }
    if (t === 8) {
      t = e.data;
      if (t === "$" || t === "$!" || t === "$?") {
        break;
      }
      if (t === "/$") {
        return null;
      }
    }
  }
  return e;
}
function Iu(e) {
  e = e.previousSibling;
  var t = 0;
  for (; e;) {
    if (e.nodeType === 8) {
      var r = e.data;
      if (r === "$" || r === "$!" || r === "$?") {
        if (t === 0) {
          return e;
        }
        t--;
      } else if (r === "/$") {
        t++;
      }
    }
    e = e.previousSibling;
  }
  return null;
}
var Rr = Math.random().toString(36).slice(2);
var nt = "__reactFiber$" + Rr;
var gn = "__reactProps$" + Rr;
var xt = "__reactContainer$" + Rr;
var Nl = "__reactEvents$" + Rr;
var F1 = "__reactListeners$" + Rr;
var A1 = "__reactHandles$" + Rr;
function Wt(e) {
  var t = e[nt];
  if (t) {
    return t;
  }
  for (var r = e.parentNode; r;) {
    if (t = r[xt] || r[nt]) {
      r = t.alternate;
      if (t.child !== null || r !== null && r.child !== null) {
        for (e = Iu(e); e !== null;) {
          if (r = e[nt]) {
            return r;
          }
          e = Iu(e);
        }
      }
      return t;
    }
    e = r;
    r = e.parentNode;
  }
  return null;
}
function Sn(e) {
  e = e[nt] || e[xt];
  if (!e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) {
    return null;
  } else {
    return e;
  }
}
function fr(e) {
  if (e.tag === 5 || e.tag === 6) {
    return e.stateNode;
  }
  throw Error(T(33));
}
function j0(e) {
  return e[gn] || null;
}
var Rl = [];
var xr = -1;
function Ht(e) {
  return {
    current: e
  };
}
function te(e) {
  if (!(xr < 0)) {
    e.current = Rl[xr];
    Rl[xr] = null;
    xr--;
  }
}
function b(e, t) {
  xr++;
  Rl[xr] = e.current;
  e.current = t;
}
var Lt = {};
var Ce = Ht(Lt);
var ke = Ht(false);
var qt = Lt;
function Ar(e, t) {
  var r = e.type.contextTypes;
  if (!r) {
    return Lt;
  }
  var n = e.stateNode;
  if (n && n.__reactInternalMemoizedUnmaskedChildContext === t) {
    return n.__reactInternalMemoizedMaskedChildContext;
  }
  var o = {};
  var l;
  for (l in r) {
    o[l] = t[l];
  }
  if (n) {
    e = e.stateNode;
    e.__reactInternalMemoizedUnmaskedChildContext = t;
    e.__reactInternalMemoizedMaskedChildContext = o;
  }
  return o;
}
function Se(e) {
  e = e.childContextTypes;
  return e != null;
}
function y0() {
  te(ke);
  te(Ce);
}
function Mu(e, t, r) {
  if (Ce.current !== Lt) {
    throw Error(T(168));
  }
  b(Ce, t);
  b(ke, r);
}
function ac(e, t, r) {
  var n = e.stateNode;
  t = t.childContextTypes;
  if (typeof n.getChildContext != "function") {
    return r;
  }
  n = n.getChildContext();
  for (var o in n) {
    if (!(o in t)) {
      throw Error(T(108, sx(e) || "Unknown", o));
    }
  }
  return le({}, r, n);
}
function g0(e) {
  e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Lt;
  qt = Ce.current;
  b(Ce, e);
  b(ke, ke.current);
  return true;
}
function Uu(e, t, r) {
  var n = e.stateNode;
  if (!n) {
    throw Error(T(169));
  }
  if (r) {
    e = ac(e, t, qt);
    n.__reactInternalMemoizedMergedChildContext = e;
    te(ke);
    te(Ce);
    b(Ce, e);
  } else {
    te(ke);
  }
  b(ke, r);
}
var ut = null;
var I0 = false;
var ho = false;
function sc(e) {
  if (ut === null) {
    ut = [e];
  } else {
    ut.push(e);
  }
}
function D1(e) {
  I0 = true;
  sc(e);
}
function Ot() {
  if (!ho && ut !== null) {
    ho = true;
    var e = 0;
    var t = Z;
    try {
      var r = ut;
      for (Z = 1; e < r.length; e++) {
        var n = r[e];
        do {
          n = n(true);
        } while (n !== null);
      }
      ut = null;
      I0 = false;
    } catch (o) {
      if (ut !== null) {
        ut = ut.slice(e + 1);
      }
      Ls(ci, Ot);
      throw o;
    } finally {
      Z = t;
      ho = false;
    }
  }
  return null;
}
var dr = [];
var pr = 0;
var E0 = null;
var C0 = 0;
var Me = [];
var Ue = 0;
var Gt = null;
var at = 1;
var st = "";
function Mt(e, t) {
  dr[pr++] = C0;
  dr[pr++] = E0;
  E0 = e;
  C0 = t;
}
function cc(e, t, r) {
  Me[Ue++] = at;
  Me[Ue++] = st;
  Me[Ue++] = Gt;
  Gt = e;
  var n = at;
  e = st;
  var o = 32 - Je(n) - 1;
  n &= ~(1 << o);
  r += 1;
  var l = 32 - Je(t) + o;
  if (l > 30) {
    var i = o - o % 5;
    l = (n & (1 << i) - 1).toString(32);
    n >>= i;
    o -= i;
    at = 1 << 32 - Je(t) + o | r << o | n;
    st = l + e;
  } else {
    at = 1 << l | r << o | n;
    st = e;
  }
}
function gi(e) {
  if (e.return !== null) {
    Mt(e, 1);
    cc(e, 1, 0);
  }
}
function Ei(e) {
  while (e === E0) {
    E0 = dr[--pr];
    dr[pr] = null;
    C0 = dr[--pr];
    dr[pr] = null;
  }
  while (e === Gt) {
    Gt = Me[--Ue];
    Me[Ue] = null;
    st = Me[--Ue];
    Me[Ue] = null;
    at = Me[--Ue];
    Me[Ue] = null;
  }
}
var Te = null;
var Le = null;
var re = false;
var Ze = null;
function fc(e, t) {
  var r = We(5, null, null, 0);
  r.elementType = "DELETED";
  r.stateNode = t;
  r.return = e;
  t = e.deletions;
  if (t === null) {
    e.deletions = [r];
    e.flags |= 16;
  } else {
    t.push(r);
  }
}
function Wu(e, t) {
  switch (e.tag) {
    case 5:
      var r = e.type;
      t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t;
      if (t !== null) {
        e.stateNode = t;
        Te = e;
        Le = kt(t.firstChild);
        return true;
      } else {
        return false;
      }
    case 6:
      t = e.pendingProps === "" || t.nodeType !== 3 ? null : t;
      if (t !== null) {
        e.stateNode = t;
        Te = e;
        Le = null;
        return true;
      } else {
        return false;
      }
    case 13:
      t = t.nodeType !== 8 ? null : t;
      if (t !== null) {
        r = Gt !== null ? {
          id: at,
          overflow: st
        } : null;
        e.memoizedState = {
          dehydrated: t,
          treeContext: r,
          retryLane: 1073741824
        };
        r = We(18, null, null, 0);
        r.stateNode = t;
        r.return = e;
        e.child = r;
        Te = e;
        Le = null;
        return true;
      } else {
        return false;
      }
    default:
      return false;
  }
}
function Ll(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Tl(e) {
  if (re) {
    var t = Le;
    if (t) {
      var r = t;
      if (!Wu(e, t)) {
        if (Ll(e)) {
          throw Error(T(418));
        }
        t = kt(r.nextSibling);
        var n = Te;
        if (t && Wu(e, t)) {
          fc(n, r);
        } else {
          e.flags = e.flags & -4097 | 2;
          re = false;
          Te = e;
        }
      }
    } else {
      if (Ll(e)) {
        throw Error(T(418));
      }
      e.flags = e.flags & -4097 | 2;
      re = false;
      Te = e;
    }
  }
}
function $u(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) {
    e = e.return;
  }
  Te = e;
}
function Qn(e) {
  if (e !== Te) {
    return false;
  }
  if (!re) {
    $u(e);
    re = true;
    return false;
  }
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5)) {
    t = e.type;
    t = t !== "head" && t !== "body" && !zl(e.type, e.memoizedProps);
  }
  if (t &&= Le) {
    if (Ll(e)) {
      xc();
      throw Error(T(418));
    }
    while (t) {
      fc(e, t);
      t = kt(t.nextSibling);
    }
  }
  $u(e);
  if (e.tag === 13) {
    e = e.memoizedState;
    e = e !== null ? e.dehydrated : null;
    if (!e) {
      throw Error(T(317));
    }
    e: {
      e = e.nextSibling;
      t = 0;
      while (e) {
        if (e.nodeType === 8) {
          var r = e.data;
          if (r === "/$") {
            if (t === 0) {
              Le = kt(e.nextSibling);
              break e;
            }
            t--;
          } else if (r === "$" || r === "$!" || r === "$?") {
            t++;
          }
        }
        e = e.nextSibling;
      }
      Le = null;
    }
  } else {
    Le = Te ? kt(e.stateNode.nextSibling) : null;
  }
  return true;
}
function xc() {
  for (var e = Le; e;) {
    e = kt(e.nextSibling);
  }
}
function Dr() {
  Le = Te = null;
  re = false;
}
function Ci(e) {
  if (Ze === null) {
    Ze = [e];
  } else {
    Ze.push(e);
  }
}
var _1 = vt.ReactCurrentBatchConfig;
function Kr(e, t, r) {
  e = r.ref;
  if (e !== null && typeof e != "function" && typeof e != "object") {
    if (r._owner) {
      r = r._owner;
      if (r) {
        if (r.tag !== 1) {
          throw Error(T(309));
        }
        var n = r.stateNode;
      }
      if (!n) {
        throw Error(T(147, e));
      }
      var o = n;
      var l = "" + e;
      if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === l) {
        return t.ref;
      } else {
        t = function (i) {
          var a = o.refs;
          if (i === null) {
            delete a[l];
          } else {
            a[l] = i;
          }
        };
        t._stringRef = l;
        return t;
      }
    }
    if (typeof e != "string") {
      throw Error(T(284));
    }
    if (!r._owner) {
      throw Error(T(290, e));
    }
  }
  return e;
}
function Kn(e, t) {
  e = Object.prototype.toString.call(t);
  throw Error(T(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Vu(e) {
  var t = e._init;
  return t(e._payload);
}
function dc(e) {
  function t(p, s) {
    if (e) {
      var f = p.deletions;
      if (f === null) {
        p.deletions = [s];
        p.flags |= 16;
      } else {
        f.push(s);
      }
    }
  }
  function r(p, s) {
    if (!e) {
      return null;
    }
    while (s !== null) {
      t(p, s);
      s = s.sibling;
    }
    return null;
  }
  function n(p, s) {
    for (p = new Map(); s !== null;) {
      if (s.key !== null) {
        p.set(s.key, s);
      } else {
        p.set(s.index, s);
      }
      s = s.sibling;
    }
    return p;
  }
  function o(p, s) {
    p = Nt(p, s);
    p.index = 0;
    p.sibling = null;
    return p;
  }
  function l(p, s, f) {
    p.index = f;
    if (e) {
      f = p.alternate;
      if (f !== null) {
        f = f.index;
        if (f < s) {
          p.flags |= 2;
          return s;
        } else {
          return f;
        }
      } else {
        p.flags |= 2;
        return s;
      }
    } else {
      p.flags |= 1048576;
      return s;
    }
  }
  function i(p) {
    if (e && p.alternate === null) {
      p.flags |= 2;
    }
    return p;
  }
  function a(p, s, f, v) {
    if (s === null || s.tag !== 6) {
      s = wo(f, p.mode, v);
      s.return = p;
      return s;
    } else {
      s = o(s, f);
      s.return = p;
      return s;
    }
  }
  function c(p, s, f, v) {
    var C = f.type;
    if (C === ur) {
      return d(p, s, f.props.children, v, f.key);
    } else if (s !== null && (s.elementType === C || typeof C == "object" && C !== null && C.$$typeof === gt && Vu(C) === s.type)) {
      v = o(s, f.props);
      v.ref = Kr(p, s, f);
      v.return = p;
      return v;
    } else {
      v = a0(f.type, f.key, f.props, null, p.mode, v);
      v.ref = Kr(p, s, f);
      v.return = p;
      return v;
    }
  }
  function u(p, s, f, v) {
    if (s === null || s.tag !== 4 || s.stateNode.containerInfo !== f.containerInfo || s.stateNode.implementation !== f.implementation) {
      s = Fo(f, p.mode, v);
      s.return = p;
      return s;
    } else {
      s = o(s, f.children || []);
      s.return = p;
      return s;
    }
  }
  function d(p, s, f, v, C) {
    if (s === null || s.tag !== 7) {
      s = Kt(f, p.mode, v, C);
      s.return = p;
      return s;
    } else {
      s = o(s, f);
      s.return = p;
      return s;
    }
  }
  function y(p, s, f) {
    if (typeof s == "string" && s !== "" || typeof s == "number") {
      s = wo("" + s, p.mode, f);
      s.return = p;
      return s;
    }
    if (typeof s == "object" && s !== null) {
      switch (s.$$typeof) {
        case Tn:
          f = a0(s.type, s.key, s.props, null, p.mode, f);
          f.ref = Kr(p, null, s);
          f.return = p;
          return f;
        case ir:
          s = Fo(s, p.mode, f);
          s.return = p;
          return s;
        case gt:
          var v = s._init;
          return y(p, v(s._payload), f);
      }
      if (Yr(s) || Ur(s)) {
        s = Kt(s, p.mode, f, null);
        s.return = p;
        return s;
      }
      Kn(p, s);
    }
    return null;
  }
  function x(p, s, f, v) {
    var C = s !== null ? s.key : null;
    if (typeof f == "string" && f !== "" || typeof f == "number") {
      if (C !== null) {
        return null;
      } else {
        return a(p, s, "" + f, v);
      }
    }
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case Tn:
          if (f.key === C) {
            return c(p, s, f, v);
          } else {
            return null;
          }
        case ir:
          if (f.key === C) {
            return u(p, s, f, v);
          } else {
            return null;
          }
        case gt:
          C = f._init;
          return x(p, s, C(f._payload), v);
      }
      if (Yr(f) || Ur(f)) {
        if (C !== null) {
          return null;
        } else {
          return d(p, s, f, v, null);
        }
      }
      Kn(p, f);
    }
    return null;
  }
  function m(p, s, f, v, C) {
    if (typeof v == "string" && v !== "" || typeof v == "number") {
      p = p.get(f) || null;
      return a(s, p, "" + v, C);
    }
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Tn:
          p = p.get(v.key === null ? f : v.key) || null;
          return c(s, p, v, C);
        case ir:
          p = p.get(v.key === null ? f : v.key) || null;
          return u(s, p, v, C);
        case gt:
          var B = v._init;
          return m(p, s, f, B(v._payload), C);
      }
      if (Yr(v) || Ur(v)) {
        p = p.get(f) || null;
        return d(s, p, v, C, null);
      }
      Kn(s, v);
    }
    return null;
  }
  function h(p, s, f, v) {
    var C = null;
    var B = null;
    for (var w = s, A = s = 0, k = null; w !== null && A < f.length; A++) {
      if (w.index > A) {
        k = w;
        w = null;
      } else {
        k = w.sibling;
      }
      var F = x(p, w, f[A], v);
      if (F === null) {
        if (w === null) {
          w = k;
        }
        break;
      }
      if (e && w && F.alternate === null) {
        t(p, w);
      }
      s = l(F, s, A);
      if (B === null) {
        C = F;
      } else {
        B.sibling = F;
      }
      B = F;
      w = k;
    }
    if (A === f.length) {
      r(p, w);
      if (re) {
        Mt(p, A);
      }
      return C;
    }
    if (w === null) {
      for (; A < f.length; A++) {
        w = y(p, f[A], v);
        if (w !== null) {
          s = l(w, s, A);
          if (B === null) {
            C = w;
          } else {
            B.sibling = w;
          }
          B = w;
        }
      }
      if (re) {
        Mt(p, A);
      }
      return C;
    }
    for (w = n(p, w); A < f.length; A++) {
      k = m(w, p, A, f[A], v);
      if (k !== null) {
        if (e && k.alternate !== null) {
          w.delete(k.key === null ? A : k.key);
        }
        s = l(k, s, A);
        if (B === null) {
          C = k;
        } else {
          B.sibling = k;
        }
        B = k;
      }
    }
    if (e) {
      w.forEach(function (D) {
        return t(p, D);
      });
    }
    if (re) {
      Mt(p, A);
    }
    return C;
  }
  function g(p, s, f, v) {
    var C = Ur(f);
    if (typeof C != "function") {
      throw Error(T(150));
    }
    f = C.call(f);
    if (f == null) {
      throw Error(T(151));
    }
    var B = C = null;
    for (var w = s, A = s = 0, k = null, F = f.next(); w !== null && !F.done; A++, F = f.next()) {
      if (w.index > A) {
        k = w;
        w = null;
      } else {
        k = w.sibling;
      }
      var D = x(p, w, F.value, v);
      if (D === null) {
        if (w === null) {
          w = k;
        }
        break;
      }
      if (e && w && D.alternate === null) {
        t(p, w);
      }
      s = l(D, s, A);
      if (B === null) {
        C = D;
      } else {
        B.sibling = D;
      }
      B = D;
      w = k;
    }
    if (F.done) {
      r(p, w);
      if (re) {
        Mt(p, A);
      }
      return C;
    }
    if (w === null) {
      for (; !F.done; A++, F = f.next()) {
        F = y(p, F.value, v);
        if (F !== null) {
          s = l(F, s, A);
          if (B === null) {
            C = F;
          } else {
            B.sibling = F;
          }
          B = F;
        }
      }
      if (re) {
        Mt(p, A);
      }
      return C;
    }
    for (w = n(p, w); !F.done; A++, F = f.next()) {
      F = m(w, p, A, F.value, v);
      if (F !== null) {
        if (e && F.alternate !== null) {
          w.delete(F.key === null ? A : F.key);
        }
        s = l(F, s, A);
        if (B === null) {
          C = F;
        } else {
          B.sibling = F;
        }
        B = F;
      }
    }
    if (e) {
      w.forEach(function (z) {
        return t(p, z);
      });
    }
    if (re) {
      Mt(p, A);
    }
    return C;
  }
  function E(p, s, f, v) {
    if (typeof f == "object" && f !== null && f.type === ur && f.key === null) {
      f = f.props.children;
    }
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case Tn:
          e: {
            var C = f.key;
            for (var B = s; B !== null;) {
              if (B.key === C) {
                C = f.type;
                if (C === ur) {
                  if (B.tag === 7) {
                    r(p, B.sibling);
                    s = o(B, f.props.children);
                    s.return = p;
                    p = s;
                    break e;
                  }
                } else if (B.elementType === C || typeof C == "object" && C !== null && C.$$typeof === gt && Vu(C) === B.type) {
                  r(p, B.sibling);
                  s = o(B, f.props);
                  s.ref = Kr(p, B, f);
                  s.return = p;
                  p = s;
                  break e;
                }
                r(p, B);
                break;
              } else {
                t(p, B);
              }
              B = B.sibling;
            }
            if (f.type === ur) {
              s = Kt(f.props.children, p.mode, v, f.key);
              s.return = p;
              p = s;
            } else {
              v = a0(f.type, f.key, f.props, null, p.mode, v);
              v.ref = Kr(p, s, f);
              v.return = p;
              p = v;
            }
          }
          return i(p);
        case ir:
          e: {
            for (B = f.key; s !== null;) {
              if (s.key === B) {
                if (s.tag === 4 && s.stateNode.containerInfo === f.containerInfo && s.stateNode.implementation === f.implementation) {
                  r(p, s.sibling);
                  s = o(s, f.children || []);
                  s.return = p;
                  p = s;
                  break e;
                } else {
                  r(p, s);
                  break;
                }
              } else {
                t(p, s);
              }
              s = s.sibling;
            }
            s = Fo(f, p.mode, v);
            s.return = p;
            p = s;
          }
          return i(p);
        case gt:
          B = f._init;
          return E(p, s, B(f._payload), v);
      }
      if (Yr(f)) {
        return h(p, s, f, v);
      }
      if (Ur(f)) {
        return g(p, s, f, v);
      }
      Kn(p, f);
    }
    if (typeof f == "string" && f !== "" || typeof f == "number") {
      f = "" + f;
      if (s !== null && s.tag === 6) {
        r(p, s.sibling);
        s = o(s, f);
        s.return = p;
        p = s;
      } else {
        r(p, s);
        s = wo(f, p.mode, v);
        s.return = p;
        p = s;
      }
      return i(p);
    } else {
      return r(p, s);
    }
  }
  return E;
}
var _r = dc(true);
var pc = dc(false);
var B0 = Ht(null);
var w0 = null;
var vr = null;
var Bi = null;
function wi() {
  Bi = vr = w0 = null;
}
function Fi(e) {
  var t = B0.current;
  te(B0);
  e._currentValue = t;
}
function Hl(e, t, r) {
  while (e !== null) {
    var n = e.alternate;
    if ((e.childLanes & t) !== t) {
      e.childLanes |= t;
      if (n !== null) {
        n.childLanes |= t;
      }
    } else if (n !== null && (n.childLanes & t) !== t) {
      n.childLanes |= t;
    }
    if (e === r) {
      break;
    }
    e = e.return;
  }
}
function Br(e, t) {
  w0 = e;
  Bi = vr = null;
  e = e.dependencies;
  if (e !== null && e.firstContext !== null) {
    if (e.lanes & t) {
      _e = true;
    }
    e.firstContext = null;
  }
}
function Ve(e) {
  var t = e._currentValue;
  if (Bi !== e) {
    e = {
      context: e,
      memoizedValue: t,
      next: null
    };
    if (vr === null) {
      if (w0 === null) {
        throw Error(T(308));
      }
      vr = e;
      w0.dependencies = {
        lanes: 0,
        firstContext: e
      };
    } else {
      vr = vr.next = e;
    }
  }
  return t;
}
var $t = null;
function Ai(e) {
  if ($t === null) {
    $t = [e];
  } else {
    $t.push(e);
  }
}
function vc(e, t, r, n) {
  var o = t.interleaved;
  if (o === null) {
    r.next = r;
    Ai(t);
  } else {
    r.next = o.next;
    o.next = r;
  }
  t.interleaved = r;
  return dt(e, n);
}
function dt(e, t) {
  e.lanes |= t;
  var r = e.alternate;
  if (r !== null) {
    r.lanes |= t;
  }
  r = e;
  e = e.return;
  while (e !== null) {
    e.childLanes |= t;
    r = e.alternate;
    if (r !== null) {
      r.childLanes |= t;
    }
    r = e;
    e = e.return;
  }
  if (r.tag === 3) {
    return r.stateNode;
  } else {
    return null;
  }
}
var Et = false;
function Di(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      interleaved: null,
      lanes: 0
    },
    effects: null
  };
}
function hc(e, t) {
  e = e.updateQueue;
  if (t.updateQueue === e) {
    t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      effects: e.effects
    };
  }
}
function ct(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null
  };
}
function St(e, t, r) {
  var n = e.updateQueue;
  if (n === null) {
    return null;
  }
  n = n.shared;
  if (G & 2) {
    var o = n.pending;
    if (o === null) {
      t.next = t;
    } else {
      t.next = o.next;
      o.next = t;
    }
    n.pending = t;
    return dt(e, r);
  }
  o = n.interleaved;
  if (o === null) {
    t.next = t;
    Ai(n);
  } else {
    t.next = o.next;
    o.next = t;
  }
  n.interleaved = t;
  return dt(e, r);
}
function r0(e, t, r) {
  t = t.updateQueue;
  if (t !== null && (t = t.shared, (r & 4194240) !== 0)) {
    var n = t.lanes;
    n &= e.pendingLanes;
    r |= n;
    t.lanes = r;
    fi(e, r);
  }
}
function Qu(e, t) {
  var r = e.updateQueue;
  var n = e.alternate;
  if (n !== null && (n = n.updateQueue, r === n)) {
    var o = null;
    var l = null;
    r = r.firstBaseUpdate;
    if (r !== null) {
      do {
        var i = {
          eventTime: r.eventTime,
          lane: r.lane,
          tag: r.tag,
          payload: r.payload,
          callback: r.callback,
          next: null
        };
        if (l === null) {
          o = l = i;
        } else {
          l = l.next = i;
        }
        r = r.next;
      } while (r !== null);
      if (l === null) {
        o = l = t;
      } else {
        l = l.next = t;
      }
    } else {
      o = l = t;
    }
    r = {
      baseState: n.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: l,
      shared: n.shared,
      effects: n.effects
    };
    e.updateQueue = r;
    return;
  }
  e = r.lastBaseUpdate;
  if (e === null) {
    r.firstBaseUpdate = t;
  } else {
    e.next = t;
  }
  r.lastBaseUpdate = t;
}
function F0(e, t, r, n) {
  var o = e.updateQueue;
  Et = false;
  var l = o.firstBaseUpdate;
  var i = o.lastBaseUpdate;
  var a = o.shared.pending;
  if (a !== null) {
    o.shared.pending = null;
    var c = a;
    var u = c.next;
    c.next = null;
    if (i === null) {
      l = u;
    } else {
      i.next = u;
    }
    i = c;
    var d = e.alternate;
    if (d !== null) {
      d = d.updateQueue;
      a = d.lastBaseUpdate;
      if (a !== i) {
        if (a === null) {
          d.firstBaseUpdate = u;
        } else {
          a.next = u;
        }
        d.lastBaseUpdate = c;
      }
    }
  }
  if (l !== null) {
    var y = o.baseState;
    i = 0;
    d = u = c = null;
    a = l;
    do {
      var x = a.lane;
      var m = a.eventTime;
      if ((n & x) === x) {
        if (d !== null) {
          d = d.next = {
            eventTime: m,
            lane: 0,
            tag: a.tag,
            payload: a.payload,
            callback: a.callback,
            next: null
          };
        }
        e: {
          var h = e;
          var g = a;
          x = t;
          m = r;
          switch (g.tag) {
            case 1:
              h = g.payload;
              if (typeof h == "function") {
                y = h.call(m, y, x);
                break e;
              }
              y = h;
              break e;
            case 3:
              h.flags = h.flags & -65537 | 128;
            case 0:
              h = g.payload;
              x = typeof h == "function" ? h.call(m, y, x) : h;
              if (x == null) {
                break e;
              }
              y = le({}, y, x);
              break e;
            case 2:
              Et = true;
          }
        }
        if (a.callback !== null && a.lane !== 0) {
          e.flags |= 64;
          x = o.effects;
          if (x === null) {
            o.effects = [a];
          } else {
            x.push(a);
          }
        }
      } else {
        m = {
          eventTime: m,
          lane: x,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        };
        if (d === null) {
          u = d = m;
          c = y;
        } else {
          d = d.next = m;
        }
        i |= x;
      }
      a = a.next;
      if (a === null) {
        a = o.shared.pending;
        if (a === null) {
          break;
        }
        x = a;
        a = x.next;
        x.next = null;
        o.lastBaseUpdate = x;
        o.shared.pending = null;
      }
    } while (true);
    if (d === null) {
      c = y;
    }
    o.baseState = c;
    o.firstBaseUpdate = u;
    o.lastBaseUpdate = d;
    t = o.shared.interleaved;
    if (t !== null) {
      o = t;
      do {
        i |= o.lane;
        o = o.next;
      } while (o !== t);
    } else if (l === null) {
      o.shared.lanes = 0;
    }
    Yt |= i;
    e.lanes = i;
    e.memoizedState = y;
  }
}
function Ku(e, t, r) {
  e = t.effects;
  t.effects = null;
  if (e !== null) {
    for (t = 0; t < e.length; t++) {
      var n = e[t];
      var o = n.callback;
      if (o !== null) {
        n.callback = null;
        n = r;
        if (typeof o != "function") {
          throw Error(T(191, o));
        }
        o.call(n);
      }
    }
  }
}
var zn = {};
var lt = Ht(zn);
var En = Ht(zn);
var Cn = Ht(zn);
function Vt(e) {
  if (e === zn) {
    throw Error(T(174));
  }
  return e;
}
function _i(e, t) {
  b(Cn, t);
  b(En, e);
  b(lt, zn);
  e = t.nodeType;
  switch (e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : hl(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t;
      t = e.namespaceURI || null;
      e = e.tagName;
      t = hl(t, e);
  }
  te(lt);
  b(lt, t);
}
function kr() {
  te(lt);
  te(En);
  te(Cn);
}
function mc(e) {
  Vt(Cn.current);
  var t = Vt(lt.current);
  var r = hl(t, e.type);
  if (t !== r) {
    b(En, e);
    b(lt, r);
  }
}
function ki(e) {
  if (En.current === e) {
    te(lt);
    te(En);
  }
}
var ne = Ht(0);
function A0(e) {
  for (var t = e; t !== null;) {
    if (t.tag === 13) {
      var r = t.memoizedState;
      if (r !== null && (r = r.dehydrated, r === null || r.data === "$?" || r.data === "$!")) {
        return t;
      }
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== undefined) {
      if (t.flags & 128) {
        return t;
      }
    } else if (t.child !== null) {
      t.child.return = t;
      t = t.child;
      continue;
    }
    if (t === e) {
      break;
    }
    while (t.sibling === null) {
      if (t.return === null || t.return === e) {
        return null;
      }
      t = t.return;
    }
    t.sibling.return = t.return;
    t = t.sibling;
  }
  return null;
}
var mo = [];
function Si() {
  for (var e = 0; e < mo.length; e++) {
    mo[e]._workInProgressVersionPrimary = null;
  }
  mo.length = 0;
}
var n0 = vt.ReactCurrentDispatcher;
var yo = vt.ReactCurrentBatchConfig;
var Xt = 0;
var oe = null;
var ce = null;
var xe = null;
var D0 = false;
var on = false;
var Bn = 0;
var k1 = 0;
function ye() {
  throw Error(T(321));
}
function zi(e, t) {
  if (t === null) {
    return false;
  }
  for (var r = 0; r < t.length && r < e.length; r++) {
    if (!et(e[r], t[r])) {
      return false;
    }
  }
  return true;
}
function Pi(e, t, r, n, o, l) {
  Xt = l;
  oe = t;
  t.memoizedState = null;
  t.updateQueue = null;
  t.lanes = 0;
  n0.current = e === null || e.memoizedState === null ? N1 : R1;
  e = r(n, o);
  if (on) {
    l = 0;
    do {
      on = false;
      Bn = 0;
      if (l >= 25) {
        throw Error(T(301));
      }
      l += 1;
      xe = ce = null;
      t.updateQueue = null;
      n0.current = L1;
      e = r(n, o);
    } while (on);
  }
  n0.current = _0;
  t = ce !== null && ce.next !== null;
  Xt = 0;
  xe = ce = oe = null;
  D0 = false;
  if (t) {
    throw Error(T(300));
  }
  return e;
}
function Ni() {
  var e = Bn !== 0;
  Bn = 0;
  return e;
}
function rt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  if (xe === null) {
    oe.memoizedState = xe = e;
  } else {
    xe = xe.next = e;
  }
  return xe;
}
function Qe() {
  if (ce === null) {
    var e = oe.alternate;
    e = e !== null ? e.memoizedState : null;
  } else {
    e = ce.next;
  }
  var t = xe === null ? oe.memoizedState : xe.next;
  if (t !== null) {
    xe = t;
    ce = e;
  } else {
    if (e === null) {
      throw Error(T(310));
    }
    ce = e;
    e = {
      memoizedState: ce.memoizedState,
      baseState: ce.baseState,
      baseQueue: ce.baseQueue,
      queue: ce.queue,
      next: null
    };
    if (xe === null) {
      oe.memoizedState = xe = e;
    } else {
      xe = xe.next = e;
    }
  }
  return xe;
}
function wn(e, t) {
  if (typeof t == "function") {
    return t(e);
  } else {
    return t;
  }
}
function go(e) {
  var t = Qe();
  var r = t.queue;
  if (r === null) {
    throw Error(T(311));
  }
  r.lastRenderedReducer = e;
  var n = ce;
  var o = n.baseQueue;
  var l = r.pending;
  if (l !== null) {
    if (o !== null) {
      var i = o.next;
      o.next = l.next;
      l.next = i;
    }
    n.baseQueue = o = l;
    r.pending = null;
  }
  if (o !== null) {
    l = o.next;
    n = n.baseState;
    var a = i = null;
    var c = null;
    var u = l;
    do {
      var d = u.lane;
      if ((Xt & d) === d) {
        if (c !== null) {
          c = c.next = {
            lane: 0,
            action: u.action,
            hasEagerState: u.hasEagerState,
            eagerState: u.eagerState,
            next: null
          };
        }
        n = u.hasEagerState ? u.eagerState : e(n, u.action);
      } else {
        var y = {
          lane: d,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        if (c === null) {
          a = c = y;
          i = n;
        } else {
          c = c.next = y;
        }
        oe.lanes |= d;
        Yt |= d;
      }
      u = u.next;
    } while (u !== null && u !== l);
    if (c === null) {
      i = n;
    } else {
      c.next = a;
    }
    if (!et(n, t.memoizedState)) {
      _e = true;
    }
    t.memoizedState = n;
    t.baseState = i;
    t.baseQueue = c;
    r.lastRenderedState = n;
  }
  e = r.interleaved;
  if (e !== null) {
    o = e;
    do {
      l = o.lane;
      oe.lanes |= l;
      Yt |= l;
      o = o.next;
    } while (o !== e);
  } else if (o === null) {
    r.lanes = 0;
  }
  return [t.memoizedState, r.dispatch];
}
function Eo(e) {
  var t = Qe();
  var r = t.queue;
  if (r === null) {
    throw Error(T(311));
  }
  r.lastRenderedReducer = e;
  var n = r.dispatch;
  var o = r.pending;
  var l = t.memoizedState;
  if (o !== null) {
    r.pending = null;
    var i = o = o.next;
    do {
      l = e(l, i.action);
      i = i.next;
    } while (i !== o);
    if (!et(l, t.memoizedState)) {
      _e = true;
    }
    t.memoizedState = l;
    if (t.baseQueue === null) {
      t.baseState = l;
    }
    r.lastRenderedState = l;
  }
  return [l, n];
}
function yc() {}
function gc(e, t) {
  var r = oe;
  var n = Qe();
  var o = t();
  var l = !et(n.memoizedState, o);
  if (l) {
    n.memoizedState = o;
    _e = true;
  }
  n = n.queue;
  Ri(Bc.bind(null, r, n, e), [e]);
  if (n.getSnapshot !== t || l || xe !== null && xe.memoizedState.tag & 1) {
    r.flags |= 2048;
    Fn(9, Cc.bind(null, r, n, o, t), undefined, null);
    if (de === null) {
      throw Error(T(349));
    }
    if (!(Xt & 30)) {
      Ec(r, t, o);
    }
  }
  return o;
}
function Ec(e, t, r) {
  e.flags |= 16384;
  e = {
    getSnapshot: t,
    value: r
  };
  t = oe.updateQueue;
  if (t === null) {
    t = {
      lastEffect: null,
      stores: null
    };
    oe.updateQueue = t;
    t.stores = [e];
  } else {
    r = t.stores;
    if (r === null) {
      t.stores = [e];
    } else {
      r.push(e);
    }
  }
}
function Cc(e, t, r, n) {
  t.value = r;
  t.getSnapshot = n;
  if (wc(t)) {
    Fc(e);
  }
}
function Bc(e, t, r) {
  return r(function () {
    if (wc(t)) {
      Fc(e);
    }
  });
}
function wc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var r = t();
    return !et(e, r);
  } catch {
    return true;
  }
}
function Fc(e) {
  var t = dt(e, 1);
  if (t !== null) {
    be(t, e, 1, -1);
  }
}
function qu(e) {
  var t = rt();
  if (typeof e == "function") {
    e = e();
  }
  t.memoizedState = t.baseState = e;
  e = {
    pending: null,
    interleaved: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: wn,
    lastRenderedState: e
  };
  t.queue = e;
  e = e.dispatch = P1.bind(null, oe, e);
  return [t.memoizedState, e];
}
function Fn(e, t, r, n) {
  e = {
    tag: e,
    create: t,
    destroy: r,
    deps: n,
    next: null
  };
  t = oe.updateQueue;
  if (t === null) {
    t = {
      lastEffect: null,
      stores: null
    };
    oe.updateQueue = t;
    t.lastEffect = e.next = e;
  } else {
    r = t.lastEffect;
    if (r === null) {
      t.lastEffect = e.next = e;
    } else {
      n = r.next;
      r.next = e;
      e.next = n;
      t.lastEffect = e;
    }
  }
  return e;
}
function Ac() {
  return Qe().memoizedState;
}
function o0(e, t, r, n) {
  var o = rt();
  oe.flags |= e;
  o.memoizedState = Fn(t | 1, r, undefined, n === undefined ? null : n);
}
function M0(e, t, r, n) {
  var o = Qe();
  n = n === undefined ? null : n;
  var l = undefined;
  if (ce !== null) {
    var i = ce.memoizedState;
    l = i.destroy;
    if (n !== null && zi(n, i.deps)) {
      o.memoizedState = Fn(t, r, l, n);
      return;
    }
  }
  oe.flags |= e;
  o.memoizedState = Fn(t | 1, r, l, n);
}
function Gu(e, t) {
  return o0(8390656, 8, e, t);
}
function Ri(e, t) {
  return M0(2048, 8, e, t);
}
function Dc(e, t) {
  return M0(4, 2, e, t);
}
function _c(e, t) {
  return M0(4, 4, e, t);
}
function kc(e, t) {
  if (typeof t == "function") {
    e = e();
    t(e);
    return function () {
      t(null);
    };
  }
  if (t != null) {
    e = e();
    t.current = e;
    return function () {
      t.current = null;
    };
  }
}
function Sc(e, t, r) {
  r = r != null ? r.concat([e]) : null;
  return M0(4, 4, kc.bind(null, t, e), r);
}
function Li() {}
function zc(e, t) {
  var r = Qe();
  t = t === undefined ? null : t;
  var n = r.memoizedState;
  if (n !== null && t !== null && zi(t, n[1])) {
    return n[0];
  } else {
    r.memoizedState = [e, t];
    return e;
  }
}
function Pc(e, t) {
  var r = Qe();
  t = t === undefined ? null : t;
  var n = r.memoizedState;
  if (n !== null && t !== null && zi(t, n[1])) {
    return n[0];
  } else {
    e = e();
    r.memoizedState = [e, t];
    return e;
  }
}
function Nc(e, t, r) {
  if (Xt & 21) {
    if (!et(r, t)) {
      r = Os();
      oe.lanes |= r;
      Yt |= r;
      e.baseState = true;
    }
    return t;
  } else {
    if (e.baseState) {
      e.baseState = false;
      _e = true;
    }
    return e.memoizedState = r;
  }
}
function S1(e, t) {
  var r = Z;
  Z = r !== 0 && r < 4 ? r : 4;
  e(true);
  var n = yo.transition;
  yo.transition = {};
  try {
    e(false);
    t();
  } finally {
    Z = r;
    yo.transition = n;
  }
}
function Rc() {
  return Qe().memoizedState;
}
function z1(e, t, r) {
  var n = Pt(e);
  r = {
    lane: n,
    action: r,
    hasEagerState: false,
    eagerState: null,
    next: null
  };
  if (Lc(e)) {
    Tc(t, r);
  } else {
    r = vc(e, t, r, n);
    if (r !== null) {
      var o = we();
      be(r, e, n, o);
      Hc(r, t, n);
    }
  }
}
function P1(e, t, r) {
  var n = Pt(e);
  var o = {
    lane: n,
    action: r,
    hasEagerState: false,
    eagerState: null,
    next: null
  };
  if (Lc(e)) {
    Tc(t, o);
  } else {
    var l = e.alternate;
    if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer, l !== null)) {
      try {
        var i = t.lastRenderedState;
        var a = l(i, r);
        o.hasEagerState = true;
        o.eagerState = a;
        if (et(a, i)) {
          var c = t.interleaved;
          if (c === null) {
            o.next = o;
            Ai(t);
          } else {
            o.next = c.next;
            c.next = o;
          }
          t.interleaved = o;
          return;
        }
      } catch {} finally {}
    }
    r = vc(e, t, o, n);
    if (r !== null) {
      o = we();
      be(r, e, n, o);
      Hc(r, t, n);
    }
  }
}
function Lc(e) {
  var t = e.alternate;
  return e === oe || t !== null && t === oe;
}
function Tc(e, t) {
  on = D0 = true;
  var r = e.pending;
  if (r === null) {
    t.next = t;
  } else {
    t.next = r.next;
    r.next = t;
  }
  e.pending = t;
}
function Hc(e, t, r) {
  if (r & 4194240) {
    var n = t.lanes;
    n &= e.pendingLanes;
    r |= n;
    t.lanes = r;
    fi(e, r);
  }
}
var _0 = {
  readContext: Ve,
  useCallback: ye,
  useContext: ye,
  useEffect: ye,
  useImperativeHandle: ye,
  useInsertionEffect: ye,
  useLayoutEffect: ye,
  useMemo: ye,
  useReducer: ye,
  useRef: ye,
  useState: ye,
  useDebugValue: ye,
  useDeferredValue: ye,
  useTransition: ye,
  useMutableSource: ye,
  useSyncExternalStore: ye,
  useId: ye,
  unstable_isNewReconciler: false
};
var N1 = {
  readContext: Ve,
  useCallback: function (e, t) {
    rt().memoizedState = [e, t === undefined ? null : t];
    return e;
  },
  useContext: Ve,
  useEffect: Gu,
  useImperativeHandle: function (e, t, r) {
    r = r != null ? r.concat([e]) : null;
    return o0(4194308, 4, kc.bind(null, t, e), r);
  },
  useLayoutEffect: function (e, t) {
    return o0(4194308, 4, e, t);
  },
  useInsertionEffect: function (e, t) {
    return o0(4, 2, e, t);
  },
  useMemo: function (e, t) {
    var r = rt();
    t = t === undefined ? null : t;
    e = e();
    r.memoizedState = [e, t];
    return e;
  },
  useReducer: function (e, t, r) {
    var n = rt();
    t = r !== undefined ? r(t) : t;
    n.memoizedState = n.baseState = t;
    e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: t
    };
    n.queue = e;
    e = e.dispatch = z1.bind(null, oe, e);
    return [n.memoizedState, e];
  },
  useRef: function (e) {
    var t = rt();
    e = {
      current: e
    };
    return t.memoizedState = e;
  },
  useState: qu,
  useDebugValue: Li,
  useDeferredValue: function (e) {
    return rt().memoizedState = e;
  },
  useTransition: function () {
    var e = qu(false);
    var t = e[0];
    e = S1.bind(null, e[1]);
    rt().memoizedState = e;
    return [t, e];
  },
  useMutableSource: function () {},
  useSyncExternalStore: function (e, t, r) {
    var n = oe;
    var o = rt();
    if (re) {
      if (r === undefined) {
        throw Error(T(407));
      }
      r = r();
    } else {
      r = t();
      if (de === null) {
        throw Error(T(349));
      }
      if (!(Xt & 30)) {
        Ec(n, t, r);
      }
    }
    o.memoizedState = r;
    var l = {
      value: r,
      getSnapshot: t
    };
    o.queue = l;
    Gu(Bc.bind(null, n, l, e), [e]);
    n.flags |= 2048;
    Fn(9, Cc.bind(null, n, l, r, t), undefined, null);
    return r;
  },
  useId: function () {
    var e = rt();
    var t = de.identifierPrefix;
    if (re) {
      var r = st;
      var n = at;
      r = (n & ~(1 << 32 - Je(n) - 1)).toString(32) + r;
      t = ":" + t + "R" + r;
      r = Bn++;
      if (r > 0) {
        t += "H" + r.toString(32);
      }
      t += ":";
    } else {
      r = k1++;
      t = ":" + t + "r" + r.toString(32) + ":";
    }
    return e.memoizedState = t;
  },
  unstable_isNewReconciler: false
};
var R1 = {
  readContext: Ve,
  useCallback: zc,
  useContext: Ve,
  useEffect: Ri,
  useImperativeHandle: Sc,
  useInsertionEffect: Dc,
  useLayoutEffect: _c,
  useMemo: Pc,
  useReducer: go,
  useRef: Ac,
  useState: function () {
    return go(wn);
  },
  useDebugValue: Li,
  useDeferredValue: function (e) {
    var t = Qe();
    return Nc(t, ce.memoizedState, e);
  },
  useTransition: function () {
    var e = go(wn)[0];
    var t = Qe().memoizedState;
    return [e, t];
  },
  useMutableSource: yc,
  useSyncExternalStore: gc,
  useId: Rc,
  unstable_isNewReconciler: false
};
var L1 = {
  readContext: Ve,
  useCallback: zc,
  useContext: Ve,
  useEffect: Ri,
  useImperativeHandle: Sc,
  useInsertionEffect: Dc,
  useLayoutEffect: _c,
  useMemo: Pc,
  useReducer: Eo,
  useRef: Ac,
  useState: function () {
    return Eo(wn);
  },
  useDebugValue: Li,
  useDeferredValue: function (e) {
    var t = Qe();
    if (ce === null) {
      return t.memoizedState = e;
    } else {
      return Nc(t, ce.memoizedState, e);
    }
  },
  useTransition: function () {
    var e = Eo(wn)[0];
    var t = Qe().memoizedState;
    return [e, t];
  },
  useMutableSource: yc,
  useSyncExternalStore: gc,
  useId: Rc,
  unstable_isNewReconciler: false
};
function Xe(e, t) {
  if (e && e.defaultProps) {
    t = le({}, t);
    e = e.defaultProps;
    for (var r in e) {
      if (t[r] === undefined) {
        t[r] = e[r];
      }
    }
    return t;
  }
  return t;
}
function Ol(e, t, r, n) {
  t = e.memoizedState;
  r = r(n, t);
  r = r == null ? t : le({}, t, r);
  e.memoizedState = r;
  if (e.lanes === 0) {
    e.updateQueue.baseState = r;
  }
}
var U0 = {
  isMounted: function (e) {
    if (e = e._reactInternals) {
      return bt(e) === e;
    } else {
      return false;
    }
  },
  enqueueSetState: function (e, t, r) {
    e = e._reactInternals;
    var n = we();
    var o = Pt(e);
    var l = ct(n, o);
    l.payload = t;
    if (r != null) {
      l.callback = r;
    }
    t = St(e, l, o);
    if (t !== null) {
      be(t, e, o, n);
      r0(t, e, o);
    }
  },
  enqueueReplaceState: function (e, t, r) {
    e = e._reactInternals;
    var n = we();
    var o = Pt(e);
    var l = ct(n, o);
    l.tag = 1;
    l.payload = t;
    if (r != null) {
      l.callback = r;
    }
    t = St(e, l, o);
    if (t !== null) {
      be(t, e, o, n);
      r0(t, e, o);
    }
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var r = we();
    var n = Pt(e);
    var o = ct(r, n);
    o.tag = 2;
    if (t != null) {
      o.callback = t;
    }
    t = St(e, o, n);
    if (t !== null) {
      be(t, e, n, r);
      r0(t, e, n);
    }
  }
};
function Xu(e, t, r, n, o, l, i) {
  e = e.stateNode;
  if (typeof e.shouldComponentUpdate == "function") {
    return e.shouldComponentUpdate(n, l, i);
  } else if (t.prototype && t.prototype.isPureReactComponent) {
    return !hn(r, n) || !hn(o, l);
  } else {
    return true;
  }
}
function Oc(e, t, r) {
  var n = false;
  var o = Lt;
  var l = t.contextType;
  if (typeof l == "object" && l !== null) {
    l = Ve(l);
  } else {
    o = Se(t) ? qt : Ce.current;
    n = t.contextTypes;
    l = (n = n != null) ? Ar(e, o) : Lt;
  }
  t = new t(r, l);
  e.memoizedState = t.state ?? null;
  t.updater = U0;
  e.stateNode = t;
  t._reactInternals = e;
  if (n) {
    e = e.stateNode;
    e.__reactInternalMemoizedUnmaskedChildContext = o;
    e.__reactInternalMemoizedMaskedChildContext = l;
  }
  return t;
}
function Yu(e, t, r, n) {
  e = t.state;
  if (typeof t.componentWillReceiveProps == "function") {
    t.componentWillReceiveProps(r, n);
  }
  if (typeof t.UNSAFE_componentWillReceiveProps == "function") {
    t.UNSAFE_componentWillReceiveProps(r, n);
  }
  if (t.state !== e) {
    U0.enqueueReplaceState(t, t.state, null);
  }
}
function jl(e, t, r, n) {
  var o = e.stateNode;
  o.props = r;
  o.state = e.memoizedState;
  o.refs = {};
  Di(e);
  var l = t.contextType;
  if (typeof l == "object" && l !== null) {
    o.context = Ve(l);
  } else {
    l = Se(t) ? qt : Ce.current;
    o.context = Ar(e, l);
  }
  o.state = e.memoizedState;
  l = t.getDerivedStateFromProps;
  if (typeof l == "function") {
    Ol(e, t, l, r);
    o.state = e.memoizedState;
  }
  if (typeof t.getDerivedStateFromProps != "function" && typeof o.getSnapshotBeforeUpdate != "function" && (typeof o.UNSAFE_componentWillMount == "function" || typeof o.componentWillMount == "function")) {
    t = o.state;
    if (typeof o.componentWillMount == "function") {
      o.componentWillMount();
    }
    if (typeof o.UNSAFE_componentWillMount == "function") {
      o.UNSAFE_componentWillMount();
    }
    if (t !== o.state) {
      U0.enqueueReplaceState(o, o.state, null);
    }
    F0(e, r, o, n);
    o.state = e.memoizedState;
  }
  if (typeof o.componentDidMount == "function") {
    e.flags |= 4194308;
  }
}
function Sr(e, t) {
  try {
    var r = "";
    var n = t;
    do {
      r += ax(n);
      n = n.return;
    } while (n);
    var o = r;
  } catch (l) {
    o = `
Error generating stack: ${l.message}
${l.stack}`;
  }
  return {
    value: e,
    source: t,
    stack: o,
    digest: null
  };
}
function Co(e, t, r) {
  return {
    value: e,
    source: null,
    stack: r ?? null,
    digest: t ?? null
  };
}
function Il(e, t) {
  try {
    console.error(t.value);
  } catch (r) {
    setTimeout(function () {
      throw r;
    });
  }
}
var T1 = typeof WeakMap == "function" ? WeakMap : Map;
function jc(e, t, r) {
  r = ct(-1, r);
  r.tag = 3;
  r.payload = {
    element: null
  };
  var n = t.value;
  r.callback = function () {
    if (!S0) {
      S0 = true;
      Xl = n;
    }
    Il(e, t);
  };
  return r;
}
function Ic(e, t, r) {
  r = ct(-1, r);
  r.tag = 3;
  var n = e.type.getDerivedStateFromError;
  if (typeof n == "function") {
    var o = t.value;
    r.payload = function () {
      return n(o);
    };
    r.callback = function () {
      Il(e, t);
    };
  }
  var l = e.stateNode;
  if (l !== null && typeof l.componentDidCatch == "function") {
    r.callback = function () {
      Il(e, t);
      if (typeof n != "function") {
        if (zt === null) {
          zt = new Set([this]);
        } else {
          zt.add(this);
        }
      }
      var i = t.stack;
      this.componentDidCatch(t.value, {
        componentStack: i !== null ? i : ""
      });
    };
  }
  return r;
}
function Zu(e, t, r) {
  var n = e.pingCache;
  if (n === null) {
    n = e.pingCache = new T1();
    var o = new Set();
    n.set(t, o);
  } else {
    o = n.get(t);
    if (o === undefined) {
      o = new Set();
      n.set(t, o);
    }
  }
  if (!o.has(r)) {
    o.add(r);
    e = X1.bind(null, e, t, r);
    t.then(e, e);
  }
}
function Ju(e) {
  do {
    var t;
    if (t = e.tag === 13) {
      t = e.memoizedState;
      t = t !== null ? t.dehydrated !== null : true;
    }
    if (t) {
      return e;
    }
    e = e.return;
  } while (e !== null);
  return null;
}
function bu(e, t, r, n, o) {
  if (e.mode & 1) {
    e.flags |= 65536;
    e.lanes = o;
    return e;
  } else {
    if (e === t) {
      e.flags |= 65536;
    } else {
      e.flags |= 128;
      r.flags |= 131072;
      r.flags &= -52805;
      if (r.tag === 1) {
        if (r.alternate === null) {
          r.tag = 17;
        } else {
          t = ct(-1, 1);
          t.tag = 2;
          St(r, t, 1);
        }
      }
      r.lanes |= 1;
    }
    return e;
  }
}
var H1 = vt.ReactCurrentOwner;
var _e = false;
function Be(e, t, r, n) {
  t.child = e === null ? pc(t, null, r, n) : _r(t, e.child, r, n);
}
function ea(e, t, r, n, o) {
  r = r.render;
  var l = t.ref;
  Br(t, o);
  n = Pi(e, t, r, n, l, o);
  r = Ni();
  if (e !== null && !_e) {
    t.updateQueue = e.updateQueue;
    t.flags &= -2053;
    e.lanes &= ~o;
    return pt(e, t, o);
  } else {
    if (re && r) {
      gi(t);
    }
    t.flags |= 1;
    Be(e, t, n, o);
    return t.child;
  }
}
function ta(e, t, r, n, o) {
  if (e === null) {
    var l = r.type;
    if (typeof l == "function" && !Wi(l) && l.defaultProps === undefined && r.compare === null && r.defaultProps === undefined) {
      t.tag = 15;
      t.type = l;
      return Mc(e, t, l, n, o);
    } else {
      e = a0(r.type, null, n, t, t.mode, o);
      e.ref = t.ref;
      e.return = t;
      return t.child = e;
    }
  }
  l = e.child;
  if (!(e.lanes & o)) {
    var i = l.memoizedProps;
    r = r.compare;
    r = r !== null ? r : hn;
    if (r(i, n) && e.ref === t.ref) {
      return pt(e, t, o);
    }
  }
  t.flags |= 1;
  e = Nt(l, n);
  e.ref = t.ref;
  e.return = t;
  return t.child = e;
}
function Mc(e, t, r, n, o) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (hn(l, n) && e.ref === t.ref) {
      _e = false;
      t.pendingProps = n = l;
      if ((e.lanes & o) !== 0) {
        if (e.flags & 131072) {
          _e = true;
        }
      } else {
        t.lanes = e.lanes;
        return pt(e, t, o);
      }
    }
  }
  return Ml(e, t, r, n, o);
}
function Uc(e, t, r) {
  var n = t.pendingProps;
  var o = n.children;
  var l = e !== null ? e.memoizedState : null;
  if (n.mode === "hidden") {
    if (!(t.mode & 1)) {
      t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      };
      b(mr, Re);
      Re |= r;
    } else {
      if (!(r & 1073741824)) {
        e = l !== null ? l.baseLanes | r : r;
        t.lanes = t.childLanes = 1073741824;
        t.memoizedState = {
          baseLanes: e,
          cachePool: null,
          transitions: null
        };
        t.updateQueue = null;
        b(mr, Re);
        Re |= e;
        return null;
      }
      t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      };
      n = l !== null ? l.baseLanes : r;
      b(mr, Re);
      Re |= n;
    }
  } else {
    if (l !== null) {
      n = l.baseLanes | r;
      t.memoizedState = null;
    } else {
      n = r;
    }
    b(mr, Re);
    Re |= n;
  }
  Be(e, t, o, r);
  return t.child;
}
function Wc(e, t) {
  var r = t.ref;
  if (e === null && r !== null || e !== null && e.ref !== r) {
    t.flags |= 512;
    t.flags |= 2097152;
  }
}
function Ml(e, t, r, n, o) {
  var l = Se(r) ? qt : Ce.current;
  l = Ar(t, l);
  Br(t, o);
  r = Pi(e, t, r, n, l, o);
  n = Ni();
  if (e !== null && !_e) {
    t.updateQueue = e.updateQueue;
    t.flags &= -2053;
    e.lanes &= ~o;
    return pt(e, t, o);
  } else {
    if (re && n) {
      gi(t);
    }
    t.flags |= 1;
    Be(e, t, r, o);
    return t.child;
  }
}
function ra(e, t, r, n, o) {
  if (Se(r)) {
    var l = true;
    g0(t);
  } else {
    l = false;
  }
  Br(t, o);
  if (t.stateNode === null) {
    l0(e, t);
    Oc(t, r, n);
    jl(t, r, n, o);
    n = true;
  } else if (e === null) {
    var i = t.stateNode;
    var a = t.memoizedProps;
    i.props = a;
    var c = i.context;
    var u = r.contextType;
    if (typeof u == "object" && u !== null) {
      u = Ve(u);
    } else {
      u = Se(r) ? qt : Ce.current;
      u = Ar(t, u);
    }
    var d = r.getDerivedStateFromProps;
    var y = typeof d == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    if (!y && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function")) {
      if (a !== n || c !== u) {
        Yu(t, i, n, u);
      }
    }
    Et = false;
    var x = t.memoizedState;
    i.state = x;
    F0(t, n, i, o);
    c = t.memoizedState;
    if (a !== n || x !== c || ke.current || Et) {
      if (typeof d == "function") {
        Ol(t, r, d, n);
        c = t.memoizedState;
      }
      if (a = Et || Xu(t, r, a, n, x, c, u)) {
        if (!y && (typeof i.UNSAFE_componentWillMount == "function" || typeof i.componentWillMount == "function")) {
          if (typeof i.componentWillMount == "function") {
            i.componentWillMount();
          }
          if (typeof i.UNSAFE_componentWillMount == "function") {
            i.UNSAFE_componentWillMount();
          }
        }
        if (typeof i.componentDidMount == "function") {
          t.flags |= 4194308;
        }
      } else {
        if (typeof i.componentDidMount == "function") {
          t.flags |= 4194308;
        }
        t.memoizedProps = n;
        t.memoizedState = c;
      }
      i.props = n;
      i.state = c;
      i.context = u;
      n = a;
    } else {
      if (typeof i.componentDidMount == "function") {
        t.flags |= 4194308;
      }
      n = false;
    }
  } else {
    i = t.stateNode;
    hc(e, t);
    a = t.memoizedProps;
    u = t.type === t.elementType ? a : Xe(t.type, a);
    i.props = u;
    y = t.pendingProps;
    x = i.context;
    c = r.contextType;
    if (typeof c == "object" && c !== null) {
      c = Ve(c);
    } else {
      c = Se(r) ? qt : Ce.current;
      c = Ar(t, c);
    }
    var m = r.getDerivedStateFromProps;
    if (!(d = typeof m == "function" || typeof i.getSnapshotBeforeUpdate == "function") && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function")) {
      if (a !== y || x !== c) {
        Yu(t, i, n, c);
      }
    }
    Et = false;
    x = t.memoizedState;
    i.state = x;
    F0(t, n, i, o);
    var h = t.memoizedState;
    if (a !== y || x !== h || ke.current || Et) {
      if (typeof m == "function") {
        Ol(t, r, m, n);
        h = t.memoizedState;
      }
      if (u = Et || Xu(t, r, u, n, x, h, c) || false) {
        if (!d && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function")) {
          if (typeof i.componentWillUpdate == "function") {
            i.componentWillUpdate(n, h, c);
          }
          if (typeof i.UNSAFE_componentWillUpdate == "function") {
            i.UNSAFE_componentWillUpdate(n, h, c);
          }
        }
        if (typeof i.componentDidUpdate == "function") {
          t.flags |= 4;
        }
        if (typeof i.getSnapshotBeforeUpdate == "function") {
          t.flags |= 1024;
        }
      } else {
        if (typeof i.componentDidUpdate == "function" && (a !== e.memoizedProps || x !== e.memoizedState)) {
          t.flags |= 4;
        }
        if (typeof i.getSnapshotBeforeUpdate == "function" && (a !== e.memoizedProps || x !== e.memoizedState)) {
          t.flags |= 1024;
        }
        t.memoizedProps = n;
        t.memoizedState = h;
      }
      i.props = n;
      i.state = h;
      i.context = c;
      n = u;
    } else {
      if (typeof i.componentDidUpdate == "function" && (a !== e.memoizedProps || x !== e.memoizedState)) {
        t.flags |= 4;
      }
      if (typeof i.getSnapshotBeforeUpdate == "function" && (a !== e.memoizedProps || x !== e.memoizedState)) {
        t.flags |= 1024;
      }
      n = false;
    }
  }
  return Ul(e, t, r, n, l, o);
}
function Ul(e, t, r, n, o, l) {
  Wc(e, t);
  var i = (t.flags & 128) !== 0;
  if (!n && !i) {
    if (o) {
      Uu(t, r, false);
    }
    return pt(e, t, l);
  }
  n = t.stateNode;
  H1.current = t;
  var a = i && typeof r.getDerivedStateFromError != "function" ? null : n.render();
  t.flags |= 1;
  if (e !== null && i) {
    t.child = _r(t, e.child, null, l);
    t.child = _r(t, null, a, l);
  } else {
    Be(e, t, a, l);
  }
  t.memoizedState = n.state;
  if (o) {
    Uu(t, r, true);
  }
  return t.child;
}
function $c(e) {
  var t = e.stateNode;
  if (t.pendingContext) {
    Mu(e, t.pendingContext, t.pendingContext !== t.context);
  } else if (t.context) {
    Mu(e, t.context, false);
  }
  _i(e, t.containerInfo);
}
function na(e, t, r, n, o) {
  Dr();
  Ci(o);
  t.flags |= 256;
  Be(e, t, r, n);
  return t.child;
}
var Wl = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0
};
function $l(e) {
  return {
    baseLanes: e,
    cachePool: null,
    transitions: null
  };
}
function Vc(e, t, r) {
  var n = t.pendingProps;
  var o = ne.current;
  var l = false;
  var i = (t.flags & 128) !== 0;
  var a;
  if (!(a = i)) {
    a = e !== null && e.memoizedState === null ? false : (o & 2) !== 0;
  }
  if (a) {
    l = true;
    t.flags &= -129;
  } else if (e === null || e.memoizedState !== null) {
    o |= 1;
  }
  b(ne, o & 1);
  if (e === null) {
    Tl(t);
    e = t.memoizedState;
    if (e !== null && (e = e.dehydrated, e !== null)) {
      if (t.mode & 1) {
        if (e.data === "$!") {
          t.lanes = 8;
        } else {
          t.lanes = 1073741824;
        }
      } else {
        t.lanes = 1;
      }
      return null;
    } else {
      i = n.children;
      e = n.fallback;
      if (l) {
        n = t.mode;
        l = t.child;
        i = {
          mode: "hidden",
          children: i
        };
        if (!(n & 1) && l !== null) {
          l.childLanes = 0;
          l.pendingProps = i;
        } else {
          l = V0(i, n, 0, null);
        }
        e = Kt(e, n, r, null);
        l.return = t;
        e.return = t;
        l.sibling = e;
        t.child = l;
        t.child.memoizedState = $l(r);
        t.memoizedState = Wl;
        return e;
      } else {
        return Ti(t, i);
      }
    }
  }
  o = e.memoizedState;
  if (o !== null && (a = o.dehydrated, a !== null)) {
    return O1(e, t, i, n, a, o, r);
  }
  if (l) {
    l = n.fallback;
    i = t.mode;
    o = e.child;
    a = o.sibling;
    var c = {
      mode: "hidden",
      children: n.children
    };
    if (!(i & 1) && t.child !== o) {
      n = t.child;
      n.childLanes = 0;
      n.pendingProps = c;
      t.deletions = null;
    } else {
      n = Nt(o, c);
      n.subtreeFlags = o.subtreeFlags & 14680064;
    }
    if (a !== null) {
      l = Nt(a, l);
    } else {
      l = Kt(l, i, r, null);
      l.flags |= 2;
    }
    l.return = t;
    n.return = t;
    n.sibling = l;
    t.child = n;
    n = l;
    l = t.child;
    i = e.child.memoizedState;
    i = i === null ? $l(r) : {
      baseLanes: i.baseLanes | r,
      cachePool: null,
      transitions: i.transitions
    };
    l.memoizedState = i;
    l.childLanes = e.childLanes & ~r;
    t.memoizedState = Wl;
    return n;
  }
  l = e.child;
  e = l.sibling;
  n = Nt(l, {
    mode: "visible",
    children: n.children
  });
  if (!(t.mode & 1)) {
    n.lanes = r;
  }
  n.return = t;
  n.sibling = null;
  if (e !== null) {
    r = t.deletions;
    if (r === null) {
      t.deletions = [e];
      t.flags |= 16;
    } else {
      r.push(e);
    }
  }
  t.child = n;
  t.memoizedState = null;
  return n;
}
function Ti(e, t) {
  t = V0({
    mode: "visible",
    children: t
  }, e.mode, 0, null);
  t.return = e;
  return e.child = t;
}
function qn(e, t, r, n) {
  if (n !== null) {
    Ci(n);
  }
  _r(t, e.child, null, r);
  e = Ti(t, t.pendingProps.children);
  e.flags |= 2;
  t.memoizedState = null;
  return e;
}
function O1(e, t, r, n, o, l, i) {
  if (r) {
    if (t.flags & 256) {
      t.flags &= -257;
      n = Co(Error(T(422)));
      return qn(e, t, i, n);
    } else if (t.memoizedState !== null) {
      t.child = e.child;
      t.flags |= 128;
      return null;
    } else {
      l = n.fallback;
      o = t.mode;
      n = V0({
        mode: "visible",
        children: n.children
      }, o, 0, null);
      l = Kt(l, o, i, null);
      l.flags |= 2;
      n.return = t;
      l.return = t;
      n.sibling = l;
      t.child = n;
      if (t.mode & 1) {
        _r(t, e.child, null, i);
      }
      t.child.memoizedState = $l(i);
      t.memoizedState = Wl;
      return l;
    }
  }
  if (!(t.mode & 1)) {
    return qn(e, t, i, null);
  }
  if (o.data === "$!") {
    n = o.nextSibling && o.nextSibling.dataset;
    if (n) {
      var a = n.dgst;
    }
    n = a;
    l = Error(T(419));
    n = Co(l, n, undefined);
    return qn(e, t, i, n);
  }
  a = (i & e.childLanes) !== 0;
  if (_e || a) {
    n = de;
    if (n !== null) {
      switch (i & -i) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      o = o & (n.suspendedLanes | i) ? 0 : o;
      if (o !== 0 && o !== l.retryLane) {
        l.retryLane = o;
        dt(e, o);
        be(n, e, o, -1);
      }
    }
    Ui();
    n = Co(Error(T(421)));
    return qn(e, t, i, n);
  }
  if (o.data === "$?") {
    t.flags |= 128;
    t.child = e.child;
    t = Y1.bind(null, e);
    o._reactRetry = t;
    return null;
  } else {
    e = l.treeContext;
    Le = kt(o.nextSibling);
    Te = t;
    re = true;
    Ze = null;
    if (e !== null) {
      Me[Ue++] = at;
      Me[Ue++] = st;
      Me[Ue++] = Gt;
      at = e.id;
      st = e.overflow;
      Gt = t;
    }
    t = Ti(t, n.children);
    t.flags |= 4096;
    return t;
  }
}
function oa(e, t, r) {
  e.lanes |= t;
  var n = e.alternate;
  if (n !== null) {
    n.lanes |= t;
  }
  Hl(e.return, t, r);
}
function Bo(e, t, r, n, o) {
  var l = e.memoizedState;
  if (l === null) {
    e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: r,
      tailMode: o
    };
  } else {
    l.isBackwards = t;
    l.rendering = null;
    l.renderingStartTime = 0;
    l.last = n;
    l.tail = r;
    l.tailMode = o;
  }
}
function Qc(e, t, r) {
  var n = t.pendingProps;
  var o = n.revealOrder;
  var l = n.tail;
  Be(e, t, n.children, r);
  n = ne.current;
  if (n & 2) {
    n = n & 1 | 2;
    t.flags |= 128;
  } else {
    if (e !== null && e.flags & 128) {
      e: for (e = t.child; e !== null;) {
        if (e.tag === 13) {
          if (e.memoizedState !== null) {
            oa(e, r, t);
          }
        } else if (e.tag === 19) {
          oa(e, r, t);
        } else if (e.child !== null) {
          e.child.return = e;
          e = e.child;
          continue;
        }
        if (e === t) {
          break e;
        }
        while (e.sibling === null) {
          if (e.return === null || e.return === t) {
            break e;
          }
          e = e.return;
        }
        e.sibling.return = e.return;
        e = e.sibling;
      }
    }
    n &= 1;
  }
  b(ne, n);
  if (!(t.mode & 1)) {
    t.memoizedState = null;
  } else {
    switch (o) {
      case "forwards":
        r = t.child;
        o = null;
        while (r !== null) {
          e = r.alternate;
          if (e !== null && A0(e) === null) {
            o = r;
          }
          r = r.sibling;
        }
        r = o;
        if (r === null) {
          o = t.child;
          t.child = null;
        } else {
          o = r.sibling;
          r.sibling = null;
        }
        Bo(t, false, o, r, l);
        break;
      case "backwards":
        r = null;
        o = t.child;
        t.child = null;
        while (o !== null) {
          e = o.alternate;
          if (e !== null && A0(e) === null) {
            t.child = o;
            break;
          }
          e = o.sibling;
          o.sibling = r;
          r = o;
          o = e;
        }
        Bo(t, true, r, null, l);
        break;
      case "together":
        Bo(t, false, null, null, undefined);
        break;
      default:
        t.memoizedState = null;
    }
  }
  return t.child;
}
function l0(e, t) {
  if (!(t.mode & 1) && e !== null) {
    e.alternate = null;
    t.alternate = null;
    t.flags |= 2;
  }
}
function pt(e, t, r) {
  if (e !== null) {
    t.dependencies = e.dependencies;
  }
  Yt |= t.lanes;
  if (!(r & t.childLanes)) {
    return null;
  }
  if (e !== null && t.child !== e.child) {
    throw Error(T(153));
  }
  if (t.child !== null) {
    e = t.child;
    r = Nt(e, e.pendingProps);
    t.child = r;
    r.return = t;
    while (e.sibling !== null) {
      e = e.sibling;
      r = r.sibling = Nt(e, e.pendingProps);
      r.return = t;
    }
    r.sibling = null;
  }
  return t.child;
}
function j1(e, t, r) {
  switch (t.tag) {
    case 3:
      $c(t);
      Dr();
      break;
    case 5:
      mc(t);
      break;
    case 1:
      if (Se(t.type)) {
        g0(t);
      }
      break;
    case 4:
      _i(t, t.stateNode.containerInfo);
      break;
    case 10:
      var n = t.type._context;
      var o = t.memoizedProps.value;
      b(B0, n._currentValue);
      n._currentValue = o;
      break;
    case 13:
      n = t.memoizedState;
      if (n !== null) {
        if (n.dehydrated !== null) {
          b(ne, ne.current & 1);
          t.flags |= 128;
          return null;
        } else if (r & t.child.childLanes) {
          return Vc(e, t, r);
        } else {
          b(ne, ne.current & 1);
          e = pt(e, t, r);
          if (e !== null) {
            return e.sibling;
          } else {
            return null;
          }
        }
      }
      b(ne, ne.current & 1);
      break;
    case 19:
      n = (r & t.childLanes) !== 0;
      if (e.flags & 128) {
        if (n) {
          return Qc(e, t, r);
        }
        t.flags |= 128;
      }
      o = t.memoizedState;
      if (o !== null) {
        o.rendering = null;
        o.tail = null;
        o.lastEffect = null;
      }
      b(ne, ne.current);
      if (n) {
        break;
      }
      return null;
    case 22:
    case 23:
      t.lanes = 0;
      return Uc(e, t, r);
  }
  return pt(e, t, r);
}
var Kc;
var Vl;
var qc;
var Gc;
Kc = function (e, t) {
  for (var r = t.child; r !== null;) {
    if (r.tag === 5 || r.tag === 6) {
      e.appendChild(r.stateNode);
    } else if (r.tag !== 4 && r.child !== null) {
      r.child.return = r;
      r = r.child;
      continue;
    }
    if (r === t) {
      break;
    }
    while (r.sibling === null) {
      if (r.return === null || r.return === t) {
        return;
      }
      r = r.return;
    }
    r.sibling.return = r.return;
    r = r.sibling;
  }
};
Vl = function () {};
qc = function (e, t, r, n) {
  var o = e.memoizedProps;
  if (o !== n) {
    e = t.stateNode;
    Vt(lt.current);
    var l = null;
    switch (r) {
      case "input":
        o = xl(e, o);
        n = xl(e, n);
        l = [];
        break;
      case "select":
        o = le({}, o, {
          value: undefined
        });
        n = le({}, n, {
          value: undefined
        });
        l = [];
        break;
      case "textarea":
        o = vl(e, o);
        n = vl(e, n);
        l = [];
        break;
      default:
        if (typeof o.onClick != "function" && typeof n.onClick == "function") {
          e.onclick = m0;
        }
    }
    ml(r, n);
    var i;
    r = null;
    for (u in o) {
      if (!n.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null) {
        if (u === "style") {
          var a = o[u];
          for (i in a) {
            if (a.hasOwnProperty(i)) {
              r ||= {};
              r[i] = "";
            }
          }
        } else if (u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus") {
          if (sn.hasOwnProperty(u)) {
            l ||= [];
          } else {
            (l = l || []).push(u, null);
          }
        }
      }
    }
    for (u in n) {
      var c = n[u];
      a = o != null ? o[u] : undefined;
      if (n.hasOwnProperty(u) && c !== a && (c != null || a != null)) {
        if (u === "style") {
          if (a) {
            for (i in a) {
              if (!!a.hasOwnProperty(i) && (!c || !c.hasOwnProperty(i))) {
                r ||= {};
                r[i] = "";
              }
            }
            for (i in c) {
              if (c.hasOwnProperty(i) && a[i] !== c[i]) {
                r ||= {};
                r[i] = c[i];
              }
            }
          } else {
            if (!r) {
              l ||= [];
              l.push(u, r);
            }
            r = c;
          }
        } else if (u === "dangerouslySetInnerHTML") {
          c = c ? c.__html : undefined;
          a = a ? a.__html : undefined;
          if (c != null && a !== c) {
            (l = l || []).push(u, c);
          }
        } else if (u === "children") {
          if (typeof c == "string" || typeof c == "number") {
            (l = l || []).push(u, "" + c);
          }
        } else if (u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning") {
          if (sn.hasOwnProperty(u)) {
            if (c != null && u === "onScroll") {
              ee("scroll", e);
            }
            if (!l && a !== c) {
              l = [];
            }
          } else {
            (l = l || []).push(u, c);
          }
        }
      }
    }
    if (r) {
      (l = l || []).push("style", r);
    }
    var u = l;
    if (t.updateQueue = u) {
      t.flags |= 4;
    }
  }
};
Gc = function (e, t, r, n) {
  if (r !== n) {
    t.flags |= 4;
  }
};
function qr(e, t) {
  if (!re) {
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        var r = null;
        for (; t !== null;) {
          if (t.alternate !== null) {
            r = t;
          }
          t = t.sibling;
        }
        if (r === null) {
          e.tail = null;
        } else {
          r.sibling = null;
        }
        break;
      case "collapsed":
        r = e.tail;
        var n = null;
        for (; r !== null;) {
          if (r.alternate !== null) {
            n = r;
          }
          r = r.sibling;
        }
        if (n === null) {
          if (t || e.tail === null) {
            e.tail = null;
          } else {
            e.tail.sibling = null;
          }
        } else {
          n.sibling = null;
        }
    }
  }
}
function ge(e) {
  var t = e.alternate !== null && e.alternate.child === e.child;
  var r = 0;
  var n = 0;
  if (t) {
    for (var o = e.child; o !== null;) {
      r |= o.lanes | o.childLanes;
      n |= o.subtreeFlags & 14680064;
      n |= o.flags & 14680064;
      o.return = e;
      o = o.sibling;
    }
  } else {
    for (o = e.child; o !== null;) {
      r |= o.lanes | o.childLanes;
      n |= o.subtreeFlags;
      n |= o.flags;
      o.return = e;
      o = o.sibling;
    }
  }
  e.subtreeFlags |= n;
  e.childLanes = r;
  return t;
}
function I1(e, t, r) {
  var n = t.pendingProps;
  Ei(t);
  switch (t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      ge(t);
      return null;
    case 1:
      if (Se(t.type)) {
        y0();
      }
      ge(t);
      return null;
    case 3:
      n = t.stateNode;
      kr();
      te(ke);
      te(Ce);
      Si();
      if (n.pendingContext) {
        n.context = n.pendingContext;
        n.pendingContext = null;
      }
      if (e === null || e.child === null) {
        if (Qn(t)) {
          t.flags |= 4;
        } else if (e !== null && (!e.memoizedState.isDehydrated || !!(t.flags & 256))) {
          t.flags |= 1024;
          if (Ze !== null) {
            Jl(Ze);
            Ze = null;
          }
        }
      }
      Vl(e, t);
      ge(t);
      return null;
    case 5:
      ki(t);
      var o = Vt(Cn.current);
      r = t.type;
      if (e !== null && t.stateNode != null) {
        qc(e, t, r, n, o);
        if (e.ref !== t.ref) {
          t.flags |= 512;
          t.flags |= 2097152;
        }
      } else {
        if (!n) {
          if (t.stateNode === null) {
            throw Error(T(166));
          }
          ge(t);
          return null;
        }
        e = Vt(lt.current);
        if (Qn(t)) {
          n = t.stateNode;
          r = t.type;
          var l = t.memoizedProps;
          n[nt] = t;
          n[gn] = l;
          e = (t.mode & 1) !== 0;
          switch (r) {
            case "dialog":
              ee("cancel", n);
              ee("close", n);
              break;
            case "iframe":
            case "object":
            case "embed":
              ee("load", n);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Jr.length; o++) {
                ee(Jr[o], n);
              }
              break;
            case "source":
              ee("error", n);
              break;
            case "img":
            case "image":
            case "link":
              ee("error", n);
              ee("load", n);
              break;
            case "details":
              ee("toggle", n);
              break;
            case "input":
              du(n, l);
              ee("invalid", n);
              break;
            case "select":
              n._wrapperState = {
                wasMultiple: !!l.multiple
              };
              ee("invalid", n);
              break;
            case "textarea":
              vu(n, l);
              ee("invalid", n);
          }
          ml(r, l);
          o = null;
          for (var i in l) {
            if (l.hasOwnProperty(i)) {
              var a = l[i];
              if (i === "children") {
                if (typeof a == "string") {
                  if (n.textContent !== a) {
                    if (l.suppressHydrationWarning !== true) {
                      Vn(n.textContent, a, e);
                    }
                    o = ["children", a];
                  }
                } else if (typeof a == "number" && n.textContent !== "" + a) {
                  if (l.suppressHydrationWarning !== true) {
                    Vn(n.textContent, a, e);
                  }
                  o = ["children", "" + a];
                }
              } else if (sn.hasOwnProperty(i) && a != null && i === "onScroll") {
                ee("scroll", n);
              }
            }
          }
          switch (r) {
            case "input":
              Hn(n);
              pu(n, l, true);
              break;
            case "textarea":
              Hn(n);
              hu(n);
              break;
            case "select":
            case "option":
              break;
            default:
              if (typeof l.onClick == "function") {
                n.onclick = m0;
              }
          }
          n = o;
          t.updateQueue = n;
          if (n !== null) {
            t.flags |= 4;
          }
        } else {
          i = o.nodeType === 9 ? o : o.ownerDocument;
          if (e === "http://www.w3.org/1999/xhtml") {
            e = Bs(r);
          }
          if (e === "http://www.w3.org/1999/xhtml") {
            if (r === "script") {
              e = i.createElement("div");
              e.innerHTML = "<script></script>";
              e = e.removeChild(e.firstChild);
            } else if (typeof n.is == "string") {
              e = i.createElement(r, {
                is: n.is
              });
            } else {
              e = i.createElement(r);
              if (r === "select") {
                i = e;
                if (n.multiple) {
                  i.multiple = true;
                } else if (n.size) {
                  i.size = n.size;
                }
              }
            }
          } else {
            e = i.createElementNS(e, r);
          }
          e[nt] = t;
          e[gn] = n;
          Kc(e, t, false, false);
          t.stateNode = e;
          e: {
            i = yl(r, n);
            switch (r) {
              case "dialog":
                ee("cancel", e);
                ee("close", e);
                o = n;
                break;
              case "iframe":
              case "object":
              case "embed":
                ee("load", e);
                o = n;
                break;
              case "video":
              case "audio":
                for (o = 0; o < Jr.length; o++) {
                  ee(Jr[o], e);
                }
                o = n;
                break;
              case "source":
                ee("error", e);
                o = n;
                break;
              case "img":
              case "image":
              case "link":
                ee("error", e);
                ee("load", e);
                o = n;
                break;
              case "details":
                ee("toggle", e);
                o = n;
                break;
              case "input":
                du(e, n);
                o = xl(e, n);
                ee("invalid", e);
                break;
              case "option":
                o = n;
                break;
              case "select":
                e._wrapperState = {
                  wasMultiple: !!n.multiple
                };
                o = le({}, n, {
                  value: undefined
                });
                ee("invalid", e);
                break;
              case "textarea":
                vu(e, n);
                o = vl(e, n);
                ee("invalid", e);
                break;
              default:
                o = n;
            }
            ml(r, o);
            a = o;
            for (l in a) {
              if (a.hasOwnProperty(l)) {
                var c = a[l];
                if (l === "style") {
                  As(e, c);
                } else if (l === "dangerouslySetInnerHTML") {
                  c = c ? c.__html : undefined;
                  if (c != null) {
                    ws(e, c);
                  }
                } else if (l === "children") {
                  if (typeof c == "string") {
                    if (r !== "textarea" || c !== "") {
                      cn(e, c);
                    }
                  } else if (typeof c == "number") {
                    cn(e, "" + c);
                  }
                } else if (l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus") {
                  if (sn.hasOwnProperty(l)) {
                    if (c != null && l === "onScroll") {
                      ee("scroll", e);
                    }
                  } else if (c != null) {
                    li(e, l, c, i);
                  }
                }
              }
            }
            switch (r) {
              case "input":
                Hn(e);
                pu(e, n, false);
                break;
              case "textarea":
                Hn(e);
                hu(e);
                break;
              case "option":
                if (n.value != null) {
                  e.setAttribute("value", "" + Rt(n.value));
                }
                break;
              case "select":
                e.multiple = !!n.multiple;
                l = n.value;
                if (l != null) {
                  yr(e, !!n.multiple, l, false);
                } else if (n.defaultValue != null) {
                  yr(e, !!n.multiple, n.defaultValue, true);
                }
                break;
              default:
                if (typeof o.onClick == "function") {
                  e.onclick = m0;
                }
            }
            switch (r) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break e;
              case "img":
                n = true;
                break e;
              default:
                n = false;
            }
          }
          if (n) {
            t.flags |= 4;
          }
        }
        if (t.ref !== null) {
          t.flags |= 512;
          t.flags |= 2097152;
        }
      }
      ge(t);
      return null;
    case 6:
      if (e && t.stateNode != null) {
        Gc(e, t, e.memoizedProps, n);
      } else {
        if (typeof n != "string" && t.stateNode === null) {
          throw Error(T(166));
        }
        r = Vt(Cn.current);
        Vt(lt.current);
        if (Qn(t)) {
          n = t.stateNode;
          r = t.memoizedProps;
          n[nt] = t;
          if ((l = n.nodeValue !== r) && (e = Te, e !== null)) {
            switch (e.tag) {
              case 3:
                Vn(n.nodeValue, r, (e.mode & 1) !== 0);
                break;
              case 5:
                if (e.memoizedProps.suppressHydrationWarning !== true) {
                  Vn(n.nodeValue, r, (e.mode & 1) !== 0);
                }
            }
          }
          if (l) {
            t.flags |= 4;
          }
        } else {
          n = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(n);
          n[nt] = t;
          t.stateNode = n;
        }
      }
      ge(t);
      return null;
    case 13:
      te(ne);
      n = t.memoizedState;
      if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (re && Le !== null && t.mode & 1 && !(t.flags & 128)) {
          xc();
          Dr();
          t.flags |= 98560;
          l = false;
        } else {
          l = Qn(t);
          if (n !== null && n.dehydrated !== null) {
            if (e === null) {
              if (!l) {
                throw Error(T(318));
              }
              l = t.memoizedState;
              l = l !== null ? l.dehydrated : null;
              if (!l) {
                throw Error(T(317));
              }
              l[nt] = t;
            } else {
              Dr();
              if (!(t.flags & 128)) {
                t.memoizedState = null;
              }
              t.flags |= 4;
            }
            ge(t);
            l = false;
          } else {
            if (Ze !== null) {
              Jl(Ze);
              Ze = null;
            }
            l = true;
          }
        }
        if (!l) {
          if (t.flags & 65536) {
            return t;
          } else {
            return null;
          }
        }
      }
      if (t.flags & 128) {
        t.lanes = r;
        return t;
      } else {
        n = n !== null;
        if (n !== (e !== null && e.memoizedState !== null) && n) {
          t.child.flags |= 8192;
          if (t.mode & 1) {
            if (e === null || ne.current & 1) {
              if (fe === 0) {
                fe = 3;
              }
            } else {
              Ui();
            }
          }
        }
        if (t.updateQueue !== null) {
          t.flags |= 4;
        }
        ge(t);
        return null;
      }
    case 4:
      kr();
      Vl(e, t);
      if (e === null) {
        mn(t.stateNode.containerInfo);
      }
      ge(t);
      return null;
    case 10:
      Fi(t.type._context);
      ge(t);
      return null;
    case 17:
      if (Se(t.type)) {
        y0();
      }
      ge(t);
      return null;
    case 19:
      te(ne);
      l = t.memoizedState;
      if (l === null) {
        ge(t);
        return null;
      }
      n = (t.flags & 128) !== 0;
      i = l.rendering;
      if (i === null) {
        if (n) {
          qr(l, false);
        } else {
          if (fe !== 0 || e !== null && e.flags & 128) {
            for (e = t.child; e !== null;) {
              i = A0(e);
              if (i !== null) {
                t.flags |= 128;
                qr(l, false);
                n = i.updateQueue;
                if (n !== null) {
                  t.updateQueue = n;
                  t.flags |= 4;
                }
                t.subtreeFlags = 0;
                n = r;
                r = t.child;
                while (r !== null) {
                  l = r;
                  e = n;
                  l.flags &= 14680066;
                  i = l.alternate;
                  if (i === null) {
                    l.childLanes = 0;
                    l.lanes = e;
                    l.child = null;
                    l.subtreeFlags = 0;
                    l.memoizedProps = null;
                    l.memoizedState = null;
                    l.updateQueue = null;
                    l.dependencies = null;
                    l.stateNode = null;
                  } else {
                    l.childLanes = i.childLanes;
                    l.lanes = i.lanes;
                    l.child = i.child;
                    l.subtreeFlags = 0;
                    l.deletions = null;
                    l.memoizedProps = i.memoizedProps;
                    l.memoizedState = i.memoizedState;
                    l.updateQueue = i.updateQueue;
                    l.type = i.type;
                    e = i.dependencies;
                    l.dependencies = e === null ? null : {
                      lanes: e.lanes,
                      firstContext: e.firstContext
                    };
                  }
                  r = r.sibling;
                }
                b(ne, ne.current & 1 | 2);
                return t.child;
              }
              e = e.sibling;
            }
          }
          if (l.tail !== null && ue() > zr) {
            t.flags |= 128;
            n = true;
            qr(l, false);
            t.lanes = 4194304;
          }
        }
      } else {
        if (!n) {
          e = A0(i);
          if (e !== null) {
            t.flags |= 128;
            n = true;
            r = e.updateQueue;
            if (r !== null) {
              t.updateQueue = r;
              t.flags |= 4;
            }
            qr(l, true);
            if (l.tail === null && l.tailMode === "hidden" && !i.alternate && !re) {
              ge(t);
              return null;
            }
          } else if (ue() * 2 - l.renderingStartTime > zr && r !== 1073741824) {
            t.flags |= 128;
            n = true;
            qr(l, false);
            t.lanes = 4194304;
          }
        }
        if (l.isBackwards) {
          i.sibling = t.child;
          t.child = i;
        } else {
          r = l.last;
          if (r !== null) {
            r.sibling = i;
          } else {
            t.child = i;
          }
          l.last = i;
        }
      }
      if (l.tail !== null) {
        t = l.tail;
        l.rendering = t;
        l.tail = t.sibling;
        l.renderingStartTime = ue();
        t.sibling = null;
        r = ne.current;
        b(ne, n ? r & 1 | 2 : r & 1);
        return t;
      } else {
        ge(t);
        return null;
      }
    case 22:
    case 23:
      Mi();
      n = t.memoizedState !== null;
      if (e !== null && e.memoizedState !== null !== n) {
        t.flags |= 8192;
      }
      if (n && t.mode & 1) {
        if (Re & 1073741824) {
          ge(t);
          if (t.subtreeFlags & 6) {
            t.flags |= 8192;
          }
        }
      } else {
        ge(t);
      }
      return null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(T(156, t.tag));
}
function M1(e, t) {
  Ei(t);
  switch (t.tag) {
    case 1:
      if (Se(t.type)) {
        y0();
      }
      e = t.flags;
      if (e & 65536) {
        t.flags = e & -65537 | 128;
        return t;
      } else {
        return null;
      }
    case 3:
      kr();
      te(ke);
      te(Ce);
      Si();
      e = t.flags;
      if (e & 65536 && !(e & 128)) {
        t.flags = e & -65537 | 128;
        return t;
      } else {
        return null;
      }
    case 5:
      ki(t);
      return null;
    case 13:
      te(ne);
      e = t.memoizedState;
      if (e !== null && e.dehydrated !== null) {
        if (t.alternate === null) {
          throw Error(T(340));
        }
        Dr();
      }
      e = t.flags;
      if (e & 65536) {
        t.flags = e & -65537 | 128;
        return t;
      } else {
        return null;
      }
    case 19:
      te(ne);
      return null;
    case 4:
      kr();
      return null;
    case 10:
      Fi(t.type._context);
      return null;
    case 22:
    case 23:
      Mi();
      return null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Gn = false;
var Ee = false;
var U1 = typeof WeakSet == "function" ? WeakSet : Set;
var j = null;
function hr(e, t) {
  var r = e.ref;
  if (r !== null) {
    if (typeof r == "function") {
      try {
        r(null);
      } catch (n) {
        ie(e, t, n);
      }
    } else {
      r.current = null;
    }
  }
}
function Ql(e, t, r) {
  try {
    r();
  } catch (n) {
    ie(e, t, n);
  }
}
var la = false;
function W1(e, t) {
  kl = p0;
  e = bs();
  if (yi(e)) {
    if ("selectionStart" in e) {
      var r = {
        start: e.selectionStart,
        end: e.selectionEnd
      };
    } else {
      e: {
        r = (r = e.ownerDocument) && r.defaultView || window;
        var n = r.getSelection && r.getSelection();
        if (n && n.rangeCount !== 0) {
          r = n.anchorNode;
          var o = n.anchorOffset;
          var l = n.focusNode;
          n = n.focusOffset;
          try {
            r.nodeType;
            l.nodeType;
          } catch {
            r = null;
            break e;
          }
          var i = 0;
          var a = -1;
          var c = -1;
          var u = 0;
          var d = 0;
          var y = e;
          var x = null;
          t: while (true) {
            for (var m; y !== r || o !== 0 && y.nodeType !== 3 || (a = i + o), y !== l || n !== 0 && y.nodeType !== 3 || (c = i + n), y.nodeType === 3 && (i += y.nodeValue.length), (m = y.firstChild) !== null;) {
              x = y;
              y = m;
            }
            while (true) {
              if (y === e) {
                break t;
              }
              if (x === r && ++u === o) {
                a = i;
              }
              if (x === l && ++d === n) {
                c = i;
              }
              if ((m = y.nextSibling) !== null) {
                break;
              }
              y = x;
              x = y.parentNode;
            }
            y = m;
          }
          r = a === -1 || c === -1 ? null : {
            start: a,
            end: c
          };
        } else {
          r = null;
        }
      }
    }
    r = r || {
      start: 0,
      end: 0
    };
  } else {
    r = null;
  }
  Sl = {
    focusedElem: e,
    selectionRange: r
  };
  p0 = false;
  j = t;
  while (j !== null) {
    t = j;
    e = t.child;
    if ((t.subtreeFlags & 1028) !== 0 && e !== null) {
      e.return = t;
      j = e;
    } else {
      while (j !== null) {
        t = j;
        try {
          var h = t.alternate;
          if (t.flags & 1024) {
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (h !== null) {
                  var g = h.memoizedProps;
                  var E = h.memoizedState;
                  var p = t.stateNode;
                  var s = p.getSnapshotBeforeUpdate(t.elementType === t.type ? g : Xe(t.type, g), E);
                  p.__reactInternalSnapshotBeforeUpdate = s;
                }
                break;
              case 3:
                var f = t.stateNode.containerInfo;
                if (f.nodeType === 1) {
                  f.textContent = "";
                } else if (f.nodeType === 9 && f.documentElement) {
                  f.removeChild(f.documentElement);
                }
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(T(163));
            }
          }
        } catch (v) {
          ie(t, t.return, v);
        }
        e = t.sibling;
        if (e !== null) {
          e.return = t.return;
          j = e;
          break;
        }
        j = t.return;
      }
    }
  }
  h = la;
  la = false;
  return h;
}
function ln(e, t, r) {
  var n = t.updateQueue;
  n = n !== null ? n.lastEffect : null;
  if (n !== null) {
    var o = n = n.next;
    do {
      if ((o.tag & e) === e) {
        var l = o.destroy;
        o.destroy = undefined;
        if (l !== undefined) {
          Ql(t, r, l);
        }
      }
      o = o.next;
    } while (o !== n);
  }
}
function W0(e, t) {
  t = t.updateQueue;
  t = t !== null ? t.lastEffect : null;
  if (t !== null) {
    var r = t = t.next;
    do {
      if ((r.tag & e) === e) {
        var n = r.create;
        r.destroy = n();
      }
      r = r.next;
    } while (r !== t);
  }
}
function Kl(e) {
  var t = e.ref;
  if (t !== null) {
    var r = e.stateNode;
    switch (e.tag) {
      case 5:
        e = r;
        break;
      default:
        e = r;
    }
    if (typeof t == "function") {
      t(e);
    } else {
      t.current = e;
    }
  }
}
function Xc(e) {
  var t = e.alternate;
  if (t !== null) {
    e.alternate = null;
    Xc(t);
  }
  e.child = null;
  e.deletions = null;
  e.sibling = null;
  if (e.tag === 5) {
    t = e.stateNode;
    if (t !== null) {
      delete t[nt];
      delete t[gn];
      delete t[Nl];
      delete t[F1];
      delete t[A1];
    }
  }
  e.stateNode = null;
  e.return = null;
  e.dependencies = null;
  e.memoizedProps = null;
  e.memoizedState = null;
  e.pendingProps = null;
  e.stateNode = null;
  e.updateQueue = null;
}
function Yc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ia(e) {
  e: while (true) {
    while (e.sibling === null) {
      if (e.return === null || Yc(e.return)) {
        return null;
      }
      e = e.return;
    }
    e.sibling.return = e.return;
    e = e.sibling;
    while (e.tag !== 5 && e.tag !== 6 && e.tag !== 18) {
      if (e.flags & 2 || e.child === null || e.tag === 4) {
        continue e;
      }
      e.child.return = e;
      e = e.child;
    }
    if (!(e.flags & 2)) {
      return e.stateNode;
    }
  }
}
function ql(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6) {
    e = e.stateNode;
    if (t) {
      if (r.nodeType === 8) {
        r.parentNode.insertBefore(e, t);
      } else {
        r.insertBefore(e, t);
      }
    } else {
      if (r.nodeType === 8) {
        t = r.parentNode;
        t.insertBefore(e, r);
      } else {
        t = r;
        t.appendChild(e);
      }
      r = r._reactRootContainer;
      if (r == null && t.onclick === null) {
        t.onclick = m0;
      }
    }
  } else if (n !== 4 && (e = e.child, e !== null)) {
    ql(e, t, r);
    e = e.sibling;
    while (e !== null) {
      ql(e, t, r);
      e = e.sibling;
    }
  }
}
function Gl(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6) {
    e = e.stateNode;
    if (t) {
      r.insertBefore(e, t);
    } else {
      r.appendChild(e);
    }
  } else if (n !== 4 && (e = e.child, e !== null)) {
    Gl(e, t, r);
    e = e.sibling;
    while (e !== null) {
      Gl(e, t, r);
      e = e.sibling;
    }
  }
}
var ve = null;
var Ye = false;
function yt(e, t, r) {
  for (r = r.child; r !== null;) {
    Zc(e, t, r);
    r = r.sibling;
  }
}
function Zc(e, t, r) {
  if (ot && typeof ot.onCommitFiberUnmount == "function") {
    try {
      ot.onCommitFiberUnmount(L0, r);
    } catch {}
  }
  switch (r.tag) {
    case 5:
      if (!Ee) {
        hr(r, t);
      }
    case 6:
      var n = ve;
      var o = Ye;
      ve = null;
      yt(e, t, r);
      ve = n;
      Ye = o;
      if (ve !== null) {
        if (Ye) {
          e = ve;
          r = r.stateNode;
          if (e.nodeType === 8) {
            e.parentNode.removeChild(r);
          } else {
            e.removeChild(r);
          }
        } else {
          ve.removeChild(r.stateNode);
        }
      }
      break;
    case 18:
      if (ve !== null) {
        if (Ye) {
          e = ve;
          r = r.stateNode;
          if (e.nodeType === 8) {
            vo(e.parentNode, r);
          } else if (e.nodeType === 1) {
            vo(e, r);
          }
          pn(e);
        } else {
          vo(ve, r.stateNode);
        }
      }
      break;
    case 4:
      n = ve;
      o = Ye;
      ve = r.stateNode.containerInfo;
      Ye = true;
      yt(e, t, r);
      ve = n;
      Ye = o;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Ee && (n = r.updateQueue, n !== null && (n = n.lastEffect, n !== null))) {
        o = n = n.next;
        do {
          var l = o;
          var i = l.destroy;
          l = l.tag;
          if (i !== undefined && (l & 2 || l & 4)) {
            Ql(r, t, i);
          }
          o = o.next;
        } while (o !== n);
      }
      yt(e, t, r);
      break;
    case 1:
      if (!Ee && (hr(r, t), n = r.stateNode, typeof n.componentWillUnmount == "function")) {
        try {
          n.props = r.memoizedProps;
          n.state = r.memoizedState;
          n.componentWillUnmount();
        } catch (a) {
          ie(r, t, a);
        }
      }
      yt(e, t, r);
      break;
    case 21:
      yt(e, t, r);
      break;
    case 22:
      if (r.mode & 1) {
        Ee = (n = Ee) || r.memoizedState !== null;
        yt(e, t, r);
        Ee = n;
      } else {
        yt(e, t, r);
      }
      break;
    default:
      yt(e, t, r);
  }
}
function ua(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var r = e.stateNode;
    if (r === null) {
      r = e.stateNode = new U1();
    }
    t.forEach(function (n) {
      var o = Z1.bind(null, e, n);
      if (!r.has(n)) {
        r.add(n);
        n.then(o, o);
      }
    });
  }
}
function Ge(e, t) {
  var r = t.deletions;
  if (r !== null) {
    for (var n = 0; n < r.length; n++) {
      var o = r[n];
      try {
        var l = e;
        var i = t;
        var a = i;
        e: while (a !== null) {
          switch (a.tag) {
            case 5:
              ve = a.stateNode;
              Ye = false;
              break e;
            case 3:
              ve = a.stateNode.containerInfo;
              Ye = true;
              break e;
            case 4:
              ve = a.stateNode.containerInfo;
              Ye = true;
              break e;
          }
          a = a.return;
        }
        if (ve === null) {
          throw Error(T(160));
        }
        Zc(l, i, o);
        ve = null;
        Ye = false;
        var c = o.alternate;
        if (c !== null) {
          c.return = null;
        }
        o.return = null;
      } catch (u) {
        ie(o, t, u);
      }
    }
  }
  if (t.subtreeFlags & 12854) {
    for (t = t.child; t !== null;) {
      Jc(t, e);
      t = t.sibling;
    }
  }
}
function Jc(e, t) {
  var r = e.alternate;
  var n = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Ge(t, e);
      tt(e);
      if (n & 4) {
        try {
          ln(3, e, e.return);
          W0(3, e);
        } catch (g) {
          ie(e, e.return, g);
        }
        try {
          ln(5, e, e.return);
        } catch (g) {
          ie(e, e.return, g);
        }
      }
      break;
    case 1:
      Ge(t, e);
      tt(e);
      if (n & 512 && r !== null) {
        hr(r, r.return);
      }
      break;
    case 5:
      Ge(t, e);
      tt(e);
      if (n & 512 && r !== null) {
        hr(r, r.return);
      }
      if (e.flags & 32) {
        var o = e.stateNode;
        try {
          cn(o, "");
        } catch (g) {
          ie(e, e.return, g);
        }
      }
      if (n & 4 && (o = e.stateNode, o != null)) {
        var l = e.memoizedProps;
        var i = r !== null ? r.memoizedProps : l;
        var a = e.type;
        var c = e.updateQueue;
        e.updateQueue = null;
        if (c !== null) {
          try {
            if (a === "input" && l.type === "radio" && l.name != null) {
              Es(o, l);
            }
            yl(a, i);
            var u = yl(a, l);
            for (i = 0; i < c.length; i += 2) {
              var d = c[i];
              var y = c[i + 1];
              if (d === "style") {
                As(o, y);
              } else if (d === "dangerouslySetInnerHTML") {
                ws(o, y);
              } else if (d === "children") {
                cn(o, y);
              } else {
                li(o, d, y, u);
              }
            }
            switch (a) {
              case "input":
                dl(o, l);
                break;
              case "textarea":
                Cs(o, l);
                break;
              case "select":
                var x = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!l.multiple;
                var m = l.value;
                if (m != null) {
                  yr(o, !!l.multiple, m, false);
                } else if (x !== !!l.multiple) {
                  if (l.defaultValue != null) {
                    yr(o, !!l.multiple, l.defaultValue, true);
                  } else {
                    yr(o, !!l.multiple, l.multiple ? [] : "", false);
                  }
                }
            }
            o[gn] = l;
          } catch (g) {
            ie(e, e.return, g);
          }
        }
      }
      break;
    case 6:
      Ge(t, e);
      tt(e);
      if (n & 4) {
        if (e.stateNode === null) {
          throw Error(T(162));
        }
        o = e.stateNode;
        l = e.memoizedProps;
        try {
          o.nodeValue = l;
        } catch (g) {
          ie(e, e.return, g);
        }
      }
      break;
    case 3:
      Ge(t, e);
      tt(e);
      if (n & 4 && r !== null && r.memoizedState.isDehydrated) {
        try {
          pn(t.containerInfo);
        } catch (g) {
          ie(e, e.return, g);
        }
      }
      break;
    case 4:
      Ge(t, e);
      tt(e);
      break;
    case 13:
      Ge(t, e);
      tt(e);
      o = e.child;
      if (o.flags & 8192) {
        l = o.memoizedState !== null;
        o.stateNode.isHidden = l;
        if (!!l && (o.alternate === null || o.alternate.memoizedState === null)) {
          ji = ue();
        }
      }
      if (n & 4) {
        ua(e);
      }
      break;
    case 22:
      d = r !== null && r.memoizedState !== null;
      if (e.mode & 1) {
        Ee = (u = Ee) || d;
        Ge(t, e);
        Ee = u;
      } else {
        Ge(t, e);
      }
      tt(e);
      if (n & 8192) {
        u = e.memoizedState !== null;
        if ((e.stateNode.isHidden = u) && !d && e.mode & 1) {
          j = e;
          d = e.child;
          while (d !== null) {
            for (y = j = d; j !== null;) {
              x = j;
              m = x.child;
              switch (x.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ln(4, x, x.return);
                  break;
                case 1:
                  hr(x, x.return);
                  var h = x.stateNode;
                  if (typeof h.componentWillUnmount == "function") {
                    n = x;
                    r = x.return;
                    try {
                      t = n;
                      h.props = t.memoizedProps;
                      h.state = t.memoizedState;
                      h.componentWillUnmount();
                    } catch (g) {
                      ie(n, r, g);
                    }
                  }
                  break;
                case 5:
                  hr(x, x.return);
                  break;
                case 22:
                  if (x.memoizedState !== null) {
                    sa(y);
                    continue;
                  }
              }
              if (m !== null) {
                m.return = x;
                j = m;
              } else {
                sa(y);
              }
            }
            d = d.sibling;
          }
        }
        d = null;
        y = e;
        e: while (true) {
          if (y.tag === 5) {
            if (d === null) {
              d = y;
              try {
                o = y.stateNode;
                if (u) {
                  l = o.style;
                  if (typeof l.setProperty == "function") {
                    l.setProperty("display", "none", "important");
                  } else {
                    l.display = "none";
                  }
                } else {
                  a = y.stateNode;
                  c = y.memoizedProps.style;
                  i = c != null && c.hasOwnProperty("display") ? c.display : null;
                  a.style.display = Fs("display", i);
                }
              } catch (g) {
                ie(e, e.return, g);
              }
            }
          } else if (y.tag === 6) {
            if (d === null) {
              try {
                y.stateNode.nodeValue = u ? "" : y.memoizedProps;
              } catch (g) {
                ie(e, e.return, g);
              }
            }
          } else if ((y.tag !== 22 && y.tag !== 23 || y.memoizedState === null || y === e) && y.child !== null) {
            y.child.return = y;
            y = y.child;
            continue;
          }
          if (y === e) {
            break e;
          }
          while (y.sibling === null) {
            if (y.return === null || y.return === e) {
              break e;
            }
            if (d === y) {
              d = null;
            }
            y = y.return;
          }
          if (d === y) {
            d = null;
          }
          y.sibling.return = y.return;
          y = y.sibling;
        }
      }
      break;
    case 19:
      Ge(t, e);
      tt(e);
      if (n & 4) {
        ua(e);
      }
      break;
    case 21:
      break;
    default:
      Ge(t, e);
      tt(e);
  }
}
function tt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var r = e.return; r !== null;) {
          if (Yc(r)) {
            var n = r;
            break e;
          }
          r = r.return;
        }
        throw Error(T(160));
      }
      switch (n.tag) {
        case 5:
          var o = n.stateNode;
          if (n.flags & 32) {
            cn(o, "");
            n.flags &= -33;
          }
          var l = ia(e);
          Gl(e, l, o);
          break;
        case 3:
        case 4:
          var i = n.stateNode.containerInfo;
          var a = ia(e);
          ql(e, a, i);
          break;
        default:
          throw Error(T(161));
      }
    } catch (c) {
      ie(e, e.return, c);
    }
    e.flags &= -3;
  }
  if (t & 4096) {
    e.flags &= -4097;
  }
}
function $1(e, t, r) {
  j = e;
  bc(e);
}
function bc(e, t, r) {
  var n = (e.mode & 1) !== 0;
  for (; j !== null;) {
    var o = j;
    var l = o.child;
    if (o.tag === 22 && n) {
      var i = o.memoizedState !== null || Gn;
      if (!i) {
        var a = o.alternate;
        var c = a !== null && a.memoizedState !== null || Ee;
        a = Gn;
        var u = Ee;
        Gn = i;
        if ((Ee = c) && !u) {
          for (j = o; j !== null;) {
            i = j;
            c = i.child;
            if (i.tag === 22 && i.memoizedState !== null) {
              ca(o);
            } else if (c !== null) {
              c.return = i;
              j = c;
            } else {
              ca(o);
            }
          }
        }
        while (l !== null) {
          j = l;
          bc(l);
          l = l.sibling;
        }
        j = o;
        Gn = a;
        Ee = u;
      }
      aa(e);
    } else if (o.subtreeFlags & 8772 && l !== null) {
      l.return = o;
      j = l;
    } else {
      aa(e);
    }
  }
}
function aa(e) {
  while (j !== null) {
    var t = j;
    if (t.flags & 8772) {
      var r = t.alternate;
      try {
        if (t.flags & 8772) {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              if (!Ee) {
                W0(5, t);
              }
              break;
            case 1:
              var n = t.stateNode;
              if (t.flags & 4 && !Ee) {
                if (r === null) {
                  n.componentDidMount();
                } else {
                  var o = t.elementType === t.type ? r.memoizedProps : Xe(t.type, r.memoizedProps);
                  n.componentDidUpdate(o, r.memoizedState, n.__reactInternalSnapshotBeforeUpdate);
                }
              }
              var l = t.updateQueue;
              if (l !== null) {
                Ku(t, l, n);
              }
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                r = null;
                if (t.child !== null) {
                  switch (t.child.tag) {
                    case 5:
                      r = t.child.stateNode;
                      break;
                    case 1:
                      r = t.child.stateNode;
                  }
                }
                Ku(t, i, r);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (r === null && t.flags & 4) {
                r = a;
                var c = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    if (c.autoFocus) {
                      r.focus();
                    }
                    break;
                  case "img":
                    if (c.src) {
                      r.src = c.src;
                    }
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var d = u.memoizedState;
                  if (d !== null) {
                    var y = d.dehydrated;
                    if (y !== null) {
                      pn(y);
                    }
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(T(163));
          }
        }
        if (!Ee) {
          if (t.flags & 512) {
            Kl(t);
          }
        }
      } catch (x) {
        ie(t, t.return, x);
      }
    }
    if (t === e) {
      j = null;
      break;
    }
    r = t.sibling;
    if (r !== null) {
      r.return = t.return;
      j = r;
      break;
    }
    j = t.return;
  }
}
function sa(e) {
  while (j !== null) {
    var t = j;
    if (t === e) {
      j = null;
      break;
    }
    var r = t.sibling;
    if (r !== null) {
      r.return = t.return;
      j = r;
      break;
    }
    j = t.return;
  }
}
function ca(e) {
  while (j !== null) {
    var t = j;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var r = t.return;
          try {
            W0(4, t);
          } catch (c) {
            ie(t, r, c);
          }
          break;
        case 1:
          var n = t.stateNode;
          if (typeof n.componentDidMount == "function") {
            var o = t.return;
            try {
              n.componentDidMount();
            } catch (c) {
              ie(t, o, c);
            }
          }
          var l = t.return;
          try {
            Kl(t);
          } catch (c) {
            ie(t, l, c);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Kl(t);
          } catch (c) {
            ie(t, i, c);
          }
      }
    } catch (c) {
      ie(t, t.return, c);
    }
    if (t === e) {
      j = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return;
      j = a;
      break;
    }
    j = t.return;
  }
}
var V1 = Math.ceil;
var k0 = vt.ReactCurrentDispatcher;
var Hi = vt.ReactCurrentOwner;
var $e = vt.ReactCurrentBatchConfig;
var G = 0;
var de = null;
var ae = null;
var he = 0;
var Re = 0;
var mr = Ht(0);
var fe = 0;
var An = null;
var Yt = 0;
var $0 = 0;
var Oi = 0;
var un = null;
var De = null;
var ji = 0;
var zr = Infinity;
var it = null;
var S0 = false;
var Xl = null;
var zt = null;
var Xn = false;
var Ft = null;
var z0 = 0;
var an = 0;
var Yl = null;
var i0 = -1;
var u0 = 0;
function we() {
  if (G & 6) {
    return ue();
  } else if (i0 !== -1) {
    return i0;
  } else {
    return i0 = ue();
  }
}
function Pt(e) {
  if (e.mode & 1) {
    if (G & 2 && he !== 0) {
      return he & -he;
    } else if (_1.transition !== null) {
      if (u0 === 0) {
        u0 = Os();
      }
      return u0;
    } else {
      e = Z;
      if (e === 0) {
        e = window.event;
        e = e === undefined ? 16 : Vs(e.type);
      }
      return e;
    }
  } else {
    return 1;
  }
}
function be(e, t, r, n) {
  if (an > 50) {
    an = 0;
    Yl = null;
    throw Error(T(185));
  }
  _n(e, r, n);
  if (!(G & 2) || e !== de) {
    if (e === de) {
      if (!(G & 2)) {
        $0 |= r;
      }
      if (fe === 4) {
        Bt(e, he);
      }
    }
    ze(e, n);
    if (r === 1 && G === 0 && !(t.mode & 1)) {
      zr = ue() + 500;
      if (I0) {
        Ot();
      }
    }
  }
}
function ze(e, t) {
  var r = e.callbackNode;
  _x(e, t);
  var n = d0(e, e === de ? he : 0);
  if (n === 0) {
    if (r !== null) {
      gu(r);
    }
    e.callbackNode = null;
    e.callbackPriority = 0;
  } else {
    t = n & -n;
    if (e.callbackPriority !== t) {
      if (r != null) {
        gu(r);
      }
      if (t === 1) {
        if (e.tag === 0) {
          D1(fa.bind(null, e));
        } else {
          sc(fa.bind(null, e));
        }
        B1(function () {
          if (!(G & 6)) {
            Ot();
          }
        });
        r = null;
      } else {
        switch (js(n)) {
          case 1:
            r = ci;
            break;
          case 4:
            r = Ts;
            break;
          case 16:
            r = x0;
            break;
          case 536870912:
            r = Hs;
            break;
          default:
            r = x0;
        }
        r = af(r, ef.bind(null, e));
      }
      e.callbackPriority = t;
      e.callbackNode = r;
    }
  }
}
function ef(e, t) {
  i0 = -1;
  u0 = 0;
  if (G & 6) {
    throw Error(T(327));
  }
  var r = e.callbackNode;
  if (wr() && e.callbackNode !== r) {
    return null;
  }
  var n = d0(e, e === de ? he : 0);
  if (n === 0) {
    return null;
  }
  if (n & 30 || n & e.expiredLanes || t) {
    t = P0(e, n);
  } else {
    t = n;
    var o = G;
    G |= 2;
    var l = rf();
    if (de !== e || he !== t) {
      it = null;
      zr = ue() + 500;
      Qt(e, t);
    }
    do {
      try {
        q1();
        break;
      } catch (a) {
        tf(e, a);
      }
    } while (true);
    wi();
    k0.current = l;
    G = o;
    if (ae !== null) {
      t = 0;
    } else {
      de = null;
      he = 0;
      t = fe;
    }
  }
  if (t !== 0) {
    if (t === 2) {
      o = wl(e);
      if (o !== 0) {
        n = o;
        t = Zl(e, o);
      }
    }
    if (t === 1) {
      r = An;
      Qt(e, 0);
      Bt(e, n);
      ze(e, ue());
      throw r;
    }
    if (t === 6) {
      Bt(e, n);
    } else {
      o = e.current.alternate;
      if (!(n & 30) && !Q1(o) && (t = P0(e, n), t === 2 && (l = wl(e), l !== 0 && (n = l, t = Zl(e, l))), t === 1)) {
        r = An;
        Qt(e, 0);
        Bt(e, n);
        ze(e, ue());
        throw r;
      }
      e.finishedWork = o;
      e.finishedLanes = n;
      switch (t) {
        case 0:
        case 1:
          throw Error(T(345));
        case 2:
          Ut(e, De, it);
          break;
        case 3:
          Bt(e, n);
          if ((n & 130023424) === n && (t = ji + 500 - ue(), t > 10)) {
            if (d0(e, 0) !== 0) {
              break;
            }
            o = e.suspendedLanes;
            if ((o & n) !== n) {
              we();
              e.pingedLanes |= e.suspendedLanes & o;
              break;
            }
            e.timeoutHandle = Pl(Ut.bind(null, e, De, it), t);
            break;
          }
          Ut(e, De, it);
          break;
        case 4:
          Bt(e, n);
          if ((n & 4194240) === n) {
            break;
          }
          t = e.eventTimes;
          o = -1;
          while (n > 0) {
            var i = 31 - Je(n);
            l = 1 << i;
            i = t[i];
            if (i > o) {
              o = i;
            }
            n &= ~l;
          }
          n = o;
          n = ue() - n;
          n = (n < 120 ? 120 : n < 480 ? 480 : n < 1080 ? 1080 : n < 1920 ? 1920 : n < 3000 ? 3000 : n < 4320 ? 4320 : V1(n / 1960) * 1960) - n;
          if (n > 10) {
            e.timeoutHandle = Pl(Ut.bind(null, e, De, it), n);
            break;
          }
          Ut(e, De, it);
          break;
        case 5:
          Ut(e, De, it);
          break;
        default:
          throw Error(T(329));
      }
    }
  }
  ze(e, ue());
  if (e.callbackNode === r) {
    return ef.bind(null, e);
  } else {
    return null;
  }
}
function Zl(e, t) {
  var r = un;
  if (e.current.memoizedState.isDehydrated) {
    Qt(e, t).flags |= 256;
  }
  e = P0(e, t);
  if (e !== 2) {
    t = De;
    De = r;
    if (t !== null) {
      Jl(t);
    }
  }
  return e;
}
function Jl(e) {
  if (De === null) {
    De = e;
  } else {
    De.push.apply(De, e);
  }
}
function Q1(e) {
  var t = e;
  for (;;) {
    if (t.flags & 16384) {
      var r = t.updateQueue;
      if (r !== null && (r = r.stores, r !== null)) {
        for (var n = 0; n < r.length; n++) {
          var o = r[n];
          var l = o.getSnapshot;
          o = o.value;
          try {
            if (!et(l(), o)) {
              return false;
            }
          } catch {
            return false;
          }
        }
      }
    }
    r = t.child;
    if (t.subtreeFlags & 16384 && r !== null) {
      r.return = t;
      t = r;
    } else {
      if (t === e) {
        break;
      }
      while (t.sibling === null) {
        if (t.return === null || t.return === e) {
          return true;
        }
        t = t.return;
      }
      t.sibling.return = t.return;
      t = t.sibling;
    }
  }
  return true;
}
function Bt(e, t) {
  t &= ~Oi;
  t &= ~$0;
  e.suspendedLanes |= t;
  e.pingedLanes &= ~t;
  e = e.expirationTimes;
  while (t > 0) {
    var r = 31 - Je(t);
    var n = 1 << r;
    e[r] = -1;
    t &= ~n;
  }
}
function fa(e) {
  if (G & 6) {
    throw Error(T(327));
  }
  wr();
  var t = d0(e, 0);
  if (!(t & 1)) {
    ze(e, ue());
    return null;
  }
  var r = P0(e, t);
  if (e.tag !== 0 && r === 2) {
    var n = wl(e);
    if (n !== 0) {
      t = n;
      r = Zl(e, n);
    }
  }
  if (r === 1) {
    r = An;
    Qt(e, 0);
    Bt(e, t);
    ze(e, ue());
    throw r;
  }
  if (r === 6) {
    throw Error(T(345));
  }
  e.finishedWork = e.current.alternate;
  e.finishedLanes = t;
  Ut(e, De, it);
  ze(e, ue());
  return null;
}
function Ii(e, t) {
  var r = G;
  G |= 1;
  try {
    return e(t);
  } finally {
    G = r;
    if (G === 0) {
      zr = ue() + 500;
      if (I0) {
        Ot();
      }
    }
  }
}
function Zt(e) {
  if (Ft !== null && Ft.tag === 0 && !(G & 6)) {
    wr();
  }
  var t = G;
  G |= 1;
  var r = $e.transition;
  var n = Z;
  try {
    $e.transition = null;
    Z = 1;
    if (e) {
      return e();
    }
  } finally {
    Z = n;
    $e.transition = r;
    G = t;
    if (!(G & 6)) {
      Ot();
    }
  }
}
function Mi() {
  Re = mr.current;
  te(mr);
}
function Qt(e, t) {
  e.finishedWork = null;
  e.finishedLanes = 0;
  var r = e.timeoutHandle;
  if (r !== -1) {
    e.timeoutHandle = -1;
    C1(r);
  }
  if (ae !== null) {
    for (r = ae.return; r !== null;) {
      var n = r;
      Ei(n);
      switch (n.tag) {
        case 1:
          n = n.type.childContextTypes;
          if (n != null) {
            y0();
          }
          break;
        case 3:
          kr();
          te(ke);
          te(Ce);
          Si();
          break;
        case 5:
          ki(n);
          break;
        case 4:
          kr();
          break;
        case 13:
          te(ne);
          break;
        case 19:
          te(ne);
          break;
        case 10:
          Fi(n.type._context);
          break;
        case 22:
        case 23:
          Mi();
      }
      r = r.return;
    }
  }
  de = e;
  ae = e = Nt(e.current, null);
  he = Re = t;
  fe = 0;
  An = null;
  Oi = $0 = Yt = 0;
  De = un = null;
  if ($t !== null) {
    for (t = 0; t < $t.length; t++) {
      r = $t[t];
      n = r.interleaved;
      if (n !== null) {
        r.interleaved = null;
        var o = n.next;
        var l = r.pending;
        if (l !== null) {
          var i = l.next;
          l.next = o;
          n.next = i;
        }
        r.pending = n;
      }
    }
    $t = null;
  }
  return e;
}
function tf(e, t) {
  do {
    var r = ae;
    try {
      wi();
      n0.current = _0;
      if (D0) {
        for (var n = oe.memoizedState; n !== null;) {
          var o = n.queue;
          if (o !== null) {
            o.pending = null;
          }
          n = n.next;
        }
        D0 = false;
      }
      Xt = 0;
      xe = ce = oe = null;
      on = false;
      Bn = 0;
      Hi.current = null;
      if (r === null || r.return === null) {
        fe = 1;
        An = t;
        ae = null;
        break;
      }
      e: {
        var l = e;
        var i = r.return;
        var a = r;
        var c = t;
        t = he;
        a.flags |= 32768;
        if (c !== null && typeof c == "object" && typeof c.then == "function") {
          var u = c;
          var d = a;
          var y = d.tag;
          if (!(d.mode & 1) && (y === 0 || y === 11 || y === 15)) {
            var x = d.alternate;
            if (x) {
              d.updateQueue = x.updateQueue;
              d.memoizedState = x.memoizedState;
              d.lanes = x.lanes;
            } else {
              d.updateQueue = null;
              d.memoizedState = null;
            }
          }
          var m = Ju(i);
          if (m !== null) {
            m.flags &= -257;
            bu(m, i, a, l, t);
            if (m.mode & 1) {
              Zu(l, u, t);
            }
            t = m;
            c = u;
            var h = t.updateQueue;
            if (h === null) {
              var g = new Set();
              g.add(c);
              t.updateQueue = g;
            } else {
              h.add(c);
            }
            break e;
          } else {
            if (!(t & 1)) {
              Zu(l, u, t);
              Ui();
              break e;
            }
            c = Error(T(426));
          }
        } else if (re && a.mode & 1) {
          var E = Ju(i);
          if (E !== null) {
            if (!(E.flags & 65536)) {
              E.flags |= 256;
            }
            bu(E, i, a, l, t);
            Ci(Sr(c, a));
            break e;
          }
        }
        l = c = Sr(c, a);
        if (fe !== 4) {
          fe = 2;
        }
        if (un === null) {
          un = [l];
        } else {
          un.push(l);
        }
        l = i;
        do {
          switch (l.tag) {
            case 3:
              l.flags |= 65536;
              t &= -t;
              l.lanes |= t;
              var p = jc(l, c, t);
              Qu(l, p);
              break e;
            case 1:
              a = c;
              var s = l.type;
              var f = l.stateNode;
              if (!(l.flags & 128) && (typeof s.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (zt === null || !zt.has(f)))) {
                l.flags |= 65536;
                t &= -t;
                l.lanes |= t;
                var v = Ic(l, a, t);
                Qu(l, v);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      of(r);
    } catch (C) {
      t = C;
      if (ae === r && r !== null) {
        ae = r = r.return;
      }
      continue;
    }
    break;
  } while (true);
}
function rf() {
  var e = k0.current;
  k0.current = _0;
  if (e === null) {
    return _0;
  } else {
    return e;
  }
}
function Ui() {
  if (fe === 0 || fe === 3 || fe === 2) {
    fe = 4;
  }
  if (de !== null && (!!(Yt & 268435455) || !!($0 & 268435455))) {
    Bt(de, he);
  }
}
function P0(e, t) {
  var r = G;
  G |= 2;
  var n = rf();
  if (de !== e || he !== t) {
    it = null;
    Qt(e, t);
  }
  do {
    try {
      K1();
      break;
    } catch (o) {
      tf(e, o);
    }
  } while (true);
  wi();
  G = r;
  k0.current = n;
  if (ae !== null) {
    throw Error(T(261));
  }
  de = null;
  he = 0;
  return fe;
}
function K1() {
  while (ae !== null) {
    nf(ae);
  }
}
function q1() {
  while (ae !== null && !yx()) {
    nf(ae);
  }
}
function nf(e) {
  var t = uf(e.alternate, e, Re);
  e.memoizedProps = e.pendingProps;
  if (t === null) {
    of(e);
  } else {
    ae = t;
  }
  Hi.current = null;
}
function of(e) {
  var t = e;
  do {
    var r = t.alternate;
    e = t.return;
    if (t.flags & 32768) {
      r = M1(r, t);
      if (r !== null) {
        r.flags &= 32767;
        ae = r;
        return;
      }
      if (e !== null) {
        e.flags |= 32768;
        e.subtreeFlags = 0;
        e.deletions = null;
      } else {
        fe = 6;
        ae = null;
        return;
      }
    } else {
      r = I1(r, t, Re);
      if (r !== null) {
        ae = r;
        return;
      }
    }
    t = t.sibling;
    if (t !== null) {
      ae = t;
      return;
    }
    ae = t = e;
  } while (t !== null);
  if (fe === 0) {
    fe = 5;
  }
}
function Ut(e, t, r) {
  var n = Z;
  var o = $e.transition;
  try {
    $e.transition = null;
    Z = 1;
    G1(e, t, r, n);
  } finally {
    $e.transition = o;
    Z = n;
  }
  return null;
}
function G1(e, t, r, n) {
  do {
    wr();
  } while (Ft !== null);
  if (G & 6) {
    throw Error(T(327));
  }
  r = e.finishedWork;
  var o = e.finishedLanes;
  if (r === null) {
    return null;
  }
  e.finishedWork = null;
  e.finishedLanes = 0;
  if (r === e.current) {
    throw Error(T(177));
  }
  e.callbackNode = null;
  e.callbackPriority = 0;
  var l = r.lanes | r.childLanes;
  kx(e, l);
  if (e === de) {
    ae = de = null;
    he = 0;
  }
  if ((!!(r.subtreeFlags & 2064) || !!(r.flags & 2064)) && !Xn) {
    Xn = true;
    af(x0, function () {
      wr();
      return null;
    });
  }
  l = (r.flags & 15990) !== 0;
  if (r.subtreeFlags & 15990 || l) {
    l = $e.transition;
    $e.transition = null;
    var i = Z;
    Z = 1;
    var a = G;
    G |= 4;
    Hi.current = null;
    W1(e, r);
    Jc(r, e);
    p1(Sl);
    p0 = !!kl;
    Sl = kl = null;
    e.current = r;
    $1(r);
    gx();
    G = a;
    Z = i;
    $e.transition = l;
  } else {
    e.current = r;
  }
  if (Xn) {
    Xn = false;
    Ft = e;
    z0 = o;
  }
  l = e.pendingLanes;
  if (l === 0) {
    zt = null;
  }
  Bx(r.stateNode);
  ze(e, ue());
  if (t !== null) {
    n = e.onRecoverableError;
    r = 0;
    for (; r < t.length; r++) {
      o = t[r];
      n(o.value, {
        componentStack: o.stack,
        digest: o.digest
      });
    }
  }
  if (S0) {
    S0 = false;
    e = Xl;
    Xl = null;
    throw e;
  }
  if (z0 & 1 && e.tag !== 0) {
    wr();
  }
  l = e.pendingLanes;
  if (l & 1) {
    if (e === Yl) {
      an++;
    } else {
      an = 0;
      Yl = e;
    }
  } else {
    an = 0;
  }
  Ot();
  return null;
}
function wr() {
  if (Ft !== null) {
    var e = js(z0);
    var t = $e.transition;
    var r = Z;
    try {
      $e.transition = null;
      Z = e < 16 ? 16 : e;
      if (Ft === null) {
        var n = false;
      } else {
        e = Ft;
        Ft = null;
        z0 = 0;
        if (G & 6) {
          throw Error(T(331));
        }
        var o = G;
        G |= 4;
        j = e.current;
        while (j !== null) {
          var l = j;
          var i = l.child;
          if (j.flags & 16) {
            var a = l.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var u = a[c];
                for (j = u; j !== null;) {
                  var d = j;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ln(8, d, l);
                  }
                  var y = d.child;
                  if (y !== null) {
                    y.return = d;
                    j = y;
                  } else {
                    while (j !== null) {
                      d = j;
                      var x = d.sibling;
                      var m = d.return;
                      Xc(d);
                      if (d === u) {
                        j = null;
                        break;
                      }
                      if (x !== null) {
                        x.return = m;
                        j = x;
                        break;
                      }
                      j = m;
                    }
                  }
                }
              }
              var h = l.alternate;
              if (h !== null) {
                var g = h.child;
                if (g !== null) {
                  h.child = null;
                  do {
                    var E = g.sibling;
                    g.sibling = null;
                    g = E;
                  } while (g !== null);
                }
              }
              j = l;
            }
          }
          if (l.subtreeFlags & 2064 && i !== null) {
            i.return = l;
            j = i;
          } else {
            e: while (j !== null) {
              l = j;
              if (l.flags & 2048) {
                switch (l.tag) {
                  case 0:
                  case 11:
                  case 15:
                    ln(9, l, l.return);
                }
              }
              var p = l.sibling;
              if (p !== null) {
                p.return = l.return;
                j = p;
                break e;
              }
              j = l.return;
            }
          }
        }
        var s = e.current;
        for (j = s; j !== null;) {
          i = j;
          var f = i.child;
          if (i.subtreeFlags & 2064 && f !== null) {
            f.return = i;
            j = f;
          } else {
            e: for (i = s; j !== null;) {
              a = j;
              if (a.flags & 2048) {
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      W0(9, a);
                  }
                } catch (C) {
                  ie(a, a.return, C);
                }
              }
              if (a === i) {
                j = null;
                break e;
              }
              var v = a.sibling;
              if (v !== null) {
                v.return = a.return;
                j = v;
                break e;
              }
              j = a.return;
            }
          }
        }
        G = o;
        Ot();
        if (ot && typeof ot.onPostCommitFiberRoot == "function") {
          try {
            ot.onPostCommitFiberRoot(L0, e);
          } catch {}
        }
        n = true;
      }
      return n;
    } finally {
      Z = r;
      $e.transition = t;
    }
  }
  return false;
}
function xa(e, t, r) {
  t = Sr(r, t);
  t = jc(e, t, 1);
  e = St(e, t, 1);
  t = we();
  if (e !== null) {
    _n(e, 1, t);
    ze(e, t);
  }
}
function ie(e, t, r) {
  if (e.tag === 3) {
    xa(e, e, r);
  } else {
    while (t !== null) {
      if (t.tag === 3) {
        xa(t, e, r);
        break;
      } else if (t.tag === 1) {
        var n = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (zt === null || !zt.has(n))) {
          e = Sr(r, e);
          e = Ic(t, e, 1);
          t = St(t, e, 1);
          e = we();
          if (t !== null) {
            _n(t, 1, e);
            ze(t, e);
          }
          break;
        }
      }
      t = t.return;
    }
  }
}
function X1(e, t, r) {
  var n = e.pingCache;
  if (n !== null) {
    n.delete(t);
  }
  t = we();
  e.pingedLanes |= e.suspendedLanes & r;
  if (de === e && (he & r) === r) {
    if (fe === 4 || fe === 3 && (he & 130023424) === he && ue() - ji < 500) {
      Qt(e, 0);
    } else {
      Oi |= r;
    }
  }
  ze(e, t);
}
function lf(e, t) {
  if (t === 0) {
    if (e.mode & 1) {
      t = In;
      In <<= 1;
      if (!(In & 130023424)) {
        In = 4194304;
      }
    } else {
      t = 1;
    }
  }
  var r = we();
  e = dt(e, t);
  if (e !== null) {
    _n(e, t, r);
    ze(e, r);
  }
}
function Y1(e) {
  var t = e.memoizedState;
  var r = 0;
  if (t !== null) {
    r = t.retryLane;
  }
  lf(e, r);
}
function Z1(e, t) {
  var r = 0;
  switch (e.tag) {
    case 13:
      var n = e.stateNode;
      var o = e.memoizedState;
      if (o !== null) {
        r = o.retryLane;
      }
      break;
    case 19:
      n = e.stateNode;
      break;
    default:
      throw Error(T(314));
  }
  if (n !== null) {
    n.delete(t);
  }
  lf(e, r);
}
var uf;
uf = function (e, t, r) {
  if (e !== null) {
    if (e.memoizedProps !== t.pendingProps || ke.current) {
      _e = true;
    } else {
      if (!(e.lanes & r) && !(t.flags & 128)) {
        _e = false;
        return j1(e, t, r);
      }
      _e = !!(e.flags & 131072);
    }
  } else {
    _e = false;
    if (re && t.flags & 1048576) {
      cc(t, C0, t.index);
    }
  }
  t.lanes = 0;
  switch (t.tag) {
    case 2:
      var n = t.type;
      l0(e, t);
      e = t.pendingProps;
      var o = Ar(t, Ce.current);
      Br(t, r);
      o = Pi(null, t, n, e, o, r);
      var l = Ni();
      t.flags |= 1;
      if (typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === undefined) {
        t.tag = 1;
        t.memoizedState = null;
        t.updateQueue = null;
        if (Se(n)) {
          l = true;
          g0(t);
        } else {
          l = false;
        }
        t.memoizedState = o.state ?? null;
        Di(t);
        o.updater = U0;
        t.stateNode = o;
        o._reactInternals = t;
        jl(t, n, e, r);
        t = Ul(null, t, n, true, l, r);
      } else {
        t.tag = 0;
        if (re && l) {
          gi(t);
        }
        Be(null, t, o, r);
        t = t.child;
      }
      return t;
    case 16:
      n = t.elementType;
      e: {
        l0(e, t);
        e = t.pendingProps;
        o = n._init;
        n = o(n._payload);
        t.type = n;
        o = t.tag = b1(n);
        e = Xe(n, e);
        switch (o) {
          case 0:
            t = Ml(null, t, n, e, r);
            break e;
          case 1:
            t = ra(null, t, n, e, r);
            break e;
          case 11:
            t = ea(null, t, n, e, r);
            break e;
          case 14:
            t = ta(null, t, n, Xe(n.type, e), r);
            break e;
        }
        throw Error(T(306, n, ""));
      }
      return t;
    case 0:
      n = t.type;
      o = t.pendingProps;
      o = t.elementType === n ? o : Xe(n, o);
      return Ml(e, t, n, o, r);
    case 1:
      n = t.type;
      o = t.pendingProps;
      o = t.elementType === n ? o : Xe(n, o);
      return ra(e, t, n, o, r);
    case 3:
      e: {
        $c(t);
        if (e === null) {
          throw Error(T(387));
        }
        n = t.pendingProps;
        l = t.memoizedState;
        o = l.element;
        hc(e, t);
        F0(t, n, null, r);
        var i = t.memoizedState;
        n = i.element;
        if (l.isDehydrated) {
          l = {
            element: n,
            isDehydrated: false,
            cache: i.cache,
            pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
            transitions: i.transitions
          };
          t.updateQueue.baseState = l;
          t.memoizedState = l;
          if (t.flags & 256) {
            o = Sr(Error(T(423)), t);
            t = na(e, t, n, r, o);
            break e;
          } else if (n !== o) {
            o = Sr(Error(T(424)), t);
            t = na(e, t, n, r, o);
            break e;
          } else {
            Le = kt(t.stateNode.containerInfo.firstChild);
            Te = t;
            re = true;
            Ze = null;
            r = pc(t, null, n, r);
            t.child = r;
            while (r) {
              r.flags = r.flags & -3 | 4096;
              r = r.sibling;
            }
          }
        } else {
          Dr();
          if (n === o) {
            t = pt(e, t, r);
            break e;
          }
          Be(e, t, n, r);
        }
        t = t.child;
      }
      return t;
    case 5:
      mc(t);
      if (e === null) {
        Tl(t);
      }
      n = t.type;
      o = t.pendingProps;
      l = e !== null ? e.memoizedProps : null;
      i = o.children;
      if (zl(n, o)) {
        i = null;
      } else if (l !== null && zl(n, l)) {
        t.flags |= 32;
      }
      Wc(e, t);
      Be(e, t, i, r);
      return t.child;
    case 6:
      if (e === null) {
        Tl(t);
      }
      return null;
    case 13:
      return Vc(e, t, r);
    case 4:
      _i(t, t.stateNode.containerInfo);
      n = t.pendingProps;
      if (e === null) {
        t.child = _r(t, null, n, r);
      } else {
        Be(e, t, n, r);
      }
      return t.child;
    case 11:
      n = t.type;
      o = t.pendingProps;
      o = t.elementType === n ? o : Xe(n, o);
      return ea(e, t, n, o, r);
    case 7:
      Be(e, t, t.pendingProps, r);
      return t.child;
    case 8:
      Be(e, t, t.pendingProps.children, r);
      return t.child;
    case 12:
      Be(e, t, t.pendingProps.children, r);
      return t.child;
    case 10:
      e: {
        n = t.type._context;
        o = t.pendingProps;
        l = t.memoizedProps;
        i = o.value;
        b(B0, n._currentValue);
        n._currentValue = i;
        if (l !== null) {
          if (et(l.value, i)) {
            if (l.children === o.children && !ke.current) {
              t = pt(e, t, r);
              break e;
            }
          } else {
            l = t.child;
            if (l !== null) {
              l.return = t;
            }
            while (l !== null) {
              var a = l.dependencies;
              if (a !== null) {
                i = l.child;
                for (var c = a.firstContext; c !== null;) {
                  if (c.context === n) {
                    if (l.tag === 1) {
                      c = ct(-1, r & -r);
                      c.tag = 2;
                      var u = l.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var d = u.pending;
                        if (d === null) {
                          c.next = c;
                        } else {
                          c.next = d.next;
                          d.next = c;
                        }
                        u.pending = c;
                      }
                    }
                    l.lanes |= r;
                    c = l.alternate;
                    if (c !== null) {
                      c.lanes |= r;
                    }
                    Hl(l.return, r, t);
                    a.lanes |= r;
                    break;
                  }
                  c = c.next;
                }
              } else if (l.tag === 10) {
                i = l.type === t.type ? null : l.child;
              } else if (l.tag === 18) {
                i = l.return;
                if (i === null) {
                  throw Error(T(341));
                }
                i.lanes |= r;
                a = i.alternate;
                if (a !== null) {
                  a.lanes |= r;
                }
                Hl(i, r, t);
                i = l.sibling;
              } else {
                i = l.child;
              }
              if (i !== null) {
                i.return = l;
              } else {
                for (i = l; i !== null;) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  l = i.sibling;
                  if (l !== null) {
                    l.return = i.return;
                    i = l;
                    break;
                  }
                  i = i.return;
                }
              }
              l = i;
            }
          }
        }
        Be(e, t, o.children, r);
        t = t.child;
      }
      return t;
    case 9:
      o = t.type;
      n = t.pendingProps.children;
      Br(t, r);
      o = Ve(o);
      n = n(o);
      t.flags |= 1;
      Be(e, t, n, r);
      return t.child;
    case 14:
      n = t.type;
      o = Xe(n, t.pendingProps);
      o = Xe(n.type, o);
      return ta(e, t, n, o, r);
    case 15:
      return Mc(e, t, t.type, t.pendingProps, r);
    case 17:
      n = t.type;
      o = t.pendingProps;
      o = t.elementType === n ? o : Xe(n, o);
      l0(e, t);
      t.tag = 1;
      if (Se(n)) {
        e = true;
        g0(t);
      } else {
        e = false;
      }
      Br(t, r);
      Oc(t, n, o);
      jl(t, n, o, r);
      return Ul(null, t, n, true, e, r);
    case 19:
      return Qc(e, t, r);
    case 22:
      return Uc(e, t, r);
  }
  throw Error(T(156, t.tag));
};
function af(e, t) {
  return Ls(e, t);
}
function J1(e, t, r, n) {
  this.tag = e;
  this.key = r;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = t;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = n;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function We(e, t, r, n) {
  return new J1(e, t, r, n);
}
function Wi(e) {
  e = e.prototype;
  return !!e && !!e.isReactComponent;
}
function b1(e) {
  if (typeof e == "function") {
    if (Wi(e)) {
      return 1;
    } else {
      return 0;
    }
  }
  if (e != null) {
    e = e.$$typeof;
    if (e === ui) {
      return 11;
    }
    if (e === ai) {
      return 14;
    }
  }
  return 2;
}
function Nt(e, t) {
  var r = e.alternate;
  if (r === null) {
    r = We(e.tag, t, e.key, e.mode);
    r.elementType = e.elementType;
    r.type = e.type;
    r.stateNode = e.stateNode;
    r.alternate = e;
    e.alternate = r;
  } else {
    r.pendingProps = t;
    r.type = e.type;
    r.flags = 0;
    r.subtreeFlags = 0;
    r.deletions = null;
  }
  r.flags = e.flags & 14680064;
  r.childLanes = e.childLanes;
  r.lanes = e.lanes;
  r.child = e.child;
  r.memoizedProps = e.memoizedProps;
  r.memoizedState = e.memoizedState;
  r.updateQueue = e.updateQueue;
  t = e.dependencies;
  r.dependencies = t === null ? null : {
    lanes: t.lanes,
    firstContext: t.firstContext
  };
  r.sibling = e.sibling;
  r.index = e.index;
  r.ref = e.ref;
  return r;
}
function a0(e, t, r, n, o, l) {
  var i = 2;
  n = e;
  if (typeof e == "function") {
    if (Wi(e)) {
      i = 1;
    }
  } else if (typeof e == "string") {
    i = 5;
  } else {
    e: switch (e) {
      case ur:
        return Kt(r.children, o, l, t);
      case ii:
        i = 8;
        o |= 8;
        break;
      case al:
        e = We(12, r, t, o | 2);
        e.elementType = al;
        e.lanes = l;
        return e;
      case sl:
        e = We(13, r, t, o);
        e.elementType = sl;
        e.lanes = l;
        return e;
      case cl:
        e = We(19, r, t, o);
        e.elementType = cl;
        e.lanes = l;
        return e;
      case ms:
        return V0(r, o, l, t);
      default:
        if (typeof e == "object" && e !== null) {
          switch (e.$$typeof) {
            case vs:
              i = 10;
              break e;
            case hs:
              i = 9;
              break e;
            case ui:
              i = 11;
              break e;
            case ai:
              i = 14;
              break e;
            case gt:
              i = 16;
              n = null;
              break e;
          }
        }
        throw Error(T(130, e == null ? e : typeof e, ""));
    }
  }
  t = We(i, r, t, o);
  t.elementType = e;
  t.type = n;
  t.lanes = l;
  return t;
}
function Kt(e, t, r, n) {
  e = We(7, e, n, t);
  e.lanes = r;
  return e;
}
function V0(e, t, r, n) {
  e = We(22, e, n, t);
  e.elementType = ms;
  e.lanes = r;
  e.stateNode = {
    isHidden: false
  };
  return e;
}
function wo(e, t, r) {
  e = We(6, e, null, t);
  e.lanes = r;
  return e;
}
function Fo(e, t, r) {
  t = We(4, e.children !== null ? e.children : [], e.key, t);
  t.lanes = r;
  t.stateNode = {
    containerInfo: e.containerInfo,
    pendingChildren: null,
    implementation: e.implementation
  };
  return t;
}
function ed(e, t, r, n, o) {
  this.tag = t;
  this.containerInfo = e;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = no(0);
  this.expirationTimes = no(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = no(0);
  this.identifierPrefix = n;
  this.onRecoverableError = o;
  this.mutableSourceEagerHydrationData = null;
}
function $i(e, t, r, n, o, l, i, a, c) {
  e = new ed(e, t, r, a, c);
  if (t === 1) {
    t = 1;
    if (l === true) {
      t |= 8;
    }
  } else {
    t = 0;
  }
  l = We(3, null, null, t);
  e.current = l;
  l.stateNode = e;
  l.memoizedState = {
    element: n,
    isDehydrated: r,
    cache: null,
    transitions: null,
    pendingSuspenseBoundaries: null
  };
  Di(l);
  return e;
}
function td(e, t, r, n = null) {
  return {
    $$typeof: ir,
    key: n == null ? null : "" + n,
    children: e,
    containerInfo: t,
    implementation: r
  };
}
function sf(e) {
  if (!e) {
    return Lt;
  }
  e = e._reactInternals;
  e: {
    if (bt(e) !== e || e.tag !== 1) {
      throw Error(T(170));
    }
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Se(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(T(171));
  }
  if (e.tag === 1) {
    var r = e.type;
    if (Se(r)) {
      return ac(e, r, t);
    }
  }
  return t;
}
function cf(e, t, r, n, o, l, i, a, c) {
  e = $i(r, n, true, e, o, l, i, a, c);
  e.context = sf(null);
  r = e.current;
  n = we();
  o = Pt(r);
  l = ct(n, o);
  l.callback = t ?? null;
  St(r, l, o);
  e.current.lanes = o;
  _n(e, o, n);
  ze(e, n);
  return e;
}
function Q0(e, t, r, n) {
  var o = t.current;
  var l = we();
  var i = Pt(o);
  r = sf(r);
  if (t.context === null) {
    t.context = r;
  } else {
    t.pendingContext = r;
  }
  t = ct(l, i);
  t.payload = {
    element: e
  };
  n = n === undefined ? null : n;
  if (n !== null) {
    t.callback = n;
  }
  e = St(o, t, i);
  if (e !== null) {
    be(e, o, i, l);
    r0(e, o, i);
  }
  return i;
}
function N0(e) {
  e = e.current;
  if (!e.child) {
    return null;
  }
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function da(e, t) {
  e = e.memoizedState;
  if (e !== null && e.dehydrated !== null) {
    var r = e.retryLane;
    e.retryLane = r !== 0 && r < t ? r : t;
  }
}
function Vi(e, t) {
  da(e, t);
  if (e = e.alternate) {
    da(e, t);
  }
}
function rd() {
  return null;
}
var ff = typeof reportError == "function" ? reportError : function (e) {
  console.error(e);
};
function Qi(e) {
  this._internalRoot = e;
}
K0.prototype.render = Qi.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) {
    throw Error(T(409));
  }
  Q0(e, t, null, null);
};
K0.prototype.unmount = Qi.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Zt(function () {
      Q0(null, e, null, null);
    });
    t[xt] = null;
  }
};
function K0(e) {
  this._internalRoot = e;
}
K0.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Us();
    e = {
      blockedOn: null,
      target: e,
      priority: t
    };
    for (var r = 0; r < Ct.length && t !== 0 && t < Ct[r].priority; r++);
    Ct.splice(r, 0, e);
    if (r === 0) {
      $s(e);
    }
  }
};
function Ki(e) {
  return !!e && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11);
}
function q0(e) {
  return !!e && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11 || e.nodeType === 8 && e.nodeValue === " react-mount-point-unstable ");
}
function pa() {}
function nd(e, t, r, n, o) {
  if (o) {
    if (typeof n == "function") {
      var l = n;
      n = function () {
        var u = N0(i);
        l.call(u);
      };
    }
    var i = cf(t, n, e, 0, null, false, false, "", pa);
    e._reactRootContainer = i;
    e[xt] = i.current;
    mn(e.nodeType === 8 ? e.parentNode : e);
    Zt();
    return i;
  }
  while (o = e.lastChild) {
    e.removeChild(o);
  }
  if (typeof n == "function") {
    var a = n;
    n = function () {
      var u = N0(c);
      a.call(u);
    };
  }
  var c = $i(e, 0, false, null, null, false, false, "", pa);
  e._reactRootContainer = c;
  e[xt] = c.current;
  mn(e.nodeType === 8 ? e.parentNode : e);
  Zt(function () {
    Q0(t, c, r, n);
  });
  return c;
}
function G0(e, t, r, n, o) {
  var l = r._reactRootContainer;
  if (l) {
    var i = l;
    if (typeof o == "function") {
      var a = o;
      o = function () {
        var c = N0(i);
        a.call(c);
      };
    }
    Q0(t, i, e, o);
  } else {
    i = nd(r, t, e, o, n);
  }
  return N0(i);
}
Is = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var r = Zr(t.pendingLanes);
        if (r !== 0) {
          fi(t, r | 1);
          ze(t, ue());
          if (!(G & 6)) {
            zr = ue() + 500;
            Ot();
          }
        }
      }
      break;
    case 13:
      Zt(function () {
        var n = dt(e, 1);
        if (n !== null) {
          var o = we();
          be(n, e, 1, o);
        }
      });
      Vi(e, 1);
  }
};
xi = function (e) {
  if (e.tag === 13) {
    var t = dt(e, 134217728);
    if (t !== null) {
      var r = we();
      be(t, e, 134217728, r);
    }
    Vi(e, 134217728);
  }
};
Ms = function (e) {
  if (e.tag === 13) {
    var t = Pt(e);
    var r = dt(e, t);
    if (r !== null) {
      var n = we();
      be(r, e, t, n);
    }
    Vi(e, t);
  }
};
Us = function () {
  return Z;
};
Ws = function (e, t) {
  var r = Z;
  try {
    Z = e;
    return t();
  } finally {
    Z = r;
  }
};
El = function (e, t, r) {
  switch (t) {
    case "input":
      dl(e, r);
      t = r.name;
      if (r.type === "radio" && t != null) {
        for (r = e; r.parentNode;) {
          r = r.parentNode;
        }
        r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + "][type=\"radio\"]");
        t = 0;
        for (; t < r.length; t++) {
          var n = r[t];
          if (n !== e && n.form === e.form) {
            var o = j0(n);
            if (!o) {
              throw Error(T(90));
            }
            gs(n);
            dl(n, o);
          }
        }
      }
      break;
    case "textarea":
      Cs(e, r);
      break;
    case "select":
      t = r.value;
      if (t != null) {
        yr(e, !!r.multiple, t, false);
      }
  }
};
ks = Ii;
Ss = Zt;
var od = {
  usingClientEntryPoint: false,
  Events: [Sn, fr, j0, Ds, _s, Ii]
};
var Gr = {
  findFiberByHostInstance: Wt,
  bundleType: 0,
  version: "18.3.1",
  rendererPackageName: "react-dom"
};
var ld = {
  bundleType: Gr.bundleType,
  version: Gr.version,
  rendererPackageName: Gr.rendererPackageName,
  rendererConfig: Gr.rendererConfig,
  overrideHookState: null,
  overrideHookStateDeletePath: null,
  overrideHookStateRenamePath: null,
  overrideProps: null,
  overridePropsDeletePath: null,
  overridePropsRenamePath: null,
  setErrorHandler: null,
  setSuspenseHandler: null,
  scheduleUpdate: null,
  currentDispatcherRef: vt.ReactCurrentDispatcher,
  findHostInstanceByFiber: function (e) {
    e = Ns(e);
    if (e === null) {
      return null;
    } else {
      return e.stateNode;
    }
  },
  findFiberByHostInstance: Gr.findFiberByHostInstance || rd,
  findHostInstancesForRefresh: null,
  scheduleRefresh: null,
  scheduleRoot: null,
  setRefreshHandler: null,
  getCurrentFiber: null,
  reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
  var Yn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Yn.isDisabled && Yn.supportsFiber) {
    try {
      L0 = Yn.inject(ld);
      ot = Yn;
    } catch {}
  }
}
Oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = od;
Oe.createPortal = function (e, t, r = null) {
  if (!Ki(t)) {
    throw Error(T(200));
  }
  return td(e, t, null, r);
};
Oe.createRoot = function (e, t) {
  if (!Ki(e)) {
    throw Error(T(299));
  }
  var r = false;
  var n = "";
  var o = ff;
  if (t != null) {
    if (t.unstable_strictMode === true) {
      r = true;
    }
    if (t.identifierPrefix !== undefined) {
      n = t.identifierPrefix;
    }
    if (t.onRecoverableError !== undefined) {
      o = t.onRecoverableError;
    }
  }
  t = $i(e, 1, false, null, null, r, false, n, o);
  e[xt] = t.current;
  mn(e.nodeType === 8 ? e.parentNode : e);
  return new Qi(t);
};
Oe.findDOMNode = function (e) {
  if (e == null) {
    return null;
  }
  if (e.nodeType === 1) {
    return e;
  }
  var t = e._reactInternals;
  if (t === undefined) {
    throw typeof e.render == "function" ? Error(T(188)) : (e = Object.keys(e).join(","), Error(T(268, e)));
  }
  e = Ns(t);
  e = e === null ? null : e.stateNode;
  return e;
};
Oe.flushSync = function (e) {
  return Zt(e);
};
Oe.hydrate = function (e, t, r) {
  if (!q0(t)) {
    throw Error(T(200));
  }
  return G0(null, e, t, true, r);
};
Oe.hydrateRoot = function (e, t, r) {
  if (!Ki(e)) {
    throw Error(T(405));
  }
  var n = r != null && r.hydratedSources || null;
  var o = false;
  var l = "";
  var i = ff;
  if (r != null) {
    if (r.unstable_strictMode === true) {
      o = true;
    }
    if (r.identifierPrefix !== undefined) {
      l = r.identifierPrefix;
    }
    if (r.onRecoverableError !== undefined) {
      i = r.onRecoverableError;
    }
  }
  t = cf(t, null, e, 1, r ?? null, o, false, l, i);
  e[xt] = t.current;
  mn(e);
  if (n) {
    for (e = 0; e < n.length; e++) {
      r = n[e];
      o = r._getVersion;
      o = o(r._source);
      if (t.mutableSourceEagerHydrationData == null) {
        t.mutableSourceEagerHydrationData = [r, o];
      } else {
        t.mutableSourceEagerHydrationData.push(r, o);
      }
    }
  }
  return new K0(t);
};
Oe.render = function (e, t, r) {
  if (!q0(t)) {
    throw Error(T(200));
  }
  return G0(null, e, t, false, r);
};
Oe.unmountComponentAtNode = function (e) {
  if (!q0(e)) {
    throw Error(T(40));
  }
  if (e._reactRootContainer) {
    Zt(function () {
      G0(null, null, e, false, function () {
        e._reactRootContainer = null;
        e[xt] = null;
      });
    });
    return true;
  } else {
    return false;
  }
};
Oe.unstable_batchedUpdates = Ii;
Oe.unstable_renderSubtreeIntoContainer = function (e, t, r, n) {
  if (!q0(r)) {
    throw Error(T(200));
  }
  if (e == null || e._reactInternals === undefined) {
    throw Error(T(38));
  }
  return G0(e, t, r, false, n);
};
Oe.version = "18.3.1-next-f1338f8080-20240426";
function xf() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") {
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(xf);
    } catch (e) {
      console.error(e);
    }
  }
}
xf();
fs.exports = Oe;
var id = fs.exports;
var df;
var va = id;
df = va.createRoot;
va.hydrateRoot;
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ud = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}; /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
const ad = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim();
const pf = (e, t) => {
  const r = Y.forwardRef(({
    color: n = "currentColor",
    size: o = 24,
    strokeWidth: l = 2,
    absoluteStrokeWidth: i,
    className: a = "",
    children: c,
    ...u
  }, d) => Y.createElement("svg", {
    ref: d,
    ...ud,
    width: o,
    height: o,
    stroke: n,
    strokeWidth: i ? Number(l) * 24 / Number(o) : l,
    className: ["lucide", `lucide-${ad(e)}`, a].join(" "),
    ...u
  }, [...t.map(([y, x]) => Y.createElement(y, x)), ...(Array.isArray(c) ? c : [c])]));
  r.displayName = `${e}`;
  return r;
};
/**
* @license lucide-react v0.344.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const vf = pf("Gift", [["rect", {
  x: "3",
  y: "8",
  width: "18",
  height: "4",
  rx: "1",
  key: "bkv52"
}], ["path", {
  d: "M12 8v13",
  key: "1c76mn"
}], ["path", {
  d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",
  key: "6wjy6b"
}], ["path", {
  d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
  key: "1ihvrl"
}]]); /**
      * @license lucide-react v0.344.0 - ISC
      *
      * This source code is licensed under the ISC license.
      * See the LICENSE file in the root directory of this source tree.
      */
const sd = pf("Trophy", [["path", {
  d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6",
  key: "17hqa7"
}], ["path", {
  d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18",
  key: "lmptdp"
}], ["path", {
  d: "M4 22h16",
  key: "57wxv0"
}], ["path", {
  d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",
  key: "1nw9bq"
}], ["path", {
  d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",
  key: "1np0yb"
}], ["path", {
  d: "M18 2H6v7a6 6 0 0 0 12 0V2Z",
  key: "u46fv3"
}]]);
function cd({
  onStart: e
}) {
  const [t, r] = Y.useState("");
  const [n, o] = Y.useState("");
  const l = i => {
    i.preventDefault();
    if (t.trim().length < 2) {
      o("The name must contain at least 2 characters");
      return;
    }
    e(t.trim());
  };
  return U.jsx("div", {
    className: "min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 flex items-center justify-center p-4",
    children: U.jsxs("div", {
      className: "bg-white rounded-xl shadow-2xl p-8 w-full max-w-md",
      children: [U.jsxs("div", {
        className: "text-center mb-8",
        children: [U.jsx(vf, {
          className: "w-16 h-16 mx-auto text-red-500 mb-4"
        }), U.jsx("h1", {
          className: "text-3xl font-bold text-gray-800 mb-2",
          children: "Catch the gifts"
        }), U.jsx("p", {
          className: "text-gray-600",
          children: "Try to beat Santa to get the flag!"
        })]
      }), U.jsxs("form", {
        onSubmit: l,
        className: "space-y-6",
        children: [U.jsxs("div", {
          children: [U.jsx("label", {
            htmlFor: "playerName",
            className: "block text-sm font-medium text-gray-700 mb-2",
            children: "Your nickname"
          }), U.jsx("input", {
            type: "text",
            id: "playerName",
            value: t,
            onChange: i => r(i.target.value),
            className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            placeholder: "Enter your nickname ..."
          }), n && U.jsx("p", {
            className: "mt-2 text-sm text-red-600",
            children: n
          })]
        }), U.jsx("button", {
          type: "submit",
          className: "w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors",
          children: "Start the game"
        })]
      }), U.jsxs("div", {
        className: "mt-8 text-sm text-gray-600",
        children: [U.jsx("h3", {
          className: "font-semibold mb-2",
          children: "How to play:"
        }), U.jsxs("ul", {
          className: "list-disc list-inside space-y-1",
          children: [U.jsx("li", {
            children: "Use the arrows ← → to move Santa Claus"
          }), U.jsx("li", {
            children: "Catch falling gifts"
          }), U.jsx("li", {
            children: "Each gift is worth 50 points"
          }), U.jsx("li", {
            children: "You've got 20 seconds to get the best score!"
          })]
        })]
      })]
    })
  });
}
var hf = {
  exports: {}
};
function fd(e) {
  throw new Error("Could not dynamically require \"" + e + "\". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.");
}
var Ao = {
  exports: {}
};
const xd = {};
const dd = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: xd
}, Symbol.toStringTag, {
  value: "Module"
}));
const pd = Lf(dd);
var ha;
function K() {
  if (!ha) {
    ha = 1;
    (function (e, t) {
      (function (r, n) {
        e.exports = n();
      })($, function () {
        var r = r || function (n, o) {
          var l;
          if (typeof window !== "undefined" && window.crypto) {
            l = window.crypto;
          }
          if (typeof self !== "undefined" && self.crypto) {
            l = self.crypto;
          }
          if (typeof globalThis !== "undefined" && globalThis.crypto) {
            l = globalThis.crypto;
          }
          if (!l && typeof window !== "undefined" && window.msCrypto) {
            l = window.msCrypto;
          }
          if (!l && typeof $ !== "undefined" && $.crypto) {
            l = $.crypto;
          }
          if (!l && typeof fd == "function") {
            try {
              l = pd;
            } catch {}
          }
          function i() {
            if (l) {
              if (typeof l.getRandomValues == "function") {
                try {
                  return l.getRandomValues(new Uint32Array(1))[0];
                } catch {}
              }
              if (typeof l.randomBytes == "function") {
                try {
                  return l.randomBytes(4).readInt32LE();
                } catch {}
              }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          }
          var a = Object.create || function () {
            function s() {}
            return function (f) {
              var v;
              s.prototype = f;
              v = new s();
              s.prototype = null;
              return v;
            };
          }();
          var c = {};
          var u = c.lib = {};
          var d = u.Base = function () {
            return {
              extend: function (s) {
                var f = a(this);
                if (s) {
                  f.mixIn(s);
                }
                if (!f.hasOwnProperty("init") || this.init === f.init) {
                  f.init = function () {
                    f.$super.init.apply(this, arguments);
                  };
                }
                f.init.prototype = f;
                f.$super = this;
                return f;
              },
              create: function () {
                var s = this.extend();
                s.init.apply(s, arguments);
                return s;
              },
              init: function () {},
              mixIn: function (s) {
                for (var f in s) {
                  if (s.hasOwnProperty(f)) {
                    this[f] = s[f];
                  }
                }
                if (s.hasOwnProperty("toString")) {
                  this.toString = s.toString;
                }
              },
              clone: function () {
                return this.init.prototype.extend(this);
              }
            };
          }();
          var y = u.WordArray = d.extend({
            init: function (s, f) {
              s = this.words = s || [];
              if (f != o) {
                this.sigBytes = f;
              } else {
                this.sigBytes = s.length * 4;
              }
            },
            toString: function (s) {
              return (s || m).stringify(this);
            },
            concat: function (s) {
              var f = this.words;
              var v = s.words;
              var C = this.sigBytes;
              var B = s.sigBytes;
              this.clamp();
              if (C % 4) {
                for (var w = 0; w < B; w++) {
                  var A = v[w >>> 2] >>> 24 - w % 4 * 8 & 255;
                  f[C + w >>> 2] |= A << 24 - (C + w) % 4 * 8;
                }
              } else {
                for (var k = 0; k < B; k += 4) {
                  f[C + k >>> 2] = v[k >>> 2];
                }
              }
              this.sigBytes += B;
              return this;
            },
            clamp: function () {
              var s = this.words;
              var f = this.sigBytes;
              s[f >>> 2] &= 4294967295 << 32 - f % 4 * 8;
              s.length = n.ceil(f / 4);
            },
            clone: function () {
              var s = d.clone.call(this);
              s.words = this.words.slice(0);
              return s;
            },
            random: function (s) {
              var f = [];
              for (var v = 0; v < s; v += 4) {
                f.push(i());
              }
              return new y.init(f, s);
            }
          });
          var x = c.enc = {};
          var m = x.Hex = {
            stringify: function (s) {
              var f = s.words;
              for (var v = s.sigBytes, C = [], B = 0; B < v; B++) {
                var w = f[B >>> 2] >>> 24 - B % 4 * 8 & 255;
                C.push((w >>> 4).toString(16));
                C.push((w & 15).toString(16));
              }
              return C.join("");
            },
            parse: function (s) {
              for (var f = s.length, v = [], C = 0; C < f; C += 2) {
                v[C >>> 3] |= parseInt(s.substr(C, 2), 16) << 24 - C % 8 * 4;
              }
              return new y.init(v, f / 2);
            }
          };
          var h = x.Latin1 = {
            stringify: function (s) {
              var f = s.words;
              for (var v = s.sigBytes, C = [], B = 0; B < v; B++) {
                var w = f[B >>> 2] >>> 24 - B % 4 * 8 & 255;
                C.push(String.fromCharCode(w));
              }
              return C.join("");
            },
            parse: function (s) {
              for (var f = s.length, v = [], C = 0; C < f; C++) {
                v[C >>> 2] |= (s.charCodeAt(C) & 255) << 24 - C % 4 * 8;
              }
              return new y.init(v, f);
            }
          };
          var g = x.Utf8 = {
            stringify: function (s) {
              try {
                return decodeURIComponent(escape(h.stringify(s)));
              } catch {
                throw new Error("Malformed UTF-8 data");
              }
            },
            parse: function (s) {
              return h.parse(unescape(encodeURIComponent(s)));
            }
          };
          var E = u.BufferedBlockAlgorithm = d.extend({
            reset: function () {
              this._data = new y.init();
              this._nDataBytes = 0;
            },
            _append: function (s) {
              if (typeof s == "string") {
                s = g.parse(s);
              }
              this._data.concat(s);
              this._nDataBytes += s.sigBytes;
            },
            _process: function (s) {
              var f;
              var v = this._data;
              var C = v.words;
              var B = v.sigBytes;
              var w = this.blockSize;
              var A = w * 4;
              var k = B / A;
              if (s) {
                k = n.ceil(k);
              } else {
                k = n.max((k | 0) - this._minBufferSize, 0);
              }
              var F = k * w;
              var D = n.min(F * 4, B);
              if (F) {
                for (var z = 0; z < F; z += w) {
                  this._doProcessBlock(C, z);
                }
                f = C.splice(0, F);
                v.sigBytes -= D;
              }
              return new y.init(f, D);
            },
            clone: function () {
              var s = d.clone.call(this);
              s._data = this._data.clone();
              return s;
            },
            _minBufferSize: 0
          });
          u.Hasher = E.extend({
            cfg: d.extend(),
            init: function (s) {
              this.cfg = this.cfg.extend(s);
              this.reset();
            },
            reset: function () {
              E.reset.call(this);
              this._doReset();
            },
            update: function (s) {
              this._append(s);
              this._process();
              return this;
            },
            finalize: function (s) {
              if (s) {
                this._append(s);
              }
              var f = this._doFinalize();
              return f;
            },
            blockSize: 16,
            _createHelper: function (s) {
              return function (f, v) {
                return new s.init(v).finalize(f);
              };
            },
            _createHmacHelper: function (s) {
              return function (f, v) {
                return new p.HMAC.init(s, v).finalize(f);
              };
            }
          });
          var p = c.algo = {};
          return c;
        }(Math);
        return r;
      });
    })(Ao);
  }
  return Ao.exports;
}
var Do = {
  exports: {}
};
var ma;
function X0() {
  if (!ma) {
    ma = 1;
    (function (e, t) {
      (function (r, n) {
        e.exports = n(K());
      })($, function (r) {
        (function (n) {
          var o = r;
          var l = o.lib;
          var i = l.Base;
          var a = l.WordArray;
          var c = o.x64 = {};
          c.Word = i.extend({
            init: function (u, d) {
              this.high = u;
              this.low = d;
            }
          });
          c.WordArray = i.extend({
            init: function (u, d) {
              u = this.words = u || [];
              if (d != n) {
                this.sigBytes = d;
              } else {
                this.sigBytes = u.length * 8;
              }
            },
            toX32: function () {
              var u = this.words;
              for (var d = u.length, y = [], x = 0; x < d; x++) {
                var m = u[x];
                y.push(m.high);
                y.push(m.low);
              }
              return a.create(y, this.sigBytes);
            },
            clone: function () {
              var u = i.clone.call(this);
              var d = u.words = this.words.slice(0);
              for (var y = d.length, x = 0; x < y; x++) {
                d[x] = d[x].clone();
              }
              return u;
            }
          });
        })();
        return r;
      });
    })(Do);
  }
  return Do.exports;
}
var _o = {
  exports: {}
};
var ya;
function vd() {
  if (!ya) {
    ya = 1;
    (function (e, t) {
      (function (r, n) {
        e.exports = n(K());
      })($, function (r) {
        (function () {
          if (typeof ArrayBuffer == "function") {
            var n = r;
            var o = n.lib;
            var l = o.WordArray;
            var i = l.init;
            var a = l.init = function (c) {
              if (c instanceof ArrayBuffer) {
                c = new Uint8Array(c);
              }
              if (c instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && c instanceof Uint8ClampedArray || c instanceof Int16Array || c instanceof Uint16Array || c instanceof Int32Array || c instanceof Uint32Array || c instanceof Float32Array || c instanceof Float64Array) {
                c = new Uint8Array(c.buffer, c.byteOffset, c.byteLength);
              }
              if (c instanceof Uint8Array) {
                for (var u = c.byteLength, d = [], y = 0; y < u; y++) {
                  d[y >>> 2] |= c[y] << 24 - y % 4 * 8;
                }
                i.call(this, d, u);
              } else {
                i.apply(this, arguments);
              }
            };
            a.prototype = l;
          }
        })();
        return r.lib.WordArray;
      });
    })(_o);
  }
  return _o.exports;
}
var ko = {
  exports: {}
};
var ga;
function hd() {
  if (!ga) {
    ga = 1;
    (function (e, t) {
      (function (r, n) {
        e.exports = n(K());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.WordArray;
          var i = n.enc;
          i.Utf16 = i.Utf16BE = {
            stringify: function (c) {
              var u = c.words;
              for (var d = c.sigBytes, y = [], x = 0; x < d; x += 2) {
                var m = u[x >>> 2] >>> 16 - x % 4 * 8 & 65535;
                y.push(String.fromCharCode(m));
              }
              return y.join("");
            },
            parse: function (c) {
              for (var u = c.length, d = [], y = 0; y < u; y++) {
                d[y >>> 1] |= c.charCodeAt(y) << 16 - y % 2 * 16;
              }
              return l.create(d, u * 2);
            }
          };
          i.Utf16LE = {
            stringify: function (c) {
              var u = c.words;
              for (var d = c.sigBytes, y = [], x = 0; x < d; x += 2) {
                var m = a(u[x >>> 2] >>> 16 - x % 4 * 8 & 65535);
                y.push(String.fromCharCode(m));
              }
              return y.join("");
            },
            parse: function (c) {
              for (var u = c.length, d = [], y = 0; y < u; y++) {
                d[y >>> 1] |= a(c.charCodeAt(y) << 16 - y % 2 * 16);
              }
              return l.create(d, u * 2);
            }
          };
          function a(c) {
            return c << 8 & 4278255360 | c >>> 8 & 16711935;
          }
        })();
        return r.enc.Utf16;
      });
    })(ko);
  }
  return ko.exports;
}
var So = {
  exports: {}
};
var Ea;
function er() {
  if (!Ea) {
    Ea = 1;
    (function (e, t) {
      (function (r, n) {
        e.exports = n(K());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.WordArray;
          var i = n.enc;
          i.Base64 = {
            stringify: function (c) {
              var u = c.words;
              var d = c.sigBytes;
              var y = this._map;
              c.clamp();
              var x = [];
              for (var m = 0; m < d; m += 3) {
                var h = u[m >>> 2] >>> 24 - m % 4 * 8 & 255;
                var g = u[m + 1 >>> 2] >>> 24 - (m + 1) % 4 * 8 & 255;
                var E = u[m + 2 >>> 2] >>> 24 - (m + 2) % 4 * 8 & 255;
                var p = h << 16 | g << 8 | E;
                for (var s = 0; s < 4 && m + s * 0.75 < d; s++) {
                  x.push(y.charAt(p >>> (3 - s) * 6 & 63));
                }
              }
              var f = y.charAt(64);
              if (f) {
                while (x.length % 4) {
                  x.push(f);
                }
              }
              return x.join("");
            },
            parse: function (c) {
              var u = c.length;
              var d = this._map;
              var y = this._reverseMap;
              if (!y) {
                y = this._reverseMap = [];
                for (var x = 0; x < d.length; x++) {
                  y[d.charCodeAt(x)] = x;
                }
              }
              var m = d.charAt(64);
              if (m) {
                var h = c.indexOf(m);
                if (h !== -1) {
                  u = h;
                }
              }
              return a(c, u, y);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
          };
          function a(c, u, d) {
            var y = [];
            var x = 0;
            for (var m = 0; m < u; m++) {
              if (m % 4) {
                var h = d[c.charCodeAt(m - 1)] << m % 4 * 2;
                var g = d[c.charCodeAt(m)] >>> 6 - m % 4 * 2;
                var E = h | g;
                y[x >>> 2] |= E << 24 - x % 4 * 8;
                x++;
              }
            }
            return l.create(y, x);
          }
        })();
        return r.enc.Base64;
      });
    })(So);
  }
  return So.exports;
}
var zo = {
  exports: {}
};
var Ca;
function md() {
  if (!Ca) {
    Ca = 1;
    (function (e, t) {
      (function (r, n) {
        e.exports = n(K());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.WordArray;
          var i = n.enc;
          i.Base64url = {
            stringify: function (c, u = true) {
              var d = c.words;
              var y = c.sigBytes;
              var x = u ? this._safe_map : this._map;
              c.clamp();
              var m = [];
              for (var h = 0; h < y; h += 3) {
                var g = d[h >>> 2] >>> 24 - h % 4 * 8 & 255;
                var E = d[h + 1 >>> 2] >>> 24 - (h + 1) % 4 * 8 & 255;
                var p = d[h + 2 >>> 2] >>> 24 - (h + 2) % 4 * 8 & 255;
                var s = g << 16 | E << 8 | p;
                for (var f = 0; f < 4 && h + f * 0.75 < y; f++) {
                  m.push(x.charAt(s >>> (3 - f) * 6 & 63));
                }
              }
              var v = x.charAt(64);
              if (v) {
                while (m.length % 4) {
                  m.push(v);
                }
              }
              return m.join("");
            },
            parse: function (c, u = true) {
              var d = c.length;
              var y = u ? this._safe_map : this._map;
              var x = this._reverseMap;
              if (!x) {
                x = this._reverseMap = [];
                for (var m = 0; m < y.length; m++) {
                  x[y.charCodeAt(m)] = m;
                }
              }
              var h = y.charAt(64);
              if (h) {
                var g = c.indexOf(h);
                if (g !== -1) {
                  d = g;
                }
              }
              return a(c, d, x);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
          };
          function a(c, u, d) {
            var y = [];
            var x = 0;
            for (var m = 0; m < u; m++) {
              if (m % 4) {
                var h = d[c.charCodeAt(m - 1)] << m % 4 * 2;
                var g = d[c.charCodeAt(m)] >>> 6 - m % 4 * 2;
                var E = h | g;
                y[x >>> 2] |= E << 24 - x % 4 * 8;
                x++;
              }
            }
            return l.create(y, x);
          }
        })();
        return r.enc.Base64url;
      });
    })(zo);
  }
  return zo.exports;
}
var Po = {
  exports: {}
};
var Ba;
function tr() {
  if (!Ba) {
    Ba = 1;
    (function (e, t) {
      (function (r, n) {
        e.exports = n(K());
      })($, function (r) {
        (function (n) {
          var o = r;
          var l = o.lib;
          var i = l.WordArray;
          var a = l.Hasher;
          var c = o.algo;
          var u = [];
          (function () {
            for (var g = 0; g < 64; g++) {
              u[g] = n.abs(n.sin(g + 1)) * 4294967296 | 0;
            }
          })();
          var d = c.MD5 = a.extend({
            _doReset: function () {
              this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878]);
            },
            _doProcessBlock: function (g, E) {
              for (var p = 0; p < 16; p++) {
                var s = E + p;
                var f = g[s];
                g[s] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
              }
              var v = this._hash.words;
              var C = g[E + 0];
              var B = g[E + 1];
              var w = g[E + 2];
              var A = g[E + 3];
              var k = g[E + 4];
              var F = g[E + 5];
              var D = g[E + 6];
              var z = g[E + 7];
              var P = g[E + 8];
              var I = g[E + 9];
              var M = g[E + 10];
              var W = g[E + 11];
              var X = g[E + 12];
              var L = g[E + 13];
              var H = g[E + 14];
              var O = g[E + 15];
              var _ = v[0];
              var S = v[1];
              var R = v[2];
              var N = v[3];
              _ = y(_, S, R, N, C, 7, u[0]);
              N = y(N, _, S, R, B, 12, u[1]);
              R = y(R, N, _, S, w, 17, u[2]);
              S = y(S, R, N, _, A, 22, u[3]);
              _ = y(_, S, R, N, k, 7, u[4]);
              N = y(N, _, S, R, F, 12, u[5]);
              R = y(R, N, _, S, D, 17, u[6]);
              S = y(S, R, N, _, z, 22, u[7]);
              _ = y(_, S, R, N, P, 7, u[8]);
              N = y(N, _, S, R, I, 12, u[9]);
              R = y(R, N, _, S, M, 17, u[10]);
              S = y(S, R, N, _, W, 22, u[11]);
              _ = y(_, S, R, N, X, 7, u[12]);
              N = y(N, _, S, R, L, 12, u[13]);
              R = y(R, N, _, S, H, 17, u[14]);
              S = y(S, R, N, _, O, 22, u[15]);
              _ = x(_, S, R, N, B, 5, u[16]);
              N = x(N, _, S, R, D, 9, u[17]);
              R = x(R, N, _, S, W, 14, u[18]);
              S = x(S, R, N, _, C, 20, u[19]);
              _ = x(_, S, R, N, F, 5, u[20]);
              N = x(N, _, S, R, M, 9, u[21]);
              R = x(R, N, _, S, O, 14, u[22]);
              S = x(S, R, N, _, k, 20, u[23]);
              _ = x(_, S, R, N, I, 5, u[24]);
              N = x(N, _, S, R, H, 9, u[25]);
              R = x(R, N, _, S, A, 14, u[26]);
              S = x(S, R, N, _, P, 20, u[27]);
              _ = x(_, S, R, N, L, 5, u[28]);
              N = x(N, _, S, R, w, 9, u[29]);
              R = x(R, N, _, S, z, 14, u[30]);
              S = x(S, R, N, _, X, 20, u[31]);
              _ = m(_, S, R, N, F, 4, u[32]);
              N = m(N, _, S, R, P, 11, u[33]);
              R = m(R, N, _, S, W, 16, u[34]);
              S = m(S, R, N, _, H, 23, u[35]);
              _ = m(_, S, R, N, B, 4, u[36]);
              N = m(N, _, S, R, k, 11, u[37]);
              R = m(R, N, _, S, z, 16, u[38]);
              S = m(S, R, N, _, M, 23, u[39]);
              _ = m(_, S, R, N, L, 4, u[40]);
              N = m(N, _, S, R, C, 11, u[41]);
              R = m(R, N, _, S, A, 16, u[42]);
              S = m(S, R, N, _, D, 23, u[43]);
              _ = m(_, S, R, N, I, 4, u[44]);
              N = m(N, _, S, R, X, 11, u[45]);
              R = m(R, N, _, S, O, 16, u[46]);
              S = m(S, R, N, _, w, 23, u[47]);
              _ = h(_, S, R, N, C, 6, u[48]);
              N = h(N, _, S, R, z, 10, u[49]);
              R = h(R, N, _, S, H, 15, u[50]);
              S = h(S, R, N, _, F, 21, u[51]);
              _ = h(_, S, R, N, X, 6, u[52]);
              N = h(N, _, S, R, A, 10, u[53]);
              R = h(R, N, _, S, M, 15, u[54]);
              S = h(S, R, N, _, B, 21, u[55]);
              _ = h(_, S, R, N, P, 6, u[56]);
              N = h(N, _, S, R, O, 10, u[57]);
              R = h(R, N, _, S, D, 15, u[58]);
              S = h(S, R, N, _, L, 21, u[59]);
              _ = h(_, S, R, N, k, 6, u[60]);
              N = h(N, _, S, R, W, 10, u[61]);
              R = h(R, N, _, S, w, 15, u[62]);
              S = h(S, R, N, _, I, 21, u[63]);
              v[0] = v[0] + _ | 0;
              v[1] = v[1] + S | 0;
              v[2] = v[2] + R | 0;
              v[3] = v[3] + N | 0;
            },
            _doFinalize: function () {
              var g = this._data;
              var E = g.words;
              var p = this._nDataBytes * 8;
              var s = g.sigBytes * 8;
              E[s >>> 5] |= 128 << 24 - s % 32;
              var f = n.floor(p / 4294967296);
              var v = p;
              E[(s + 64 >>> 9 << 4) + 15] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
              E[(s + 64 >>> 9 << 4) + 14] = (v << 8 | v >>> 24) & 16711935 | (v << 24 | v >>> 8) & 4278255360;
              g.sigBytes = (E.length + 1) * 4;
              this._process();
              var C = this._hash;
              var B = C.words;
              for (var w = 0; w < 4; w++) {
                var A = B[w];
                B[w] = (A << 8 | A >>> 24) & 16711935 | (A << 24 | A >>> 8) & 4278255360;
              }
              return C;
            },
            clone: function () {
              var g = a.clone.call(this);
              g._hash = this._hash.clone();
              return g;
            }
          });
          function y(g, E, p, s, f, v, C) {
            var B = g + (E & p | ~E & s) + f + C;
            return (B << v | B >>> 32 - v) + E;
          }
          function x(g, E, p, s, f, v, C) {
            var B = g + (E & s | p & ~s) + f + C;
            return (B << v | B >>> 32 - v) + E;
          }
          function m(g, E, p, s, f, v, C) {
            var B = g + (E ^ p ^ s) + f + C;
            return (B << v | B >>> 32 - v) + E;
          }
          function h(g, E, p, s, f, v, C) {
            var B = g + (p ^ (E | ~s)) + f + C;
            return (B << v | B >>> 32 - v) + E;
          }
          o.MD5 = a._createHelper(d);
          o.HmacMD5 = a._createHmacHelper(d);
        })(Math);
        return r.MD5;
      });
    })(Po);
  }
  return Po.exports;
}
var No = {
  exports: {}
};
var wa;
function mf() {
  if (!wa) {
    wa = 1;
    (function (e, t) {
      (function (r, n) {
        e.exports = n(K());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.WordArray;
          var i = o.Hasher;
          var a = n.algo;
          var c = [];
          var u = a.SHA1 = i.extend({
            _doReset: function () {
              this._hash = new l.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            },
            _doProcessBlock: function (d, y) {
              var x = this._hash.words;
              var m = x[0];
              var h = x[1];
              var g = x[2];
              var E = x[3];
              var p = x[4];
              for (var s = 0; s < 80; s++) {
                if (s < 16) {
                  c[s] = d[y + s] | 0;
                } else {
                  var f = c[s - 3] ^ c[s - 8] ^ c[s - 14] ^ c[s - 16];
                  c[s] = f << 1 | f >>> 31;
                }
                var v = (m << 5 | m >>> 27) + p + c[s];
                if (s < 20) {
                  v += (h & g | ~h & E) + 1518500249;
                } else if (s < 40) {
                  v += (h ^ g ^ E) + 1859775393;
                } else if (s < 60) {
                  v += (h & g | h & E | g & E) - 1894007588;
                } else {
                  v += (h ^ g ^ E) - 899497514;
                }
                p = E;
                E = g;
                g = h << 30 | h >>> 2;
                h = m;
                m = v;
              }
              x[0] = x[0] + m | 0;
              x[1] = x[1] + h | 0;
              x[2] = x[2] + g | 0;
              x[3] = x[3] + E | 0;
              x[4] = x[4] + p | 0;
            },
            _doFinalize: function () {
              var d = this._data;
              var y = d.words;
              var x = this._nDataBytes * 8;
              var m = d.sigBytes * 8;
              y[m >>> 5] |= 128 << 24 - m % 32;
              y[(m + 64 >>> 9 << 4) + 14] = Math.floor(x / 4294967296);
              y[(m + 64 >>> 9 << 4) + 15] = x;
              d.sigBytes = y.length * 4;
              this._process();
              return this._hash;
            },
            clone: function () {
              var d = i.clone.call(this);
              d._hash = this._hash.clone();
              return d;
            }
          });
          n.SHA1 = i._createHelper(u);
          n.HmacSHA1 = i._createHmacHelper(u);
        })();
        return r.SHA1;
      });
    })(No);
  }
  return No.exports;
}
var Ro = {
  exports: {}
};
var Fa;
function qi() {
  if (!Fa) {
    Fa = 1;
    (function (e, t) {
      (function (r, n) {
        e.exports = n(K());
      })($, function (r) {
        (function (n) {
          var o = r;
          var l = o.lib;
          var i = l.WordArray;
          var a = l.Hasher;
          var c = o.algo;
          var u = [];
          var d = [];
          (function () {
            function m(p) {
              for (var s = n.sqrt(p), f = 2; f <= s; f++) {
                if (!(p % f)) {
                  return false;
                }
              }
              return true;
            }
            function h(p) {
              return (p - (p | 0)) * 4294967296 | 0;
            }
            var g = 2;
            for (var E = 0; E < 64;) {
              if (m(g)) {
                if (E < 8) {
                  u[E] = h(n.pow(g, 1 / 2));
                }
                d[E] = h(n.pow(g, 1 / 3));
                E++;
              }
              g++;
            }
          })();
          var y = [];
          var x = c.SHA256 = a.extend({
            _doReset: function () {
              this._hash = new i.init(u.slice(0));
            },
            _doProcessBlock: function (m, h) {
              var g = this._hash.words;
              var E = g[0];
              var p = g[1];
              var s = g[2];
              var f = g[3];
              var v = g[4];
              var C = g[5];
              var B = g[6];
              var w = g[7];
              for (var A = 0; A < 64; A++) {
                if (A < 16) {
                  y[A] = m[h + A] | 0;
                } else {
                  var k = y[A - 15];
                  var F = (k << 25 | k >>> 7) ^ (k << 14 | k >>> 18) ^ k >>> 3;
                  var D = y[A - 2];
                  var z = (D << 15 | D >>> 17) ^ (D << 13 | D >>> 19) ^ D >>> 10;
                  y[A] = F + y[A - 7] + z + y[A - 16];
                }
                var P = v & C ^ ~v & B;
                var I = E & p ^ E & s ^ p & s;
                var M = (E << 30 | E >>> 2) ^ (E << 19 | E >>> 13) ^ (E << 10 | E >>> 22);
                var W = (v << 26 | v >>> 6) ^ (v << 21 | v >>> 11) ^ (v << 7 | v >>> 25);
                var X = w + W + P + d[A] + y[A];
                var L = M + I;
                w = B;
                B = C;
                C = v;
                v = f + X | 0;
                f = s;
                s = p;
                p = E;
                E = X + L | 0;
              }
              g[0] = g[0] + E | 0;
              g[1] = g[1] + p | 0;
              g[2] = g[2] + s | 0;
              g[3] = g[3] + f | 0;
              g[4] = g[4] + v | 0;
              g[5] = g[5] + C | 0;
              g[6] = g[6] + B | 0;
              g[7] = g[7] + w | 0;
            },
            _doFinalize: function () {
              var m = this._data;
              var h = m.words;
              var g = this._nDataBytes * 8;
              var E = m.sigBytes * 8;
              h[E >>> 5] |= 128 << 24 - E % 32;
              h[(E + 64 >>> 9 << 4) + 14] = n.floor(g / 4294967296);
              h[(E + 64 >>> 9 << 4) + 15] = g;
              m.sigBytes = h.length * 4;
              this._process();
              return this._hash;
            },
            clone: function () {
              var m = a.clone.call(this);
              m._hash = this._hash.clone();
              return m;
            }
          });
          o.SHA256 = a._createHelper(x);
          o.HmacSHA256 = a._createHmacHelper(x);
        })(Math);
        return r.SHA256;
      });
    })(Ro);
  }
  return Ro.exports;
}
var Lo = {
  exports: {}
};
var Aa;
function yd() {
  if (!Aa) {
    Aa = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), qi());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.WordArray;
          var i = n.algo;
          var a = i.SHA256;
          var c = i.SHA224 = a.extend({
            _doReset: function () {
              this._hash = new l.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
            },
            _doFinalize: function () {
              var u = a._doFinalize.call(this);
              u.sigBytes -= 4;
              return u;
            }
          });
          n.SHA224 = a._createHelper(c);
          n.HmacSHA224 = a._createHmacHelper(c);
        })();
        return r.SHA224;
      });
    })(Lo);
  }
  return Lo.exports;
}
var To = {
  exports: {}
};
var Da;
function yf() {
  if (!Da) {
    Da = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), X0());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.Hasher;
          var i = n.x64;
          var a = i.Word;
          var c = i.WordArray;
          var u = n.algo;
          function d() {
            return a.create.apply(a, arguments);
          }
          var y = [d(1116352408, 3609767458), d(1899447441, 602891725), d(3049323471, 3964484399), d(3921009573, 2173295548), d(961987163, 4081628472), d(1508970993, 3053834265), d(2453635748, 2937671579), d(2870763221, 3664609560), d(3624381080, 2734883394), d(310598401, 1164996542), d(607225278, 1323610764), d(1426881987, 3590304994), d(1925078388, 4068182383), d(2162078206, 991336113), d(2614888103, 633803317), d(3248222580, 3479774868), d(3835390401, 2666613458), d(4022224774, 944711139), d(264347078, 2341262773), d(604807628, 2007800933), d(770255983, 1495990901), d(1249150122, 1856431235), d(1555081692, 3175218132), d(1996064986, 2198950837), d(2554220882, 3999719339), d(2821834349, 766784016), d(2952996808, 2566594879), d(3210313671, 3203337956), d(3336571891, 1034457026), d(3584528711, 2466948901), d(113926993, 3758326383), d(338241895, 168717936), d(666307205, 1188179964), d(773529912, 1546045734), d(1294757372, 1522805485), d(1396182291, 2643833823), d(1695183700, 2343527390), d(1986661051, 1014477480), d(2177026350, 1206759142), d(2456956037, 344077627), d(2730485921, 1290863460), d(2820302411, 3158454273), d(3259730800, 3505952657), d(3345764771, 106217008), d(3516065817, 3606008344), d(3600352804, 1432725776), d(4094571909, 1467031594), d(275423344, 851169720), d(430227734, 3100823752), d(506948616, 1363258195), d(659060556, 3750685593), d(883997877, 3785050280), d(958139571, 3318307427), d(1322822218, 3812723403), d(1537002063, 2003034995), d(1747873779, 3602036899), d(1955562222, 1575990012), d(2024104815, 1125592928), d(2227730452, 2716904306), d(2361852424, 442776044), d(2428436474, 593698344), d(2756734187, 3733110249), d(3204031479, 2999351573), d(3329325298, 3815920427), d(3391569614, 3928383900), d(3515267271, 566280711), d(3940187606, 3454069534), d(4118630271, 4000239992), d(116418474, 1914138554), d(174292421, 2731055270), d(289380356, 3203993006), d(460393269, 320620315), d(685471733, 587496836), d(852142971, 1086792851), d(1017036298, 365543100), d(1126000580, 2618297676), d(1288033470, 3409855158), d(1501505948, 4234509866), d(1607167915, 987167468), d(1816402316, 1246189591)];
          var x = [];
          (function () {
            for (var h = 0; h < 80; h++) {
              x[h] = d();
            }
          })();
          var m = u.SHA512 = l.extend({
            _doReset: function () {
              this._hash = new c.init([new a.init(1779033703, 4089235720), new a.init(3144134277, 2227873595), new a.init(1013904242, 4271175723), new a.init(2773480762, 1595750129), new a.init(1359893119, 2917565137), new a.init(2600822924, 725511199), new a.init(528734635, 4215389547), new a.init(1541459225, 327033209)]);
            },
            _doProcessBlock: function (h, g) {
              var E = this._hash.words;
              var p = E[0];
              var s = E[1];
              var f = E[2];
              var v = E[3];
              var C = E[4];
              var B = E[5];
              var w = E[6];
              var A = E[7];
              var k = p.high;
              var F = p.low;
              var D = s.high;
              var z = s.low;
              var P = f.high;
              var I = f.low;
              var M = v.high;
              var W = v.low;
              var X = C.high;
              var L = C.low;
              var H = B.high;
              var O = B.low;
              var _ = w.high;
              var S = w.low;
              var R = A.high;
              var N = A.low;
              var J = k;
              var q = F;
              var se = D;
              var V = z;
              var Lr = P;
              var rr = I;
              var Y0 = M;
              var Tr = W;
              var Ke = X;
              var Pe = L;
              var Pn = H;
              var Hr = O;
              var Nn = _;
              var Or = S;
              var Z0 = R;
              var jr = N;
              for (var qe = 0; qe < 80; qe++) {
                var Ie;
                var ht;
                var Rn = x[qe];
                if (qe < 16) {
                  ht = Rn.high = h[g + qe * 2] | 0;
                  Ie = Rn.low = h[g + qe * 2 + 1] | 0;
                } else {
                  var Xi = x[qe - 15];
                  var nr = Xi.high;
                  var Ir = Xi.low;
                  var Ef = (nr >>> 1 | Ir << 31) ^ (nr >>> 8 | Ir << 24) ^ nr >>> 7;
                  var Yi = (Ir >>> 1 | nr << 31) ^ (Ir >>> 8 | nr << 24) ^ (Ir >>> 7 | nr << 25);
                  var Zi = x[qe - 2];
                  var or = Zi.high;
                  var Mr = Zi.low;
                  var Cf = (or >>> 19 | Mr << 13) ^ (or << 3 | Mr >>> 29) ^ or >>> 6;
                  var Ji = (Mr >>> 19 | or << 13) ^ (Mr << 3 | or >>> 29) ^ (Mr >>> 6 | or << 26);
                  var bi = x[qe - 7];
                  var Bf = bi.high;
                  var wf = bi.low;
                  var eu = x[qe - 16];
                  var Ff = eu.high;
                  var tu = eu.low;
                  Ie = Yi + wf;
                  ht = Ef + Bf + (Ie >>> 0 < Yi >>> 0 ? 1 : 0);
                  Ie = Ie + Ji;
                  ht = ht + Cf + (Ie >>> 0 < Ji >>> 0 ? 1 : 0);
                  Ie = Ie + tu;
                  ht = ht + Ff + (Ie >>> 0 < tu >>> 0 ? 1 : 0);
                  Rn.high = ht;
                  Rn.low = Ie;
                }
                var Af = Ke & Pn ^ ~Ke & Nn;
                var ru = Pe & Hr ^ ~Pe & Or;
                var Df = J & se ^ J & Lr ^ se & Lr;
                var _f = q & V ^ q & rr ^ V & rr;
                var kf = (J >>> 28 | q << 4) ^ (J << 30 | q >>> 2) ^ (J << 25 | q >>> 7);
                var nu = (q >>> 28 | J << 4) ^ (q << 30 | J >>> 2) ^ (q << 25 | J >>> 7);
                var Sf = (Ke >>> 14 | Pe << 18) ^ (Ke >>> 18 | Pe << 14) ^ (Ke << 23 | Pe >>> 9);
                var zf = (Pe >>> 14 | Ke << 18) ^ (Pe >>> 18 | Ke << 14) ^ (Pe << 23 | Ke >>> 9);
                var ou = y[qe];
                var Pf = ou.high;
                var lu = ou.low;
                var Ne = jr + zf;
                var mt = Z0 + Sf + (Ne >>> 0 < jr >>> 0 ? 1 : 0);
                var Ne = Ne + ru;
                var mt = mt + Af + (Ne >>> 0 < ru >>> 0 ? 1 : 0);
                var Ne = Ne + lu;
                var mt = mt + Pf + (Ne >>> 0 < lu >>> 0 ? 1 : 0);
                var Ne = Ne + Ie;
                var mt = mt + ht + (Ne >>> 0 < Ie >>> 0 ? 1 : 0);
                var iu = nu + _f;
                var Nf = kf + Df + (iu >>> 0 < nu >>> 0 ? 1 : 0);
                Z0 = Nn;
                jr = Or;
                Nn = Pn;
                Or = Hr;
                Pn = Ke;
                Hr = Pe;
                Pe = Tr + Ne | 0;
                Ke = Y0 + mt + (Pe >>> 0 < Tr >>> 0 ? 1 : 0) | 0;
                Y0 = Lr;
                Tr = rr;
                Lr = se;
                rr = V;
                se = J;
                V = q;
                q = Ne + iu | 0;
                J = mt + Nf + (q >>> 0 < Ne >>> 0 ? 1 : 0) | 0;
              }
              F = p.low = F + q;
              p.high = k + J + (F >>> 0 < q >>> 0 ? 1 : 0);
              z = s.low = z + V;
              s.high = D + se + (z >>> 0 < V >>> 0 ? 1 : 0);
              I = f.low = I + rr;
              f.high = P + Lr + (I >>> 0 < rr >>> 0 ? 1 : 0);
              W = v.low = W + Tr;
              v.high = M + Y0 + (W >>> 0 < Tr >>> 0 ? 1 : 0);
              L = C.low = L + Pe;
              C.high = X + Ke + (L >>> 0 < Pe >>> 0 ? 1 : 0);
              O = B.low = O + Hr;
              B.high = H + Pn + (O >>> 0 < Hr >>> 0 ? 1 : 0);
              S = w.low = S + Or;
              w.high = _ + Nn + (S >>> 0 < Or >>> 0 ? 1 : 0);
              N = A.low = N + jr;
              A.high = R + Z0 + (N >>> 0 < jr >>> 0 ? 1 : 0);
            },
            _doFinalize: function () {
              var h = this._data;
              var g = h.words;
              var E = this._nDataBytes * 8;
              var p = h.sigBytes * 8;
              g[p >>> 5] |= 128 << 24 - p % 32;
              g[(p + 128 >>> 10 << 5) + 30] = Math.floor(E / 4294967296);
              g[(p + 128 >>> 10 << 5) + 31] = E;
              h.sigBytes = g.length * 4;
              this._process();
              var s = this._hash.toX32();
              return s;
            },
            clone: function () {
              var h = l.clone.call(this);
              h._hash = this._hash.clone();
              return h;
            },
            blockSize: 32
          });
          n.SHA512 = l._createHelper(m);
          n.HmacSHA512 = l._createHmacHelper(m);
        })();
        return r.SHA512;
      });
    })(To);
  }
  return To.exports;
}
var Ho = {
  exports: {}
};
var _a;
function gd() {
  if (!_a) {
    _a = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), X0(), yf());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.x64;
          var l = o.Word;
          var i = o.WordArray;
          var a = n.algo;
          var c = a.SHA512;
          var u = a.SHA384 = c.extend({
            _doReset: function () {
              this._hash = new i.init([new l.init(3418070365, 3238371032), new l.init(1654270250, 914150663), new l.init(2438529370, 812702999), new l.init(355462360, 4144912697), new l.init(1731405415, 4290775857), new l.init(2394180231, 1750603025), new l.init(3675008525, 1694076839), new l.init(1203062813, 3204075428)]);
            },
            _doFinalize: function () {
              var d = c._doFinalize.call(this);
              d.sigBytes -= 16;
              return d;
            }
          });
          n.SHA384 = c._createHelper(u);
          n.HmacSHA384 = c._createHmacHelper(u);
        })();
        return r.SHA384;
      });
    })(Ho);
  }
  return Ho.exports;
}
var Oo = {
  exports: {}
};
var ka;
function Ed() {
  if (!ka) {
    ka = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), X0());
      })($, function (r) {
        (function (n) {
          var o = r;
          var l = o.lib;
          var i = l.WordArray;
          var a = l.Hasher;
          var c = o.x64;
          var u = c.Word;
          var d = o.algo;
          var y = [];
          var x = [];
          var m = [];
          (function () {
            var E = 1;
            var p = 0;
            for (var s = 0; s < 24; s++) {
              y[E + p * 5] = (s + 1) * (s + 2) / 2 % 64;
              var f = p % 5;
              var v = (E * 2 + p * 3) % 5;
              E = f;
              p = v;
            }
            for (var E = 0; E < 5; E++) {
              for (var p = 0; p < 5; p++) {
                x[E + p * 5] = p + (E * 2 + p * 3) % 5 * 5;
              }
            }
            var C = 1;
            for (var B = 0; B < 24; B++) {
              var w = 0;
              var A = 0;
              for (var k = 0; k < 7; k++) {
                if (C & 1) {
                  var F = (1 << k) - 1;
                  if (F < 32) {
                    A ^= 1 << F;
                  } else {
                    w ^= 1 << F - 32;
                  }
                }
                if (C & 128) {
                  C = C << 1 ^ 113;
                } else {
                  C <<= 1;
                }
              }
              m[B] = u.create(w, A);
            }
          })();
          var h = [];
          (function () {
            for (var E = 0; E < 25; E++) {
              h[E] = u.create();
            }
          })();
          var g = d.SHA3 = a.extend({
            cfg: a.cfg.extend({
              outputLength: 512
            }),
            _doReset: function () {
              var E = this._state = [];
              for (var p = 0; p < 25; p++) {
                E[p] = new u.init();
              }
              this.blockSize = (1600 - this.cfg.outputLength * 2) / 32;
            },
            _doProcessBlock: function (E, p) {
              var s = this._state;
              for (var f = this.blockSize / 2, v = 0; v < f; v++) {
                var C = E[p + v * 2];
                var B = E[p + v * 2 + 1];
                C = (C << 8 | C >>> 24) & 16711935 | (C << 24 | C >>> 8) & 4278255360;
                B = (B << 8 | B >>> 24) & 16711935 | (B << 24 | B >>> 8) & 4278255360;
                var w = s[v];
                w.high ^= B;
                w.low ^= C;
              }
              for (var A = 0; A < 24; A++) {
                for (var k = 0; k < 5; k++) {
                  var F = 0;
                  var D = 0;
                  for (var z = 0; z < 5; z++) {
                    var w = s[k + z * 5];
                    F ^= w.high;
                    D ^= w.low;
                  }
                  var P = h[k];
                  P.high = F;
                  P.low = D;
                }
                for (var k = 0; k < 5; k++) {
                  var I = h[(k + 4) % 5];
                  var M = h[(k + 1) % 5];
                  var W = M.high;
                  var X = M.low;
                  var F = I.high ^ (W << 1 | X >>> 31);
                  var D = I.low ^ (X << 1 | W >>> 31);
                  for (var z = 0; z < 5; z++) {
                    var w = s[k + z * 5];
                    w.high ^= F;
                    w.low ^= D;
                  }
                }
                for (var L = 1; L < 25; L++) {
                  var F;
                  var D;
                  var w = s[L];
                  var H = w.high;
                  var O = w.low;
                  var _ = y[L];
                  if (_ < 32) {
                    F = H << _ | O >>> 32 - _;
                    D = O << _ | H >>> 32 - _;
                  } else {
                    F = O << _ - 32 | H >>> 64 - _;
                    D = H << _ - 32 | O >>> 64 - _;
                  }
                  var S = h[x[L]];
                  S.high = F;
                  S.low = D;
                }
                var R = h[0];
                var N = s[0];
                R.high = N.high;
                R.low = N.low;
                for (var k = 0; k < 5; k++) {
                  for (var z = 0; z < 5; z++) {
                    var L = k + z * 5;
                    var w = s[L];
                    var J = h[L];
                    var q = h[(k + 1) % 5 + z * 5];
                    var se = h[(k + 2) % 5 + z * 5];
                    w.high = J.high ^ ~q.high & se.high;
                    w.low = J.low ^ ~q.low & se.low;
                  }
                }
                var w = s[0];
                var V = m[A];
                w.high ^= V.high;
                w.low ^= V.low;
              }
            },
            _doFinalize: function () {
              var E = this._data;
              var p = E.words;
              this._nDataBytes * 8;
              var s = E.sigBytes * 8;
              var f = this.blockSize * 32;
              p[s >>> 5] |= 1 << 24 - s % 32;
              p[(n.ceil((s + 1) / f) * f >>> 5) - 1] |= 128;
              E.sigBytes = p.length * 4;
              this._process();
              var v = this._state;
              var C = this.cfg.outputLength / 8;
              for (var B = C / 8, w = [], A = 0; A < B; A++) {
                var k = v[A];
                var F = k.high;
                var D = k.low;
                F = (F << 8 | F >>> 24) & 16711935 | (F << 24 | F >>> 8) & 4278255360;
                D = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360;
                w.push(D);
                w.push(F);
              }
              return new i.init(w, C);
            },
            clone: function () {
              var E = a.clone.call(this);
              var p = E._state = this._state.slice(0);
              for (var s = 0; s < 25; s++) {
                p[s] = p[s].clone();
              }
              return E;
            }
          });
          o.SHA3 = a._createHelper(g);
          o.HmacSHA3 = a._createHmacHelper(g);
        })(Math);
        return r.SHA3;
      });
    })(Oo);
  }
  return Oo.exports;
}
var jo = {
  exports: {}
};
var Sa;
function Cd() {
  if (!Sa) {
    Sa = 1;
    (function (e, t) {
      (function (r, n) {
        e.exports = n(K());
      })($, function (r) {
        (function (n) {
          var o = r;
          var l = o.lib;
          var i = l.WordArray;
          var a = l.Hasher;
          var c = o.algo;
          var u = i.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
          var d = i.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
          var y = i.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
          var x = i.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);
          var m = i.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
          var h = i.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
          var g = c.RIPEMD160 = a.extend({
            _doReset: function () {
              this._hash = i.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            },
            _doProcessBlock: function (B, w) {
              for (var A = 0; A < 16; A++) {
                var k = w + A;
                var F = B[k];
                B[k] = (F << 8 | F >>> 24) & 16711935 | (F << 24 | F >>> 8) & 4278255360;
              }
              var D = this._hash.words;
              var z = m.words;
              var P = h.words;
              var I = u.words;
              var M = d.words;
              var W = y.words;
              var X = x.words;
              var L;
              var H;
              var O;
              var _;
              var S;
              var R;
              var N;
              var J;
              var q;
              var se;
              R = L = D[0];
              N = H = D[1];
              J = O = D[2];
              q = _ = D[3];
              se = S = D[4];
              var V;
              for (var A = 0; A < 80; A += 1) {
                V = L + B[w + I[A]] | 0;
                if (A < 16) {
                  V += E(H, O, _) + z[0];
                } else if (A < 32) {
                  V += p(H, O, _) + z[1];
                } else if (A < 48) {
                  V += s(H, O, _) + z[2];
                } else if (A < 64) {
                  V += f(H, O, _) + z[3];
                } else {
                  V += v(H, O, _) + z[4];
                }
                V = V | 0;
                V = C(V, W[A]);
                V = V + S | 0;
                L = S;
                S = _;
                _ = C(O, 10);
                O = H;
                H = V;
                V = R + B[w + M[A]] | 0;
                if (A < 16) {
                  V += v(N, J, q) + P[0];
                } else if (A < 32) {
                  V += f(N, J, q) + P[1];
                } else if (A < 48) {
                  V += s(N, J, q) + P[2];
                } else if (A < 64) {
                  V += p(N, J, q) + P[3];
                } else {
                  V += E(N, J, q) + P[4];
                }
                V = V | 0;
                V = C(V, X[A]);
                V = V + se | 0;
                R = se;
                se = q;
                q = C(J, 10);
                J = N;
                N = V;
              }
              V = D[1] + O + q | 0;
              D[1] = D[2] + _ + se | 0;
              D[2] = D[3] + S + R | 0;
              D[3] = D[4] + L + N | 0;
              D[4] = D[0] + H + J | 0;
              D[0] = V;
            },
            _doFinalize: function () {
              var B = this._data;
              var w = B.words;
              var A = this._nDataBytes * 8;
              var k = B.sigBytes * 8;
              w[k >>> 5] |= 128 << 24 - k % 32;
              w[(k + 64 >>> 9 << 4) + 14] = (A << 8 | A >>> 24) & 16711935 | (A << 24 | A >>> 8) & 4278255360;
              B.sigBytes = (w.length + 1) * 4;
              this._process();
              var F = this._hash;
              var D = F.words;
              for (var z = 0; z < 5; z++) {
                var P = D[z];
                D[z] = (P << 8 | P >>> 24) & 16711935 | (P << 24 | P >>> 8) & 4278255360;
              }
              return F;
            },
            clone: function () {
              var B = a.clone.call(this);
              B._hash = this._hash.clone();
              return B;
            }
          });
          function E(B, w, A) {
            return B ^ w ^ A;
          }
          function p(B, w, A) {
            return B & w | ~B & A;
          }
          function s(B, w, A) {
            return (B | ~w) ^ A;
          }
          function f(B, w, A) {
            return B & A | w & ~A;
          }
          function v(B, w, A) {
            return B ^ (w | ~A);
          }
          function C(B, w) {
            return B << w | B >>> 32 - w;
          }
          o.RIPEMD160 = a._createHelper(g);
          o.HmacRIPEMD160 = a._createHmacHelper(g);
        })();
        /** @preserve
        (c) 2012 by Cédric Mesnil. All rights reserved.
        Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
        - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
        - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        */
        return r.RIPEMD160;
      });
    })(jo);
  }
  return jo.exports;
}
var Io = {
  exports: {}
};
var za;
function Gi() {
  if (!za) {
    za = 1;
    (function (e, t) {
      (function (r, n) {
        e.exports = n(K());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.Base;
          var i = n.enc;
          var a = i.Utf8;
          var c = n.algo;
          c.HMAC = l.extend({
            init: function (u, d) {
              u = this._hasher = new u.init();
              if (typeof d == "string") {
                d = a.parse(d);
              }
              var y = u.blockSize;
              var x = y * 4;
              if (d.sigBytes > x) {
                d = u.finalize(d);
              }
              d.clamp();
              var m = this._oKey = d.clone();
              var h = this._iKey = d.clone();
              var g = m.words;
              var E = h.words;
              for (var p = 0; p < y; p++) {
                g[p] ^= 1549556828;
                E[p] ^= 909522486;
              }
              m.sigBytes = h.sigBytes = x;
              this.reset();
            },
            reset: function () {
              var u = this._hasher;
              u.reset();
              u.update(this._iKey);
            },
            update: function (u) {
              this._hasher.update(u);
              return this;
            },
            finalize: function (u) {
              var d = this._hasher;
              var y = d.finalize(u);
              d.reset();
              var x = d.finalize(this._oKey.clone().concat(y));
              return x;
            }
          });
        })();
      });
    })(Io);
  }
  return Io.exports;
}
var Mo = {
  exports: {}
};
var Pa;
function Bd() {
  if (!Pa) {
    Pa = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), qi(), Gi());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.Base;
          var i = o.WordArray;
          var a = n.algo;
          var c = a.SHA256;
          var u = a.HMAC;
          var d = a.PBKDF2 = l.extend({
            cfg: l.extend({
              keySize: 4,
              hasher: c,
              iterations: 250000
            }),
            init: function (y) {
              this.cfg = this.cfg.extend(y);
            },
            compute: function (y, x) {
              var m = this.cfg;
              var h = u.create(m.hasher, y);
              var g = i.create();
              var E = i.create([1]);
              for (var p = g.words, s = E.words, f = m.keySize, v = m.iterations; p.length < f;) {
                var C = h.update(x).finalize(E);
                h.reset();
                var B = C.words;
                var w = B.length;
                var A = C;
                for (var k = 1; k < v; k++) {
                  A = h.finalize(A);
                  h.reset();
                  var F = A.words;
                  for (var D = 0; D < w; D++) {
                    B[D] ^= F[D];
                  }
                }
                g.concat(C);
                s[0]++;
              }
              g.sigBytes = f * 4;
              return g;
            }
          });
          n.PBKDF2 = function (y, x, m) {
            return d.create(m).compute(y, x);
          };
        })();
        return r.PBKDF2;
      });
    })(Mo);
  }
  return Mo.exports;
}
var Uo = {
  exports: {}
};
var Na;
function jt() {
  if (!Na) {
    Na = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), mf(), Gi());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.Base;
          var i = o.WordArray;
          var a = n.algo;
          var c = a.MD5;
          var u = a.EvpKDF = l.extend({
            cfg: l.extend({
              keySize: 4,
              hasher: c,
              iterations: 1
            }),
            init: function (d) {
              this.cfg = this.cfg.extend(d);
            },
            compute: function (d, y) {
              var x;
              var m = this.cfg;
              var h = m.hasher.create();
              var g = i.create();
              for (var E = g.words, p = m.keySize, s = m.iterations; E.length < p;) {
                if (x) {
                  h.update(x);
                }
                x = h.update(d).finalize(y);
                h.reset();
                for (var f = 1; f < s; f++) {
                  x = h.finalize(x);
                  h.reset();
                }
                g.concat(x);
              }
              g.sigBytes = p * 4;
              return g;
            }
          });
          n.EvpKDF = function (d, y, x) {
            return u.create(x).compute(d, y);
          };
        })();
        return r.EvpKDF;
      });
    })(Uo);
  }
  return Uo.exports;
}
var Wo = {
  exports: {}
};
var Ra;
function pe() {
  if (!Ra) {
    Ra = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), jt());
      })($, function (r) {
        if (!r.lib.Cipher) {
          (function (n) {
            var o = r;
            var l = o.lib;
            var i = l.Base;
            var a = l.WordArray;
            var c = l.BufferedBlockAlgorithm;
            var u = o.enc;
            u.Utf8;
            var d = u.Base64;
            var y = o.algo;
            var x = y.EvpKDF;
            var m = l.Cipher = c.extend({
              cfg: i.extend(),
              createEncryptor: function (F, D) {
                return this.create(this._ENC_XFORM_MODE, F, D);
              },
              createDecryptor: function (F, D) {
                return this.create(this._DEC_XFORM_MODE, F, D);
              },
              init: function (F, D, z) {
                this.cfg = this.cfg.extend(z);
                this._xformMode = F;
                this._key = D;
                this.reset();
              },
              reset: function () {
                c.reset.call(this);
                this._doReset();
              },
              process: function (F) {
                this._append(F);
                return this._process();
              },
              finalize: function (F) {
                if (F) {
                  this._append(F);
                }
                var D = this._doFinalize();
                return D;
              },
              keySize: 4,
              ivSize: 4,
              _ENC_XFORM_MODE: 1,
              _DEC_XFORM_MODE: 2,
              _createHelper: function () {
                function F(D) {
                  if (typeof D == "string") {
                    return k;
                  } else {
                    return B;
                  }
                }
                return function (D) {
                  return {
                    encrypt: function (z, P, I) {
                      return F(P).encrypt(D, z, P, I);
                    },
                    decrypt: function (z, P, I) {
                      return F(P).decrypt(D, z, P, I);
                    }
                  };
                };
              }()
            });
            l.StreamCipher = m.extend({
              _doFinalize: function () {
                var F = this._process(true);
                return F;
              },
              blockSize: 1
            });
            var h = o.mode = {};
            var g = l.BlockCipherMode = i.extend({
              createEncryptor: function (F, D) {
                return this.Encryptor.create(F, D);
              },
              createDecryptor: function (F, D) {
                return this.Decryptor.create(F, D);
              },
              init: function (F, D) {
                this._cipher = F;
                this._iv = D;
              }
            });
            var E = h.CBC = function () {
              var F = g.extend();
              F.Encryptor = F.extend({
                processBlock: function (z, P) {
                  var I = this._cipher;
                  var M = I.blockSize;
                  D.call(this, z, P, M);
                  I.encryptBlock(z, P);
                  this._prevBlock = z.slice(P, P + M);
                }
              });
              F.Decryptor = F.extend({
                processBlock: function (z, P) {
                  var I = this._cipher;
                  var M = I.blockSize;
                  var W = z.slice(P, P + M);
                  I.decryptBlock(z, P);
                  D.call(this, z, P, M);
                  this._prevBlock = W;
                }
              });
              function D(z, P, I) {
                var M;
                var W = this._iv;
                if (W) {
                  M = W;
                  this._iv = n;
                } else {
                  M = this._prevBlock;
                }
                for (var X = 0; X < I; X++) {
                  z[P + X] ^= M[X];
                }
              }
              return F;
            }();
            var p = o.pad = {};
            var s = p.Pkcs7 = {
              pad: function (F, D) {
                var z = D * 4;
                for (var P = z - F.sigBytes % z, I = P << 24 | P << 16 | P << 8 | P, M = [], W = 0; W < P; W += 4) {
                  M.push(I);
                }
                var X = a.create(M, P);
                F.concat(X);
              },
              unpad: function (F) {
                var D = F.words[F.sigBytes - 1 >>> 2] & 255;
                F.sigBytes -= D;
              }
            };
            l.BlockCipher = m.extend({
              cfg: m.cfg.extend({
                mode: E,
                padding: s
              }),
              reset: function () {
                var F;
                m.reset.call(this);
                var D = this.cfg;
                var z = D.iv;
                var P = D.mode;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                  F = P.createEncryptor;
                } else {
                  F = P.createDecryptor;
                  this._minBufferSize = 1;
                }
                if (this._mode && this._mode.__creator == F) {
                  this._mode.init(this, z && z.words);
                } else {
                  this._mode = F.call(P, this, z && z.words);
                  this._mode.__creator = F;
                }
              },
              _doProcessBlock: function (F, D) {
                this._mode.processBlock(F, D);
              },
              _doFinalize: function () {
                var F;
                var D = this.cfg.padding;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                  D.pad(this._data, this.blockSize);
                  F = this._process(true);
                } else {
                  F = this._process(true);
                  D.unpad(F);
                }
                return F;
              },
              blockSize: 4
            });
            var f = l.CipherParams = i.extend({
              init: function (F) {
                this.mixIn(F);
              },
              toString: function (F) {
                return (F || this.formatter).stringify(this);
              }
            });
            var v = o.format = {};
            var C = v.OpenSSL = {
              stringify: function (F) {
                var D;
                var z = F.ciphertext;
                var P = F.salt;
                if (P) {
                  D = a.create([1398893684, 1701076831]).concat(P).concat(z);
                } else {
                  D = z;
                }
                return D.toString(d);
              },
              parse: function (F) {
                var D;
                var z = d.parse(F);
                var P = z.words;
                if (P[0] == 1398893684 && P[1] == 1701076831) {
                  D = a.create(P.slice(2, 4));
                  P.splice(0, 4);
                  z.sigBytes -= 16;
                }
                return f.create({
                  ciphertext: z,
                  salt: D
                });
              }
            };
            var B = l.SerializableCipher = i.extend({
              cfg: i.extend({
                format: C
              }),
              encrypt: function (F, D, z, P) {
                P = this.cfg.extend(P);
                var I = F.createEncryptor(z, P);
                var M = I.finalize(D);
                var W = I.cfg;
                return f.create({
                  ciphertext: M,
                  key: z,
                  iv: W.iv,
                  algorithm: F,
                  mode: W.mode,
                  padding: W.padding,
                  blockSize: F.blockSize,
                  formatter: P.format
                });
              },
              decrypt: function (F, D, z, P) {
                P = this.cfg.extend(P);
                D = this._parse(D, P.format);
                var I = F.createDecryptor(z, P).finalize(D.ciphertext);
                return I;
              },
              _parse: function (F, D) {
                if (typeof F == "string") {
                  return D.parse(F, this);
                } else {
                  return F;
                }
              }
            });
            var w = o.kdf = {};
            var A = w.OpenSSL = {
              execute: function (F, D, z, P, I) {
                P ||= a.random(8);
                if (I) {
                  var M = x.create({
                    keySize: D + z,
                    hasher: I
                  }).compute(F, P);
                } else {
                  var M = x.create({
                    keySize: D + z
                  }).compute(F, P);
                }
                var W = a.create(M.words.slice(D), z * 4);
                M.sigBytes = D * 4;
                return f.create({
                  key: M,
                  iv: W,
                  salt: P
                });
              }
            };
            var k = l.PasswordBasedCipher = B.extend({
              cfg: B.cfg.extend({
                kdf: A
              }),
              encrypt: function (F, D, z, P) {
                P = this.cfg.extend(P);
                var I = P.kdf.execute(z, F.keySize, F.ivSize, P.salt, P.hasher);
                P.iv = I.iv;
                var M = B.encrypt.call(this, F, D, I.key, P);
                M.mixIn(I);
                return M;
              },
              decrypt: function (F, D, z, P) {
                P = this.cfg.extend(P);
                D = this._parse(D, P.format);
                var I = P.kdf.execute(z, F.keySize, F.ivSize, D.salt, P.hasher);
                P.iv = I.iv;
                var M = B.decrypt.call(this, F, D, I.key, P);
                return M;
              }
            });
          })();
        }
      });
    })(Wo);
  }
  return Wo.exports;
}
var $o = {
  exports: {}
};
var La;
function wd() {
  if (!La) {
    La = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), pe());
      })($, function (r) {
        r.mode.CFB = function () {
          var n = r.lib.BlockCipherMode.extend();
          n.Encryptor = n.extend({
            processBlock: function (l, i) {
              var a = this._cipher;
              var c = a.blockSize;
              o.call(this, l, i, c, a);
              this._prevBlock = l.slice(i, i + c);
            }
          });
          n.Decryptor = n.extend({
            processBlock: function (l, i) {
              var a = this._cipher;
              var c = a.blockSize;
              var u = l.slice(i, i + c);
              o.call(this, l, i, c, a);
              this._prevBlock = u;
            }
          });
          function o(l, i, a, c) {
            var u;
            var d = this._iv;
            if (d) {
              u = d.slice(0);
              this._iv = undefined;
            } else {
              u = this._prevBlock;
            }
            c.encryptBlock(u, 0);
            for (var y = 0; y < a; y++) {
              l[i + y] ^= u[y];
            }
          }
          return n;
        }();
        return r.mode.CFB;
      });
    })($o);
  }
  return $o.exports;
}
var Vo = {
  exports: {}
};
var Ta;
function Fd() {
  if (!Ta) {
    Ta = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), pe());
      })($, function (r) {
        r.mode.CTR = function () {
          var n = r.lib.BlockCipherMode.extend();
          var o = n.Encryptor = n.extend({
            processBlock: function (l, i) {
              var a = this._cipher;
              var c = a.blockSize;
              var u = this._iv;
              var d = this._counter;
              if (u) {
                d = this._counter = u.slice(0);
                this._iv = undefined;
              }
              var y = d.slice(0);
              a.encryptBlock(y, 0);
              d[c - 1] = d[c - 1] + 1 | 0;
              for (var x = 0; x < c; x++) {
                l[i + x] ^= y[x];
              }
            }
          });
          n.Decryptor = o;
          return n;
        }();
        return r.mode.CTR;
      });
    })(Vo);
  }
  return Vo.exports;
}
var Qo = {
  exports: {}
};
var Ha;
function Ad() {
  if (!Ha) {
    Ha = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), pe());
      })($, function (r) {
        r.mode.CTRGladman = function () {
          var n = r.lib.BlockCipherMode.extend();
          function o(a) {
            if ((a >> 24 & 255) === 255) {
              var c = a >> 16 & 255;
              var u = a >> 8 & 255;
              var d = a & 255;
              if (c === 255) {
                c = 0;
                if (u === 255) {
                  u = 0;
                  if (d === 255) {
                    d = 0;
                  } else {
                    ++d;
                  }
                } else {
                  ++u;
                }
              } else {
                ++c;
              }
              a = 0;
              a += c << 16;
              a += u << 8;
              a += d;
            } else {
              a += 16777216;
            }
            return a;
          }
          function l(a) {
            if ((a[0] = o(a[0])) === 0) {
              a[1] = o(a[1]);
            }
            return a;
          }
          var i = n.Encryptor = n.extend({
            processBlock: function (a, c) {
              var u = this._cipher;
              var d = u.blockSize;
              var y = this._iv;
              var x = this._counter;
              if (y) {
                x = this._counter = y.slice(0);
                this._iv = undefined;
              }
              l(x);
              var m = x.slice(0);
              u.encryptBlock(m, 0);
              for (var h = 0; h < d; h++) {
                a[c + h] ^= m[h];
              }
            }
          });
          n.Decryptor = i;
          return n;
        }();
        /** @preserve
        * Counter block mode compatible with  Dr Brian Gladman fileenc.c
        * derived from CryptoJS.mode.CTR
        * Jan Hruby jhruby.web@gmail.com
        */
        return r.mode.CTRGladman;
      });
    })(Qo);
  }
  return Qo.exports;
}
var Ko = {
  exports: {}
};
var Oa;
function Dd() {
  if (!Oa) {
    Oa = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), pe());
      })($, function (r) {
        r.mode.OFB = function () {
          var n = r.lib.BlockCipherMode.extend();
          var o = n.Encryptor = n.extend({
            processBlock: function (l, i) {
              var a = this._cipher;
              var c = a.blockSize;
              var u = this._iv;
              var d = this._keystream;
              if (u) {
                d = this._keystream = u.slice(0);
                this._iv = undefined;
              }
              a.encryptBlock(d, 0);
              for (var y = 0; y < c; y++) {
                l[i + y] ^= d[y];
              }
            }
          });
          n.Decryptor = o;
          return n;
        }();
        return r.mode.OFB;
      });
    })(Ko);
  }
  return Ko.exports;
}
var qo = {
  exports: {}
};
var ja;
function _d() {
  if (!ja) {
    ja = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), pe());
      })($, function (r) {
        r.mode.ECB = function () {
          var n = r.lib.BlockCipherMode.extend();
          n.Encryptor = n.extend({
            processBlock: function (o, l) {
              this._cipher.encryptBlock(o, l);
            }
          });
          n.Decryptor = n.extend({
            processBlock: function (o, l) {
              this._cipher.decryptBlock(o, l);
            }
          });
          return n;
        }();
        return r.mode.ECB;
      });
    })(qo);
  }
  return qo.exports;
}
var Go = {
  exports: {}
};
var Ia;
function kd() {
  if (!Ia) {
    Ia = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), pe());
      })($, function (r) {
        r.pad.AnsiX923 = {
          pad: function (n, o) {
            var l = n.sigBytes;
            var i = o * 4;
            var a = i - l % i;
            var c = l + a - 1;
            n.clamp();
            n.words[c >>> 2] |= a << 24 - c % 4 * 8;
            n.sigBytes += a;
          },
          unpad: function (n) {
            var o = n.words[n.sigBytes - 1 >>> 2] & 255;
            n.sigBytes -= o;
          }
        };
        return r.pad.Ansix923;
      });
    })(Go);
  }
  return Go.exports;
}
var Xo = {
  exports: {}
};
var Ma;
function Sd() {
  if (!Ma) {
    Ma = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), pe());
      })($, function (r) {
        r.pad.Iso10126 = {
          pad: function (n, o) {
            var l = o * 4;
            var i = l - n.sigBytes % l;
            n.concat(r.lib.WordArray.random(i - 1)).concat(r.lib.WordArray.create([i << 24], 1));
          },
          unpad: function (n) {
            var o = n.words[n.sigBytes - 1 >>> 2] & 255;
            n.sigBytes -= o;
          }
        };
        return r.pad.Iso10126;
      });
    })(Xo);
  }
  return Xo.exports;
}
var Yo = {
  exports: {}
};
var Ua;
function zd() {
  if (!Ua) {
    Ua = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), pe());
      })($, function (r) {
        r.pad.Iso97971 = {
          pad: function (n, o) {
            n.concat(r.lib.WordArray.create([2147483648], 1));
            r.pad.ZeroPadding.pad(n, o);
          },
          unpad: function (n) {
            r.pad.ZeroPadding.unpad(n);
            n.sigBytes--;
          }
        };
        return r.pad.Iso97971;
      });
    })(Yo);
  }
  return Yo.exports;
}
var Zo = {
  exports: {}
};
var Wa;
function Pd() {
  if (!Wa) {
    Wa = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), pe());
      })($, function (r) {
        r.pad.ZeroPadding = {
          pad: function (n, o) {
            var l = o * 4;
            n.clamp();
            n.sigBytes += l - (n.sigBytes % l || l);
          },
          unpad: function (n) {
            var o = n.words;
            for (var l = n.sigBytes - 1, l = n.sigBytes - 1; l >= 0; l--) {
              if (o[l >>> 2] >>> 24 - l % 4 * 8 & 255) {
                n.sigBytes = l + 1;
                break;
              }
            }
          }
        };
        return r.pad.ZeroPadding;
      });
    })(Zo);
  }
  return Zo.exports;
}
var Jo = {
  exports: {}
};
var $a;
function Nd() {
  if (!$a) {
    $a = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), pe());
      })($, function (r) {
        r.pad.NoPadding = {
          pad: function () {},
          unpad: function () {}
        };
        return r.pad.NoPadding;
      });
    })(Jo);
  }
  return Jo.exports;
}
var bo = {
  exports: {}
};
var Va;
function Rd() {
  if (!Va) {
    Va = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), pe());
      })($, function (r) {
        (function (n) {
          var o = r;
          var l = o.lib;
          var i = l.CipherParams;
          var a = o.enc;
          var c = a.Hex;
          var u = o.format;
          u.Hex = {
            stringify: function (d) {
              return d.ciphertext.toString(c);
            },
            parse: function (d) {
              var y = c.parse(d);
              return i.create({
                ciphertext: y
              });
            }
          };
        })();
        return r.format.Hex;
      });
    })(bo);
  }
  return bo.exports;
}
var el = {
  exports: {}
};
var Qa;
function Ld() {
  if (!Qa) {
    Qa = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), er(), tr(), jt(), pe());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.BlockCipher;
          var i = n.algo;
          var a = [];
          var c = [];
          var u = [];
          var d = [];
          var y = [];
          var x = [];
          var m = [];
          var h = [];
          var g = [];
          var E = [];
          (function () {
            var f = [];
            for (var v = 0; v < 256; v++) {
              if (v < 128) {
                f[v] = v << 1;
              } else {
                f[v] = v << 1 ^ 283;
              }
            }
            var C = 0;
            var B = 0;
            for (var v = 0; v < 256; v++) {
              var w = B ^ B << 1 ^ B << 2 ^ B << 3 ^ B << 4;
              w = w >>> 8 ^ w & 255 ^ 99;
              a[C] = w;
              c[w] = C;
              var A = f[C];
              var k = f[A];
              var F = f[k];
              var D = f[w] * 257 ^ w * 16843008;
              u[C] = D << 24 | D >>> 8;
              d[C] = D << 16 | D >>> 16;
              y[C] = D << 8 | D >>> 24;
              x[C] = D;
              var D = F * 16843009 ^ k * 65537 ^ A * 257 ^ C * 16843008;
              m[w] = D << 24 | D >>> 8;
              h[w] = D << 16 | D >>> 16;
              g[w] = D << 8 | D >>> 24;
              E[w] = D;
              if (C) {
                C = A ^ f[f[f[F ^ A]]];
                B ^= f[f[B]];
              } else {
                C = B = 1;
              }
            }
          })();
          var p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
          var s = i.AES = l.extend({
            _doReset: function () {
              var f;
              if (!this._nRounds || this._keyPriorReset !== this._key) {
                var v = this._keyPriorReset = this._key;
                var C = v.words;
                var B = v.sigBytes / 4;
                var w = this._nRounds = B + 6;
                for (var A = (w + 1) * 4, k = this._keySchedule = [], F = 0; F < A; F++) {
                  if (F < B) {
                    k[F] = C[F];
                  } else {
                    f = k[F - 1];
                    if (F % B) {
                      if (B > 6 && F % B == 4) {
                        f = a[f >>> 24] << 24 | a[f >>> 16 & 255] << 16 | a[f >>> 8 & 255] << 8 | a[f & 255];
                      }
                    } else {
                      f = f << 8 | f >>> 24;
                      f = a[f >>> 24] << 24 | a[f >>> 16 & 255] << 16 | a[f >>> 8 & 255] << 8 | a[f & 255];
                      f ^= p[F / B | 0] << 24;
                    }
                    k[F] = k[F - B] ^ f;
                  }
                }
                var D = this._invKeySchedule = [];
                for (var z = 0; z < A; z++) {
                  var F = A - z;
                  if (z % 4) {
                    var f = k[F];
                  } else {
                    var f = k[F - 4];
                  }
                  if (z < 4 || F <= 4) {
                    D[z] = f;
                  } else {
                    D[z] = m[a[f >>> 24]] ^ h[a[f >>> 16 & 255]] ^ g[a[f >>> 8 & 255]] ^ E[a[f & 255]];
                  }
                }
              }
            },
            encryptBlock: function (f, v) {
              this._doCryptBlock(f, v, this._keySchedule, u, d, y, x, a);
            },
            decryptBlock: function (f, v) {
              var C = f[v + 1];
              f[v + 1] = f[v + 3];
              f[v + 3] = C;
              this._doCryptBlock(f, v, this._invKeySchedule, m, h, g, E, c);
              var C = f[v + 1];
              f[v + 1] = f[v + 3];
              f[v + 3] = C;
            },
            _doCryptBlock: function (f, v, C, B, w, A, k, F) {
              for (var D = this._nRounds, z = f[v] ^ C[0], P = f[v + 1] ^ C[1], I = f[v + 2] ^ C[2], M = f[v + 3] ^ C[3], W = 4, X = 1; X < D; X++) {
                var L = B[z >>> 24] ^ w[P >>> 16 & 255] ^ A[I >>> 8 & 255] ^ k[M & 255] ^ C[W++];
                var H = B[P >>> 24] ^ w[I >>> 16 & 255] ^ A[M >>> 8 & 255] ^ k[z & 255] ^ C[W++];
                var O = B[I >>> 24] ^ w[M >>> 16 & 255] ^ A[z >>> 8 & 255] ^ k[P & 255] ^ C[W++];
                var _ = B[M >>> 24] ^ w[z >>> 16 & 255] ^ A[P >>> 8 & 255] ^ k[I & 255] ^ C[W++];
                z = L;
                P = H;
                I = O;
                M = _;
              }
              var L = (F[z >>> 24] << 24 | F[P >>> 16 & 255] << 16 | F[I >>> 8 & 255] << 8 | F[M & 255]) ^ C[W++];
              var H = (F[P >>> 24] << 24 | F[I >>> 16 & 255] << 16 | F[M >>> 8 & 255] << 8 | F[z & 255]) ^ C[W++];
              var O = (F[I >>> 24] << 24 | F[M >>> 16 & 255] << 16 | F[z >>> 8 & 255] << 8 | F[P & 255]) ^ C[W++];
              var _ = (F[M >>> 24] << 24 | F[z >>> 16 & 255] << 16 | F[P >>> 8 & 255] << 8 | F[I & 255]) ^ C[W++];
              f[v] = L;
              f[v + 1] = H;
              f[v + 2] = O;
              f[v + 3] = _;
            },
            keySize: 8
          });
          n.AES = l._createHelper(s);
        })();
        return r.AES;
      });
    })(el);
  }
  return el.exports;
}
var tl = {
  exports: {}
};
var Ka;
function Td() {
  if (!Ka) {
    Ka = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), er(), tr(), jt(), pe());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.WordArray;
          var i = o.BlockCipher;
          var a = n.algo;
          var c = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
          var u = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
          var d = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
          var y = [{
            0: 8421888,
            268435456: 32768,
            536870912: 8421378,
            805306368: 2,
            1073741824: 512,
            1342177280: 8421890,
            1610612736: 8389122,
            1879048192: 8388608,
            2147483648: 514,
            2415919104: 8389120,
            2684354560: 33280,
            2952790016: 8421376,
            3221225472: 32770,
            3489660928: 8388610,
            3758096384: 0,
            4026531840: 33282,
            134217728: 0,
            402653184: 8421890,
            671088640: 33282,
            939524096: 32768,
            1207959552: 8421888,
            1476395008: 512,
            1744830464: 8421378,
            2013265920: 2,
            2281701376: 8389120,
            2550136832: 33280,
            2818572288: 8421376,
            3087007744: 8389122,
            3355443200: 8388610,
            3623878656: 32770,
            3892314112: 514,
            4160749568: 8388608,
            1: 32768,
            268435457: 2,
            536870913: 8421888,
            805306369: 8388608,
            1073741825: 8421378,
            1342177281: 33280,
            1610612737: 512,
            1879048193: 8389122,
            2147483649: 8421890,
            2415919105: 8421376,
            2684354561: 8388610,
            2952790017: 33282,
            3221225473: 514,
            3489660929: 8389120,
            3758096385: 32770,
            4026531841: 0,
            134217729: 8421890,
            402653185: 8421376,
            671088641: 8388608,
            939524097: 512,
            1207959553: 32768,
            1476395009: 8388610,
            1744830465: 2,
            2013265921: 33282,
            2281701377: 32770,
            2550136833: 8389122,
            2818572289: 514,
            3087007745: 8421888,
            3355443201: 8389120,
            3623878657: 0,
            3892314113: 33280,
            4160749569: 8421378
          }, {
            0: 1074282512,
            16777216: 16384,
            33554432: 524288,
            50331648: 1074266128,
            67108864: 1073741840,
            83886080: 1074282496,
            100663296: 1073758208,
            117440512: 16,
            134217728: 540672,
            150994944: 1073758224,
            167772160: 1073741824,
            184549376: 540688,
            201326592: 524304,
            218103808: 0,
            234881024: 16400,
            251658240: 1074266112,
            8388608: 1073758208,
            25165824: 540688,
            41943040: 16,
            58720256: 1073758224,
            75497472: 1074282512,
            92274688: 1073741824,
            109051904: 524288,
            125829120: 1074266128,
            142606336: 524304,
            159383552: 0,
            176160768: 16384,
            192937984: 1074266112,
            209715200: 1073741840,
            226492416: 540672,
            243269632: 1074282496,
            260046848: 16400,
            268435456: 0,
            285212672: 1074266128,
            301989888: 1073758224,
            318767104: 1074282496,
            335544320: 1074266112,
            352321536: 16,
            369098752: 540688,
            385875968: 16384,
            402653184: 16400,
            419430400: 524288,
            436207616: 524304,
            452984832: 1073741840,
            469762048: 540672,
            486539264: 1073758208,
            503316480: 1073741824,
            520093696: 1074282512,
            276824064: 540688,
            293601280: 524288,
            310378496: 1074266112,
            327155712: 16384,
            343932928: 1073758208,
            360710144: 1074282512,
            377487360: 16,
            394264576: 1073741824,
            411041792: 1074282496,
            427819008: 1073741840,
            444596224: 1073758224,
            461373440: 524304,
            478150656: 0,
            494927872: 16400,
            511705088: 1074266128,
            528482304: 540672
          }, {
            0: 260,
            1048576: 0,
            2097152: 67109120,
            3145728: 65796,
            4194304: 65540,
            5242880: 67108868,
            6291456: 67174660,
            7340032: 67174400,
            8388608: 67108864,
            9437184: 67174656,
            10485760: 65792,
            11534336: 67174404,
            12582912: 67109124,
            13631488: 65536,
            14680064: 4,
            15728640: 256,
            524288: 67174656,
            1572864: 67174404,
            2621440: 0,
            3670016: 67109120,
            4718592: 67108868,
            5767168: 65536,
            6815744: 65540,
            7864320: 260,
            8912896: 4,
            9961472: 256,
            11010048: 67174400,
            12058624: 65796,
            13107200: 65792,
            14155776: 67109124,
            15204352: 67174660,
            16252928: 67108864,
            16777216: 67174656,
            17825792: 65540,
            18874368: 65536,
            19922944: 67109120,
            20971520: 256,
            22020096: 67174660,
            23068672: 67108868,
            24117248: 0,
            25165824: 67109124,
            26214400: 67108864,
            27262976: 4,
            28311552: 65792,
            29360128: 67174400,
            30408704: 260,
            31457280: 65796,
            32505856: 67174404,
            17301504: 67108864,
            18350080: 260,
            19398656: 67174656,
            20447232: 0,
            21495808: 65540,
            22544384: 67109120,
            23592960: 256,
            24641536: 67174404,
            25690112: 65536,
            26738688: 67174660,
            27787264: 65796,
            28835840: 67108868,
            29884416: 67109124,
            30932992: 67174400,
            31981568: 4,
            33030144: 65792
          }, {
            0: 2151682048,
            65536: 2147487808,
            131072: 4198464,
            196608: 2151677952,
            262144: 0,
            327680: 4198400,
            393216: 2147483712,
            458752: 4194368,
            524288: 2147483648,
            589824: 4194304,
            655360: 64,
            720896: 2147487744,
            786432: 2151678016,
            851968: 4160,
            917504: 4096,
            983040: 2151682112,
            32768: 2147487808,
            98304: 64,
            163840: 2151678016,
            229376: 2147487744,
            294912: 4198400,
            360448: 2151682112,
            425984: 0,
            491520: 2151677952,
            557056: 4096,
            622592: 2151682048,
            688128: 4194304,
            753664: 4160,
            819200: 2147483648,
            884736: 4194368,
            950272: 4198464,
            1015808: 2147483712,
            1048576: 4194368,
            1114112: 4198400,
            1179648: 2147483712,
            1245184: 0,
            1310720: 4160,
            1376256: 2151678016,
            1441792: 2151682048,
            1507328: 2147487808,
            1572864: 2151682112,
            1638400: 2147483648,
            1703936: 2151677952,
            1769472: 4198464,
            1835008: 2147487744,
            1900544: 4194304,
            1966080: 64,
            2031616: 4096,
            1081344: 2151677952,
            1146880: 2151682112,
            1212416: 0,
            1277952: 4198400,
            1343488: 4194368,
            1409024: 2147483648,
            1474560: 2147487808,
            1540096: 64,
            1605632: 2147483712,
            1671168: 4096,
            1736704: 2147487744,
            1802240: 2151678016,
            1867776: 4160,
            1933312: 2151682048,
            1998848: 4194304,
            2064384: 4198464
          }, {
            0: 128,
            4096: 17039360,
            8192: 262144,
            12288: 536870912,
            16384: 537133184,
            20480: 16777344,
            24576: 553648256,
            28672: 262272,
            32768: 16777216,
            36864: 537133056,
            40960: 536871040,
            45056: 553910400,
            49152: 553910272,
            53248: 0,
            57344: 17039488,
            61440: 553648128,
            2048: 17039488,
            6144: 553648256,
            10240: 128,
            14336: 17039360,
            18432: 262144,
            22528: 537133184,
            26624: 553910272,
            30720: 536870912,
            34816: 537133056,
            38912: 0,
            43008: 553910400,
            47104: 16777344,
            51200: 536871040,
            55296: 553648128,
            59392: 16777216,
            63488: 262272,
            65536: 262144,
            69632: 128,
            73728: 536870912,
            77824: 553648256,
            81920: 16777344,
            86016: 553910272,
            90112: 537133184,
            94208: 16777216,
            98304: 553910400,
            102400: 553648128,
            106496: 17039360,
            110592: 537133056,
            114688: 262272,
            118784: 536871040,
            122880: 0,
            126976: 17039488,
            67584: 553648256,
            71680: 16777216,
            75776: 17039360,
            79872: 537133184,
            83968: 536870912,
            88064: 17039488,
            92160: 128,
            96256: 553910272,
            100352: 262272,
            104448: 553910400,
            108544: 0,
            112640: 553648128,
            116736: 16777344,
            120832: 262144,
            124928: 537133056,
            129024: 536871040
          }, {
            0: 268435464,
            256: 8192,
            512: 270532608,
            768: 270540808,
            1024: 268443648,
            1280: 2097152,
            1536: 2097160,
            1792: 268435456,
            2048: 0,
            2304: 268443656,
            2560: 2105344,
            2816: 8,
            3072: 270532616,
            3328: 2105352,
            3584: 8200,
            3840: 270540800,
            128: 270532608,
            384: 270540808,
            640: 8,
            896: 2097152,
            1152: 2105352,
            1408: 268435464,
            1664: 268443648,
            1920: 8200,
            2176: 2097160,
            2432: 8192,
            2688: 268443656,
            2944: 270532616,
            3200: 0,
            3456: 270540800,
            3712: 2105344,
            3968: 268435456,
            4096: 268443648,
            4352: 270532616,
            4608: 270540808,
            4864: 8200,
            5120: 2097152,
            5376: 268435456,
            5632: 268435464,
            5888: 2105344,
            6144: 2105352,
            6400: 0,
            6656: 8,
            6912: 270532608,
            7168: 8192,
            7424: 268443656,
            7680: 270540800,
            7936: 2097160,
            4224: 8,
            4480: 2105344,
            4736: 2097152,
            4992: 268435464,
            5248: 268443648,
            5504: 8200,
            5760: 270540808,
            6016: 270532608,
            6272: 270540800,
            6528: 270532616,
            6784: 8192,
            7040: 2105352,
            7296: 2097160,
            7552: 0,
            7808: 268435456,
            8064: 268443656
          }, {
            0: 1048576,
            16: 33555457,
            32: 1024,
            48: 1049601,
            64: 34604033,
            80: 0,
            96: 1,
            112: 34603009,
            128: 33555456,
            144: 1048577,
            160: 33554433,
            176: 34604032,
            192: 34603008,
            208: 1025,
            224: 1049600,
            240: 33554432,
            8: 34603009,
            24: 0,
            40: 33555457,
            56: 34604032,
            72: 1048576,
            88: 33554433,
            104: 33554432,
            120: 1025,
            136: 1049601,
            152: 33555456,
            168: 34603008,
            184: 1048577,
            200: 1024,
            216: 34604033,
            232: 1,
            248: 1049600,
            256: 33554432,
            272: 1048576,
            288: 33555457,
            304: 34603009,
            320: 1048577,
            336: 33555456,
            352: 34604032,
            368: 1049601,
            384: 1025,
            400: 34604033,
            416: 1049600,
            432: 1,
            448: 0,
            464: 34603008,
            480: 33554433,
            496: 1024,
            264: 1049600,
            280: 33555457,
            296: 34603009,
            312: 1,
            328: 33554432,
            344: 1048576,
            360: 1025,
            376: 34604032,
            392: 33554433,
            408: 34603008,
            424: 0,
            440: 34604033,
            456: 1049601,
            472: 1024,
            488: 33555456,
            504: 1048577
          }, {
            0: 134219808,
            1: 131072,
            2: 134217728,
            3: 32,
            4: 131104,
            5: 134350880,
            6: 134350848,
            7: 2048,
            8: 134348800,
            9: 134219776,
            10: 133120,
            11: 134348832,
            12: 2080,
            13: 0,
            14: 134217760,
            15: 133152,
            2147483648: 2048,
            2147483649: 134350880,
            2147483650: 134219808,
            2147483651: 134217728,
            2147483652: 134348800,
            2147483653: 133120,
            2147483654: 133152,
            2147483655: 32,
            2147483656: 134217760,
            2147483657: 2080,
            2147483658: 131104,
            2147483659: 134350848,
            2147483660: 0,
            2147483661: 134348832,
            2147483662: 134219776,
            2147483663: 131072,
            16: 133152,
            17: 134350848,
            18: 32,
            19: 2048,
            20: 134219776,
            21: 134217760,
            22: 134348832,
            23: 131072,
            24: 0,
            25: 131104,
            26: 134348800,
            27: 134219808,
            28: 134350880,
            29: 133120,
            30: 2080,
            31: 134217728,
            2147483664: 131072,
            2147483665: 2048,
            2147483666: 134348832,
            2147483667: 133152,
            2147483668: 32,
            2147483669: 134348800,
            2147483670: 134217728,
            2147483671: 134219808,
            2147483672: 134350880,
            2147483673: 134217760,
            2147483674: 134219776,
            2147483675: 0,
            2147483676: 133120,
            2147483677: 2080,
            2147483678: 131104,
            2147483679: 134350848
          }];
          var x = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679];
          var m = a.DES = i.extend({
            _doReset: function () {
              var p = this._key;
              var s = p.words;
              var f = [];
              for (var v = 0; v < 56; v++) {
                var C = c[v] - 1;
                f[v] = s[C >>> 5] >>> 31 - C % 32 & 1;
              }
              var B = this._subKeys = [];
              for (var w = 0; w < 16; w++) {
                var A = B[w] = [];
                var k = d[w];
                for (var v = 0; v < 24; v++) {
                  A[v / 6 | 0] |= f[(u[v] - 1 + k) % 28] << 31 - v % 6;
                  A[4 + (v / 6 | 0)] |= f[28 + (u[v + 24] - 1 + k) % 28] << 31 - v % 6;
                }
                A[0] = A[0] << 1 | A[0] >>> 31;
                for (var v = 1; v < 7; v++) {
                  A[v] = A[v] >>> (v - 1) * 4 + 3;
                }
                A[7] = A[7] << 5 | A[7] >>> 27;
              }
              var F = this._invSubKeys = [];
              for (var v = 0; v < 16; v++) {
                F[v] = B[15 - v];
              }
            },
            encryptBlock: function (p, s) {
              this._doCryptBlock(p, s, this._subKeys);
            },
            decryptBlock: function (p, s) {
              this._doCryptBlock(p, s, this._invSubKeys);
            },
            _doCryptBlock: function (p, s, f) {
              this._lBlock = p[s];
              this._rBlock = p[s + 1];
              h.call(this, 4, 252645135);
              h.call(this, 16, 65535);
              g.call(this, 2, 858993459);
              g.call(this, 8, 16711935);
              h.call(this, 1, 1431655765);
              for (var v = 0; v < 16; v++) {
                var C = f[v];
                var B = this._lBlock;
                var w = this._rBlock;
                var A = 0;
                for (var k = 0; k < 8; k++) {
                  A |= y[k][((w ^ C[k]) & x[k]) >>> 0];
                }
                this._lBlock = w;
                this._rBlock = B ^ A;
              }
              var F = this._lBlock;
              this._lBlock = this._rBlock;
              this._rBlock = F;
              h.call(this, 1, 1431655765);
              g.call(this, 8, 16711935);
              g.call(this, 2, 858993459);
              h.call(this, 16, 65535);
              h.call(this, 4, 252645135);
              p[s] = this._lBlock;
              p[s + 1] = this._rBlock;
            },
            keySize: 2,
            ivSize: 2,
            blockSize: 2
          });
          function h(p, s) {
            var f = (this._lBlock >>> p ^ this._rBlock) & s;
            this._rBlock ^= f;
            this._lBlock ^= f << p;
          }
          function g(p, s) {
            var f = (this._rBlock >>> p ^ this._lBlock) & s;
            this._lBlock ^= f;
            this._rBlock ^= f << p;
          }
          n.DES = i._createHelper(m);
          var E = a.TripleDES = i.extend({
            _doReset: function () {
              var p = this._key;
              var s = p.words;
              if (s.length !== 2 && s.length !== 4 && s.length < 6) {
                throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
              }
              var f = s.slice(0, 2);
              var v = s.length < 4 ? s.slice(0, 2) : s.slice(2, 4);
              var C = s.length < 6 ? s.slice(0, 2) : s.slice(4, 6);
              this._des1 = m.createEncryptor(l.create(f));
              this._des2 = m.createEncryptor(l.create(v));
              this._des3 = m.createEncryptor(l.create(C));
            },
            encryptBlock: function (p, s) {
              this._des1.encryptBlock(p, s);
              this._des2.decryptBlock(p, s);
              this._des3.encryptBlock(p, s);
            },
            decryptBlock: function (p, s) {
              this._des3.decryptBlock(p, s);
              this._des2.encryptBlock(p, s);
              this._des1.decryptBlock(p, s);
            },
            keySize: 6,
            ivSize: 2,
            blockSize: 2
          });
          n.TripleDES = i._createHelper(E);
        })();
        return r.TripleDES;
      });
    })(tl);
  }
  return tl.exports;
}
var rl = {
  exports: {}
};
var qa;
function Hd() {
  if (!qa) {
    qa = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), er(), tr(), jt(), pe());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.StreamCipher;
          var i = n.algo;
          var a = i.RC4 = l.extend({
            _doReset: function () {
              var d = this._key;
              var y = d.words;
              var x = d.sigBytes;
              var m = this._S = [];
              for (var h = 0; h < 256; h++) {
                m[h] = h;
              }
              for (var h = 0, g = 0; h < 256; h++) {
                var E = h % x;
                var p = y[E >>> 2] >>> 24 - E % 4 * 8 & 255;
                g = (g + m[h] + p) % 256;
                var s = m[h];
                m[h] = m[g];
                m[g] = s;
              }
              this._i = this._j = 0;
            },
            _doProcessBlock: function (d, y) {
              d[y] ^= c.call(this);
            },
            keySize: 8,
            ivSize: 0
          });
          function c() {
            var d = this._S;
            var y = this._i;
            var x = this._j;
            var m = 0;
            for (var h = 0; h < 4; h++) {
              y = (y + 1) % 256;
              x = (x + d[y]) % 256;
              var g = d[y];
              d[y] = d[x];
              d[x] = g;
              m |= d[(d[y] + d[x]) % 256] << 24 - h * 8;
            }
            this._i = y;
            this._j = x;
            return m;
          }
          n.RC4 = l._createHelper(a);
          var u = i.RC4Drop = a.extend({
            cfg: a.cfg.extend({
              drop: 192
            }),
            _doReset: function () {
              a._doReset.call(this);
              for (var d = this.cfg.drop; d > 0; d--) {
                c.call(this);
              }
            }
          });
          n.RC4Drop = l._createHelper(u);
        })();
        return r.RC4;
      });
    })(rl);
  }
  return rl.exports;
}
var nl = {
  exports: {}
};
var Ga;
function Od() {
  if (!Ga) {
    Ga = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), er(), tr(), jt(), pe());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.StreamCipher;
          var i = n.algo;
          var a = [];
          var c = [];
          var u = [];
          var d = i.Rabbit = l.extend({
            _doReset: function () {
              var x = this._key.words;
              var m = this.cfg.iv;
              for (var h = 0; h < 4; h++) {
                x[h] = (x[h] << 8 | x[h] >>> 24) & 16711935 | (x[h] << 24 | x[h] >>> 8) & 4278255360;
              }
              var g = this._X = [x[0], x[3] << 16 | x[2] >>> 16, x[1], x[0] << 16 | x[3] >>> 16, x[2], x[1] << 16 | x[0] >>> 16, x[3], x[2] << 16 | x[1] >>> 16];
              var E = this._C = [x[2] << 16 | x[2] >>> 16, x[0] & 4294901760 | x[1] & 65535, x[3] << 16 | x[3] >>> 16, x[1] & 4294901760 | x[2] & 65535, x[0] << 16 | x[0] >>> 16, x[2] & 4294901760 | x[3] & 65535, x[1] << 16 | x[1] >>> 16, x[3] & 4294901760 | x[0] & 65535];
              this._b = 0;
              for (var h = 0; h < 4; h++) {
                y.call(this);
              }
              for (var h = 0; h < 8; h++) {
                E[h] ^= g[h + 4 & 7];
              }
              if (m) {
                var p = m.words;
                var s = p[0];
                var f = p[1];
                var v = (s << 8 | s >>> 24) & 16711935 | (s << 24 | s >>> 8) & 4278255360;
                var C = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
                var B = v >>> 16 | C & 4294901760;
                var w = C << 16 | v & 65535;
                E[0] ^= v;
                E[1] ^= B;
                E[2] ^= C;
                E[3] ^= w;
                E[4] ^= v;
                E[5] ^= B;
                E[6] ^= C;
                E[7] ^= w;
                for (var h = 0; h < 4; h++) {
                  y.call(this);
                }
              }
            },
            _doProcessBlock: function (x, m) {
              var h = this._X;
              y.call(this);
              a[0] = h[0] ^ h[5] >>> 16 ^ h[3] << 16;
              a[1] = h[2] ^ h[7] >>> 16 ^ h[5] << 16;
              a[2] = h[4] ^ h[1] >>> 16 ^ h[7] << 16;
              a[3] = h[6] ^ h[3] >>> 16 ^ h[1] << 16;
              for (var g = 0; g < 4; g++) {
                a[g] = (a[g] << 8 | a[g] >>> 24) & 16711935 | (a[g] << 24 | a[g] >>> 8) & 4278255360;
                x[m + g] ^= a[g];
              }
            },
            blockSize: 4,
            ivSize: 2
          });
          function y() {
            var x = this._X;
            var m = this._C;
            for (var h = 0; h < 8; h++) {
              c[h] = m[h];
            }
            m[0] = m[0] + 1295307597 + this._b | 0;
            m[1] = m[1] + 3545052371 + (m[0] >>> 0 < c[0] >>> 0 ? 1 : 0) | 0;
            m[2] = m[2] + 886263092 + (m[1] >>> 0 < c[1] >>> 0 ? 1 : 0) | 0;
            m[3] = m[3] + 1295307597 + (m[2] >>> 0 < c[2] >>> 0 ? 1 : 0) | 0;
            m[4] = m[4] + 3545052371 + (m[3] >>> 0 < c[3] >>> 0 ? 1 : 0) | 0;
            m[5] = m[5] + 886263092 + (m[4] >>> 0 < c[4] >>> 0 ? 1 : 0) | 0;
            m[6] = m[6] + 1295307597 + (m[5] >>> 0 < c[5] >>> 0 ? 1 : 0) | 0;
            m[7] = m[7] + 3545052371 + (m[6] >>> 0 < c[6] >>> 0 ? 1 : 0) | 0;
            this._b = m[7] >>> 0 < c[7] >>> 0 ? 1 : 0;
            for (var h = 0; h < 8; h++) {
              var g = x[h] + m[h];
              var E = g & 65535;
              var p = g >>> 16;
              var s = ((E * E >>> 17) + E * p >>> 15) + p * p;
              var f = ((g & 4294901760) * g | 0) + ((g & 65535) * g | 0);
              u[h] = s ^ f;
            }
            x[0] = u[0] + (u[7] << 16 | u[7] >>> 16) + (u[6] << 16 | u[6] >>> 16) | 0;
            x[1] = u[1] + (u[0] << 8 | u[0] >>> 24) + u[7] | 0;
            x[2] = u[2] + (u[1] << 16 | u[1] >>> 16) + (u[0] << 16 | u[0] >>> 16) | 0;
            x[3] = u[3] + (u[2] << 8 | u[2] >>> 24) + u[1] | 0;
            x[4] = u[4] + (u[3] << 16 | u[3] >>> 16) + (u[2] << 16 | u[2] >>> 16) | 0;
            x[5] = u[5] + (u[4] << 8 | u[4] >>> 24) + u[3] | 0;
            x[6] = u[6] + (u[5] << 16 | u[5] >>> 16) + (u[4] << 16 | u[4] >>> 16) | 0;
            x[7] = u[7] + (u[6] << 8 | u[6] >>> 24) + u[5] | 0;
          }
          n.Rabbit = l._createHelper(d);
        })();
        return r.Rabbit;
      });
    })(nl);
  }
  return nl.exports;
}
var ol = {
  exports: {}
};
var Xa;
function jd() {
  if (!Xa) {
    Xa = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), er(), tr(), jt(), pe());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.StreamCipher;
          var i = n.algo;
          var a = [];
          var c = [];
          var u = [];
          var d = i.RabbitLegacy = l.extend({
            _doReset: function () {
              var x = this._key.words;
              var m = this.cfg.iv;
              var h = this._X = [x[0], x[3] << 16 | x[2] >>> 16, x[1], x[0] << 16 | x[3] >>> 16, x[2], x[1] << 16 | x[0] >>> 16, x[3], x[2] << 16 | x[1] >>> 16];
              var g = this._C = [x[2] << 16 | x[2] >>> 16, x[0] & 4294901760 | x[1] & 65535, x[3] << 16 | x[3] >>> 16, x[1] & 4294901760 | x[2] & 65535, x[0] << 16 | x[0] >>> 16, x[2] & 4294901760 | x[3] & 65535, x[1] << 16 | x[1] >>> 16, x[3] & 4294901760 | x[0] & 65535];
              this._b = 0;
              for (var E = 0; E < 4; E++) {
                y.call(this);
              }
              for (var E = 0; E < 8; E++) {
                g[E] ^= h[E + 4 & 7];
              }
              if (m) {
                var p = m.words;
                var s = p[0];
                var f = p[1];
                var v = (s << 8 | s >>> 24) & 16711935 | (s << 24 | s >>> 8) & 4278255360;
                var C = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
                var B = v >>> 16 | C & 4294901760;
                var w = C << 16 | v & 65535;
                g[0] ^= v;
                g[1] ^= B;
                g[2] ^= C;
                g[3] ^= w;
                g[4] ^= v;
                g[5] ^= B;
                g[6] ^= C;
                g[7] ^= w;
                for (var E = 0; E < 4; E++) {
                  y.call(this);
                }
              }
            },
            _doProcessBlock: function (x, m) {
              var h = this._X;
              y.call(this);
              a[0] = h[0] ^ h[5] >>> 16 ^ h[3] << 16;
              a[1] = h[2] ^ h[7] >>> 16 ^ h[5] << 16;
              a[2] = h[4] ^ h[1] >>> 16 ^ h[7] << 16;
              a[3] = h[6] ^ h[3] >>> 16 ^ h[1] << 16;
              for (var g = 0; g < 4; g++) {
                a[g] = (a[g] << 8 | a[g] >>> 24) & 16711935 | (a[g] << 24 | a[g] >>> 8) & 4278255360;
                x[m + g] ^= a[g];
              }
            },
            blockSize: 4,
            ivSize: 2
          });
          function y() {
            var x = this._X;
            var m = this._C;
            for (var h = 0; h < 8; h++) {
              c[h] = m[h];
            }
            m[0] = m[0] + 1295307597 + this._b | 0;
            m[1] = m[1] + 3545052371 + (m[0] >>> 0 < c[0] >>> 0 ? 1 : 0) | 0;
            m[2] = m[2] + 886263092 + (m[1] >>> 0 < c[1] >>> 0 ? 1 : 0) | 0;
            m[3] = m[3] + 1295307597 + (m[2] >>> 0 < c[2] >>> 0 ? 1 : 0) | 0;
            m[4] = m[4] + 3545052371 + (m[3] >>> 0 < c[3] >>> 0 ? 1 : 0) | 0;
            m[5] = m[5] + 886263092 + (m[4] >>> 0 < c[4] >>> 0 ? 1 : 0) | 0;
            m[6] = m[6] + 1295307597 + (m[5] >>> 0 < c[5] >>> 0 ? 1 : 0) | 0;
            m[7] = m[7] + 3545052371 + (m[6] >>> 0 < c[6] >>> 0 ? 1 : 0) | 0;
            this._b = m[7] >>> 0 < c[7] >>> 0 ? 1 : 0;
            for (var h = 0; h < 8; h++) {
              var g = x[h] + m[h];
              var E = g & 65535;
              var p = g >>> 16;
              var s = ((E * E >>> 17) + E * p >>> 15) + p * p;
              var f = ((g & 4294901760) * g | 0) + ((g & 65535) * g | 0);
              u[h] = s ^ f;
            }
            x[0] = u[0] + (u[7] << 16 | u[7] >>> 16) + (u[6] << 16 | u[6] >>> 16) | 0;
            x[1] = u[1] + (u[0] << 8 | u[0] >>> 24) + u[7] | 0;
            x[2] = u[2] + (u[1] << 16 | u[1] >>> 16) + (u[0] << 16 | u[0] >>> 16) | 0;
            x[3] = u[3] + (u[2] << 8 | u[2] >>> 24) + u[1] | 0;
            x[4] = u[4] + (u[3] << 16 | u[3] >>> 16) + (u[2] << 16 | u[2] >>> 16) | 0;
            x[5] = u[5] + (u[4] << 8 | u[4] >>> 24) + u[3] | 0;
            x[6] = u[6] + (u[5] << 16 | u[5] >>> 16) + (u[4] << 16 | u[4] >>> 16) | 0;
            x[7] = u[7] + (u[6] << 8 | u[6] >>> 24) + u[5] | 0;
          }
          n.RabbitLegacy = l._createHelper(d);
        })();
        return r.RabbitLegacy;
      });
    })(ol);
  }
  return ol.exports;
}
var ll = {
  exports: {}
};
var Ya;
function Id() {
  if (!Ya) {
    Ya = 1;
    (function (e, t) {
      (function (r, n, o) {
        e.exports = n(K(), er(), tr(), jt(), pe());
      })($, function (r) {
        (function () {
          var n = r;
          var o = n.lib;
          var l = o.BlockCipher;
          var i = n.algo;
          const a = 16;
          const c = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731];
          const u = [[3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946], [1266315497, 3048417604, 3681880366, 3289982499, 2909710000, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055], [3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504], [976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409000, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462]];
          var d = {
            pbox: [],
            sbox: []
          };
          function y(E, p) {
            let s = p >> 24 & 255;
            let f = p >> 16 & 255;
            let v = p >> 8 & 255;
            let C = p & 255;
            let B = E.sbox[0][s] + E.sbox[1][f];
            B = B ^ E.sbox[2][v];
            B = B + E.sbox[3][C];
            return B;
          }
          function x(E, p, s) {
            let f = p;
            let v = s;
            let C;
            for (let B = 0; B < a; ++B) {
              f = f ^ E.pbox[B];
              v = y(E, f) ^ v;
              C = f;
              f = v;
              v = C;
            }
            C = f;
            f = v;
            v = C;
            v = v ^ E.pbox[a];
            f = f ^ E.pbox[a + 1];
            return {
              left: f,
              right: v
            };
          }
          function m(E, p, s) {
            let f = p;
            let v = s;
            let C;
            for (let B = a + 1; B > 1; --B) {
              f = f ^ E.pbox[B];
              v = y(E, f) ^ v;
              C = f;
              f = v;
              v = C;
            }
            C = f;
            f = v;
            v = C;
            v = v ^ E.pbox[1];
            f = f ^ E.pbox[0];
            return {
              left: f,
              right: v
            };
          }
          function h(E, p, s) {
            for (let w = 0; w < 4; w++) {
              E.sbox[w] = [];
              for (let A = 0; A < 256; A++) {
                E.sbox[w][A] = u[w][A];
              }
            }
            let f = 0;
            for (let w = 0; w < a + 2; w++) {
              E.pbox[w] = c[w] ^ p[f];
              f++;
              if (f >= s) {
                f = 0;
              }
            }
            let v = 0;
            let C = 0;
            let B = 0;
            for (let w = 0; w < a + 2; w += 2) {
              B = x(E, v, C);
              v = B.left;
              C = B.right;
              E.pbox[w] = v;
              E.pbox[w + 1] = C;
            }
            for (let w = 0; w < 4; w++) {
              for (let A = 0; A < 256; A += 2) {
                B = x(E, v, C);
                v = B.left;
                C = B.right;
                E.sbox[w][A] = v;
                E.sbox[w][A + 1] = C;
              }
            }
            return true;
          }
          var g = i.Blowfish = l.extend({
            _doReset: function () {
              if (this._keyPriorReset !== this._key) {
                var E = this._keyPriorReset = this._key;
                var p = E.words;
                var s = E.sigBytes / 4;
                h(d, p, s);
              }
            },
            encryptBlock: function (E, p) {
              var s = x(d, E[p], E[p + 1]);
              E[p] = s.left;
              E[p + 1] = s.right;
            },
            decryptBlock: function (E, p) {
              var s = m(d, E[p], E[p + 1]);
              E[p] = s.left;
              E[p + 1] = s.right;
            },
            blockSize: 2,
            keySize: 4,
            ivSize: 2
          });
          n.Blowfish = l._createHelper(g);
        })();
        return r.Blowfish;
      });
    })(ll);
  }
  return ll.exports;
}
(function (e, t) {
  (function (r, n, o) {
    e.exports = n(K(), X0(), vd(), hd(), er(), md(), tr(), mf(), qi(), yd(), yf(), gd(), Ed(), Cd(), Gi(), Bd(), jt(), pe(), wd(), Fd(), Ad(), Dd(), _d(), kd(), Sd(), zd(), Pd(), Nd(), Rd(), Ld(), Td(), Hd(), Od(), jd(), Id());
  })($, function (r) {
    return r;
  });
})(hf);
var Md = hf.exports;
const gf = Rf(Md);
const Ud = "S4NT4_S3CR3T_K3Y_T0_ENCRYPT_DATA";
function Wd(e) {
  const t = JSON.stringify(e);
  return gf.AES.encrypt(t, Ud).toString();
}
function $d(e, t) {
  const r = Math.floor(Math.random() * 9) + 1;
  const n = `${e}-${t}-${r}`;
  return {
    checksum: gf.SHA256(n).toString(),
    salt: r
  };
}
async function Vd(e, t) {
  const {
    checksum: r,
    salt: n
  } = $d(e, t);
  const l = Wd({
    playerName: e,
    score: t,
    checksum: r,
    salt: n
  });
  try {
    return await (await fetch("/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: l
      })
    })).json();
  } catch (i) {
    console.error("Error submitting score:", i);
    return {
      success: false
    };
  }
}
async function Qd() {
  try {
    return await (await fetch("/api/scores")).json();
  } catch (e) {
    console.error("Error fetching scores:", e);
    return [];
  }
}
const il = 120;
const Za = 160;
const It = 50;
const Kd = 20;
const Ja = 300;
const qd = ({
  score: e,
  flag: t
}) => U.jsxs("div", {
  className: "absolute inset-0 bg-black/75 flex flex-col items-center justify-center z-50 text-white",
  children: [U.jsx("h1", {
    className: "text-4xl font-bold",
    children: "Game Over"
  }), U.jsxs("p", {
    className: "text-2xl mt-4",
    children: ["Your Score: ", e]
  }), t && U.jsxs("div", {
    className: "mt-6 bg-green-500 p-4 rounded-lg",
    children: [U.jsx("p", {
      className: "text-xl font-bold",
      children: "🎉 New Record!"
    }), U.jsxs("p", {
      children: ["Your Flag: ", t]
    })]
  })]
});
function Gd({
  playerName: e,
  onGameOver: t
}) {
  const [r, n] = Y.useState(0);
  const [o, l] = Y.useState(window.innerWidth / 2);
  const [i, a] = Y.useState([]);
  const [c, u] = Y.useState(Kd);
  const [d, y] = Y.useState(null);
  const [x, m] = Y.useState(false);
  const h = Y.useRef();
  const g = Y.useRef(null);
  const E = Y.useRef({
    ArrowLeft: false,
    ArrowRight: false
  });
  const p = Y.useRef(false);
  const s = Y.useRef(0);
  Y.useEffect(() => {
    const v = B => {
      if (B.key === "ArrowLeft" || B.key === "ArrowRight") {
        E.current[B.key] = true;
      }
    };
    const C = B => {
      if (B.key === "ArrowLeft" || B.key === "ArrowRight") {
        E.current[B.key] = false;
      }
    };
    window.addEventListener("keydown", v);
    window.addEventListener("keyup", C);
    return () => {
      window.removeEventListener("keydown", v);
      window.removeEventListener("keyup", C);
    };
  }, []);
  Y.useEffect(() => {
    const C = setInterval(() => {
      if (p.current) {
        return;
      }
      const B = {
        x: Math.random() * (window.innerWidth - It),
        y: -It,
        speed: 2 + Math.random() * 3
      };
      a(w => [...w, B]);
    }, 1000);
    return () => clearInterval(C);
  }, []);
  Y.useEffect(() => {
    const v = C => {
      if (p.current) {
        return;
      }
      g.current ||= C;
      const B = (C - g.current) / 1000;
      g.current = C;
      l(w => {
        let A = w;
        if (E.current.ArrowLeft) {
          A = Math.max(0, w - Ja * B);
        }
        if (E.current.ArrowRight) {
          A = Math.min(window.innerWidth - il, w + Ja * B);
        }
        return A;
      });
      a(w => {
        const A = w.map(k => ({
          ...k,
          y: k.y + k.speed
        })).filter(k => k.y < window.innerHeight);
        A.forEach(k => {
          if (k.y + It > window.innerHeight - Za && k.x + It > o && k.x < o + il) {
            n(F => {
              const D = atob("ODIzNzQ2OS04MjM3NDE5");
              const [z, P] = D.split("-").map(Number);
              const I = z - P;
              const M = F + I;
              s.current = M;
              return M;
            });
            k.y = window.innerHeight + It;
          }
        });
        return A;
      });
      h.current = requestAnimationFrame(v);
    };
    h.current = requestAnimationFrame(v);
    return () => cancelAnimationFrame(h.current);
  }, [o]);
  Y.useEffect(() => {
    const v = setInterval(() => {
      u(C => C <= 1 ? (clearInterval(v), f(), 0) : C - 1);
    }, 1000);
    return () => clearInterval(v);
  }, []);
  const f = async () => {
    p.current = true;
    if (h.current) {
      cancelAnimationFrame(h.current);
    }
    const v = s.current;
    m(true);
    try {
      const C = await Vd(e, v);
      if (C.isNewRecord && C.flag) {
        y(C.flag);
      }
    } catch (C) {
      console.error("Error submitting score:", C);
    }
    setTimeout(() => {
      m(false);
      t(v);
    }, 5000);
  };
  return U.jsxs("div", {
    className: "relative w-full h-screen bg-gradient-to-b from-blue-900 to-blue-600 overflow-hidden",
    children: [U.jsxs("div", {
      className: "absolute top-4 left-4 bg-white/80 rounded-lg p-2 z-10",
      children: [U.jsxs("p", {
        className: "text-xl font-bold",
        children: ["Score: ", r]
      }), U.jsxs("p", {
        className: "text-lg",
        children: ["Time: ", Math.ceil(c), "s"]
      })]
    }), x && U.jsx(qd, {
      score: r,
      flag: d
    }), U.jsx("div", {
      className: "absolute bottom-0",
      style: {
        left: o,
        width: il,
        height: Za
      },
      children: U.jsx("img", {
        src: "/images/hotte.png",
        alt: "Santa",
        className: "w-full h-full object-contain"
      })
    }), i.map((v, C) => U.jsx("div", {
      className: "absolute",
      style: {
        left: v.x,
        top: v.y,
        width: It,
        height: It
      },
      children: U.jsx(vf, {
        className: "w-full h-full text-red-500"
      })
    }, C))]
  });
}
function Xd({
  onPlayAgain: e
}) {
  const [t, r] = Y.useState([]);
  Y.useEffect(() => {
    (async () => {
      const o = await Qd();
      r(o);
    })();
  }, []);
  return U.jsx("div", {
    className: "min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 flex items-center justify-center p-8",
    children: U.jsxs("div", {
      className: "bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col h-full max-h-[90vh]",
      children: [U.jsxs("div", {
        className: "flex items-center justify-center p-6 border-b",
        children: [U.jsx(sd, {
          className: "w-12 h-12 text-yellow-500 mr-3"
        }), U.jsx("h2", {
          className: "text-3xl font-bold text-gray-800",
          children: "High Scores"
        })]
      }), U.jsx("div", {
        className: "flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar",
        children: t.map((n, o) => U.jsxs("div", {
          className: `flex items-center justify-between p-4 rounded-lg ${o === 0 ? "bg-yellow-100" : o === 1 ? "bg-gray-100" : o === 2 ? "bg-orange-100" : "bg-white"}`,
          children: [U.jsxs("div", {
            className: "flex items-center",
            children: [U.jsx("span", {
              className: "text-2xl font-bold mr-4 w-8",
              children: o + 1
            }), U.jsxs("div", {
              children: [U.jsx("span", {
                className: "text-xl",
                children: n.playerName
              }), U.jsx("div", {
                className: "text-sm text-gray-500",
                children: new Date(n.timestamp).toLocaleDateString()
              })]
            })]
          }), U.jsx("span", {
            className: "text-xl font-bold",
            children: n.score
          })]
        }, o))
      }), U.jsx("button", {
        onClick: e,
        className: "mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors",
        children: "Play Again"
      })]
    })
  });
}
const ba = "christmasGameScores";
function Yd() {
  const [e, t] = Y.useState("start");
  const [r, n] = Y.useState("");
  const [o, l] = Y.useState(() => {
    const u = localStorage.getItem(ba);
    if (u) {
      return JSON.parse(u);
    } else {
      return [];
    }
  });
  Y.useEffect(() => {
    localStorage.setItem(ba, JSON.stringify(o));
  }, [o]);
  const i = u => {
    n(u);
    t("playing");
  };
  const a = u => {
    l(d => [...d, {
      name: r,
      score: u
    }]);
    t("end");
  };
  const c = () => {
    t("start");
  };
  return U.jsxs("div", {
    className: "w-full h-screen",
    children: [e === "start" && U.jsx(cd, {
      onStart: i
    }), e === "playing" && U.jsx(Gd, {
      playerName: r,
      onGameOver: a
    }), e === "end" && U.jsx(Xd, {
      onPlayAgain: c
    })]
  });
}
df(document.getElementById("root")).render(U.jsx(Y.StrictMode, {
  children: U.jsx(Yd, {})
}));