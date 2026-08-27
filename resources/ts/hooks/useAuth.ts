import { router, usePage } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';

export interface AuthUser {
    id?: number | string;
    name?: string;
    email?: string;
}

type SharedProps = PageProps & {
    auth?: {
        user?: AuthUser | null;
    };
    roles?: string[];
};

/**
 * Access current user, roles, and logout action from Inertia shared props.
 */
export function useAuth() {
    const { props } = usePage<SharedProps>();

    const user = props.auth?.user ?? null;
    const roles: string[] = Array.isArray(props.roles) ? props.roles : [];

    const logout = () => {
        router.post('/logout');
    };

    return { user, roles, logout };
}

export default useAuth;
