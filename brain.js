// ═══════════════════════════════════════════════════════
//  ARIA BRAIN — Smart command processing, no API needed
// ═══════════════════════════════════════════════════════

window.ARIA_BRAIN = (function () {

  // ── SITE DIRECTORY ──
  const SITES = {
    youtube:    { url: 'https://www.youtube.com',        label: 'YouTube',      emoji: '▶️' },
    google:     { url: 'https://www.google.com',         label: 'Google',       emoji: '🔍' },
    gmail:      { url: 'https://mail.google.com',        label: 'Gmail',        emoji: '📧' },
    whatsapp:   { url: 'https://web.whatsapp.com',       label: 'WhatsApp',     emoji: '💬' },
    facebook:   { url: 'https://www.facebook.com',       label: 'Facebook',     emoji: '👤' },
    instagram:  { url: 'https://www.instagram.com',      label: 'Instagram',    emoji: '📸' },
    twitter:    { url: 'https://twitter.com',            label: 'Twitter/X',    emoji: '🐦' },
    netflix:    { url: 'https://www.netflix.com',        label: 'Netflix',      emoji: '🎬' },
    hotstar:    { url: 'https://www.hotstar.com',        label: 'Hotstar',      emoji: '⭐' },
    prime:      { url: 'https://www.primevideo.com',     label: 'Prime Video',  emoji: '🎥' },
    amazon:     { url: 'https://www.amazon.in',          label: 'Amazon',       emoji: '🛒' },
    flipkart:   { url: 'https://www.flipkart.com',       label: 'Flipkart',     emoji: '🛍️' },
    maps:       { url: 'https://maps.google.com',        label: 'Google Maps',  emoji: '📍' },
    spotify:    { url: 'https://open.spotify.com',       label: 'Spotify',      emoji: '🎵' },
    github:     { url: 'https://www.github.com',         label: 'GitHub',       emoji: '💻' },
    linkedin:   { url: 'https://www.linkedin.com',       label: 'LinkedIn',     emoji: '💼' },
    reddit:     { url: 'https://www.reddit.com',         label: 'Reddit',       emoji: '🤖' },
    news:       { url: 'https://news.google.com',        label: 'Google News',  emoji: '📰' },
    paypal:     { url: 'https://www.paypal.com',         label: 'PayPal',       emoji: '💳' },
    paytm:      { url: 'https://paytm.com',              label: 'Paytm',        emoji: '💰' },
    gpay:       { url: 'https://pay.google.com',         label: 'Google Pay',   emoji: '💸' },
    meet:       { url: 'https://meet.google.com',        label: 'Google Meet',  emoji: '📹' },
    zoom:       { url: 'https://zoom.us',                label: 'Zoom',         emoji: '📹' },
    drive:      { url: 'https://drive.google.com',       label: 'Google Drive', emoji: '☁️' },
    docs:       { url: 'https://docs.google.com',        label: 'Google Docs',  emoji: '📄' },
    sheets:     { url: 'https://sheets.google.com',      label: 'Google Sheets',emoji: '📊' },
    translate:  { url: 'https://translate.google.com',   label: 'Translate',    emoji: '🌐' },
    calculator: { url: 'https://www.google.com/search?q=calculator', label: 'Calculator', emoji: '🔢' },
    calendar:   { url: 'https://calendar.google.com',   label: 'Calendar',     emoji: '📅' },
    cricbuzz:   { url: 'https://www.cricbuzz.com',       label: 'Cricbuzz',     emoji: '🏏' },
    irctc:      { url: 'https://www.irctc.co.in',        label: 'IRCTC',        emoji: '🚆' },
    makemytrip: { url: 'https://www.makemytrip.com',     label: 'MakeMyTrip',   emoji: '✈️' },
    bookmyshow: { url: 'https://in.bookmyshow.com',      label: 'BookMyShow',   emoji: '🎟️' },
    swiggy:     { url: 'https://www.swiggy.com',         label: 'Swiggy',       emoji: '🍔' },
    zomato:     { url: 'https://www.zomato.com',         label: 'Zomato',       emoji: '🍕' },
    ola:        { url: 'https://www.olacabs.com',        label: 'Ola',          emoji: '🚗' },
    uber:       { url: 'https://www.uber.com',           label: 'Uber',         emoji: '🚖' },
  };

  // ── TICKET PLATFORMS ──
  const TICKET_PLATFORMS = {
    flight:  { name: 'MakeMyTrip', url: 'https://www.makemytrip.com/flights/' },
    train:   { name: 'IRCTC',      url: 'https://www.irctc.co.in/' },
    bus:     { name: 'RedBus',     url: 'https://www.redbus.in/' },
    movie:   { name: 'BookMyShow', url: 'https://in.bookmyshow.com/' },
    concert: { name: 'BookMyShow', url: 'https://in.bookmyshow.com/' },
    event:   { name: 'BookMyShow', url: 'https://in.bookmyshow.com/' },
  };

  // ── JOKES ──
  const JOKES = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "I asked ARIA for a joke. She said — you're already talking to one!",
    "What do you call a lazy kangaroo? A pouch potato!",
    "Why can't your nose be 12 inches long? Because then it would be a foot!",
  ];

  // ── GREETINGS ──
  const GREETS = [
    "Hello Arpit! How can I help you today?",
    "Hey Arpit! What can I do for you?",
    "Hi! Ready to help. What do you need?",
    "Good to hear from you, Arpit! What's up?",
  ];

  // ── MAIN PROCESS FUNCTION ──
  function process(raw) {
    const t = raw.toLowerCase().trim();

    // ── GREETING ──
    if (/^(hi|hello|hey|good morning|good evening|good night|howdy|what'?s up|sup|yo)\b/.test(t)) {
      return { reply: GREETS[Math.floor(Math.random() * GREETS.length)] };
    }

    // ── IDENTITY ──
    if (/your name|who are you|what are you|introduce/.test(t)) {
      return { reply: "I'm ARIA — your personal AI voice assistant built for Arpit! I can open apps, play music on YouTube, book tickets, write emails, search the web, give directions, set reminders, and much more. Just tell me what you need!" };
    }

    // ── HELP / CAPABILITIES ──
    if (/what can you do|help|capabilities|commands|features/.test(t)) {
      return { reply: "I can open any website or app, play any song on YouTube, write and send emails, book flight, train, bus or movie tickets, search Google, check weather, get directions, set reminders, tell the time, tell jokes, and answer your questions. Just ask me anything!" };
    }

    // ── TIME & DATE ──
    if (/what time|current time|time now|what.*date|today.*date|what day/.test(t)) {
      const now = new Date();
      const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      const date = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      return { reply: `It is ${time} right now. Today is ${date}.` };
    }

    // ── JOKE ──
    if (/joke|funny|laugh|make me laugh|humor/.test(t)) {
      return { reply: JOKES[Math.floor(Math.random() * JOKES.length)] };
    }

    // ── THANKS ──
    if (/^(thank|thanks|thank you|thx|ty|great|awesome|perfect|nice one|well done|good job)\b/.test(t)) {
      const r = ["You're welcome, Arpit! Always here for you.", "Happy to help!", "Anytime, Arpit!"];
      return { reply: r[Math.floor(Math.random() * r.length)] };
    }

    // ── PLAY MUSIC / VIDEO ──
    if (/\b(play|put on|listen to|i want to hear|stream)\b/.test(t)) {
      const song = raw
        .replace(/play|put on|listen to|i want to hear|stream|on youtube|for me|please|song|music|video/gi, '')
        .trim() || 'trending songs 2024';
      const q = encodeURIComponent(song + ' official');
      return {
        reply: `Playing "${song}" on YouTube for you right now! 🎵`,
        action: {
          type: 'open',
          label: `▶️ Play "${song}" on YouTube`,
          url: `https://www.youtube.com/results?search_query=${q}`,
          autoOpen: true
        }
      };
    }

    // ── SEARCH YOUTUBE ──
    if (/youtube.*search|search.*youtube|find.*youtube/.test(t)) {
      const q = encodeURIComponent(raw.replace(/youtube|search|find|on|for/gi, '').trim());
      return {
        reply: `Searching YouTube for you!`,
        action: { type: 'open', label: '▶️ Open YouTube Search', url: `https://www.youtube.com/results?search_query=${q}`, autoOpen: true }
      };
    }

    // ── OPEN SITE ──
    if (/\b(open|launch|go to|take me to|show me|start|load)\b/.test(t)) {
      // Match known sites
      for (const [key, site] of Object.entries(SITES)) {
        if (t.includes(key)) {
          return {
            reply: `Opening ${site.label} for you now, Arpit!`,
            action: { type: 'open', label: `${site.emoji} Open ${site.label}`, url: site.url, autoOpen: true }
          };
        }
      }
      // Unknown site — extract name
      const m = raw.match(/(?:open|launch|go to|load|start)\s+(.+)/i);
      if (m) {
        const name = m[1].trim();
        const q = encodeURIComponent(name);
        return {
          reply: `Searching for "${name}"!`,
          action: { type: 'open', label: `🔍 Search: ${name}`, url: `https://www.google.com/search?q=${q}`, autoOpen: true }
        };
      }
    }

    // ── EMAIL ──
    if (/\b(email|mail|write.*mail|send.*mail|compose|draft)\b/.test(t)) {
      const toM = raw.match(/to\s+([\w\s]+?)(?:\s+about|\s+regarding|\s+saying|\s+on\s|$)/i);
      const subM = raw.match(/(?:about|regarding|saying)\s+(.+)/i);
      const toName = toM ? toM[1].trim() : '';
      const subject = subM ? subM[1].trim() : 'Following up';
      const body = `Hi${toName ? ' ' + toName : ''},\n\nI hope you are doing well.\n\n[Your message here]\n\nBest regards,\nArpit`;
      return {
        reply: `I've drafted an email${toName ? ' to ' + toName : ''} for you. Review it and tap Send!`,
        action: {
          type: 'email',
          to: '',
          subject: subject,
          body: body,
          label: '✉️ Review & Send Email'
        }
      };
    }

    // ── WHATSAPP MESSAGE ──
    if (/whatsapp|send.*message|message.*to|chat|reply/.test(t)) {
      const toM = raw.match(/(?:to|message)\s+([\w\s]+?)(?:\s+saying|\s+that|\s+about|$)/i);
      const msgM = raw.match(/(?:saying|that|about)\s+(.+)/i);
      const to = toM ? toM[1].trim() : '';
      const msg = msgM ? msgM[1].trim() : '';
      if (to && msg) {
        const phone = '';
        const encoded = encodeURIComponent(msg);
        return {
          reply: `Opening WhatsApp to message ${to}. The message is pre-filled — just hit send!`,
          action: { type: 'open', label: `💬 Send WhatsApp to ${to}`, url: `https://web.whatsapp.com`, autoOpen: true },
          extra: { type: 'whatsapp_msg', to, msg }
        };
      }
      return {
        reply: "Opening WhatsApp Web for you!",
        action: { type: 'open', label: '💬 Open WhatsApp', url: 'https://web.whatsapp.com', autoOpen: true }
      };
    }

    // ── TICKETS ──
    if (/\b(book|ticket|flight|train|bus|movie|concert|show|irctc|makemytrip|bookmyshow)\b/.test(t)) {
      let platform = TICKET_PLATFORMS.flight;
      for (const [k, p] of Object.entries(TICKET_PLATFORMS)) {
        if (t.includes(k)) { platform = p; break; }
      }
      return {
        reply: `Opening ${platform.name} to book your ticket. Complete the booking on the site!`,
        action: { type: 'open', label: `🎫 Open ${platform.name}`, url: platform.url, autoOpen: true }
      };
    }

    // ── REMINDER / ALARM ──
    if (/\b(remind|reminder|alarm|alert|notify|don'?t forget|set.*timer|wake me)\b/.test(t)) {
      const timeM = raw.match(/(\d{1,2}[:.]\d{2}\s*(?:am|pm)?|\d{1,2}\s*(?:am|pm)|tomorrow|tonight|morning|evening|noon|midnight)/i);
      const msgM  = raw.match(/(?:to|about|for)\s+(.+?)(?:\s+at\s+|\s+tomorrow|$)/i);
      const time  = timeM ? timeM[0] : 'the set time';
      const msg   = msgM  ? msgM[1]  : 'your task';
      return {
        reply: `Got it! Reminder set for "${msg}" at ${time}. I'll alert you!`,
        action: { type: 'reminder', message: msg, time: time }
      };
    }

    // ── WEATHER ──
    if (/\b(weather|temperature|rain|forecast|hot|cold|humid|climate)\b/.test(t)) {
      const cityM = raw.match(/(?:in|at|for)\s+([\w\s]+?)(?:\s+today|\s+tomorrow|$)/i);
      const city  = cityM ? cityM[1].trim() : 'today';
      return {
        reply: `Getting the weather${cityM ? ' for ' + city : ''} for you!`,
        action: { type: 'open', label: '🌤️ Check Weather', url: `https://www.google.com/search?q=weather+${encodeURIComponent(city)}`, autoOpen: true }
      };
    }

    // ── DIRECTIONS / MAPS ──
    if (/\b(directions|navigate|how to reach|where is|location of|route to|take me to)\b/.test(t)) {
      const placeM = raw.match(/(?:to|for|reach|directions to|where is|navigate to)\s+(.+)/i);
      const place  = placeM ? placeM[1].trim() : '';
      return {
        reply: `Opening Google Maps${place ? ' for ' + place : ''}!`,
        action: { type: 'open', label: `📍 Maps: ${place || 'My Location'}`, url: `https://www.google.com/maps/search/${encodeURIComponent(place)}`, autoOpen: true }
      };
    }

    // ── CRICKET / SPORTS SCORE ──
    if (/\b(cricket|score|match|ipl|icc|t20|odi|football|sports|live.*score)\b/.test(t)) {
      const q = encodeURIComponent(raw.trim() + ' live score today');
      return {
        reply: "Getting the live score for you!",
        action: { type: 'open', label: '🏏 Live Score', url: `https://www.google.com/search?q=${q}`, autoOpen: true }
      };
    }

    // ── NEWS ──
    if (/\b(news|latest|headlines|today.*news|current events)\b/.test(t)) {
      const topicM = raw.match(/(?:about|on)\s+(.+)/i);
      const q = topicM ? encodeURIComponent(topicM[1] + ' news') : 'top+news+today';
      return {
        reply: "Opening the latest news for you!",
        action: { type: 'open', label: '📰 Latest News', url: `https://www.google.com/search?q=${q}`, autoOpen: true }
      };
    }

    // ── TRANSLATE ──
    if (/translat|convert.*language|what is .+ in/.test(t)) {
      return {
        reply: "Opening Google Translate for you!",
        action: { type: 'open', label: '🌐 Translate', url: 'https://translate.google.com', autoOpen: true }
      };
    }

    // ── FOOD ORDER ──
    if (/\b(order food|hungry|food|swiggy|zomato|delivery)\b/.test(t)) {
      const platform = t.includes('zomato') ? SITES.zomato : SITES.swiggy;
      return {
        reply: `Opening ${platform.label} to order food!`,
        action: { type: 'open', label: `${platform.emoji} Order on ${platform.label}`, url: platform.url, autoOpen: true }
      };
    }

    // ── RIDE / CAB ──
    if (/\b(cab|taxi|ride|ola|uber|book.*ride|book.*cab)\b/.test(t)) {
      const s = t.includes('uber') ? SITES.uber : SITES.ola;
      return {
        reply: `Opening ${s.label} to book your ride!`,
        action: { type: 'open', label: `${s.emoji} Open ${s.label}`, url: s.url, autoOpen: true }
      };
    }

    // ── CALCULATOR ──
    if (/\b(calculat|math|compute|sum of|what is \d|how much is)\b/.test(t)) {
      // Try to evaluate simple math
      const expr = raw.replace(/calculate|what is|how much is|compute/gi, '').trim();
      try {
        const cleaned = expr.replace(/[^0-9+\-*/().% ]/g, '');
        if (cleaned.length > 0) {
          const result = Function('"use strict"; return (' + cleaned + ')')();
          if (!isNaN(result)) return { reply: `${expr.trim()} = ${result}` };
        }
      } catch (e) {}
      return {
        reply: "Opening Google Calculator for you!",
        action: { type: 'open', label: '🔢 Calculator', url: 'https://www.google.com/search?q=calculator', autoOpen: true }
      };
    }

    // ── SEARCH GOOGLE ──
    if (/\b(search|find|look up|google|tell me about|what is|who is|how to|why is|when did)\b/.test(t)) {
      const q = raw.replace(/search|find|look up|google|tell me about/gi, '').trim();
      return {
        reply: `Searching Google for "${q}"!`,
        action: { type: 'open', label: `🔍 Search: ${q}`, url: `https://www.google.com/search?q=${encodeURIComponent(q)}`, autoOpen: true }
      };
    }

    // ── FALLBACK ──
    const fallbackQ = encodeURIComponent(raw.trim());
    return {
      reply: `Searching Google for "${raw.trim()}"!`,
      action: { type: 'open', label: `🔍 Search: ${raw.trim()}`, url: `https://www.google.com/search?q=${fallbackQ}`, autoOpen: true }
    };
  }

  return { process };
})();
