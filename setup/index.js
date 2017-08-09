

//----------------------------------------------------------------
// The imports
//----------------------------------------------------------------


/**
 * File system with extra methods
 *
 * @type {Object}
 */
let fs = require('fs-extra');




//================================================================
// The setup
//================================================================


/**
 * Set up The Extension of Laravel Mix to the project.
 *
 */


/**
 * The directories
 *
 */
let

	/**
	 * The source directory (the module's "setup" directory).
	 *
	 * @type {string}
	 */
	sourceDirectory = __dirname + '/',


	/**
	 * The target directory (the project's root directory).
	 *
	 * @type {string}
	 */
	targetDirectory = __dirname + '/../../../'

;


/**
 * The force argument.
 *
 * @type {boolean}
 */
let force = process.argv.includes('-f');



/**
 * Copy webpack.mix.js and webpack.config.js files into the project's root directory.
 *
 */

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



/**
 * Set commands (scripts) in package.json.
 *
 */


/**
 * The package and scripts JSONs.
 *
 */
let

	/**
	 * The package.json file.
	 *
	 * @type {string}
	 */
	packageJsonFile = targetDirectory + 'package.json',

	/**
	 * The scripts.json file.
	 *
	 * @type {string}
	 */
	scriptsJsonFile = sourceDirectory + 'scripts-to-package.json',


	/**
	 * The package JSON.
	 *
	 * @type {Object}
	 */
	packageJson = fs.readJsonSync(packageJsonFile),


	/**
	 * The scripts JSON.
	 *
	 * @type {Object}
	 */
	scriptsJson = fs.readJsonSync(scriptsJsonFile)

;


/**
 * Merge the scripts JSON into the package JSON.
 *
 */

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


/**
 * Write back the package JSON into the package.json file.
 *
 */
fs.writeJsonSync(
	packageJsonFile,
	packageJson,
	{spaces: 2}
);
