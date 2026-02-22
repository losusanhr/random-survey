function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

function normalizeExclude(raw) {

  if (!raw) return null;

  const v = String(raw).trim().toUpperCase();

  if (v === "A" || v === "P1") return "A";
  if (v === "B" || v === "P2") return "B";

  return null;
}

(function main() {

  const list = window.SURVEY1;

  if (!Array.isArray(list)) {
    document.body.innerText = "SURVEY1 未設定";
    return;
  }

  const exclude = normalizeExclude(getParam("exclude"));

  const pool = list.filter(x => x.key !== exclude);

  if (pool.length === 0) {
    document.body.innerText = "沒有可用版本";
    return;
  }

  const chosen = pool[randInt(pool.length)];

  location.replace(chosen.url);

})();
