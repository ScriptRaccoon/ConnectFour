const { series, src, dest, parallel, watch } = require("gulp");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");

const paths = {
    js: {
        src: "src/js/**/*.js",
        dest: "dist/build/",
    },
    css: {
        src: "src/css/**/*.css",
        dest: "dist/build/",
    },
};

function gulpJS() {
    return src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat("bundle.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(dest(paths.js.dest));
}

function gulpCSS() {
    return src(paths.css.src)
        .pipe(sourcemaps.init())
        .pipe(concat("bundle.css"))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write("./"))
        .pipe(dest(paths.css.dest));
}

exports.watch = () => {
    watch("src/**/*.js", gulpJS);
    watch("src/**/*.css", gulpCSS);
};

exports.build = parallel(gulpJS, gulpCSS);
