

//----------------------------------------------------------------
// The imports
//----------------------------------------------------------------


/**
 * The Extension of Laravel Mix
 *
 * The Laravel Mix provides a clean, fluent API for defining basic webpack build steps for your web application.
 * The Laravel Mix supports several common CSS and JavaScript preprocessors.
 * @see [Laravel Mix]{@link https://github.com/JeffreyWay/laravel-mix}
 *
 * The Extensions of Laravel Mix adds and modifies methods and presets to Laravel Mix.
 * Its use is recommended for those developments which are stand-alone (not Laravel) projects.
 * @see [The Extensions of Laravel Mix]{@link https://gitlab.com/haasz/laravel-mix-ext}
 *
 * @type {Object}
 */
let mix = require('laravel-mix-ext');




//================================================================
// The custom settings
//================================================================


/**
 * Example settings for development of a general web application.
 *
 */
mix
	.setPublicPath(                         'dist'            )
	.js           ( 'src/js/script.js'    , 'dist/js/'        )
	.sass         ( 'src/scss/style.scss' , 'dist/css/'       )
	.tpl          ( 'src/index.html'      , 'dist/index.html' )
	.browserSync  () // Call it only after calling mix.setPublicPath()!
;




//----------------------------------------------------------------
// The full API
//----------------------------------------------------------------


/*

mix

	.js(src, output)

	.react(src, output) // Identical to mix.js(), but registers React Babel compilation.

	.extract(vendorLibs)

	.sass(src, output)

	.less(src, output)

	.stylus(src, output)

	.tpl(src, target) // Added by The Extension of Laravel Mix.

	.browserSync('my-site.dev') // Call it only after calling mix.setPublicPath()! Modified by The Extension of Laravel Mix.

	.combine(files, destination)

	.babel(files, destination) // Identical to mix.combine(), but also includes Babel compilation.

	.copy(from, to)

	.minify(file)

	.sourceMaps() // Enable sourcemaps

	// Auto versioning turned ON (except hot mode) by The Extension of Laravel Mix. Its use is unnecessary:
	// .version() // Enable versioning.

	.disableNotifications()

	.setPublicPath('path/to/public')

	.setResourceRoot('prefix/for/resource/locators')

	.autoload({}) // Will be passed to Webpack's ProvidePlugin.

	.webpackConfig({}) // Override webpack.config.js, without editing the file directly.

	.then(function () {}) // Will be triggered each time Webpack finishes building.

	.options({

		extractVueStyles: false, // Extract .vue component styling to file, rather than inline.

		processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.

		uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin

		postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md

	})

;

*/
