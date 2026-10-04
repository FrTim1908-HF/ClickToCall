chrome.storage.local.get(["link"])
	.then((result) => {
  		var link = result.link
		document.getElementById(link).checked = true
	});

const saveOptions = () => {
	const link = document.querySelector('input[name="link"]:checked').value;
	chrome.storage.local.clear();
	chrome.storage.local.set(
	{"link": link},
	() => {
		const status = document.getElementById('status');
		status.textContent = 'Options saved';
		console.log('Options saved');
		setTimeout(() => {
			status.textContent = '';
		}, 750);
	}
	);
};

document.getElementById('save').addEventListener('click', saveOptions);