

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
// Installing the example
//================================================================


/**
 * Install the example to the project.
 *
 */


/**
 * The directories
 *
 */
let

	/**
	 * The source directory (the module's "example/source" directory).
	 *
	 * @type {string}
	 */
	sourceDirectory = __dirname + '/source/',


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
 * Copy the example into the project's root directory.
 *
 */

 fs.copySync(
 	sourceDirectory,
 	targetDirectory,
 	{overwrite: force}
 );
