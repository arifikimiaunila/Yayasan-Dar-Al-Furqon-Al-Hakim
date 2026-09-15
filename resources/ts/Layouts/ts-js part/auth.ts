import { router } from '@inertiajs/react';
import route from 'ziggy-js';

interface LoginData {
  email: string;
  password: string;
  device_name: string;
}

export const loginUser = (data: LoginData) => {
  router.post(route('sanctum.token'), data, {
    onSuccess: (page) => {
      // token akan dikembalikan dari backend
      const token = page.props?.token;
      if (token) {
        localStorage.setItem('auth_token', token);
        console.log('Token disimpan di localStorage');
      }
    },
    onError: (errors) => {
      console.error('Login gagal:', errors);
    },
  });
};
