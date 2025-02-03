import { useForm } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/ts-js part/useRoute';
import useTypedPage from '@/ts-js part/useTypedPage';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import { Label, Button, TextInput } from 'flowbite-react';
import classNames from 'classnames';

export default function CreateTeamForm() {
  const route = useRoute();
  const page = useTypedPage();
  const form = useForm({
    name: '',
  });

  function createTeam() {
    form.post(route('teams.store'), {
      errorBag: 'createTeam',
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={createTeam}
      title={'Team Details'}
      description={'Create a new team to collaborate with others on projects.'}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Saved.
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
      <div className="col-span-6">
        <Label value="Pemilik Tim" />

        <div className="flex items-center mt-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={page.props.auth.user?.profile_photo_url}
            alt={page.props.auth.user?.name}
          />

          <div className="ml-4 leading-tight">
            <div className="text-gray-900
             dark:text-white">
              {page.props.auth.user?.name}
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">
              {page.props.auth.user?.email}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-6 sm:col-span-4">
        <Label htmlFor="name" value="Nama Tim" />
        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          autoFocus
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>
    </FormSection>
  );
}
