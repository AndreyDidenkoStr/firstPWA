if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js")
        .then((reg) => console.log("ServiceWorker registered"))
        .catch((err) => console.error("ServiceWorker error", err));
    });
  }