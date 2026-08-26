/* ---------------- DOM helpers ---------------- */

const domCache = new Map();

/** Memoised getElementById — ids in this app are static. */
function el(id) {
    let node = domCache.get(id);
    if (node && node.isConnected) return node;
    node = document.getElementById(id);
    if (node) domCache.set(id, node);
    return node;
}

function setText(id, value) {
    const node = el(id);
    if (node && node.textContent !== String(value)) node.textContent = value;
}

function setHidden(id, hidden) {
    const node = el(id);
    if (node) node.classList.toggle('hidden', hidden);
}

let soundEnabled = true;
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

/* ---------------- Kid-friendly sound engine ----------------
   Warm marimba-ish tones instead of harsh buzzes: gentle attack,
   soft decay, and cheerful major-key melodies.
------------------------------------------------------------ */

const NOTE = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00,
    C6: 1046.50, E6: 1318.51, G6: 1567.98
};

/** Plays one soft note. delay/dur in seconds, vol 0-1. */
function playNote(freq, delay, dur, vol, wave) {
    const start = audioCtx.currentTime + delay;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = wave || 'sine';
    osc.frequency.setValueAtTime(freq, start);

    // Rounded envelope keeps it pleasant on cheap tablet speakers.
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(vol, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(start);
    osc.stop(start + dur + 0.02);
}

const SOUND_TUNES = {
    // Rising major arpeggio — "you did it!"
    correct: [[NOTE.C5, 0, 0.18, 0.22], [NOTE.E5, 0.09, 0.18, 0.22], [NOTE.G5, 0.18, 0.26, 0.24]],
    // Gentle two-note "oh well" — never harsh or scary.
    wrong: [[NOTE.E4, 0, 0.16, 0.16, 'triangle'], [NOTE.C4, 0.13, 0.28, 0.14, 'triangle']],
    click: [[NOTE.A5, 0, 0.06, 0.09]],
    // Little celebration for finishing a quiz.
    fanfare: [
        [NOTE.C5, 0, 0.16, 0.20], [NOTE.E5, 0.11, 0.16, 0.20],
        [NOTE.G5, 0.22, 0.16, 0.20], [NOTE.C6, 0.33, 0.42, 0.24],
        [NOTE.G5, 0.36, 0.42, 0.12], [NOTE.E6, 0.50, 0.45, 0.16]
    ],
    // Extra sparkle when a streak hits a milestone.
    streak: [[NOTE.G5, 0, 0.12, 0.18], [NOTE.C6, 0.08, 0.12, 0.18], [NOTE.E6, 0.16, 0.3, 0.20]],
    start: [[NOTE.G4, 0, 0.14, 0.16], [NOTE.C5, 0.1, 0.14, 0.18], [NOTE.E5, 0.2, 0.3, 0.2]]
};

function playSound(type) {
    if (!soundEnabled) return;
    const tune = SOUND_TUNES[type];
    if (!tune) return;
    try {
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        tune.forEach(n => playNote(n[0], n[1], n[2], n[3], n[4]));
    } catch (e) {
        // Autoplay policy blocks audio until the first tap — that's fine.
    }
}

const CONFETTI_COLOURS = ['#f59e0b', '#ec4899', '#8b5cf6', '#22c55e', '#38bdf8', '#ef4444'];

/** Small celebration burst. Skipped when the child prefers reduced motion. */
function burstConfetti(pieces) {
    const layer = el('confetti-layer');
    if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const frag = document.createDocumentFragment();
    const count = pieces || 26;
    for (let i = 0; i < count; i++) {
        const bit = document.createElement('div');
        bit.className = 'confetti-bit';
        bit.style.left = randInt(5, 95) + 'vw';
        bit.style.top = randInt(-15, 5) + 'vh';
        bit.style.background = CONFETTI_COLOURS[i % CONFETTI_COLOURS.length];
        bit.style.setProperty('--dx', randInt(-120, 120) + 'px');
        bit.style.setProperty('--spin', randInt(360, 1080) + 'deg');
        bit.style.setProperty('--dur', (1.2 + Math.random() * 1.1).toFixed(2) + 's');
        frag.appendChild(bit);
    }
    layer.appendChild(frag);
    setTimeout(() => layer.replaceChildren(), 2600);
}

function applySoundUI() {
    setText('sound-label', soundEnabled ? '🔊 Sound On' : '🔇 Sound Off');
}
let feedbackTimer = null;

/** Big friendly praise/encouragement bubble. */
function showFeedback(message, good) {
    const toast = el('feedback-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'fixed left-1/2 -translate-x-1/2 top-24 z-[70] px-6 py-3 rounded-blob text-lg font-bold shadow-xl pop-in ' +
        (good ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-amber-950');
    clearTimeout(feedbackTimer);
    feedbackTimer = setTimeout(() => { toast.className = 'hidden'; }, 1600);
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    appData.soundEnabled = soundEnabled;
    saveAppData();
    applySoundUI();
    if (soundEnabled) playSound('correct');
}

const STORAGE_KEY = 'class3_learning_hub_data';

function getInitialState() {
    return {
        studentName: '',
        hasSeenWelcome: false,
        soundEnabled: true,
        // Empty array = every chapter of that book is active.
        activeChapters: { math: [], english: [], evs: [] },
        stats: {
            math: { score: 0, total: 0, wrong: 0, streak: 0 },
            english: { score: 0, total: 0, wrong: 0, streak: 0 },
            evs: { score: 0, total: 0, wrong: 0, streak: 0 }
        },
        quizHistory: [],
        usedExamSignatures: { math: [], english: [], evs: [] }
    };
}

let appData = getInitialState();

function loadAppData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            const base = getInitialState();
            appData = {
                ...base,
                ...parsed,
                stats: { ...base.stats, ...(parsed.stats || {}) },
                activeChapters: { ...base.activeChapters, ...(parsed.activeChapters || {}) },
                usedExamSignatures: { ...base.usedExamSignatures, ...(parsed.usedExamSignatures || {}) },
                quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : []
            };
            // Older saves may be missing per-subject counters.
            Object.keys(base.stats).forEach(k => {
                appData.stats[k] = { ...base.stats[k], ...(appData.stats[k] || {}) };
            });
        }
    } catch (e) {
        // Private mode or a full quota — carry on with in-memory state.
    }
    soundEnabled = appData.soundEnabled !== false;
    updateUserUI();
}

function saveAppData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    } catch (e) {
        // Progress simply will not persist this session.
    }
    updateUserUI();
}

