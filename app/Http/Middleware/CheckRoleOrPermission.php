<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRoleOrPermission extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $type ('role', 'permission', atau 'ability')
     * @param  string  $parameter1 (Roles/Permissions pertama atau gabungan dengan pipe '|')
     * @param  string|null  $parameter2 (Permissions kedua jika 'ability', atau nama 'team')
     * @param  string|null  $parameter3 ('team' jika tipe role/permission, atau 'require_all')
     * @param  string|null  $parameter4 ('require_all' jika tipeability)
     */
    public function handle(
        Request $request, 
        Closure $next, 
        string $type, 
        string $parameter1, 
        ?string $parameter2 = null, 
        ?string $parameter3 = null, 
        ?string $parameter4 = null
    ): Response {
        $user = $request->user();

        if (!$user) {
            abort(401, 'Unauthorized.');
        }

        $isAuthorized = false;

        switch ($type) {
            case 'role':
                // Format: role:admin|root,my-awesome-team,require_all
                $roles = explode('|', $parameter1);
                $team = $parameter2;
                $requireAll = filter_var($parameter3, FILTER_VALIDATE_BOOLEAN);
                
                // Contoh pemanggilan method di model User Anda:
                // $user->hasRole(['admin', 'root'], 'my-awesome-team', true)
                $isAuthorized = method_exists($user, 'hasRole') 
                    ? $user->hasRole($roles, $team, $requireAll) 
                    : false;
                break;

            case 'permission':
                // Format: permission:edit-post|edit-user,my-awesome-team,require_all
                $permissions = explode('|', $parameter1);
                $team = $parameter2;
                $requireAll = filter_var($parameter3, FILTER_VALIDATE_BOOLEAN);

                // Contoh: $user->isAbleTo(['edit-post', 'edit-user'], 'my-awesome-team', true)
                $isAuthorized = method_exists($user, 'isAbleTo') 
                    ? $user->isAbleTo($permissions, $team, $requireAll) 
                    : false;
                break;

            case 'ability':
                // Format: ability:admin|owner,create-post|edit-user,my-awesome-team,require_all
                $roles = explode('|', $parameter1);
                $permissions = explode('|', $parameter2);
                $team = $parameter3;
                $requireAll = filter_var($parameter4, FILTER_VALIDATE_BOOLEAN);

                // Contoh: $user->ability(['admin', 'owner'], ['create-post', 'edit-user'], 'my-awesome-team', true)
                $isAuthorized = method_exists($user, 'ability') 
                    ? $user->ability($roles, $permissions, $team, $requireAll) 
                    : false;
                break;
        }

        if (!$isAuthorized) {
            abort(403, 'Aksi tidak diizinkan.');
        }

        return $next($request);
    }

    public function handleRole($user)
    {
    return $user->role; // atau logika lain sesuai database
    }
}