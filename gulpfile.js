/* 
 *
 * GULP & SASS Starter Toolkit
 * by David Rosseljong
 * https://david-rosseljong.com
 * https://github.com/DavidRosseljong/gulpsasstoolkit
 * 
 * Gulp 4.0 ready.
 * 
 * Required gulp plugins for the project.
 * Comment out or delete what you don't need.
 * Better yet, npm uninstall them BUT be sure
 * about what you are doing.
 *
 */
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
//const pug = require('gulp-pug');
const image = require('gulp-image');
const prefix = require('gulp-autoprefixer');
const newer = require('gulp-newer');
const wait = require('gulp-wait');

/* 
 *
 * The SASS task. 
 * It creates our compressed & prefixed css 
 * file including sourcemaps for the browser.
 * 
 * Wait is included to give it time so that it
 * can find all files main.sass needs. If you have
 * a lot of files, occasionally it throws an error
 * because it couldn't find an imported sass file.
 *
 */
function sass_task() {
  return src('src/sass/main.sass')
    .pipe(wait(50))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(prefix())
    .pipe(sourcemaps.write('/maps'))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream());
};

/* 
 *
 * The IMAGE task.
 * Checks if images are new in the src folder,
 * then compress and copy them over to the
 * build folder if they are, well, new.
 *
 */
function image_task() {
  return src('src/img/**/*')
    .pipe(newer('build/img'))
    .pipe(image())
    .pipe(dest('build/img'));
};


/* 
 *
 * The PUG task.
 * Prettifies our pug files after compiling.
 * All files in src/pug are compiled to html,
 * so that you can have index.html, about.html etc.
 * Sub-directories are not compiled. They are for
 * including.
 * 
 * Set pretty to false to minify html.
 * 
 * Please check #5 on https://gulpsasstoolkit.com/docs.html
 * for the code if you want the gulp task as it is optional.
 *
 */

/* Delete this comment or replace with the pug_task from the docs. */

/* 
 *
 * The COPY task
 * Copy files from node_modules or src folder
 * to the build folder. E.g. Bootstrap, jQuery.
 * 
 * Please check #4 on https://gulpsasstoolkit.com/docs.html
 * for the code if you want the copy task to work as it is optional.
 *
 */

/* Delete this comment or replace with the copy_task from the docs. */

/* 
 *
 * The SERVE task.
 * Initializing BrowserSync and specifying our build folder.
 *
 */
function serve_task() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
};


/* 
 *
 * The WATCH task.
 * Watch all our files for changes, then run tasks above accordingly.
 *
 */
function watch_task() {
  watch('src/sass/**/*.sass', sass_task);
  watch('src/img/**/*', image_task);

  // Delete this if you don't use the pug_task or copy_task from the docs.
  //watch('src/pug/**/**/*.pug', pug_task);
  //watch('src/js/**/*.js', copy_task);
  //watch('src/css/**/*.css', copy_task);
};


/* 
 *
 * The DEFAULT task.
 * This is our default task.
 * 
 * It starts everything you need,
 * so that you can start right away.
 * 
 * More information on parallel 
 * and series can be found here:
 * 
 * https://gulpjs.com/docs/en/api/parallel
 * https://gulpjs.com/docs/en/api/series
 *
 */
exports.default = parallel(watch_task, image_task, series(serve_task));


/*
 *
 * You can also export any other task as a seperate task.
 * That way you can manually trigger the task by typing "gulp copy" in the terminal.
 * 
 */
//exports.copy = parallel(copy_task);