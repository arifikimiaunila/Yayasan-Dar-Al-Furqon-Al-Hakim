import { router } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import classNames from 'classnames';
import React, { useState } from 'react';
import ActionSection from '@/Components/ActionSection';
import ConfirmsPassword from '@/Components/ConfirmsPassword';
import { Button, Label, TextInput } from 'flowbite-react';
import InputError from '@/Components/InputError';
import useTypedPage from '@/ts-js part/useTypedPage';

interface Props {
  requiresConfirmation: boolean;
}

export default function TwoFactorAuthenticationForm({
  requiresConfirmation,
}: Props) {
  const page = useTypedPage();
  const [enabling, setEnabling] = useState(false);
  const [disabling, setDisabling] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [setupKey, setSetupKey] = useState<string | null>(null);
  const confirmationForm = useForm({
    code: '',
  });
  const twoFactorEnabled =
    !enabling && page.props?.auth?.user?.two_factor_enabled;

  function enableTwoFactorAuthentication() {
    setEnabling(true);

    router.post(
      '/user/two-factor-authentication',
      {},
      {
        preserveScroll: true,
        onSuccess() {
          return Promise.all([
            showQrCode(),
            showSetupKey(),
            showRecoveryCodes(),
          ]);
        },
        onFinish() {
          setEnabling(false);
          setConfirming(requiresConfirmation);
        },
      },
    );
  }

  async function showSetupKey() {
    const response = await axios.get('/user/two-factor-secret-key');
      setSetupKey(response.data.secretKey);
  }

  function confirmTwoFactorAuthentication() {
    confirmationForm.post('/user/confirmed-two-factor-authentication', {
      preserveScroll: true,
      preserveState: true,
      errorBag: 'confirmTwoFactorAuthentication',
      onSuccess: () => {
        setConfirming(false);
        setQrCode(null);
        setSetupKey(null);
      },
    });
  }

  async function showQrCode() {
    const response = await axios.get('/user/two-factor-qr-code');
      setQrCode(response.data.svg);
  }

  async function showRecoveryCodes() {
    const response = await axios.get('/user/two-factor-recovery-codes');
      setRecoveryCodes(response.data);
  }

  function regenerateRecoveryCodes() {
    axios.post('/user/two-factor-recovery-codes').then(() => {
      showRecoveryCodes();
    });
  }

  function disableTwoFactorAuthentication() {
    setDisabling(true);

    router.delete('/user/two-factor-authentication', {
      preserveScroll: true,
      onSuccess() {
        setDisabling(false);
        setConfirming(false);
      },
    });
  }

  return (
    <ActionSection
      title={'Otentifikasi Dua Tahap'}
      description={
        'Tambahkan keamanan tambahan ke akun Anda menggunakan otentikasi dua faktor.'
      }
    >
      {(() => {
        if (twoFactorEnabled && !confirming) {
          return (
            <h3 className="text-lg font-medium text-gray-900
            dark:text-gray-100">
              Anda telah mengaktifkan otentikasi dua faktor.
            </h3>
          );
        }
        if (confirming) {
          return (
            <h3 className="text-lg font-medium text-gray-900
            dark:text-gray-100">
              Selesaikan pengaktifan autentikasi dua faktor.
            </h3>
          );
        }
        return (
          <h3 className="text-lg font-medium text-gray-900
          dark:text-gray-100">
            Anda belum mengaktifkan autentikasi dua faktor.
          </h3>
        );
      })()}

      <div className="mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400">
        <p>
        Ketika otentikasi dua faktor diaktifkan, Anda akan diminta untuk a
          token acak yang aman selama otentikasi. Anda dapat mengambil ini
          token dari aplikasi Google Authenticator ponsel Anda.
        </p>
      </div>

      {twoFactorEnabled || confirming ? (
        <div>
          {qrCode ? (
            <div>
              <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                {confirming ? (
                  <p className="font-semibold">
                    Ketika otentikasi dua faktor diaktifkan, Anda akan diminta untuk a
          token acak yang aman selama otentikasi. Anda dapat mengambil ini
          token dari aplikasi Google Authenticator ponsel Anda.
                  </p>
                ) : (
                  <p>
                    Otentikasi dua faktor sekarang diaktifkan. Pindai yang berikut ini
                    Kode QR menggunakan aplikasi autentikator ponsel Anda atau
                    masukkan kunci pengaturan.
                  </p>
                )}
              </div>

              <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: qrCode || '' }}
              />

              {setupKey && (
                <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-semibold">
                  Kunci Pengaturan:{' '}
                    <span
                      dangerouslySetInnerHTML={{ __html: setupKey || '' }}
                    />
                  </p>
                </div>
              )}

              {confirming && (
                <div className="mt-4">
                  <Label htmlFor="code" value="Kode" />

                  <TextInput
                    id="code"
                    type="text"
                    name="code"
                    className="block mt-1 w-1/2"
                    inputMode="numeric"
                    autoFocus={true}
                    autoComplete="one-time-code"
                    value={confirmationForm.data.code}
                    onChange={e =>
                      confirmationForm.setData('code', e.currentTarget.value)
                    }
                  />

                  <InputError
                    message={confirmationForm.errors.code}
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          ) : null}

          {recoveryCodes.length > 0 && !confirming ? (
            <div>
              <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                <p className="font-semibold">
                Simpan kode pemulihan ini di pengelola kata sandi yang aman. Mereka
                  dapat digunakan untuk memulihkan akses ke akun Anda jika Anda berdua
                  perangkat otentikasi faktor hilang.
                </p>
              </div>

              <div className="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono
              text-sm bg-gray-100 dark:bg-gray-900 rounded-lg">
                {recoveryCodes.map(code => (
                  <div key={code}>{code}</div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5">
        {twoFactorEnabled || confirming ? (
          <div>
            {confirming ? (
              <ConfirmsPassword onConfirm={confirmTwoFactorAuthentication}>
                <Button color="blue"
                  className={classNames('mr-3', { 'opacity-25': enabling })}
                  disabled={enabling}
                >
                  Konfirmasi
                </Button>
              </ConfirmsPassword>
            ) : null}
            {recoveryCodes.length > 0 && !confirming ? (
              <ConfirmsPassword onConfirm={regenerateRecoveryCodes}>
                <Button color="success" className="mr-3">
                Regenerasi Kode Pemulihan
                </Button>
              </ConfirmsPassword>
            ) : null}
            {recoveryCodes.length === 0 && !confirming ? (
              <ConfirmsPassword onConfirm={showRecoveryCodes}>
                <Button color="light" className="mr-3">
                Tampilkan Kode Pemulihan
                </Button>
              </ConfirmsPassword>
            ) : null}

            {confirming ? (
              <ConfirmsPassword onConfirm={disableTwoFactorAuthentication}>
                <Button color="dark"
                  className={classNames('mr-3', { 'opacity-25': disabling })}
                  disabled={disabling}
                >
                  Batalkan
                </Button>
              </ConfirmsPassword>
            ) : (
              <ConfirmsPassword onConfirm={disableTwoFactorAuthentication}>
                <Button color="warning"
                  className={classNames({ 'opacity-25': disabling })}
                  disabled={disabling}
                >
                  Nonaktifkan
                </Button>
              </ConfirmsPassword>
            )}
          </div>
        ) : (
          <div>
            <ConfirmsPassword onConfirm={enableTwoFactorAuthentication}>
              <Button color="blue"
                type="button"
                className={classNames({ 'opacity-25': enabling })}
                disabled={enabling}
              >
                Aktifkan
              </Button>
            </ConfirmsPassword>
          </div>
        )}
      </div>
    </ActionSection>
  );
}
