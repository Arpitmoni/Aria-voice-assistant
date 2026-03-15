// ═══════════════════════════════════════════
//  ARIA APP — Main logic
// ═══════════════════════════════════════════

// ── SERVICE WORKER ──
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// ── SPEECH RECOGNITION ──
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = null, isListening = false;

// ── STATE ──
let voiceOn = true;
let hCount  = 0;
let pendingURL = null;
let reminderTimers = [];

// ── ELEMENTS ──
const orbWrap   = document.getElementById('orbWrap');
const orbIcon   = document.getElementById('orbIcon');
const waveform  = document.getElementById('waveform');
const statusLbl = document.getElementById('statusLbl');
const sysStatus = document.getElementById('sysStatus');
const tcontent  = document.getElementById('tcontent');
const tbox      = document.getElementById('tbox');
const actionArea= document.getElementById('actionArea');
const tinput    = document.getElementById('tinput');
const hdots     = document.getElementById('hdots');
const vIcon     = document.getElementById('vIcon');
const noMicMsg  = document.getElementById('noMicMsg');

// ── SETUP RECOGNITION ──
if (SR) {
  recog = new SR();
  recog.continuous     = false;
  recog.interimResults = true;
  recog.lang           = 'en-IN';

  recog.onstart = () => {
    isListening = true;
    setOrb('listening');
    setStatus('LISTENING...', 'listening');
    document.getElementById('tapHint').textContent = 'Speak now... tap orb to stop';
  };

  recog.onresult = (e) => {
    let interim = '', final = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) final  += e.results[i][0].transcript;
      else                       interim += e.results[i][0].transcript;
    }
    if (interim) showUser('🎙️ ' + interim + '...');
    if (final)   { showUser('🎙️ ' + final); recog.stop(); handle(final); }
  };

  recog.onerror = (e) => {
    isListening = false;
    if (e.error === 'not-allowed' || e.error === 'denied') {
      noMicMsg.style.display = 'block';
      speakOut("Microphone access denied. Please type your command.");
    }
    setOrb('idle'); setStatus('TAP ORB TO SPEAK', '');
  };

  recog.onend = () => {
    isListening = false;
    if (orbWrap.classList.contains('listening')) {
      setOrb('idle'); setStatus('TAP ORB TO SPEAK', '');
    }
  };
} else {
  noMicMsg.style.display = 'block';
}

// ── START LISTENING ──
window.startListening = function () {
  if (isListening) { recog && recog.stop(); return; }
  if (!SR)         { tinput.focus(); return; }
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  clearActionArea();
  try { recog.start(); } catch (e) {}
};

// ── HANDLE COMMAND ──
window.cmd = function (text) {
  tinput.value = '';
  showUser('⌨️ ' + text);
  handle(text);
};

window.sendTyped = function () {
  const v = tinput.value.trim();
  if (!v) return;
  tinput.value = '';
  showUser('⌨️ ' + v);
  handle(v);
};

window.handleKey = function (e) { if (e.key === 'Enter') window.sendTyped(); };

function handle(text) {
  addDot();
  setOrb('thinking');
  setStatus('PROCESSING...', 'thinking');
  clearActionArea();

  setTimeout(() => {
    const result = window.ARIA_BRAIN.process(text);
    showAria(result.reply);
    handleAction(result.action || null, result.extra || null);

    if (voiceOn) {
      speakOut(result.reply, () => {
        setOrb('idle');
        setStatus('TAP ORB TO SPEAK', '');
      });
    } else {
      setOrb('idle');
      setStatus('TAP ORB TO SPEAK', '');
    }
  }, 400);
}

