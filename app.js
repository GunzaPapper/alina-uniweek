// ===== Storage keys =====
const K_WEEK = "uniweek_selectedWeek"; // "odd" | "even"
const K_WEEK_MODE = "uniweek_weekMode"; // "auto" | "manual"
const K_CLASSES = "uniweek_classes";   // array

// Wishes anti-repeat:
const K_WISH_HISTORY = "uniweek_wishHistory10";    // array of last 10 wishes
const K_WISH_LASTDATE = "uniweek_wishLastDateMap"; // { wishText: "YYYY-MM-DD" }

// Quiz settings/history:
const K_QUIZ_LEVEL = "uniweek_quizLevel"; // "easy" | "medium" | "hard"
function quizHistKey(level) { return `uniweek_quizHistory8_${level}`; }

// ===== DOM: Tabs =====
const tabSchedule = document.getElementById("tabSchedule");
const tabWishes = document.getElementById("tabWishes");
const tabSettings = document.getElementById("tabSettings");

const screenSchedule = document.getElementById("screenSchedule");
const screenWishes = document.getElementById("screenWishes");
const screenSettings = document.getElementById("screenSettings");

// ===== DOM: Week =====
const weekOddBtn = document.getElementById("weekOddBtn");
const weekEvenBtn = document.getElementById("weekEvenBtn");

// ===== DOM: Schedule =====
const todayLabel = document.getElementById("todayLabel");
const todayList = document.getElementById("todayList");
const weekGrid = document.getElementById("weekGrid");

