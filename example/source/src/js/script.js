

// Custom example code

document
	.querySelector('#my-web-application')
	.appendChild(
		document.createElement('h1')
	)
	.innerHTML =
		'Hello, World!'
			.split('')
			.map(value => `<span>${value}</span>`)
			.join('')
;
