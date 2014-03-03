var gulp = require('gulp');
var stylus = require('gulp-stylus');


// Start live Reload Server
var lr = require('tiny-lr')();
lr.listen(35729);


// Start connect server
var connect = require('connect');
var app = connect()
  .use(require('connect-livereload')())
  .use(connect.static(process.cwd()));
require('http').createServer(app).listen(3000);
console.log('Server running at http://localhost:3000');


var compileStylus = function(){
  console.log('compiling stylus');

  gulp.src('./src/stylus/index.styl')
    .pipe(stylus({use: ['nib']}))
    .pipe(gulp.dest('./'));
};


gulp.task('default', function(){

  var stylusWatcher = gulp.watch('./src/stylus/*');
  stylusWatcher.on('change', compileStylus);

  var assetWatcher = gulp.watch(['./index.css', './index.html']);
  assetWatcher.on('change', function(file){
    lr.changed({
      body : { files : './index.html' }
    });
  });
});