// ── HANDLE ACTION ──
function handleAction(action, extra) {
  if (!action) return;

  if (action.type === 'open') {
    // Create big tap button
    const btn = document.createElement('a');
    btn.className   = 'open-btn';
    btn.href        = action.url;
    btn.target      = '_blank';
    btn.rel         = 'noopener noreferrer';
    btn.textContent = action.label;
    actionArea.appendChild(btn);

    // Show tip
    const tip = document.createElement('div');
    tip.className   = 'open-tip';
    tip.textContent = '👆 Tap the button above to open';
    actionArea.appendChild(tip);

  } else if (action.type === 'email') {
    // Pre-fill email modal
    document.getElementById('eTo').value    = action.to    || '';
    document.getElementById('eSubj').value  = action.subject || '';
    document.getElementById('eBody').value  = action.body   || '';
    // Show open email button
    const btn = document.createElement('button');
    btn.className   = 'open-btn';
    btn.textContent = action.label;
    btn.onclick     = () => openModal('emailModal');
    actionArea.appendChild(btn);

  } else if (action.type === 'reminder') {
    showNotif('⏰', 'Reminder Set!', `"${action.message}" at ${action.time}`);
    // Schedule browser notification if permission granted
    scheduleReminder(action.message, action.time);
  }

  // Extra handling
  if (extra && extra.type === 'whatsapp_msg') {
    const note = document.createElement('div');
    note.className = 'whatsapp-note';
    note.innerHTML = `<strong>Message to send to ${extra.to}:</strong><br>"${extra.msg}"<br><small>Copy this and paste in WhatsApp Web</small>`;
    actionArea.appendChild(note);
  }
}

function clearActionArea() {
  actionArea.innerHTML = '';
}

// ── REMINDERS ──
function scheduleReminder(msg, timeStr) {
  if (!('Notification' in window)) return;
  Notification.requestPermission().then(perm => {
    if (perm !== 'granted') return;
    // Try to parse time
    const now = new Date();
    let target = null;
    const match = timeStr.match(/(\d{1,2})[.:](\d{2})\s*(am|pm)?/i);
    if (match) {
      let h = parseInt(match[1]), m = parseInt(match[2]);
      const ampm = match[3];
      if (ampm && ampm.toLowerCase() === 'pm' && h < 12) h += 12;
      if (ampm && ampm.toLowerCase() === 'am' && h === 12) h = 0;
      target = new Date(now);
      target.setHours(h, m, 0, 0);
      if (target <= now) target.setDate(target.getDate() + 1);
    }
    if (target) {
      const delay = target - now;
      const t = setTimeout(() => {
        new Notification('ARIA Reminder ⏰', { body: msg, icon: './icons/icon-192.png' });
      }, delay);
      reminderTimers.push(t);
    }
  });
}

// ── SPEAK ──
function speakOut(text, cb) {
  if (!window.speechSynthesis) { cb && cb(); return; }
  window.speechSynthesis.cancel();
  setOrb('speaking');
  setStatus('SPEAKING...', 'speaking');

  const clean = text.replace(/[*_#`~\[\]]/g, '').replace(/\s+/g, ' ').trim();
  const u = new SpeechSynthesisUtterance(clean);
  u.lang   = 'en-IN';
  u.rate   = 1.0;
  u.pitch  = 1.05;
  u.volume = 1;

  // Pick best voice
  const voices  = window.speechSynthesis.getVoices();
  const best    = voices.find(v => v.lang === 'en-IN') ||
                  voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
                  voices.find(v => v.lang.startsWith('en'));
  if (best) u.voice = best;

  u.onend  = () => cb && cb();
  u.onerror= () => cb && cb();
  window.speechSynthesis.speak(u);
}

// ── ORB STATE ──
function setOrb(state) {
  orbWrap.className = 'orb-wrap' + (state !== 'idle' ? ' ' + state : '');
  orbIcon.textContent = { idle: '🤖', listening: '👂', thinking: '💭', speaking: '🗣️' }[state] || '🤖';
  const cls = (state === 'listening' || state === 'speaking') ? 'waveform active ' + state : 'waveform';
  waveform.className = cls;
}

function setStatus(text, cls) {
  statusLbl.textContent = text;
  statusLbl.className   = 'status-lbl' + (cls ? ' ' + cls : '');
  sysStatus.textContent = text;
}

// ── DISPLAY ──
function showUser(text) {
  tbox.classList.remove('aria-on');
  tcontent.innerHTML = `<div class="tuser">YOU › ${text.replace(/</g,'&lt;')}</div><div class="taria processing">Processing…</div>`;
}

function showAria(text) {
  const u = tcontent.querySelector('.tuser');
  tcontent.innerHTML = (u ? u.outerHTML : '') + `<div class="taria">${text.replace(/</g,'&lt;')}</div>`;
  tbox.classList.add('aria-on');
  tbox.scrollTop = 9999;
}

// ── HISTORY DOTS ──
function addDot() {
  hCount = Math.min(hCount + 1, 10);
  hdots.innerHTML = '';
  for (let i = 0; i < hCount; i++) {
    const d = document.createElement('div');
    d.className = 'hd' + (i === hCount - 1 ? ' active' : '');
    hdots.appendChild(d);
  }
}

// ── VOICE TOGGLE ──
window.toggleVoice = function () {
  voiceOn = !voiceOn;
  if (!voiceOn && window.speechSynthesis) window.speechSynthesis.cancel();
  vIcon.textContent = voiceOn ? '🔊' : '🔇';
  showNotif(voiceOn ? '🔊' : '🔇', voiceOn ? 'Voice ON' : 'Voice OFF',
    voiceOn ? 'ARIA will speak responses' : 'Silent mode enabled');
};

// ── MODAL ──
window.openModal  = id => document.getElementById(id).classList.add('open');
window.closeModal = id => document.getElementById(id).classList.remove('open');

document.querySelectorAll('.moverlay').forEach(o =>
  o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); })
);

