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

	// Subpatterns
	var prefix = '\\{\\{\\s*mix\\s*\\(\\s*';
	var postfix = '\\s*\\)\\s*\\}\\}';
	var quotes = ['"', "'"];

	// Get pattern RegExp
	function getPatternRegExp(pattern) {
		pattern = escapeStringRegExp(pattern);
		return new RegExp(
			(
				'('
				+ prefix + quotes[0] + pattern + quotes[0] + postfix
				+ '|'
				+ prefix + quotes[1] + pattern + quotes[1] + postfix
				+ ')'
			),
			'g'
		);
	}

	// Replace in file
	function replaceInFile(file, replacement) {
		file = mix.config.File.find(path.resolve(file));
		var content = file.read();
		for (let p in replacement) {
			if (replacement.hasOwnProperty(p)) {
				content = content.replace(
					getPatternRegExp(p),
					replacement[p]
				);
			}
		}
		file.write(content);
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
