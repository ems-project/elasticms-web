var Encore = require('@symfony/webpack-encore');
var path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

Encore
    .setOutputPath('public/bundles/emsch_assets')
    .setPublicPath('/bundles/emsch_assets')
    .setManifestKeyPrefix('bundles/emsch_assets/')
    .configureUrlLoader({
        fonts: { limit: 4096, publicPath: '../' },
        images: { limit: 4096, publicPath: '../' }
    })

    .cleanupOutputBeforeBuild()
    .autoProvidejQuery()
    .enablePostCssLoader()
    .autoProvideVariables({
        'window.jQuery': 'jquery',
        'window.$': 'jquery'
    })
    .enableSourceMaps(!Encore.isProduction())
    .enableSassLoader(function(sassOptions) {}, {
        resolveUrlLoader: false
    })

    .addStyleEntry('css/app', './assets/css/app.scss')
    .addEntry('js/app', './assets/js/app.js')
    .addPlugin(new CopyWebpackPlugin([
        // copies to {output}/static
        { from: './assets/static', to: 'static' }
    ]))
;

var config = Encore.getWebpackConfig();
config.resolve.alias.emsch = path.resolve(__dirname, 'vendor/elasticms/client-helper-bundle/Resources/assets/AdminMenu/app.js');

//disable amd loader
config.module.rules.unshift({
    parser: {
        amd: false,
    }
});

module.exports = config;
