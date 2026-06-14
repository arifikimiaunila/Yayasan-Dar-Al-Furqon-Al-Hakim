This web codes uses php, laravel 12, tailwindcss, vuejs, typescript, & inertiajs.

Migrate NavbarAdmin1.vue ke Next.js React TSX.

Rules:
- Props: {user, roles}
- isAdmin = roles.includes('Admin1')||'superadministration'
- useState untuk openMenu, useRef untuk dropdown
- useEffect untuk click-outside + cleanup
- Inertia Link → Next Link
- route().current → usePathname().startsWith()
- Tailwind classes copy 100%
- Return null if !isAdmin
- Buat test Vitest: render, dropdown toggle, logout
- Output: src/components/NavbarAdmin.tsx + test
