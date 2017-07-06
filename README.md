# The Extension of Laravel Mix

This is the extension of [Laravel Mix](https://github.com/JeffreyWay/laravel-mix).

## Release notes

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

Its use is recommended if it is not a Laravel project.

## Compatibility

##### v0.8.0 – v0.8.2

0.8.8 &le; Laravel Mix version &lt; 0.9.0

## License

##### The MIT License ([MIT](https://opensource.org/licenses/MIT))

###### Copyright © 2017 Haász Sándor, [http://haasz-sandor.hu](http://haasz-sandor.hu/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
