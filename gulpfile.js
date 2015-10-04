'use strict';

// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');
var shell = require('gulp-shell');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));
var gulpif = require('gulp-if');
var production = !!(argv.production);

// Gulp command line arguments
var RELEASE = !!argv.release;                 // Minimize and optimize during a build?
var DOMAIN = argv.d;
console.log('DOMAIN: ' + DOMAIN);
var AUTOPREFIXER_BROWSERS = [                 // https://github.com/ai/autoprefixer
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var src = {};
var watch = false;

// The default task
gulp.task('default', ['serve']);

// Clean output directory
gulp.task('clean', del.bind(
  null, ['.tmp', 'build/*', 'dist/*', '!build/.git'], {dot: true}
));


// 3rd party libraries
gulp.task('vendor', function() {
  return gulp.src('node_modules/bootstrap/dist/fonts/**')
    .pipe(gulp.dest('build/fonts'));
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src('src/client/fonts/**')
    .pipe(gulp.dest('build/fonts'));
});

//certs
gulp.task('copy-certs', function() {
  return gulp.src('certs/**')
    .pipe(gulp.dest('build/certs'));
});

//.env

gulp.task('env', function() {
  return gulp.src('development.env')
    .pipe(gulp.dest('build'));
});

gulp.task('copy-env:dist', function() {
  return gulp.src('production.env')
    .pipe(gulp.dest('dist'));
});

//bootstrapjs
gulp.task('copy-bootstrap:dist', function() {
  return gulp.src('src/server/repos/bootstrap.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-package-json:dist', function() {
  return gulp.src('package.json')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy:dist', function() {
  return gulp.src('build/**/*')
    .pipe(gulp.dest('dist'));
});

// Static files
gulp.task('assets', function() {
  src.assets = [
    'src/client/assets/**',
    'src/client/templates*/**/*.*'
  ];
  return gulp.src(src.assets)
    .pipe($.changed('build'))
    .pipe(gulp.dest('build'))
    .pipe($.size({title: 'assets'}));
});

// CSS style sheets
gulp.task('styles', function() {
  src.styles = 'src/client/styles/**/*.{css,less}';
  return gulp.src('src/client/styles/bootstrap.less')
    .pipe($.plumber())
    .pipe($.less({
      sourceMap: !RELEASE,
      sourceMapBasepath: __dirname
    }))
    .on('error', console.error.bind(console))
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe($.csscomb())
    .pipe($.if(RELEASE, $.minifyCss()))
    .pipe(gulp.dest('build/css'))
    .pipe($.size({title: 'styles'}));
});

// Bundle
gulp.task('bundle', function(cb) {
  var started = false;
  var config = require('./webpack.config.js');
  var bundler = webpack(config);

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    if (argv.verbose) {
      $.util.log('[webpack]', stats.toString({colors: true}));
    }

    if (!started) {
      started = true;
      return cb();
    }
  }

  if (watch) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

// Build the app from source code
gulp.task('build', ['clean'], function(cb) {
  runSequence(['copy-certs', 'vendor', 'fonts', 'assets', 'styles', 'bundle', 'env'], cb);
});

gulp.task('build:dist', ['clean'], function(cb) {
  runSequence(['vendor', 'fonts', 'assets', 'styles', 'bundle', 'copy-env:dist', 'copy-bootstrap:dist', 'copy-package-json:dist'], function(){
    runSequence(['copy:dist'], cb);
  });
});

gulp.task('test', ['bootstrap-test'], shell.task([
  'export NODE_ENV=test; mocha --recursive --compilers js:mocha-traceur'
]));

gulp.task('bootstrap-test', shell.task([
  'export NODE_ENV=test; node src/server/repos/bootstrap.js'
]));

gulp.task('bootstrap', function(cb) {
  runSequence(['bootstrap-db', 'certs'], cb);
});

gulp.task('bootstrap-db', shell.task([
  'export NODE_ENV=development; node src/server/repos/bootstrap.js'
]));

gulp.task('certs', shell.task([
  './make-self-signed-certs.sh'
]));


// Build and start watching for modifications
gulp.task('build:watch', function(cb) {
  watch = true;
  runSequence('build', function() {
    gulp.watch(src.assets, ['assets']);
    gulp.watch(src.styles, ['styles']);
    cb();
  });
});

// Launch a Node.js/Express server
gulp.task('serve', ['build:watch'], function(cb) {
  src.server = [
    'build/server.js',
    'build/templates/**/*'
  ];

  var started = false;
  var cp = require('child_process');
  var assign = require('react/lib/Object.assign');

  var server = (function startup() {
    var child = cp.fork('build/server.js', {
      env: assign({NODE_ENV: 'development'}, process.env)
    });
    child.once('message', function(message) {
      if (message.match(/^online$/)) {

        if (!started) {
          started = true;
          gulp.watch(src.server, function() {
            $.util.log('Restarting development server.');
            server.kill('SIGTERM');
            server = startup();

          });
          cb();
          console.log("Server started. Go to https://yourdomain.com:3000");
          console.log("Remember to edit your hosts file to match your localhost with the domain in your callback URL");
        }
      }
    });
    return child;
  })();

  process.on('exit', function() {
    server.kill('SIGTERM');
  });
});
