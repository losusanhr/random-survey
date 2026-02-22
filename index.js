// index.js

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function genPID() {
  return `P${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
}

function buildUrl(baseUrl, paramsObj) {
  const u = new URL(baseUrl);
  Object.entries(paramsObj).forEach(([k, v]) => {
    if (v !== null && v !== undefined && v !== "") u.searchParams.set(k, v);
  });
  return u.toString();
}

(function main() {
  // 1) aka_pid：先取網址，其次 localStorage，否則新產生
  let pid = getParam("aka_pid") || localStorage.getItem("aka_pid");
  if (!pid) pid = genPID();
  localStorage.setItem("aka_pid", pid);

  // 2) 問卷1版本清單
  const list = window.SURVEY1_URLS;
  if (!Array.isArray(list) || list.length === 0) {
    document.body.innerText = "SURVEY1_URLS 未設定或為空，請檢查 url.js";
    return;
  }

  // 3) 隨機挑版本
  const idx = Math.floor(Math.random() * list.length);
  const chosenUrl = list[idx];
  const ver = idx === 0 ? "A" : "B"; // 只是方便你之後分析，可留可不留

  // 4) 導向問卷1（帶 aka_pid）
  const target = buildUrl(chosenUrl, { aka_pid: pid, ver, stage: 1 });

  location.replace(target);
})();