// ===== DOM: Settings =====
const addClassBtn = document.getElementById("addClassBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const csvInput = document.getElementById("csvInput");

// ===== DOM: Add class modal =====
const classDialog = document.getElementById("classDialog");
const classForm = document.getElementById("classForm");

// ===== DOM: Wishes =====
const wishBox = document.getElementById("wishBox");
const wishHint = document.getElementById("wishHint"); // hidden in HTML
const newWishBtn = document.getElementById("newWishBtn");

// ===== DOM: Memory =====
const memoryStatus = document.getElementById("memoryStatus");
const memoryStartBtn = document.getElementById("memoryStartBtn");
const memoryResetBtn = document.getElementById("memoryResetBtn");
const memoryLevelLabel = document.getElementById("memoryLevelLabel");
const memoryGridEl = document.querySelector(".memoryGrid");
let memButtons = []; // created dynamically

// ===== DOM: Quiz =====
const quizScore = document.getElementById("quizScore");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizNextBtn = document.getElementById("quizNextBtn");
const quizResetBtn = document.getElementById("quizResetBtn");
const quizFeedback = document.getElementById("quizFeedback");
const quizEasyBtn = document.getElementById("quizEasyBtn");
const quizMedBtn  = document.getElementById("quizMedBtn");
const quizHardBtn = document.getElementById("quizHardBtn");

// ===== DOM: Celebration =====
const celebrate = document.getElementById("celebrate");
const celebrateParticles = document.getElementById("celebrateParticles");

// ===== Data =====
const DAYS = [
  { key: "monday", name: "Понедельник", sort: 1 },
  { key: "tuesday", name: "Вторник", sort: 2 },
  { key: "wednesday", name: "Среда", sort: 3 },
  { key: "thursday", name: "Четверг", sort: 4 },
  { key: "friday", name: "Пятница", sort: 5 },
  { key: "saturday", name: "Суббота", sort: 6 },
];

// Пожелания
const BASE_WISHES = [
  "Доброе утро, Алина 💗 Ты справишься со всем сегодня.",
  "Пусть день будет мягким, а мысли — спокойными 🌸",
  "Ты умная и сильная. Я верю в тебя всегда 💗",
  "Пусть сегодня будет хоть одна маленькая радость — и она будет твоей ✨",
  "Если станет трудно — просто вспомни: ты не одна 💗",
  "Пусть пары пройдут легко, а настроение будет тёплым и спокойным 🌷",
  "Ты прекрасная. И у тебя всё получится 💗",
  "Дыши глубже. Ты уже молодец.",
  "Пусть всё важное получится с первого раза ✨",
  "Я рядом мыслями. Всегда.",
  "Пусть сегодня тебе встретится что-то доброе и светлое 🌸",
  "Ты умеешь собираться и побеждать — я это видел 💗",
  "Пусть мозг работает быстро, а сердце — спокойно ☁️",
  "Пусть сегодня будет день «я справилась» 💗",
  "Ты — моя гордость. Без условий.",
  "Пусть у тебя будет вкусный кофе/чай и хорошие люди рядом ☕️",
  "Если устала — сделай паузу. Ты не обязана быть идеальной.",
  "Ты умеешь учиться красиво. Мне это нравится 💗",
  "Сегодня твоя улыбка — главный план дня 🙂",
  "Пусть даже сложное станет понятным ✨",
  "Я люблю тебя. И точка 💗",
  "Ты заслуживаешь нежности. Сегодня — особенно.",
  "Пусть всё сложится ровно так, как тебе удобно 🌸",
  "Пусть у тебя получится чуть больше, чем ты ожидала 💗",
  "Ты — лучшая версия «Алины» на планете 🙂",
  "Пусть день будет без лишней суеты.",
  "Я мысленно держу тебя за руку 💗",
  "Если сомневаешься — просто начни. Дальше будет легче.",
  "Ты умеешь делать невозможное привычным делом ✨",
  "Пусть тебя сегодня радует каждая мелочь 🌷",
  "Ты — умница. Даже когда тебе кажется иначе.",
  "Я горжусь тобой. Правда 💗",
  "Пусть будет меньше стресса и больше воздуха.",
  "Ты не одна. Я с тобой.",
  "Пусть сегодня будет день твоей маленькой победы 💗",
];

// 30 вариантов похвалы
const PRAISES = [
  { t: "Ты моя умничка 💗🥰", s: "Так держать! ✨" },
  { t: "Вау! Ты супер 💖", s: "Я тобой горжусь 😍" },
  { t: "Браво, красавица 💗", s: "У тебя отлично получается 🌸" },
  { t: "Ты просто космос ⭐️", s: "Продолжай в том же духе 🚀" },
  { t: "Гордость моя 💞", s: "Ещё чуть-чуть — и будет рекорд ✨" },
  { t: "Умничкааа 💗", s: "Ты справилась идеально 😌" },
  { t: "Ты сильная 💪💗", s: "И очень-очень умная 🥰" },
  { t: "Красиво сделано 💖", s: "Вот это уровень! 🎉" },
  { t: "Молодец, Алина 🌷", s: "Ты сияешь ✨" },
  { t: "Победа! 💕", s: "Так приятно смотреть на твой прогресс 😊" },
  { t: "Ты — лучшая 💗", s: "Я в тебя верю всегда 🌸" },
  { t: "Супер-умница 🥰", s: "Ещё один шаг вперёд ✨" },
  { t: "Это было круто 💖", s: "Ты реально молодец 😍" },
  { t: "Умничка моя 💞", s: "Я горжусь тобой 💗" },
  { t: "Ты справилась ⭐️", s: "И это только начало 🌷" },
  { t: "Как же ты хороша 💗", s: "Продолжай, я рядом 😊" },
  { t: "Шикарно! 💕", s: "Ты очень способная ✨" },
  { t: "Так держать 💖", s: "Ты делаешь это красиво 🌸" },
  { t: "Аплодисменты 👏💗", s: "Ты умница-умница 🥰" },
  { t: "Великолепно ⭐️", s: "Ещё один успех 🎉" },
  { t: "Ты победительница 💗", s: "Вот это характер 💪" },
  { t: "Солнце, ты молодец 🌞", s: "Я улыбаюсь от гордости 😊" },
  { t: "Идеально 💖", s: "Ты на высоте ✨" },
  { t: "Крутая! 💞", s: "Прямо как я люблю 😍" },
  { t: "Талант 💗", s: "И труд — лучшая комбинация 🌸" },
  { t: "Прекрасно 🥰", s: "Ещё разочек? 😉" },
  { t: "Умница моя 💕", s: "Ты можешь всё ✨" },
  { t: "Сильно! 💖", s: "Это было уверенно 💪" },
  { t: "Чудо моё 💗", s: "Ты делаешь мой день лучше 🌷" },
  { t: "Вот это да! ⭐️", s: "Ты растёшь на глазах ✨" }
];

// ===== Встроенное расписание =====
const DEFAULT_SCHEDULE_CSV = `courseName,type,dayOfWeek,startTime,endTime,weekType,location,color
Трудовое право — Бабаева О. Н.,lecture,monday,11:30,13:05,both,a.304 (Корпус №9),
Иностранный язык — Горчакова Е. П.,seminar,monday,13:25,15:00,odd,a.904 (Корпус №9),
Иностранный язык — Пешкова А. Б.,seminar,monday,13:25,15:00,even,a.714 (Корпус №9),
Гражданское право. Общая часть — Евтухович Е. А.,seminar,monday,15:10,16:45,both,a.303 (Корпус №9),
Административное право — Старилов Ю. Н.,lecture,monday,16:55,18:30,both,Акт. зал (Корпус №9),

Трудовое право — Бабаева О. Н.,seminar,tuesday,08:00,09:35,both,a.608 (Корпус №9),
Уголовное право. Общая часть — Белоконь Г. Г.,seminar,tuesday,09:45,11:20,both,a.610 (Корпус №9),
Физическая культура и спорт — Преп.,seminar,tuesday,11:30,13:05,both,Спортзал (Корпус №9),
Таможенное право — Матвеева Т. А.,seminar,tuesday,13:25,15:00,both,a.705 (Корпус №9),

Налоговое право — Мардасова М. Е.,seminar,wednesday,08:00,09:35,both,a.704 (Корпус №9),
Налоговое право — Мардасова М. Е.,seminar,wednesday,09:45,11:20,both,a.902 (Корпус №9),
Гражданское право. Общая часть — Сафронова Т. Н.,lecture,wednesday,11:30,13:05,both,a.304 (Корпус №9),
Информационное право — Матвеев С. П.,lecture,wednesday,13:25,15:00,both,a.504 (Корпус №9),
Таможенное право — Матвеева Т. А.,lecture,wednesday,15:10,16:45,both,a.304 (Корпус №9),

Юридическая техника — Белоконь Н. В.,lecture,thursday,11:30,13:05,both,a.505 (Корпус №9),
Административное право — Катинская Е. С.,seminar,thursday,13:25,15:00,both,a.605 (Корпус №9),
Налоговое право — Сенцова М. В.,lecture,thursday,15:10,16:45,both,a.504 (Корпус №9),
Физическая культура и спорт — Преп.,seminar,thursday,16:55,18:30,both,Спортзал (Корпус №9),

Информационное право — Матвеев С. П.,seminar,friday,13:25,15:00,both,a.608 (Корпус №9),
Уголовное право. Общая часть — Трухачев В. В.,lecture,friday,15:10,16:45,both,a.504 (Корпус №9),
Юридическая психология — Куницына О. А.,lecture,friday,16:55,18:30,both,a.504 (Корпус №9),

Юридическая психология — Катинский В. Г.,seminar,saturday,13:25,15:00,both,a.716 (Корпус №9),
Гражданское право. Общая часть — Евтухович Е. А.,seminar,saturday,15:10,16:45,both,a.716 (Корпус №9),
`;

// ===== Helpers =====
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getWeek() {
  const w = localStorage.getItem(K_WEEK);
  return (w === "even" || w === "odd") ? w : "odd";
}
function getWeekMode() {
  const m = localStorage.getItem(K_WEEK_MODE);
  return (m === "manual") ? "manual" : "auto";
}

// 🔧 Якорь: поставь сюда понедельник недели, которая ТОЧНО была Odd.
// Сейчас стоит пример.
const ANCHOR_DATE = "2026-03-02";
const ANCHOR_WEEK = "odd";

function weekFromAnchor(today = new Date()) {
  const anchor = new Date(ANCHOR_DATE + "T00:00:00");
  const t = new Date(today);
  t.setHours(0,0,0,0);

  const diffDays = Math.floor((t.getTime() - anchor.getTime()) / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffWeeks % 2 === 0) return ANCHOR_WEEK;
  return (ANCHOR_WEEK === "odd") ? "even" : "odd";
}

function setWeek(w) {
  localStorage.setItem(K_WEEK_MODE, "manual"); // ручной выбор => manual
  localStorage.setItem(K_WEEK, w);
  updateWeekUI();
  renderAll();
}

function parseHHmmToMinutes(s) {
  const v = String(s).trim();
  const m = /^(\d{1,2}):(\d{2})$/.exec(v);
  if (!m) return null;
  const hh = Number(m[1]);
  const mm = Number(m[2]);
  if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return null;
  return hh * 60 + mm;
}
function minutesToHHmm(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
}
function normalizeHex(hex) {
  if (!hex) return null;
  let c = String(hex).trim().replace("#", "");
  if (c.length !== 6) return null;
  if (!/^[0-9a-fA-F]{6}$/.test(c)) return null;
  return c.toUpperCase();
}

function todayDayKey() {
  const d = new Date();
  const wd = d.getDay(); // 0=Sun..6=Sat
  const map = { 1:"monday",2:"tuesday",3:"wednesday",4:"thursday",5:"friday",6:"saturday" };
  return map[wd] || null;
}
function formatTodayLabel() {
  const d = new Date();
  return d.toLocaleDateString("ru-RU", { weekday: "long", day: "2-digit", month: "long" });
}
function weekFilterOK(item, selectedWeek) {
  if (selectedWeek === "odd") return item.weekType === "odd" || item.weekType === "both";
  if (selectedWeek === "even") return item.weekType === "even" || item.weekType === "both";
  return true;
}
function sortClasses(a, b) {
  const da = DAYS.find(x => x.key === a.dayOfWeek)?.sort ?? 99;
  const db = DAYS.find(x => x.key === b.dayOfWeek)?.sort ?? 99;
  if (da !== db) return da - db;
  return a.startMinutes - b.startMinutes;
}

function isoDate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function daysBetween(isoA, isoB) {
  const [ay, am, ad] = isoA.split("-").map(Number);
  const [by, bm, bd] = isoB.split("-").map(Number);
  const a = new Date(ay, am - 1, ad).getTime();
  const b = new Date(by, bm - 1, bd).getTime();
  return Math.floor((b - a) / (1000 * 60 * 60 * 24));
}

// ===== Tabs =====
function showTab(which) {
  const isSchedule = which === "schedule";
  const isWishes = which === "wishes";
  const isSettings = which === "settings";

  tabSchedule.classList.toggle("active", isSchedule);
  tabWishes.classList.toggle("active", isWishes);
  tabSettings.classList.toggle("active", isSettings);

  screenSchedule.classList.toggle("active", isSchedule);
  screenWishes.classList.toggle("active", isWishes);
  screenSettings.classList.toggle("active", isSettings);
}

// ===== Week UI =====
function updateWeekUI() {
  const w = getWeek();
  weekOddBtn.classList.toggle("active", w === "odd");
  weekEvenBtn.classList.toggle("active", w === "even");
}

// ===== Schedule rendering =====
function renderClassItem(item, compact=false) {
  const el = document.createElement("div");
  el.className = "item";

  const dot = document.createElement("div");
  dot.className = "dot";
  if (item.colorHex) dot.style.background = "#" + item.colorHex;
  el.appendChild(dot);

  const main = document.createElement("div");
  main.className = "itemMain";

  const top = document.createElement("div");
  top.className = "itemTop";

  const title = document.createElement("div");
  title.className = "itemTitle";
  title.textContent = item.courseName;

  const meta = document.createElement("div");
  meta.className = "itemMeta";
  meta.textContent = `${minutesToHHmm(item.startMinutes)}–${minutesToHHmm(item.endMinutes)} • ${item.classType}`;

  top.appendChild(title);
  top.appendChild(meta);
  main.appendChild(top);

  const sub = document.createElement("div");
  sub.className = "itemSub";
  const parts = [];
  if (!compact) parts.push(item.weekType.toUpperCase());
  if (item.location) parts.push(item.location);
  sub.textContent = parts.join(" • ");
  if (sub.textContent) main.appendChild(sub);

  el.appendChild(main);
  return el;
}

function renderToday() {
  todayLabel.textContent = formatTodayLabel();

  const selectedWeek = getWeek();
  const classes = loadJSON(K_CLASSES, []).sort(sortClasses);

  const dayKey = todayDayKey();
  const todayItems = dayKey
    ? classes.filter(c => c.dayOfWeek === dayKey && weekFilterOK(c, selectedWeek))
    : [];

  todayList.innerHTML = "";
  if (!dayKey) {
    todayList.innerHTML = `<div class="smallMuted">Сегодня воскресенье — расписание отображаем Пн–Сб 💗</div>`;
    return;
  }
  if (todayItems.length === 0) {
    todayList.innerHTML = `<div class="smallMuted">На сегодня пар нет (или они в другой неделе).</div>`;
    return;
  }
  for (const item of todayItems) todayList.appendChild(renderClassItem(item));
}

function renderWeek() {
  const selectedWeek = getWeek();
  const classes = loadJSON(K_CLASSES, []).sort(sortClasses);

  weekGrid.innerHTML = "";
  for (const day of DAYS) {
    const dayItems = classes
      .filter(c => c.dayOfWeek === day.key && weekFilterOK(c, selectedWeek))
      .sort((a,b)=>a.startMinutes-b.startMinutes);

    const wrap = document.createElement("div");
    wrap.className = "dayBlock";

    const title = document.createElement("div");
    title.className = "dayTitle";
    title.textContent = day.name;
    wrap.appendChild(title);

    if (dayItems.length === 0) {
      const empty = document.createElement("div");
      empty.className = "dayEmpty";
      empty.textContent = "Нет пар";
      wrap.appendChild(empty);
    } else {
      const list = document.createElement("div");
      list.className = "list";
      for (const item of dayItems) list.appendChild(renderClassItem(item, true));
      wrap.appendChild(list);
    }
    weekGrid.appendChild(wrap);
  }
}

function renderAll() {
  renderToday();
  renderWeek();
}

// ===== Seed schedule =====
function seedDefaultScheduleIfEmpty() {
  const current = loadJSON(K_CLASSES, []);
  if (Array.isArray(current) && current.length > 0) return;

  try {
    const parsed = parseCSV(DEFAULT_SCHEDULE_CSV);
    saveJSON(K_CLASSES, parsed);
  } catch (e) {
    console.error("DEFAULT_SCHEDULE_CSV parse failed:", e);
  }
}

// ===== Wishes: anti-repeat =====
function pickWishSmart() {
  const history = loadJSON(K_WISH_HISTORY, []);
  const lastMap = loadJSON(K_WISH_LASTDATE, {});
  const today = isoDate();

  const inLast10 = new Set(history);

  let filtered = BASE_WISHES.filter(w => {
    const last = lastMap[w];
    const within3 = last ? (daysBetween(last, today) < 3) : false;
    return !inLast10.has(w) && !within3;
  });

  if (filtered.length === 0) filtered = BASE_WISHES.filter(w => !inLast10.has(w));
  if (filtered.length === 0) filtered = BASE_WISHES.slice();

  return filtered[Math.floor(Math.random() * filtered.length)];
}

function setNewWish() {
  const w = pickWishSmart();
  wishBox.textContent = w;

  const today = isoDate();
  const history = loadJSON(K_WISH_HISTORY, []);
  const lastMap = loadJSON(K_WISH_LASTDATE, {});

  history.unshift(w);
  saveJSON(K_WISH_HISTORY, history.slice(0, 10));

  lastMap[w] = today;
  saveJSON(K_WISH_LASTDATE, lastMap);

  // подсказку убрали полностью
  if (wishHint) wishHint.textContent = "";
}

// ===== CSV parsing =====
function splitCSVLine(line) {
  let res = [];
  let cur = "";
  let inQ = false;
  for (const ch of line) {
    if (ch === '"') { inQ = !inQ; continue; }
    if (ch === "," && !inQ) { res.push(cur); cur = ""; }
    else cur += ch;
  }
  res.push(cur);
  return res;
}
function parseCSV(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) throw new Error("Пустой CSV.");

  const header = lines[0].toLowerCase();
  const expected = "coursename,type,dayofweek,starttime,endtime,weektype,location,color";
  if (header !== expected) throw new Error("Неверный заголовок CSV.\nОжидаю:\n" + expected);

  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const lineNumber = i + 1;
    const cols = splitCSVLine(lines[i]);
    if (cols.length !== 8) throw new Error(`Строка ${lineNumber}: нужно 8 колонок, найдено ${cols.length}.`);

    const courseName = cols[0].trim();
    const type = cols[1].trim().toLowerCase();
    const dayOfWeek = cols[2].trim().toLowerCase();
    const startTime = cols[3].trim();
    const endTime = cols[4].trim();
    const weekType = cols[5].trim().toLowerCase();
    const location = cols[6].trim();
    const color = normalizeHex(cols[7].trim());

    if (!courseName) throw new Error(`Строка ${lineNumber}: courseName пустой.`);
    if (!["lecture","seminar","lab"].includes(type)) throw new Error(`Строка ${lineNumber}: неверный type.`);
    if (!DAYS.some(d => d.key === dayOfWeek)) throw new Error(`Строка ${lineNumber}: неверный dayOfWeek.`);
    if (!["odd","even","both"].includes(weekType)) throw new Error(`Строка ${lineNumber}: неверный weekType.`);

    const sMin = parseHHmmToMinutes(startTime);
    const eMin = parseHHmmToMinutes(endTime);
    if (sMin == null) throw new Error(`Строка ${lineNumber}: неверный startTime (HH:mm).`);
    if (eMin == null) throw new Error(`Строка ${lineNumber}: неверный endTime (HH:mm).`);
    if (sMin >= eMin) throw new Error(`Строка ${lineNumber}: startTime должен быть раньше endTime.`);

    out.push({
      id: newId(),
      courseName,
      classType: type,
      dayOfWeek,
      startMinutes: sMin,
      endMinutes: eMin,
      weekType,
      location: location ? location : null,
      colorHex: color ? color : null
    });
  }
  return out;
}

