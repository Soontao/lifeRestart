import App from '../src/app.js';

globalThis.$$eventMap = new Map();
globalThis.$$event = (tag, data) => {
    const listener = $$eventMap.get(tag);
    if (listener) listener.forEach(fn => fn(data));
}
globalThis.$$on = (tag, fn) => {
    let listener = $$eventMap.get(tag);
    if (!listener) {
        listener = new Set();
        $$eventMap.set(tag, listener);
    }
    listener.add(fn);
}
globalThis.$$off = (tag, fn) => {
    const listener = $$eventMap.get(tag);
    if (listener) listener.delete(fn);
}

globalThis.json = async fileName => (await import(`../data/${fileName}.json`)).default

// Pssst, I've created a github package - https://github.com/brookesb91/dismissible
globalThis.hideBanners = (e) => {
    document
        .querySelectorAll(".banner.visible")
        .forEach((b) => b.classList.remove("visible"));
};

if ('serviceWorker' in navigator) {
    if (['localhost', '127.0.0.1'].indexOf(location?.hostname) < 0) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('./sw.js', { scope: '.' })
                .then(function (registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function (err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }
}

const app = new App();
app.initial();