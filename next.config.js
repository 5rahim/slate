// const withTM = require('next-transpile-modules')(['react-icons']); // pass the modules you would like to see transpiled
//
// module.exports = withTM();

require('dotenv').config();

module.exports = {
    i18n: {
        locales: ['en', 'fr'],
        defaultLocale: 'en',
    },
}