// ===== Add class modal =====
function openAddClass() {
  classForm.reset();
  classDialog.showModal();
}
function newId() {
  if (crypto && crypto.randomUUID) return crypto.randomUUID();
  return "id_" + Math.random().toString(16).slice(2) + "_" + Date.now();
}
function saveClassFromForm() {
  const fd = new FormData(classForm);

  const courseName = String(fd.get("courseName") || "").trim();
  const classType = String(fd.get("classType") || "").trim().toLowerCase();
  const dayOfWeek = String(fd.get("dayOfWeek") || "").trim();
  const weekType = String(fd.get("weekType") || "").trim();
  const startTime = String(fd.get("startTime") || "").trim();
  const endTime = String(fd.get("endTime") || "").trim();
  const location = String(fd.get("location") || "").trim();
  const colorHex = normalizeHex(String(fd.get("colorHex") || "").trim());

  if (!courseName) return alert("Введите название пары.");
  if (!["lecture","seminar","lab"].includes(classType)) return alert("Неверный тип (lecture/seminar/lab).");
  if (!DAYS.some(d => d.key === dayOfWeek)) return alert("Неверный день.");
  if (!["odd","even","both"].includes(weekType)) return alert("Неверный тип недели.");

  const startMinutes = parseHHmmToMinutes(startTime);
  const endMinutes = parseHHmmToMinutes(endTime);
  if (startMinutes == null) return alert("Неверное время начала. Формат HH:mm");
  if (endMinutes == null) return alert("Неверное время конца. Формат HH:mm");
  if (startMinutes >= endMinutes) return alert("Время начала должно быть раньше времени конца.");

  const item = {
    id: newId(),
    courseName,
    classType,
    dayOfWeek,
    startMinutes,
    endMinutes,
    weekType,
    location: location ? location : null,
    colorHex: colorHex ? colorHex : null
  };

  const classes = loadJSON(K_CLASSES, []);
  classes.push(item);
  saveJSON(K_CLASSES, classes);

  classDialog.close();
  renderAll();
}

