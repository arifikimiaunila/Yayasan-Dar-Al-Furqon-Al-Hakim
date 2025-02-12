import { router } from "@inertiajs/react"

export function handleSubmit(x: number, e: React.FormEvent<HTMLFormElement>, location: string, values: null|any, options: any): void {
    e.preventDefault();
    if (x == 0){
        return router.get(location, values, options);
    }
    else if (x==1){
        return router.post(location, values, options);
    }
    else if (x==2){
        return router.put(location, values, options);
    }
    else if (x==3){
        return router.patch(location, values, options);
    }
    else if (x==4){
        return router.delete(location, {
            onBefore: ()=>confirm('Apakah kamu yakin ingin menghapusnya?')
        });
    }
    else{
        return router.reload(options);
    }
}

