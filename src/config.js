require.config({
    baseUrl: 'src',
    paths: {
        css: 'lib/esl/css',
        js: 'lib/esl/js',
        tpl: 'lib/er/tpl'
    },
    packages: [
        {
            name: 'er',
            location: 'lib/er',
            main: 'main'
        },
        {
            name: 'esui',
            location: 'lib/esui'
        }
    ]
});
