var isDark;

function save(setDark) {
    chrome.storage.local.set({ isDark: setDark });
    isDark = setDark;
}


function darkTheme(theme) {
    if (theme) {
        isDark = false;
        chrome.tabs.insertCSS(null, { file: "dark-theme.css", allFrames:false, runAt:"document_start" });
    }

    else {
        isDark = true;
        chrome.tabs.insertCSS(null, { file: "light-theme.css", allFrames:false, runAt:"document_start" });
    }
    save(theme);
}


function load() {
    chrome.storage.local.get(function(result) {
        if (result.isDark == null) {
            save(false);
            try {
                document.getElementById("themeSwitch").checked = false;
            } catch (TypeError) {}
            isDark = false;
        }
        else {
            try {
                document.getElementById("themeSwitch").checked = result.isDark;
            } catch (TypeError) {}
            isDark = result.isDark;
            darkTheme(isDark);
        }
    });
}


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.startsWith("https://mavicpilots.com")) {
        load();
      }
 }); 

if (document.querySelector(".popup")) {
    load();
    const button = document.querySelector(".button");
    button.addEventListener("click", () => {
        if (document.getElementById("themeSwitch").checked) {
            darkTheme(true);
            isDark = true;
        }
        else {
            darkTheme(false);
            isDark = false;
        }
    })

}