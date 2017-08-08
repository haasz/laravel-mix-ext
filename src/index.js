

//----------------------------------------------------------------
// The imports
//----------------------------------------------------------------


/**
 * Laravel Mix
 *
 * @type {Object}
 */
let mix = require('laravel-mix');


/**
 * File system with extra methods
 *
 * @type {Object}
 */
let fs = require('fs-extra');


/**
 * Path
 *
 * @type {Object}
 */
let path = require('path');


/**
 * Escape string to RegExp
 *
 * @type {Function}
 */
let escapeStringRegExp = require('escape-string-regexp');




//================================================================
// The Extension of Laravel Mix
//================================================================



//----------------------------------------------------------------
// Auto versioning
//----------------------------------------------------------------


/**
 * Set auto versioning.
 * If the running is in hot mode then the versioning is OFF, otherwise is ON.
 *
 */
if (!process.argv.includes('--hot')) {
	mix.version();
}



//----------------------------------------------------------------
// The mix.browserSync() method
//----------------------------------------------------------------


/**
 * Modify the default configuration of mix.browserSync() method.
 *
 */


/**
 * The original browserSync function.
 *
 * @type {Function}
 */
let browserSync = mix.browserSync;


/**
 * Enable Browsersync support for the project.
 * Call the original browserSync method with the new default or the specified custom configuration.
 *
 * @this mix
 *
 * @param  {string|Object} config The custom configuration.
 *
 * @return {Object}               The "this" (to chaining), that is the mix object.
 */
mix.browserSync = function (config) {
	return browserSync.call(
		this,
		Object.assign(
			// Watch files
			{ files: [mix.config.publicPath + '/**/*'] },
			// Service
			process.argv.includes('--hot')
				? { proxy: typeof config === 'string' ? config : 'localhost:8080' }
				: {
					proxy: undefined,
					server: { baseDir: [mix.config.publicPath] }
				}
			,
			// Custom options
			config && typeof config === 'object' ? config : {}
		)
	);
};



//--------------------------------
// The mix.out() method
//--------------------------------


/**
 * The default settings of the output directories (images and fonts).
 *
 * @default
 *
 * @type {Object}
 */
mix.config.out = {
	images: {
		directory: 'images',
		extensions: ['png', 'jpe?g', 'gif']
	},
	fonts: {
		directory: 'fonts',
		extensions: ['woff2?', 'ttf', 'eot', 'svg', 'otf']
	}
};


/**
 * Set the output directories (modify the default settings).
 *
 * @this mix
 *
 * @param  {Object} options The custom settings.
 *
 * @return {Object}         The "this" (to chaining), that is the mix object.
 */
mix.out = function (options) {
	if (
		options
		&&
		(typeof options === 'object' || typeof options === 'function')
	) {
		for (let key in mix.config.out) {
			if (mix.config.out.hasOwnProperty(key)) {
				setOutProperty(key, options);
			}
		}
	}
	return this;
};


/**
 * Set a property (which corresponds to an output directory) of mix.config.out object.
 *
 * @param {string} key     The name of property.
 * @param {Object} options The custom settings.
 */
function setOutProperty(key, options) {
	if (options[key]) {
		// Directory
		let directory = (
			typeof options[key] === 'string' && options[key]
			||
			!Array.isArray(options[key]) && options[key].directory
		);
		if (directory) {
			mix.config.out[key].directory = '' + directory;
		}
		// Extensions
		let extensions = (
			Array.isArray(options[key]) && options[key]
			||
			Array.isArray(options[key].extensions) && options[key].extensions
		);
		if (extensions) {
			for (let k in mix.config.out) {
				if (mix.config.out.hasOwnProperty(k)) {
					mix.config.out[k].extensions = arraySubtraction(
						mix.config.out[k].extensions,
						extensions
					);
				}
			}
			mix.config.out[key].extensions =
				mix.config.out[key].extensions.concat(extensions)
			;
		}
	}
}


/**
 * Array subtraction.
 *
 * @param  {Array} arrA The minuend array.
 * @param  {Array} arrB The subtrahend array.
 *
 * @return {Array}      The difference array.
 */
function arraySubtraction(arrA, arrB) {
	arrA = arrA.slice();
	for (let i = 0; i < arrB.length; ++i) {
		arrA = arrA.filter(function (value) {
			return value !== arrB[i];
		});
	}
	return arrA;
}



//----------------------------------------------------------------
// The mix.tpl() method
//----------------------------------------------------------------


/**
 * Templates
 *
 * @type {Object}
 */
var templates = {};


/**
 * Add a template file to template processing and specify the target file.
 *
 * @this mix
 *
 * @param  {string} src    The source template file.
 * @param  {string} target The compiled target file.
 *
 * @return {Object}        The "this" (to chaining), that is the mix object.
 */
mix.tpl = function (src, target) {
	templates[src] = target;
	return this;
};


/**
 * Auxiliary variables and RegExp strings for the processing of template tags.
 * A template tag is {{ mix('path/of/file') }} or {{ mix("path/of/file") }}.
 *
 */