function updateUserUI() {
    const name = appData.studentName || 'Learner';
    const headerName = el('header-user-name');
    if (headerName) headerName.innerText = name;

    const portalGreeting = el('portal-user-greeting');
    if (portalGreeting) portalGreeting.innerText = name;

    const reportName = el('report-student-name');
    if (reportName) reportName.innerText = `Certificate of Completion for ${name}`;

    if (window.HubAnalytics) window.HubAnalytics.setName(appData.studentName || '');
}

function openWelcomeNameModal() {
    const modal = el('modal-welcome-name');
    if (modal) {
        modal.classList.remove('hidden');
        const input = el('input-welcome-student-name');
        if (input) input.focus();
    }
}

function saveWelcomeStudentName() {
    playSound('fanfare');
    const input = el('input-welcome-student-name');
    const val = input ? input.value.trim() : '';
    appData.studentName = val || 'Learner';
    appData.hasSeenWelcome = true;
    saveAppData();
    const modal = el('modal-welcome-name');
    if (modal) modal.classList.add('hidden');
}

function openSettingsModal() {
    playSound('click');
    const input = el('input-student-name');
    if (input) input.value = appData.studentName || 'Learner';
    renderAnalyticsModal();
    const modal = el('modal-settings');
    if (modal) modal.classList.remove('hidden');
}

function closeSettingsModal() {
    playSound('click');
    const modal = el('modal-settings');
    if (modal) modal.classList.add('hidden');
}

function saveStudentName() {
    playSound('click');
    const input = el('input-student-name');
    const val = input ? input.value.trim() : '';
    if (val) {
        appData.studentName = val;
        saveAppData();
        const badge = el('save-name-badge');
        if (badge) {
            badge.classList.remove('hidden');
            setTimeout(() => badge.classList.add('hidden'), 2000);
        }
    }
}

function confirmResetAnalytics() {
    playSound('click');
    const modal = el('modal-confirm-reset');
    if (modal) modal.classList.remove('hidden');
}

function closeConfirmResetModal() {
    playSound('click');
    const modal = el('modal-confirm-reset');
    if (modal) modal.classList.add('hidden');
}

function executeResetAnalytics() {
    playSound('click');
    const currentName = appData.studentName;
    appData = getInitialState();
    appData.studentName = currentName;
    appData.hasSeenWelcome = true;
    saveAppData();
    closeConfirmResetModal();
    renderAnalyticsModal();
    updateStats();
}

function renderAnalyticsModal() {
    let totalQ = 0, totalCorrect = 0, totalWrong = 0;

    const subjectMeta = {
        math: { name: 'Mathematics', icon: '📐', color: 'indigo' },
        english: { name: 'English', icon: '📚', color: 'sky' },
        evs: { name: 'EVS', icon: '🌿', color: 'emerald' }
    };

    // Build the whole markup first, then write it once.
    const cards = [];
    Object.keys(appData.stats).forEach(subj => {
        const s = appData.stats[subj];
        const wrong = s.wrong || (s.total - s.score);
        totalQ += s.total;
        totalCorrect += s.score;
        totalWrong += wrong;
        const pct = s.total > 0 ? Math.round((s.score / s.total) * 100) : 0;
        const meta = subjectMeta[subj];
        if (!meta) return;

        cards.push(`
            <div class="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 space-y-1">
                <div class="flex items-center justify-between text-xs font-extrabold text-slate-700">
                    <span>${meta.icon} ${meta.name}</span>
                    <span class="text-${meta.color}-600">${pct}% Acc</span>
                </div>
                <div class="text-[11px] text-slate-500 font-medium flex justify-between pt-1 border-t border-slate-200/60">
                    <span>Total: ${s.total}</span>
                    <span class="text-emerald-600 font-bold">✓ ${s.score}</span>
                    <span class="text-rose-500 font-bold">✗ ${wrong}</span>
                </div>
            </div>
        `);
    });

    const cardContainer = el('an-subject-cards');
    if (cardContainer) cardContainer.innerHTML = cards.join('');

    setText('an-total-q', totalQ);
    setText('an-correct-q', totalCorrect);
    setText('an-wrong-q', totalWrong);
    setText('an-accuracy-q', (totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0) + '%');

    const historyContainer = el('an-quiz-history');
    if (!historyContainer) return;

    if (appData.quizHistory.length === 0) {
        historyContainer.innerHTML = `<div class="p-3 bg-slate-50 rounded-xl text-center text-slate-400 font-medium text-xs">No quiz attempts recorded yet. Take a 20-Q Challenge Quiz!</div>`;
        return;
    }

    historyContainer.innerHTML = appData.quizHistory.slice(-10).reverse().map(h => `
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center justify-between font-semibold text-slate-700">
            <div>
                <span class="font-bold text-slate-900">${h.subjectName}</span>
                <span class="text-slate-400 text-[10px] ml-1.5">${h.date}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-emerald-600 font-bold">✓ ${h.correct}/${h.total || 20}</span>
                <span class="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-black text-[10px]">${h.percentage}% (${h.grade})</span>
            </div>
        </div>
    `).join('');
}

let currentSubject = 'math';
let currentSubjectTab = 'practice';

let currentPracticeQ = null;
let practiceAnswered = false;

// Quiz State
let examQuestions = [];
let examCurrentIdx = 0;
let examUserAnswers = [];

// Helper Utilities
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffleArr = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = randInt(0, i);
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const subjectConfigs = {
    math: {
        title: "Mathematics (Math Mela)",
        shortName: "Mathematics",
        subtitle: "NCERT Math Mela • Chapters 1-14 • Practice & Test Suite",
        icon: "📐",
        bannerBg: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
    },
    english: {
        title: "English (Santoor 3 & Echoes)",
        shortName: "English",
        subtitle: "Grammar, Vocabulary, Comprehension & Sentence Building",
        icon: "📚",
        bannerBg: "bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600"
    },
    evs: {
        title: "EVS (Our Wondrous World)",
        shortName: "EVS",
        subtitle: "Family, Festivals, Plants, Water, Shelter, Food & Travel",
        icon: "🌿",
        bannerBg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600"
    }
};

const OPTION_BASE_CLASS = "opt-btn p-4 rounded-2xl border-4 border-violet-200 bg-white hover:bg-violet-50 hover:border-violet-400 font-medium text-slate-800 text-left transition block-3d";
const OPTION_CORRECT_CLASS = "opt-btn p-4 rounded-2xl border-4 border-emerald-500 bg-emerald-100 text-emerald-900 font-bold text-left block-3d cheer";
const OPTION_WRONG_CLASS = "opt-btn p-4 rounded-2xl border-4 border-rose-400 bg-rose-100 text-rose-900 font-bold text-left block-3d";
const OPTION_DIM_CLASS = "opt-btn p-4 rounded-2xl border-4 border-slate-100 bg-slate-50 font-medium text-slate-400 text-left block-3d";

