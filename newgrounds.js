const NG_APP_ID = "idk"; 
const NG_ENC_KEY = "idk";

let ngio = null;
let ngUserLoggedIn = false;

if (window.Newgrounds && window.Newgrounds.io) {
    ngio = new Newgrounds.io.core(NG_APP_ID, NG_ENC_KEY);
    
    ngio.queueComponent("App.checkSession", {}, function(result) {
        if (result.success && result.user) { 
            ngUserLoggedIn = true;
        }
    });
    ngio.executeQueue();
}

const ACHIEVEMENTS = {
    PROLOGUE: { id: "prologue", ng_medal_id: 0 }
};

function unlockAchievement(achievementKey) {
    const ach = ACHIEVEMENTS[achievementKey];
    if (!ach) return;

    let unlockedList = JSON.parse(localStorage.getItem("unlocked_achievements")) || [];
    if (!unlockedList.includes(ach.id)) {
        unlockedList.push(ach.id);
        localStorage.setItem("unlocked_achievements", JSON.stringify(unlockedList));
    }
  
    if (ngio && ngUserLoggedIn) {
        ngio.queueComponent('Medal.unlock', { id: ach.ng_medal_id });
        ngio.executeQueue();
    }
}