// ===== Celebration =====
function rand(min, max) { return Math.random() * (max - min) + min; }

function showCelebrateAsync() {
  celebrateParticles.innerHTML = "";
  celebrate.classList.remove("hidden");
  celebrate.setAttribute("aria-hidden", "false");

  // Рандомная похвала
  const pick = PRAISES[Math.floor(Math.random() * PRAISES.length)];
  const titleEl = celebrate.querySelector(".celebrateTitle");
  const subEl = celebrate.querySelector(".celebrateSub");
  if (titleEl) titleEl.textContent = pick.t;
  if (subEl) subEl.textContent = pick.s;

  // Частицы
  const emojis = ["💗","💖","💕","💞","✨","🎉","🥰","😊","🌸","🌷","⭐️"];
  const count = 32;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const left = rand(0, 100);
    const delay = rand(0, 0.18);
    const size = rand(16, 28);
    const duration = rand(1.05, 1.55);

    p.style.left = left + "vw";
    p.style.animationDelay = delay + "s";
    p.style.animationDuration = duration + "s";
    p.style.fontSize = size + "px";

    celebrateParticles.appendChild(p);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      hideCelebrate();
      resolve();
    }, 1350);
  });
}

function hideCelebrate() {
  celebrate.classList.add("hidden");
  celebrate.setAttribute("aria-hidden", "true");
  celebrateParticles.innerHTML = "";
}

