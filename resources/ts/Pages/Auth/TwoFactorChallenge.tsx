import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import useRoute from '@/ts-js part/useRoute';
import { Button, TextInput, Label, Card } from 'flowbite-react';
import InputError from '@/Components/InputError';

export default function TwoFactorChallenge() {
  const route = useRoute();
  const [recovery, setRecovery] = useState(false);
  const form = useForm({
    code: '',
    recovery_code: '',
  });
  const recoveryCodeRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  function toggleRecovery(e: React.FormEvent) {
    e.preventDefault();
    const isRecovery = !recovery;
    setRecovery(isRecovery);

    setTimeout(() => {
      if (isRecovery) {
        recoveryCodeRef.current?.focus();
        form.setData('code', '');
      } else {
        codeRef.current?.focus();
        form.setData('recovery_code', '');
      }
    }, 100);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('two-factor.login'));
  }

  return (
    <Card>
      <Head title="Two-Factor Confirmation" />

      <div className="mb-4 text-sm text-gray-600
      dark:text-gray-400">
        {recovery
          ? 'Harap konfirmasikan akses ke akun Anda dengan memasukkan salah satu kode pemulihan darurat Anda.'
          : 'Harap konfirmasi akses ke akun Anda dengan memasukkan kode otentikasi yang disediakan oleh aplikasi pengautentikasi Anda.'}
      </div>

      <form onSubmit={onSubmit}>
        {recovery ? (
          <div>
            <Label htmlFor="recovery_code" value="Kode pemulihan"/>
            <TextInput
              id="recovery_code"
              type="text"
              className="mt-1 block w-full"
              value={form.data.recovery_code}
              onChange={e =>
                form.setData('recovery_code', e.currentTarget.value)
              }
              ref={recoveryCodeRef}
              autoComplete="one-time-code"
            />
            <InputError className="mt-2" message={form.errors.recovery_code} />
          </div>
        ) : (
          <div>
            <Label htmlFor="code" value="Kode"/>
            <TextInput
              id="code"
              type="text"
              inputMode="numeric"
              className="mt-1 block w-full"
              value={form.data.code}
              onChange={e => form.setData('code', e.currentTarget.value)}
              autoFocus
              autoComplete="one-time-code"
              ref={codeRef}
            />
            <InputError className="mt-2" message={form.errors.code} />
          </div>
        )}

        <div className="flex items-center justify-end mt-4">
          <Button
            type="button"
            onClick={toggleRecovery}
          >
            {recovery ? 'Gunakan kode otentifikasi' : 'Gunakan kode pemulihan'}
          </Button>

          <Button color="blue"
            className={classNames('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Masuk
          </Button>
        </div>
      </form>
    </Card>
  );
}
