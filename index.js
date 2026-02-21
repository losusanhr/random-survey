// index.js
// 功能：
// 1) 支援 ?exclude=QOONA 或 ?exclude=AdBOR：避開已滿版本（failover）
// 2) 沒有 exclude 時用「輪流分派」讓分配更平均（比純 random 更穩）
// 3) sticky assignment：同一位受試者刷新不會一直換版本

// 你在 url.js 裡維持這兩個順序即可：
// 0 = AdBOR, 1 = QOONA
// const urls = ['...AdBOR', '...QOONA'];

(function () {
  const ENTRY_KEY = "sc_assigned_url_v1";
  const TURN_KEY = "sc_turn_v1";

  // 讀取 exclude 參數
  const params = new URLSearchParams(window.location.search);
  const exclude = params.get("exclude"); // "QOONA" or "AdBOR" or null

  // 建立名稱到索引的 mapping（依你 url.js 的順序）
  const nameToIndex = {
    "AdBOR": 0,
    "QOONA": 1
  };

  // 取得 urls（從 url.js 來）
  if (!Array.isArray(window.urls) || window.urls.length < 2) {
    // 保底：如果 urls 沒載入成功
    document.body.innerText = "URLs not found. Please check url.js";
    return;
  }

  const urls = window.urls;

  // 1) 若有 exclude：直接選另一個（failover）
  if (exclude && exclude in nameToIndex) {
    const exIdx = nameToIndex[exclude];
    const pickIdx = exIdx === 0 ? 1 : 0;

    // 覆蓋 sticky，避免卡住
    sessionStorage.setItem(ENTRY_KEY, urls[pickIdx]);
    window.location.replace(urls[pickIdx]);
    return;
  }

  // 2) 沒有 exclude：sticky assignment（同一位受試者固定版本）
  const existing = sessionStorage.getItem(ENTRY_KEY);
  if (existing && urls.includes(existing)) {
    window.location.replace(existing);
    return;
  }

  // 3) 沒有 sticky：用「輪流分派」讓分配更平均
  // turn = 0 -> AdBOR, turn = 1 -> QOONA, 然後交替
  const lastTurnRaw = localStorage.getItem(TURN_KEY);
  const lastTurn = lastTurnRaw === null ? -1 : parseInt(lastTurnRaw, 10);
  const nextTurn = lastTurn === 0 ? 1 : 0;

  localStorage.setItem(TURN_KEY, String(nextTurn));

  const chosenUrl = urls[nextTurn];
  sessionStorage.setItem(ENTRY_KEY, chosenUrl);
  window.location.replace(chosenUrl);
})();
