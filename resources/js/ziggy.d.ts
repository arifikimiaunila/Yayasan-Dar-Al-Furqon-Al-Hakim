declare module 'vue' {
    interface ComponentCustomProperties {
        route: typeof routeFn;
    }
}