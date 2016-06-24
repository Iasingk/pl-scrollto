(function () {
	'use strict';

	var gulp = require('gulp'),
		typescript = require('gulp-typescript'),
		livereload = require('gulp-livereload');


    /**
     * Compile typescript and generate javascript file.
     */
    gulp.task('typescript', function () {
        var files = [
            'source/typescript/*.ts'
        ];

        return gulp.src(files)
                    .pipe(typescript({
                        out: 'pl-scrollto.js',
                        target: 'ES5'
                    }))
                    .pipe(gulp.dest('public/scripts/'))
                    .pipe(livereload());

    });


    /**
     * Monitors changes in projects files and apply changes instantly.
     * Use with livereload chrome extension.
     */
    gulp.task('watch', function () {
        // Files to be watched.
        var files = [
            'source/typescript/*.ts'
        ];

        livereload.listen();

        gulp.watch(files, ['typescript']);
    });

})();