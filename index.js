// index.js
// 隨機分派入口

(function () {

  const urls = window.SURVEY_URLS;

  // 安全檢查
  if (!Array.isArray(urls) || urls.length === 0) {
    document.body.innerText = "URLs not found. Please check url.js";
    return;
  }

  // 隨機選一個
  const randomIndex = Math.floor(Math.random() * urls.length);
  const chosenUrl = urls[randomIndex];

  // 跳轉
  window.location.replace(chosenUrl);

})();