const PRAISE = ['Superb! 🌟', 'Well done! 🎉', 'Brilliant! 👏', 'You got it! ✅', 'Great thinking! 🧠', 'Perfect! 💯'];
const ENCOURAGE = ['Almost! Try the next one 💪', 'Good try! 🙌', 'Not quite — you\'ll get it! 🌈', 'Keep going! 🌱'];

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getPool(subject) {
    const bank = window.ClassThreeBank;
    if (!bank) return null;
    return bank[subject] || bank.math;
}

/* ---------------- Chapter filter ---------------- */

/** Chapter ids that Practice Mode and the quiz are allowed to draw from. */
function getActiveChapters(subject) {
    const pool = getPool(subject);
    if (!pool) return [];
    // A test lock overrides whatever the learner had selected before.
    const locked = lockedChapters(subject);
    if (locked && locked.length) return locked;
    const all = Object.keys(pool);
    const saved = (appData.activeChapters && appData.activeChapters[subject]) || [];
    const active = saved.filter(k => pool[k]);
    // Empty selection, or chapters added since the last save, fall back to everything.
    return active.length ? active : all;
}

function updateChapterCount() {
    const active = getActiveChapters(currentSubject).length;
    const total = Object.keys(getPool(currentSubject) || {}).length;
    setText('active-chapter-count', active + '/' + total);
}

function openChapterModal() {
    playSound('click');
    const pool = getPool(currentSubject);
    if (!pool || lockedChapters(currentSubject)) return;

    const topics = (window.ClassThreeBank.topics[currentSubject] || []).filter(t => t.id !== 'all');
    const active = new Set(getActiveChapters(currentSubject));

    setText('chapter-modal-subtitle', subjectConfigs[currentSubject].title + ' — ticked chapters feed Practice Mode and the 20-Q Quiz.');
    const list = el('chapter-checkbox-list');
    if (list) {
        list.innerHTML = topics.map(t => `
            <label class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 cursor-pointer transition">
                <input type="checkbox" value="${t.id}" ${active.has(t.id) ? 'checked' : ''} class="w-4 h-4 accent-indigo-600 shrink-0">
                <span class="text-xs font-bold text-slate-800">${t.label}</span>
            </label>
        `).join('');
    }
    setHidden('chapter-warning', true);
    setHidden('modal-chapters', false);
}

function closeChapterModal() {
    playSound('click');
    setHidden('modal-chapters', true);
}

function toggleAllChapters(select) {
    document.querySelectorAll('#chapter-checkbox-list input[type=checkbox]')
        .forEach(cb => { cb.checked = select; });
}

function saveChapterSelection() {
    const selected = Array.from(document.querySelectorAll('#chapter-checkbox-list input[type=checkbox]:checked'))
        .map(cb => cb.value);

    if (!selected.length) {
        setHidden('chapter-warning', false);
        playSound('wrong');
        return;
    }

    playSound('click');
    appData.activeChapters[currentSubject] = selected;
    saveAppData();
    updateChapterCount();
    closeChapterModal();

    if (currentSubjectTab === 'practice') generateNewQuestion();
    else if (currentSubjectTab === 'exam') resetExamView();
}

function trackEvent(name, payload) {
    if (window.HubAnalytics && typeof window.HubAnalytics.track === 'function') {
        window.HubAnalytics.track(name, payload);
    }
}

function showPortal() {
    playSound('click');
    testLock = null;
    resetExamView();
    renderUpcomingTests();
    const portal = el('view-portal');
    const subject = el('view-subject');
    if (portal) portal.classList.remove('hidden');
    if (subject) subject.classList.add('hidden');
}

/** Every paper still to be sat, soonest first. */
function findUpcomingTests() {
    const list = [];
    (window.HubExamPresets || []).forEach(preset => {
        Object.keys(preset.subjects || {}).forEach(subject => {
            if (!subjectConfigs[subject]) return;
            const entry = preset.subjects[subject];
            const left = daysUntil(entry.date);
            if (left < 0) return;
            list.push({ preset, subject, entry, left });
        });
    });
    return list.sort((a, b) => a.left - b.left);
}

const TEST_BUTTON_STYLE = {
    math: 'bg-violet-100 border-violet-300 text-violet-950',
    english: 'bg-sky-100 border-sky-300 text-sky-950',
    evs: 'bg-emerald-100 border-emerald-300 text-emerald-950'
};

function renderUpcomingTests() {
    const tests = findUpcomingTests();
    const listBox = el('upcoming-tests-list');
    if (!tests.length || !listBox) {
        setHidden('upcoming-tests', true);
        return;
    }

    setText('upcoming-tests-title', `📅 ${tests[0].preset.name} — practise for your papers`);

    listBox.innerHTML = tests.map(t => {
        const cfg = subjectConfigs[t.subject];
        const date = new Date(t.entry.date + 'T00:00:00')
            .toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
        const when = t.left === 0 ? 'Today!' : t.left === 1 ? 'Tomorrow' : `in ${t.left} days`;
        const urgent = t.left <= 1 ? ' streak-hot' : '';
        return `
            <button type="button" onclick="startTestPractice('${t.subject}')"
                    class="rounded-blob border-4 px-4 py-3.5 text-left block-3d ${TEST_BUTTON_STYLE[t.subject] || 'bg-amber-100 border-amber-300'}">
                <span class="flex items-center gap-2 font-bold text-lg">
                    <span class="text-2xl${urgent}">${cfg.icon}</span> ${cfg.shortName}
                </span>
                <span class="block text-sm font-semibold mt-1">📅 ${date}</span>
                <span class="block text-xs opacity-80">${when} · tap to practise</span>
            </button>`;
    }).join('');

    setHidden('upcoming-tests', false);
}

/** Home-screen shortcut: lock to the syllabus and start practising straight away. */
function startTestPractice(subject) {
    if (!subjectConfigs[subject]) return;
    const found = findUpcomingTests().find(t => t.subject === subject);
    if (!found) return;
    // Lock first so selectSubject() builds a syllabus-only topic list.
    enterTestMode(found);
    selectSubject(subject);
    practiseSchoolTest();
}

/* ---------------- Test mode ---------------- */

/** While set, only this exam's chapters are reachable anywhere in the app. */
let testLock = null;

function enterTestMode(found) {
    testLock = {
        presetId: found.preset.id,
        name: found.preset.name,
        subject: found.subject,
        entry: found.entry
    };
}

function exitTestMode() {
    if (!testLock) return;
    playSound('click');
    const subject = testLock.subject;
    testLock = null;
    // Hand every chapter of the book back to the learner.
    appData.activeChapters[subject] = [];
    saveAppData();
    selectSubject(subject);
    switchSubjectTab('practice');
    showFeedback('All chapters unlocked 📚', true);
}

