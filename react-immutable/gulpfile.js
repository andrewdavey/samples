var gulp = require("gulp");
var react = require("gulp-react");
var browserify = require("gulp-browserify");

gulp.task("scripts", function() {
  gulp.src(["views/*.jsx"])
      .pipe(react())
      .pipe(gulp.dest("views"));

  gulp.src(["index.js"])
      .pipe(browserify())
      .pipe(gulp.dest("build"));
});

gulp.task("watch", function() {
  gulp.watch(["**/*.js", "**/*.jsx"], ["scripts"]);
});

gulp.task("default", ["scripts"]);

