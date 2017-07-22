// File system with extra methods
let fs = require('fs-extra');


// Set up The Extension of Laravel Mix to the project

(function() {

	// Directories

	// Source directory (module 'setup' directory)
	let sourceDirectory = __dirname + '/';
	// Target directory (project root directory)
	let targetDirectory = __dirname + '/../../../';


	// Force argument
	let force = process.argv.includes('-f');


	// Copy webpack.mix.js and webpack.config.js into project root folder

	fs.copySync(
		sourceDirectory + 'webpack.mix.js',
		targetDirectory + 'webpack.mix.js',
		{overwrite: force}
	);
	fs.copySync(
		sourceDirectory + 'webpack.config.js',
		targetDirectory + 'webpack.config.js',
		{overwrite: force}
	);


	// Set commands (scripts) in package.json

	let packageJsonFile = targetDirectory + 'package.json';
	let scriptsJsonFile = sourceDirectory + 'scripts-to-package.json';

	let packageJson = fs.readJsonSync(
		packageJsonFile
	);

	let scriptsJson = fs.readJsonSync(
		scriptsJsonFile
	);

	// With overwrite
	if (force) {
		packageJson.scripts = Object.assign(
			packageJson.scripts || {},
			scriptsJson.scripts
		);
	}
	// Without overwrite
	else {
		packageJson.scripts = Object.assign(
			scriptsJson.scripts,
			packageJson.scripts || {}
		);
	}

	fs.writeJsonSync(
		packageJsonFile,
		packageJson,
		{spaces: 2}
	);

})();
