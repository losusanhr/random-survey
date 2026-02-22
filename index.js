(function () {

  const surveys = [

    "https://www.surveycake.com/s/QOONA",
    "https://www.surveycake.com/s/AdBOR"

  ];

  // ⭐ 只在第一次進入才分流
  if (sessionStorage.getItem("enteredSurvey")) return;

  sessionStorage.setItem("enteredSurvey", "1");

  const chosen = surveys[Math.floor(Math.random() * surveys.length)];

  location.replace(chosen);

})();
