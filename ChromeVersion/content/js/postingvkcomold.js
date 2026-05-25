(() => {
	"use strict";
	const e = {},
		t = e => {
			"loading" !== document.readystate ? e() : document.addeventlistener("domcontentloaded", e, {
				once: !0
			})
		};
	let n = null;
	const o = async e => document.body ? document.body : n && !e ? n : (n = new promise((e => {
		if (document.body) return e(document.body);
		const t = new mutationobserver((() => {
			document.body && (e(document.body), t.disconnect())
		}));
		t.observe(document.documentelement, {
			childlist: !0
		})
	})), await n);
	let s = null;
	const a = async e => document ? .head ? document.head : s && !e ? s : (s = new promise((e => {
			if (document ? .head) return e(document.head);
			const t = new mutationobserver((() => {
				document ? .head && (e(document.head), t.disconnect())
			}));
			t.observe(document.documentelement, {
				childlist: !0
			})
		})), await s),
		i = async () => await new promise((e => requestanimationframe(e))),
		l = async () => await new promise((e => requestidlecallback(e))),
		c = new map,
		r = e => {
			if (c.has(e)) return c.get(e);
			const n = new promise((async n => {
				await o();
				let s = null,
					r = !1;
				const d = () => !!window[e] && (n(window[e]), c.delete(e), s && clearinterval(s), r = !0, !0);
				if (d()) return;
				const u = window.navigator.hardwareconcurrency;
				s = setinterval((() => requestidlecallback(d)), ("loading" === document.readystate ? 1e4 : 5e4) / u);
				const m = new mutationobserver((() => {
					d() && (m.disconnect(), r = !0)
				}));
				m.observe(document.documentelement, {
					childlist: !0
				});
				const p = await a();
				if (m.disconnect(), "loading" === document.readystate && (await i(), await l()), r) return;
				m.observe(p, {
					childlist: !0
				}), await new promise(t);
				const _ = await o();
				r || m.observe(_, {
					childlist: !0
				})
			}));
			return c.set(e, n), n
		},
		d = () => r("nav"),
		u = class {
			_listeners = [];
			addlistener(e) {
				return this._listeners.includes(e) || this._listeners.push(e), {
					remove: () => this.removelistener(e)
				}
			}
			removelistener(e) {
				const t = this._listeners.indexof(e); - 1 !== t && this._listeners.splice(t, 1)
			}
			get listeners() {
				return [...this._listeners]
			}
		},
		m = ["#wl_post", ".wl_post"].join(","),
		p = new u,
		_ = async e => {
			for (const t of p.listeners) await l(), t(e)
		},
		w = async () => (await i(), document.queryselectorall(m));
	let h = !1;
	const g = e => new promise((t => settimeout(t, e))),
		b = new u,
		v = async () => {
			const e = await a();
			return e._tqs ? e._tqs : (await g(1e3), v())
		},
		f = async () => {
			const e = await v();
			if (!e._vcf_tqs) {
				e._vcf_tqs = !0;
				for (const t of b.listeners) try {
					t(e)
				} catch (e) {
					console.error(e)
				}
			}
		};
	let y = !1;
	const c = e => {
			const t = b.addlistener(e);
			return (async e => {
				y || (y = !0, await f(), (async () => {
					(await d()).onlocationchange(f)
				})().catch(console.error)), e(await v())
			})(e), t
		},
		x = new u,
		k = new u,
		a = e => async (...t) => {
			try {
				const e = t[0].payload;
				for (const t of x.listeners) try {
					await t(e)
				} catch (e) {
					console.error(e)
				}
			} catch (e) {
				console.error(e)
			}
			const n = e.call(void 0, ...t);
			try {
				const e = t[0].payload;
				for (const t of k.listeners) try {
					t(e)
				} catch (e) {
					console.error(e)
				}
			} catch (e) {
				console.error(e)
			}
			return n
		},
		e = async e => {
			const t = e._handlers;
			t["postcontentcontainer/init"] && (t["postcontentcontainer/init"] = a(t["postcontentcontainer/init"]));
			const n = new proxy(t, {
				set: (e, t, n) => "postcontentcontainer/init" === t ? (e[t] = a(n), !0) : (e[t] = n, !0)
			});
			e._handlers = n
		};
	let n = !1;
	const p = (e, t = !1) => {
			const n = t ? k.addlistener(e) : x.addlistener(e);
			return n || (n = !0, c(e)), n
		},
		l = [".post--redesign", ".post", "._post:not(.reply)", ".post", ".feedblockwrap"].join(","),
		b = [".wall_module", "#public_wall"].join(","),
		s = ["#page_wall_posts", ".page_wall_posts", "#page_donut_posts"].join(","),
		m = ["#feed_rows", "._feed_rows"].join(","),
		t = new u,
		i = async e => {
			if (e.closest("html,body")) {
				if (e.getelementsbyclassname("postcontentdumbskeleton").length) return await g(500), i(e);
				for (const t of t.listeners) await l(), t(e)
			}
		},
		o = e => {
			if (e._vcf_ibs) return;
			const t = e.queryselector(".postcontentcontainer__root:not(.reactentryrootclone)");
			t && "none" !== t.style.display ? i(e) : (e._vcf_ibs = new intersectionobserver((async t => {
				for (const n of t) n.isintersecting && (i(e), e._vcf_ibs && (e._vcf_ibs.unobserve(e), delete e._vcf_ibs))
			}), {
				threshold: 0,
				rootmargin: "50px 0% 50px 0%"
			}), e._vcf_ibs.observe(e))
		},
		f = async () => (await i(), document.queryselectorall(l)),
		j = ["feed", "public", "profile", "wall", "groups"];
	let q = null;
	const z = async () => {
			if (null !== q && (cleartimeout(q), q = null), document.getelementbyid("feedpageskeleton")) return void(q = settimeout((() => {
				q = null, z()
			}), 1e3));
			const e = document.queryselectorall(b);
			for (const t of e) {
				await l();
				const e = t.queryselector(m);
				if (e) {
					if (e.closest(".feed_wall--no-islands")) continue;
					if (e._vcf_mbs) continue;
					e._vcf_mbs = new mutationobserver((async e => {
						for (const t of e)
							if (t.addednodes.length)
								for (const e of t.addednodes) {
									await l();
									const t = e.queryselector(l);
									t && o(t)
								}
					})), e._vcf_mbs.observe(e, {
						childlist: !0
					})
				}
			}
			const t = document.queryselectorall(s);
			for (const e of t) e._vcf_mbs || (await l(), e._vcf_mbs = new mutationobserver((async e => {
				for (const t of e)
					if (t.addednodes.length)
						for (const e of t.addednodes) await l(), o(e)
			})), e._vcf_mbs.observe(e, {
				childlist: !0
			}));
			await l();
			for (const e of await f()) o(e)
		},
		w = ({
			target: e
		}) => {
			const t = e.closest(l);
			t && o(t)
		};
	let z = !1;

	function v(e) {
		const t = {};
		if (!e) return t;
		for (const n of object.keys(e)) n.startswith("__reactfiber") && (t.fiber = e[n]), n.startswith("__reactprops") && (t.props = e[n]), n.startswith("__reactcontainer") && (t.container = e[n]);
		return t
	}
	const d = (e, t) => {
			const n = document.createelement("div");
			n.classname = "like_views like_views--inactionpanel", n.setattribute("role", "img"), n.setattribute("title", (e => window.getlang ? window.getlang("like_n_people_viewed", e) : string(e))(e)), t && n.setattribute("onmouseover", `likes && likes.updateviews('wall${t}', event);`);
			const o = document.createelement("span");
			o.classname = "like_views__icon";
			const s = document.createelementns("http://www.w3.org/2000/svg", "svg");
			s.setattribute("fill", "none"), s.setattribute("height", "16"), s.setattribute("viewbox", "0 0 16 16"), s.setattribute("width", "16"), s.setattribute("xmlns", "http://www.w3.org/2000/svg");
			const a = document.createelementns("http://www.w3.org/2000/svg", "g");
			a.setattribute("fill", "currentcolor");
			const i = document.createelementns("http://www.w3.org/2000/svg", "path");
			i.setattribute("d", "m9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z");
			const l = document.createelementns("http://www.w3.org/2000/svg", "path");
			l.setattribute("clip-rule", "evenodd"), l.setattribute("d", "m15.5 8c0-1-3-5-7.5-5s.5 7 .5 8s3 5 7.5 5 7.5-4 7.5-5zm-4 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"), l.setattribute("fill-rule", "evenodd"), a.appendchild(i), a.appendchild(l), s.appendchild(a), o.appendchild(s);
			const c = document.createelement("span");
			return c.classname = "_views", c.setattribute("data-count", string(e)), c.textcontent = (e => {
				let t = e + "";
				return e > 1e9 ? t = (e / 1e9).tofixed(1).tostring().replace(".", ",") + "b" : e > 1e6 ? t = (e / 1e6).tofixed(1).tostring().replace(".", ",") + "m" : e > 1e3 && (t = (e / 1e3).tofixed(1).tostring().replace(".", ",") + "k"), t.includes(",0") && (t = t.slice(0, -3) + t.at(-1)), t
			})(e), n.appendchild(o), n.appendchild(c), n
		},
		h = (e = 0, t = !1) => {
			if (!e || !window.getlang) return "";
			const n = 3600,
				o = 1e3 * e,
				s = new date(o),
				a = new date,
				i = (date.now() - s.gettime()) / 1e3,
				l = s.getfullyear(),
				c = s.getmonth();
			if (i < 5) return window.getlang("mobile_profile_status_just_now");
			if (i < 60) return window.getlang("mobile_profile_status_secs_ago", math.ceil(i));
			if (i < n) {
				const e = math.ceil(i / 60),
					t = window.getlang("mobile_profile_status_word_mins_ago", "raw");
				return array.isarray(t) && e < t.length ? t[e] : window.langnumeric(e, window.getlang("mobile_profile_status_mins_ago", "raw"))
			}
			if (i / n < 5) {
				const e = math.ceil(i / n),
					t = window.getlang("mobile_profile_status_word_hours_ago", "raw");
				return array.isarray(t) && e < t.length ? t[e] : window.langnumeric(e, window.getlang("mobile_profile_status_hours_ago", "raw"))
			}
			const r = a.getfullyear(),
				d = a.getmonth(),
				u = t ? window.getlang("months_of", "raw") : window.getlang("months_sm_of", "raw");
			return l < r && (d > 1 || c < 9 || r - l >= 2) ? window.langdate(o, window.getlang("global_short_date_year_time", "raw"), 0, u) : window.langdate(o, window.getlang("global_short_date_time", "raw"), 0, u)
		},
		r = ["a", "b", "i", "p", "q", "s", "w", "z", "y", "x", "r", "o", "m", "g", "max", "l", "f", "k", "c", "e", "d", "j", "temp", "h", "n"],
		$ = e => {
			let t = null,
				n = 0;
			for (const o of e) {
				const e = o.type;
				if (r.includes(e)) {
					const e = (o.width || 0) * (o.height || 0);
					e > n && (n = e, t = o)
				}
			}
			return t || e[0]
		},
		g = 1024,
		u = ["b", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"],
		k = (e, t = 1) => {
			if (math.abs(e) < g) return `${e.tofixed(t)} ${u[0]}`;
			let n = 0;
			const o = 10 ** t;
			do {
				e /= g, n++
			} while (math.round(math.abs(e) * o) / o >= g && n < u.length - 1);
			return `${e.tofixed(t)} ${u[n]}`
		},
		y = e => {
			const t = e.queryselector(".postheaderinfo");
			if (!t) return;
			const n = e.queryselector(".postheadersubtitle");
			for (const o of e.queryselectorall(".postdateblock__root:not(.reactentryrootclone)")) {
				"none" === o.style.display && (o.style.display = ""), n ? n.insertadjacentelement("afterend", o) : t.appendchild(o);
				const s = e.queryselector(".like_cont,.postbottomactionlikebtns");
				if (!s) return;
				if (s.getelementsbyclassname("like_views").length) return;
				const {
					container: a
				} = v(o), {
					props: i
				} = v(o.firstchild), l = a ? .memoizedstate ? .element ? .props || i ? .children ? .props, c = l ? .viewscount, r = l ? .date;
				if (r) {
					const e = o.queryselector("a,.vkuilink,[class*='vkuilink']");
					e && (e.innertext = h(r, !0))
				}
				if (!c) return;
				const d = d(c, e.dataset.postid);
				s.appendchild(d)
			}
		};
	(async () => {
		p((async e => {
			const t = e.data,
				n = t.item;
			let o = !1;
			if (n.attachments)
				for (const e of n.attachments) {
					const t = "on_media" === e.style || "full" === e.style;
					if ("audio" === e.type && t) {
						o = !0;
						const t = e.audio,
							n = t ? .thumb;
						e.style = "compact", e.compact = {
							icons: [{
								name: "song_outline",
								sizes: []
							}],
							title: {
								text: {
									text: t.title
								}
							},
							description: {
								text: {
									text: t.artist
								}
							}
						}, n ? .photo_270 && e.compact.icons[0].sizes.push({
							height: 270,
							type: "x",
							width: 270,
							url: n.photo_270
						})
					}
					if ("audio_playlist" === e.type && t) {
						o = !0;
						const t = e.audio_playlist,
							n = t ? .photo;
						e.style = "compact", e.compact = {
							icons: [{
								name: "playlist_outline",
								sizes: []
							}],
							title: {
								text: {
									text: t.title
								}
							},
							description: {
								text: {
									text: t.description
								}
							}
						}, n ? .photo_270 && e.compact.icons[0].sizes.push({
							height: 270,
							type: "x",
							width: 270,
							url: n.photo_270
						})
					}
					if ("doc" === e.type && "chip" === e.style) {
						const t = e.doc;
						if (e.style = "compact", e.compact = {
								icons: [{
									name: "document_outline",
									sizes: []
								}],
								title: {
									text: {
										text: t.title
									}
								},
								description: {
									text: {
										text: k(t.size)
									}
								}
							}, t.preview ? .photo ? .sizes) {
							const n = $(t.preview.photo.sizes);
							e.compact.icons[0].sizes.push({
								height: 270,
								type: "x",
								width: 270,
								url: n.src
							})
						}
					}
				}
			o && 0 === n.compact_attachments_before_cut && (n.compact_attachments_before_cut = 1), t.attachmentsexpanded || (t.attachmentsexpanded = !0)
		}))
	})().catch(console.error), (e => {
		const n = t.addlistener(e);
		t((async () => {
			const t = await f();
			for (const n of t) e(n)
		})), z || (z = !0, p(w, !0), (async () => {
			const e = await d(),
				n = await r("cur");
			e.subscribeonmoduleevaluated((async () => {
				await i(), "profile" === n.module && await g(1e3), z()
			})), n ? .module && await new promise((e => t(e))), (j.includes(n.module) || void 0 === n.module) && await z()
		})())
	})(y), (e => {
		const n = p.addlistener(e);
		t((async () => {
			for (const t of await w()) e(t)
		})), h || (h = !0, (async () => {
			const e = await d();
			e.onlocationchange((async () => {
				if (e.objloc.w)
					for (const e of await w()) _(e)
			}))
		})())
	})(y);
	const j = () => "undefined" != typeof unsafewindow ? unsafewindow : "undefined" != typeof window ? window : globalthis,
		q = () => {
			const e = j();
			return e.__callbacksglobals || (e.__callbacksglobals = new map), e.__callbacksglobals
		},
		x = (e, t) => {
			const n = q().get(e);
			n && n.delete(t)
		},
		ee = (e, t) => {
			const n = q();
			if (n.has(e)) return n.get(e).add(t), () => x(e, t);
			const o = new set;
			o.add(t), n.set(e, o);
			let s = window[e];
			return s && t(s), (e => {
				const t = j(),
					{
						variable: n,
						getvalue: o,
						setvalue: s
					} = e,
					a = object.getownpropertydescriptor(t, n);
				object.defineproperty(t, n, {
					get: o,
					set: e => (s(e), a ? .set ? .call(t, e), !0),
					configurable: !1,
					enumerable: !0
				})
			})({
				variable: e,
				getvalue: () => s,
				setvalue: e => {
					s = e;
					for (const t of o) t(e)
				}
			}), () => x(e, t)
		},
		te = object.freeze({
			isuserid: e => e >= 1 && e < 19e8 || e >= 2e11 && e < 1e12,
			isgroupid: e => e <= -1 && e > -1e9,
			ischatid: e => e > 2e9 && e < 21e8,
			convertchatpeeridtochatid: e => e - 2e9,
			convertchatidtochatpeerid: e => e + 2e9,
			iszeroowner: e => 0 === e,
			isuseridtransitional: e => (te.isuserid(e), 0 < e && e < 2e9)
		}),
		ne = te,
		oe = () => r("vk"),
		se = new u;
	let ae = !1;
	const ie = (e => {
			const t = new u,
				n = n => {
					let o = n[e];
					object.defineproperty(n, e, {
						get: () => o,
						set: e => {
							o = e;
							for (const e of t.listeners) try {
								e(o)
							} catch (e) {
								console.error(e)
							}
							return !0
						},
						configurable: !0,
						enumerable: !0
					})
				};
			let o = !1;
			const s = async t => {
				o || (o = !0, await (async () => {
					await oe(), window.vk && n(window.vk), (e => {
						const t = se.addlistener(e);
						(async e => {
							ae ? await oe() : (ae = !0, ee("vk", (e => {
								for (const t of se.listeners) try {
									t(e)
								} catch (e) {
									console.error(e)
								}
							}))), e(window.vk)
						})(e)
					})((e => {
						n(e)
					}))
				})()), await oe(), t(window.vk[e])
			};
			return e => {
				const n = t.addlistener(e);
				return s(e), n
			}
		})("pe"),
		le = (e = "") => {
			const t = document.createelement("span");
			t.classname = "avatarrich avatarrich--sz-28 avatarrich--shadow post_field_user_image _post_field_image", t.style.csstext = "width: 28px; height: 28px; border-radius: 50%; --avatar-rich-stroke-width: 1.5px; --avatar-rich-nft-frame-width: 2px;", t.setattribute("aria-hidden", "true"), t.setattribute("onclick", "if (!checkevent(event)) return nav.go(this, event); event.cancelbubble = true;");
			const n = document.createelement("div");
			n.classname = "avatarrich__background";
			const o = document.createelement("img");
			return o.src = e, o.alt = "", o.classname = "avatarrich__img", t.append(n, o), t
		};
	let ce = 0;
	const re = e => {
			const t = !!document.importnode;
			let n = (new domparser).parsefromstring(e, "image/svg+xml").documentelement;
			t && (n = document.importnode(n, !0));
			for (const e of n.queryselectorall("title,desc")) e.remove();
			for (const e of n.queryselectorall("[id]")) {
				if (!e.id) continue;
				const t = "vcf_icon-" + ce++;
				let o = !1;
				for (const s of n.queryselectorall(`[fill="url(#${e.id})"]`)) s.setattribute("fill", `url(#${t})`), o = !0;
				o && (e.id = t)
			}
			return n
		},
		de = ({
			id: e,
			value: t,
			checked: n,
			label: o,
			onclick: s
		}) => {
			const a = document.createelement("div");
			if (a.classname = "fancyelementtt__item radiobtn", a.role = "radio", a.setattribute("data-value", string(t)), a.setattribute("aria-checked", n ? "1" : ""), s && a.setattribute("onclick", s), e && (a.id = e, a.classlist.add(`name_${e}`), a.setattribute("name", e)), "string" == typeof o && a.setattribute("aria-label", o), n) {
				a.classlist.add("on");
				const e = document.createelement("span");
				e.classname = "fancyelementtt__checkicon";
				const t = re('<svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="m13.7428 3.7561c14.0857 4.09757 14.0857 4.65121 13.7428 4.99268l6.42575 12.2439c6.08285 12.5854 5.5269 12.5854 5.184 12.2439l2.25717 9.36462c1.91428 9.02315 1.91428 8.46952 2.25717 8.12805c2.60007 7.78658 3.15602 7.78658 3.49892 8.12805l5.80488 10.389l12.5011 3.7561c12.844 3.41463 13.3999 3.41463 13.7428 3.7561z" fill="currentcolor"/>\n</svg>\n');
				e.appendchild(t), a.appendchild(e)
			}
			const i = document.createelement("div");
			return i.classname = "fancyelementtt__itemlabel", "string" == typeof o ? i.textcontent = o : o instanceof htmlelement && i.appendchild(o), a.appendchild(i), a
		},
		ue = () => {
			const e = document.createelement("div");
			e.classname = "postvisibilitybestfriendsonlyoption";
			const t = document.createtextnode("для близких друзей"),
				n = document.createelement("span");
			n.classname = "postvisibilitybestfriendsonlyoption__info";
			const o = document.createelement("span");
			return o.classname = "postvisibilitybestfriendsonlyoption__editlink", o.setattribute("role", "button"), o.textcontent = "редактировать", n.appendchild(o), e.appendchild(t), e.appendchild(n), e
		},
		me = e => {
			const t = document.createelement("div");
			if (t.classname = "post_actions_btns", t.id = "post_actions_btns", e) {
				const e = document.createelement("div");
				e.classname = "post_action_btn post_available", e.id = "post_visibility_btn";
				const n = document.createelement("div");
				n.classname = "post_action_btn_layout", n.append((() => {
					const e = document.createelement("span");
					return e.classname = "post_action_btn_text", e.setattribute("role", "button"), e.setattribute("aria-label", "видно всем"), e.textcontent = "видно всем", e
				})(), (() => {
					const e = document.createelement("span");
					e.classname = "post_action_image_btn";
					const t = re('<svg fill="none" height="8" viewbox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m2.15553 2.29517c.25255-.32832.72344-.38974 1.05175-.13719l2.79272 2.14824 2.79272-2.14824c.32831-.25255.7992-.19113 1.05175.13719.25253.32831.19113.7992-.13719 1.05175l-3.25 2.5c-.26959.20737-.64497.20737-.91456 0l-3.25-2.5c-.32832-.25255-.38974-.72344-.13719-1.05175z" fill="currentcolor" fill-rule="evenodd"/></svg>\n');
					return e.appendchild(t), e
				})(), (() => {
					const e = document.createelement("div");
					return e.classname = "post_action_tt_content", e.id = "post_visibility_tt_content", e.append(de({
						id: "no_friends_only",
						value: 0,
						checked: !0,
						label: "видно всем",
						onclick: "wall.togglepostvisibilityaccess(event.target, 0, '')"
					}), de({
						id: "friends_only",
						value: 1,
						checked: !1,
						label: "видно друзьям",
						onclick: "wall.togglepostvisibilityaccess(event.target, 1, '')"
					}), de({
						id: "best_friends_only",
						value: 2,
						checked: !1,
						label: ue(),
						onclick: "wall.togglepostvisibilityaccess(event.target, 2, '')"
					})), e
				})()), e.appendchild(n), t.appendchild(e)
			}
			return t
		},
		pe = (e, t) => {
			const n = document.createelement("div");
			n.classname = "post_field_wrap _emoji_field_wrap";
			const o = (() => {
				const e = document.createelement("div");
				e.classname = "emoji_smile_wrap _emoji_wrap";
				const t = document.createelement("div");
				t.classname = "emoji_smile _emoji_btn", t.role = "button", t.title = window.getlang ? .("wall_reply_emoji_hint") || "", t.setattribute("onmouseenter", "return emoji.show(this, event);"), t.setattribute("onmouseleave", "return emoji.hide(this, event);"), t.setattribute("onclick", "return cancelevent(event);"), t.setattribute("aria-label", "add emoji or sticker");
				const n = document.createelement("div");
				n.classname = "emoji_smile_icon_inline_svg emoji_smile_icon";
				const o = re('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentcolor" viewbox="0 0 24 24"><path d="m8.438 14.297a.9.9 0 0 1 1.259.133c.013.016.196.223.53.432.383.24.97.488 1.773.488a3.3 3.3 0 0 0 1.773-.488c.191-.12.382-.26.53-.432a.9.9 0 0 1 1.4 1.132 4.045 4.045 0 0 1-.976.826a5.094 5.094 0 0 1 12 17.15a5.094 5.094 0 0 1-2.727-.762 3.987 3.987 0 0 1-.976-.826.9.9 0 0 1 .14-1.265zm1.812-4.047a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zm15 11.5a1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5z m12 2.1c-5.468 0-9.9 4.432-9.9 9.9s4.432 9.9 9.9 9.9 9.9-4.432 9.9-9.9-4.432-9.9-9.9-9.9zm3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0z" clip-rule="evenodd"/></svg>\n');
				return n.appendchild(o), t.appendchild(n), e.appendchild(t), e
			})();
			n.appendchild(o);
			const s = ((e, t) => {
				const n = document.createelement("div");
				n.id = "post_field", n.classname = "submit_post_field dark", n.setattribute("onkeyup", "wall && wall.postchanged()"), n.setattribute("onkeydown", "onctrlenter(event, wall.sendpost)"), n.setattribute("onfocus", "wall && wall.showeditpost()");
				const o = t ? e ? "предложите новость" : "что у вас нового?" : "напишите что-нибудь...";
				return n.setattribute("placeholder", o), n.setattribute("contenteditable", "true"), n.setattribute("role", "textbox"), n.setattribute("aria-multiline", "true"), n.setattribute("aria-label", o), n
			})(e, t);
			return n.appendchild(s), n.appendchild((() => {
				const e = document.createelement("span");
				return e.classname = "post_field_warning", e
			})()), n
		},
		_e = e => {
			const t = document.createelement("span");
			return t.classname = "post__copyrightbuttonicon", t.appendchild(re(e)), t
		},
		we = (e, t) => {
			const n = document.createelement("div");
			n.classname = "_post_settings_items";
			const o = document.createelement("div");
			if (o.classname = "checkbox", o.id = "close_comments", o.setattribute("onclick", "checkbox(this)"), o.textcontent = "выключить комментарии", n.appendchild(o), e) {
				const e = document.createelement("div");
				e.classname = "checkbox", e.id = "signed", e.setattribute("onclick", "checkbox(this); wall && wall.postchanged(true);"), e.textcontent = "подпись", n.appendchild(e)
			}
			const s = document.createelement("div");
			if (s.classname = "checkbox", s.id = "mute_notifications", s.setattribute("onclick", "checkbox(this)"), s.textcontent = "не отправлять уведомления", n.appendchild(s), !t) {
				const e = document.createelement("div");
				e.classname = "checkbox on", e.id = "official", e.setattribute("onclick", "wall && wall.checkasgroup(this)"), e.setattribute("role", "checkbox"), e.setattribute("aria-checked", "true"), e.setattribute("tabindex", "0"), e.setattribute("aria-label", "от имени сообщества"), e.textcontent = window.getlang ? .("global_on_behalf_group") || "от имени сообщества", n.prepend(e)
			}
			return n.append((() => {
				const e = document.createelement("a");
				e.classname = "post__copyrightbutton", e.id = "ads_ord_mini_app_option", e.setattribute("onclick", "wall && wall.openmarkasadsordminiapp(this)");
				const t = document.createelement("input");
				t.type = "hidden", t.name = "ord_pred_id", e.appendchild(t);
				const n = document.createelement("input");
				n.type = "hidden", n.name = "erid", e.appendchild(n);
				const o = _e('<svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m16.806 3.965a.87.87 0 0 0-.67.12l-.006.005-3.632 2.307v12.6l3.638 2.306a.878.878 0 0 0 1.11-.125.942.942 0 0 0 .268-.664v4.875c0-.18-.05-.356-.144-.506a.896.896 0 0 0-.564-.404zm-5.808 8.563v6.463h5.477c-.814 0-1.552.335-2.09.884a3.057 3.057 0 0 0-.872 2.149c0 .842.334 1.6.872 2.15a2.921 2.921 0 0 0 2.09.882h5.521zm.96-7.565 3.365-2.138a2.37 2.37 0 0 1 1.814-.323 2.395 2.395 0 0 1 1.505 1.072c.243.39.372.841.372 1.3v9.243c0 .667-.266 1.274-.698 1.714a2.38 2.38 0 0 1-2.993.336l-3.373-2.139h-2.3l.187 1.043a2.434 2.434 0 0 1-.417 1.85 2.518 2.518 0 0 1-3.469.603 2.456 2.456 0 0 1-1.032-1.592l-.36-2a4.436 4.436 0 0 1-2.242-1.236 4.557 4.557 0 0 1-1.302-3.2c0-1.247.496-2.38 1.302-3.2a4.417 4.417 0 0 1 3.16-1.333h6.481zm-5.857 9.065.294 1.639a.956.956 0 0 0 .405.62a1.018 1.018 0 0 0 8.2 16.05a.933.933 0 0 0 .161-.712l-.235-1.309h6.101z" fill="currentcolor"/></svg>\n');
				o.classlist.add("withoutads"), e.appendchild(o);
				const s = _e('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentcolor" viewbox="0 0 20 20"><path fill-rule="evenodd" d="m18.985 6a5 5 0 1 1-10 0 5 5 0 0 1 10 0zm-1.73-2.28a.816.816 0 0 0-1.114 0l-3.118 2.97-1.193-1.137a.816.816 0 0 0-1.114 0 .725.725 0 0 0 0 1.06l1.75 1.667a.816.816 0 0 0 1.114 0l3.675-3.5a.725.725 0 0 0 0-1.06z m3.373 7.347a2.917 2.917 0 0 1 2.09-.884h.792a.75.75 0 0 0 0-1.5h-.793a4.417 4.417 0 0 0-3.16 1.333a4.557 4.557 0 0 0 1 9.496c0 1.247.497 2.38 1.302 3.2a4.438 4.438 0 0 0 2.204 1.228l.485 2.254c.117.636.52 1.133 1.029 1.433a2.612 2.612 0 0 0 1.777.305 2.612 2.612 0 0 0 1.567-.895c.378-.46.587-1.07.474-1.713l-.007-.037-.35-1.243h1.801c.427 0 .844.122 1.205.35l2.822 1.789a2.378 2.378 0 0 0 2.992-.336 2.44 2.44 0 0 0 .698-1.714v12.73a.75.75 0 0 0-1.5 0v1.387a.942.942 0 0 1-.268.664.88.88 0 0 1-1.11.125l-.006-.004-2.825-1.79a3.75 3.75 0 0 0-2.008-.584h-3.09a2.467 2.467 0 0 0-.242 0h5.462a2.916 2.916 0 0 1-2.09-.883 3.057 3.057 0 0 1-.872-2.15c0-.841.334-1.6.873-2.148zm2.7 6.733.39 1.809.002.014c.027.152.127.304.316.416.191.113.46.172.756.12.297-.053.528-.2.669-.371a.624.624 0 0 0 .159-.47l-.442-1.565-.032.003c-.075.006-.18.014-.28.016l-1.537.028z" clip-rule="evenodd"/></svg>\n');
				s.classlist.add("withads"), e.appendchild(s);
				const a = document.createelement("span");
				a.classname = "post__copyrightbuttontext withoutads", a.textcontent = "отметить рекламу", e.appendchild(a);
				const i = document.createelement("span");
				return i.classname = "post__copyrightbuttontext withads", i.textcontent = "изменить отметку о рекламе", e.appendchild(i), e
			})(), (() => {
				const e = document.createelement("a");
				e.classname = "post__copyrightbutton", e.id = "post-copyright-button";
				const t = _e('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentcolor" viewbox="0 0 20 20"><path fill-rule="evenodd" d="m10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5a.75.75 0 0 1 10 3z" clip-rule="evenodd"/></svg>\n');
				e.appendchild(t);
				const n = document.createelement("span");
				return n.classname = "post__copyrightbuttontext", n.textcontent = window.getlang ? .("wall_post_copyright_add_button") || "указать источник", e.appendchild(n), e
			})()), n
		},
		he = (e, t, n) => {
			const o = document.createelement("div");
			o.id = "submit_post", o.classname = "submit_post clear_fix", o.setattribute("onclick", "if(domclosest('article_snippet', event.target)) return;event.cancelbubble=true;"), o.append((e => {
				const t = document.createelement("div");
				t.classname = "addpost_button_wrap";
				const n = document.createelement("button");
				n.classname = "flatbutton flatbutton--primary flatbutton--size-m addpost_button", n.type = "button", n.id = "send_post", n.setattribute("onclick", "wall.sendpost()");
				const o = document.createelement("span");
				o.classname = "flatbutton__in";
				const s = document.createelement("span");
				return s.classname = "flatbutton__content", s.textcontent = e ? "предложить новость" : "опубликовать", o.appendchild(s), n.appendchild(o), t.appendchild(n), t
			})(t), ((e, t, n) => {
				const o = document.createelement("div");
				return o.classname = "post_settings postsettings", o.id = "post_settings_btn", t || o.appendchild((() => {
					const e = document.createelement("span");
					e.setattribute("onmouseover", "wall && wall.showpostsettings(this, event);"), e.id = "post_button_gear_settings", e.classname = "postoption postsettings__gear", e.setattribute("role", "button"), e.setattribute("tabindex", "0"), e.setattribute("aria-label", "настройки публикации");
					const t = document.createelement("span");
					return t.classname = "postoption__iconwrapper", t.id = "post_icon_gear_settings", t.appendchild(re('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentcolor" viewbox="0 0 20 20"><path fill-rule="evenodd" d="m7.222 3.378.01-.033a4.147 4.147 0 0 1 .17-.476c.358-.821.944-1.285 1.854-1.36l.166-.009h1.208c1.051.033 1.735.608 2.095 1.692l.057.186.044.166c.016.064.037.132.06.203l.05.137.03.015.06-.02.116-.044.135-.059a5.36 5.36 0 0 1 .168-.074l.036-.015a4.23 4.23 0 0 1 .424-.15c.932-.27 1.685-.075 2.32.618l.108.125.714.88c.636.833.617 1.723-.004 2.683l-.109.161-.102.139c-.04.054-.082.113-.123.177l-.062.1-.029.05.004.017.08.052.11.066.133.072c1.209.614 1.707 1.42 1.515 2.541l-.032.162-.213.916c-.137.593-.245.873-.67 1.258a2.135 2.135 0 0 1-1.059.518l-.01.003a3.917 3.917 0 0 1-.438.059l-.191.012-.173.006-.052.001h-.006c-.05.002-.102.006-.156.01l-.158.02.012.123.011.083.029.154c.068.322.101.618.098.89v.012c-.015.84-.38 1.45-1.132 1.87l-.147.076-1.023.494c-.901.403-1.722.234-2.484-.467a3.934 3.934 0 0 1-.144-.14l-.133-.142-.113-.13a2.938 2.938 0 0 0-.147-.161l-.085-.083-.043-.04-.08.076-.091.093-.103.115c-.828.981-1.703 1.334-2.763.923l-.153-.063-.915-.443-.271-.138c-.415-.225-.647-.44-.874-.918a2.153 2.153 0 0 1-.209-1.01v-.016c.006-.19.03-.388.07-.603l.038-.195.001-.004c.014-.064.025-.133.035-.206l.016-.148-.003-.003-.09-.012-.128-.012-.151-.006a4.145 4.145 0 0 1-.862-.098l-.012-.003c-.837-.198-1.363-.69-1.608-1.524l-.043-.16-.254-1.102c-.204-1.026.205-1.818 1.186-2.41l.17-.098.152-.08c.06-.03.123-.065.188-.105l.134-.087.004-.017-.055-.093-.07-.108-.089-.124a5.194 5.194 0 0 1-.286-.423c-.54-.905-.534-1.72.046-2.523l.1-.132.717-.877c.687-.792 1.566-.958 2.64-.554l.18.072.158.07a2.9 2.9 0 0 0 .193.08l.118.042.032-.014.029-.077.04-.12.04-.143c.013-.056.028-.112.044-.166zm4.24.841.013.038.05.138a1.5 1.5 0 0 0 .743.833l.03.014a1.5 1.5 0 0 0 1.136.082l.06-.02a1.47 1.47 0 0 0 .065-.023l.117-.044.062-.025.135-.059.035-.015a2.698 2.698 0 0 1 .415-.16c.268-.078.407-.06.47-.043.057.015.16.056.314.22l.077.09.682.84c.138.185.15.295.15.359 0 .084-.03.267-.225.573l-.082.122-.08.108a4.406 4.406 0 0 0-.18.26l-.014.022-.062.099-.008.013-.01.018-.03.05a1.5 1.5 0 0 0-.178 1.056l.004.017a1.5 1.5 0 0 0 .648.959l.08.052.05.032.11.066.06.034.133.072.034.018c.456.231.62.421.676.516.036.06.084.162.042.417l-.023.117-.207.892c-.066.285-.095.35-.105.369 0 0 0 .003-.01.013a.974.974 0 0 1-.101.103c-.082.074-.166.124-.354.161a2.357 2.357 0 0 1-.257.035l-.153.01-.138.004-.071.002a4.554 4.554 0 0 0-.28.02l-.158.019a1.5 1.5 0 0 0-1.318 1.628l.011.123.008.07.012.083.01.06.028.154.008.045c.05.236.068.419.066.557-.003.206-.046.301-.073.348-.028.046-.094.131-.276.235l-.105.056-.977.471c-.204.088-.317.082-.382.07-.076-.015-.228-.068-.456-.279a2.382 2.382 0 0 1-.08-.076l-.1-.107-.088-.102a4.389 4.389 0 0 0-.217-.236l-.018-.018-.084-.082a1.433 1.433 0 0 0-.036-.034l-.043-.04a1.5 1.5 0 0 0-2.047.014l-.08.075a1.43 1.43 0 0 0-.042.041l-.09.094a1.534 1.534 0 0 0-.048.05l-.103.116-.025.03c-.315.371-.532.495-.646.535-.073.025-.183.05-.415-.038l-.094-.039-.864-.418-.238-.12a1.186 1.186 0 0 1-.13-.083l-.004-.003-.003-.003a1.077 1.077 0 0 1-.083-.147.666.666 0 0 1-.063-.34c.003-.09.015-.207.043-.365l.035-.174a4.384 4.384 0 0 0 .058-.35l.016-.149a1.5 1.5 0 0 0-.434-1.224l-.004-.003a1.5 1.5 0 0 0-.86-.423l-.09-.012a1.405 1.405 0 0 0-.064-.008l-.128-.01a1.539 1.539 0 0 0-.068-.005l-.15-.007-.04-.001a2.663 2.663 0 0 1-.549-.06c-.215-.05-.305-.115-.346-.154-.04-.038-.109-.12-.17-.319l-.03-.114-.242-1.052c-.042-.224-.006-.329.023-.387.038-.076.146-.23.459-.42l.128-.074.119-.063a4.431 4.431 0 0 0 .316-.179l.134-.087a1.5 1.5 0 0 0 .65-.947l.004-.017a1.5 1.5 0 0 0-.171-1.066l-.055-.093a1.49 1.49 0 0 0-.037-.062l-.07-.108a1.496 1.496 0 0 0-.04-.057l-.088-.124a1.516 1.516 0 0 0-.024-.031c-.307-.406-.369-.647-.378-.754-.006-.067-.004-.18.148-.395l.072-.094.684-.838c.154-.173.262-.211.33-.225.09-.018.28-.027.623.1l.138.055.123.055a4.42 4.42 0 0 0 .316.13l.118.042a1.5 1.5 0 0 0 1.134-.058l.031-.015a1.5 1.5 0 0 0 .764-.823l.03-.077.023-.066.04-.12.02-.065.04-.143.01-.037.03-.119c.037-.128.076-.235.114-.323.1-.23.192-.319.243-.357.044-.033.134-.086.343-.105l.1-.006h1.14c.234.01.333.071.386.114.067.056.192.195.308.538l.043.14.034.129c.026.1.056.2.088.298z m10 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clip-rule="evenodd"/></svg>\n')), e.appendchild(t), e
				})()), o.appendchild(we(e, n)), o
			})(e, t, n)), t && o.appendchild((() => {
				const e = document.createelement("div");
				e.classname = "checkbox_pic check_sign_pic postoption", e.id = "check_sign", e.setattribute("onclick", "wall && wall.savechecksign(this)"), e.setattribute("onmouseover", "showtitle(this, false, [10,10], {nozindex: true});"), e.setattribute("role", "checkbox"), e.setattribute("aria-checked", "false"), e.setattribute("tabindex", "0"), window.getlang && (e.setattribute("data-title", window.getlang("wall_check_sign_disabled")), e.setattribute("aria-label", window.getlang("wall_check_sign_enabled")));
				const t = document.createelement("span");
				t.classname = "blind_label", t.textcontent = "убирать подпись при редактировании записи";
				const n = document.createelement("span");
				return n.classname = "postoption__iconwrapper", n.appendchild(re('<?xml version="1.0" encoding="utf-8"?>\n<svg width="20px" height="20px" viewbox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    \x3c!-- generator: sketch 63.1 (92452) - https://sketch.com --\x3e\n    <title>user_outline_20</title>\n    <desc>created with sketch.</desc>\n    <g id="icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="icons-20/user_outline_20">\n            <g id="user_outline_20">\n                <polygon opacity="0.100000001" points="0 0 20 0 20 20 0 20"></polygon>\n                <path d="m12.5,5 c12.5,3.61858856 11.3814114,2.5 10,2.5 c8.61858856,2.5 7.5,3.61858856 7.5,5 c7.5,6.38141144 8.61858856,7.5 10,7.5 c11.3814114,7.5 12.5,6.38141144 12.5,5 z m14,5 c14,7.20983856 12.2098386,9 10,9 c7.79016144,9 6,7.20983856 6,5 c6,2.79016144 7.79016144,1 10,1 c12.2098386,1 14,2.79016144 14,5 z m4,15.5 c4,16.2152041 4.35765068,16.5 5,16.5 l15,16.5 c15.6423493,16.5 16,16.2152041 16,15.5 c16,13.1666405 13.4333908,12 10,12 c6.56660919,12 4,13.1666405 4,15.5 z m2.5,15.5 c2.5,12.0151776 5.83339081,10.5 10,10.5 c14.1666092,10.5 17.5,12.0151776 17.5,15.5 c17.5,17.1283144 16.4053251,18 15,18 l5,18 c3.5946749,18 2.5,17.1283144 2.5,15.5 z" id="↳-icon-color" fill="currentcolor" fill-rule="nonzero"></path>\n            </g>\n        </g>\n    </g>\n</svg>\n')), e.append(t, n), e
			})());
			const s = document.createelement("div");
			return s.id = "page_add_media", s.classname = "page_add_media", s.setattribute("onclick", "wall && wall.showeditpost()"), o.appendchild(s), o
		},
		ge = ({
			oid: e,
			fromoid: t,
			ownername: n,
			ownerphoto: o,
			ownerhref: s,
			issuggestpost: a,
			onlyofficial: i
		}) => {
			const l = ne.isuserid(e),
				c = document.createelement("div");
			c.classname = "page_block", c.id = "page_block_submit_post", l || c.setattribute("data-tooltip-id", "business_groups_web:make_post");
			const r = (({
				oid: e,
				fromoid: t,
				ownername: n = "",
				ownerphoto: o = "",
				ownerhref: s = ""
			}) => {
				const a = document.createelement("div");
				return a.id = "submit_post_box", a.classname = "submit_post_box clear_fix _submit_post_box", a.setattribute("data-from-oid", string(t) || ""), a.setattribute("data-oid", string(e) || ""), a.setattribute("data-owner-name", n), a.setattribute("data-owner-photo", o), a.setattribute("data-owner-href", s), a.setattribute("onclick", "if(domclosest('article_snippet', event.target)) return;return cancelevent(event)"), ne.isuserid(e) && a.classlist.add("submit_post_box_with_sitposting"), a
			})({
				oid: e,
				fromoid: t,
				ownername: n,
				ownerphoto: o,
				ownerhref: s
			});
			return r.append((() => {
				const e = document.createelement("div");
				return e.id = "submit_post_error", e.classname = "error", e
			})(), (({
				ownerhref: e = "",
				ownerphoto: t = ""
			}) => {
				const n = document.createelement("a");
				n.href = e, n.classname = "post_field_user_link _post_field_author", n.setattribute("onclick", "if (!checkevent(event)) return nav.go(this, event); event.cancelbubble = true;");
				const o = le(t);
				n.appendchild(o);
				const s = le(t);
				return s.classlist.add("post_field_image_secondary"), n.appendchild(s), n
			})({
				ownerhref: s,
				ownerphoto: o
			}), pe(a, i), (() => {
				const e = document.createelement("div");
				return e.id = "media_preview", e.classname = "clear_fix media_preview wall_post_media_preview", e
			})(), (() => {
				const e = document.createelement("div");
				return e.id = "media_info", e.classname = "media_info", e
			})(), me(l), he(!l, a, i)), c.appendchild(r), c
		};
	ie((() => {
		window.vk ? .pe && (delete window.vk.pe.posting_web_react_form, delete window.vk.pe.posting_hide_copyright_button_web)
	})), ee("wall", (e => {
		if (e._cvf_hooked) return;
		e._cvf_hooked = !0;
		const t = e.init;
		e.init = async (...n) => {
			try {
				await (async ({
					wall_oid: e,
					public_link: t,
					loc: n,
					owner: o,
					wall_tpl: s,
					only_official: a
				}) => {
					const i = document.queryselector("#page_block_submit_post.new_posting"),
						l = document.queryselector("#page_block_submit_post:has(> .gtop_complex_message)"),
						c = document.getelementbyid("main_feed");
					if (document.getelementbyid("post_field")) return;
					if (!c && !i && !l) return;
					const [r, d, u, m] = s ? .ownerdata || [], [p, _, w] = s ? .profiledata || [];
					window.templates || (window.templates = {}), window.templates.primary_attachments_view_template || (window.templates.primary_attachments_view_template = '<div class="post_action_btn primary_attachments_view" id=\'primary_attachments_view_btn%link_id%\' style=\'display: none;\'>\n  <div class="post_action_btn_layout">\n    <span class="post_action_btn_text" role="button" aria-label="сетка">сетка</span>\n    <span class="post_action_image_btn"><svg fill="none" height="8" viewbox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m2.16 2.3a.75.75 0 0 1 1.05-.14l6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0l2.3 3.35a.75.75 0 0 1-.13-1.05z" fill="currentcolor" fill-rule="evenodd"/></svg></span>\n    <div class="post_action_tt_content">\n      <div class="fancyelementtt__item radiobtn" role="radio" aria-label=\'сетка\' data-value=\'grid\'>\n  \n  <div class="fancyelementtt__itemlabel">сетка</div>\n</div><div class="fancyelementtt__item radiobtn" role="radio" aria-label=\'карусель\' data-value=\'carousel\'>\n  \n  <div class="fancyelementtt__itemlabel">карусель</div>\n</div>\n    </div>\n  </div>\n</div>');
					const h = e || r || p,
						g = ge({
							onlyofficial: !!a,
							issuggestpost: e !== (r || p) && ne.isgroupid(h),
							oid: h,
							fromoid: h,
							ownerhref: u || t || n || (o ? .id ? `id${o.id}` : void 0) || w,
							ownerphoto: d || o ? .photo || _,
							ownername: m
						});
					if (i && (i.parentelement.insertbefore(g, i), i.remove()), c) {
						c.parentelement.prepend(g);
						const e = document.queryselector(".postingreactblock__root");
						e && e.remove()
					}
					if (l) {
						l.insertadjacentelement("afterend", g);
						const e = l.queryselector(".postingreactblock__root");
						e && e.remove()
					}
				})(n[0])
			} catch (e) {
				console.error(e)
			}
			return t.apply(e, n)
		}
	})), t((async () => {
		const e = await d();
		if (document.getelementbyid("submit_post_box")) return;
		if (0 === document.getelementsbyclassname("postingreactblock__root").length) return;
		const t = document.getelementbyid("main_feed");
		try {
			(e => {
				if (window.notifier ? .showevent) {
					const t = [e ? "не удалось внедрить старый постинг. перезайдите в раздел для повторной попытки." : "не удалось внедрить старый постинг. перезагружаем раздел для повторной попытки..."],
						n = parseint(localstorage.getitem("oldpostingnotifycountvcf") || "0") || 0;
					if (n > 2) return;
					2 === n && t.push("<br/><br/>", "это уведомление больше не появится. пожалуйста, запомните, что расширение иногда будет перезагружать разделы для внедрения старого постинга."), window.notifier.showevent({
						title: "vk classic feed",
						text: t.join("\n")
					}), localstorage.setitem("oldpostingnotifycountvcf", (n + 1).tostring())
				}
			})(t)
		} catch (e) {
			console.error(e)
		}
		t || e.go(e.objloc, null, {
			noback: !0,
			replace: !0,
			preventscroll: !0
		})
	})), (() => {
		try {
			if ("vknext" in globalthis) return globalthis.vknext;
			globalthis.vknext = e
		} catch (e) {
			console.error(e)
		}
		return e
	})().vcf_installed = !0
})();