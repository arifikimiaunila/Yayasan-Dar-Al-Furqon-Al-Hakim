import useRoute from '@/ts-js part/useRoute';
import ActionSection from '@/Components/ActionSection';
import { Modal, Button } from 'flowbite-react';
import { Team } from '@/types';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useState } from 'react';

interface Props {
  team: Team;
}

export default function DeleteTeamForm({ team }: Props) {
  const route = useRoute();
  const [confirmingTeamDeletion, setConfirmingTeamDeletion] = useState(false);
  const form = useForm({});

  function confirmTeamDeletion() {
    setConfirmingTeamDeletion(true);
  }

  function deleteTeam() {
    form.delete(route('teams.destroy', [team]), {
      errorBag: 'deleteTeam',
    });
  }

  return (
    <ActionSection
      title={'Hapus Tim'}
      description={'Hapus permanen tim ini.'}
    >
      <div className="max-w-xl text-sm text-gray-600
      dark:text-gray-400">
        Setelah tim dihapus, semua sumber daya dan datanya akan dihapus
        dihapus secara permanen. Sebelum menghapus tim ini, harap unduh data apa pun
        atau informasi mengenai tim ini yang ingin Anda simpan.
      </div>

      <div className="mt-5">
        <Button color="warning" onClick={confirmTeamDeletion}>Hapus Tim</Button>
      </div>

      {/* <!-- Delete Team Confirmation Modal --> */}
      <Modal
        show={confirmingTeamDeletion}
        onClose={() => setConfirmingTeamDeletion(false)}
      >
        <Modal.Header>Hapus Tim</Modal.Header>
        <Modal.Body>
        Apakah Anda yakin ingin menghapus tim ini? Setelah sebuah tim dihapus, semuanya
        sumber daya dan datanya akan dihapus secara permanen.
        </Modal.Body>

        <Modal.Footer>
          <Button color="failure" onClick={() => setConfirmingTeamDeletion(false)}>
            Batalkan
          </Button>

          <Button color="warning"
            onClick={deleteTeam}
            className={classNames('ml-2', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Hapus Tim
          </Button>
        </Modal.Footer>
      </Modal>
    </ActionSection>
  );
}
