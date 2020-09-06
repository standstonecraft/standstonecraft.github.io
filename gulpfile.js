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
const data = require('gulp-data');
const path = require('path');
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
    html: 'src/template/page/',
    js: 'src/js/',
    css: 'src/js/',
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
    .src(paths.src.html + '**/*.njk')
    // .pipe(
    //   data(function () {
    //     return require(paths.src.json);
    //   })
    // )
    .pipe(
      data(file => {
        let json = {};
        json.data = {};
        json.data.rootURL = 'https://standstonecraft.github.io/';
        json.data.path = {};
        json.data.path.dirName = path.dirname(file.path);
        json.data.path.fileName = path.basename(file.path);
        json.data.path.baseName = path.basename(file.path, '.njk');
        json.data.path.relativeDir = path.relative(paths.src.html, json.data.path.dirName);
        json.data.path.relative = path.relative(paths.src.html, file.path);
        json.data.path.htmlPath = path.join(json.data.path.relativeDir, json.data.path.baseName + '.html');
        return json;
      })
    )
    .pipe(
      nunjucks({
        path: paths.src.njkRoot,
      })
    )
    .pipe(beautify(beautify_option))
    .pipe(gulp.dest(paths.dest.root));

const js = () =>
  gulp
    .src(paths.src.js + '**/*.js')
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
    .src(paths.src.css + '**/*.css')
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
  gulp.watch(paths.src.js + '**/*.js', gulp.series(js));
  gulp.watch(paths.src.css + '**/*.css', gulp.series(css));
  gulp.watch(paths.dest.root + '**/*', gulp.series(reload));
};

exports.default = gulp.parallel(brsync, watch);
