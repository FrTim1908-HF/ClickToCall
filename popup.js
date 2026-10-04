var link = "";
chrome.storage.local.get(["link"], (result) => {
    link = result.link;
});

async function call(){
    var phonenumber = "";
    await navigator.clipboard.readText().then((text) => {
        phonenumber = text;
        console.log(text);
    });
    phonenumber = phonenumber.replace(/\s+/g, '');
    
    const status = document.getElementById('status');
    status.textContent = 'Calling: ' + phonenumber;
    
    if(phonenumber.startsWith("+")){
        phonenumber = phonenumber.slice(1);
    }

    const baseUrl = `http://${link}/servlet?number=${phonenumber}`;

    // Stuur de belfunctie door naar background.js
    chrome.runtime.sendMessage({ action: "makeCall", url: baseUrl }, (response) => {
        if (chrome.runtime.lastError) {
            status.textContent = "Call failed: Extension error.";
            return;
        }
        
        if (response && response.success) {
            status.textContent = "Bellen gestart!";
        } else if (response && response.status === 403) {
            status.textContent = "Call failed: Access forbidden (403).";
        } else {
            status.textContent = `Call failed: ${response?.statusText || "Network error"}`;
        }
    });
}

async function endCall(){
    const status = document.getElementById('status');
    status.textContent = 'Call cancelled..';
    
    const cancelUrl = `http://${link}/servlet?key=X`;

    // Stuur de ophangfunctie door naar background.js
    chrome.runtime.sendMessage({ action: "cancelCall", url: cancelUrl }, (response) => {
        if (!response || !response.success) {
            console.error("Fout bij ophangen via achtergrond script.");
        }
    });
}

document.getElementById('call').addEventListener('click', call);
document.getElementById('endCall').addEventListener('click', endCall);
