/*
 * Class 3 Learning Hub — question bank core
 * ------------------------------------------------------------------
 * Load order (classic scripts, order matters):
 *   bank/core.js
 *   bank/math-mela.js
 *   bank/english-santoor.js
 *   bank/evs-wondrous-world.js
 *
 * Each book file calls ClassThreeBank.registerBook() with its own
 * generators and topic list, so books stay completely independent.
 *
 * Every generator returns:
 *   { topic, signature, badge, q, options[], ans, hint, exp, visualSVG? }
 */
(function (global) {
    'use strict';

    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const shuffle = (arr) => {
        const a = Array.prototype.slice.call(arr);
        for (let i = a.length - 1; i > 0; i--) {
            const j = randInt(0, i);
            const t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
    };

    const pick = (arr) => arr[randInt(0, arr.length - 1)];

    const stripTags = (s) => String(s)
        .replace(/<[^>]*>/g, ' ')
        .replace(/&[a-z]+;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    const slug = (s) => stripTags(s)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 70);

    const isNumeric = (v) => typeof v === 'number' || (/^-?\d+(\.\d+)?$/).test(String(v).trim());

    const TEXT_FILLERS = ['None of these', 'Cannot be decided', 'All of the above', 'Both of these'];

    /**
     * Assembles a multiple-choice question whose correct answer is always
     * present in the options exactly once.
     * cfg: { topic, badge, q, ans, wrong[], hint, exp, visualSVG, optionCount, signature }
     */
    function buildQuestion(cfg) {
        const count = cfg.optionCount || 4;
        const options = [];
        const seen = new Set();

        const add = (v) => {
            if (v === undefined || v === null) return;
            const key = String(v).trim();
            if (key === '' || seen.has(key)) return;
            seen.add(key);
            options.push(v);
        };

        add(cfg.ans);
        const wrong = cfg.wrong;
        if (wrong && wrong.length) shuffle(wrong).forEach(add);

        // Pad out if the author supplied too few / duplicate distractors.
        if (options.length < count) {
            if (isNumeric(cfg.ans)) {
                const base = Number(cfg.ans);
                let delta = 1;
                let guard = 0;
                while (options.length < count && guard++ < 200) {
                    add(base + delta);
                    if (base - delta >= 0) add(base - delta);
                    delta++;
                }
            } else {
                shuffle(TEXT_FILLERS).forEach(add);
            }
        }

        return {
            topic: cfg.topic,
            signature: cfg.signature || (cfg.topic + '__' + slug(cfg.q) + '__' + slug(cfg.ans)),
            badge: cfg.badge,
            q: cfg.q,
            visualSVG: cfg.visualSVG || null,
            options: shuffle(options.slice(0, count)),
            ans: cfg.ans,
            hint: cfg.hint || 'Read the question again carefully and look for the key clue word.',
            exp: cfg.exp || ('The correct answer is <strong>' + cfg.ans + '</strong>.')
        };
    }

    /** Turns a static array of paper-style items into a generator. */
    function bankGenerator(topic, badge, items) {
        const gen = () => {
            const item = pick(items);
            return buildQuestion({
                topic: topic,
                badge: item.badge || badge,
                q: item.q,
                ans: item.ans,
                wrong: item.wrong,
                hint: item.hint,
                exp: item.exp,
                visualSVG: item.visual
            });
        };
        gen.bankSize = items.length;
        gen.items = items;
        return gen;
    }

    /** Randomly runs one of several generators. */
    function mix() {
        const gens = Array.prototype.slice.call(arguments);
        const out = () => pick(gens)();
        out.parts = gens;
        return out;
    }

    const books = {};

    /**
     * Registers one book's question bank.
     * def: { subject, book, generators, topics }
     */
    function registerBook(def) {
        books[def.subject] = { subject: def.subject, book: def.book, topicCount: Object.keys(def.generators).length };
        API[def.subject] = def.generators;
        API.topics[def.subject] = def.topics;
        return API;
    }

    function subjects() {
        return Object.keys(books);
    }

    /**
     * Development check: runs every generator many times and reports any
     * malformed question. Returns an empty array when the bank is healthy.
     */
    function selfTest(runsPerTopic) {
        const runs = runsPerTopic || 60;
        const problems = [];
        subjects().forEach((subject) => {
            const genSet = API[subject];
            Object.keys(genSet).forEach((topic) => {
                for (let i = 0; i < runs; i++) {
                    let q;
                    try {
                        q = genSet[topic]();
                    } catch (err) {
                        problems.push({ subject, topic, issue: 'threw: ' + err.message });
                        break;
                    }
                    const opts = (q.options || []).map(String);
                    if (opts.indexOf(String(q.ans)) === -1) {
                        problems.push({ subject, topic, issue: 'answer missing from options', q: q.q, ans: q.ans, options: opts });
                    }
                    if (opts.length !== 4) {
                        problems.push({ subject, topic, issue: 'expected 4 options, got ' + opts.length, q: q.q });
                    }
                    if (new Set(opts).size !== opts.length) {
                        problems.push({ subject, topic, issue: 'duplicate options', q: q.q, options: opts });
                    }
                    if (!q.hint || !q.exp || !q.badge) {
                        problems.push({ subject, topic, issue: 'missing hint/exp/badge', q: q.q });
                    }
                }
            });
        });
        return problems;
    }

    function countBank() {
        const out = {};
        subjects().forEach((s) => { out[s] = Object.keys(API[s]).length; });
        return out;
    }

    const API = {
        utils: { randInt, shuffle, pick, slug, stripTags },
        buildQuestion: buildQuestion,
        bankGenerator: bankGenerator,
        mix: mix,
        registerBook: registerBook,
        books: books,
        subjects: subjects,
        topics: {},
        selfTest: selfTest,
        countBank: countBank
    };

    global.ClassThreeBank = API;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = API;
    }

})(typeof window !== 'undefined' ? window : globalThis);