celebrate.addEventListener("click", hideCelebrate);

// ===== Memory (Simon) =====
let memSequence = [];
let memUserIndex = 0;
let memLevel = 0;
let memShowing = false;
let memActive = false;

let memPadCount = 4; // starts
const MEM_MAX_PADS = 16;

const MEM_COLORS = [
  "rgba(247,168,198,.35)",
  "rgba(255,214,231,.60)",
  "rgba(247,168,198,.22)",
  "rgba(255,214,231,.38)",
  "rgba(252,227,238,.70)",
  "rgba(247,168,198,.28)",
  "rgba(255,214,231,.48)",
  "rgba(247,168,198,.18)"
];

const MEM_EMOJIS = ["💗","🌸","✨","😊","🥰","🌷","⭐️","🍓","🧸","🎀","🍬","☁️","🫶","💖","💕","😌"];
const MEM_COVER = "♡";

function setMemoryUI(status) {
  memoryStatus.textContent = status;
  memoryLevelLabel.textContent = `Level: ${memLevel}`;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function updatePadCountForLevel() {
  memPadCount = Math.min(4 + (memLevel - 1), MEM_MAX_PADS);
  const cols = Math.ceil(Math.sqrt(memPadCount));
  memoryGridEl.style.setProperty("--cols", String(cols));
}

function rebuildMemoryGrid() {
  memoryGridEl.innerHTML = "";
  for (let i = 0; i < memPadCount; i++) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "memBtn";
    b.dataset.pad = String(i);

    b.style.background = MEM_COLORS[i % MEM_COLORS.length];
    b.dataset.emoji = MEM_EMOJIS[i % MEM_EMOJIS.length];

    b.textContent = MEM_COVER;
    b.style.fontSize = "24px";
    b.style.fontWeight = "900";
    b.style.color = "rgba(0,0,0,.35)";
    b.style.display = "flex";
    b.style.alignItems = "center";
    b.style.justifyContent = "center";
    b.style.userSelect = "none";

    memoryGridEl.appendChild(b);
  }
  memButtons = Array.from(document.querySelectorAll(".memBtn"));
}

