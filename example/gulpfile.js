var gulp = require('gulp');
var excel2Html = require('../index.js');
var del = require('del');
gulp.task('del', function() {
    return del.sync('dist/*');
});

gulp.task('default', ['del'], function() {
    gulp.src('../example/**/*.xlsx').pipe(excel2Html({
        resultFile: 'result.html',
        tmplFile: 'src/edm_template.html',
        dataHandle: function(excel) {
            var sheet1 = excel.shift(),
                // 读取行数据
                rows = sheet1.data;
            return {
                rows:rows,
                getIndex:function(){
                    return this[0]
                },
                getName:function(){
                    return this[1]
                }
            };
        }
    })).pipe(gulp.dest('dist'));
});