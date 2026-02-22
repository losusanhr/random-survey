// index.js

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

function normalizeExclude(raw) {
  if (!raw) return null;

  const v = String(raw).trim().toUpperCase();

  if (v === "A" || v === "ADBOR") return "A";
  if (v === "B" || v === "QOONA") return "B";

  return null;
}

(function main() {

  const list = window.SURVEY1;

  if (!Array.isArray(list) || list.length === 0) {
    document.body.innerText = "SURVEY1 未設定";
    return;
  }

  const exclude = normalizeExclude(getParam("exclude"));

  const pool = list.filter(x => x.key !== exclude);

  if (pool.length === 0) {
    document.body.innerText = "沒有可用版本（exclude 設定錯誤）";
    return;
  }

  const chosen = pool[randInt(pool.length)];

  const url = new URL(chosen.url);
  url.searchParams.set("ver", chosen.key);

  location.replace(url.toString());

})();
