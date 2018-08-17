var Encore = require('@symfony/webpack-encore');
var path = require('path');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .setManifestKeyPrefix('build/')

    .cleanupOutputBeforeBuild()
    .autoProvidejQuery()
    .enablePostCssLoader()
    .enableSourceMaps(!Encore.isProduction())
    .enableSassLoader(function(sassOptions) {}, {
        resolveUrlLoader: false
    })

    .addStyleEntry('css/app', './assets/css/app.scss')
    .addEntry('js/app', './assets/js/app.js')
;

var config = Encore.getWebpackConfig();
config.resolve.alias.emsch = path.resolve(__dirname, 'vendor/elasticms/client-helper-bundle/Resources/assets/AdminMenu/app.js');

module.exports = config;