/** Chapter ids the lock allows, or null when not locked for this subject. */
function lockedChapters(subject) {
    if (!testLock || testLock.subject !== subject) return null;
    const pool = getPool(subject) || {};
    return testLock.entry.chapters.filter(id => pool[id]);
}

function renderTestLockBar() {
    const locked = lockedChapters(currentSubject);
    if (!locked) {
        setHidden('test-lock-bar', true);
        setHidden('chapters-btn', false);
        return;
    }
    const date = new Date(testLock.entry.date + 'T00:00:00')
        .toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    setText('test-lock-text', `${testLock.name} practice — ${subjectConfigs[currentSubject].shortName} only`);
    setText('test-lock-sub', `${locked.length} test chapters · paper on ${date}`);
    setHidden('test-lock-bar', false);
    // The chapter picker would let them escape the syllabus, so hide it.
    setHidden('chapters-btn', true);
}

function selectSubject(subjKey) {
    playSound('click');
    if (!subjectConfigs[subjKey]) return;
    // Choosing a different subject leaves test mode behind.
    if (testLock && testLock.subject !== subjKey) testLock = null;
    currentSubject = subjKey;
    resetExamView();

    const config = subjectConfigs[subjKey];
    const title = el('subj-title');
    if (title) title.innerText = config.title;
    const sub = el('subj-subtitle');
    if (sub) sub.innerText = config.subtitle;
    const icon = el('subj-icon-box');
    if (icon) icon.innerText = config.icon;
    const banner = el('subject-banner');
    if (banner) banner.className = `rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4 ${config.bannerBg}`;

    const selectEl = el('topic-select');
    const allTopics = (window.ClassThreeBank && window.ClassThreeBank.topics[subjKey]) || [{ id: 'all', label: 'All Topics' }];
    const locked = lockedChapters(subjKey);
    const topicList = locked
        ? [{ id: 'all', label: '🎓 All test chapters' }].concat(allTopics.filter(t => locked.indexOf(t.id) !== -1))
        : allTopics;
    if (selectEl) {
        selectEl.innerHTML = '';
        topicList.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t.id;
            opt.textContent = t.label;
            selectEl.appendChild(opt);
        });
    }

    const labLabel = el('lab-tab-label');
    if (labLabel) labLabel.innerText = subjKey === 'evs' ? 'STEAM Lab' : 'Interactive Tools';

    updateChapterCount();
    renderTestLockBar();

    const portal = el('view-portal');
    if (portal) portal.classList.add('hidden');
    const subjectView = el('view-subject');
    if (subjectView) subjectView.classList.remove('hidden');

    trackEvent('subject_open', { subject: subjKey });
    updateStats();
    switchSubjectTab('practice');
}

const TAB_IDLE_CLASS = "sub-tab-btn px-4 py-2.5 rounded-2xl font-semibold transition flex items-center gap-2 bg-slate-100 text-slate-600 hover:bg-slate-200 block-3d";
const TAB_ACTIVE_CLASS = "sub-tab-btn px-4 py-2.5 rounded-2xl font-semibold transition flex items-center gap-2 bg-violet-600 text-white block-3d";
const SUB_TABS = ['practice', 'exam', 'school', 'lab'];

function switchSubjectTab(tab) {
    playSound('click');
    currentSubjectTab = tab;

    document.querySelectorAll('.sub-tab-btn').forEach(btn => {
        btn.className = TAB_IDLE_CLASS;
        btn.setAttribute('aria-selected', 'false');
    });
    const activeBtn = el(`tab-${tab}-btn`);
    if (activeBtn) {
        activeBtn.className = TAB_ACTIVE_CLASS;
        activeBtn.setAttribute('aria-selected', 'true');
    }

    SUB_TABS.forEach(name => {
        const v = el(`sub-view-${name}`);
        if (v) v.classList.toggle('hidden', name !== tab);
    });

    // The topic dropdown only applies to Practice Mode; chapters also drive the quiz.
    setHidden('topic-select-wrap', tab !== 'practice');
    setHidden('filter-bar', tab === 'lab' || tab === 'school');

    if (tab === 'practice') {
        generateNewQuestion();
    } else if (tab === 'exam') {
        resetExamView();
    } else if (tab === 'school') {
        renderSchoolTest();
    } else if (tab === 'lab') {
        ['math', 'english', 'evs'].forEach(s => {
            const lab = el(`lab-${s}`);
            if (lab) lab.classList.toggle('hidden', s !== currentSubject);
        });
    }
}

/* ---------------- School test prep ---------------- */

/** The syllabus entry for the current subject, or null. */
function getSchoolTest() {
    const presets = window.HubExamPresets || [];
    for (const preset of presets) {
        const entry = preset.subjects && preset.subjects[currentSubject];
        if (entry && entry.chapters && entry.chapters.length) {
            return { preset, entry };
        }
    }
    return null;
}

/** Only the syllabus chapters this book actually has generators for. */
function schoolTestChapters(entry) {
    const pool = getPool(currentSubject) || {};
    return entry.chapters.filter(id => pool[id]);
}

function daysUntil(dateStr) {
    const target = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((target - today) / 86400000);
}

function renderSchoolTest() {
    const found = getSchoolTest();
    const listBox = el('school-chapter-list');

    if (!found) {
        setHidden('school-empty', false);
        setHidden('school-actions', true);
        if (listBox) listBox.innerHTML = '';
        setText('school-test-name', 'No test scheduled');
        setText('school-test-meta', '');
        setText('school-days', '–');
        return;
    }

    setHidden('school-empty', true);
    setHidden('school-actions', false);

    const { preset, entry } = found;
    const chapters = schoolTestChapters(entry);
    const dateLabel = new Date(entry.date + 'T00:00:00')
        .toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    setText('school-test-name', `${preset.name} • ${preset.format}`);
    setText('school-test-meta', `${subjectConfigs[currentSubject].shortName} paper — ${entry.day}, ${dateLabel} · ${preset.grade}, ${preset.school}`);

    const left = daysUntil(entry.date);
    const daysBox = el('school-days');
    const countdown = el('school-countdown');
    if (daysBox) {
        if (left > 0) daysBox.textContent = left;
        else if (left === 0) daysBox.textContent = '🎉';
        else daysBox.textContent = '✓';
    }
    if (countdown) {
        const label = countdown.querySelector('div:last-child');
        if (label) label.textContent = left > 1 ? 'days to go' : left === 1 ? 'day to go' : left === 0 ? 'test is today!' : 'test done';
    }

    const topics = (window.ClassThreeBank.topics[currentSubject] || []);
    const labelFor = id => (topics.find(t => t.id === id) || {}).label || id;

    if (listBox) {
        listBox.innerHTML = chapters.map(id => `
            <div class="flex items-start gap-2 bg-amber-50 border-2 border-amber-100 rounded-xl px-3 py-2">
                <span class="text-emerald-600 font-bold">✓</span>
                <span class="text-sm font-medium text-slate-700">${labelFor(id)}</span>
            </div>
        `).join('');
    }
}

