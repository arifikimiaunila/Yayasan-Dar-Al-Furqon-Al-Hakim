import { route } from 'ziggy-js';

export function rute(lokasi: string, titik: null|number|number[]|object[]): string{
    return titik != null ? route(lokasi, titik as any) : route(lokasi);
}