let

	/**
	 * The prefix of RegExp strings.
	 *
	 * @type {string}
	 */
	prefix = '\\{\\{\\s*mix\\s*\\(\\s*',


	/**
	 * The suffix of RegExp strings.
	 *
	 * @type {string}
	 */
	suffix = '\\s*\\)\\s*\\}\\}',


	/**
	 * The array of quotes.
	 *
	 * @type {string[]}
	 */
	quotes = ['"', "'"],


	/**
	 * The RegExp string of quotes.
	 *
	 * @type {string}
	 */
	quotesRegExpStr = '[' + quotes.join('') + ']',


	/**
	 * The RegExp string of template tag.
	 *
	 * @type {string}
	 */
	tplTagRegExpStr = getTplTagRegExpStr(),


	/**
	 * The RegExp string of path in template tag.
	 *
	 * @type {string}
	 */
	tplTagPathRegExpStr = getTplTagPathRegExpStr(),


	/**
	 * The number of parts of the RegExp string of template tag.
	 *
	 * @type {integer}
	 */
	numberOfTplTagRegExpParts = 2 * quotes.length + 1

;


/**
 * Get the part of RegExp string of template tag.
 *
 * @param  {string} quote The quote.
 *
 * @return {string}       The part of RegExp string of template tag.
 */
function getTplTagRegExpStrPart(quote) {
	return (
		prefix + quote
		+ '(([^\\\\' + quote + ']|\\\\.)*)'
		+ quote + suffix
	);
}


/**
 * Get the RegExp string of template tag.
 *
 * @return {string} The RegExp string of template tag.
 */
function getTplTagRegExpStr() {
	return '(' + quotes.map(getTplTagRegExpStrPart).join('|') + ')';
}


/**
 * Get the RegExp string of path in template tag.
 *
 * @return {string} The RegExp string of path in template tag.
 */
function getTplTagPathRegExpStr() {
	return (
		'^'
		+ prefix + quotesRegExpStr
		+ '(.*)'
		+ quotesRegExpStr + suffix
		+ '$'
	);
}


/**
 * Get the directory of file from public path.
 *
 * @param  {Object} file The file.
 * @return {string}      The directory of file from public path.
 */
function getDirFromPublicPath(file) {
	return path.dirname(
		file.path().replace(
			new RegExp(
				'^' + escapeStringRegExp(path.resolve(mix.config.publicPath))
			),
			''
		)
	);
}


/**
 * Replace a template tag.
 *
 * @param  {string} dirFromPublicPath The directory of the file that contains the template tag.
 * @param  {string} tag               The template tag.
 * @param  {Object} replacements      The replacements.
 *
 * @return {string}                   The replaced (or original) template tag.
 */
function replaceTplTag(dirFromPublicPath, tag, replacements) {
	let tagPath = tag.replace(new RegExp(tplTagPathRegExpStr), '$1');
	let tagPathFromPublicPath = path.resolve(dirFromPublicPath, tagPath);
	if (
		tagPathFromPublicPath in replacements
		&&
		replacements.hasOwnProperty(tagPathFromPublicPath)
	) {
		return (
			path.isAbsolute(tagPath)
				? replacements[tagPathFromPublicPath]
				: path.relative(
					dirFromPublicPath,
					replacements[tagPathFromPublicPath]
				)
		);
	}
	return tag;
}


/**
 * Get the compiled content of template file.
 *
 * @param  {Object}   file         The template file.
 * @param  {string[]} fragments    The content fragments.
 * @param  {string[]} tags         The template tags in original content.
 * @param  {Object}   replacements The replacements.
 *
 * @return {string}                The compiled content.
 */
function getCompiledContent(file, fragments, tags, replacements) {
	let content = '';
	let fragmentStep = numberOfTplTagRegExpParts + 1;
	let dirFromPublicPath = getDirFromPublicPath(file);
	let i = 0;
	for (; i < tags.length; ++i) {
		content += fragments[i * fragmentStep];
		content += replaceTplTag(dirFromPublicPath, tags[i], replacements);
	}
	content += fragments[i * fragmentStep];
	return content;
}


/**
 * Compile the template file.
 *
 * @param  {string} file         The template file.
 * @param  {Object} replacements The replacements.
 */
function compileTemplate(file, replacements) {
	file = mix.config.File.find(path.resolve(file));
	let content = file.read();
	let tags = content.match(new RegExp(tplTagRegExpStr, 'g'));
	if (tags && tags.length) {
		content = getCompiledContent(
			file,
			content.split(new RegExp(tplTagRegExpStr)),
			tags,
			replacements
		);
		file.write(content);
	}
}


/**
 * Process the template files.
 *
 */
function processTemplates() {
	var replacements = mix.config.manifest.get();
	for (let template in templates) {
		if (templates.hasOwnProperty(template)) {
			// Copy to target
			fs.copySync(template, templates[template]);
			// Compile
			compileTemplate(templates[template], replacements);
		}
	}
}


/**
 * Set the template processing.
 *
 */
mix.then(function () {
	processTemplates();
	switch (true) {
		// Watch mode
		case process.argv.includes('--watch'):
			// Watch manifest file
			mix.config.File.find(
				mix.config.manifest.path
			).watch(
				processTemplates
			);
		// Watch or Hot mode (no break, falls through)
		case process.argv.includes('--hot'):
			// Watch template files
			for (let template in templates) {
				mix.config.File.find(
					template
				).watch(
					processTemplates
				);
			}
			break;
		// Default
		default:
			break;
	}
});



//----------------------------------------------------------------
// The exports
//----------------------------------------------------------------


/**
 * The extended Laravel Mix.
 *
 * @type {Object}
 */
module.exports = mix;