/** Locks the app to the syllabus, then opens Practice Mode. */
function practiseSchoolTest() {
    const found = getSchoolTest();
    if (!found) return;
    playSound('start');

    enterTestMode({ preset: found.preset, subject: currentSubject, entry: found.entry });
    const chapters = schoolTestChapters(found.entry);
    appData.activeChapters[currentSubject] = chapters;
    saveAppData();
    selectSubject(currentSubject);

    trackEvent('school_test_practice', { subject: currentSubject, preset: found.preset.id });
    showFeedback(`${chapters.length} test chapters only 🎓`, true);
    switchSubjectTab('practice');
}

/** Same syllabus lock, but jumps straight into a mock paper. */
function startSchoolTest() {
    const found = getSchoolTest();
    if (!found) return;

    enterTestMode({ preset: found.preset, subject: currentSubject, entry: found.entry });
    appData.activeChapters[currentSubject] = schoolTestChapters(found.entry);
    saveAppData();
    selectSubject(currentSubject);

    trackEvent('school_test_mock', { subject: currentSubject, preset: found.preset.id });
    switchSubjectTab('exam');
    startExam();
}

/* ---------------- Practice Mode ---------------- */

function generateNewQuestion() {
    playSound('click');
    practiceAnswered = false;

    const hBox = el('hint-box');
    if (hBox) hBox.classList.add('hidden');
    const eBox = el('explanation-box');
    if (eBox) eBox.classList.add('hidden');
    const revealBox = el('answer-reveal');
    if (revealBox) revealBox.classList.add('hidden');

    const pool = getPool(currentSubject);
    if (!pool) {
        const qText = el('q-text');
        if (qText) qText.innerText = 'Question bank could not be loaded. Please refresh the page.';
        return;
    }

    const topicSel = el('topic-select');
    const filter = topicSel ? topicSel.value : 'all';
    const keys = (filter !== 'all' && pool[filter]) ? [filter] : getActiveChapters(currentSubject);
    const chosenKey = keys[randInt(0, keys.length - 1)];
    currentPracticeQ = pool[chosenKey]();

    const badge = el('q-badge');
    if (badge) badge.innerText = currentPracticeQ.badge;
    const qText = el('q-text');
    if (qText) qText.innerHTML = currentPracticeQ.q;
    const hText = el('hint-text');
    if (hText) hText.innerHTML = currentPracticeQ.hint;
    const expText = el('explanation-text');
    if (expText) expText.innerHTML = currentPracticeQ.exp;

    const visualBox = el('q-visual');
    if (visualBox) {
        if (currentPracticeQ.visualSVG) {
            visualBox.innerHTML = currentPracticeQ.visualSVG;
            visualBox.classList.remove('hidden');
        } else {
            visualBox.innerHTML = '';
            visualBox.classList.add('hidden');
        }
    }

    const optionsContainer = el('q-options');
    if (optionsContainer) {
        // Build off-DOM, then attach once — a single reflow instead of four.
        const frag = document.createDocumentFragment();
        currentPracticeQ.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = OPTION_BASE_CLASS;
            btn.dataset.optVal = String(opt);
            btn.innerHTML = `<span class="opt-letter">${'ABCD'[idx] || (idx + 1)}</span><span>${opt}</span>`;
            frag.appendChild(btn);
        });
        optionsContainer.replaceChildren(frag);
    }

    const qCard = el('practice-card');
    if (qCard) {
        qCard.classList.remove('pop-in');
        void qCard.offsetWidth;
        qCard.classList.add('pop-in');
    }
}

function checkPracticeAnswer(btn) {
    if (practiceAnswered || !currentPracticeQ) return;
    practiceAnswered = true;

    const st = appData.stats[currentSubject];
    st.total++;

    const correctVal = String(currentPracticeQ.ans);
    const isCorrect = btn.dataset.optVal === correctVal;
    const optsBox = el('q-options');
    const allBtns = optsBox ? Array.from(optsBox.children) : [];

    // Lock every option so the answer cannot be changed after submitting.
    let correctBtn = null;
    allBtns.forEach(b => {
        b.disabled = true;
        if (b.dataset.optVal === correctVal) correctBtn = b;
        else if (b !== btn) b.className = OPTION_DIM_CLASS;
    });

    // Always highlight the correct option, whether the learner was right or wrong.
    if (correctBtn) {
        correctBtn.className = OPTION_CORRECT_CLASS;
        correctBtn.insertAdjacentHTML('beforeend', '<span class="ml-auto text-2xl">✅</span>');
    }

    if (isCorrect) {
        st.score++;
        st.streak++;
        if (!correctBtn) btn.className = OPTION_CORRECT_CLASS;
        setHidden('answer-reveal', true);

        // Every 5 in a row earns an extra cheer.
        const milestone = st.streak > 0 && st.streak % 5 === 0;
        playSound(milestone ? 'streak' : 'correct');
        burstConfetti(milestone ? 60 : 24);
        showFeedback(milestone ? `${st.streak} in a row! 🔥🔥` : PRAISE[randInt(0, PRAISE.length - 1)], true);
    } else {
        playSound('wrong');
        st.wrong = (st.wrong || 0) + 1;
        st.streak = 0;
        btn.className = OPTION_WRONG_CLASS + ' shake';
        btn.insertAdjacentHTML('beforeend', '<span class="ml-auto text-2xl">❌</span>');
        showFeedback(ENCOURAGE[randInt(0, ENCOURAGE.length - 1)], false);

        // Spell the correct answer out AND show the hint automatically.
        const revealText = el('answer-reveal-text');
        const revealHint = el('answer-reveal-hint');
        if (revealText) revealText.innerHTML = currentPracticeQ.ans;
        if (revealHint) revealHint.innerHTML = '💡 <strong>Hint:</strong> ' + currentPracticeQ.hint;
        setHidden('answer-reveal', false);
        setHidden('hint-box', false);
    }

    saveAppData();
    setHidden('explanation-box', false);
    updateStats();

    trackEvent('practice_answer', {
        subject: currentSubject,
        topic: currentPracticeQ.topic || '',
        correct: isCorrect
    });
}

