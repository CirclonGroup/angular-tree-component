!(function(e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(
        exports,
        require('@angular/core'),
        require('@angular/common'),
        require('mobx')
      )
    : 'function' == typeof define && define.amd
    ? define(['exports', '@angular/core', '@angular/common', 'mobx'], t)
    : t(
        (e['angular-tree-component'] = e['angular-tree-component'] || {}),
        e._angular_core,
        e._angular_common,
        e.mobx
      );
})(this, function(e, t, n, o) {
  'use strict';
  function r(e, t, n) {
    switch (n.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, n[0]);
      case 2:
        return e.call(t, n[0], n[1]);
      case 3:
        return e.call(t, n[0], n[1], n[2]);
    }
    return e.apply(t, n);
  }
  function i(e) {
    return e;
  }
  function a(e, t, n) {
    return (
      (t = xn(void 0 === t ? e.length - 1 : t, 0)),
      function() {
        for (
          var o = arguments, r = -1, i = xn(o.length - t, 0), a = Array(i);
          ++r < i;

        )
          a[r] = o[t + r];
        r = -1;
        for (var s = Array(t + 1); ++r < t; ) s[r] = o[r];
        return (s[t] = n(a)), _n(e, this, s);
      }
    );
  }
  function s(e) {
    return function() {
      return e;
    };
  }
  function c(e, t) {
    return (t = { exports: {} }), e(t, t.exports), t.exports;
  }
  function d(e) {
    var t = $n.call(e, Un),
      n = e[Un];
    try {
      e[Un] = void 0;
      var o = !0;
    } catch (e) {}
    var r = zn.call(e);
    return o && (t ? (e[Un] = n) : delete e[Un]), r;
  }
  function p(e) {
    return Zn.call(e);
  }
  function l(e) {
    return null == e
      ? void 0 === e
        ? Qn
        : Jn
      : eo && eo in Object(e)
      ? Kn(e)
      : Xn(e);
  }
  function u(e) {
    var t = typeof e;
    return null != e && ('object' == t || 'function' == t);
  }
  function f(e) {
    if (!ro(e)) return !1;
    var t = oo(e);
    return t == ao || t == so || t == io || t == co;
  }
  function h(e) {
    return !!yo && yo in e;
  }
  function y(e) {
    if (null != e) {
      try {
        return bo.call(e);
      } catch (e) {}
      try {
        return e + '';
      } catch (e) {}
    }
    return '';
  }
  function g(e) {
    return !(!No(e) || jo(e)) && (Oo(e) ? Ro : Do).test(Eo(e));
  }
  function v(e, t) {
    return null == e ? void 0 : e[t];
  }
  function b(e, t) {
    var n = Fo(e, t);
    return So(n) ? n : void 0;
  }
  function m(e) {
    var t = 0,
      n = 0;
    return function() {
      var o = Wo(),
        r = Go - (o - n);
      if (((n = o), r > 0)) {
        if (++t >= Uo) return arguments[0];
      } else t = 0;
      return e.apply(void 0, arguments);
    };
  }
  function O(e, t) {
    return er(Qo(e, t, Jo), e + '');
  }
  function j() {
    (this.__data__ = []), (this.size = 0);
  }
  function N(e, t) {
    return e === t || (e !== e && t !== t);
  }
  function E(e, t) {
    for (var n = e.length; n--; ) if (rr(e[n][0], t)) return n;
    return -1;
  }
  function w(e) {
    var t = this.__data__,
      n = ar(t, e);
    return (
      !(n < 0) &&
      (n == t.length - 1 ? t.pop() : cr.call(t, n, 1), --this.size, !0)
    );
  }
  function D(e) {
    var t = this.__data__,
      n = pr(t, e);
    return n < 0 ? void 0 : t[n][1];
  }
  function _(e) {
    return ur(this.__data__, e) > -1;
  }
  function x(e, t) {
    var n = this.__data__,
      o = hr(n, e);
    return o < 0 ? (++this.size, n.push([e, t])) : (n[o][1] = t), this;
  }
  function I(e) {
    var t = -1,
      n = null == e ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var o = e[t];
      this.set(o[0], o[1]);
    }
  }
  function C() {
    (this.__data__ = new Nr()), (this.size = 0);
  }
  function R(e) {
    var t = this.__data__,
      n = t.delete(e);
    return (this.size = t.size), n;
  }
  function A(e) {
    return this.__data__.get(e);
  }
  function P(e) {
    return this.__data__.has(e);
  }
  function S() {
    (this.__data__ = Fr ? Fr(null) : {}), (this.size = 0);
  }
  function F(e) {
    var t = this.has(e) && delete this.__data__[e];
    return (this.size -= t ? 1 : 0), t;
  }
  function T(e) {
    var t = this.__data__;
    if (Lr) {
      var n = t[e];
      return n === kr ? void 0 : n;
    }
    return Hr.call(t, e) ? t[e] : void 0;
  }
  function M(e) {
    var t = this.__data__;
    return $r ? void 0 !== t[e] : Ur.call(t, e);
  }
  function L(e, t) {
    var n = this.__data__;
    return (
      (this.size += this.has(e) ? 0 : 1),
      (n[e] = Wr && void 0 === t ? Zr : t),
      this
    );
  }
  function k(e) {
    var t = -1,
      n = null == e ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var o = e[t];
      this.set(o[0], o[1]);
    }
  }
  function V() {
    (this.size = 0),
      (this.__data__ = {
        hash: new ti(),
        map: new (oi || ni)(),
        string: new ti()
      });
  }
  function H(e) {
    var t = typeof e;
    return 'string' == t || 'number' == t || 'symbol' == t || 'boolean' == t
      ? '__proto__' !== e
      : null === e;
  }
  function B(e, t) {
    var n = e.__data__;
    return ai(t) ? n['string' == typeof t ? 'string' : 'hash'] : n.map;
  }
  function $(e) {
    var t = ci(this, e).delete(e);
    return (this.size -= t ? 1 : 0), t;
  }
  function z(e) {
    return pi(this, e).get(e);
  }
  function U(e) {
    return ui(this, e).has(e);
  }
  function G(e, t) {
    var n = hi(this, e),
      o = n.size;
    return n.set(e, t), (this.size += n.size == o ? 0 : 1), this;
  }
  function W(e) {
    var t = -1,
      n = null == e ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var o = e[t];
      this.set(o[0], o[1]);
    }
  }
  function Z(e, t) {
    var n = this.__data__;
    if (n instanceof Ni) {
      var o = n.__data__;
      if (!Ei || o.length < Di - 1)
        return o.push([e, t]), (this.size = ++n.size), this;
      n = this.__data__ = new wi(o);
    }
    return n.set(e, t), (this.size = n.size), this;
  }
  function Y(e) {
    var t = (this.__data__ = new xi(e));
    this.size = t.size;
  }
  function q(e, t, n) {
    '__proto__' == t && Fi
      ? Fi(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
      : (e[t] = n);
  }
  function K(e, t, n) {
    ((void 0 === n || Li(e[t], n)) && (void 0 !== n || t in e)) || Mi(e, t, n);
  }
  function X(e) {
    return function(t, n, o) {
      for (var r = -1, i = Object(t), a = o(t), s = a.length; s--; ) {
        var c = a[e ? s : ++r];
        if (!1 === n(i[c], c, i)) break;
      }
      return t;
    };
  }
  function J(e) {
    var t = new e.constructor(e.byteLength);
    return new Zi(t).set(new Zi(e)), t;
  }
  function Q(e, t) {
    var n = t ? qi(e.buffer) : e.buffer;
    return new e.constructor(n, e.byteOffset, e.length);
  }
  function ee(e, t) {
    var n = -1,
      o = e.length;
    for (t || (t = Array(o)); ++n < o; ) t[n] = e[n];
    return t;
  }
  function te(e, t) {
    return function(n) {
      return e(t(n));
    };
  }
  function ne(e) {
    var t = e && e.constructor;
    return e === (('function' == typeof t && t.prototype) || aa);
  }
  function oe(e) {
    return 'function' != typeof e.constructor || pa(e) ? {} : ca(da(e));
  }
  function re(e) {
    return null != e && 'object' == typeof e;
  }
  function ie(e) {
    return ha(e) && fa(e) == ya;
  }
  function ae(e) {
    return 'number' == typeof e && e > -1 && e % 1 == 0 && e <= _a;
  }
  function se(e) {
    return null != e && Ca(e.length) && !Ia(e);
  }
  function ce(e) {
    return Pa(e) && Aa(e);
  }
  function de() {
    return !1;
  }
  function pe(e) {
    if (!ka(e) || Ma(e) != Va) return !1;
    var t = La(e);
    if (null === t) return !0;
    var n = za.call(t, 'constructor') && t.constructor;
    return 'function' == typeof n && n instanceof n && $a.call(n) == Ua;
  }
  function le(e) {
    return Ya(e) && Za(e.length) && !!qa[Wa(e)];
  }
  function ue(e) {
    return function(t) {
      return e(t);
    };
  }
  function fe(e, t) {
    if ('__proto__' != t) return e[t];
  }
  function he(e, t, n) {
    var o = e[t];
    (ds.call(e, t) && ss(o, n) && (void 0 !== n || t in e)) || as(e, t, n);
  }
  function ye(e, t, n, o) {
    var r = !n;
    n || (n = {});
    for (var i = -1, a = t.length; ++i < a; ) {
      var s = t[i],
        c = o ? o(n[s], e[s], s, n, e) : void 0;
      void 0 === c && (c = e[s]), r ? us(n, s, c) : ls(n, s, c);
    }
    return n;
  }
  function ge(e, t) {
    for (var n = -1, o = Array(e); ++n < e; ) o[n] = t(n);
    return o;
  }
  function ve(e, t) {
    var n = typeof e;
    return (
      !!(t = null == t ? ys : t) &&
      ('number' == n || ('symbol' != n && gs.test(e))) &&
      e > -1 &&
      e % 1 == 0 &&
      e < t
    );
  }
  function be(e, t) {
    var n = Os(e),
      o = !n && ms(e),
      r = !n && !o && js(e),
      i = !n && !o && !r && Es(e),
      a = n || o || r || i,
      s = a ? bs(e.length, String) : [],
      c = s.length;
    for (var d in e)
      (!t && !Ds.call(e, d)) ||
        (a &&
          ('length' == d ||
            (r && ('offset' == d || 'parent' == d)) ||
            (i && ('buffer' == d || 'byteLength' == d || 'byteOffset' == d)) ||
            Ns(d, c))) ||
        s.push(d);
    return s;
  }
  function me(e) {
    var t = [];
    if (null != e) for (var n in Object(e)) t.push(n);
    return t;
  }
  function Oe(e) {
    if (!Is(e)) return Rs(e);
    var t = Cs(e),
      n = [];
    for (var o in e) ('constructor' != o || (!t && Ps.call(e, o))) && n.push(o);
    return n;
  }
  function je(e) {
    return Ms(e) ? Fs(e, !0) : Ts(e);
  }
  function Ne(e) {
    return ks(e, Vs(e));
  }
  function Ee(e, t, n, o, r, i, a) {
    var s = ec(e, n),
      c = ec(t, n),
      d = a.get(c);
    if (d) return void Bs(e, n, d);
    var p = i ? i(s, c, n + '', e, t, a) : void 0,
      l = void 0 === p;
    if (l) {
      var u = Zs(c),
        f = !u && qs(c),
        h = !u && !f && Qs(c);
      (p = c),
        u || f || h
          ? Zs(s)
            ? (p = s)
            : Ys(s)
            ? (p = Us(s))
            : f
            ? ((l = !1), (p = $s(c, !0)))
            : h
            ? ((l = !1), (p = zs(c, !0)))
            : (p = [])
          : Js(c) || Ws(c)
          ? ((p = s), Ws(s) ? (p = tc(s)) : (Xs(s) && !Ks(s)) || (p = Gs(c)))
          : (l = !1);
    }
    l && (a.set(c, p), r(p, c, o, i, a), a.delete(c)), Bs(e, n, p);
  }
  function we(e, t, n, o, r) {
    e !== t &&
      ic(
        t,
        function(i, a) {
          if (sc(i)) r || (r = new oc()), ac(e, t, a, n, we, o, r);
          else {
            var s = o ? o(dc(e, a), i, a + '', e, t, r) : void 0;
            void 0 === s && (s = i), rc(e, a, s);
          }
        },
        cc
      );
  }
  function De(e, t, n, o, r, i) {
    return (
      uc(e) && uc(t) && (i.set(t, e), lc(e, t, void 0, De, i), i.delete(t)), e
    );
  }
  function _e(e, t, n) {
    if (!vc(n)) return !1;
    var o = typeof t;
    return (
      !!('number' == o ? yc(n) && gc(t, n.length) : 'string' == o && t in n) &&
      hc(n[t], e)
    );
  }
  function xe(e) {
    return mc(function(t, n) {
      var o = -1,
        r = n.length,
        i = r > 1 ? n[r - 1] : void 0,
        a = r > 2 ? n[2] : void 0;
      for (
        i = e.length > 3 && 'function' == typeof i ? (r--, i) : void 0,
          a && Oc(n[0], n[1], a) && ((i = r < 3 ? void 0 : i), (r = 1)),
          t = Object(t);
        ++o < r;

      ) {
        var s = n[o];
        s && e(t, s, o, i);
      }
      return t;
    });
  }
  function Ie(e) {
    return 'symbol' == typeof e || (Sc(e) && Pc(e) == Fc);
  }
  function Ce(e, t) {
    if (Mc(e)) return !1;
    var n = typeof e;
    return (
      !(
        'number' != n &&
        'symbol' != n &&
        'boolean' != n &&
        null != e &&
        !Lc(e)
      ) ||
      Vc.test(e) || !kc.test(e) || (null != t && e in Object(t))
    );
  }
  function Re(e, t) {
    if ('function' != typeof e || (null != t && 'function' != typeof t))
      throw new TypeError($c);
    var n = function() {
      var o = arguments,
        r = t ? t.apply(this, o) : o[0],
        i = n.cache;
      if (i.has(r)) return i.get(r);
      var a = e.apply(this, o);
      return (n.cache = i.set(r, a) || i), a;
    };
    return (n.cache = new (Re.Cache || Bc)()), n;
  }
  function Ae(e) {
    var t = Uc(e, function(e) {
        return n.size === Gc && n.clear(), e;
      }),
      n = t.cache;
    return t;
  }
  function Pe(e, t) {
    for (var n = -1, o = null == e ? 0 : e.length, r = Array(o); ++n < o; )
      r[n] = t(e[n], n, e);
    return r;
  }
  function Se(e) {
    if ('string' == typeof e) return e;
    if (td(e)) return ed(e, Se) + '';
    if (nd(e)) return id ? id.call(e) : '';
    var t = e + '';
    return '0' == t && 1 / e == -od ? '-0' : t;
  }
  function Fe(e) {
    return null == e ? '' : sd(e);
  }
  function Te(e, t) {
    return dd(e) ? e : pd(e, t) ? [e] : ld(ud(e));
  }
  function Me(e) {
    if ('string' == typeof e || hd(e)) return e;
    var t = e + '';
    return '0' == t && 1 / e == -yd ? '-0' : t;
  }
  function Le(e, t) {
    t = vd(t, e);
    for (var n = 0, o = t.length; null != e && n < o; ) e = e[bd(t[n++])];
    return n && n == o ? e : void 0;
  }
  function ke(e, t, n) {
    var o = null == e ? void 0 : Od(e, t);
    return void 0 === o ? n : o;
  }
  function Ve(e, t) {
    for (
      var n = -1, o = null == e ? 0 : e.length;
      ++n < o && !1 !== t(e[n], n, e);

    );
    return e;
  }
  function He(e) {
    if (!_d(e)) return xd(e);
    var t = [];
    for (var n in Object(e)) Cd.call(e, n) && 'constructor' != n && t.push(n);
    return t;
  }
  function Be(e) {
    return Sd(e) ? Ad(e) : Pd(e);
  }
  function $e(e, t) {
    return e && Td(t, Md(t), e);
  }
  function ze(e, t) {
    return e && kd(t, Vd(t), e);
  }
  function Ue(e, t) {
    for (var n = -1, o = null == e ? 0 : e.length, r = 0, i = []; ++n < o; ) {
      var a = e[n];
      t(a, n, e) && (i[r++] = a);
    }
    return i;
  }
  function Ge() {
    return [];
  }
  function We(e, t) {
    return Kd(e, Xd(e), t);
  }
  function Ze(e, t) {
    for (var n = -1, o = t.length, r = e.length; ++n < o; ) e[r + n] = t[n];
    return e;
  }
  function Ye(e, t) {
    return sp(e, cp(e), t);
  }
  function qe(e, t, n) {
    var o = t(e);
    return lp(e) ? o : pp(o, n(e));
  }
  function Ke(e) {
    return fp(e, yp, hp);
  }
  function Xe(e) {
    return vp(e, mp, bp);
  }
  function Je(e) {
    var t = e.length,
      n = new e.constructor(t);
    return (
      t &&
        'string' == typeof e[0] &&
        Jp.call(e, 'index') &&
        ((n.index = e.index), (n.input = e.input)),
      n
    );
  }
  function Qe(e, t) {
    var n = t ? el(e.buffer) : e.buffer;
    return new e.constructor(n, e.byteOffset, e.byteLength);
  }
  function et(e) {
    var t = new e.constructor(e.source, nl.exec(e));
    return (t.lastIndex = e.lastIndex), t;
  }
  function tt(e) {
    return al ? Object(al.call(e)) : {};
  }
  function nt(e, t, n) {
    var o = e.constructor;
    switch (t) {
      case jl:
        return cl(e);
      case fl:
      case hl:
        return new o(+e);
      case Nl:
        return dl(e, n);
      case El:
      case wl:
      case Dl:
      case _l:
      case xl:
      case Il:
      case Cl:
      case Rl:
      case Al:
        return ul(e, n);
      case yl:
        return new o();
      case gl:
      case ml:
        return new o(e);
      case vl:
        return pl(e);
      case bl:
        return new o();
      case Ol:
        return ll(e);
    }
  }
  function ot(e) {
    return Fl(e) && Sl(e) == Tl;
  }
  function rt(e) {
    return Ul(e) && zl(e) == Gl;
  }
  function it(e, t, n, o, r, i) {
    var a,
      s = t & Ou,
      c = t & ju,
      d = t & Nu;
    if ((n && (a = r ? n(e, o, r, i) : n(e)), void 0 !== a)) return a;
    if (!vu(e)) return e;
    var p = hu(e);
    if (p) {
      if (((a = lu(e)), !s)) return iu(e, a);
    } else {
      var l = pu(e),
        u = l == wu || l == Du;
      if (yu(e)) return ru(e, s);
      if (l == _u || l == Eu || (u && !r)) {
        if (((a = c || u ? {} : fu(e)), !s))
          return c ? su(e, ou(a, e)) : au(e, nu(a, e));
      } else {
        if (!xu[l]) return r ? e : {};
        a = uu(e, l, s);
      }
    }
    i || (i = new Ql());
    var f = i.get(e);
    if (f) return f;
    if ((i.set(e, a), bu(e)))
      return (
        e.forEach(function(o) {
          a.add(it(o, t, n, o, e, i));
        }),
        a
      );
    if (gu(e))
      return (
        e.forEach(function(o, r) {
          a.set(r, it(o, t, n, r, e, i));
        }),
        a
      );
    var h = d ? (c ? du : cu) : c ? keysIn : mu,
      y = p ? void 0 : h(e);
    return (
      eu(y || e, function(o, r) {
        y && ((r = o), (o = e[r])), tu(a, r, it(o, t, n, r, e, i));
      }),
      a
    );
  }
  function at(e) {
    var t = null == e ? 0 : e.length;
    return t ? e[t - 1] : void 0;
  }
  function st(e, t, n) {
    var o = -1,
      r = e.length;
    t < 0 && (t = -t > r ? 0 : r + t),
      (n = n > r ? r : n),
      n < 0 && (n += r),
      (r = t > n ? 0 : (n - t) >>> 0),
      (t >>>= 0);
    for (var i = Array(r); ++o < r; ) i[o] = e[o + t];
    return i;
  }
  function ct(e, t) {
    return t.length < 2 ? e : Pu(e, Su(t, 0, -1));
  }
  function dt(e, t) {
    return (t = Tu(t, e)), null == (e = Lu(e, t)) || delete e[ku(Mu(t))];
  }
  function pt(e) {
    return Hu(e) ? void 0 : e;
  }
  function lt(e) {
    return Uu(e) || zu(e) || !!(Gu && e && e[Gu]);
  }
  function ut(e, t, n, o, r) {
    var i = -1,
      a = e.length;
    for (n || (n = Yu), r || (r = []); ++i < a; ) {
      var s = e[i];
      t > 0 && n(s)
        ? t > 1
          ? ut(s, t - 1, n, o, r)
          : Zu(r, s)
        : o || (r[r.length] = s);
    }
    return r;
  }
  function ft(e) {
    return (null == e ? 0 : e.length) ? Ku(e, 1) : [];
  }
  function ht(e) {
    return ef(Qu(e, void 0, Ju), e + '');
  }
  function yt(e) {
    return 'number' == typeof e || (hf(e) && ff(e) == yf);
  }
  function gt(e) {
    return e && e.length ? e[0] : void 0;
  }
  function vt(e, t) {
    for (var n = -1, o = null == e ? 0 : e.length; ++n < o; )
      if (t(e[n], n, e)) return !0;
    return !1;
  }
  function bt(e) {
    return this.__data__.set(e, Hf), this;
  }
  function mt(e) {
    return this.__data__.has(e);
  }
  function Ot(e) {
    var t = -1,
      n = null == e ? 0 : e.length;
    for (this.__data__ = new zf(); ++t < n; ) this.add(e[t]);
  }
  function jt(e, t) {
    return e.has(t);
  }
  function Nt(e, t, n, o, r, i) {
    var a = n & Xf,
      s = e.length,
      c = t.length;
    if (s != c && !(a && c > s)) return !1;
    var d = i.get(e);
    if (d && i.get(t)) return d == t;
    var p = -1,
      l = !0,
      u = n & Jf ? new Yf() : void 0;
    for (i.set(e, t), i.set(t, e); ++p < s; ) {
      var f = e[p],
        h = t[p];
      if (o) var y = a ? o(h, f, p, t, e, i) : o(f, h, p, e, t, i);
      if (void 0 !== y) {
        if (y) continue;
        l = !1;
        break;
      }
      if (u) {
        if (
          !qf(t, function(e, t) {
            if (!Kf(u, t) && (f === e || r(f, e, n, o, i))) return u.push(t);
          })
        ) {
          l = !1;
          break;
        }
      } else if (f !== h && !r(f, h, n, o, i)) {
        l = !1;
        break;
      }
    }
    return i.delete(e), i.delete(t), l;
  }
  function Et(e) {
    var t = -1,
      n = Array(e.size);
    return (
      e.forEach(function(e, o) {
        n[++t] = [o, e];
      }),
      n
    );
  }
  function wt(e) {
    var t = -1,
      n = Array(e.size);
    return (
      e.forEach(function(e) {
        n[++t] = e;
      }),
      n
    );
  }
  function Dt(e, t, n, o, r, i, a) {
    switch (n) {
      case Oh:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
          return !1;
        (e = e.buffer), (t = t.buffer);
      case mh:
        return !(e.byteLength != t.byteLength || !i(new oh(e), new oh(t)));
      case ph:
      case lh:
      case hh:
        return rh(+e, +t);
      case uh:
        return e.name == t.name && e.message == t.message;
      case yh:
      case vh:
        return e == t + '';
      case fh:
        var s = ah;
      case gh:
        var c = o & ch;
        if ((s || (s = sh), e.size != t.size && !c)) return !1;
        var d = a.get(e);
        if (d) return d == t;
        (o |= dh), a.set(e, t);
        var p = ih(s(e), s(t), o, r, i, a);
        return a.delete(e), p;
      case bh:
        if (Nh) return Nh.call(e) == Nh.call(t);
    }
    return !1;
  }
  function _t(e, t, n, o, r, i) {
    var a = n & Dh,
      s = wh(e),
      c = s.length;
    if (c != wh(t).length && !a) return !1;
    for (var d = c; d--; ) {
      var p = s[d];
      if (!(a ? p in t : xh.call(t, p))) return !1;
    }
    var l = i.get(e);
    if (l && i.get(t)) return l == t;
    var u = !0;
    i.set(e, t), i.set(t, e);
    for (var f = a; ++d < c; ) {
      p = s[d];
      var h = e[p],
        y = t[p];
      if (o) var g = a ? o(y, h, p, t, e, i) : o(h, y, p, e, t, i);
      if (!(void 0 === g ? h === y || r(h, y, n, o, i) : g)) {
        u = !1;
        break;
      }
      f || (f = 'constructor' == p);
    }
    if (u && !f) {
      var v = e.constructor,
        b = t.constructor;
      v != b &&
        'constructor' in e &&
        'constructor' in t &&
        !(
          'function' == typeof v &&
          v instanceof v &&
          'function' == typeof b &&
          b instanceof b
        ) &&
        (u = !1);
    }
    return i.delete(e), i.delete(t), u;
  }
  function xt(e, t, n, o, r, i) {
    var a = Fh(e),
      s = Fh(t),
      c = a ? Vh : Sh(e),
      d = s ? Vh : Sh(t);
    (c = c == kh ? Hh : c), (d = d == kh ? Hh : d);
    var p = c == Hh,
      l = d == Hh,
      u = c == d;
    if (u && Th(e)) {
      if (!Th(t)) return !1;
      (a = !0), (p = !1);
    }
    if (u && !p)
      return (
        i || (i = new Ch()),
        a || Mh(e) ? Rh(e, t, n, o, r, i) : Ah(e, t, c, n, o, r, i)
      );
    if (!(n & Lh)) {
      var f = p && $h.call(e, '__wrapped__'),
        h = l && $h.call(t, '__wrapped__');
      if (f || h) {
        var y = f ? e.value() : e,
          g = h ? t.value() : t;
        return i || (i = new Ch()), r(y, g, n, o, i);
      }
    }
    return !!u && (i || (i = new Ch()), Ph(e, t, n, o, r, i));
  }
  function It(e, t, n, o, r) {
    return (
      e === t ||
      (null == e || null == t || (!Gh(e) && !Gh(t))
        ? e !== e && t !== t
        : Uh(e, t, n, o, It, r))
    );
  }
  function Ct(e, t, n, o) {
    var r = n.length,
      i = r,
      a = !o;
    if (null == e) return !i;
    for (e = Object(e); r--; ) {
      var s = n[r];
      if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
    }
    for (; ++r < i; ) {
      s = n[r];
      var c = s[0],
        d = e[c],
        p = s[1];
      if (a && s[2]) {
        if (void 0 === d && !(c in e)) return !1;
      } else {
        var l = new Zh();
        if (o) var u = o(d, p, c, e, t, l);
        if (!(void 0 === u ? Yh(p, d, qh | Kh, o, l) : u)) return !1;
      }
    }
    return !0;
  }
  function Rt(e) {
    return e === e && !Jh(e);
  }
  function At(e) {
    for (var t = ty(e), n = t.length; n--; ) {
      var o = t[n],
        r = e[o];
      t[n] = [o, r, ey(r)];
    }
    return t;
  }
  function Pt(e, t) {
    return function(n) {
      return null != n && n[e] === t && (void 0 !== t || e in Object(n));
    };
  }
  function St(e) {
    var t = iy(e);
    return 1 == t.length && t[0][2]
      ? ay(t[0][0], t[0][1])
      : function(n) {
          return n === e || ry(n, e, t);
        };
  }
  function Ft(e, t) {
    return null != e && t in Object(e);
  }
  function Tt(e, t, n) {
    t = dy(t, e);
    for (var o = -1, r = t.length, i = !1; ++o < r; ) {
      var a = hy(t[o]);
      if (!(i = null != e && n(e, a))) break;
      e = e[a];
    }
    return i || ++o != r
      ? i
      : !!(r = null == e ? 0 : e.length) &&
          fy(r) &&
          uy(a, r) &&
          (ly(e) || py(e));
  }
  function Mt(e, t) {
    return null != e && vy(e, t, gy);
  }
  function Lt(e, t) {
    return Ny(e) && Ey(t)
      ? wy(Dy(e), t)
      : function(n) {
          var o = Oy(n, e);
          return void 0 === o && o === t ? jy(n, e) : my(t, o, _y | xy);
        };
  }
  function kt(e) {
    return function(t) {
      return null == t ? void 0 : t[e];
    };
  }
  function Vt(e) {
    return function(t) {
      return Ry(t, e);
    };
  }
  function Ht(e) {
    return Fy(e) ? Py(Ty(e)) : Sy(e);
  }
  function Bt(e) {
    return 'function' == typeof e
      ? e
      : null == e
      ? Vy
      : 'object' == typeof e
      ? Hy(e)
        ? ky(e[0], e[1])
        : Ly(e)
      : By(e);
  }
  function $t(e, t) {
    return e && zy(e, t, Uy);
  }
  function zt(e, t) {
    return function(n, o) {
      if (null == n) return n;
      if (!Wy(n)) return e(n, o);
      for (
        var r = n.length, i = t ? r : -1, a = Object(n);
        (t ? i-- : ++i < r) && !1 !== o(a[i], i, a);

      );
      return n;
    };
  }
  function Ut(e, t) {
    var n;
    return (
      Jy(e, function(e, o, r) {
        return !(n = t(e, o, r));
      }),
      !!n
    );
  }
  function Gt(e, t, n) {
    var o = og(e) ? eg : ng;
    return n && rg(e, t, n) && (t = void 0), o(e, tg(t, 3));
  }
  function Wt(e, t) {
    for (var n = -1, o = null == e ? 0 : e.length; ++n < o; )
      if (!t(e[n], n, e)) return !1;
    return !0;
  }
  function Zt(e, t) {
    var n = !0;
    return (
      sg(e, function(e, o, r) {
        return (n = !!t(e, o, r));
      }),
      n
    );
  }
  function Yt(e, t, n) {
    var o = ug(e) ? dg : pg;
    return n && fg(e, t, n) && (t = void 0), o(e, lg(t, 3));
  }
  function qt() {
    return Math.floor(1e13 * Math.random());
  }
  function Kt(e) {
    for (var t = -1, n = null == e ? 0 : e.length, o = 0, r = []; ++t < n; ) {
      var i = e[t];
      i && (r[o++] = i);
    }
    return r;
  }
  function Xt(e) {
    return function(t, n, o) {
      var r = Object(t);
      if (!Og(t)) {
        var i = mg(n, 3);
        (t = jg(t)),
          (n = function(e) {
            return i(r[e], e, r);
          });
      }
      var a = e(t, n, o);
      return a > -1 ? r[i ? t[a] : a] : void 0;
    };
  }
  function Jt(e, t, n, o) {
    for (var r = e.length, i = n + (o ? 1 : -1); o ? i-- : ++i < r; )
      if (t(e[i], i, e)) return i;
    return -1;
  }
  function Qt(e) {
    if ('number' == typeof e) return e;
    if (Dg(e)) return _g;
    if (wg(e)) {
      var t = 'function' == typeof e.valueOf ? e.valueOf() : e;
      e = wg(t) ? t + '' : t;
    }
    if ('string' != typeof e) return 0 === e ? e : +e;
    e = e.replace(xg, '');
    var n = Cg.test(e);
    return n || Rg.test(e) ? Ag(e.slice(2), n ? 2 : 8) : Ig.test(e) ? _g : +e;
  }
  function en(e) {
    if (!e) return 0 === e ? e : 0;
    if ((e = Sg(e)) === Fg || e === -Fg) {
      return (e < 0 ? -1 : 1) * Tg;
    }
    return e === e ? e : 0;
  }
  function tn(e) {
    var t = Lg(e),
      n = t % 1;
    return t === t ? (n ? t - n : t) : 0;
  }
  function nn(e, t, n) {
    var o = null == e ? 0 : e.length;
    if (!o) return -1;
    var r = null == n ? 0 : Bg(n);
    return r < 0 && (r = $g(o + r, 0)), Vg(e, Hg(t, 3), r);
  }
  function on(e) {
    return 'string' == typeof e || (!qg(e) && Kg(e) && Yg(e) == Xg);
  }
  function rn(e, t, n) {
    void 0 === n && (n = 0);
    for (var o = n, r = e.length - 1; o !== r; ) {
      var i = Math.floor((o + r) / 2);
      t(e[i]) ? (r = i) : (o = o === i ? r : i);
    }
    return o;
  }
  function an(e, t, n) {
    function o(t) {
      var n = u,
        o = f;
      return (u = f = void 0), (b = t), (y = e.apply(o, n));
    }
    function r(e) {
      return (b = e), (g = setTimeout(s, t)), m ? o(e) : y;
    }
    function i(e) {
      var n = e - v,
        o = e - b,
        r = t - n;
      return O ? bv(r, h - o) : r;
    }
    function a(e) {
      var n = e - v,
        o = e - b;
      return void 0 === v || n >= t || n < 0 || (O && o >= h);
    }
    function s() {
      var e = hv();
      if (a(e)) return c(e);
      g = setTimeout(s, i(e));
    }
    function c(e) {
      return (g = void 0), j && u ? o(e) : ((u = f = void 0), y);
    }
    function d() {
      void 0 !== g && clearTimeout(g), (b = 0), (u = v = f = g = void 0);
    }
    function p() {
      return void 0 === g ? y : c(hv());
    }
    function l() {
      var e = hv(),
        n = a(e);
      if (((u = arguments), (f = this), (v = e), n)) {
        if (void 0 === g) return r(v);
        if (O) return (g = setTimeout(s, t)), o(v);
      }
      return void 0 === g && (g = setTimeout(s, t)), y;
    }
    var u,
      f,
      h,
      y,
      g,
      v,
      b = 0,
      m = !1,
      O = !1,
      j = !0;
    if ('function' != typeof e) throw new TypeError(gv);
    return (
      (t = yv(t) || 0),
      fv(n) &&
        ((m = !!n.leading),
        (O = 'maxWait' in n),
        (h = O ? vv(yv(n.maxWait) || 0, t) : h),
        (j = 'trailing' in n ? !!n.trailing : j)),
      (l.cancel = d),
      (l.flush = p),
      l
    );
  }
  function sn(e, t, n) {
    var o = !0,
      r = !0;
    if ('function' != typeof e) throw new TypeError(Nv);
    return (
      jv(n) &&
        ((o = 'leading' in n ? !!n.leading : o),
        (r = 'trailing' in n ? !!n.trailing : r)),
      Ov(e, t, { leading: o, maxWait: t, trailing: r })
    );
  }
  function cn(e) {
    return e !== e;
  }
  function dn(e, t, n) {
    for (var o = n - 1, r = e.length; ++o < r; ) if (e[o] === t) return o;
    return -1;
  }
  function pn(e, t, n) {
    return t === t ? Av(e, t, n) : Cv(e, Rv, n);
  }
  function ln(e, t) {
    return Sv(t, function(t) {
      return e[t];
    });
  }
  function un(e) {
    return null == e ? [] : Tv(e, Mv(e));
  }
  function fn(e, t, n, o) {
    (e = Vv(e) ? e : $v(e)), (n = n && !o ? Bv(n) : 0);
    var r = e.length;
    return (
      n < 0 && (n = zv(r + n, 0)),
      Hv(e) ? n <= r && e.indexOf(t, n) > -1 : !!r && kv(e, t, n) > -1
    );
  }
  function hn(e, t, n, o) {
    if (!Yv(e)) return e;
    t = Wv(t, e);
    for (var r = -1, i = t.length, a = i - 1, s = e; null != s && ++r < i; ) {
      var c = qv(t[r]),
        d = n;
      if (r != a) {
        var p = s[c];
        (d = o ? o(p, c, s) : void 0),
          void 0 === d && (d = Yv(p) ? p : Zv(t[r + 1]) ? [] : {});
      }
      Gv(s, c, d), (s = s[c]);
    }
    return e;
  }
  function yn(e, t, n) {
    for (var o = -1, r = t.length, i = {}; ++o < r; ) {
      var a = t[o],
        s = Xv(e, a);
      n(s, a) && Jv(i, Qv(a, e), s);
    }
    return i;
  }
  function gn(e, t) {
    return tb(e, t, function(t, n) {
      return nb(e, n);
    });
  }
  function vn() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return o.action.apply(void 0, e);
  }
  function bn() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return o.computed.apply(void 0, e);
  }
  function mn() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return o.observable.apply(void 0, e);
  }
  var On = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    jn = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    Nn = (function() {
      function e(e, t) {
        (this.templateRef = e),
          (this.viewContainer = t),
          (this.templateBindings = {});
      }
      return (
        (e.prototype.ngOnInit = function() {
          (this.view = this.viewContainer.createEmbeddedView(this.templateRef)),
            this.dispose && this.dispose(),
            this.shouldDetach() && this.view.detach(),
            this.autoDetect(this.view);
        }),
        (e.prototype.shouldDetach = function() {
          return this.treeMobxAutorun && this.treeMobxAutorun.detach;
        }),
        (e.prototype.autoDetect = function(e) {
          this.dispose = o.autorun(function() {
            return e.detectChanges();
          });
        }),
        (e.prototype.ngOnDestroy = function() {
          this.dispose && this.dispose();
        }),
        On(
          [t.Input(), jn('design:type', Object)],
          e.prototype,
          'treeMobxAutorun',
          void 0
        ),
        (e = On(
          [
            t.Directive({ selector: '[treeMobxAutorun]' }),
            jn('design:paramtypes', [t.TemplateRef, t.ViewContainerRef])
          ],
          e
        ))
      );
    })(),
    En = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      ENTER: 13,
      SPACE: 32,
      CONTEXT_MENU: 32
    },
    wn = r,
    Dn = i,
    _n = wn,
    xn = Math.max,
    In = a,
    Cn = s,
    Rn =
      'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {},
    An = 'object' == typeof Rn && Rn && Rn.Object === Object && Rn,
    Pn = An,
    Sn = Pn,
    Fn = 'object' == typeof self && self && self.Object === Object && self,
    Tn = Sn || Fn || Function('return this')(),
    Mn = Tn,
    Ln = Mn,
    kn = Ln.Symbol,
    Vn = kn,
    Hn = Vn,
    Bn = Object.prototype,
    $n = Bn.hasOwnProperty,
    zn = Bn.toString,
    Un = Hn ? Hn.toStringTag : void 0,
    Gn = d,
    Wn = Object.prototype,
    Zn = Wn.toString,
    Yn = p,
    qn = Vn,
    Kn = Gn,
    Xn = Yn,
    Jn = '[object Null]',
    Qn = '[object Undefined]',
    eo = qn ? qn.toStringTag : void 0,
    to = l,
    no = u,
    oo = to,
    ro = no,
    io = '[object AsyncFunction]',
    ao = '[object Function]',
    so = '[object GeneratorFunction]',
    co = '[object Proxy]',
    po = f,
    lo = Mn,
    uo = lo['__core-js_shared__'],
    fo = uo,
    ho = fo,
    yo = (function() {
      var e = /[^.]+$/.exec((ho && ho.keys && ho.keys.IE_PROTO) || '');
      return e ? 'Symbol(src)_1.' + e : '';
    })(),
    go = h,
    vo = Function.prototype,
    bo = vo.toString,
    mo = y,
    Oo = po,
    jo = go,
    No = no,
    Eo = mo,
    wo = /[\\^$.*+?()[\]{}|]/g,
    Do = /^\[object .+?Constructor\]$/,
    _o = Function.prototype,
    xo = Object.prototype,
    Io = _o.toString,
    Co = xo.hasOwnProperty,
    Ro = RegExp(
      '^' +
        Io.call(Co)
          .replace(wo, '\\$&')
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            '$1.*?'
          ) +
        '$'
    ),
    Ao = g,
    Po = v,
    So = Ao,
    Fo = Po,
    To = b,
    Mo = To,
    Lo = (function() {
      try {
        var e = Mo(Object, 'defineProperty');
        return e({}, '', {}), e;
      } catch (e) {}
    })(),
    ko = Lo,
    Vo = Cn,
    Ho = ko,
    Bo = Dn,
    $o = Ho
      ? function(e, t) {
          return Ho(e, 'toString', {
            configurable: !0,
            enumerable: !1,
            value: Vo(t),
            writable: !0
          });
        }
      : Bo,
    zo = $o,
    Uo = 800,
    Go = 16,
    Wo = Date.now,
    Zo = m,
    Yo = zo,
    qo = Zo,
    Ko = qo(Yo),
    Xo = Ko,
    Jo = Dn,
    Qo = In,
    er = Xo,
    tr = O,
    nr = j,
    or = N,
    rr = or,
    ir = E,
    ar = ir,
    sr = Array.prototype,
    cr = sr.splice,
    dr = w,
    pr = ir,
    lr = D,
    ur = ir,
    fr = _,
    hr = ir,
    yr = x,
    gr = nr,
    vr = dr,
    br = lr,
    mr = fr,
    Or = yr;
  (I.prototype.clear = gr),
    (I.prototype.delete = vr),
    (I.prototype.get = br),
    (I.prototype.has = mr),
    (I.prototype.set = Or);
  var jr = I,
    Nr = jr,
    Er = C,
    wr = R,
    Dr = A,
    _r = P,
    xr = To,
    Ir = Mn,
    Cr = xr(Ir, 'Map'),
    Rr = Cr,
    Ar = To,
    Pr = Ar(Object, 'create'),
    Sr = Pr,
    Fr = Sr,
    Tr = S,
    Mr = F,
    Lr = Sr,
    kr = '__lodash_hash_undefined__',
    Vr = Object.prototype,
    Hr = Vr.hasOwnProperty,
    Br = T,
    $r = Sr,
    zr = Object.prototype,
    Ur = zr.hasOwnProperty,
    Gr = M,
    Wr = Sr,
    Zr = '__lodash_hash_undefined__',
    Yr = L,
    qr = Tr,
    Kr = Mr,
    Xr = Br,
    Jr = Gr,
    Qr = Yr;
  (k.prototype.clear = qr),
    (k.prototype.delete = Kr),
    (k.prototype.get = Xr),
    (k.prototype.has = Jr),
    (k.prototype.set = Qr);
  var ei = k,
    ti = ei,
    ni = jr,
    oi = Rr,
    ri = V,
    ii = H,
    ai = ii,
    si = B,
    ci = si,
    di = $,
    pi = si,
    li = z,
    ui = si,
    fi = U,
    hi = si,
    yi = G,
    gi = ri,
    vi = di,
    bi = li,
    mi = fi,
    Oi = yi;
  (W.prototype.clear = gi),
    (W.prototype.delete = vi),
    (W.prototype.get = bi),
    (W.prototype.has = mi),
    (W.prototype.set = Oi);
  var ji = W,
    Ni = jr,
    Ei = Rr,
    wi = ji,
    Di = 200,
    _i = Z,
    xi = jr,
    Ii = Er,
    Ci = wr,
    Ri = Dr,
    Ai = _r,
    Pi = _i;
  (Y.prototype.clear = Ii),
    (Y.prototype.delete = Ci),
    (Y.prototype.get = Ri),
    (Y.prototype.has = Ai),
    (Y.prototype.set = Pi);
  var Si = Y,
    Fi = ko,
    Ti = q,
    Mi = Ti,
    Li = or,
    ki = K,
    Vi = X,
    Hi = Vi,
    Bi = Hi(),
    $i = Bi,
    zi = c(function(e, t) {
      function n(e, t) {
        if (t) return e.slice();
        var n = e.length,
          o = c ? c(n) : new e.constructor(n);
        return e.copy(o), o;
      }
      var o = Mn,
        r = t && !t.nodeType && t,
        i = r && !0 && e && !e.nodeType && e,
        a = i && i.exports === r,
        s = a ? o.Buffer : void 0,
        c = s ? s.allocUnsafe : void 0;
      e.exports = n;
    }),
    Ui = Mn,
    Gi = Ui.Uint8Array,
    Wi = Gi,
    Zi = Wi,
    Yi = J,
    qi = Yi,
    Ki = Q,
    Xi = ee,
    Ji = no,
    Qi = Object.create,
    ea = (function() {
      function e() {}
      return function(t) {
        if (!Ji(t)) return {};
        if (Qi) return Qi(t);
        e.prototype = t;
        var n = new e();
        return (e.prototype = void 0), n;
      };
    })(),
    ta = ea,
    na = te,
    oa = na,
    ra = oa(Object.getPrototypeOf, Object),
    ia = ra,
    aa = Object.prototype,
    sa = ne,
    ca = ta,
    da = ia,
    pa = sa,
    la = oe,
    ua = re,
    fa = to,
    ha = ua,
    ya = '[object Arguments]',
    ga = ie,
    va = ga,
    ba = ua,
    ma = Object.prototype,
    Oa = ma.hasOwnProperty,
    ja = ma.propertyIsEnumerable,
    Na = va(
      (function() {
        return arguments;
      })()
    )
      ? va
      : function(e) {
          return ba(e) && Oa.call(e, 'callee') && !ja.call(e, 'callee');
        },
    Ea = Na,
    wa = Array.isArray,
    Da = wa,
    _a = 9007199254740991,
    xa = ae,
    Ia = po,
    Ca = xa,
    Ra = se,
    Aa = Ra,
    Pa = ua,
    Sa = ce,
    Fa = de,
    Ta = c(function(e, t) {
      var n = Mn,
        o = Fa,
        r = t && !t.nodeType && t,
        i = r && !0 && e && !e.nodeType && e,
        a = i && i.exports === r,
        s = a ? n.Buffer : void 0,
        c = s ? s.isBuffer : void 0,
        d = c || o;
      e.exports = d;
    }),
    Ma = to,
    La = ia,
    ka = ua,
    Va = '[object Object]',
    Ha = Function.prototype,
    Ba = Object.prototype,
    $a = Ha.toString,
    za = Ba.hasOwnProperty,
    Ua = $a.call(Object),
    Ga = pe,
    Wa = to,
    Za = xa,
    Ya = ua,
    qa = {};
  (qa['[object Float32Array]'] = qa['[object Float64Array]'] = qa[
    '[object Int8Array]'
  ] = qa['[object Int16Array]'] = qa['[object Int32Array]'] = qa[
    '[object Uint8Array]'
  ] = qa['[object Uint8ClampedArray]'] = qa['[object Uint16Array]'] = qa[
    '[object Uint32Array]'
  ] = !0),
    (qa['[object Arguments]'] = qa['[object Array]'] = qa[
      '[object ArrayBuffer]'
    ] = qa['[object Boolean]'] = qa['[object DataView]'] = qa[
      '[object Date]'
    ] = qa['[object Error]'] = qa['[object Function]'] = qa[
      '[object Map]'
    ] = qa['[object Number]'] = qa['[object Object]'] = qa[
      '[object RegExp]'
    ] = qa['[object Set]'] = qa['[object String]'] = qa[
      '[object WeakMap]'
    ] = !1);
  var Ka = le,
    Xa = ue,
    Ja = c(function(e, t) {
      var n = Pn,
        o = t && !t.nodeType && t,
        r = o && !0 && e && !e.nodeType && e,
        i = r && r.exports === o,
        a = i && n.process,
        s = (function() {
          try {
            var e = r && r.require && r.require('util').types;
            return e || (a && a.binding && a.binding('util'));
          } catch (e) {}
        })();
      e.exports = s;
    }),
    Qa = Ka,
    es = Xa,
    ts = Ja,
    ns = ts && ts.isTypedArray,
    os = ns ? es(ns) : Qa,
    rs = os,
    is = fe,
    as = Ti,
    ss = or,
    cs = Object.prototype,
    ds = cs.hasOwnProperty,
    ps = he,
    ls = ps,
    us = Ti,
    fs = ye,
    hs = ge,
    ys = 9007199254740991,
    gs = /^(?:0|[1-9]\d*)$/,
    vs = ve,
    bs = hs,
    ms = Ea,
    Os = Da,
    js = Ta,
    Ns = vs,
    Es = rs,
    ws = Object.prototype,
    Ds = ws.hasOwnProperty,
    _s = be,
    xs = me,
    Is = no,
    Cs = sa,
    Rs = xs,
    As = Object.prototype,
    Ps = As.hasOwnProperty,
    Ss = Oe,
    Fs = _s,
    Ts = Ss,
    Ms = Ra,
    Ls = je,
    ks = fs,
    Vs = Ls,
    Hs = Ne,
    Bs = ki,
    $s = zi,
    zs = Ki,
    Us = Xi,
    Gs = la,
    Ws = Ea,
    Zs = Da,
    Ys = Sa,
    qs = Ta,
    Ks = po,
    Xs = no,
    Js = Ga,
    Qs = rs,
    ec = is,
    tc = Hs,
    nc = Ee,
    oc = Si,
    rc = ki,
    ic = $i,
    ac = nc,
    sc = no,
    cc = Ls,
    dc = is,
    pc = we,
    lc = pc,
    uc = no,
    fc = De,
    hc = or,
    yc = Ra,
    gc = vs,
    vc = no,
    bc = _e,
    mc = tr,
    Oc = bc,
    jc = xe,
    Nc = pc,
    Ec = jc,
    wc = Ec(function(e, t, n, o) {
      Nc(e, t, n, o);
    }),
    Dc = wc,
    _c = wn,
    xc = tr,
    Ic = fc,
    Cc = Dc,
    Rc = xc(function(e) {
      return e.push(void 0, Ic), _c(Cc, void 0, e);
    }),
    Ac = Rc,
    Pc = to,
    Sc = ua,
    Fc = '[object Symbol]',
    Tc = Ie,
    Mc = Da,
    Lc = Tc,
    kc = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    Vc = /^\w*$/,
    Hc = Ce,
    Bc = ji,
    $c = 'Expected a function';
  Re.Cache = Bc;
  var zc = Re,
    Uc = zc,
    Gc = 500,
    Wc = Ae,
    Zc = Wc,
    Yc = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    qc = /\\(\\)?/g,
    Kc = Zc(function(e) {
      var t = [];
      return (
        46 === e.charCodeAt(0) && t.push(''),
        e.replace(Yc, function(e, n, o, r) {
          t.push(o ? r.replace(qc, '$1') : n || e);
        }),
        t
      );
    }),
    Xc = Kc,
    Jc = Pe,
    Qc = Vn,
    ed = Jc,
    td = Da,
    nd = Tc,
    od = 1 / 0,
    rd = Qc ? Qc.prototype : void 0,
    id = rd ? rd.toString : void 0,
    ad = Se,
    sd = ad,
    cd = Fe,
    dd = Da,
    pd = Hc,
    ld = Xc,
    ud = cd,
    fd = Te,
    hd = Tc,
    yd = 1 / 0,
    gd = Me,
    vd = fd,
    bd = gd,
    md = Le,
    Od = md,
    jd = ke,
    Nd = Ve,
    Ed = na,
    wd = Ed(Object.keys, Object),
    Dd = wd,
    _d = sa,
    xd = Dd,
    Id = Object.prototype,
    Cd = Id.hasOwnProperty,
    Rd = He,
    Ad = _s,
    Pd = Rd,
    Sd = Ra,
    Fd = Be,
    Td = fs,
    Md = Fd,
    Ld = $e,
    kd = fs,
    Vd = Ls,
    Hd = ze,
    Bd = Ue,
    $d = Ge,
    zd = Bd,
    Ud = $d,
    Gd = Object.prototype,
    Wd = Gd.propertyIsEnumerable,
    Zd = Object.getOwnPropertySymbols,
    Yd = Zd
      ? function(e) {
          return null == e
            ? []
            : ((e = Object(e)),
              zd(Zd(e), function(t) {
                return Wd.call(e, t);
              }));
        }
      : Ud,
    qd = Yd,
    Kd = fs,
    Xd = qd,
    Jd = We,
    Qd = Ze,
    ep = Qd,
    tp = ia,
    np = qd,
    op = $d,
    rp = Object.getOwnPropertySymbols,
    ip = rp
      ? function(e) {
          for (var t = []; e; ) ep(t, np(e)), (e = tp(e));
          return t;
        }
      : op,
    ap = ip,
    sp = fs,
    cp = ap,
    dp = Ye,
    pp = Qd,
    lp = Da,
    up = qe,
    fp = up,
    hp = qd,
    yp = Fd,
    gp = Ke,
    vp = up,
    bp = ap,
    mp = Ls,
    Op = Xe,
    jp = To,
    Np = Mn,
    Ep = jp(Np, 'DataView'),
    wp = Ep,
    Dp = To,
    _p = Mn,
    xp = Dp(_p, 'Promise'),
    Ip = xp,
    Cp = To,
    Rp = Mn,
    Ap = Cp(Rp, 'Set'),
    Pp = Ap,
    Sp = To,
    Fp = Mn,
    Tp = Sp(Fp, 'WeakMap'),
    Mp = Tp,
    Lp = wp,
    kp = Rr,
    Vp = Ip,
    Hp = Pp,
    Bp = Mp,
    $p = to,
    zp = mo,
    Up = zp(Lp),
    Gp = zp(kp),
    Wp = zp(Vp),
    Zp = zp(Hp),
    Yp = zp(Bp),
    qp = $p;
  ((Lp && '[object DataView]' != qp(new Lp(new ArrayBuffer(1)))) ||
    (kp && '[object Map]' != qp(new kp())) ||
    (Vp && '[object Promise]' != qp(Vp.resolve())) ||
    (Hp && '[object Set]' != qp(new Hp())) ||
    (Bp && '[object WeakMap]' != qp(new Bp()))) &&
    (qp = function(e) {
      var t = $p(e),
        n = '[object Object]' == t ? e.constructor : void 0,
        o = n ? zp(n) : '';
      if (o)
        switch (o) {
          case Up:
            return '[object DataView]';
          case Gp:
            return '[object Map]';
          case Wp:
            return '[object Promise]';
          case Zp:
            return '[object Set]';
          case Yp:
            return '[object WeakMap]';
        }
      return t;
    });
  var Kp = qp,
    Xp = Object.prototype,
    Jp = Xp.hasOwnProperty,
    Qp = Je,
    el = Yi,
    tl = Qe,
    nl = /\w*$/,
    ol = et,
    rl = Vn,
    il = rl ? rl.prototype : void 0,
    al = il ? il.valueOf : void 0,
    sl = tt,
    cl = Yi,
    dl = tl,
    pl = ol,
    ll = sl,
    ul = Ki,
    fl = '[object Boolean]',
    hl = '[object Date]',
    yl = '[object Map]',
    gl = '[object Number]',
    vl = '[object RegExp]',
    bl = '[object Set]',
    ml = '[object String]',
    Ol = '[object Symbol]',
    jl = '[object ArrayBuffer]',
    Nl = '[object DataView]',
    El = '[object Float32Array]',
    wl = '[object Float64Array]',
    Dl = '[object Int8Array]',
    _l = '[object Int16Array]',
    xl = '[object Int32Array]',
    Il = '[object Uint8Array]',
    Cl = '[object Uint8ClampedArray]',
    Rl = '[object Uint16Array]',
    Al = '[object Uint32Array]',
    Pl = nt,
    Sl = Kp,
    Fl = ua,
    Tl = '[object Map]',
    Ml = ot,
    Ll = Ml,
    kl = Xa,
    Vl = Ja,
    Hl = Vl && Vl.isMap,
    Bl = Hl ? kl(Hl) : Ll,
    $l = Bl,
    zl = Kp,
    Ul = ua,
    Gl = '[object Set]',
    Wl = rt,
    Zl = Wl,
    Yl = Xa,
    ql = Ja,
    Kl = ql && ql.isSet,
    Xl = Kl ? Yl(Kl) : Zl,
    Jl = Xl,
    Ql = Si,
    eu = Nd,
    tu = ps,
    nu = Ld,
    ou = Hd,
    ru = zi,
    iu = Xi,
    au = Jd,
    su = dp,
    cu = gp,
    du = Op,
    pu = Kp,
    lu = Qp,
    uu = Pl,
    fu = la,
    hu = Da,
    yu = Ta,
    gu = $l,
    vu = no,
    bu = Jl,
    mu = Fd,
    Ou = 1,
    ju = 2,
    Nu = 4,
    Eu = '[object Arguments]',
    wu = '[object Function]',
    Du = '[object GeneratorFunction]',
    _u = '[object Object]',
    xu = {};
  (xu[Eu] = xu['[object Array]'] = xu['[object ArrayBuffer]'] = xu[
    '[object DataView]'
  ] = xu['[object Boolean]'] = xu['[object Date]'] = xu[
    '[object Float32Array]'
  ] = xu['[object Float64Array]'] = xu['[object Int8Array]'] = xu[
    '[object Int16Array]'
  ] = xu['[object Int32Array]'] = xu['[object Map]'] = xu[
    '[object Number]'
  ] = xu[_u] = xu['[object RegExp]'] = xu['[object Set]'] = xu[
    '[object String]'
  ] = xu['[object Symbol]'] = xu['[object Uint8Array]'] = xu[
    '[object Uint8ClampedArray]'
  ] = xu['[object Uint16Array]'] = xu['[object Uint32Array]'] = !0),
    (xu['[object Error]'] = xu[wu] = xu['[object WeakMap]'] = !1);
  var Iu,
    Cu = it,
    Ru = at,
    Au = st,
    Pu = md,
    Su = Au,
    Fu = ct,
    Tu = fd,
    Mu = Ru,
    Lu = Fu,
    ku = gd,
    Vu = dt,
    Hu = Ga,
    Bu = pt,
    $u = Vn,
    zu = Ea,
    Uu = Da,
    Gu = $u ? $u.isConcatSpreadable : void 0,
    Wu = lt,
    Zu = Qd,
    Yu = Wu,
    qu = ut,
    Ku = qu,
    Xu = ft,
    Ju = Xu,
    Qu = In,
    ef = Xo,
    tf = ht,
    nf = Jc,
    of = Cu,
    rf = Vu,
    af = fd,
    sf = fs,
    cf = Bu,
    df = tf,
    pf = Op,
    lf = df(function(e, t) {
      var n = {};
      if (null == e) return n;
      var o = !1;
      (t = nf(t, function(t) {
        return (t = af(t, e)), o || (o = t.length > 1), t;
      })),
        sf(e, pf(e), n),
        o && (n = of(n, 7, cf));
      for (var r = t.length; r--; ) rf(n, t[r]);
      return n;
    }),
    uf = lf,
    ff = to,
    hf = ua,
    yf = '[object Number]',
    gf = yt,
    vf = function(e, t, n) {
      return t && t.toggleActivated();
    },
    bf = function(e, t, n) {
      return t && t.toggleActivated(!0);
    },
    mf = function(e, t, n) {
      return t && t.toggleSelected();
    },
    Of = function(e, t, n) {
      return t.setIsActive(!0);
    },
    jf = function(e, t, n) {
      return t.setIsActive(!1);
    },
    Nf = function(e, t, n) {
      return t.setIsSelected(!0);
    },
    Ef = function(e, t, n) {
      return t.setIsSelected(!1);
    },
    wf = function(e, t, n) {
      return t.focus();
    },
    Df = function(e, t, n) {
      return t.hasChildren && t.toggleExpanded();
    },
    _f = function(e, t, n) {
      return t.expand();
    },
    xf = function(e, t, n) {
      return t.collapse();
    },
    If = function(e, t, n) {
      return e.focusDrillDown();
    },
    Cf = function(e, t, n) {
      return e.focusDrillUp();
    },
    Rf = function(e, t, n) {
      return e.focusNextNode();
    },
    Af = function(e, t, n) {
      return e.focusPreviousNode();
    },
    Pf = function(e, t, n, o) {
      var r = o.from,
        i = o.to;
      n.ctrlKey ? e.copyNode(r, i) : e.moveNode(r, i);
    },
    Sf = {
      TOGGLE_ACTIVE: vf,
      TOGGLE_ACTIVE_MULTI: bf,
      TOGGLE_SELECTED: mf,
      ACTIVATE: Of,
      DEACTIVATE: jf,
      SELECT: Nf,
      DESELECT: Ef,
      FOCUS: wf,
      TOGGLE_EXPANDED: Df,
      EXPAND: _f,
      COLLAPSE: xf,
      DRILL_DOWN: If,
      DRILL_UP: Cf,
      NEXT_NODE: Rf,
      PREVIOUS_NODE: Af,
      MOVE_NODE: Pf
    },
    Ff = {
      mouse: {
        click: Sf.TOGGLE_ACTIVE,
        dblClick: null,
        contextMenu: null,
        expanderClick: Sf.TOGGLE_EXPANDED,
        checkboxClick: Sf.TOGGLE_SELECTED,
        drop: Sf.MOVE_NODE
      },
      keys:
        ((Iu = {}),
        (Iu[En.RIGHT] = Sf.DRILL_DOWN),
        (Iu[En.LEFT] = Sf.DRILL_UP),
        (Iu[En.DOWN] = Sf.NEXT_NODE),
        (Iu[En.UP] = Sf.PREVIOUS_NODE),
        (Iu[En.SPACE] = Sf.TOGGLE_ACTIVE),
        (Iu[En.ENTER] = Sf.TOGGLE_ACTIVE),
        Iu)
    },
    Tf = (function() {
      function e(e) {
        void 0 === e && (e = {}),
          (this.options = e),
          (this.actionMapping = Ac({}, this.options.actionMapping, Ff)),
          e.rtl &&
            ((this.actionMapping.keys[En.RIGHT] =
              jd(e, ['actionMapping', 'keys', En.RIGHT]) || Sf.DRILL_UP),
            (this.actionMapping.keys[En.LEFT] =
              jd(e, ['actionMapping', 'keys', En.LEFT]) || Sf.DRILL_DOWN));
      }
      return (
        Object.defineProperty(e.prototype, 'hasChildrenField', {
          get: function() {
            return this.options.hasChildrenField || 'hasChildren';
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'childrenField', {
          get: function() {
            return this.options.childrenField || 'children';
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'displayField', {
          get: function() {
            return this.options.displayField || 'name';
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'idField', {
          get: function() {
            return this.options.idField || 'id';
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'isExpandedField', {
          get: function() {
            return this.options.isExpandedField || 'isExpanded';
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'getChildren', {
          get: function() {
            return this.options.getChildren;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'levelPadding', {
          get: function() {
            return this.options.levelPadding || 0;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'useVirtualScroll', {
          get: function() {
            return this.options.useVirtualScroll;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'animateExpand', {
          get: function() {
            return this.options.animateExpand;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'animateSpeed', {
          get: function() {
            return this.options.animateSpeed || 1;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'animateAcceleration', {
          get: function() {
            return this.options.animateAcceleration || 1.2;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'scrollOnActivate', {
          get: function() {
            return (
              void 0 === this.options.scrollOnActivate ||
              this.options.scrollOnActivate
            );
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'rtl', {
          get: function() {
            return !!this.options.rtl;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'rootId', {
          get: function() {
            return this.options.rootId;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'useCheckbox', {
          get: function() {
            return this.options.useCheckbox;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'useTriState', {
          get: function() {
            return (
              void 0 === this.options.useTriState || this.options.useTriState
            );
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'scrollContainer', {
          get: function() {
            return this.options.scrollContainer;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'allowDragoverStyling', {
          get: function() {
            return (
              void 0 === this.options.allowDragoverStyling ||
              this.options.allowDragoverStyling
            );
          },
          enumerable: !0,
          configurable: !0
        }),
        (e.prototype.getNodeClone = function(e) {
          return this.options.getNodeClone
            ? this.options.getNodeClone(e)
            : uf(Object.assign({}, e.data), ['id']);
        }),
        (e.prototype.allowDrop = function(e, t, n) {
          return this.options.allowDrop instanceof Function
            ? this.options.allowDrop(e, t, n)
            : void 0 === this.options.allowDrop || this.options.allowDrop;
        }),
        (e.prototype.allowDrag = function(e) {
          return this.options.allowDrag instanceof Function
            ? this.options.allowDrag(e)
            : this.options.allowDrag;
        }),
        (e.prototype.nodeClass = function(e) {
          return this.options.nodeClass ? this.options.nodeClass(e) : '';
        }),
        (e.prototype.nodeHeight = function(e) {
          if (e.data.virtual) return 0;
          var t = this.options.nodeHeight || 22;
          return (
            'function' == typeof t && (t = t(e)),
            t + (0 === e.index ? 2 : 1) * this.dropSlotHeight
          );
        }),
        Object.defineProperty(e.prototype, 'dropSlotHeight', {
          get: function() {
            return gf(this.options.dropSlotHeight)
              ? this.options.dropSlotHeight
              : 2;
          },
          enumerable: !0,
          configurable: !0
        }),
        e
      );
    })(),
    Mf = {
      toggleExpanded: 'toggleExpanded',
      activate: 'activate',
      deactivate: 'deactivate',
      nodeActivate: 'nodeActivate',
      nodeDeactivate: 'nodeDeactivate',
      select: 'select',
      deselect: 'deselect',
      focus: 'focus',
      blur: 'blur',
      initialized: 'initialized',
      updateData: 'updateData',
      moveNode: 'moveNode',
      copyNode: 'copyNode',
      event: 'event',
      loadNodeChildren: 'loadNodeChildren',
      changeFilter: 'changeFilter',
      stateChange: 'stateChange'
    },
    Lf = gt,
    kf = Lf,
    Vf = vt,
    Hf = '__lodash_hash_undefined__',
    Bf = bt,
    $f = mt,
    zf = ji,
    Uf = Bf,
    Gf = $f;
  (Ot.prototype.add = Ot.prototype.push = Uf), (Ot.prototype.has = Gf);
  var Wf = Ot,
    Zf = jt,
    Yf = Wf,
    qf = Vf,
    Kf = Zf,
    Xf = 1,
    Jf = 2,
    Qf = Nt,
    eh = Et,
    th = wt,
    nh = Vn,
    oh = Wi,
    rh = or,
    ih = Qf,
    ah = eh,
    sh = th,
    ch = 1,
    dh = 2,
    ph = '[object Boolean]',
    lh = '[object Date]',
    uh = '[object Error]',
    fh = '[object Map]',
    hh = '[object Number]',
    yh = '[object RegExp]',
    gh = '[object Set]',
    vh = '[object String]',
    bh = '[object Symbol]',
    mh = '[object ArrayBuffer]',
    Oh = '[object DataView]',
    jh = nh ? nh.prototype : void 0,
    Nh = jh ? jh.valueOf : void 0,
    Eh = Dt,
    wh = gp,
    Dh = 1,
    _h = Object.prototype,
    xh = _h.hasOwnProperty,
    Ih = _t,
    Ch = Si,
    Rh = Qf,
    Ah = Eh,
    Ph = Ih,
    Sh = Kp,
    Fh = Da,
    Th = Ta,
    Mh = rs,
    Lh = 1,
    kh = '[object Arguments]',
    Vh = '[object Array]',
    Hh = '[object Object]',
    Bh = Object.prototype,
    $h = Bh.hasOwnProperty,
    zh = xt,
    Uh = zh,
    Gh = ua,
    Wh = It,
    Zh = Si,
    Yh = Wh,
    qh = 1,
    Kh = 2,
    Xh = Ct,
    Jh = no,
    Qh = Rt,
    ey = Qh,
    ty = Fd,
    ny = At,
    oy = Pt,
    ry = Xh,
    iy = ny,
    ay = oy,
    sy = St,
    cy = Ft,
    dy = fd,
    py = Ea,
    ly = Da,
    uy = vs,
    fy = xa,
    hy = gd,
    yy = Tt,
    gy = cy,
    vy = yy,
    by = Mt,
    my = Wh,
    Oy = jd,
    jy = by,
    Ny = Hc,
    Ey = Qh,
    wy = oy,
    Dy = gd,
    _y = 1,
    xy = 2,
    Iy = Lt,
    Cy = kt,
    Ry = md,
    Ay = Vt,
    Py = Cy,
    Sy = Ay,
    Fy = Hc,
    Ty = gd,
    My = Ht,
    Ly = sy,
    ky = Iy,
    Vy = Dn,
    Hy = Da,
    By = My,
    $y = Bt,
    zy = $i,
    Uy = Fd,
    Gy = $t,
    Wy = Ra,
    Zy = zt,
    Yy = Gy,
    qy = Zy,
    Ky = qy(Yy),
    Xy = Ky,
    Jy = Xy,
    Qy = Ut,
    eg = Vf,
    tg = $y,
    ng = Qy,
    og = Da,
    rg = bc,
    ig = Gt,
    ag = Wt,
    sg = Xy,
    cg = Zt,
    dg = ag,
    pg = cg,
    lg = $y,
    ug = Da,
    fg = bc,
    hg = Yt,
    yg = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    gg = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    vg = (function() {
      function e(e, t, n, o) {
        var r = this;
        (this.data = e),
          (this.parent = t),
          (this.treeModel = n),
          (this.position = 0),
          (this.allowDrop = function(e, t) {
            return r.options.allowDrop(e, { parent: r, index: 0 }, t);
          }),
          (this.allowDragoverStyling = function() {
            return r.options.allowDragoverStyling;
          }),
          (void 0 !== this.id && null !== this.id) || (this.id = qt()),
          (this.index = o),
          this.getField('children') && this._initChildren(),
          this.autoLoadChildren();
      }
      return (
        Object.defineProperty(e.prototype, 'isHidden', {
          get: function() {
            return this.treeModel.isHidden(this);
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'isExpanded', {
          get: function() {
            return this.treeModel.isExpanded(this);
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'isActive', {
          get: function() {
            return this.treeModel.isActive(this);
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'isFocused', {
          get: function() {
            return this.treeModel.isNodeFocused(this);
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'isSelected', {
          get: function() {
            return this.isSelectable()
              ? this.treeModel.isSelected(this)
              : ig(this.children, function(e) {
                  return e.isSelected;
                });
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'isAllSelected', {
          get: function() {
            return this.isSelectable()
              ? this.treeModel.isSelected(this)
              : hg(this.children, function(e) {
                  return e.isAllSelected;
                });
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'isPartiallySelected', {
          get: function() {
            return this.isSelected && !this.isAllSelected;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'level', {
          get: function() {
            return this.parent ? this.parent.level + 1 : 0;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'path', {
          get: function() {
            return this.parent ? this.parent.path.concat([this.id]) : [];
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'elementRef', {
          get: function() {
            throw 'Element Ref is no longer supported since introducing virtual scroll\n\n      You may use a template to obtain a reference to the element';
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'originalNode', {
          get: function() {
            return this._originalNode;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'hasChildren', {
          get: function() {
            return !!(
              this.getField('hasChildren') ||
              (this.children && this.children.length > 0)
            );
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'isCollapsed', {
          get: function() {
            return !this.isExpanded;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'isLeaf', {
          get: function() {
            return !this.hasChildren;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'isRoot', {
          get: function() {
            return this.parent.data.virtual;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'realParent', {
          get: function() {
            return this.isRoot ? null : this.parent;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'options', {
          get: function() {
            return this.treeModel.options;
          },
          enumerable: !0,
          configurable: !0
        }),
        (e.prototype.fireEvent = function(e) {
          this.treeModel.fireEvent(e);
        }),
        Object.defineProperty(e.prototype, 'displayField', {
          get: function() {
            return this.getField('display');
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'id', {
          get: function() {
            return this.getField('id');
          },
          set: function(e) {
            this.setField('id', e);
          },
          enumerable: !0,
          configurable: !0
        }),
        (e.prototype.getField = function(e) {
          return this.data[this.options[e + 'Field']];
        }),
        (e.prototype.setField = function(e, t) {
          this.data[this.options[e + 'Field']] = t;
        }),
        (e.prototype._findAdjacentSibling = function(e, t) {
          void 0 === t && (t = !1);
          var n = this._getParentsChildren(t),
            o = n.indexOf(this);
          return n.length > o + e ? n[o + e] : null;
        }),
        (e.prototype.findNextSibling = function(e) {
          return void 0 === e && (e = !1), this._findAdjacentSibling(1, e);
        }),
        (e.prototype.findPreviousSibling = function(e) {
          return void 0 === e && (e = !1), this._findAdjacentSibling(-1, e);
        }),
        (e.prototype.getVisibleChildren = function() {
          return this.visibleChildren;
        }),
        Object.defineProperty(e.prototype, 'visibleChildren', {
          get: function() {
            return (this.children || []).filter(function(e) {
              return !e.isHidden;
            });
          },
          enumerable: !0,
          configurable: !0
        }),
        (e.prototype.getFirstChild = function(e) {
          void 0 === e && (e = !1);
          var t = e ? this.visibleChildren : this.children;
          return kf(t || []);
        }),
        (e.prototype.getLastChild = function(e) {
          void 0 === e && (e = !1);
          var t = e ? this.visibleChildren : this.children;
          return Ru(t || []);
        }),
        (e.prototype.findNextNode = function(e, t) {
          return (
            void 0 === e && (e = !0),
            void 0 === t && (t = !1),
            (e && this.isExpanded && this.getFirstChild(t)) ||
              this.findNextSibling(t) ||
              (this.parent && this.parent.findNextNode(!1, t))
          );
        }),
        (e.prototype.findPreviousNode = function(e) {
          void 0 === e && (e = !1);
          var t = this.findPreviousSibling(e);
          return t ? t._getLastOpenDescendant(e) : this.realParent;
        }),
        (e.prototype._getLastOpenDescendant = function(e) {
          void 0 === e && (e = !1);
          var t = this.getLastChild(e);
          return this.isCollapsed || !t ? this : t._getLastOpenDescendant(e);
        }),
        (e.prototype._getParentsChildren = function(e) {
          return (
            void 0 === e && (e = !1),
            (this.parent &&
              (e ? this.parent.getVisibleChildren() : this.parent.children)) ||
              []
          );
        }),
        (e.prototype.getIndexInParent = function(e) {
          return (
            void 0 === e && (e = !1), this._getParentsChildren(e).indexOf(this)
          );
        }),
        (e.prototype.isDescendantOf = function(e) {
          return this === e || (this.parent && this.parent.isDescendantOf(e));
        }),
        (e.prototype.getNodePadding = function() {
          return this.options.levelPadding * (this.level - 1) + 'px';
        }),
        (e.prototype.getClass = function() {
          return [
            this.options.nodeClass(this),
            'tree-node-level-' + this.level
          ].join(' ');
        }),
        (e.prototype.onDrop = function(e) {
          this.mouseAction('drop', e.event, {
            from: e.element,
            to: { parent: this, index: 0, dropOnNode: !0 }
          });
        }),
        (e.prototype.allowDrag = function() {
          return this.options.allowDrag(this);
        }),
        (e.prototype.loadNodeChildren = function() {
          var e = this;
          return this.options.getChildren
            ? Promise.resolve(this.options.getChildren(this))
                .then(function(t) {
                  t &&
                    (e.setField('children', t),
                    e._initChildren(),
                    e.options.useTriState &&
                      e.treeModel.isSelected(e) &&
                      e.setIsSelected(!0),
                    e.children.forEach(function(e) {
                      e.getField('isExpanded') && e.hasChildren && e.expand();
                    }));
                })
                .then(function() {
                  e.fireEvent({ eventName: Mf.loadNodeChildren, node: e });
                })
            : Promise.resolve();
        }),
        (e.prototype.expand = function() {
          return this.isExpanded || this.toggleExpanded(), this;
        }),
        (e.prototype.collapse = function() {
          return this.isExpanded && this.toggleExpanded(), this;
        }),
        (e.prototype.doForAll = function(e) {
          var t = this;
          Promise.resolve(e(this)).then(function() {
            t.children &&
              t.children.forEach(function(t) {
                return t.doForAll(e);
              });
          });
        }),
        (e.prototype.expandAll = function() {
          this.doForAll(function(e) {
            return e.expand();
          });
        }),
        (e.prototype.collapseAll = function() {
          this.doForAll(function(e) {
            return e.collapse();
          });
        }),
        (e.prototype.ensureVisible = function() {
          return (
            this.realParent &&
              (this.realParent.expand(), this.realParent.ensureVisible()),
            this
          );
        }),
        (e.prototype.toggleExpanded = function() {
          return this.setIsExpanded(!this.isExpanded), this;
        }),
        (e.prototype.setIsExpanded = function(e) {
          return (
            this.hasChildren && this.treeModel.setExpandedNode(this, e), this
          );
        }),
        (e.prototype.autoLoadChildren = function() {
          var e = this;
          this.handler = o.reaction(
            function() {
              return e.isExpanded;
            },
            function(t) {
              !e.children && e.hasChildren && t && e.loadNodeChildren();
            },
            { fireImmediately: !0 }
          );
        }),
        (e.prototype.dispose = function() {
          this.children &&
            this.children.forEach(function(e) {
              return e.dispose();
            }),
            this.handler && this.handler(),
            (this.parent = null),
            (this.children = null);
        }),
        (e.prototype.setIsActive = function(e, t) {
          return (
            void 0 === t && (t = !1),
            this.treeModel.setActiveNode(this, e, t),
            e && this.focus(this.options.scrollOnActivate),
            this
          );
        }),
        (e.prototype.isSelectable = function() {
          return this.isLeaf || !this.children || !this.options.useTriState;
        }),
        (e.prototype.setIsSelected = function(e) {
          return (
            this.isSelectable()
              ? this.treeModel.setSelectedNode(this, e)
              : this.visibleChildren.forEach(function(t) {
                  return t.setIsSelected(e);
                }),
            this
          );
        }),
        (e.prototype.toggleSelected = function() {
          return this.setIsSelected(!this.isSelected), this;
        }),
        (e.prototype.toggleActivated = function(e) {
          return (
            void 0 === e && (e = !1), this.setIsActive(!this.isActive, e), this
          );
        }),
        (e.prototype.setActiveAndVisible = function(e) {
          return (
            void 0 === e && (e = !1),
            this.setIsActive(!0, e).ensureVisible(),
            setTimeout(this.scrollIntoView.bind(this)),
            this
          );
        }),
        (e.prototype.scrollIntoView = function(e) {
          void 0 === e && (e = !1),
            this.treeModel.virtualScroll.scrollIntoView(this, e);
        }),
        (e.prototype.focus = function(e) {
          void 0 === e && (e = !0);
          var t = this.treeModel.getFocusedNode();
          return (
            this.treeModel.setFocusedNode(this),
            e && this.scrollIntoView(),
            t && this.fireEvent({ eventName: Mf.blur, node: t }),
            this.fireEvent({ eventName: Mf.focus, node: this }),
            this
          );
        }),
        (e.prototype.blur = function() {
          var e = this.treeModel.getFocusedNode();
          return (
            this.treeModel.setFocusedNode(null),
            e && this.fireEvent({ eventName: Mf.blur, node: this }),
            this
          );
        }),
        (e.prototype.setIsHidden = function(e) {
          this.treeModel.setIsHidden(this, e);
        }),
        (e.prototype.hide = function() {
          this.setIsHidden(!0);
        }),
        (e.prototype.show = function() {
          this.setIsHidden(!1);
        }),
        (e.prototype.mouseAction = function(e, t, n) {
          void 0 === n && (n = null), this.treeModel.setFocus(!0);
          var o = this.options.actionMapping.mouse,
            r = o[e];
          r && r(this.treeModel, this, t, n);
        }),
        (e.prototype.getSelfHeight = function() {
          return this.options.nodeHeight(this);
        }),
        (e.prototype._initChildren = function() {
          var t = this;
          this.children = this.getField('children').map(function(n, o) {
            return new e(n, t, t.treeModel, o);
          });
        }),
        yg(
          [o.computed, gg('design:type', Object), gg('design:paramtypes', [])],
          e.prototype,
          'isHidden',
          null
        ),
        yg(
          [o.computed, gg('design:type', Object), gg('design:paramtypes', [])],
          e.prototype,
          'isExpanded',
          null
        ),
        yg(
          [o.computed, gg('design:type', Object), gg('design:paramtypes', [])],
          e.prototype,
          'isActive',
          null
        ),
        yg(
          [o.computed, gg('design:type', Object), gg('design:paramtypes', [])],
          e.prototype,
          'isFocused',
          null
        ),
        yg(
          [o.computed, gg('design:type', Object), gg('design:paramtypes', [])],
          e.prototype,
          'isSelected',
          null
        ),
        yg(
          [o.computed, gg('design:type', Object), gg('design:paramtypes', [])],
          e.prototype,
          'isAllSelected',
          null
        ),
        yg(
          [o.computed, gg('design:type', Object), gg('design:paramtypes', [])],
          e.prototype,
          'isPartiallySelected',
          null
        ),
        yg(
          [o.observable, gg('design:type', Array)],
          e.prototype,
          'children',
          void 0
        ),
        yg(
          [o.observable, gg('design:type', Number)],
          e.prototype,
          'index',
          void 0
        ),
        yg(
          [o.observable, gg('design:type', Object)],
          e.prototype,
          'position',
          void 0
        ),
        yg(
          [o.observable, gg('design:type', Number)],
          e.prototype,
          'height',
          void 0
        ),
        yg(
          [o.computed, gg('design:type', Number), gg('design:paramtypes', [])],
          e.prototype,
          'level',
          null
        ),
        yg(
          [o.computed, gg('design:type', Array), gg('design:paramtypes', [])],
          e.prototype,
          'path',
          null
        ),
        yg(
          [o.computed, gg('design:type', Object), gg('design:paramtypes', [])],
          e.prototype,
          'visibleChildren',
          null
        ),
        yg(
          [
            o.action,
            gg('design:type', Function),
            gg('design:paramtypes', [Object]),
            gg('design:returntype', void 0)
          ],
          e.prototype,
          'setIsSelected',
          null
        ),
        yg(
          [
            o.action,
            gg('design:type', Function),
            gg('design:paramtypes', []),
            gg('design:returntype', void 0)
          ],
          e.prototype,
          '_initChildren',
          null
        ),
        e
      );
    })(),
    bg = Kt,
    mg = $y,
    Og = Ra,
    jg = Fd,
    Ng = Xt,
    Eg = Jt,
    wg = no,
    Dg = Tc,
    _g = NaN,
    xg = /^\s+|\s+$/g,
    Ig = /^[-+]0x[0-9a-f]+$/i,
    Cg = /^0b[01]+$/i,
    Rg = /^0o[0-7]+$/i,
    Ag = parseInt,
    Pg = Qt,
    Sg = Pg,
    Fg = 1 / 0,
    Tg = 1.7976931348623157e308,
    Mg = en,
    Lg = Mg,
    kg = tn,
    Vg = Eg,
    Hg = $y,
    Bg = kg,
    $g = Math.max,
    zg = nn,
    Ug = Ng,
    Gg = zg,
    Wg = Ug(Gg),
    Zg = Wg,
    Yg = to,
    qg = Da,
    Kg = ua,
    Xg = '[object String]',
    Jg = on,
    Qg = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    ev = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    tv = (function() {
      function e() {
        (this.options = new Tf()),
          (this.eventNames = Object.keys(Mf)),
          (this.expandedNodeIds = {}),
          (this.selectedLeafNodeIds = {}),
          (this.activeNodeIds = {}),
          (this.hiddenNodeIds = {}),
          (this.focusedNodeId = null),
          (this.firstUpdate = !0),
          (this.subscriptions = []);
      }
      (n = e),
        (e.prototype.fireEvent = function(e) {
          (e.treeModel = this),
            this.events[e.eventName].emit(e),
            this.events.event.emit(e);
        }),
        (e.prototype.subscribe = function(e, t) {
          var n = this.events[e].subscribe(t);
          this.subscriptions.push(n);
        }),
        (e.prototype.getFocusedNode = function() {
          return this.focusedNode;
        }),
        (e.prototype.getActiveNode = function() {
          return this.activeNodes[0];
        }),
        (e.prototype.getActiveNodes = function() {
          return this.activeNodes;
        }),
        (e.prototype.getVisibleRoots = function() {
          return this.virtualRoot.visibleChildren;
        }),
        (e.prototype.getFirstRoot = function(e) {
          return (
            void 0 === e && (e = !1),
            kf(e ? this.getVisibleRoots() : this.roots)
          );
        }),
        (e.prototype.getLastRoot = function(e) {
          return (
            void 0 === e && (e = !1),
            Ru(e ? this.getVisibleRoots() : this.roots)
          );
        }),
        Object.defineProperty(e.prototype, 'isFocused', {
          get: function() {
            return n.focusedTree === this;
          },
          enumerable: !0,
          configurable: !0
        }),
        (e.prototype.isNodeFocused = function(e) {
          return this.focusedNode === e;
        }),
        (e.prototype.isEmptyTree = function() {
          return this.roots && 0 === this.roots.length;
        }),
        Object.defineProperty(e.prototype, 'focusedNode', {
          get: function() {
            return this.focusedNodeId
              ? this.getNodeById(this.focusedNodeId)
              : null;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'expandedNodes', {
          get: function() {
            var e = this,
              t = Object.keys(this.expandedNodeIds)
                .filter(function(t) {
                  return e.expandedNodeIds[t];
                })
                .map(function(t) {
                  return e.getNodeById(t);
                });
            return bg(t);
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'activeNodes', {
          get: function() {
            var e = this,
              t = Object.keys(this.activeNodeIds)
                .filter(function(t) {
                  return e.activeNodeIds[t];
                })
                .map(function(t) {
                  return e.getNodeById(t);
                });
            return bg(t);
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'hiddenNodes', {
          get: function() {
            var e = this,
              t = Object.keys(this.hiddenNodeIds)
                .filter(function(t) {
                  return e.hiddenNodeIds[t];
                })
                .map(function(t) {
                  return e.getNodeById(t);
                });
            return bg(t);
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'selectedLeafNodes', {
          get: function() {
            var e = this,
              t = Object.keys(this.selectedLeafNodeIds)
                .filter(function(t) {
                  return e.selectedLeafNodeIds[t];
                })
                .map(function(t) {
                  return e.getNodeById(t);
                });
            return bg(t);
          },
          enumerable: !0,
          configurable: !0
        }),
        (e.prototype.getNodeByPath = function(e, t) {
          if ((void 0 === t && (t = null), !e)) return null;
          if (((t = t || this.virtualRoot), 0 === e.length)) return t;
          if (!t.children) return null;
          var n = e.shift(),
            o = Zg(t.children, { id: n });
          return o ? this.getNodeByPath(e, o) : null;
        }),
        (e.prototype.getNodeById = function(e) {
          var t = e.toString();
          return this.getNodeBy(function(e) {
            return e.id.toString() === t;
          });
        }),
        (e.prototype.getNodeBy = function(e, t) {
          if (
            (void 0 === t && (t = null),
            (t = t || this.virtualRoot),
            !t.children)
          )
            return null;
          var n = Zg(t.children, e);
          if (n) return n;
          for (var o = 0, r = t.children; o < r.length; o++) {
            var i = r[o],
              a = this.getNodeBy(e, i);
            if (a) return a;
          }
        }),
        (e.prototype.isExpanded = function(e) {
          return this.expandedNodeIds[e.id];
        }),
        (e.prototype.isHidden = function(e) {
          return this.hiddenNodeIds[e.id];
        }),
        (e.prototype.isActive = function(e) {
          return this.activeNodeIds[e.id];
        }),
        (e.prototype.isSelected = function(e) {
          return this.selectedLeafNodeIds[e.id];
        }),
        (e.prototype.ngOnDestroy = function() {
          this.dispose(), this.unsubscribeAll();
        }),
        (e.prototype.dispose = function() {
          this.virtualRoot && this.virtualRoot.dispose();
        }),
        (e.prototype.unsubscribeAll = function() {
          this.subscriptions.forEach(function(e) {
            return e.unsubscribe();
          }),
            (this.subscriptions = []);
        }),
        (e.prototype.setData = function(e) {
          var t = e.nodes,
            n = e.options,
            o = void 0 === n ? null : n,
            r = e.events,
            i = void 0 === r ? null : r;
          o && (this.options = new Tf(o)),
            i && (this.events = i),
            t && (this.nodes = t),
            this.update();
        }),
        (e.prototype.update = function() {
          var e,
            t =
              ((e = { id: this.options.rootId, virtual: !0 }),
              (e[this.options.childrenField] = this.nodes),
              e);
          this.dispose(),
            (this.virtualRoot = new vg(t, null, this, 0)),
            (this.roots = this.virtualRoot.children),
            this.firstUpdate
              ? this.roots &&
                ((this.firstUpdate = !1), this._calculateExpandedNodes())
              : this.fireEvent({ eventName: Mf.updateData });
        }),
        (e.prototype.setFocusedNode = function(e) {
          this.focusedNodeId = e ? e.id : null;
        }),
        (e.prototype.setFocus = function(e) {
          n.focusedTree = e ? this : null;
        }),
        (e.prototype.doForAll = function(e) {
          this.roots.forEach(function(t) {
            return t.doForAll(e);
          });
        }),
        (e.prototype.focusNextNode = function() {
          var e = this.getFocusedNode(),
            t = e ? e.findNextNode(!0, !0) : this.getFirstRoot(!0);
          t && t.focus();
        }),
        (e.prototype.focusPreviousNode = function() {
          var e = this.getFocusedNode(),
            t = e ? e.findPreviousNode(!0) : this.getLastRoot(!0);
          t && t.focus();
        }),
        (e.prototype.focusDrillDown = function() {
          var e = this.getFocusedNode();
          if (e && e.isCollapsed && e.hasChildren) e.toggleExpanded();
          else {
            var t = e ? e.getFirstChild(!0) : this.getFirstRoot(!0);
            t && t.focus();
          }
        }),
        (e.prototype.focusDrillUp = function() {
          var e = this.getFocusedNode();
          if (e)
            if (e.isExpanded) e.toggleExpanded();
            else {
              var t = e.realParent;
              t && t.focus();
            }
        }),
        (e.prototype.setActiveNode = function(e, t, n) {
          void 0 === n && (n = !1),
            n
              ? this._setActiveNodeMulti(e, t)
              : this._setActiveNodeSingle(e, t),
            t
              ? (e.focus(this.options.scrollOnActivate),
                this.fireEvent({ eventName: Mf.activate, node: e }),
                this.fireEvent({ eventName: Mf.nodeActivate, node: e }))
              : (this.fireEvent({ eventName: Mf.deactivate, node: e }),
                this.fireEvent({ eventName: Mf.nodeDeactivate, node: e }));
        }),
        (e.prototype.setSelectedNode = function(e, t) {
          var n;
          (this.selectedLeafNodeIds = Object.assign(
            {},
            this.selectedLeafNodeIds,
            ((n = {}), (n[e.id] = t), n)
          )),
            t
              ? (e.focus(), this.fireEvent({ eventName: Mf.select, node: e }))
              : this.fireEvent({ eventName: Mf.deselect, node: e });
        }),
        (e.prototype.setExpandedNode = function(e, t) {
          var n;
          (this.expandedNodeIds = Object.assign(
            {},
            this.expandedNodeIds,
            ((n = {}), (n[e.id] = t), n)
          )),
            this.fireEvent({
              eventName: Mf.toggleExpanded,
              node: e,
              isExpanded: t
            });
        }),
        (e.prototype.expandAll = function() {
          this.roots.forEach(function(e) {
            return e.expandAll();
          });
        }),
        (e.prototype.collapseAll = function() {
          this.roots.forEach(function(e) {
            return e.collapseAll();
          });
        }),
        (e.prototype.setIsHidden = function(e, t) {
          var n;
          this.hiddenNodeIds = Object.assign(
            {},
            this.hiddenNodeIds,
            ((n = {}), (n[e.id] = t), n)
          );
        }),
        (e.prototype.setHiddenNodeIds = function(e) {
          this.hiddenNodeIds = e.reduce(function(e, t) {
            var n;
            return Object.assign(e, ((n = {}), (n[t] = !0), n));
          }, {});
        }),
        (e.prototype.performKeyAction = function(e, t) {
          var n = this.options.actionMapping.keys[t.keyCode];
          return !!n && (t.preventDefault(), n(this, e, t), !0);
        }),
        (e.prototype.filterNodes = function(e, t) {
          var n = this;
          void 0 === t && (t = !0);
          var o;
          if (!e) return this.clearFilter();
          if (Jg(e))
            o = function(t) {
              return (
                -1 !== t.displayField.toLowerCase().indexOf(e.toLowerCase())
              );
            };
          else {
            if (!po(e))
              return (
                console.error("Don't know what to do with filter", e),
                void console.error('Should be either a string or function')
              );
            o = e;
          }
          var r = {};
          this.roots.forEach(function(e) {
            return n._filterNode(r, e, o, t);
          }),
            (this.hiddenNodeIds = r),
            this.fireEvent({ eventName: Mf.changeFilter });
        }),
        (e.prototype.clearFilter = function() {
          (this.hiddenNodeIds = {}),
            this.fireEvent({ eventName: Mf.changeFilter });
        }),
        (e.prototype.moveNode = function(e, t) {
          var n = e.getIndexInParent(),
            o = e.parent;
          if (this.canMoveNode(e, t, n)) {
            var r = o.getField('children');
            t.parent.getField('children') || t.parent.setField('children', []);
            var i = t.parent.getField('children'),
              a = r.splice(n, 1)[0],
              s = o === t.parent && t.index > n ? t.index - 1 : t.index;
            i.splice(s, 0, a),
              o.treeModel.update(),
              t.parent.treeModel !== o.treeModel && t.parent.treeModel.update(),
              this.fireEvent({
                eventName: Mf.moveNode,
                node: a,
                to: { parent: t.parent.data, index: s },
                from: { parent: o.data, index: n }
              });
          }
        }),
        (e.prototype.copyNode = function(e, t) {
          var n = e.getIndexInParent();
          if (this.canMoveNode(e, t, n)) {
            t.parent.getField('children') || t.parent.setField('children', []);
            var o = t.parent.getField('children'),
              r = this.options.getNodeClone(e);
            o.splice(t.index, 0, r),
              e.treeModel.update(),
              t.parent.treeModel !== e.treeModel && t.parent.treeModel.update(),
              this.fireEvent({
                eventName: Mf.copyNode,
                node: r,
                to: { parent: t.parent.data, index: t.index }
              });
          }
        }),
        (e.prototype.getState = function() {
          return {
            expandedNodeIds: this.expandedNodeIds,
            selectedLeafNodeIds: this.selectedLeafNodeIds,
            activeNodeIds: this.activeNodeIds,
            hiddenNodeIds: this.hiddenNodeIds,
            focusedNodeId: this.focusedNodeId
          };
        }),
        (e.prototype.setState = function(e) {
          e &&
            Object.assign(this, {
              expandedNodeIds: e.expandedNodeIds || {},
              selectedLeafNodeIds: e.selectedLeafNodeIds || {},
              activeNodeIds: e.activeNodeIds || {},
              hiddenNodeIds: e.hiddenNodeIds || {},
              focusedNodeId: e.focusedNodeId
            });
        }),
        (e.prototype.subscribeToState = function(e) {
          var t = this;
          o.autorun(function() {
            return e(t.getState());
          });
        }),
        (e.prototype.canMoveNode = function(e, t, n) {
          void 0 === n && (n = void 0);
          n || e.getIndexInParent();
          return (
            (e.parent !== t.parent || n !== t.index) &&
            !t.parent.isDescendantOf(e)
          );
        }),
        (e.prototype.calculateExpandedNodes = function() {
          this._calculateExpandedNodes();
        }),
        (e.prototype._filterNode = function(e, t, n, o) {
          var r = this,
            i = n(t);
          return (
            t.children &&
              t.children.forEach(function(t) {
                r._filterNode(e, t, n, o) && (i = !0);
              }),
            i || (e[t.id] = !0),
            o && i && t.ensureVisible(),
            i
          );
        }),
        (e.prototype._calculateExpandedNodes = function(e) {
          var t,
            n = this;
          void 0 === e && (e = null),
            (e = e || this.virtualRoot),
            e.data[this.options.isExpandedField] &&
              (this.expandedNodeIds = Object.assign(
                {},
                this.expandedNodeIds,
                ((t = {}), (t[e.id] = !0), t)
              )),
            e.children &&
              e.children.forEach(function(e) {
                return n._calculateExpandedNodes(e);
              });
        }),
        (e.prototype._setActiveNodeSingle = function(e, t) {
          var n,
            o = this;
          this.activeNodes
            .filter(function(t) {
              return t !== e;
            })
            .forEach(function(e) {
              o.fireEvent({ eventName: Mf.deactivate, node: e }),
                o.fireEvent({ eventName: Mf.nodeDeactivate, node: e });
            }),
            (this.activeNodeIds = t ? ((n = {}), (n[e.id] = !0), n) : {});
        }),
        (e.prototype._setActiveNodeMulti = function(e, t) {
          var n;
          this.activeNodeIds = Object.assign(
            {},
            this.activeNodeIds,
            ((n = {}), (n[e.id] = t), n)
          );
        });
      var n;
      return (
        (e.focusedTree = null),
        Qg(
          [o.observable, ev('design:type', Array)],
          e.prototype,
          'roots',
          void 0
        ),
        Qg(
          [o.observable, ev('design:type', Object)],
          e.prototype,
          'expandedNodeIds',
          void 0
        ),
        Qg(
          [o.observable, ev('design:type', Object)],
          e.prototype,
          'selectedLeafNodeIds',
          void 0
        ),
        Qg(
          [o.observable, ev('design:type', Object)],
          e.prototype,
          'activeNodeIds',
          void 0
        ),
        Qg(
          [o.observable, ev('design:type', Object)],
          e.prototype,
          'hiddenNodeIds',
          void 0
        ),
        Qg(
          [o.observable, ev('design:type', Object)],
          e.prototype,
          'focusedNodeId',
          void 0
        ),
        Qg(
          [o.observable, ev('design:type', vg)],
          e.prototype,
          'virtualRoot',
          void 0
        ),
        Qg(
          [o.computed, ev('design:type', Object), ev('design:paramtypes', [])],
          e.prototype,
          'focusedNode',
          null
        ),
        Qg(
          [o.computed, ev('design:type', Object), ev('design:paramtypes', [])],
          e.prototype,
          'expandedNodes',
          null
        ),
        Qg(
          [o.computed, ev('design:type', Object), ev('design:paramtypes', [])],
          e.prototype,
          'activeNodes',
          null
        ),
        Qg(
          [o.computed, ev('design:type', Object), ev('design:paramtypes', [])],
          e.prototype,
          'hiddenNodes',
          null
        ),
        Qg(
          [o.computed, ev('design:type', Object), ev('design:paramtypes', [])],
          e.prototype,
          'selectedLeafNodes',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', [Object]),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'setData',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', []),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'update',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', [Object]),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'setFocusedNode',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', [Object]),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'setFocus',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', [Object]),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'doForAll',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', []),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'focusNextNode',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', []),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'focusPreviousNode',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', []),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'focusDrillDown',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', []),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'focusDrillUp',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', [Object, Object, Object]),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'setActiveNode',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', [Object, Object]),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'setSelectedNode',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', [Object, Object]),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'setExpandedNode',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', []),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'expandAll',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', []),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'collapseAll',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', [Object, Object]),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'setIsHidden',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', [Object]),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'setHiddenNodeIds',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', [Object, Object]),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'filterNodes',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', []),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'clearFilter',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', [Object, Object]),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'moveNode',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', [Object, Object]),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'copyNode',
          null
        ),
        Qg(
          [
            o.action,
            ev('design:type', Function),
            ev('design:paramtypes', [Object]),
            ev('design:returntype', void 0)
          ],
          e.prototype,
          'setState',
          null
        ),
        (e = n = Qg([t.Injectable()], e))
      );
    })(),
    nv = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    ov = (function() {
      function e() {
        this._draggedElement = null;
      }
      return (
        (e.prototype.set = function(e) {
          this._draggedElement = e;
        }),
        (e.prototype.get = function() {
          return this._draggedElement;
        }),
        (e.prototype.isDragging = function() {
          return !!this.get();
        }),
        (e = nv([t.Injectable()], e))
      );
    })(),
    rv = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    iv = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    av = (function() {
      function e(e) {
        var t = this;
        (this.treeModel = e),
          (this.yBlocks = 0),
          (this.x = 0),
          (this.viewportHeight = null),
          (this.viewport = null),
          (e.virtualScroll = this),
          (this._dispose = [
            o.autorun(function() {
              return t.fixScroll();
            })
          ]);
      }
      return (
        Object.defineProperty(e.prototype, 'y', {
          get: function() {
            return 150 * this.yBlocks;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'totalHeight', {
          get: function() {
            return this.treeModel.virtualRoot
              ? this.treeModel.virtualRoot.height
              : 0;
          },
          enumerable: !0,
          configurable: !0
        }),
        (e.prototype.fireEvent = function(e) {
          this.treeModel.fireEvent(e);
        }),
        (e.prototype.init = function() {
          var e = this,
            t = this.recalcPositions.bind(this);
          t(),
            (this._dispose = this._dispose.concat([
              o.reaction(function() {
                return e.treeModel.roots;
              }, t),
              o.reaction(function() {
                return e.treeModel.expandedNodeIds;
              }, t),
              o.reaction(function() {
                return e.treeModel.hiddenNodeIds;
              }, t)
            ])),
            this.treeModel.subscribe(Mf.loadNodeChildren, t);
        }),
        (e.prototype.isEnabled = function() {
          return this.treeModel.options.useVirtualScroll;
        }),
        (e.prototype._setYBlocks = function(e) {
          this.yBlocks = e;
        }),
        (e.prototype.recalcPositions = function() {
          this.treeModel.virtualRoot.height = this._getPositionAfter(
            this.treeModel.getVisibleRoots(),
            0
          );
        }),
        (e.prototype._getPositionAfter = function(e, t) {
          var n = this,
            o = t;
          return (
            e.forEach(function(e) {
              (e.position = o), (o = n._getPositionAfterNode(e, o));
            }),
            o
          );
        }),
        (e.prototype._getPositionAfterNode = function(e, t) {
          var n = e.getSelfHeight() + t;
          return (
            e.children &&
              e.isExpanded &&
              (n = this._getPositionAfter(e.visibleChildren, n)),
            (e.height = n - t),
            n
          );
        }),
        (e.prototype.clear = function() {
          this._dispose.forEach(function(e) {
            return e();
          });
        }),
        (e.prototype.setViewport = function(e) {
          Object.assign(this, {
            viewport: e,
            x: e.scrollLeft,
            yBlocks: Math.round(e.scrollTop / 150),
            viewportHeight: e.getBoundingClientRect
              ? e.getBoundingClientRect().height
              : 0
          });
        }),
        (e.prototype.scrollIntoView = function(e, t, n) {
          if ((void 0 === n && (n = !0), e.options.scrollContainer)) {
            var o = e.options.scrollContainer,
              r = o.getBoundingClientRect().height,
              i = o.getBoundingClientRect().top,
              a = this.viewport.getBoundingClientRect().top + e.position - i;
            (t || a < o.scrollTop || a + e.getSelfHeight() > o.scrollTop + r) &&
              (o.scrollTop = n ? a - r / 2 : a);
          } else
            (t ||
              e.position < this.y ||
              e.position + e.getSelfHeight() > this.y + this.viewportHeight) &&
              this.viewport &&
              ((this.viewport.scrollTop = n
                ? e.position - this.viewportHeight / 2
                : e.position),
              this._setYBlocks(Math.floor(this.viewport.scrollTop / 150)));
        }),
        (e.prototype.getViewportNodes = function(e) {
          var t = this;
          if (!e) return [];
          var n = e.filter(function(e) {
            return !e.isHidden;
          });
          if (!this.isEnabled()) return n;
          if (!this.viewportHeight || !n.length) return [];
          var o = rn(n, function(e) {
              return e.position + 500 > t.y || e.position + e.height > t.y;
            }),
            r = rn(
              n,
              function(e) {
                return e.position - 500 > t.y + t.viewportHeight;
              },
              o
            ),
            i = [],
            a = n[0].treeModel.options.options.nodeHeight;
          if (r - o > (1e3 + this.viewportHeight) / a) return [];
          for (var s = o; s <= r; s++) i.push(n[s]);
          return i;
        }),
        (e.prototype.fixScroll = function() {
          var e = Math.max(0, this.totalHeight - this.viewportHeight);
          this.y < 0 && this._setYBlocks(0),
            this.y > e && this._setYBlocks(e / 150);
        }),
        rv(
          [o.observable, iv('design:type', Object)],
          e.prototype,
          'yBlocks',
          void 0
        ),
        rv([o.observable, iv('design:type', Object)], e.prototype, 'x', void 0),
        rv(
          [o.observable, iv('design:type', Object)],
          e.prototype,
          'viewportHeight',
          void 0
        ),
        rv(
          [o.computed, iv('design:type', Object), iv('design:paramtypes', [])],
          e.prototype,
          'y',
          null
        ),
        rv(
          [o.computed, iv('design:type', Object), iv('design:paramtypes', [])],
          e.prototype,
          'totalHeight',
          null
        ),
        rv(
          [
            o.action,
            iv('design:type', Function),
            iv('design:paramtypes', [Object]),
            iv('design:returntype', void 0)
          ],
          e.prototype,
          '_setYBlocks',
          null
        ),
        rv(
          [
            o.action,
            iv('design:type', Function),
            iv('design:paramtypes', []),
            iv('design:returntype', void 0)
          ],
          e.prototype,
          'recalcPositions',
          null
        ),
        rv(
          [
            o.action,
            iv('design:type', Function),
            iv('design:paramtypes', [Object]),
            iv('design:returntype', void 0)
          ],
          e.prototype,
          'setViewport',
          null
        ),
        rv(
          [
            o.action,
            iv('design:type', Function),
            iv('design:paramtypes', [Object, Object, Object]),
            iv('design:returntype', void 0)
          ],
          e.prototype,
          'scrollIntoView',
          null
        ),
        (e = rv([t.Injectable(), iv('design:paramtypes', [tv])], e))
      );
    })(),
    sv = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    cv = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    dv = (function() {
      function e() {}
      return (
        sv(
          [t.Input(), cv('design:type', t.TemplateRef)],
          e.prototype,
          'template',
          void 0
        ),
        sv([t.Input(), cv('design:type', vg)], e.prototype, 'node', void 0),
        (e = sv(
          [
            t.Component({
              encapsulation: t.ViewEncapsulation.None,
              selector: 'tree-loading-component',
              template:
                '\n    <span *ngIf="!template">loading...</span>\n    <ng-container\n      [ngTemplateOutlet]="template"\n      [ngTemplateOutletContext]="{ $implicit: node }">\n    </ng-container>\n  '
            })
          ],
          e
        ))
      );
    })(),
    pv = Mn,
    lv = function() {
      return pv.Date.now();
    },
    uv = lv,
    fv = no,
    hv = uv,
    yv = Pg,
    gv = 'Expected a function',
    vv = Math.max,
    bv = Math.min,
    mv = an,
    Ov = mv,
    jv = no,
    Nv = 'Expected a function',
    Ev = sn,
    wv = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    Dv = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    _v = (function() {
      function e(e, t, n) {
        var o = this;
        (this.elementRef = e),
          (this.ngZone = t),
          (this.virtualScroll = n),
          (this.setViewport = Ev(function() {
            o.virtualScroll.setViewport(o.elementRef.nativeElement);
          }, 17)),
          (this.scrollEventHandler = this.setViewport.bind(this));
      }
      return (
        (e.prototype.ngOnInit = function() {
          this.virtualScroll.init();
        }),
        (e.prototype.ngAfterViewInit = function() {
          var e = this;
          setTimeout(function() {
            e.setViewport(),
              e.virtualScroll.fireEvent({ eventName: Mf.initialized });
          });
          var t = this.elementRef.nativeElement;
          this.ngZone.runOutsideAngular(function() {
            t.addEventListener('scroll', e.scrollEventHandler);
          });
        }),
        (e.prototype.ngOnDestroy = function() {
          this.virtualScroll.clear(),
            this.elementRef.nativeElement.removeEventListener(
              'scroll',
              this.scrollEventHandler
            );
        }),
        (e.prototype.getTotalHeight = function() {
          return (
            (this.virtualScroll.isEnabled() &&
              this.virtualScroll.totalHeight + 'px') ||
            'auto'
          );
        }),
        (e = wv(
          [
            t.Component({
              selector: 'tree-viewport',
              styles: [],
              providers: [av],
              template:
                '\n    <ng-container *treeMobxAutorun="{ dontDetach: true }">\n      <div [style.height]="getTotalHeight()">\n        <ng-content></ng-content>\n      </div>\n    </ng-container>\n  '
            }),
            Dv('design:paramtypes', [t.ElementRef, t.NgZone, av])
          ],
          e
        ))
      );
    })(),
    xv = cn,
    Iv = dn,
    Cv = Eg,
    Rv = xv,
    Av = Iv,
    Pv = pn,
    Sv = Jc,
    Fv = ln,
    Tv = Fv,
    Mv = Fd,
    Lv = un,
    kv = Pv,
    Vv = Ra,
    Hv = Jg,
    Bv = kg,
    $v = Lv,
    zv = Math.max,
    Uv = fn,
    Gv = ps,
    Wv = fd,
    Zv = vs,
    Yv = no,
    qv = gd,
    Kv = hn,
    Xv = md,
    Jv = Kv,
    Qv = fd,
    eb = yn,
    tb = eb,
    nb = by,
    ob = gn,
    rb = ob,
    ib = tf,
    ab = ib(function(e, t) {
      return null == e ? {} : rb(e, t);
    }),
    sb = ab,
    cb = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    db = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    pb = (function() {
      function e(e, n) {
        var o = this;
        (this.treeModel = e),
          (this.treeDraggedElement = n),
          e.eventNames.forEach(function(e) {
            return (o[e] = new t.EventEmitter());
          }),
          e.subscribeToState(function(e) {
            return o.stateChange.emit(e);
          });
      }
      return (
        Object.defineProperty(e.prototype, 'nodes', {
          set: function(e) {},
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'options', {
          set: function(e) {},
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'focused', {
          set: function(e) {
            this.treeModel.setFocus(e);
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'state', {
          set: function(e) {
            this.treeModel.setState(e);
          },
          enumerable: !0,
          configurable: !0
        }),
        (e.prototype.onKeydown = function(e) {
          if (
            this.treeModel.isFocused &&
            !Uv(
              ['input', 'textarea'],
              document.activeElement.tagName.toLowerCase()
            )
          ) {
            var t = this.treeModel.getFocusedNode();
            this.treeModel.performKeyAction(t, e);
          }
        }),
        (e.prototype.onMousedown = function(e) {
          function t(e, n) {
            return !e || (e.localName !== n && t(e.parentElement, n));
          }
          t(e.target, 'tree-root') && this.treeModel.setFocus(!1);
        }),
        (e.prototype.ngOnChanges = function(e) {
          (e.options || e.nodes) &&
            this.treeModel.setData({
              options: e.options && e.options.currentValue,
              nodes: e.nodes && e.nodes.currentValue,
              events: sb(this, this.treeModel.eventNames)
            });
        }),
        (e.prototype.sizeChanged = function() {
          this.viewportComponent.setViewport();
        }),
        cb(
          [
            t.ContentChild('loadingTemplate', { static: !1 }),
            db('design:type', t.TemplateRef)
          ],
          e.prototype,
          'loadingTemplate',
          void 0
        ),
        cb(
          [
            t.ContentChild('treeNodeTemplate', { static: !1 }),
            db('design:type', t.TemplateRef)
          ],
          e.prototype,
          'treeNodeTemplate',
          void 0
        ),
        cb(
          [
            t.ContentChild('treeNodeWrapperTemplate', { static: !1 }),
            db('design:type', t.TemplateRef)
          ],
          e.prototype,
          'treeNodeWrapperTemplate',
          void 0
        ),
        cb(
          [
            t.ContentChild('treeNodeFullTemplate', { static: !1 }),
            db('design:type', t.TemplateRef)
          ],
          e.prototype,
          'treeNodeFullTemplate',
          void 0
        ),
        cb(
          [t.ViewChild('viewport', { static: !1 }), db('design:type', _v)],
          e.prototype,
          'viewportComponent',
          void 0
        ),
        cb(
          [
            t.Input(),
            db('design:type', Array),
            db('design:paramtypes', [Array])
          ],
          e.prototype,
          'nodes',
          null
        ),
        cb(
          [t.Input(), db('design:type', Tf), db('design:paramtypes', [Tf])],
          e.prototype,
          'options',
          null
        ),
        cb(
          [
            t.Input(),
            db('design:type', Boolean),
            db('design:paramtypes', [Boolean])
          ],
          e.prototype,
          'focused',
          null
        ),
        cb(
          [
            t.Input(),
            db('design:type', Object),
            db('design:paramtypes', [Object])
          ],
          e.prototype,
          'state',
          null
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'toggleExpanded',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'activate',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'deactivate',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'nodeActivate',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'nodeDeactivate',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'select',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'deselect',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'focus',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'blur',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'updateData',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'initialized',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'moveNode',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'copyNode',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'loadNodeChildren',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'changeFilter',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'event',
          void 0
        ),
        cb(
          [t.Output(), db('design:type', Object)],
          e.prototype,
          'stateChange',
          void 0
        ),
        cb(
          [
            t.HostListener('body: keydown', ['$event']),
            db('design:type', Function),
            db('design:paramtypes', [Object]),
            db('design:returntype', void 0)
          ],
          e.prototype,
          'onKeydown',
          null
        ),
        cb(
          [
            t.HostListener('body: mousedown', ['$event']),
            db('design:type', Function),
            db('design:paramtypes', [Object]),
            db('design:returntype', void 0)
          ],
          e.prototype,
          'onMousedown',
          null
        ),
        (e = cb(
          [
            t.Component({
              selector: 'Tree, tree-root',
              providers: [tv],
              styles: [],
              template:
                '\n      <tree-viewport #viewport>\n          <div\n                  class="angular-tree-component"\n                  [class.node-dragging]="treeDraggedElement.isDragging()"\n                  [class.angular-tree-component-rtl]="treeModel.options.rtl">\n              <tree-node-collection\n                      *ngIf="treeModel.roots"\n                      [nodes]="treeModel.roots"\n                      [treeModel]="treeModel"\n                      [templates]="{\n            loadingTemplate: loadingTemplate,\n            treeNodeTemplate: treeNodeTemplate,\n            treeNodeWrapperTemplate: treeNodeWrapperTemplate,\n            treeNodeFullTemplate: treeNodeFullTemplate\n          }">\n              </tree-node-collection>\n              <tree-node-drop-slot\n                      class="empty-tree-drop-slot"\n                      *ngIf="treeModel.isEmptyTree()"\n                      [dropIndex]="0"\n                      [node]="treeModel.virtualRoot">\n              </tree-node-drop-slot>\n          </div>\n      </tree-viewport>\n  '
            }),
            db('design:paramtypes', [tv, ov])
          ],
          e
        ))
      );
    })(),
    lb = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    ub = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    fb = (function() {
      function e() {}
      return (
        lb([t.Input(), ub('design:type', vg)], e.prototype, 'node', void 0),
        lb(
          [t.Input(), ub('design:type', Number)],
          e.prototype,
          'index',
          void 0
        ),
        lb(
          [t.Input(), ub('design:type', Object)],
          e.prototype,
          'templates',
          void 0
        ),
        (e = lb(
          [
            t.Component({
              selector: 'TreeNode, tree-node',
              encapsulation: t.ViewEncapsulation.None,
              styles: [],
              template:
                '\n    <ng-container *treeMobxAutorun="{ dontDetach: true }">\n      <div\n        *ngIf="!templates.treeNodeFullTemplate"\n        [class]="node.getClass()"\n        [class.tree-node]="true"\n        [class.tree-node-expanded]="node.isExpanded && node.hasChildren"\n        [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"\n        [class.tree-node-leaf]="node.isLeaf"\n        [class.tree-node-active]="node.isActive"\n        [class.tree-node-focused]="node.isFocused"\n      >\n        <tree-node-drop-slot\n          *ngIf="index === 0"\n          [dropIndex]="node.index"\n          [node]="node.parent"\n        ></tree-node-drop-slot>\n\n        <tree-node-wrapper\n          [node]="node"\n          [index]="index"\n          [templates]="templates"\n        ></tree-node-wrapper>\n\n        <tree-node-children\n          [node]="node"\n          [templates]="templates"\n        ></tree-node-children>\n        <tree-node-drop-slot\n          [dropIndex]="node.index + 1"\n          [node]="node.parent"\n        ></tree-node-drop-slot>\n      </div>\n      <ng-container\n        [ngTemplateOutlet]="templates.treeNodeFullTemplate"\n        [ngTemplateOutletContext]="{\n          $implicit: node,\n          node: node,\n          index: index,\n          templates: templates\n        }"\n      >\n      </ng-container>\n    </ng-container>\n  '
            })
          ],
          e
        ))
      );
    })(),
    hb = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    yb = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    gb = (function() {
      function e() {}
      return (
        hb([t.Input(), yb('design:type', vg)], e.prototype, 'node', void 0),
        hb(
          [t.Input(), yb('design:type', Number)],
          e.prototype,
          'index',
          void 0
        ),
        hb(
          [t.Input(), yb('design:type', t.TemplateRef)],
          e.prototype,
          'template',
          void 0
        ),
        (e = hb(
          [
            t.Component({
              selector: 'tree-node-content',
              encapsulation: t.ViewEncapsulation.None,
              template:
                '\n  <span *ngIf="!template">{{ node.displayField }}</span>\n  <ng-container\n    [ngTemplateOutlet]="template"\n    [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index }">\n  </ng-container>'
            })
          ],
          e
        ))
      );
    })(),
    vb = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    bb = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    mb = (function() {
      function e() {}
      return (
        (e.prototype.onDrop = function(e) {
          this.node.mouseAction('drop', e.event, {
            from: e.element,
            to: { parent: this.node, index: this.dropIndex }
          });
        }),
        (e.prototype.allowDrop = function(e, t) {
          return this.node.options.allowDrop(
            e,
            { parent: this.node, index: this.dropIndex },
            t
          );
        }),
        vb([t.Input(), bb('design:type', vg)], e.prototype, 'node', void 0),
        vb(
          [t.Input(), bb('design:type', Number)],
          e.prototype,
          'dropIndex',
          void 0
        ),
        (e = vb(
          [
            t.Component({
              selector: 'TreeNodeDropSlot, tree-node-drop-slot',
              encapsulation: t.ViewEncapsulation.None,
              styles: [],
              template:
                '\n    <div\n      class="node-drop-slot"\n      (treeDrop)="onDrop($event)"\n      [treeAllowDrop]="allowDrop.bind(this)"\n      [allowDragoverStyling]="true">\n    </div>\n  '
            })
          ],
          e
        ))
      );
    })(),
    Ob = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    jb = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    Nb = (function() {
      function e() {}
      return (
        Ob([t.Input(), jb('design:type', vg)], e.prototype, 'node', void 0),
        (e = Ob(
          [
            t.Component({
              selector: 'tree-node-expander',
              encapsulation: t.ViewEncapsulation.None,
              styles: [],
              template:
                '\n    <ng-container *treeMobxAutorun="{ dontDetach: true }">\n      <span\n        *ngIf="node.hasChildren"\n        [class.toggle-children-wrapper-expanded]="node.isExpanded"\n        [class.toggle-children-wrapper-collapsed]="node.isCollapsed"\n        class="toggle-children-wrapper"\n        (click)="node.mouseAction(\'expanderClick\', $event)"\n      >\n        <span class="toggle-children"></span>\n      </span>\n      <span *ngIf="!node.hasChildren" class="toggle-children-placeholder">\n      </span>\n    </ng-container>\n  '
            })
          ],
          e
        ))
      );
    })(),
    Eb = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    wb = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    Db = (function() {
      function e() {}
      return (
        Eb([t.Input(), wb('design:type', vg)], e.prototype, 'node', void 0),
        Eb(
          [t.Input(), wb('design:type', Object)],
          e.prototype,
          'templates',
          void 0
        ),
        (e = Eb(
          [
            t.Component({
              selector: 'tree-node-children',
              encapsulation: t.ViewEncapsulation.None,
              styles: [],
              template:
                '\n    <ng-container *treeMobxAutorun="{ dontDetach: true }">\n      <div\n        [class.tree-children]="true"\n        [class.tree-children-no-padding]="node.options.levelPadding"\n        *treeAnimateOpen="\n          node.isExpanded;\n          speed: node.options.animateSpeed;\n          acceleration: node.options.animateAcceleration;\n          enabled: node.options.animateExpand\n        "\n      >\n        <tree-node-collection\n          *ngIf="node.children"\n          [nodes]="node.children"\n          [templates]="templates"\n          [treeModel]="node.treeModel"\n        >\n        </tree-node-collection>\n        <tree-loading-component\n          [style.padding-left]="node.getNodePadding()"\n          class="tree-node-loading"\n          *ngIf="!node.children"\n          [template]="templates.loadingTemplate"\n          [node]="node"\n        ></tree-loading-component>\n      </div>\n    </ng-container>\n  '
            })
          ],
          e
        ))
      );
    })(),
    _b = Object.assign(vn, o.action),
    xb = Object.assign(bn, o.computed),
    Ib = Object.assign(mn, o.observable),
    Cb = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    Rb = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    Ab = (function() {
      function e() {
        this._dispose = [];
      }
      return (
        Object.defineProperty(e.prototype, 'nodes', {
          get: function() {
            return this._nodes;
          },
          set: function(e) {
            this.setNodes(e);
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'marginTop', {
          get: function() {
            var e =
              this.viewportNodes &&
              this.viewportNodes.length &&
              this.viewportNodes[0];
            return (
              (e && e.parent
                ? e.position - e.parent.position - e.parent.getSelfHeight()
                : 0) + 'px'
            );
          },
          enumerable: !0,
          configurable: !0
        }),
        (e.prototype.setNodes = function(e) {
          this._nodes = e;
        }),
        (e.prototype.ngOnInit = function() {
          var e = this;
          (this.virtualScroll = this.treeModel.virtualScroll),
            (this._dispose = [
              o.reaction(
                function() {
                  return e.virtualScroll
                    .getViewportNodes(e.nodes)
                    .map(function(e) {
                      return e.index;
                    });
                },
                function(t) {
                  e.viewportNodes = t.map(function(t) {
                    return e.nodes[t];
                  });
                },
                { compareStructural: !0, fireImmediately: !0 }
              ),
              o.reaction(
                function() {
                  return e.nodes;
                },
                function(t) {
                  e.viewportNodes = e.virtualScroll.getViewportNodes(t);
                }
              )
            ]);
        }),
        (e.prototype.ngOnDestroy = function() {
          this._dispose.forEach(function(e) {
            return e();
          });
        }),
        (e.prototype.trackNode = function(e, t) {
          return t.id;
        }),
        Cb(
          [
            t.Input(),
            Rb('design:type', Object),
            Rb('design:paramtypes', [Object])
          ],
          e.prototype,
          'nodes',
          null
        ),
        Cb(
          [t.Input(), Rb('design:type', tv)],
          e.prototype,
          'treeModel',
          void 0
        ),
        Cb([Ib, Rb('design:type', Object)], e.prototype, '_nodes', void 0),
        Cb(
          [t.Input(), Rb('design:type', Object)],
          e.prototype,
          'templates',
          void 0
        ),
        Cb(
          [Ib, Rb('design:type', Array)],
          e.prototype,
          'viewportNodes',
          void 0
        ),
        Cb(
          [xb, Rb('design:type', String), Rb('design:paramtypes', [])],
          e.prototype,
          'marginTop',
          null
        ),
        Cb(
          [
            _b,
            Rb('design:type', Function),
            Rb('design:paramtypes', [Object]),
            Rb('design:returntype', void 0)
          ],
          e.prototype,
          'setNodes',
          null
        ),
        (e = Cb(
          [
            t.Component({
              selector: 'tree-node-collection',
              encapsulation: t.ViewEncapsulation.None,
              template:
                '\n    <ng-container *treeMobxAutorun="{ dontDetach: true }">\n      <div [style.margin-top]="marginTop">\n        <tree-node\n          *ngFor="let node of viewportNodes; let i = index; trackBy: trackNode"\n          [node]="node"\n          [index]="i"\n          [templates]="templates"\n        >\n        </tree-node>\n      </div>\n    </ng-container>\n  '
            })
          ],
          e
        ))
      );
    })(),
    Pb = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    Sb = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    Fb = (function() {
      function e() {}
      return (
        Pb([t.Input(), Sb('design:type', vg)], e.prototype, 'node', void 0),
        Pb(
          [t.Input(), Sb('design:type', Number)],
          e.prototype,
          'index',
          void 0
        ),
        Pb(
          [t.Input(), Sb('design:type', Object)],
          e.prototype,
          'templates',
          void 0
        ),
        (e = Pb(
          [
            t.Component({
              selector: 'tree-node-wrapper',
              encapsulation: t.ViewEncapsulation.None,
              styles: [],
              template:
                '\n      <div *ngIf="!templates.treeNodeWrapperTemplate" class="node-wrapper" [style.padding-left]="node.getNodePadding()">\n          <tree-node-checkbox *ngIf="node.options.useCheckbox" [node]="node"></tree-node-checkbox>\n          <tree-node-expander [node]="node"></tree-node-expander>\n          <div class="node-content-wrapper"\n               [class.node-content-wrapper-active]="node.isActive"\n               [class.node-content-wrapper-focused]="node.isFocused"\n               (click)="node.mouseAction(\'click\', $event)"\n               (dblclick)="node.mouseAction(\'dblClick\', $event)"\n               (mouseover)="node.mouseAction(\'mouseOver\', $event)"\n               (mouseout)="node.mouseAction(\'mouseOut\', $event)"\n               (contextmenu)="node.mouseAction(\'contextMenu\', $event)"\n               (treeDrop)="node.onDrop($event)"\n               (treeDropDragOver)="node.mouseAction(\'dragOver\', $event)"\n               (treeDropDragLeave)="node.mouseAction(\'dragLeave\', $event)"\n               (treeDropDragEnter)="node.mouseAction(\'dragEnter\', $event)"\n               [treeAllowDrop]="node.allowDrop"\n               [allowDragoverStyling]="node.allowDragoverStyling()"\n               [treeDrag]="node"\n               [treeDragEnabled]="node.allowDrag()">\n\n              <tree-node-content [node]="node" [index]="index" [template]="templates.treeNodeTemplate">\n              </tree-node-content>\n          </div>\n      </div>\n      <ng-container\n              [ngTemplateOutlet]="templates.treeNodeWrapperTemplate"\n              [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index, templates: templates }">\n      </ng-container>\n  '
            }),
            Sb('design:paramtypes', [])
          ],
          e
        ))
      );
    })(),
    Tb = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    Mb = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    Lb = (function() {
      function e() {}
      return (
        Tb([t.Input(), Mb('design:type', vg)], e.prototype, 'node', void 0),
        (e = Tb(
          [
            t.Component({
              selector: 'tree-node-checkbox',
              encapsulation: t.ViewEncapsulation.None,
              styles: [],
              template:
                '\n    <ng-container *treeMobxAutorun="{ dontDetach: true }">\n      <input\n        class="tree-node-checkbox"\n        type="checkbox"\n        (click)="node.mouseAction(\'checkboxClick\', $event)"\n        [checked]="node.isSelected"\n        [indeterminate]="node.isPartiallySelected"\n      />\n    </ng-container>\n  '
            })
          ],
          e
        ))
      );
    })(),
    kb = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    Vb = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    Hb = (function() {
      function e(e, n, o, r) {
        (this.el = e),
          (this.renderer = n),
          (this.treeDraggedElement = o),
          (this.ngZone = r),
          (this.allowDragoverStyling = !0),
          (this.onDropCallback = new t.EventEmitter()),
          (this.onDragOverCallback = new t.EventEmitter()),
          (this.onDragLeaveCallback = new t.EventEmitter()),
          (this.onDragEnterCallback = new t.EventEmitter()),
          (this._allowDrop = function(e, t) {
            return !0;
          }),
          (this.dragOverEventHandler = this.onDragOver.bind(this)),
          (this.dragEnterEventHandler = this.onDragEnter.bind(this)),
          (this.dragLeaveEventHandler = this.onDragLeave.bind(this));
      }
      return (
        Object.defineProperty(e.prototype, 'treeAllowDrop', {
          set: function(e) {
            e instanceof Function
              ? (this._allowDrop = e)
              : (this._allowDrop = function(t, n) {
                  return e;
                });
          },
          enumerable: !0,
          configurable: !0
        }),
        (e.prototype.allowDrop = function(e) {
          return this._allowDrop(this.treeDraggedElement.get(), e);
        }),
        (e.prototype.ngAfterViewInit = function() {
          var e = this,
            t = this.el.nativeElement;
          this.ngZone.runOutsideAngular(function() {
            t.addEventListener('dragover', e.dragOverEventHandler),
              t.addEventListener('dragenter', e.dragEnterEventHandler),
              t.addEventListener('dragleave', e.dragLeaveEventHandler);
          });
        }),
        (e.prototype.ngOnDestroy = function() {
          var e = this.el.nativeElement;
          e.removeEventListener('dragover', this.dragOverEventHandler),
            e.removeEventListener('dragenter', this.dragEnterEventHandler),
            e.removeEventListener('dragleave', this.dragLeaveEventHandler);
        }),
        (e.prototype.onDragOver = function(e) {
          if (this.allowDrop(e))
            this.onDragOverCallback.emit({
              event: e,
              element: this.treeDraggedElement.get()
            }),
              e.preventDefault(),
              this.allowDragoverStyling && this.addClass();
          else if (this.allowDragoverStyling) return this.addDisabledClass();
        }),
        (e.prototype.onDragEnter = function(e) {
          this.allowDrop(e) &&
            (e.preventDefault(),
            this.onDragEnterCallback.emit({
              event: e,
              element: this.treeDraggedElement.get()
            }));
        }),
        (e.prototype.onDragLeave = function(e) {
          if (this.allowDrop(e))
            this.onDragLeaveCallback.emit({
              event: e,
              element: this.treeDraggedElement.get()
            }),
              this.allowDragoverStyling && this.removeClass();
          else if (this.allowDragoverStyling) return this.removeDisabledClass();
        }),
        (e.prototype.onDrop = function(e) {
          this.allowDrop(e) &&
            (e.preventDefault(),
            this.onDropCallback.emit({
              event: e,
              element: this.treeDraggedElement.get()
            }),
            this.allowDragoverStyling && this.removeClass(),
            this.treeDraggedElement.set(null));
        }),
        (e.prototype.addClass = function() {
          this.renderer.addClass(this.el.nativeElement, 'is-dragging-over');
        }),
        (e.prototype.removeClass = function() {
          this.renderer.removeClass(this.el.nativeElement, 'is-dragging-over');
        }),
        (e.prototype.addDisabledClass = function() {
          this.renderer.addClass(
            this.el.nativeElement,
            'is-dragging-over-disabled'
          );
        }),
        (e.prototype.removeDisabledClass = function() {
          this.renderer.removeClass(
            this.el.nativeElement,
            'is-dragging-over-disabled'
          );
        }),
        kb(
          [t.Input(), Vb('design:type', Object)],
          e.prototype,
          'allowDragoverStyling',
          void 0
        ),
        kb(
          [t.Output('treeDrop'), Vb('design:type', Object)],
          e.prototype,
          'onDropCallback',
          void 0
        ),
        kb(
          [t.Output('treeDropDragOver'), Vb('design:type', Object)],
          e.prototype,
          'onDragOverCallback',
          void 0
        ),
        kb(
          [t.Output('treeDropDragLeave'), Vb('design:type', Object)],
          e.prototype,
          'onDragLeaveCallback',
          void 0
        ),
        kb(
          [t.Output('treeDropDragEnter'), Vb('design:type', Object)],
          e.prototype,
          'onDragEnterCallback',
          void 0
        ),
        kb(
          [
            t.Input(),
            Vb('design:type', Object),
            Vb('design:paramtypes', [Object])
          ],
          e.prototype,
          'treeAllowDrop',
          null
        ),
        kb(
          [
            t.HostListener('drop', ['$event']),
            Vb('design:type', Function),
            Vb('design:paramtypes', [Object]),
            Vb('design:returntype', void 0)
          ],
          e.prototype,
          'onDrop',
          null
        ),
        (e = kb(
          [
            t.Directive({ selector: '[treeDrop]' }),
            Vb('design:paramtypes', [t.ElementRef, t.Renderer2, ov, t.NgZone])
          ],
          e
        ))
      );
    })(),
    Bb = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    $b = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    zb = (function() {
      function e(e, t, n, o) {
        (this.el = e),
          (this.renderer = t),
          (this.treeDraggedElement = n),
          (this.ngZone = o),
          (this.dragEventHandler = this.onDrag.bind(this));
      }
      return (
        (e.prototype.ngAfterViewInit = function() {
          var e = this,
            t = this.el.nativeElement;
          this.ngZone.runOutsideAngular(function() {
            t.addEventListener('drag', e.dragEventHandler);
          });
        }),
        (e.prototype.ngDoCheck = function() {
          this.renderer.setAttribute(
            this.el.nativeElement,
            'draggable',
            this.treeDragEnabled ? 'true' : 'false'
          );
        }),
        (e.prototype.ngOnDestroy = function() {
          this.el.nativeElement.removeEventListener(
            'drag',
            this.dragEventHandler
          );
        }),
        (e.prototype.onDragStart = function(e) {
          e.dataTransfer.setData('text', e.target.id),
            this.treeDraggedElement.set(this.draggedElement),
            this.draggedElement.mouseAction &&
              this.draggedElement.mouseAction('dragStart', e);
        }),
        (e.prototype.onDrag = function(e) {
          this.draggedElement.mouseAction &&
            this.draggedElement.mouseAction('drag', e);
        }),
        (e.prototype.onDragEnd = function() {
          this.draggedElement.mouseAction &&
            this.draggedElement.mouseAction('dragEnd'),
            this.treeDraggedElement.set(null);
        }),
        Bb(
          [t.Input('treeDrag'), $b('design:type', Object)],
          e.prototype,
          'draggedElement',
          void 0
        ),
        Bb(
          [t.Input(), $b('design:type', Object)],
          e.prototype,
          'treeDragEnabled',
          void 0
        ),
        Bb(
          [
            t.HostListener('dragstart', ['$event']),
            $b('design:type', Function),
            $b('design:paramtypes', [Object]),
            $b('design:returntype', void 0)
          ],
          e.prototype,
          'onDragStart',
          null
        ),
        Bb(
          [
            t.HostListener('dragend'),
            $b('design:type', Function),
            $b('design:paramtypes', []),
            $b('design:returntype', void 0)
          ],
          e.prototype,
          'onDragEnd',
          null
        ),
        (e = Bb(
          [
            t.Directive({ selector: '[treeDrag]' }),
            $b('design:paramtypes', [t.ElementRef, t.Renderer2, ov, t.NgZone])
          ],
          e
        ))
      );
    })(),
    Ub = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    Gb = function(e, t) {
      if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    },
    Wb = (function() {
      function e(e, t, n) {
        (this.renderer = e),
          (this.templateRef = t),
          (this.viewContainerRef = n);
      }
      return (
        Object.defineProperty(e.prototype, 'isOpen', {
          set: function(e) {
            e
              ? (this._show(),
                this.isEnabled && !1 === this._isOpen && this._animateOpen())
              : this.isEnabled
              ? this._animateClose()
              : this._hide(),
              (this._isOpen = !!e);
          },
          enumerable: !0,
          configurable: !0
        }),
        (e.prototype._show = function() {
          this.innerElement ||
            (this.innerElement = this.viewContainerRef.createEmbeddedView(
              this.templateRef
            ).rootNodes[0]);
        }),
        (e.prototype._hide = function() {
          this.viewContainerRef.clear(), (this.innerElement = null);
        }),
        (e.prototype._animateOpen = function() {
          var e = this,
            t = this.animateSpeed,
            n = this.animateAcceleration,
            o = 0;
          this.renderer.setStyle(this.innerElement, 'max-height', '0'),
            setTimeout(function() {
              var r = setInterval(function() {
                if (!e._isOpen || !e.innerElement) return clearInterval(r);
                o += t;
                var i = Math.round(o);
                e.renderer.setStyle(e.innerElement, 'max-height', i + 'px');
                var a = e.innerElement.getBoundingClientRect
                  ? e.innerElement.getBoundingClientRect().height
                  : 0;
                (t *= n),
                  (n *= 1.005),
                  a < i &&
                    (e.renderer.setStyle(e.innerElement, 'max-height', null),
                    clearInterval(r));
              }, 17);
            });
        }),
        (e.prototype._animateClose = function() {
          var e = this;
          if (this.innerElement)
            var t = this.animateSpeed,
              n = this.animateAcceleration,
              o = this.innerElement.getBoundingClientRect().height,
              r = setInterval(function() {
                if (e._isOpen || !e.innerElement) return clearInterval(r);
                (o -= t),
                  e.renderer.setStyle(e.innerElement, 'max-height', o + 'px'),
                  (t *= n),
                  (n *= 1.005),
                  o <= 0 &&
                    (e.viewContainerRef.clear(),
                    (e.innerElement = null),
                    clearInterval(r));
              }, 17);
        }),
        Ub(
          [t.Input('treeAnimateOpenSpeed'), Gb('design:type', Number)],
          e.prototype,
          'animateSpeed',
          void 0
        ),
        Ub(
          [t.Input('treeAnimateOpenAcceleration'), Gb('design:type', Number)],
          e.prototype,
          'animateAcceleration',
          void 0
        ),
        Ub(
          [t.Input('treeAnimateOpenEnabled'), Gb('design:type', Boolean)],
          e.prototype,
          'isEnabled',
          void 0
        ),
        Ub(
          [
            t.Input('treeAnimateOpen'),
            Gb('design:type', Boolean),
            Gb('design:paramtypes', [Boolean])
          ],
          e.prototype,
          'isOpen',
          null
        ),
        (e = Ub(
          [
            t.Directive({ selector: '[treeAnimateOpen]' }),
            Gb('design:paramtypes', [
              t.Renderer2,
              t.TemplateRef,
              t.ViewContainerRef
            ])
          ],
          e
        ))
      );
    })();
  'undefined' != typeof Element &&
    ('function' != typeof Element.prototype.matches &&
      (Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(e) {
          for (
            var t = this,
              n = (t.document || t.ownerDocument).querySelectorAll(e),
              o = 0;
            n[o] && n[o] !== t;

          )
            ++o;
          return Boolean(n[o]);
        }),
    'function' != typeof Element.prototype.closest &&
      (Element.prototype.closest = function(e) {
        for (var t = this; t && 1 === t.nodeType; ) {
          if (t.matches(e)) return t;
          t = t.parentNode;
        }
        return null;
      }));
  var Zb = function(e, t, n, o) {
      var r,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, o);
      else
        for (var s = e.length - 1; s >= 0; s--)
          (r = e[s]) &&
            (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    },
    Yb = (function() {
      function e() {}
      (o = e),
        (e.forRoot = function() {
          return { ngModule: o, providers: [ov] };
        });
      var o;
      return (e = o = Zb(
        [
          t.NgModule({
            declarations: [
              pb,
              fb,
              gb,
              dv,
              Hb,
              zb,
              Nb,
              Db,
              mb,
              Ab,
              _v,
              Fb,
              Lb,
              Wb,
              Nn
            ],
            exports: [
              pb,
              fb,
              gb,
              dv,
              Hb,
              zb,
              Nb,
              Db,
              mb,
              Ab,
              _v,
              Fb,
              Lb,
              Wb,
              Nn
            ],
            imports: [n.CommonModule],
            providers: []
          })
        ],
        e
      ));
    })();
  (e.TreeModule = Yb),
    (e.TreeModel = tv),
    (e.TreeNode = vg),
    (e.TreeDraggedElement = ov),
    (e.TreeVirtualScroll = av),
    (e.TREE_ACTIONS = Sf),
    (e.KEYS = En),
    (e.LoadingComponent = dv),
    (e.TreeAnimateOpenDirective = Wb),
    (e.TreeComponent = pb),
    (e.TreeNodeComponent = fb),
    (e.TreeNodeWrapperComponent = Fb),
    (e.TreeNodeContent = gb),
    (e.TreeDropDirective = Hb),
    (e.TreeDragDirective = zb),
    (e.TreeNodeExpanderComponent = Nb),
    (e.TreeNodeChildrenComponent = Db),
    (e.TreeNodeDropSlot = mb),
    (e.TreeNodeCollectionComponent = Ab),
    (e.TreeViewportComponent = _v),
    (e.TreeNodeCheckboxComponent = Lb),
    Object.defineProperty(e, '__esModule', { value: !0 });
});
//# sourceMappingURL=angular-tree-component.umd.js.map
