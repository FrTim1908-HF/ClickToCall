var phonenumber = ""
var link = ""
chrome.storage.sync.get(["link"])
	.then((result) => {
  		link = result.link
		
	});

async function call(){
	var phonenumber = "";
	await navigator.clipboard.readText().then((text) => {
	phonenumber = text;
	console.log(text);
	});
	phonenumber = phonenumber.replace(/\s+/g, '');
	console.log(phonenumber)
	const status = document.getElementById('status');
	status.textContent = 'Calling: ' + phonenumber;
	if(phonenumber.startsWith("+")){
	phonenumber = phonenumber.slice(1)
	}
	http = ''

	if(link == "10.50.103.234"){
		http = 'https://'
	}
	else {
		http = 'http://'
	}
	baseUrl = http + link +'/servlet?number=' + phonenumber;
	const username = 'user';
	const password = 'user';
	const headers = new Headers({
        	'Authorization': 'Basic ' + btoa(username + ':' + password) // Encode credentials
    	});

    try {
        const response = await fetch(baseUrl, { method: 'GET', headers });

        if (response.status === 403) {
            status.textContent = "Call failed: Access forbidden (403).";
            console.error("Error 403: Forbidden");
            return;
        } else if (!response.ok) {
            status.textContent = `Call failed: ${response.status} ${response.statusText}`;
            console.error(`Error ${response.status}: ${response.statusText}`);
            return;
        }

        // Als geen fout, ga door met de daadwerkelijke oproep
        document.location.href = baseUrl;
    } catch (error) {
        status.textContent = "Call failed: Network error.";
        console.error("Network error:", error);
    }
}
async function endCall(){
	const url = http + 'user:user@'+link+'/servlet?key=X'
	const status = document.getElementById('status');
	status.textContent = 'Call cancelled..';
	console.log(url)
	document.location.href=url
	}

document.getElementById('call').addEventListener('click', call);
document.getElementById('endCall').addEventListener('click', endCall);