function toggleHint() {
    playSound('click');
    const hintBox = el('hint-box');
    if (hintBox) hintBox.classList.toggle('hidden');
}

function updateStats() {
    const st = appData.stats[currentSubject];
    setText('stat-score', st.score);
    setText('stat-total', st.total);
    setText('stat-streak', st.streak);
    setText('stat-accuracy', (st.total > 0 ? Math.round((st.score / st.total) * 100) : 0) + '%');

    const streakEl = el('stat-streak');
    if (streakEl) streakEl.classList.toggle('streak-hot', st.streak >= 3);
}

/* ---------------- Quiz ---------------- */

const EXAM_TARGET = 20;
const EXAM_MIN = 5;
let examLength = EXAM_TARGET;

function resetExamView() {
    examQuestions = [];
    examUserAnswers = [];
    examCurrentIdx = 0;
    examLength = EXAM_TARGET;
    setHidden('exam-start-card', false);
    setHidden('exam-playing-card', true);
    setHidden('exam-report-card', true);
}

/** Strips markup so two differently-worded-but-identical prompts collide. */
function promptKey(q) {
    return String(q.q).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function startExam() {
    playSound('fanfare');
    const pool = getPool(currentSubject);
    if (!pool) return;

    examQuestions = [];
    examUserAnswers = [];
    examCurrentIdx = 0;

    const keys = getActiveChapters(currentSubject);
    let usedSigs = appData.usedExamSignatures[currentSubject] || [];
    const usedSet = new Set(usedSigs);
    const paperSet = new Set();
    // Two prompts with the same wording look like a mistake, even when the
    // options differ — so a paper never repeats a question's wording.
    const promptSet = new Set();
    // Spread the paper across chapters instead of drawing every question at random.
    const rotation = shuffleArr(keys);

    const fresh = (c) => !paperSet.has(c.signature) && !promptSet.has(promptKey(c)) && !usedSet.has(c.signature);
    const unique = (c) => !paperSet.has(c.signature) && !promptSet.has(promptKey(c));

    for (let i = 0; i < EXAM_TARGET; i++) {
        const preferredKey = rotation[i % rotation.length];
        let chosen = null;

        for (let attempt = 0; attempt < 40 && !chosen; attempt++) {
            const key = attempt < 20 ? preferredKey : keys[randInt(0, keys.length - 1)];
            const candidate = pool[key]();
            if (fresh(candidate)) chosen = candidate;
        }
        // Relax the "never seen in an earlier paper" rule once the bank is thin.
        for (let attempt = 0; attempt < 60 && !chosen; attempt++) {
            const candidate = pool[keys[randInt(0, keys.length - 1)]]();
            if (unique(candidate)) chosen = candidate;
        }
        // Genuinely nothing new left — stop rather than repeat a question.
        if (!chosen) break;

        paperSet.add(chosen.signature);
        promptSet.add(promptKey(chosen));
        usedSet.add(chosen.signature);
        examQuestions.push(chosen);
        examUserAnswers.push(null);
    }

    usedSigs = Array.from(usedSet);
    if (usedSigs.length > 600) usedSigs = usedSigs.slice(-300);
    appData.usedExamSignatures[currentSubject] = usedSigs;
    saveAppData();

    examLength = examQuestions.length;
    if (examLength < EXAM_MIN) {
        // Too few chapters selected to build a paper at all.
        showFeedback('Pick a few more chapters to build a test 📚', false);
        resetExamView();
        openChapterModal();
        return;
    }

    setText('exam-total', examLength);
    setHidden('exam-start-card', true);
    setHidden('exam-report-card', true);
    setHidden('exam-playing-card', false);

    trackEvent('quiz_start', { subject: currentSubject });
    renderExamQuestion();
}

const EXAM_OPT_IDLE = "opt-btn p-4 rounded-2xl border-4 border-slate-200 bg-white hover:bg-sky-50 hover:border-sky-300 font-medium text-slate-800 text-left block-3d";
const EXAM_OPT_PICKED = "opt-btn p-4 rounded-2xl border-4 border-violet-500 bg-violet-100 text-violet-900 font-bold text-left block-3d";

function paintExamSelection() {
    const optionsBox = el('exam-q-options');
    if (!optionsBox) return;
    const picked = examUserAnswers[examCurrentIdx];
    Array.from(optionsBox.children).forEach(btn => {
        const isPicked = picked !== null && btn.dataset.optVal === String(picked);
        btn.className = isPicked ? EXAM_OPT_PICKED : EXAM_OPT_IDLE;
        const letter = btn.querySelector('.opt-letter');
        if (letter) letter.style.color = isPicked ? '#7c3aed' : '#94a3b8';
    });

    const nextBtn = el('exam-next-btn');
    if (nextBtn && examCurrentIdx === examLength - 1) {
        let answered = 0;
        for (let i = 0; i < examUserAnswers.length; i++) if (examUserAnswers[i] !== null) answered++;
        nextBtn.innerText = `Submit Quiz (${answered}/${examLength}) 🏁`;
    }
}

function renderExamQuestion() {
    const q = examQuestions[examCurrentIdx];
    if (!q) return;

    setText('exam-q-num', examCurrentIdx + 1);
    const pBar = el('exam-progress-bar');
    if (pBar) pBar.style.width = `${((examCurrentIdx + 1) / examLength) * 100}%`;
    setText('exam-q-badge', q.badge);
    const qText = el('exam-q-text');
    if (qText) qText.innerHTML = q.q;

    const visualBox = el('exam-q-visual');
    if (visualBox) {
        visualBox.innerHTML = q.visualSVG || '';
        visualBox.classList.toggle('hidden', !q.visualSVG);
    }

    const optionsBox = el('exam-q-options');
    if (optionsBox) {
        const frag = document.createDocumentFragment();
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = EXAM_OPT_IDLE;
            btn.dataset.optVal = String(opt);
            btn.innerHTML = `<span class="opt-letter">${'ABCD'[idx] || (idx + 1)}</span><span>${opt}</span>`;
            frag.appendChild(btn);
        });
        optionsBox.replaceChildren(frag);
    }

    const prevBtn = el('exam-prev-btn');
    if (prevBtn) prevBtn.disabled = examCurrentIdx === 0;
    const nextBtn = el('exam-next-btn');
    if (nextBtn) nextBtn.innerText = examCurrentIdx === examLength - 1 ? 'Submit Quiz 🏁' : 'Next →';

    paintExamSelection();
}

function navigateExam(dir) {
    playSound('click');
    if (examCurrentIdx === examLength - 1 && dir === 1) {
        submitExam();
        return;
    }
    examCurrentIdx = Math.max(0, Math.min(examLength - 1, examCurrentIdx + dir));
    renderExamQuestion();
}

