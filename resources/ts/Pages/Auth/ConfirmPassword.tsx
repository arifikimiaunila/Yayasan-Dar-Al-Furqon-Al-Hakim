import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import { Card, Label, TextInput, Button } from "flowbite-react";
import React from 'react';
import useRoute from '@/ts-js part/useRoute';
import InputError from '@/Components/InputError';

export default function ConfirmPassword() {
  const route = useRoute();
  const form = useForm({
    password: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.confirm'), {
      onFinish: () => form.reset(),
    });
  }

  return (
    <Card className="max-w-sm">
      <Head title="Secure Area" />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
      Ini adalah area aplikasi yang aman. Harap konfirmasi kata sandi Anda
      sebelum melanjutkan.
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="password" value="Password"/>
          <TextInput
            id="password"
            type="password"
            value={form.data.password}
            onChange={e => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="current-password"
            autoFocus
          />
          <InputError className="mt-2" message={form.errors.password} />
        </div>

        <div className="flex justify-end mt-4">
          <Button color="blue"
            className={classNames('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Konfirmasi
          </Button>
        </div>
      </form>
    </Card>
  );
}
