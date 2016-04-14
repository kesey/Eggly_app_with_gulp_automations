module.exports = {
    build_dir: 'build',
    app_files: {
        js:             ['app/**/*.js'],
        tpl_src_js:     ['./build/vendor/**/*.js',
                        './build/app/**/*.js'],
        tpl_src_css:    ['./build/assets/css/**/*.css']
    }
}
