// index.js

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function genPID() {
  return `P${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function buildUrl(baseUrl, paramsObj) {
  const u = new URL(baseUrl);
  Object.entries(paramsObj).forEach(([k, v]) => {
    if (v !== null && v !== undefined && v !== "") u.searchParams.set(k, v);
  });
  return u.toString();
}

(function main() {
  // 1) PID：優先取網址 pid，其次 localStorage，否則新產生
  // （注意：我們對外仍用 pid 當測試參數，但送去 SurveyCake 會用 aka_pid）
  let pid = getParam("pid") || localStorage.getItem("pid");
  if (!pid) pid = genPID();
  localStorage.setItem("pid", pid);

  // 2) 取得問卷清單（來自 url.js）
  const list = window.SURVEY_URLS;
  if (!Array.isArray(list) || list.length === 0) {
    document.body.innerText = "SURVEY_URLS 未設定或為空，請檢查 url.js";
    return;
  }

  // 3) 隨機選一個版本
  const idx = Math.floor(Math.random() * list.length);
  const chosen = list[idx]; // { ver: "A"/"B", url: "..." }

  // 4) 組問卷1網址（帶 aka_pid + ver + stage=1）
  const target = buildUrl(chosen.url, {
    aka_pid: pid,      // ✅ 對應 SurveyCake 的 aka_pid 欄位
    ver: chosen.ver,   // ✅ 記錄版本
    stage: "1"         // ✅ 記錄是第1份問卷
  });

  // 5) 轉跳
  location.replace(target);
})();