function submitExam() {
    playSound('fanfare');
    let correctCount = 0;
    const reviewRows = [];

    examQuestions.forEach((q, idx) => {
        const userAns = examUserAnswers[idx];
        const isCorrect = userAns !== null && String(userAns) === String(q.ans);
        if (isCorrect) correctCount++;

        reviewRows.push(`
            <div class="rounded-2xl border p-3 text-left text-xs space-y-1 ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'}">
                <div class="font-black">Q${idx + 1}. ${q.q}</div>
                <div>Your answer: <strong>${userAns === null ? 'Not answered' : userAns}</strong> ${isCorrect ? '✓' : '✕'}</div>
                ${isCorrect ? '' : `<div class="font-black text-emerald-800">Correct answer: ${q.ans}</div>`}
                <div class="opacity-90 pt-1 border-t border-current/20">${q.exp}</div>
                ${isCorrect ? '' : `<div class="opacity-80">💡 ${q.hint}</div>`}
            </div>
        `);
    });

    const reviewList = el('exam-review-list');
    if (reviewList) reviewList.innerHTML = reviewRows.join('');

    const pct = Math.round((correctCount / examLength) * 100);
    const wrongCount = examLength - correctCount;

    setText('report-correct-count', correctCount);
    setText('report-wrong-count', wrongCount);
    setText('report-pct', pct + '%');

    let grade = '⭐⭐⭐⭐⭐';
    let feedback = 'Amazing! You are a Class 3 superstar!';
    if (pct < 40) {
        grade = '⭐';
        feedback = 'Good try! Practise a little more and try again — you can do it! 💪';
    } else if (pct < 60) {
        grade = '⭐⭐';
        feedback = 'Nice effort! Read the answers below and have another go.';
    } else if (pct < 75) {
        grade = '⭐⭐⭐';
        feedback = 'Well done! Just a few more to get right.';
    } else if (pct < 90) {
        grade = '⭐⭐⭐⭐';
        feedback = 'Excellent! You are so close to full marks!';
    }

    const elGrade = el('report-grade');
    if (elGrade) elGrade.innerText = grade;
    const elFeed = el('report-feedback');
    if (elFeed) elFeed.innerText = feedback;

    const st = appData.stats[currentSubject];
    st.total += examLength;
    st.score += correctCount;
    st.wrong = (st.wrong || 0) + wrongCount;

    appData.quizHistory.push({
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        subject: currentSubject,
        subjectName: subjectConfigs[currentSubject].shortName,
        correct: correctCount,
        total: examLength,
        percentage: pct,
        grade: grade
    });
    if (appData.quizHistory.length > 50) {
        appData.quizHistory = appData.quizHistory.slice(-50);
    }
    saveAppData();
    updateStats();

    trackEvent('quiz_submit', { subject: currentSubject, correct: correctCount, percentage: pct, grade: grade });

    const ePlaying = el('exam-playing-card');
    const eReport = el('exam-report-card');
    if (ePlaying) ePlaying.classList.add('hidden');
    if (eReport) eReport.classList.remove('hidden');
    if (eReport) eReport.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (pct >= 60) burstConfetti(90);
}

/* ---------------- Interactive labs ---------------- */

let wbState = { h: 0, t: 0, o: 0 };

function addBlock(val) {
    playSound('click');
    if (val === 100 && wbState.h < 9) wbState.h++;
    if (val === 10 && wbState.t < 9) wbState.t++;
    if (val === 1 && wbState.o < 9) wbState.o++;
    updateWb();
}

function resetBlocks() {
    playSound('click');
    wbState = { h: 0, t: 0, o: 0 };
    updateWb();
}

function updateWb() {
    const total = wbState.h * 100 + wbState.t * 10 + wbState.o;
    const elTotal = el('wb-total');
    if (elTotal) elTotal.innerText = total;
    const elExp = el('wb-expansion');
    if (elExp) elExp.innerText = `${total} = ${wbState.h} Hundreds (${wbState.h * 100}) + ${wbState.t} Tens (${wbState.t * 10}) + ${wbState.o} Ones (${wbState.o})`;

    const container = el('wb-display');
    if (!container) return;
    if (total === 0) {
        container.innerHTML = `<span class="text-xs text-slate-400 font-medium">Click buttons above to add blocks here!</span>`;
        return;
    }
    let html = '';
    for (let i = 0; i < wbState.h; i++) html += `<div class="bg-indigo-600 text-white p-3 rounded-xl font-black text-xs shadow">100 Flat</div>`;
    for (let i = 0; i < wbState.t; i++) html += `<div class="bg-emerald-600 text-white py-3 px-2 rounded-xl font-black text-xs shadow">10 Rod</div>`;
    for (let i = 0; i < wbState.o; i++) html += `<div class="bg-amber-500 text-white p-2 rounded-lg font-black text-xs shadow">1</div>`;
    container.innerHTML = html;
}

const IRREGULAR_PAST = {
    go: 'went', eat: 'ate', see: 'saw', run: 'ran', write: 'wrote', come: 'came',
    take: 'took', make: 'made', buy: 'bought', teach: 'taught', think: 'thought',
    bring: 'brought', catch: 'caught', drink: 'drank', sing: 'sang', swim: 'swam',
    sit: 'sat', stand: 'stood', give: 'gave', speak: 'spoke', break: 'broke',
    do: 'did', have: 'had', say: 'said', read: 'read', sleep: 'slept', find: 'found'
};
const IRREGULAR_PLURAL = {
    child: 'children', man: 'men', woman: 'women', foot: 'feet', tooth: 'teeth',
    mouse: 'mice', goose: 'geese', person: 'people', ox: 'oxen', leaf: 'leaves',
    knife: 'knives', wife: 'wives', life: 'lives', thief: 'thieves'
};

function pastTenseOf(word) {
    if (IRREGULAR_PAST[word]) return IRREGULAR_PAST[word];
    if (/[^aeiou]y$/.test(word)) return word.slice(0, -1) + 'ied';
    if (word.endsWith('e')) return word + 'd';
    if (/^[a-z]*[aeiou][bcdfgklmnprstvz]$/.test(word) && word.length <= 5) return word + word.slice(-1) + 'ed';
    return word + 'ed';
}

function pluralOf(word) {
    if (IRREGULAR_PLURAL[word]) return IRREGULAR_PLURAL[word];
    if (/[^aeiou]y$/.test(word)) return word.slice(0, -1) + 'ies';
    if (/(s|sh|ch|x|z)$/.test(word)) return word + 'es';
    return word + 's';
}

