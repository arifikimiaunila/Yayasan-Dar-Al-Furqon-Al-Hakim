import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef } from 'react';
import useRoute from '@/ts-js part/useRoute';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import { Label, Button, TextInput } from 'flowbite-react';

export default function UpdatePasswordForm() {
  const route = useRoute();
  const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);

  function updatePassword() {
    form.put(route('user-password.update'), {
      errorBag: 'updatePassword',
      preserveScroll: true,
      onSuccess: () => form.reset(),
      onError: () => {
        if (form.errors.password) {
          form.reset('password', 'password_confirmation');
          passwordRef.current?.focus();
        }

        if (form.errors.current_password) {
          form.reset('current_password');
          currentPasswordRef.current?.focus();
        }
      },
    });
  }

  return (
    <FormSection
      onSubmit={updatePassword}
      title={'Perbarui Password'}
      description={
        'Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman.'
      }
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
          Disimpan.
          </ActionMessage>

          <Button color="blue"
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Simpan
          </Button>
        </>
      )}
    >
      <div className="col-span-6
      sm:col-span-4">
        <Label htmlFor="current_password" value="Password Tertentu"/>
        <TextInput
          id="current_password"
          type="password"
          className="mt-1 block w-full"
          ref={currentPasswordRef}
          value={form.data.current_password}
          onChange={e =>
            form.setData('current_password', e.currentTarget.value)
          }
          autoComplete="current-password"
        />
        <InputError message={form.errors.current_password} className="mt-2" />
      </div>

      <div className="col-span-6 sm:col-span-4">
        <Label htmlFor="password" value="Password Baru"/>
        <TextInput
          id="password"
          type="password"
          className="mt-1 block w-full"
          value={form.data.password}
          onChange={e => form.setData('password', e.currentTarget.value)}
          autoComplete="new-password"
          ref={passwordRef}
        />
        <InputError message={form.errors.password} className="mt-2" />
      </div>

      <div className="col-span-6 sm:col-span-4">
        <Label htmlFor="password_confirmation" value="Konfirmasi Password"/>
        <TextInput
          id="password_confirmation"
          type="password"
          className="mt-1 block w-full"
          value={form.data.password_confirmation}
          onChange={e =>
            form.setData('password_confirmation', e.currentTarget.value)
          }
          autoComplete="new-password"
        />
        <InputError
          message={form.errors.password_confirmation}
          className="mt-2"
        />
      </div>
    </FormSection>
  );
}
