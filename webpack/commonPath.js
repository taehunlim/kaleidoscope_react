const path = require('path');

const dirname = './',
    PROJECT_ROOT = path.resolve(dirname),
    PUBLIC_INDEX = path.resolve(PROJECT_ROOT, 'public', 'index.html'),
    BUILD_PATH = path.resolve(PROJECT_ROOT, 'build');

exports.dirname = dirname;
exports.PROJECT_ROOT = PROJECT_ROOT;
exports.PUBLIC_INDEX = PUBLIC_INDEX;
exports.BUILD_PATH = BUILD_PATH;