function ingFormOf(word) {
    if (word.endsWith('ie')) return word.slice(0, -2) + 'ying';
    if (word.endsWith('e') && !word.endsWith('ee')) return word.slice(0, -1) + 'ing';
    if (/^[a-z]*[aeiou][bcdfgklmnprstvz]$/.test(word) && word.length <= 5) return word + word.slice(-1) + 'ing';
    return word + 'ing';
}

function countSyllables(word) {
    const groups = word.toLowerCase().replace(/e$/, '').match(/[aeiouy]+/g);
    return Math.max(1, groups ? groups.length : 1);
}

function analyzeEnglishWord() {
    playSound('click');
    const inputEl = el('eng-word-input');
    const raw = inputEl ? inputEl.value.trim().toLowerCase() : '';
    const box = el('eng-word-output');
    if (!box) return;

    if (!raw) {
        box.innerText = 'Please type a word first!';
        return;
    }
    if (!/^[a-z]+$/.test(raw)) {
        box.innerText = 'Please type a single English word using letters only.';
        return;
    }

    const safe = escapeHtml(raw);
    const vowels = (raw.match(/[aeiou]/g) || []).length;
    const consonants = raw.length - vowels;

    box.innerHTML = `
        <div class="text-xl font-black text-slate-800 mb-2">Word Inspection: "${safe}"</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left max-w-2xl mx-auto mt-4">
            <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div class="text-xs font-bold text-slate-400 uppercase">Past Tense</div>
                <div class="text-base font-bold text-sky-600">${escapeHtml(pastTenseOf(raw))}</div>
            </div>
            <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div class="text-xs font-bold text-slate-400 uppercase">Plural Form</div>
                <div class="text-base font-bold text-sky-600">${escapeHtml(pluralOf(raw))}</div>
            </div>
            <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div class="text-xs font-bold text-slate-400 uppercase">Continuous (-ing)</div>
                <div class="text-base font-bold text-sky-600">${escapeHtml(ingFormOf(raw))}</div>
            </div>
            <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div class="text-xs font-bold text-slate-400 uppercase">Letters</div>
                <div class="text-base font-bold text-indigo-600">${raw.length}</div>
            </div>
            <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div class="text-xs font-bold text-slate-400 uppercase">Vowels / Consonants</div>
                <div class="text-base font-bold text-emerald-600">${vowels} V / ${consonants} C</div>
            </div>
            <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div class="text-xs font-bold text-slate-400 uppercase">Syllable Beats</div>
                <div class="text-base font-bold text-amber-600">${countSyllables(raw)}</div>
            </div>
        </div>
        <p class="text-[11px] text-slate-400 mt-3">Plural and tense forms follow the common rules — a few English words are irregular exceptions.</p>
    `;
}

function runEvsLab(topic) {
    playSound('click');
    const box = el('evs-lab-output');
    if (!box) return;

    const labs = {
        plant: `
            <div class="text-xl font-black text-slate-800 mb-2">🌱 Plant Anatomy STEAM Lab</div>
            <div class="text-3xl my-3">🌺 ➔ 🍃 ➔ 🪵 ➔ 🌿</div>
            <div class="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                <strong>Roots</strong> absorb water and hold the plant. <strong>Stems</strong> carry water upward.
                <strong>Leaves</strong> make food using sunlight (photosynthesis) and release oxygen.
                <strong>Flowers</strong> make seeds so new plants can grow.
            </div>`,
        ecosystem: `
            <div class="text-xl font-black text-slate-800 mb-2">🐝 Ecosystem Interdependence Lab</div>
            <div class="text-3xl my-3">🌿 ➔ 🦗 ➔ 🐸 ➔ 🐍</div>
            <div class="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Every food chain starts with a green plant. Bees pollinate flowers so fruits can form,
                earthworms loosen the soil, and trees give the oxygen we breathe.
            </div>`,
        festivals: `
            <div class="text-xl font-black text-slate-800 mb-2">🪔 Festival Science & Light Lab</div>
            <div class="text-3xl my-3">🪔 ✨ 🌾 🎇</div>
            <div class="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                A clay diya works by <strong>capillary action</strong> — oil climbs up the cotton wick and burns steadily.
                Harvest festivals such as Pongal, Baisakhi, Onam and Bihu thank nature for a good crop.
            </div>`,
        harmony: `
            <div class="text-xl font-black text-slate-800 mb-2">🕊️ Eco-Harmony & Bird Care Lab</div>
            <div class="text-3xl my-3">🥣 🕊️ 🌳 ♻️</div>
            <div class="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                A shallow bowl of water saves birds in summer. Sort waste into the
                <strong>green bin</strong> (wet) and <strong>blue bin</strong> (dry) and remember the 3 Rs —
                Reduce, Reuse, Recycle.
            </div>`
    };

    box.innerHTML = labs[topic] || labs.plant;
}

/* ---------------- Boot ---------------- */

/** One listener per option grid instead of one per button. */
function wireOptionDelegation() {
    const practiceBox = el('q-options');
    if (practiceBox) {
        practiceBox.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (btn && practiceBox.contains(btn) && !btn.disabled) checkPracticeAnswer(btn);
        });
    }

    const examBox = el('exam-q-options');
    if (examBox) {
        examBox.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn || !examBox.contains(btn)) return;
            playSound('click');
            const q = examQuestions[examCurrentIdx];
            if (!q) return;
            // Store the original option value, not the button's text.
            examUserAnswers[examCurrentIdx] = q.options.find(o => String(o) === btn.dataset.optVal);
            paintExamSelection();
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadAppData();
    applySoundUI();
    wireOptionDelegation();
    showPortal();
    if (!appData.hasSeenWelcome || !appData.studentName) {
        openWelcomeNameModal();
    }
    if (window.ClassThreeBank && window.HubAnalytics) {
        window.HubAnalytics.setName(appData.studentName || '');
    }
});

function openPrivacyModal() {
    playSound('click');
    // The "sent to the teacher" paragraph only applies once a backend is configured.
    const usesServer = !!(window.HubConfig && (window.HubConfig.ENDPOINT || window.HubConfig.FIREBASE_URL));
    setHidden('privacy-server-note', !usesServer);
    setHidden('modal-privacy', false);
}

function closePrivacyModal() {
    playSound('click');
    setHidden('modal-privacy', true);
}

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    ['modal-settings', 'modal-confirm-reset', 'modal-chapters', 'modal-privacy'].forEach(id => {
        const m = el(id);
        if (m && !m.classList.contains('hidden')) m.classList.add('hidden');
    });
});

// Divs marked up as buttons still need to answer Enter and Space.
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const target = e.target.closest('[role="button"]');
    if (!target || target.tagName === 'BUTTON') return;
    e.preventDefault();
    target.click();
});