async function flashPad(i) {
  const btn = memButtons[i];
  if (!btn) return;

  const onMs = 420;
  const offMs = 220;

  btn.textContent = btn.dataset.emoji || "💗";
  btn.style.color = "rgba(0,0,0,.55)";

  btn.classList.add("flash");
  await sleep(onMs);
  btn.classList.remove("flash");

  btn.textContent = MEM_COVER;
  btn.style.color = "rgba(0,0,0,.35)";

  await sleep(offMs);
}

async function showSequence() {
  memShowing = true;
  setMemoryUI("Смотри внимательно…");
  await sleep(200);

  for (const i of memSequence) await flashPad(i);

  memShowing = false;
  setMemoryUI("Теперь твоя очередь");
}

function addRandomStep() {
  memSequence.push(Math.floor(Math.random() * memPadCount));
}

async function memoryStart() {
  memActive = true;
  memLevel = 1;
  memSequence = [];
  memUserIndex = 0;

  updatePadCountForLevel();
  rebuildMemoryGrid();

  addRandomStep();
  setMemoryUI("Готово!");
  await sleep(450);
  await showSequence();
}

async function memoryNextLevel() {
  await showCelebrateAsync();

  memLevel += 1;
  memUserIndex = 0;

  updatePadCountForLevel();
  rebuildMemoryGrid();

  addRandomStep();
  setMemoryUI("Отлично! Следующий уровень…");
  await sleep(520);
  await showSequence();
}

