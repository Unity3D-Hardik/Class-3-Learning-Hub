/*
 * Class 3 Learning Hub — one place to configure the shared backend.
 * ------------------------------------------------------------------
 * Every learner's browser sends its events to this single URL, so all
 * usage from every device lands in ONE Google Sheet. That is what makes
 * the analytics centralised — nothing else needs to change.
 *
 * Fill in ENDPOINT once and it applies to index.html, class_3_learning.html
 * and analytics.html.
 */
window.HubConfig = {
    // "apps-script" (Google Sheet) or "firebase" (Realtime Database).
    PROVIDER: 'apps-script',

    // Apps Script Web App URL, ending in /exec — see apps-script/Code.gs
    ENDPOINT: '',

    // Only used when PROVIDER is "firebase".
    // Example: https://my-project-default-rtdb.asia-southeast1.firebasedatabase.app
    FIREBASE_URL: '',

    APP_ID: 'class3-hub',

    // Set false to stop collecting IP address and approximate location.
    LOOKUP_IP: true
};
