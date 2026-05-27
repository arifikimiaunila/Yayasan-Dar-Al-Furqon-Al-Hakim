import { inject, InjectionKey } from 'vue';
import { route } from 'ziggy-js';

// 1. Definisikan tipe untuk fungsi route Ziggy
type RouteFunction = typeof route;

// 2. Buat InjectionKey khusus dengan tipe data RouteFunction
export const RouteKey: InjectionKey<RouteFunction> = Symbol('RouteContext');

// 3. Custom Composable useRoute (Ekuivalen dengan custom hook di React)
export default function useRoute(): RouteFunction {
    const fn = inject(RouteKey);
    
    if (!fn) {
        throw new Error('Route function must be provided via provide(RouteKey, route)');
    }
    
    return fn;
}