function memoryFail() {
  memActive = false;
  setMemoryUI(`Ошибка 😅 Был уровень ${memLevel}. Нажми Start`);
  memLevel = 0;
  memSequence = [];
  memUserIndex = 0;

  memPadCount = 4;
  memoryGridEl.style.setProperty("--cols", "2");
  rebuildMemoryGrid();
}

function memoryReset() {
  memActive = false;
  memShowing = false;
  memLevel = 0;
  memSequence = [];
  memUserIndex = 0;

  memPadCount = 4;
  memoryGridEl.style.setProperty("--cols", "2");
  rebuildMemoryGrid();

  setMemoryUI("Нажми Start");
}

async function handleMemClick(padIndex) {
  if (!memActive || memShowing) return;

  await flashPad(padIndex);

  if (padIndex !== memSequence[memUserIndex]) {
    memoryFail();
    return;
  }

  memUserIndex += 1;
  if (memUserIndex >= memSequence.length) {
    await memoryNextLevel();
  }
}

memoryGridEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".memBtn");
  if (!btn) return;
  handleMemClick(Number(btn.dataset.pad));
});

// ===== Quiz =====
const QUESTIONS = [
  // EASY
  { id:"e1", level:"easy", q:"Сколько минут в 2 часах 30 мин?", opts:["120","150","180","210"], a:1 },
  { id:"e2", level:"easy", q:"Продолжи: понедельник, вторник, …", opts:["четверг","суббота","пятница","среда"], a:3 },
  { id:"e3", level:"easy", q:"Столица Японии?", opts:["Киото","Токио","Осака","Нагоя"], a:1 },
  { id:"e4", level:"easy", q:"Сколько будет 9×7?", opts:["56","63","72","79"], a:1 },
  { id:"e5", level:"easy", q:"Что тяжелее: 1 кг ваты или 1 кг железа?", opts:["Вата","Железо","Одинаково","Зависит"], a:2 },

  // MEDIUM
  { id:"m1", level:"medium", q:"Продолжи ряд: 3, 6, 12, 24, ?", opts:["27","36","48","60"], a:2 },
  { id:"m2", level:"medium", q:"Если 5x − 10 = 15, то x =", opts:["3","4","5","6"], a:2 },
  { id:"m3", level:"medium", q:"Чему равно 12.5% от 240?", opts:["24","30","36","48"], a:1 },
  { id:"m4", level:"medium", q:"Какой газ преобладает в атмосфере Земли?", opts:["Кислород","Азот","Углекислый газ","Водород"], a:1 },
  { id:"m5", level:"medium", q:"Лишнее слово: квадрат, треугольник, круг, куб", opts:["квадрат","треугольник","круг","куб"], a:3 },
  { id:"m6", level:"medium", q:"Сколько секунд в 2.5 минут?", opts:["120","130","150","180"], a:2 },

  // HARD
  { id:"h1", level:"hard", q:"1, 1, 2, 3, 5, 8, ? (Фибоначчи)", opts:["11","12","13","15"], a:2 },
  { id:"h2", level:"hard", q:"Если a:b = 2:5 и b = 40, то a =", opts:["8","10","16","20"], a:3 },
  { id:"h3", level:"hard", q:"(8×7) − (6×5) =", opts:["26","28","30","32"], a:1 },
  { id:"h4", level:"hard", q:"Сколько хромосом у человека (в соматической клетке)?", opts:["44","46","48","52"], a:1 },
  { id:"h5", level:"hard", q:"Какое из этих чудес света — античное?", opts:["Колизей","Маяк в Александрии","Эйфелева башня","Биг-Бен"], a:1 },
  { id:"h6", level:"hard", q:"Антоним слова «изобилие»:", opts:["скудость","щедрость","богатство","излишек"], a:0 }
];

let quizCorrect = 0;
let quizTotal = 0;
let quizCurrent = null;
let quizLocked = false;