window.doEmail = function () {
  const to   = document.getElementById('eTo').value.trim();
  const subj = document.getElementById('eSubj').value.trim();
  const body = document.getElementById('eBody').value.trim();
  if (!to) { alert('Please enter a recipient email address.'); return; }
  window.open(`mailto:${to}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`, '_blank');
  closeModal('emailModal');
  showNotif('📧', 'Email Opened!', `Draft ready for ${to}`);
  showAria(`Email opened in your mail app, ready to send to ${to}!`);
  if (voiceOn) speakOut(`Email opened! Ready to send to ${to}.`);
};

window.doTicket = function () {
  const type  = document.getElementById('tType').value;
  const route = document.getElementById('tRoute').value;
  const map = {
    '✈️ Flight': 'https://www.makemytrip.com/flights/',
    '🚆 Train':  'https://www.irctc.co.in/',
    '🚌 Bus':    'https://www.redbus.in/',
    '🎬 Movie':  'https://in.bookmyshow.com/',
    '🎵 Concert':'https://in.bookmyshow.com/',
  };
  window.open(map[type] || 'https://www.makemytrip.com', '_blank');
  closeModal('ticketModal');
  showNotif('🎫', 'Booking Site Opened!', `${type} — ${route || 'your journey'}`);
};

// ── NOTIFICATIONS ──
window.showNotif = function (icon, title, sub) {
  const existing = document.querySelector('.notif');
  if (existing) existing.remove();
  const n = document.createElement('div');
  n.className = 'notif';
  n.innerHTML = `<span class="ni">${icon}</span><div class="nt"><div class="nt-title">${title}</div><div class="nt-sub">${sub}</div></div>`;
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 4500);
};

// ── INIT ──
window.addEventListener('load', () => {
  // Load voices (some browsers need a delay)
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }

  // Handle URL shortcut params
  const params = new URLSearchParams(window.location.search);
  const urlCmd = params.get('cmd');

  setTimeout(() => {
    const greeting = "Hello Arpit! I'm ARIA, your personal voice assistant. Tap the orb and tell me what you need!";
    showAria(greeting);
    if (voiceOn && window.speechSynthesis) speakOut(greeting);
    showNotif('🤖', 'ARIA is ready!', 'Tap the orb to speak');

    if (urlCmd) {
      setTimeout(() => { showUser('⌨️ ' + urlCmd); handle(urlCmd); }, 2000);
    }
  }, 800);

  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    setTimeout(() => Notification.requestPermission(), 3000);
  }
});
