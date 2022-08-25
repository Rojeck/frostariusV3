export const extraJS = () => {
	return app.gulp.src(app.path.src.additionalJS)
		.pipe(app.gulp.dest(app.path.build.js))
}