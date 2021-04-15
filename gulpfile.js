const gulp 						= require('gulp');
// Конкатинация файлов
const concat 					= require('gulp-concat');
// Автопрефиксы
const autoprefixer 		= require('gulp-autoprefixer');
//  Минификация CSS
const cleanCSS 				= require('gulp-clean-css');
// Минификация JS
const uglify 					= require('gulp-uglify');
//
const browserSync 		= require('browser-sync').create();
//
const sass        		= require('gulp-sass');



// Подключение CSS файлов
// const cssFiles = [
// 	'./src/css/main.css',
// 	'./src/css/media.css'
// ];

// Подключение JS файлов
const jsFiles = [
	'./src/js/lib.js',
	'./src/js/main.js'
];

// Таск для компиляции Scss
function Sass() {
	return gulp.src('./src/scss/**/*.scss')
	.pipe(sass().on('error', sass.logError))

	// Выгрузка Css
	.pipe(gulp.dest('./src/css'))
}

// Таск на стили CSS
function styles() {
	// Шаблон для поиска файлов CSS
	// Все файлы по шаблону './src/css/**/*.css'
	return gulp.src('./src/css/*.css')
	// // Объединение файлов в один
	// .pipe(concat('style.css'))

	// Добавка префиксов
	.pipe(autoprefixer({
						browsers: ['last 2 versions'],
						cascade: false
				}))

	// Минификация Css
	.pipe(cleanCSS({
		level: 2,
		compatibility: 'ie8'
	}))
	// Выходная папка для стилей
	.pipe(gulp.dest('./dist/css'))
	.pipe(browserSync.stream());

}



// Такс на скрипты JS
function scripts() {
	return gulp.src(jsFiles)
	// Объединение файлов в один
	.pipe(concat('script.js'))

	// Минификация Js
	.pipe(uglify())

	// Выходная папка для скриптов
	.pipe(gulp.dest('./dist/js'))
	.pipe(browserSync.stream());
}


function watch() {
	browserSync.init({
				server: {
						baseDir: "./"
				}
		});

		// Следить за Scss
		gulp.watch('./src/scss/**/*.scss', Sass)
		// Следить за Css
		gulp.watch('./src/css/**/*.css', styles)
		// Следить за Js
		gulp.watch('./src/js/**/*.js', scripts)
		// Следить за Html
		gulp.watch("./*.html").on('change', browserSync.reload);

}



// Таск вызывающий функцию styles
gulp.task('styles', styles);

// Такс вызывающий функцию scripts
gulp.task('scripts', scripts);

// Таск для отслеживаие изменений
gulp.task('watch', watch);

// Для запуска styles и scripts
gulp.task('build', gulp.series(Sass, gulp.parallel(styles,scripts)));

//
gulp.task('dev', gulp.series('build', 'watch'));
