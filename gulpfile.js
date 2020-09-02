const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require('del');

// Styles

const styles = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}

exports.styles = styles;

//Images

const images = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo(),
    ]))
}

exports.images = images;

//Webp

const imageswebp = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'))
}

exports.imageswebp = imageswebp;

//SVG sprite

const sprite = () => {
  return gulp.src('source/img/**/icon-*.svg')
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'))
}

exports.sprite = sprite;

const spriteInclude = () => {
  return gulp.src('source/*.html')
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest('build'))
}

exports.spriteInclude = spriteInclude;
//Copy

const copy = () => {
  return gulp.src ([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/**',
    'source/*.ico',
    'source/*.html'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
};

exports.copy = copy;

const html = () => {
  return gulp.src([
    'source/*.html'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
};

exports.html = html;
//Clean

const clean = () => {
  return del('build');
};

exports.clean = clean;

//Build

const build = () => gulp.series (
  clean,
  copy,
  styles,
  images,
  sprite,
  spriteInclude,
  imageswebp
);

exports.build = build();


// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build/'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series('styles'));
  gulp.watch('source/*.html').on('change', gulp.series('html', sync.reload));
}

exports.default = gulp.series(
  server, watcher
);
