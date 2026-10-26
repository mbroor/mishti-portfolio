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
      text: "Mishti Broor is a biomedical engineering master's student at Northwestern University. Her background includes EEG electrode design, CAD and 3D printing, human-subject studies, neural-signal analysis, and medical-device prototyping. She now works on improvements to a wearable clinical EEG system in Northwestern's Kimchi Lab.",
      source: ["About Me", url.about]
    },
    current: {
      text: "Yes. As of October 2026, Mishti is working as a Graduate Student Researcher in the Kimchi Lab at Northwestern University Feinberg School of Medicine. She is helping refine a wearable clinical EEG system, with work involving encapsulation, electrode positioning and scalp contact, and prototype testing for more reliable clinical use. The project is ongoing; she is not claiming a finished commercial device.",
      source: ["Experience", url.experience]
    },
    eeg: {
      text: "At UIC's Liu-CoMotion Lab, Mishti designed novel electrode attachments to make EEG recordings more accessible for Type IV Afro textured hairstyles. Her work included CAD, SLA resin printing, EEG acquisition, impedance testing, multimodal gait studies involving IMUs and instrumented insoles, and signal preprocessing. The poster reports improved scalp contact and fewer electrode disconnections with comparable resting alpha SNR. She now works on wearable clinical EEG hardware at Northwestern.",
      source: ["EEG electrode project", "research-projects.html#eeg"]
    },
    spinal: {
      text: "Mishti worked with a UIC senior design team on a deformable 3D model of the spinal subarachnoid space. They fabricated a clear rigid resin cervical section and flexible silicone section with sacrificial PVA molds. The poster reports a 10 cm hybrid prototype with a sealed interface, plus conservation based CSF and tracer transport modeling and optical transparency analysis. A full 60 cm model and pressure sensor integration were next steps, not completed clinical validation.",
      source: ["Spinal model project", "research-projects.html#spinal"]
    },
    bci: {
      text: "Mishti independently built an EEG motor imagery classification pipeline using the 64 channel PhysioNet Motor Movement and Imagery dataset, MNE Python, Common Spatial Patterns and scikit learn. A single subject experiment reached 69% mean cross validation accuracy with CSP. Across 30 analyzed subjects, 5 achieved nominally significant decoding in individual binomial tests; the overall mean was 53% and the group test was not significant. A motor channel restriction test in subject 7 retained 96% accuracy, supporting a sensorimotor contribution without proving a unique neural source. The code and figures are on her GitHub repository.",
      source: ["EEG classification project", "research-projects.html#decoding"]
    },
    research: {
      text: "Mishti's research spans two stages. At UIC, she worked on EEG electrodes for Afro-textured hair, involving CAD, fabrication, human studies, and signal analysis. At Northwestern, she is now working on a wearable clinical EEG system. She is interested in how hardware design and human factors affect whether a sensor works reliably in practice.",
      source: ["Research & Projects", url.work]
    },
    educationCurrent: {text: "Mishti is studying at Northwestern University, pursuing a thesis-track M.S. in Biomedical Engineering. She began in fall 2026 and expects to graduate in 2028. Previously, she earned a B.S. in Biomedical Engineering from the University of Illinois Chicago in May 2026.", source: ["Education", url.about]},
    educationPrevious: {text: "Mishti completed her B.S. in Biomedical Engineering at the University of Illinois Chicago in May 2026, graduating magna cum laude. She now studies at Northwestern University.", source: ["Education", url.about]},
    experienceDuration: {text: "As of October 2026, Mishti has approximately 1 year and 7 months of documented biomedical engineering research experience, spanning March 2025 to October 2026. She conducted research at UIC's Liu-CoMotion Lab from March 2025 through August 2026 and began research at Northwestern's Kimchi Lab in September 2026. She also has technical writing and clinical immersion experience. Some roles overlap, so this is elapsed time rather than summed full-time employment.", source: ["Experience", url.experience]},
    education: {
      text: "Mishti graduated magna cum laude from the University of Illinois Chicago with a B.S. in Biomedical Engineering in May 2026. She is pursuing a thesis-track M.S. in Biomedical Engineering at Northwestern University, with an expected graduation in June 2028.",
      source: ["About Me", url.about]
    },
    experience: {
      text: "Mishti is currently a Graduate Student Researcher in Northwestern's Kimchi Lab and writes for Neurofounders. Her earlier roles include Research and Scientific Aide in UIC's Liu-CoMotion Lab, NIH funded clinical immersion in ophthalmology, and Math Peer Learning Assistant. Her experience spans research hardware, data acquisition, clinical needs finding, tutoring and lab operations.",
      source: ["Experience", "experience.html"]
    },
    clinical: {
      text: "Mishti's 2025 NIH funded UIC clinical immersion took place in ophthalmology. Her published clinical journal covers dry eye measurements, Schirmer testing and scleral lens problems, and explores how comfort and clinic workflows create design opportunities. This was clinical observation and needs finding, not independent patient care.",
      source: ["UIC clinical immersion profile", "https://clinicalimmersion.uic.edu/profiles/broor-mishti-2/"]
    },
    skills: {
      text: "Mishti's documented technical skills include Fusion 360, SolidWorks, CAD, resin/MSLA 3D printing, silicone fabrication, BrainVision/LiveAmp EEG acquisition, electrode placement and impedance testing, MATLAB, Python, EEGLAB, MNE-Python, scikit-learn, and spectral analysis. She is still developing her knowledge of analog biosignal circuitry, PCB design, and embedded systems.",
      source: ["Skills", url.skills]
    },
    bioelectronics: {
      text: "Mishti is actively working on wearable clinical EEG hardware in Northwestern's Kimchi Lab. Her work includes encapsulation design, electrode positioning, prototype modifications, and reliable scalp contact. She's also developing more electronics-focused skills in biosignal acquisition and embedded systems. These ongoing device responsibilities are distinct from analog front-end and PCB projects she hasn't yet claimed as completed.",
      source: ["Skills", url.skills]
    },
    publications: {
      text: "Mishti is a co-first author of 'Design and Test Novel EEG Electrode Attachments for Type 4 Afro-textured Hairstyles,' posted as a bioRxiv preprint on October 8, 2026. The work has an accepted poster scheduled for the Society for Neuroscience Annual Meeting on November 16, 2026. Her October résumé also lists a manuscript submitted to PLOS ONE; submission and a preprint do not mean a journal article has been peer reviewed or accepted.",
      source: ["Publications & presentations", url.publications]
    },
    writing: {
      text: "Mishti is a technical writer for Neurofounders and writes about EEG wearables, brain-computer interfaces, neuromodulation, and medical devices. The portfolio's Technical Blogs page links 37 articles with search and topic filters. Her writing focuses on how these technologies work and the tradeoffs between engineering claims and real-world use.",
      source: ["Technical Blogs", url.writing]
    },
    leadership: {
      text: "At Northwestern, Mishti serves as Junior Academic Chair for the Biomedical Engineering Graduate Student Society and as Event Co-Director for the Graduate International Student Association. Both roles are listed in her professional experience.",
      source: ["Experience", url.experience]
    },
    awards: {
      text: "The in-vitro spinal cord model project won first place in Biomedical Engineering and fourth place overall at the 2026 UIC Engineering Expo. Mishti also graduated magna cum laude from UIC.",
      source: ["Research & Projects", url.work]
    },
    methodology: {
      text: "Mishti's EEG work covered CAD, SLA printing, 32 channel EEG acquisition, impedance and electrode contact measurements, participant testing and signal preprocessing. Her senior design work additionally used Fusion 360 negative molds, PVA printing, silicone casting and MATLAB assisted model validation.",
      source: ["Research and Projects", "research-projects.html"]
    },
    participantCount: {
      text: "The Type IV hair EEG poster specifies a participant group and reports several paired statistical comparisons with different degrees of freedom. It is not safe to substitute the 30 subject public PhysioNet motor imagery dataset for the electrode study sample. For the exact analysis sample and exclusions, consult the linked preprint.",
      source: ["EEG preprint", "https://doi.org/10.64898/2026.10.01.755885"]
    },
    contact: {
      text: "For professional inquiries, Mishti lists her Northwestern email address: mishtibroor2028@u.northwestern.edu. You can also connect through the LinkedIn link in the site's footer.",
      source: ["About Me", url.about]
    },
    resume: {
      text: "Her résumé covers education at Northwestern and UIC, EEG and medical-device research, clinical immersion, technical writing, projects, publications and presentations, and technical skills.",
      source: ["Résumé", url.resume]
    }
    ,
    uic: {
      text: "At UIC's Liu-CoMotion Lab, Mishti worked on EEG hardware and neurorehabilitation research from March 2025 through August 2026. She designed and printed electrode attachments for Type IV hairstyles, supported EEG and multimodal gait studies with IMUs and instrumented insoles, and worked on scalp impedance testing and signal analysis.",
      source: ["Experience", "experience.html"]
    },
    eegResults: {
      text: "The UIC EEG electrode study poster reports fewer disconnected electrodes, lower impedance and reduced electrode to scalp distance compared with a conventional EEG cap. Resting alpha SNR was comparable. Comfort ratings trended higher, but the reported comfort comparison did not meet the usual p below 0.05 threshold. The study summary also mentions a 62% reduction in disconnections, but that specific percentage is not independently established by the poster and is not quoted as a confirmed result here.",
      source: ["EEG electrode project", "research-projects.html#eeg"]
    },
    eegMotivation: {
      text: "One motivation was that standard EEG electrodes can be difficult to place reliably through dense or Afro-textured hair. Poor contact can affect signal quality and participation in research. Mishti's project tested whether redesigned, 3D-printed attachments could address that practical problem without compromising comfort.",
      source: ["EEG electrode project", url.work + "#eeg"]
    },
    future: {
      text: "Mishti is interested in the engineering involved in making neural-sensing and other bioelectronic devices useful to patients and clinicians. She is building from experience in EEG hardware, CAD, prototyping, and human testing toward more electronics-focused wearable-device skills. These are professional interests and learning goals, not claims of finished products.",
      source: ["About Me", url.about]
    },
    supervisors: {
      text: "At UIC, Mishti worked in the Liu-CoMotion Lab led by Dr. Chang Liu; her public research posts also acknowledge Dr. Lucinda Williamson and collaborator Kenneth Ogunniyi. At Northwestern, she is part of Dr. Eyal Kimchi's lab. These are publicly described professional research connections.",
      source: ["Experience", url.experience]
    },
    artwork: {
      text: "Mishti also has an artwork page showing drawings and paintings from her portfolio. That gallery is separate from her biomedical engineering projects.",
      source: ["My artwork", "my-artwork.html"]
    },
    writingExamples: {
      text: "Her Neurofounders features include reporting on Cognixion and Apple Vision Pro, Inner Cosmos, Clair Health's wearable concept, BrainScope's EEG biomarker work, and the nerve-connected LUKE Arm home trial. She also publishes shorter technical explainers through her portfolio's Technical Blogs archive.",
      source: ["Technical Blogs", url.writing]
    },
    leadershipDetail: {
      text: "At Northwestern, Mishti holds two student leadership positions: Junior Academic Chair in the Biomedical Engineering Graduate Student Society (BMEGS) and Event Co-Director in the Graduate International Student Association (G-ISA).",
      source: ["Experience", url.experience]
    },
    designConcepts: {
      text: "Mishti has also explored three early stage biomedical device concepts: a wearable sEMG device for localized muscle signals, a magnetic biopsy capsule for targeted gastrointestinal sampling, and a tear fluid glucose monitoring smart contact lens. These are design concepts, not clinically validated or commercial devices.",
      source: ["Design explorations", "research-projects.html"]
    },
    credentials: {
      text: "Her public LinkedIn profile lists technical courses and certificates including MATLAB, GitHub Foundations, Python coursework, and CITI training related to human-subjects and clinical-device investigations. For the precise list and issue dates, check her LinkedIn profile.",
      source: ["LinkedIn", "https://www.linkedin.com/in/mishti-broor"]
    }
    ,
    teaching: { text: "Mishti worked as a Math Peer Learning Assistant at UIC beginning in September 2025. She facilitated group mathematics learning, provided individualized quantitative support and helped students develop problem solving approaches. Her role's end date has not been confirmed.", source: ["Experience", "experience.html"] },
    labAide: { text: "From August 2023 to August 2025, Mishti was a General Aide in UIC's Biological Sciences Department. She helped prepare undergraduate teaching laboratories, maintain inventories and support safe lab operations.", source: ["Experience", "experience.html"] }
  };

  // Professional topics only. Use explicit intents and a small amount of chat context.
  // Do not use open-ended text generation; every answer is editorially reviewed.
  const privateQuestion = /\b(age|birthday|birthplace|boyfriend|girlfriend|dating|single|married|marriage|husband|wife|children|kids|parents|family|sibling|religion|religious|ethnicity|race|ethnic|nationality|citizenship|immigration|visa|salary|income|net worth|wealth|bank|health|diagnosis|medical history|disease|weight|height|home address|street address|where she lives|where does she live|apartment|phone number|personal phone|password|login|account access|private email|personal email|politics|political views|sexual|orientation|hobbies|favorite food|favorite movie|private life|personal life|romantic|relationship)\b/i;

  function normalize(value) {
    return value.toLowerCase().replace(/[’']/g, "").replace(/[\u2010-\u2015-]/g, " ").replace(/[^a-z0-9\s]/g, " ").trim().replace(/\s+/g, " ");
  }

  // Normal conversations use varied phrasing: "Does she work?" and
  // "What about her work on EEG?" should not depend on memorized sentences.
  const intents = [
    ["eegResults", /\b(disconnect(?:ion|ions|ed)?|impedance results|signal quality results|outcome|performance|how well|how effective|did it work|what were the results)\b/, /\b(eeg|electrode|hair|cap|contact|her research|it)\b/],
    ["participantCount", /\b(participants?|subjects?|sample size|how many people|how many volunteers|how many were tested)\b/],
    ["supervisors", /\b(supervisor|mentor|mentors|advisor|adviser|pi|principal investigator|lab director|collaborator|coauthor|who did she work with)\b/],
    ["publications", /\b(publication|published|publish|paper|papers|preprint|manuscript|biorxiv|plos|sfn|society for neuroscience|poster|conference|journal|accepted paper|peer review)\b/],
    ["awards", /\b(awards?|prize|recognition|honors?|won|first place|fourth place|magna cum laude)\b/],
    ["education", /\b(education|degree|degrees|university|college|school|studied|studies|studying|study at|attend|attends|enrolled|student|graduat(?:e|ed|ion|ing)|gpa|academic background|major|northwestern vs uic|masters|master s|bachelor)\b/],
    ["leadershipDetail", /\b(leadership|student society|student association|bmegs|g isa|academic chair|event co director|event director)\b/],
    ["clinical", /\b(clinical immersion|ophthalmology|clinician interviews|r25|clinical needs|surgical team|clinical workflow)\b/],
    ["spinal", /\b(spinal|cerebrospinal|csf|subarachnoid|in vitro|fluid flow|spine|engineering expo)\b/],
    ["teaching", /\b(math peer|peer learning assistant|math tutor|tutoring|teaching mathematics|math teaching)\b/],
    ["labAide", /\b(general aide|biology department|biological sciences|lab preparation|lab inventory)\b/],
    ["bci", /\b(motor imagery|motor decoding|classifier|classification|csp|scikit|physionet|decoding|machine learning)\b/],
    ["designConcepts", /\b(ingestible|biopsy|smart contact lens|optogenetic|emg patch|myofascial pain|conceptual device)\b/],
    ["writingExamples", /\b(examples? of (?:her )?(?:writing|articles)|specific articles|what has she written|which articles|neurofounders pieces|neurofounders features)\b/],
    ["credentials", /\b(certification|certifications|certificates|credentials|citi|course certificates)\b/],
    ["artwork", /\b(artwork|paintings?|sketches?|drawings?|art gallery)\b/],
    ["resume", /\b(resume|cv|curriculum vitae)\b/],
    ["contact", /\b(contact|reach|email|linkedin|message her|get in touch|hire her|collaborate with her)\b/],
    ["eegMotivation", /\b(why|motivation|problem|need|inclusion|inclusive|challenge)\b/, /\b(eeg|electrode|hair|scalp|contact|this project|that project|it)\b/],
    ["current", /\b(kimchi|northwestern lab|clinical eeg|current research|currently researching|current project|current role|current position|current job|working on now|working on at northwestern|working right now|is she working|does she work|is she employed|where does she work|what does she work on|what is she working on|whats she working on|what s she working on|work nowadays|at the moment|these days|what is she doing now|what does she do now|doing right now|doing currently)\b/],
    ["uic", /\b(uic|liu comotion|liu lab|undergraduate research|before northwestern|previous lab|at chicago)\b/],
    ["eeg", /\b(eeg|electroencephalograph|electroencephalography|electrodes?|scalp|type 4|afro textured|braids?|cornrows?|hair attachment|inclusive eeg)\b/],
    ["bioelectronics", /\b(bioelectronics|pcb|printed circuit|analog front end|embedded electronics|embedded systems|electronic circuits|bioinstrumentation|learning now|learn next)\b/],
    ["methodology", /\b(cad|prototype|prototyping|3d print|fabrication|fusion 360|solidworks|design process|technical process|methods?|validation|test equipment|testing process)\b/],
    ["skills", /\b(skills?|software|tools?|programming|matlab|python|eeglab|mne|brainvision|solidworks|resin printing|data analysis|signal processing|technical background)\b/],
    ["writing", /\b(technical blogs?|articles?|writing|writer|writes?|neurofounders|journalism)\b/],
    ["future", /\b(aims?|goals?|interests?|career plans?|future plans?|hopes? to|what kind of engineer|what motivates her|what is she interested in)\b/],
    ["experience", /\b(work experience|professional experience|career|jobs?|employment|employer|internship|intern|roles?|past jobs?|where has she worked|where did she work|work history|previous experience|professional background)\b/],
    ["research", /\b(research|researcher|projects?|research lab|laboratory|labs|research experience|research focus)\b/],
    ["overview", /\b(who is mishti|about mishti|tell me about mishti|introduce mishti|what does mishti do|what does she do|her background|give me an overview|tell me about her|what is her focus|tell me about yourself)\b/]
  ];

  let previousTopic = null;
  let previousFollowup = 0;
  function result(topic) {
    if (!Object.prototype.hasOwnProperty.call(RESPONSES, topic)) return null;
    previousTopic = topic;
    previousFollowup = 0;
    return RESPONSES[topic];
  }

  function answerFor(question) {
    const q = normalize(String(question || ""));
    if (!q) return { text: "Ask me about Mishti's current work, EEG research, engineering projects, skills, education, publications, or professional experience." };

    if (privateQuestion.test(q) ||
        /\b(how old|was she born|date of birth|current location|precise location|her home|where is she right now|where does mishti live|personal details|her hair style|her hairstyle|her private)\b/.test(q)) {
      previousTopic = null;
      return { text: "This guide is limited to Mishti's publicly shared professional work. I can't help with personal, sensitive, or private information." };
    }

    if (/\b(who are you|are you ai|are you chatgpt|how does (this|the) chat work|is this ai|what can i ask|what do you know|help me use)\b/.test(q)) {
      return { text: "I'm a curated Q&A guide, not a general-purpose AI model. I answer questions about Mishti's published professional background, including research, engineering projects, experience, education, and writing. I don't invent facts or answer questions about her private life." };
    }

    // Questions about general science or other people are out of scope, even if they contain "EEG".
    if (/^(what is|define|explain|teach me|tell me what)\s+(eeg|bci|bioelectronics|signal processing|neuroscience|an electrode)\b/.test(q) &&
        !/\b(mishti|her work|her research|her project)\b/.test(q)) {
      return { text: "This chat is about Mishti's professional background rather than general science. I can explain how she has worked with EEG hardware or what she has built and tested." };
    }
    if (/\b(another person|elon musk|donald trump|stock market|weather|recipe|politics|current news|sports scores|what is the weather)\b/.test(q)) {
      return { text: "I can only answer questions about Mishti's professional background and portfolio." };
    }

    // Direct routing for everyday education and experience questions.
    if (/\b(how much experience|how many years of experience|how long has she (worked|been working)|how experienced is she|years of research|research experience does she have)\b/.test(q)) return result("experienceDuration");
    if (/\b(where|which|what|currently|now)\b/.test(q) && /\b(study|studies|studying|attend|attends|school|university|college|enrolled|student|degree|major)\b/.test(q)) {
      if (/\b(previously|before|undergrad|undergraduate|uic|illinois chicago|did she study|graduated from|went to)\b/.test(q)) return result("educationPrevious");
      return result("educationCurrent");
    }
    if (/\b(what is her gpa|whats her gpa|grade point average)\b/.test(q)) return {text: "Her public portfolio does not state a verified numerical GPA. It confirms she graduated magna cum laude from UIC.", source:["Education",url.about]};
    // Handle wording about current employment before generic mentions of research.
    if (/\b(is she (still )?(working|employed)|does she (currently )?work|where does she (currently )?work|where is she working|working (right )?now|currently working|working these days|working at the moment|current job|current position|what does she do (for work|now)|her job|her position|is she employed)\b/.test(q)) return result("current");

    if (/\b(ee[g]? results?|did the electrodes work|how did the electrodes perform|how much did (the|her) (system|electrodes) improve)\b/.test(q)) return result("eegResults");

    // Specific context wins, while casual nouns are also accepted.
    for (const entry of intents) {
      const [topic, rule, context] = entry;
      if (rule.test(q) && (!context || context.test(q))) {
        return result(topic);
      }
    }

    // Lightweight follow-up memory for the current chat only.
    const followup = /\b(tell me more|more about (it|that|this)|what else|can you elaborate|go into detail|more detail|her role|what did she do there|what did she do|how did she do it|why was that important|why did she do that|how so|and there|what about that|explain that|that project|that research|what about it)\b/.test(q);
    if (followup && previousTopic) {
      const related = {
        eeg: ["methodology","eegResults","eegMotivation"],
        current: ["methodology","research","future"],
        uic: ["eeg","eegResults","methodology"],
        research: ["eeg","current","publications"],
        spinal: ["awards","methodology"],
        bci: ["skills","research"],
        writing: ["writingExamples"],
        skills: ["bioelectronics","methodology"],
        experience: ["current","uic","clinical"],
        publications: ["eeg","research"]
      };
      const choices = related[previousTopic];
      if (choices && choices.length) {
        const next = choices[Math.min(previousFollowup, choices.length - 1)];
        const candidate = RESPONSES[next];
        if (candidate) {
          // Progress through the related details instead of repeating the same answer.
          previousTopic = previousTopic;
          previousFollowup++;
          return candidate;
        }
      }
      return RESPONSES[previousTopic];
    }

    // Catch colloquial mentions of "her work" even without a formal research keyword.
    if (/\b(her work|work she has done|what has she done|what does she work on)\b/.test(q)) return result("research");
    if (/\b(is she|does she|has she|her|mishti)\b/.test(q) &&
        /\b(working|worked|built|build|developed|design|engineering|device|career)\b/.test(q)) return result("overview");

    return { text: "I don't have a verified answer to that in Mishti's public professional information, so I don't want to guess. Try asking about her current role, EEG electrode work, UIC projects, skills, publication, or technical writing.", source: ["Explore her work", url.work] };
  }

  const prompts = [
    "Where is she studying?",
    "How much experience does she have?",
    "What has Mishti done with EEG?",
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
    previousTopic = null;
    previousFollowup = 0;
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
