// The Extension of Laravel Mix
let mix = require('laravel-mix-ext');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
	.setPublicPath(                         'dist'            )
	.js(            'src/js/script.js'    , 'dist/js/'        )
	.sass(          'src/scss/style.scss' , 'dist/css/'       )
	.tpl(           'src/index.html'      , 'dist/index.html' )
;

// Full API
// mix
// 	.js(src, output)
// 	.react(src, output) // Identical to mix.js(), but registers React Babel compilation.
// 	.extract(vendorLibs)
// 	.sass(src, output)
// 	.less(src, output)
// 	.stylus(src, output)
// 	.tpl(src, target)
// 	.browserSync('my-site.dev')
// 	.combine(files, destination)
// 	.babel(files, destination) // Identical to mix.combine(), but also includes Babel compilation.
// 	.copy(from, to)
// 	.minify(file)
// 	.sourceMaps() // Enable sourcemaps
// 	.version() // Enable versioning.
// 	.disableNotifications()
// 	.setPublicPath('path/to/public')
// 	.setResourceRoot('prefix/for/resource/locators')
// 	.autoload({}) // Will be passed to Webpack's ProvidePlugin.
// 	.webpackConfig({}) // Override webpack.config.js, without editing the file directly.
// 	.then(function () {}) // Will be triggered each time Webpack finishes building.
// 	.options({
// 		extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
// 		processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
// 		uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
// 		postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// 	})
// ;
