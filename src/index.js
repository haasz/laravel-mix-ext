// Laravel Mix
let mix = require('laravel-mix');
// File system with extra methods
let fs = require('fs-extra');
// Path
let path = require('path');
// Escape string to RegExp
let escapeStringRegExp = require('escape-string-regexp');

// Extended Laravel Mix
module.exports = (function (mix) {

	// Templates
	var templates = {};

	// Add template
	mix.tpl = function (src, target) {
		templates[src] = target;
		return this;
	};

	// Patterns
	let prefix = '\\{\\{\\s*mix\\s*\\(\\s*';
	let postfix = '\\s*\\)\\s*\\}\\}';
	let quotes = ['"', "'"];
	let quotesRegExpStr = '[' + quotes.join('') + ']';
	let tplTagRegExpStr = getTplTagRegExpStr();
	let tplTagPathRegExpStr = getTplTagPathRegExpStr();
	let numberOfTplTagRegExpParts = 2 * quotes.length + 1;

	// Get part of template tag RegExp string
	function getTplTagRegExpStrPart(quote) {
		return (
			prefix + quote
			+ '(([^\\\\' + quote + ']|\\\\.)*)'
			+ quote + postfix
		);
	}

	// Get template tag RegExp string
	function getTplTagRegExpStr() {
		return '(' + quotes.map(getTplTagRegExpStrPart).join('|') + ')';
	}

	// Get template tag path RegExp string
	function getTplTagPathRegExpStr() {
		return (
			'^'
			+ prefix + quotesRegExpStr
			+ '(.*)'
			+ quotesRegExpStr + postfix
			+ '$'
		);
	}

	// Get directory of template file from public path
	function getTplDirFromPublic(file) {
		return path.dirname(
			file.path().replace(
				new RegExp('^' + escapeStringRegExp(path.resolve(mix.config.publicPath))),
				''
			)
		);
	}

	// Replace a template tag in file
	function replaceTplTag(tplDirFromPublic, tplTag, replacement) {
		let tplTagPath = tplTag.replace(new RegExp(tplTagPathRegExpStr), '$1');
		let tplTagFromPublic = path.resolve(tplDirFromPublic, tplTagPath);
		if (tplTagFromPublic in replacement && replacement.hasOwnProperty(tplTagFromPublic)) {
			return (
				path.isAbsolute(tplTagPath)
					? replacement[tplTagFromPublic]
					: path.relative(tplDirFromPublic, replacement[tplTagFromPublic])
			);
		}
		return tplTag;
	}

	// Get replaced template content
	function getReplacedTplContent(file, contentFragments, tplTags, replacement) {
		let content = '';
		let tplDirFromPublic = getTplDirFromPublic(file);
		let contentFragmentStep = numberOfTplTagRegExpParts + 1;
		let i = 0;
		for (; i < tplTags.length; ++i) {
			content += contentFragments[i * contentFragmentStep];
			content += replaceTplTag(tplDirFromPublic, tplTags[i], replacement);
		}
		content += contentFragments[i * contentFragmentStep];
		return content;
	}

	// Replace in file
	function replaceInFile(file, replacement) {
		file = mix.config.File.find(path.resolve(file));
		let content = file.read();
		let tplTags = content.match(new RegExp(tplTagRegExpStr, 'g'));
		if (tplTags && tplTags.length) {
			let contentFragments = content.split(new RegExp(tplTagRegExpStr));
			content = getReplacedTplContent(file, contentFragments, tplTags, replacement);
			file.write(content);
		}
	}

	// Process templates
	function processTemplates() {
		var replacement = mix.config.manifest.get();
		for (let template in templates) {
			if (templates.hasOwnProperty(template)) {
				fs.copySync(template, templates[template]);
				replaceInFile(templates[template], replacement);
			}
		}
	}

	// Set versioning
	if (!process.argv.includes('--hot')) {
		mix.version();
	}

	// Set templates processing
	mix.then(function () {
		processTemplates();
		if (process.argv.includes('--watch')) {
			mix.config.File.find(
				mix.config.manifest.path
			).watch(
				processTemplates
			);
		}
	});

	return mix;

})(mix);
