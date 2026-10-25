/* Ask about Mishti: curated professional Q&A. Runs in the visitor's browser.
   No AI API calls, visitor-message tracking, localStorage, or external messaging. */
(() => {
  "use strict";

  const url = {
    about: "about-me.html",
    work: "research-projects.html",
    experience: "experience.html",
    writing: "technical-blogs.html",
    skills: "skills.html",
    resume: "resume.html",
    contact: "about-me.html",
    publications: "research-projects.html",
    chat: "ask-about-mishti.html"
  };

  const RESPONSES = {
    overview: {
      text: "Mishti Broor is a biomedical engineering master's student at Northwestern University. Her work focuses on neural sensing and practical device design, especially EEG electrode hardware, CAD prototyping, human-subject testing, and signal analysis. At Northwestern, she is working on wearable clinical EEG hardware.",
      source: ["About Me", url.about]
    },
    current: {
      text: "Mishti is a Graduate Student Researcher in the Kimchi Lab at Northwestern University. Her listed work involves improving a wearable clinical EEG system, including device encapsulation, electrode positioning, and reliable scalp contact. The goal is to develop more practical and repeatable hardware for clinical use; this is ongoing work, not a finished commercial product.",
      source: ["Experience", url.experience]
    },
    eeg: {
      text: "At UIC's Liu-CoMotion Lab, Mishti worked on EEG electrode attachments for Type 4 Afro-textured hair. She used CAD and resin 3D printing to develop prototypes, then helped with EEG setup, human-subject evaluation, and signal analysis. The research addresses a practical problem: conventional EEG electrodes can struggle to maintain reliable scalp contact across some hairstyles.",
      source: ["EEG project", url.work + "#eeg"]
    },
    spinal: {
      text: "Mishti worked on a high-fidelity in-vitro spinal cord model designed for cerebrospinal-fluid flow experiments. Her work included Fusion 360 CAD, mesh refinement, and integrating printed resin with silicone components. The project received first place in Biomedical Engineering and fourth place overall at UIC's 2026 Engineering Expo.",
      source: ["Spinal cord project", url.work + "#spinal"]
    },
    bci: {
      text: "Mishti built a motor-imagery EEG analysis pipeline using a public dataset, MNE-Python, common spatial patterns, and scikit-learn. She evaluated decoding across subjects and tested channel restrictions. It was a software-based signal-analysis project, not a physical BCI device.",
      source: ["Research & Projects", url.work + "#decoding"]
    },
    research: {
      text: "Mishti's research experience includes inclusive EEG electrode hardware at UIC and ongoing wearable clinical EEG development at Northwestern. Her work connects device design, scalp-electrode contact, experiments with participants, and signal-quality analysis.",
      source: ["Research & Projects", url.work]
    },
    education: {
      text: "Mishti earned a B.S. in Biomedical Engineering from the University of Illinois Chicago in May 2026, graduating magna cum laude. She is currently pursuing a thesis-track M.S. in Biomedical Engineering at Northwestern University, with an expected graduation date in 2028.",
      source: ["About Me", url.about]
    },
    experience: {
      text: "Her professional experience includes Graduate Student Researcher at Northwestern's Kimchi Lab, Undergraduate Researcher in UIC's Liu-CoMotion Lab, an NIH-funded clinical immersion internship in ophthalmology, and technical writing for Neurofounders. Each role involves a different side of engineering—from building devices to learning about clinical needs and explaining technology.",
      source: ["Experience", url.experience]
    },
    clinical: {
      text: "During an NIH-funded clinical immersion program at UIC, Mishti observed ophthalmology teams and clinical workflows, spoke with clinicians, and documented unmet needs involving devices and usability. This helped connect engineering design decisions with clinical practice.",
      source: ["Experience", url.experience]
    },
    skills: {
      text: "Mishti has hands-on experience with CAD and prototyping (including Fusion 360, SolidWorks, resin printing, and silicone fabrication), EEG acquisition and electrode testing, and biosignal analysis with MATLAB, Python, EEGLAB, and MNE-Python. Her portfolio separates these established skills from technologies she is still learning.",
      source: ["Skills", url.skills]
    },
    bioelectronics: {
      text: "Bioelectronics is an area Mishti is developing, especially biosignal acquisition, sensors, and wearable device integration. Her demonstrated hardware experience is strongest in EEG electrodes, CAD, fabrication, and testing. Her portfolio does not claim completed analog-front-end or PCB projects.",
      source: ["Skills", url.skills]
    },
    publications: {
      text: "Mishti is a co-first author of the October 2026 bioRxiv preprint 'Design and Test Novel EEG Electrode Attachments for Type 4 Afro-textured Hairstyles.' The work also has an accepted poster scheduled for the Society for Neuroscience Annual Meeting on November 16, 2026. A preprint is not the same as a peer-reviewed journal publication.",
      source: ["Publications & presentations", url.publications]
    },
    writing: {
      text: "Mishti writes about neurotechnology and medical devices, including brain-computer interfaces, wearable EEG, neural stimulation, and biosensors. Her Technical Blogs page has 37 linked articles that visitors can search and filter by topic, and she also writes for Neurofounders.",
      source: ["Technical Blogs", url.writing]
    },
    leadership: {
      text: "At Northwestern, Mishti serves as Junior Academic Chair for the Biomedical Engineering Graduate Student Society and as Event Co-Director for the Graduate International Student Association. Both roles are listed in her professional experience.",
      source: ["Experience", url.experience]
    },
    awards: {
      text: "Her in-vitro spinal cord model project received first place in Biomedical Engineering and fourth place overall at the 2026 UIC Engineering Expo. She also graduated magna cum laude from UIC.",
      source: ["Research & Projects", url.work]
    },
    methodology: {
      text: "Across her EEG hardware work, Mishti has moved between design and measurement: CAD and resin 3D printing, electrode placement, scalp-contact and impedance testing, EEG data collection, and signal analysis. She is especially interested in how those practical details affect whether a device works reliably for different people.",
      source: ["Research & Projects", url.work]
    },
    participantCount: {
      text: "Her current résumé describes a focused 17-participant comparison of the novel EEG attachments with a conventional cap. Some older project descriptions mention a broader 30-participant study. Rather than treating those as the same analysis, I would use the linked preprint and résumé for the exact sample definition.",
      source: ["Research & Projects", url.work]
    },
    contact: {
      text: "For professional inquiries, Mishti lists her Northwestern email address: mishtibroor2028@u.northwestern.edu. You can also connect through the LinkedIn link in the site's footer.",
      source: ["About Me", url.about]
    },
    resume: {
      text: "Her résumé covers education at Northwestern and UIC, EEG and medical-device research, clinical immersion, technical writing, projects, publications and presentations, and technical skills.",
      source: ["Résumé", url.resume]
    }
  };

  const privateQuestion = /\b(age|birthday|born|birthplace|relationship|boyfriend|girlfriend|dating|single|married|marriage|partner|husband|wife|children|kids|parents|family|sibling|religion|religious|ethnicity|race|ethnic|nationality|citizenship|immigration|visa|salary|income|net worth|wealth|bank|health|medical history|diagnos|disease|weight|height|address|home address|lives|living|apartment|where does she live|where does mishti live|phone number|personal phone|password|login|account access|private email|personal email|politic|sexual|orientation|hobbies|favorite food|favorite movie|private life|personal life)\b/i;

  function normalize(value) {
    return value.toLowerCase().replace(/[’']/g, "").replace(/[\u2010-\u2015-]/g, " ").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  }
  function answerFor(question) {
    const q = normalize(question);
    if (!q) return { text: "Try asking about Mishti's research, education, engineering projects, experience, skills, publications, or technical writing." };

    if (privateQuestion.test(q) || /\b(where is she right now|current location|her location|social security|passport|home town|hometown|how old)\b/.test(q)) {
      return { text: "I only answer questions about Mishti's publicly shared professional background. I can't help with personal, sensitive, or private details." };
    }
    if (/\b(who are you|are you ai|are you chatgpt|how does this chat work|is this real ai|what can i ask|help|what do you know)\b/.test(q)) {
      return { text: "I'm a portfolio guide with curated answers drawn from Mishti's published professional information—not a general AI assistant. Ask about her education, EEG research, projects, experience, skills, publications, or writing. I won't make up details that aren't in those sources." };
    }
    if (/\b(how many participants|how many subjects|sample size|number of participants|number of subjects)\b/.test(q)) return RESPONSES.participantCount;
    if (/\b(how to contact|contact|reach|email|linkedin|message her|get in touch)\b/.test(q)) return RESPONSES.contact;
    if (/\b(resume|résumé|cv|curriculum vitae)\b/.test(q)) return RESPONSES.resume;
    if (/\b(publication|publications|published|preprint|paper|papers|biorxiv|plos|sfn|society for neuroscience|poster|conference|manuscript)\b/.test(q)) return RESPONSES.publications;
    if (/\b(award|awards|prize|recognition|honors|magna cum laude)\b/.test(q)) return RESPONSES.awards;
    if (/\b(education|educational|degree|degrees|university|universities|college|graduate|graduated|graduation|undergraduate|gpa|studied|study at|school|northwestern vs uic)\b/.test(q) && !/\b(kimchi|current research|working on)\b/.test(q)) return RESPONSES.education;
    if (/\b(leadership|society|student organization|student association|g isa|bmegs|academic chair|event director)\b/.test(q)) return RESPONSES.leadership;
    if (/\b(clinical immersion|ophthalmology|hospital workflow|clinician|r25)\b/.test(q)) return RESPONSES.clinical;
    if (/\b(spinal|cerebrospinal|csf|in vitro|flow model|engineering expo)\b/.test(q)) return RESPONSES.spinal;
    if (/\b(motor imagery|motor decoding|classifier|classification|csp|machine learning|scikit|physionet|decoding project)\b/.test(q)) return RESPONSES.bci;
    if (/\b(electrode|afro textured|type 4|scalp|hair|braid|cornrow|inclusive eeg)\b/.test(q)) return RESPONSES.eeg;
    if (/\b(bioelectronics|analog|pcb|embedded|circuit|hardware learning|learning now|learn next)\b/.test(q)) return RESPONSES.bioelectronics;
    if (/\b(method|methodology|design process|approach|testing|validation|experiment|prototyp|cad|3d printing|fabrication)\b/.test(q)) return RESPONSES.methodology;
    if (/\b(skill|skills|software|tools|programming|matlab|python|fusion 360|solidworks|ee glab|eeglab|brainvision|mne)\b/.test(q)) return RESPONSES.skills;
    if (/\b(blog|blogs|article|articles|writing|writer|neurofounders|write|writes)\b/.test(q)) return RESPONSES.writing;
    if (/\b(kimchi|northwestern lab|working on now|current research|currently researching|current project|wearable clinical eeg)\b/.test(q)) return RESPONSES.current;
    if (/\b(work experience|professional experience|jobs|job|roles|career|employment|worked at|internship|intern|employer)\b/.test(q)) return RESPONSES.experience;
    if (/\b(research|researcher|projects|project|laboratory|labs)\b/.test(q)) return RESPONSES.research;
    if (/\b(who is mishti|tell me about mishti|introduce mishti|what does mishti do|about mishti|her background|professional background|what is her focus|what does she do)\b/.test(q)) return RESPONSES.overview;
    return { text: "I don't have a verified answer to that in Mishti's published professional portfolio, so I won't guess. I can help with her education, EEG research, engineering projects, experience, skills, publications, or technical writing.", source: ["About Me", url.about] };
  }

  const prompts = [
    "What is Mishti working on at Northwestern?",
    "Tell me about her EEG electrode research.",
    "Which engineering tools does she use?",
    "What has she published?"
  ];

  const icon = {
    sparkle: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    send: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 11 15-7-7 16-2-7-6-2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m10 13 9-9" stroke="currentColor" stroke-width="1.7"/></svg>',
    close: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    reset: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 10a9 9 0 1 1 .9 5M3 4v6h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  const pageHost = document.getElementById("mb-chat-page");
  const pageMode = !!pageHost;
  const root = pageHost || document.createElement("div");
  root.id = pageMode ? "mb-chat-page" : "mb-chat-widget";
  root.classList.add("mb-chat-root");
  if (!pageMode) document.body.append(root);

  let launcher = null;
  if (!pageMode) {
    launcher = document.createElement("button");
    launcher.className = "mb-launcher";
    launcher.type = "button";
    launcher.setAttribute("aria-expanded", "false");
    launcher.setAttribute("aria-controls", "mb-chat-panel");
    launcher.setAttribute("aria-label", "Open Ask about Mishti chat");
    launcher.innerHTML = '<span class="mb-launcher-icon">' + icon.sparkle + '</span><span>Ask about Mishti</span>';
    root.append(launcher);
  }

  const panel = document.createElement("section");
  panel.id = "mb-chat-panel";
  panel.className = "mb-panel" + (pageMode ? " mb-panel-page" : "");
  panel.setAttribute("aria-label", "Ask about Mishti: professional portfolio guide");
  if (!pageMode) panel.hidden = true;
  panel.innerHTML =
    '<div class="mb-header">' +
      '<span class="mb-avatar">' + icon.sparkle + '</span>' +
      '<div class="mb-header-title"><strong>Ask about Mishti</strong><span>Professional portfolio guide</span></div>' +
      '<a class="mb-expand" href="ask-about-mishti.html" title="Open full-page chat" aria-label="Open full-page chat">↗</a>' +
      '<button type="button" class="mb-header-action mb-restart" title="Start a new chat" aria-label="Clear conversation">' + icon.reset + '</button>' +
      (pageMode ? "" : '<button type="button" class="mb-header-action mb-close" title="Close chat" aria-label="Close chat">' + icon.close + '</button>') +
    '</div>' +
    '<div class="mb-history" aria-label="Chat messages">' +
      '<div class="mb-welcome"><span class="mb-welcome-mark">' + icon.sparkle + '</span><h2>Curious about my work?</h2>' +
      '<p>Ask about my research, projects, education, and experience. This guide answers from my public professional portfolio.</p>' +
      '<div class="mb-suggestions" aria-label="Suggested questions"></div></div>' +
    '</div>' +
    '<div class="mb-composer-wrap">' +
      '<form class="mb-compose" autocomplete="off">' +
        '<label class="mb-visually-hidden" for="mb-chat-input">Ask a professional question about Mishti</label>' +
        '<textarea id="mb-chat-input" rows="1" maxlength="300" placeholder="Ask about Mishti’s professional work…" required></textarea>' +
        '<button type="submit" class="mb-send" title="Send message" aria-label="Send message" disabled>' + icon.send + '</button>' +
      '</form>' +
      '<p class="mb-disclaimer">Professional topics only · Curated answers · Runs in your browser</p>' +
    '</div>' +
    '<span class="mb-visually-hidden mb-announcement" aria-live="polite" aria-atomic="true"></span>';
  if (!pageMode) root.append(panel); else root.append(panel);

  const history = panel.querySelector(".mb-history");
  const suggestions = panel.querySelector(".mb-suggestions");
  const welcome = panel.querySelector(".mb-welcome");
  const form = panel.querySelector(".mb-compose");
  const input = panel.querySelector("#mb-chat-input");
  const send = panel.querySelector(".mb-send");
  const announcement = panel.querySelector(".mb-announcement");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let busy = false;
  let currentAnimation = null;
  let generation = 0;

  for (const prompt of prompts) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mb-prompt";
    button.textContent = prompt;
    button.addEventListener("click", () => submit(prompt));
    suggestions.append(button);
  }

  function scrollDown() { history.scrollTop = history.scrollHeight; }
  function message(type, content) {
    const entry = document.createElement("div");
    entry.className = "mb-entry mb-" + type;
    const avatar = document.createElement("span");
    avatar.className = "mb-entry-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = type === "assistant" ? "✦" : "You";
    const bubble = document.createElement("div");
    bubble.className = "mb-bubble";
    bubble.textContent = content || "";
    entry.append(avatar, bubble);
    history.append(entry);
    scrollDown();
    return { entry, bubble };
  }

  function reset() {
    generation++;
    if (currentAnimation) cancelAnimationFrame(currentAnimation);
    currentAnimation = null;
    busy = false;
    form.reset();
    input.style.height = "auto";
    send.disabled = true;
    history.querySelectorAll(".mb-entry").forEach(node => node.remove());
    welcome.hidden = false;
    announcement.textContent = "Conversation cleared.";
    if (!panel.hidden) input.focus();
  }

  function finishAnswer(target, result, ticket) {
    if (ticket !== generation) return;
    target.bubble.classList.remove("mb-typing");
    target.bubble.textContent = result.text;
    if (result.source) {
      const source = document.createElement("a");
      source.className = "mb-source";
      source.href = result.source[1];
      source.textContent = result.source[0] + " ↗";
      source.setAttribute("aria-label", "Read source: " + result.source[0]);
      target.bubble.append(source);
    }
    announcement.textContent = "Answer: " + result.text;
    busy = false;
    send.disabled = !input.value.trim();
    input.disabled = false;
    scrollDown();
    currentAnimation = null;
  }

  function typeAnswer(target, result, ticket) {
    if (ticket !== generation) return;
    if (reduceMotion.matches) return finishAnswer(target, result, ticket);
    let started = null;
    const duration = Math.min(2700, Math.max(650, result.text.length * 6));
    target.bubble.classList.add("mb-typing");
    function frame(time) {
      if (ticket !== generation) return;
      if (started === null) started = time;
      const count = Math.max(1, Math.min(result.text.length, Math.round(((time - started) / duration) * result.text.length)));
      target.bubble.textContent = result.text.slice(0, count);
      scrollDown();
      if (count < result.text.length) currentAnimation = requestAnimationFrame(frame);
      else finishAnswer(target, result, ticket);
    }
    currentAnimation = requestAnimationFrame(frame);
  }

  function submit(value) {
    const question = String(value || "").trim().slice(0, 300);
    if (!question || busy) return;
    welcome.hidden = true;
    message("user", question);
    input.value = "";
    input.style.height = "auto";
    busy = true;
    send.disabled = true;
    input.disabled = true;
    const result = answerFor(question);
    const ticket = ++generation;
    const reply = message("assistant", "");
    reply.bubble.classList.add("mb-pending");
    reply.bubble.setAttribute("aria-label", "Answer in progress");
    reply.bubble.textContent = "Thinking about the portfolio…";
    setTimeout(() => {
      if (ticket !== generation) return;
      reply.bubble.classList.remove("mb-pending");
      reply.bubble.removeAttribute("aria-label");
      reply.bubble.textContent = "";
      typeAnswer(reply, result, ticket);
    }, reduceMotion.matches ? 0 : 270);
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    submit(input.value);
  });
  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 112) + "px";
    send.disabled = busy || !input.value.trim();
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      submit(input.value);
    }
  });
  panel.querySelector(".mb-restart").addEventListener("click", reset);

  function close() {
    if (pageMode) return;
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    launcher.setAttribute("aria-label", "Open Ask about Mishti chat");
    launcher.focus();
    document.body.classList.remove("mb-chat-open");
  }
  function open() {
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
    launcher.setAttribute("aria-label", "Close Ask about Mishti chat");
    input.focus();
    document.body.classList.add("mb-chat-open");
    scrollDown();
  }
  if (launcher) launcher.addEventListener("click", () => panel.hidden ? open() : close());
  const closeButton = panel.querySelector(".mb-close");
  if (closeButton) closeButton.addEventListener("click", close);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !pageMode && !panel.hidden) close();
  });
})();
