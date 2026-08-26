/**
 * Class 3 Learning Hub — analytics backend (Google Apps Script)
 * ==================================================================
 * SETUP
 *  1. Create a new Google Sheet (this is where the data will live).
 *  2. Extensions ▸ Apps Script. Delete the sample code and paste this file.
 *  3. Change SECRET below to a long private passphrase of your own.
 *  4. Deploy ▸ New deployment ▸ Web app
 *        Description   : Class 3 Hub Analytics
 *        Execute as    : Me
 *        Who has access: Anyone
 *  5. Copy the deployment URL (it ends with /exec).
 *  6. Paste that URL into:
 *        analytics.js   ->  CONFIG.ENDPOINT
 *        analytics.html ->  DEFAULT_ENDPOINT
 *  7. Open analytics.html and enter the same SECRET as the passphrase.
 *
 * NOTE: whenever you edit this script you must deploy a NEW VERSION
 * (Deploy ▸ Manage deployments ▸ edit ▸ Version: New version).
 */

// >>> CHANGE THIS <<<
var SECRET = 'class3hub-analytics-very-strong-secret-2026';

var SHEET_NAME = 'events';
var PROGRESS_SHEET_NAME = 'progress';
var HEADERS = [
  'ts', 'visitorId', 'sessionId', 'name', 'event', 'subject', 'topic',
  'correct', 'score', 'ip', 'city', 'region', 'country', 'isp',
  'browser', 'os', 'deviceType', 'screen', 'language', 'timezone',
  'page', 'referrer', 'detail'
];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj, callback) {
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(obj) + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getProgressSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(PROGRESS_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(PROGRESS_SHEET_NAME);
    sheet.appendRow(['ts', 'studentName', 'visitorId', 'payload']);
    sheet.setFrozenRows(1);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['ts', 'studentName', 'visitorId', 'payload']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Receives batched events from analytics.js */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || '{}');

    if (body.type === 'progress') {
      if (body.secret !== SECRET) {
        return json_({ ok: false, error: 'Unauthorised' });
      }
      var progressSheet = getProgressSheet_();
      progressSheet.appendRow([
        new Date(),
        body.studentName || '',
        body.visitorId || '',
        JSON.stringify(body.data || {})
      ]);
      return json_({ ok: true, written: 1, type: 'progress' });
    }

    var rows = body.rows || [];
    if (!rows.length) return json_({ ok: true, written: 0 });

    var sheet = getSheet_();
    var values = rows.map(function (r) {
      return HEADERS.map(function (h) {
        var v = r[h];
        return v === undefined || v === null ? '' : v;
      });
    });

    sheet.getRange(sheet.getLastRow() + 1, 1, values.length, HEADERS.length).setValues(values);
    return json_({ ok: true, written: values.length });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/**
 * Admin read API.
 *   ?key=SECRET&action=list&limit=2000[&callback=fn]
 * The secret is checked here on the server, so the raw data is never
 * readable without it.
 */
function doGet(e) {
  var p = e.parameter || {};
  var callback = p.callback;

  if (p.key !== SECRET) {
    return json_({ ok: false, error: 'Unauthorised' }, callback);
  }

  if (p.type === 'progress') {
    var progressSheet = getProgressSheet_();
    var progressLastRow = progressSheet.getLastRow();
    if (progressLastRow < 2) return json_({ ok: true, rows: [] }, callback);

    var progressValues = progressSheet.getRange(2, 1, progressLastRow - 1, 4).getValues();
    var progressRows = progressValues.map(function (row) {
      return {
        ts: row[0] instanceof Date ? row[0].toISOString() : row[0],
        studentName: row[1],
        visitorId: row[2],
        payload: row[3]
      };
    });

    var filtered = progressRows.filter(function (row) {
      if (p.visitorId && row.visitorId && row.visitorId !== p.visitorId) return false;
      if (p.studentName && row.studentName && row.studentName !== p.studentName) return false;
      return true;
    });

    var limit = Math.min(parseInt(p.limit, 10) || 20, 100);
    var limited = filtered.slice(-limit);
    return json_({ ok: true, rows: limited }, callback);
  }

  var sheet = getSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return json_({ ok: true, headers: HEADERS, rows: [] }, callback);

  var limit = Math.min(parseInt(p.limit, 10) || 3000, 20000);
  var start = Math.max(2, lastRow - limit + 1);
  var values = sheet.getRange(start, 1, lastRow - start + 1, HEADERS.length).getValues();

  var rows = values.map(function (row) {
    var o = {};
    HEADERS.forEach(function (h, i) {
      o[h] = row[i] instanceof Date ? row[i].toISOString() : row[i];
    });
    return o;
  });

  return json_({ ok: true, headers: HEADERS, rows: rows, total: lastRow - 1 }, callback);
}
