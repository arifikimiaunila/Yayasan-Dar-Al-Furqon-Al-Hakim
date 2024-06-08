const Ziggy = {
    url: 'https://ziggy.test',
    port: null,
    routes: {
        home: {
            uri: '/',
            methods: [ 'GET', 'HEAD'],
            domain: null,
        },
        login: {
            uri: 'login',
            methods: ['GET', 'HEAD'],
            domain: null,
        },
    },
};

export { Ziggy };