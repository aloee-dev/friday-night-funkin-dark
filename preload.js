const version = "0.0.0";
let assets = [];
let loaded = 0;
const assetCache = {};

const CSS_VARIABLE_MAPS = {
    "loading-song.png": "--bg-loading-song",
    "glow-boyco.png": "--img-glow-boyco",
    "boyco.png": "--img-boyco",
    "bar-glow.png": "--img-bar-glow",
    "bar-1.png": "--img-bar-1",
    "bar-2.png": "--img-bar-2",
    "bar-3.png": "--img-bar-3",
    "bar-4.png": "--img-bar-4",
    "bar-5.png": "--img-bar-5",
    "bar-6.png": "--img-bar-6",

    "play.png": "--btn-play",
    "play-hover.png": "--btn-play-hover",
    "continue.png": "--btn-continue",
    "continue-hover.png": "--btn-continue-hover",
    "settings.png": "--btn-settings",
    "settings-hover.png": "--btn-settings-hover",
    "credits.png": "--btn-credits",
    "credits-hover.png": "--btn-credits-hover",

    "resume.png": "--btn-resume",
    "resume-selected.png": "--btn-resume-selected",
    "restart.png": "--btn-restart",
    "restart-selected.png": "--btn-restart-selected",
    "exit.png": "--btn-exit",
    "exit-selected.png": "--btn-exit-selected"
};

async function addAssets() {
    try {
        const response = await fetch('data/assets.json');
        assets = await response.json();
    } catch (error) {
        console.error("Failed to load files:", error);
        alert("Failed to load files: " + error);
    }
}

function preloadAsset(src) {
    return new Promise((resolve) => {
        if (src.endsWith(".m4a") || src.endsWith(".mp3") || src.endsWith(".wav")) {
            const audio = new Audio();
            audio.oncanplaythrough = () => {
                assetCache[src] = audio;
                resolve(audio);
            };
            audio.src = src;
            audio.load();
            return;
        }

        const img = new Image();
        img.src = src;

        img.onload = () => {
            img.decode()
                .then(() => {
                    assetCache[src] = img;
                    resolve(img);
                })
                .catch(() => {
                    assetCache[src] = img;
                    resolve(img);
                });
        };

        img.onerror = () => {
            console.error(`Failed to load structural asset: ${src}`);
            resolve(img);
        };
    });
}

async function preloadAll() {
    const progressBar = document.getElementById("progress-bar");
    const gameViewport = document.getElementById("game-viewport");

    const promises = assets.map(async (src) => {
        const element = await preloadAsset(src);
        
        loaded++;
        const percent = Math.floor((loaded / assets.length) * 100);
        if (progressBar) progressBar.style.width = percent + "%";

        const fileName = src.split('/').pop();
        const varName = CSS_VARIABLE_MAPS[fileName];

        if (varName) {
            document.documentElement.style.setProperty(varName, `url('${src}')`);
        }

        if (src.includes("sprites/")) {
            const id = src.split('/').pop().split('.')[0]; 
            element.id = id; 
            element.className = "char"; 
            if (gameViewport) gameViewport.appendChild(element);
        }

        return element;
    });

    await Promise.all(promises);

    const loadingText = document.getElementById("loading-text");
    if (loadingText) loadingText.textContent = "LOADED!";
    
    await new Promise(r => setTimeout(r, 1000));

    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) loadingScreen.style.opacity = 0;
    setTimeout(showDisclaimer, 1000);
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        const gameViewport = document.getElementById("game-viewport");
        if (!gameViewport) return;
        
        gameViewport.style.willChange = "transform, opacity";

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                gameViewport.style.willChange = "auto";
            });
        });
    }
});

async function findAndPreload() {
    await addAssets();
    await preloadAll();
}
