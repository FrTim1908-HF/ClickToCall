chrome.storage.sync.get(["link"])
	.then((result) => {
  		var link = result.link
		document.getElementById(link).checked = true
	});

const saveOptions = () => {
	const link = document.querySelector('input[name="link"]:checked').value;
	chrome.storage.sync.clear();
	chrome.storage.sync.set(
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