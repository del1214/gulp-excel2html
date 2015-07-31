# gulp-excel2html[![npm version](https://badge.fury.io/js/gulp-excel2html.svg)](https://badge.fury.io/for/js/gulp-excel2html)[![Build Status](https://travis-ci.org/del1214/gulp-excel2html.svg?branch=master)](https://travis-ci.org/del1214/gulp-excel2html) [![Dependency Status](https://david-dm.org/del1214/gulp-excel2html.svg)](https://david-dm.org/del1214/gulp-excel2html) [![devDependency Status](https://david-dm.org/del1214/gulp-excel2html/dev-status.svg)](https://david-dm.org/del1214/gulp-excel2html#info=devDependencies)

gulp-excel2html is a [Gulp](http://gulpjs.com/) plugin to convert excel(xlsx) file to HTML


##Install
```bash
npm install --save-dev gulp-excel2html
```

##Usage
```js
var excel2html = require('gulp-excel2html');

gulp.src('foo.xlsx')
	.pipe(excel2html({
		tmplFile:'src/foo_tmpl.html',
		resultFile:'result.html',
		dataHandle:function(excel){
			//handle excel data and return something
			return something;
		}
	}))
	.pipe(gulp.dest('dist'))

```

##API
===
### excel2html(options)
####options
* Type:```Object```
* Required
* hasDefault

| key          | type          | required     | default      | summary      |
| ------------ | ------------- | ------------ | ------------ | ------------ |
| **tmplFile** | ```string```        | Yes          | None         | The template file path of hogan.js |
| **resultFile** | ```string```  | Not | ```result.html``` | The out put html file name |
| **dataHandle** | ```Function```  | Not | Full excel data of Array | handle the data parse from xlsx file and return object for [hogan.js](http://twitter.github.io/hogan.js/) to render html |
