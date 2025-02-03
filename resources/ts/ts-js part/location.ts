import { useRoute } from 'ziggy-js';

export function rute(lokasi: string, titik: null|number|number[]|object[]): string{
    if (titik != null){
    return useRoute(lokasi, titik);
    }
    else{
        return useRoute(lokasi);
    }
}