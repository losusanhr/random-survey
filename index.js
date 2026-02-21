const urls = window.SURVEY_URLS;

if (!Array.isArray(urls) || urls.length < 2) {
  document.body.innerText = "URLs not found. Please check url.js";
  return;
}
  const chosenUrl = urls[nextTurn];
  sessionStorage.setItem(ENTRY_KEY, chosenUrl);
  window.location.replace(chosenUrl);
})();
