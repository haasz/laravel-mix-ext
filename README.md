<h1 align="center">
	<a href="https://gitlab.com/haasz/laravel-mix-ext">The Extension of Laravel Mix</a>
</h1>

The [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) provides a clean, fluent API for defining basic webpack build steps for your web application.
The Laravel Mix supports several common CSS and JavaScript preprocessors.

**The Extensions of Laravel Mix** adds and modifies methods and presets to Laravel Mix.
Its use is recommended for those developments which are stand-alone (not Laravel) projects.

<p align="center">
	<a href="https://www.npmjs.com/package/laravel-mix-ext"><img src="https://img.shields.io/npm/v/laravel-mix-ext.svg" alt="npm version"></a>
	<a href="https://www.npmjs.com/package/laravel-mix-ext"><img src="https://img.shields.io/npm/l/laravel-mix-ext.svg" alt="npm license"></a>
	<a href="https://www.npmjs.com/package/laravel-mix-ext"><img src="https://img.shields.io/npm/dt/laravel-mix-ext.svg" alt="npm downloads"></a>
</p>

## Table of contents

- [Compatibility](#compatibility)

- [Installation](#installation)

- [Release notes](#release-notes)

- [License](#license)

<!-- toc -->

## Compatibility

#### With operating systems

##### v1.4.4 – v1.5.3

- Linux
- macOS
- Windows

##### v0.8.0 – v1.4.2

- Linux
- macOS

#### With Laravel Mix versions

##### v1.5.0 – v1.5.3

1.5.1 &le; Laravel Mix version &lt; 1.6.0

##### v1.4.0 – v1.4.5

1.4.2 &le; Laravel Mix version &lt; 1.5.0

##### v0.8.0 – v0.8.13

0.8.8 &le; Laravel Mix version &lt; 0.9.0

## Installation

Requirements:

- Installed [Node.js](https://nodejs.org/)

Create project directory and enter into:

```bash
mkdir my-web-application
cd my-web-application
```

Create and set `package.json` file:

```bash
npm init
```

Install **The Extension of Laravel Mix**:

```bash
npm install laravel-mix-ext --save-dev
```
and set up:

```bash
node node_modules/laravel-mix-ext/setup
```

To surely overwrite any previous settings (for example reinstall), use the force argument (`-f`):

```bash
node node_modules/laravel-mix-ext/setup -f
```

Then specify the project's custom settings in the `webpack.mix.js` file.

An example application (*Hello, World!*) can also be installed with original settings:

```bash
node node_modules/laravel-mix-ext/example
```

The force argument (`-f`) can be used in this case too:

```bash
node node_modules/laravel-mix-ext/example -f
```

Run the project in `dev`, `watch`, `hot` or `production` mode:

```bash
npm run watch
```

<p align="center">
	<img src="./img/hello-world.png" alt="Hello, World!">
</p>

Go for it! Start the development…

## Release notes

##### v1.5.3

Adds an image to the example.

##### v1.5.2

Fixes the template processing setting.

##### v1.5.1

Fixes the template processing setting.

##### v1.5.0

Modifies the Laravel Mix version dependency and rewrites the output configuration management in accordance with the new Laravel Mix options (`fileLoaderDirs`).

Modifies the setup (`scripts-to-package.json`) according to the new recommendation.

##### v1.4.5

Modifies the Laravel Mix version dependency.

##### v1.4.4

Adds Windows operating system support.
Previous versions are only compatible with POSIX operating systems (Linux, macOS, etc.).

##### v1.4.2

Adds the `browser-sync` and the `browser-sync-webpack-plugin` packages to dependencies.

Improves the `setPublicPath()` method.

##### v1.4.1

Modifies the original `mix.setPublicPath()` method:
If the public directory does not exist yet, it will create it.

##### v1.4.0

The code is rewrited to use the current version of Laravel Mix.

##### v0.8.13

Adds an example application (*Hello, World!*) and the description of its installation.

##### v0.8.12

Extends the Laravel Mix with `.out()` method for the setting of output directories (images and fonts).

Giving the difference from the default is enough.
For example:

```js
mix
	.out({
		images: {
			directory: 'img',
			extensions: ['svg']
		},
		fonts: 'font'
	})
;
```

or:

```js
mix
	.out({
		images: ['svg']
	})
;
```

The default settings:

```js
{
	images: {
		directory: 'images',
		extensions: ['png', 'jpe?g', 'gif']
	},
	fonts: {
		directory: 'fonts',
		extensions: ['woff2?', 'ttf', 'eot', 'svg', 'otf']
	}
}
```

The setup code is refactored and documented.

##### v0.8.11

Fixes the modified `mix.browserSync()` method: restores chaining.

The code is refactored and documented.

##### v0.8.10

Adds the setup file (`setup/index.js`) and the description of installation.

##### v0.8.9

Adds the auto setting of contentBase and the auto opening in browser to the configuration options of webpack dev server in the example `webpack.config.js` file.

Adds the `scripts-to-package.json` file to the setup examples.

##### v0.8.8

Sets the default configuration to `mix.browserSync()` method according to the specified public path.

##### v0.8.6

Adds the watching of template files change to the setting of `npm run hot` call too.
In the case of `npm run hot` call, the versioning is not turned on.

##### v0.8.4

Adds the watching of template files change to the setting of `npm run watch` call.
In the case of `npm run watch` call, if the template file(s) change, than the output file(s) are also updated.

##### v0.8.2

The processing of template files is rewritten.

##### v0.8.0

Extends the Laravel Mix with the `.tpl()` template manager method, sets the `npm run watch` call and automates the versioning.

The `mix.tpl(src, target)` method has two mandatory parameters.
The `src` parameter is the source template file and the `target` parameter is the output file.
The `.tpl()` method copies the `src` file to the `target` and replaces the `{{ mix('file-path') }}` code snippets to the path of the referenced files in the copy file.
The replacement is based on the `manifest.json` file, so you can only refer to files that are included in the `manifest.json` file.

Multiple template files can be processed as follows:

```js
mix
	.tpl(src1, target1)
	.tpl(src2, target2)
;
```

When calling `npm run watch`, if the referenced files change, than the `target` file(s) are also updated.

Automatically turns on the versioning (except `npm run hot` call).

Its use is recommended for those developments which are stand-alone (not Laravel) projects.

## License

##### The MIT License ([MIT](https://opensource.org/licenses/MIT))

###### Copyright © 2017 Haász Sándor, [http://haasz-sandor.hu](http://haasz-sandor.hu/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
