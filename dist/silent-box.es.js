import { defineComponent as z, inject as X, computed as $, reactive as V, onUpdated as A, openBlock as c, createElementBlock as d, createVNode as P, Transition as j, withCtx as H, withModifiers as y, createElementVNode as p, unref as w, toDisplayString as T, createCommentVNode as S, withKeys as U, renderSlot as G, Fragment as F, renderList as q, createApp as W } from "vue";
const K = (o) => {
  const e = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/.exec(o);
  return e != null && e[7] !== void 0 ? e[7] : "";
}, O = (o) => {
  const e = /(vimeo(pro)?\.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/.exec(o);
  return e ? e[3] : "";
}, J = (o) => {
  const e = /(?:player\.twitch\.tv\/\?channel=|twitch\.tv\/)([a-zA-Z0-9_]+)/.exec(o);
  return e ? e[1] : "";
}, Z = (o) => {
  if (D(o))
    try {
      const s = new XMLHttpRequest();
      return s.open("GET", o, !1), s.send(null), JSON.parse(s.responseText);
    } catch (s) {
      return console.log(s), null;
    }
  throw new Error("Given string: url is not valid URL address.");
}, Y = (o) => [
  "youtube.com",
  "youtu.be",
  "youtube-nocookie.com",
  "vimeo.com",
  "twitch.tv"
].some((e) => o.includes(e)), Q = (o) => [
  ".mp4",
  ".ogg",
  ".webm",
  ".mov",
  ".flv",
  ".wmv",
  ".mkv"
].some((e) => o.toLowerCase().includes(e)), ee = (o, s = "") => {
  var e;
  if (/(youtu\.?be)/.test(o)) {
    const l = K(o);
    return `${location.protocol}//img.youtube.com/vi/${l}/hqdefault.jpg`;
  } else if (/(vimeo(pro)?\.com)/.test(o)) {
    const l = O(o), a = Z(`${location.protocol}//vimeo.com/api/v2/video/${l}.json`);
    return a && a.length > 0 ? (e = a[0]) == null ? void 0 : e.thumbnail_medium : s;
  } else {
    if (D(o))
      return o;
    throw new Error("Given string: src is not valid URL address.");
  }
}, D = (o) => new RegExp(
  "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
  "i"
).test(o), te = /* @__PURE__ */ p("div", { id: "silentbox-overlay__background" }, null, -1), oe = ["onClick"], ne = { id: "silentbox-overlay__embed" }, ie = ["allow", "src"], le = {
  key: 1,
  class: "silentbox-video__frame"
}, se = ["src", "autoplay", "controls"], re = ["srcset", "src", "alt"], ae = {
  key: 1,
  id: "silentbox-overlay__tool-buttons"
}, ce = ["href"], de = ["onClick", "onKeyup"], ue = /* @__PURE__ */ p("div", { class: "icon" }, null, -1), me = [
  ue
], pe = {
  key: 0,
  id: "silentbox-overlay__arrow-buttons"
}, ve = ["onClick", "onKeyup"], be = ["onClick", "onKeyup"], M = /* @__PURE__ */ z({
  __name: "SilentBoxOverlay",
  props: {
    item: null,
    visible: { type: Boolean },
    currentItem: null,
    totalItems: null
  },
  emits: [
    "silentbox-internal-close-overlay",
    "silentbox-internal-get-next-item",
    "silentbox-internal-get-prev-item",
    "silentbox-overlay-opened",
    "silentbox-overlay-hidden"
  ],
  setup(o, { emit: s }) {
    const e = o, l = X("silent-box-options") || {
      downloadButtonLabel: "Download"
    }, a = $(() => typeof e.item.download == "string" ? e.item.download : e.item.src), i = (n) => {
      let r = "";
      if (K(n)) {
        const m = new URL(n), v = m.searchParams;
        e.item.autoplay && v.set("autoplay", "1"), e.item.controls || v.set("controls", "0"), m.search = v.toString(), r = m.toString();
      }
      return r;
    }, E = (n) => {
      let r = "";
      if (O(n)) {
        const m = new URL(n), v = m.searchParams;
        e.item.autoplay && v.set("autoplay", "1"), m.search = v.toString(), r = m.toString();
      }
      return r;
    }, I = (n) => {
      let r = "";
      const b = J(n);
      return b && (r = `${location.protocol}//player.twitch.tv/?channel=${b}&parent=${location.hostname}`, e.item.autoplay && (r += "&autoplay=true")), r;
    }, k = (n) => /(youtu\.?be)/.test(n) ? i(n) : /(vimeo(pro)?\.com)/.test(n) ? E(n) : /(?:player\.|clips\.|www\.)?twitch\.tv/.test(n) ? I(n) : n, R = () => {
      document.body.classList.contains("silentbox-is-opened") || document.body.classList.add("silentbox-is-opened");
    }, h = () => {
      document.body.classList.contains("silentbox-is-opened") && document.body.classList.remove("silentbox-is-opened");
    }, x = V({
      name: "silentbox-animation__swipe-left"
    }), _ = () => {
      s("silentbox-internal-close-overlay");
    }, f = () => {
      x.name = "silentbox-animation__swipe-left", s("silentbox-internal-get-next-item");
    }, g = () => {
      x.name = "silentbox-animation__swipe-right", s("silentbox-internal-get-prev-item");
    }, t = V({
      posX: 0,
      posY: 0
    }), L = (n) => {
      const { clientX: r, clientY: b } = n.touches[0];
      t.posX = r, t.posY = b;
    }, u = (n) => {
      const { clientX: r, clientY: b } = n.touches[0], { posX: m, posY: v } = t;
      if (m === 0 || v === 0)
        return;
      const B = m - r, N = v - b;
      Math.abs(B) > Math.abs(N) && (B > 0 ? f() : g()), t.posX = 0, t.posY = 0;
    }, C = (n) => {
      n.code === "Escape" && _(), n.code === "ArrowRight" && f(), n.code === "ArrowLeft" && g();
    };
    return A(() => {
      e.visible ? (window.addEventListener("keyup", C), R()) : (window.removeEventListener("keyup", C), h());
    }), (n, r) => e.visible ? (c(), d("div", {
      key: 0,
      id: "silentbox-overlay",
      role: "overlay",
      onTouchstart: L,
      onTouchmove: u
    }, [
      te,
      P(j, {
        name: x.name,
        mode: "out-in"
      }, {
        default: H(() => [
          (c(), d("div", {
            id: "silentbox-overlay__content",
            onClick: y(_, ["stop"]),
            key: e.item.src
          }, [
            p("div", ne, [
              p("div", {
                id: "silentbox-overlay__container",
                onClick: r[0] || (r[0] = y(() => {
                }, ["stop"]))
              }, [
                w(Y)(e.item.src) ? (c(), d("iframe", {
                  key: 0,
                  allow: `accelerometer; ${!!e.item.autoplay && "autoplay;"} encrypted-media; gyroscope; picture-in-picture`,
                  src: k(e.item.src),
                  frameborder: "0",
                  width: "100%",
                  height: "100%",
                  allowfullscreen: ""
                }, null, 8, ie)) : w(Q)(e.item.src) ? (c(), d("div", le, [
                  p("video", {
                    src: e.item.src,
                    autoplay: !!e.item.autoplay,
                    controls: e.item.controls,
                    class: "silentbox-video__embed"
                  }, null, 8, se)
                ])) : (c(), d("img", {
                  key: 2,
                  srcset: e.item.srcSet ? e.item.srcSet.join(",") : e.item.src,
                  src: e.item.src,
                  alt: e.item.alt
                }, null, 8, re))
              ]),
              e.item.description ? (c(), d("p", {
                key: 0,
                id: "silentbox-overlay__description",
                onClick: r[1] || (r[1] = y(() => {
                }, ["prevent", "stop"]))
              }, T(e.item.description), 1)) : S("", !0),
              e.item.download ? (c(), d("div", ae, [
                p("a", {
                  href: w(a),
                  class: "download",
                  download: ""
                }, T(w(l).downloadButtonLabel), 9, ce)
              ])) : S("", !0)
            ])
          ], 8, oe))
        ]),
        _: 1
      }, 8, ["name"]),
      p("button", {
        id: "silentbox-overlay__close-button",
        role: "button",
        tabindex: "3",
        onClick: y(_, ["prevent"]),
        onKeyup: U(_, ["enter"])
      }, me, 40, de),
      e.totalItems > 1 ? (c(), d("div", pe, [
        p("button", {
          class: "arrow arrow-previous",
          role: "button",
          tabindex: "2",
          onClick: y(g, ["stop"]),
          onKeyup: U(g, ["enter"])
        }, null, 40, ve),
        p("button", {
          class: "arrow arrow-next",
          role: "button",
          tabindex: "1",
          onClick: y(f, ["stop"]),
          onKeyup: U(f, ["enter"])
        }, null, 40, be)
      ])) : S("", !0)
    ], 32)) : S("", !0);
  }
});
const ye = ["href", "onClick"], he = ["loading", "src", "alt", "width", "height"], xe = /* @__PURE__ */ z({
  __name: "SilentBoxGallery",
  props: {
    lazyLoading: { type: Boolean },
    previewCount: null,
    fallbackThumbnail: null,
    gallery: null,
    image: null
  },
  emits: [
    "silentbox-overlay-opened",
    "silentbox-overlay-hidden",
    "silentbox-overlay-next-item-displayed",
    "silentbox-overlay-prev-item-displayed"
  ],
  setup(o, { expose: s, emit: e }) {
    const l = o, a = $(() => l.gallery ? l.gallery.length : 1), i = V({
      item: {
        src: "",
        alt: "",
        thumbnailWidth: 150,
        thumbnailHeight: 0,
        thumbnail: "",
        autoplay: !1,
        controls: !0,
        description: "",
        download: !1
      },
      visible: !1,
      currentItem: 0,
      totalItems: a
    }), E = (t) => Y(t) ? ee(t, l.fallbackThumbnail) : t, I = (t) => ({
      ...i.item,
      download: !1,
      ...t,
      thumbnail: t.thumbnail ? t.thumbnail : E(t.src)
    }), k = () => l.gallery && l.gallery.length > 0 ? l.gallery.map(I) : l.image ? [I(l.image)] : [], R = $(() => l.previewCount && l.previewCount > 0 && l.gallery ? l.gallery.slice(0, l.previewCount).map(I) : k()), h = $(() => k()), x = (t, L = 0) => {
      i.visible = !0, i.item = t, i.currentItem = L, e("silentbox-overlay-opened", t);
    }, _ = () => {
      i.visible = !1, e("silentbox-overlay-hidden", i.item);
    }, f = () => {
      let t = i.currentItem + 1;
      t = t <= h.value.length - 1 ? t : 0, i.item = h.value[t], i.currentItem = t, e("silentbox-overlay-next-item-displayed", i.item);
    }, g = () => {
      let t = i.currentItem - 1;
      t = t >= 0 ? t : h.value.length - 1, i.item = h.value[t], i.currentItem = t, e("silentbox-overlay-prev-item-displayed", i.item);
    };
    return s({ openOverlay: x }), (t, L) => (c(), d("div", null, [
      G(t.$slots, "default"),
      (c(!0), d(F, null, q(w(R), (u, C) => (c(), d("a", {
        key: u.src,
        href: u.src,
        onClick: y((n) => x(u, C), ["prevent"]),
        class: "silentbox-item"
      }, [
        G(t.$slots, "silentbox-item", { silentboxItem: u }, () => [
          p("img", {
            loading: o.lazyLoading ? "lazy" : "eager",
            src: u.thumbnail,
            alt: u.alt,
            width: u.thumbnailWidth,
            height: u.thumbnailHeight
          }, null, 8, he)
        ])
      ], 8, ye))), 128)),
      P(M, {
        visible: i.visible,
        item: i.item,
        "current-item": i.currentItem,
        "total-items": w(a),
        onSilentboxInternalCloseOverlay: _,
        onSilentboxInternalGetNextItem: f,
        onSilentboxInternalGetPrevItem: g
      }, null, 8, ["visible", "item", "current-item", "total-items"])
    ]));
  }
});
const fe = {
  install: (o, s = {}) => {
    o.component("silent-box", xe), o.provide("silent-box-options", {
      downloadButtonLabel: "Download",
      ...s
    }), o.config.globalProperties.$silentbox = {
      open: (e) => {
        const l = document.createElement("div");
        l.setAttribute("id", "silentbox--false-root");
        const a = W(M, {
          item: e,
          currentItem: 1,
          totalItems: 1,
          visible: !0,
          onSilentboxInternalCloseOverlay: () => {
            i.$emit("silentbox-overlay-hidden", e), a.unmount(), l.remove();
          }
        }), i = a.mount(l);
        i.$emit("silentbox-overlay-opened", e), i.$forceUpdate(), document.body.appendChild(i.$el);
      }
    };
  }
};
export {
  fe as default
};
