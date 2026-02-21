// index.js
// 隨機分派入口 + 額滿避開功能 (?exclude=QOONA 或 ?exclude=AdBOR)

(function () {

  const urls = window.SURVEY_URLS;

  if (!Array.isArray(urls) || urls.length < 2) {
    document.body.innerText = "URLs not found. Please check url.js";
    return;
  }

  // 對應你兩個版本（順序請和 url.js 一致）
  // 0 = AdBOR（無不信任）
  // 1 = QOONA（不信任）
  const nameToIndex = {
    "AdBOR": 0,
    "QOONA": 1
  };

  // 讀取網址參數 exclude
  const params = new URLSearchParams(window.location.search);
  const exclude = params.get("exclude"); // "QOONA" 或 "AdBOR" 或 null

  // 如果有 exclude，就直接選另一個
  if (exclude && (exclude in nameToIndex)) {
    const exIdx = nameToIndex[exclude];
    const pickIdx = exIdx === 0 ? 1 : 0;
    window.location.replace(urls[pickIdx]);
    return;
  }

  // 否則就正常隨機
  const randomIndex = Math.floor(Math.random() * urls.length);
  window.location.replace(urls[randomIndex]);

})();
