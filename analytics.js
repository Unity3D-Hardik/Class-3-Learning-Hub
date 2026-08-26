/*
 * Class 3 Learning Hub — visitor analytics client
 * ------------------------------------------------------------------
 * Every visitor posts to the SAME backend URL (set once in config.js),
 * so data from all users and all devices collects centrally.
 *
 * Supported free backends:
 *   apps-script : Google Apps Script Web App writing to a Google Sheet
 *   firebase    : Firebase Realtime Database REST endpoint
 *
 * Falls back to browser-local storage when no endpoint is configured.
 *
 * PRIVACY: IP addresses and names are personal data. Tell parents that
 * usage is logged, and keep the sheet/database private.
 */
(function (global) {
    'use strict';

    var USER = global.HubConfig || {};
    var CONFIG = {
        PROVIDER: USER.PROVIDER || 'apps-script',
        ENDPOINT: USER.ENDPOINT || '',
        FIREBASE_URL: USER.FIREBASE_URL || '',
        APP_ID: USER.APP_ID || 'class3-hub',
        LOOKUP_IP: USER.LOOKUP_IP !== false,
        FLUSH_MS: 15000,
        BATCH_SIZE: 25,
        MAX_LOCAL_EVENTS: 1500
    };

    var LS_VISITOR = 'class3_hub_visitor_id';
    var LS_EVENTS = 'class3_hub_local_events';
    var SS_GEO = 'class3_hub_geo';

    function uuid() {
        if (global.crypto && global.crypto.randomUUID) return global.crypto.randomUUID();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0;
            return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
        });
    }

    function readJson(store, key, fallback) {
        try {
            var raw = store.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (e) { return fallback; }
    }

    function writeJson(store, key, value) {
        try { store.setItem(key, JSON.stringify(value)); } catch (e) { /* full or blocked */ }
    }

    function visitorId() {
        var id = null;
        try { id = localStorage.getItem(LS_VISITOR); } catch (e) { /* blocked */ }
        if (!id) {
            id = uuid();
            try { localStorage.setItem(LS_VISITOR, id); } catch (e) { /* blocked */ }
        }
        return id;
    }

    function deviceInfo() {
        var ua = navigator.userAgent || '';
        var browser = /Edg\//.test(ua) ? 'Edge'
            : /OPR\//.test(ua) ? 'Opera'
            : (/Chrome\//.test(ua) && !/Chromium/.test(ua)) ? 'Chrome'
            : /Firefox\//.test(ua) ? 'Firefox'
            : /Safari\//.test(ua) ? 'Safari' : 'Other';

        var os = /Windows/.test(ua) ? 'Windows'
            : /Android/.test(ua) ? 'Android'
            : /iPhone|iPad|iPod/.test(ua) ? 'iOS'
            : /Mac OS X/.test(ua) ? 'macOS'
            : /Linux/.test(ua) ? 'Linux' : 'Other';

        var type = /Mobi|Android|iPhone/.test(ua) ? 'Mobile'
            : /iPad|Tablet/.test(ua) ? 'Tablet' : 'Desktop';

        var tz = '';
        try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* ignore */ }

        return {
            browser: browser,
            os: os,
            deviceType: type,
            screen: global.screen ? global.screen.width + 'x' + global.screen.height : '',
            language: navigator.language || '',
            timezone: tz
        };
    }

    var state = {
        visitorId: visitorId(),
        sessionId: uuid(),
        name: '',
        ip: '', city: '', region: '', country: '', isp: '',
        device: deviceInfo(),
        startedAt: Date.now(),
        queue: []
    };

    function localAppend(rows) {
        var all = readJson(localStorage, LS_EVENTS, []).concat(rows);
        if (all.length > CONFIG.MAX_LOCAL_EVENTS) all = all.slice(-CONFIG.MAX_LOCAL_EVENTS);
        writeJson(localStorage, LS_EVENTS, all);
    }

    function buildRow(event, payload) {
        var d = state.device;
        return {
            appId: CONFIG.APP_ID,
            ts: new Date().toISOString(),
            visitorId: state.visitorId,
            sessionId: state.sessionId,
            name: state.name || 'Anonymous',
            event: event,
            subject: (payload && payload.subject) || '',
            topic: (payload && payload.topic) || '',
            correct: payload && typeof payload.correct === 'boolean' ? (payload.correct ? 1 : 0) : '',
            score: (payload && (payload.percentage != null ? payload.percentage : payload.score)) || '',
            detail: payload ? JSON.stringify(payload) : '',
            ip: state.ip,
            city: state.city,
            region: state.region,
            country: state.country,
            isp: state.isp,
            browser: d.browser,
            os: d.os,
            deviceType: d.deviceType,
            screen: d.screen,
            language: d.language,
            timezone: d.timezone,
            page: location.pathname,
            referrer: document.referrer || ''
        };
    }

    function post(url, body) {
        // sendBeacon survives tab close and never blocks the UI thread.
        if (navigator.sendBeacon) {
            try {
                if (navigator.sendBeacon(url, new Blob([body], { type: 'text/plain;charset=UTF-8' }))) return;
            } catch (e) { /* fall through to fetch */ }
        }
        try {
            fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                keepalive: true,
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: body
            }).catch(function () { /* offline — the local copy is kept */ });
        } catch (e) { /* ignore */ }
    }

    function send(rows) {
        localAppend(rows);

        if (CONFIG.PROVIDER === 'firebase' && CONFIG.FIREBASE_URL) {
            var base = CONFIG.FIREBASE_URL.replace(/\/$/, '');
            rows.forEach(function (r) { post(base + '/events.json', JSON.stringify(r)); });
            return;
        }
        if (CONFIG.ENDPOINT) {
            post(CONFIG.ENDPOINT, JSON.stringify({ appId: CONFIG.APP_ID, rows: rows }));
        }
    }

    function flush() {
        if (!state.queue.length) return;
        send(state.queue.splice(0, state.queue.length));
    }

    function track(event, payload) {
        state.queue.push(buildRow(event, payload));
        if (state.queue.length >= CONFIG.BATCH_SIZE) flush();
    }

    function setName(name) {
        var clean = String(name || '').trim().slice(0, 60);
        if (clean && clean !== state.name) {
            state.name = clean;
            track('identify', { name: clean });
        }
    }

    function applyGeo(d) {
        if (!d) return;
        state.ip = d.ip || '';
        state.city = d.city || '';
        state.region = d.region || '';
        state.country = d.country_name || d.country || '';
        state.isp = d.org || '';
    }

    function lookupIp() {
        if (!CONFIG.LOOKUP_IP) return Promise.resolve();

        // One lookup per tab — the result is reused for the whole session.
        var cached = readJson(sessionStorage, SS_GEO, null);
        if (cached) { applyGeo(cached); return Promise.resolve(); }

        var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        var timer = controller ? setTimeout(function () { controller.abort(); }, 4000) : null;

        return fetch('https://ipapi.co/json/', controller ? { signal: controller.signal } : undefined)
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (d) {
                if (timer) clearTimeout(timer);
                if (!d) return;
                applyGeo(d);
                writeJson(sessionStorage, SS_GEO, d);
            })
            .catch(function () { if (timer) clearTimeout(timer); });
    }

    function boot() {
        var start = function () {
            lookupIp().then(function () {
                track('session_start', { title: document.title });
                flush();
            });
        };
        // Never compete with first paint.
        if (global.requestIdleCallback) global.requestIdleCallback(start, { timeout: 2500 });
        else setTimeout(start, 800);

        setInterval(flush, CONFIG.FLUSH_MS);

        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'hidden') {
                track('session_ping', { secondsOnPage: Math.round((Date.now() - state.startedAt) / 1000) });
                flush();
            }
        }, { passive: true });

        global.addEventListener('pagehide', function () {
            track('session_end', { secondsOnPage: Math.round((Date.now() - state.startedAt) / 1000) });
            flush();
        }, { passive: true });
    }

    global.HubAnalytics = {
        config: CONFIG,
        track: track,
        setName: setName,
        flush: flush,
        state: state,
        getLocalEvents: function () { return readJson(localStorage, LS_EVENTS, []); },
        clearLocalEvents: function () { writeJson(localStorage, LS_EVENTS, []); }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }

})(window);
