'use strict';
var gutil = require('gulp-util'),
    through = require('through2'), //through2
    xlsx = require('node-xlsx'), //node-xlsx
    hogan = require('hogan.js'), //hogan
    fs = require('fs'), //fs
    path = require('path'), //path
    extend = require('extend'); //extend
var PLUGIN_NAME = 'excel2Html'; //plugin name

var excel2Html = function(options) {
    var defaults = {
        dataHandle: null,
        tmplName: null,
        resultName: 'result.html'
    };
    defaults = extend(defaults, options);
    // creating a stream through which each file will pass
    var stream = through.obj(function(file, encoding, callback) {
        // do whatever necessary to process the file
        if (file.isNull()) {
            this.push(file);
            return callback();
        }
        if (file.isBuffer()) {
            // 支持buffer类型
        }
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback();
        }

        var excel = xlsx.parse(file.contents);
        var templateObj = null;
        if (defaults.dataHandle) {
            templateObj = defaults.dataHandle(excel);
        } else {
            templateObj = excel;
        }
        var template = hogan.compile(fs.readFileSync(defaults.tmplFile).toString());
        var templateResult = template.render(templateObj);
        file.history = [path.join(file.cwd, '/', defaults.resultFile)];
        file.contents = new Buffer(templateResult);
        this.push(file);
        callback();
    }, function(callback) {
        callback();
    });
    // returning the file stream
    return stream;
};

module.exports = excel2Html;