function getQuizLevel() {
  const v = localStorage.getItem(K_QUIZ_LEVEL);
  return (v === "easy" || v === "hard" || v === "medium") ? v : "medium";
}
function setQuizLevel(level) {
  localStorage.setItem(K_QUIZ_LEVEL, level);
  updateQuizLevelUI();
  nextQuiz();
}
function updateQuizLevelUI() {
  const level = getQuizLevel();
  quizEasyBtn?.classList.toggle("active", level === "easy");
  quizMedBtn?.classList.toggle("active", level === "medium");
  quizHardBtn?.classList.toggle("active", level === "hard");
}

function updateQuizScore() {
  quizScore.textContent = `${quizCorrect} / ${quizTotal}`;
}

function renderQuizQuestion() {
  quizFeedback.textContent = "";
  quizOptions.innerHTML = "";
  quizLocked = false;

  if (!quizCurrent) {
    quizQuestion.textContent = "Нажми “Next”, чтобы начать.";
    return;
  }

  quizQuestion.textContent = quizCurrent.q;

  quizCurrent.opts.forEach((text, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "quizOptBtn";
    b.textContent = text;
    b.addEventListener("click", () => chooseQuiz(idx, b));
    quizOptions.appendChild(b);
  });
}

function nextQuiz() {
  const level = getQuizLevel();
  const histKey = quizHistKey(level);
  const hist = loadJSON(histKey, []);
  const recent = new Set(hist);

  let pool = QUESTIONS.filter(q => q.level === level && !recent.has(q.id));
  if (pool.length === 0) pool = QUESTIONS.filter(q => q.level === level);
  if (pool.length === 0) pool = QUESTIONS.slice();

  quizCurrent = pool[Math.floor(Math.random() * pool.length)];
  renderQuizQuestion();

  hist.unshift(quizCurrent.id);
  saveJSON(histKey, hist.slice(0, 8));
}

function chooseQuiz(idx, btnEl) {
  if (!quizCurrent || quizLocked) return;
  quizLocked = true;

  quizTotal += 1;

  const buttons = Array.from(quizOptions.querySelectorAll(".quizOptBtn"));
  const correctIdx = quizCurrent.a;

  if (idx === correctIdx) {
    quizCorrect += 1;
    btnEl.classList.add("correct");
    quizFeedback.textContent = "Верно ✅";
    showCelebrateAsync();
  } else {
    btnEl.classList.add("wrong");
    buttons[correctIdx]?.classList.add("correct");
    quizFeedback.textContent = "Не совсем 🙂";
  }

  updateQuizScore();
}

function resetQuiz() {
  quizCorrect = 0;
  quizTotal = 0;
  quizCurrent = null;
  quizLocked = false;
  updateQuizScore();
  renderQuizQuestion();

  const level = getQuizLevel();
  localStorage.removeItem(quizHistKey(level));
}

// ===== Events =====
// tabs
tabSchedule.addEventListener("click", () => showTab("schedule"));
tabWishes.addEventListener("click", () => showTab("wishes"));
tabSettings.addEventListener("click", () => showTab("settings"));

// week switch
weekOddBtn.addEventListener("click", () => setWeek("odd"));
weekEvenBtn.addEventListener("click", () => setWeek("even"));

// settings actions
addClassBtn.addEventListener("click", openAddClass);
classForm.addEventListener("submit", (e) => { e.preventDefault(); saveClassFromForm(); });

clearAllBtn.addEventListener("click", () => {
  if (!confirm("Точно очистить всё расписание?")) return;
  localStorage.removeItem(K_CLASSES);
  renderAll();
});

csvInput.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const parsed = parseCSV(text);
    const classes = loadJSON(K_CLASSES, []);
    parsed.forEach(x => classes.push(x));
    saveJSON(K_CLASSES, classes);
    alert(`Импортировано: ${parsed.length}`);
    renderAll();
  } catch (err) {
    alert(String(err?.message || err));
  } finally {
    e.target.value = "";
  }
});

// wishes
newWishBtn.addEventListener("click", setNewWish);

// memory
memoryStartBtn.addEventListener("click", () => { if (!memActive) memoryStart(); });
memoryResetBtn.addEventListener("click", memoryReset);

// quiz
quizNextBtn.addEventListener("click", nextQuiz);
quizResetBtn.addEventListener("click", resetQuiz);
quizEasyBtn?.addEventListener("click", () => setQuizLevel("easy"));
quizMedBtn?.addEventListener("click", () => setQuizLevel("medium"));
quizHardBtn?.addEventListener("click", () => setQuizLevel("hard"));

// ===== Init =====
function init() {
  seedDefaultScheduleIfEmpty();

  // авто-неделя: если режим auto — ставим неделю сами
  if (getWeekMode() === "auto") {
    localStorage.setItem(K_WEEK, weekFromAnchor(new Date()));
  }

  updateWeekUI();
  renderAll();
  showTab("schedule");

  setNewWish();
  memoryReset();

  updateQuizLevelUI();
  resetQuiz();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}
init();