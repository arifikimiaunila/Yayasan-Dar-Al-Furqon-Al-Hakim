import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import useRoute from '@/ts-js part/useRoute';
import ActionSection from '@/Components/ActionSection';
import { Button, Modal, TextInput } from 'flowbite-react';
import InputError from '@/Components/InputError';


export default function DeleteUserForm() {
  const route = useRoute();
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const form = useForm({
    password: '',
  });
  const passwordRef = useRef<HTMLInputElement>(null);

  function confirmUserDeletion() {
    setConfirmingUserDeletion(true);

    setTimeout(() => passwordRef.current?.focus(), 250);
  }

  function deleteUser() {
    form.delete(route('current-user.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordRef.current?.focus(),
      onFinish: () => form.reset(),
    });
  }

  function closeModal() {
    setConfirmingUserDeletion(false);
    form.reset();
  }

  return (
    <ActionSection
      title={'Hapus akun'}
      description={'Hapus akunmu secara permanen.'}
    >
      <div className="max-w-xl text-sm text-gray-600
      dark:text-gray-400">
        Once your account is deleted, all of its resources and data will be
        permanently deleted. Before deleting your account, please download any
        data or information that you wish to retain.
      </div>

      <div className="mt-5">
        <Button color="warning" onClick={confirmUserDeletion}>
          Hapus Akun
        </Button>
      </div>

      {/* <!-- Delete Account Confirmation Modal --> */}
      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <Modal.Header>Hapus Akun</Modal.Header>
        <Modal.Body>
            Apakah Anda yakin ingin menghapus akun Anda? Setelah akun Anda
            dihapus, semua sumber daya dan datanya akan dihapus secara permanen.
            Silakan masukkan kata sandi Anda untuk mengonfirmasi keinginan Anda secara permanen
            hapus akunmu.
            <div className="mt-4">
            <TextInput
              type="password"
              className="mt-1 block w-3/4"
              placeholder="Password"
              value={form.data.password}
              onChange={e => form.setData('password', e.currentTarget.value)}
            />

            <InputError message={form.errors.password} className="mt-2" />
          </div>
          </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={closeModal}>Batalkan</Button>

          <Button color="warning"
            onClick={deleteUser}
            className={classNames('ml-2', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Hapus akun
          </Button>
        </Modal.Footer>
      </Modal>
    </ActionSection>
  );
}
