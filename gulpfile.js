/*
src 参照元を指定
dest 出力さきを指定
watch ファイル監視
series(直列処理)とparallel(並列処理)
*/
const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks-render');
const beautify = require('gulp-html-beautify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
// // プラグインを呼び出し
// const sass = require('gulp-sass');

// // プラグインの処理をまとめる
// const cssSass = () => {
//   return src('src/css/**/*.scss') //コンパイル元
//     .pipe(sass({ outputStyle: 'expanded' }))
//     .pipe(dest('dist/css')); //コンパイル先
// };

// // タスクをまとめて実行
// exports.default = series(cssSass);
const paths = {
  src: {
    njkRoot: 'src/template/',
    html: 'src/template/page/**/*.njk',
    js: 'src/js/**/*.js',
    css: 'src/js/**/*.css',
  },
  dest: {
    root: 'docs/',
    html: 'docs/',
    js: 'docs/js/',
    css: 'docs/css/',
  },
};
const beautify_option = {
  indent_size: 2,
};

const njk = () =>
  gulp
    .src(paths.src.html)
    // .pipe(
    //   data(function () {
    //     return require(paths.src.json);
    //   })
    // )
    .pipe(
      nunjucks({
        path: paths.src.njkRoot,
      })
    )
    .pipe(beautify(beautify_option))
    .pipe(gulp.dest(paths.dest.root));

const js = () =>
  gulp
    .src(paths.src.js)
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(paths.dest.js));

const css = () =>
  gulp
    .src(paths.src.css)
    .pipe(cleanCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.dest.css));

exports.build = gulp.parallel(njk, js, css);

const brsync = () =>
  browserSync.init({
    notify: false,
    server: paths.dest.root,
  });
const reload = () => browserSync.reload();

const watch = function () {
  gulp.watch(paths.src.njkRoot + '**/*', gulp.series(njk));
  gulp.watch(paths.src.js, gulp.series(js));
  gulp.watch(paths.src.css, gulp.series(css));
  gulp.watch(paths.dest.root + '**/*', gulp.series(reload));
};

exports.default = gulp.parallel(brsync, watch);
