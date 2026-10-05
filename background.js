// 1. Luister naar inlogverzoeken van de Yealink telefoons en vul de gegevens automatisch in
chrome.webRequest.onAuthRequired.addListener(
    function(details, callbackFn) {
        callbackFn({
            authCredentials: {
                username: "user", // Let op: controleer of je 'admin' of 'user' moet gebruiken
                password: "user"
            }
        });
    },
    { urls: [
    "http://10.50.24.231/*",
    "http://10.50.24.232/*",
    "http://10.50.24.233/*",
    "http://10.50.24.234/*",
    "http://10.50.24.236/*",
    "http://10.50.24.237/*"
    ] }, 
    ["asyncBlocking"] // Verplicht voor Manifest V3
);

// 2. Luister naar opdrachten vanuit popup.js om een gesprek te starten of te stoppen
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "makeCall" || message.action === "cancelCall") {
        
        fetch(message.url, { method: 'GET' })
            .then(response => {
                if (response.ok) {
                    sendResponse({ success: true });
                } else {
                    sendResponse({ success: false, status: response.status, statusText: response.statusText });
                }
            })
            .catch(error => {
                sendResponse({ success: false, error: error.message });
            });
            
        return true; // Houdt het berichtenkanaal open voor de asynchrone sendResponse
    }
});