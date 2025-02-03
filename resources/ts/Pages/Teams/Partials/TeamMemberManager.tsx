import useRoute from '@/ts-js part/useRoute';
import useTypedPage from '@/ts-js part/useTypedPage';
import ActionSection from '@/Components/ActionSection';
import ActionMessage from '@/Components/ActionMessage';
import { Modal, Button, Label, TextInput } from 'flowbite-react';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import SectionBorder from '@/Components/SectionBorder';
import {
  JetstreamTeamPermissions,
  Nullable,
  Role,
  Team,
  TeamInvitation,
  User,
} from '@/types';
import { router } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useState } from 'react';

interface UserMembership extends User {
  membership: {
    role: string;
  };
}

interface Props {
  team: Team & {
    team_invitations: TeamInvitation[];
    users: UserMembership[];
  };
  availableRoles: Role[];
  userPermissions: JetstreamTeamPermissions;
}

export default function TeamMemberManager({
  team,
  availableRoles,
  userPermissions,
}: Props) {
  const route = useRoute();
  const addTeamMemberForm = useForm({
    email: '',
    role: null as Nullable<string>,
  });
  const updateRoleForm = useForm({
    role: null as Nullable<string>,
  });
  const leaveTeamForm = useForm({});
  const removeTeamMemberForm = useForm({});
  const [currentlyManagingRole, setCurrentlyManagingRole] = useState(false);
  const [managingRoleFor, setManagingRoleFor] = useState<Nullable<User>>(null);
  const [confirmingLeavingTeam, setConfirmingLeavingTeam] = useState(false);
  const [teamMemberBeingRemoved, setTeamMemberBeingRemoved] =
    useState<Nullable<User>>(null);
  const page = useTypedPage();

  function addTeamMember() {
    addTeamMemberForm.post(route('team-members.store', [team]), {
      errorBag: 'addTeamMember',
      preserveScroll: true,
      onSuccess: () => addTeamMemberForm.reset(),
    });
  }

  function BatalkanTeamInvitation(invitation: TeamInvitation) {
    router.delete(route('team-invitations.destroy', [invitation]), {
      preserveScroll: true,
    });
  }

  function manageRole(teamMember: UserMembership) {
    setManagingRoleFor(teamMember);
    updateRoleForm.setData('role', teamMember.membership.role);
    setCurrentlyManagingRole(true);
  }

  function updateRole() {
    if (!managingRoleFor) {
      return;
    }
    updateRoleForm.put(route('team-members.update', [team, managingRoleFor]), {
      preserveScroll: true,
      onSuccess: () => setCurrentlyManagingRole(false),
    });
  }

  function confirmLeavingTeam() {
    setConfirmingLeavingTeam(true);
  }

  function leaveTeam() {
    leaveTeamForm.delete(
      route('team-members.destroy', [team, page.props.auth.user!]),
    );
  }

  function confirmTeamMemberRemoval(teamMember: User) {
    setTeamMemberBeingRemoved(teamMember);
  }

  function removeTeamMember() {
    if (!teamMemberBeingRemoved) {
      return;
    }
    removeTeamMemberForm.delete(
      route('team-members.destroy', [team, teamMemberBeingRemoved]),
      {
        errorBag: 'removeTeamMember',
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => setTeamMemberBeingRemoved(null),
      },
    );
  }

  function displayableRole(role: string) {
    return availableRoles.find(r => r.key === role)?.name;
  }

  return (
    <div>
      {userPermissions.canAddTeamMembers ? (
        <div>
          <SectionBorder />

          {/* <!-- Add Team Member --> */}
          <FormSection
            onSubmit={addTeamMember}
            title={'Tambah Anggota Tim'}
            description={
              'Tambahkan anggota tim baru ke tim Anda, izinkan mereka berkolaborasi dengan Anda.'
            }
            renderActions={() => (
              <>
                <ActionMessage
                  on={addTeamMemberForm.recentlySuccessful}
                  className="mr-3"
                >
                  Ditambahkan.
                </ActionMessage>

                <Button color="blue"
                  className={classNames({
                    'opacity-25': addTeamMemberForm.processing,
                  })}
                  disabled={addTeamMemberForm.processing}
                >
                  Tambahkan
                </Button>
              </>
            )}
          >
            <div className="col-span-6">
              <div className="max-w-xl text-sm text-gray-600
              dark:text-gray-400">
                Silakan berikan alamat email orang yang Anda inginkan
                tambahkan ke tim ini.
              </div>
            </div>

            {/* <!-- Member Email --> */}
            <div className="col-span-6 sm:col-span-4">
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                className="mt-1 block w-full"
                value={addTeamMemberForm.data.email}
                onChange={e =>
                  addTeamMemberForm.setData('email', e.currentTarget.value)
                }
              />
              <InputError
                message={addTeamMemberForm.errors.email}
                className="mt-2"
              />
            </div>

            {/* <!-- Role --> */}
            {availableRoles.length > 0 ? (
              <div className="col-span-6 lg:col-span-4">
                <Label htmlFor="roles" value="Role" />
                <InputError
                  message={addTeamMemberForm.errors.role}
                  className="mt-2"
                />

                <div className="relative z-0 mt-1 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer">
                  {availableRoles.map((role, i) => (
                    <button
                      type="button"
                      className={classNames(
                        'relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600',
                        {
                          'border-t border-gray-200 dark:border-gray-700 focus:border-none rounded-t-none':
                            i > 0,
                          'rounded-b-none':
                            i != Object.keys(availableRoles).length - 1,
                        },
                      )}
                      onClick={() =>
                        addTeamMemberForm.setData('role', role.key)
                      }
                      key={role.key}
                    >
                      <div
                        className={classNames({
                          'opacity-50':
                            addTeamMemberForm.data.role &&
                            addTeamMemberForm.data.role != role.key,
                        })}
                      >
                        {/* <!-- Role Name --> */}
                        <div className="flex items-center">
                          <div
                            className={classNames(
                              'text-sm text-gray-600 dark:text-gray-400',
                              {
                                'font-semibold':
                                  addTeamMemberForm.data.role == role.key,
                              },
                            )}
                          >
                            {role.name}
                          </div>

                          {addTeamMemberForm.data.role == role.key ? (
                            <svg
                              className="ml-2 h-5 w-5 text-green-400"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          ) : null}
                        </div>

                        {/* <!-- Role Description --> */}
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                          {role.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </FormSection>
        </div>
      ) : null}

      {team.team_invitations.length > 0 && userPermissions.canAddTeamMembers ? (
        <div>
          <SectionBorder />

          {/* <!-- Team Member Invitations --> */}
          <div className="mt-10 sm:mt-0" />

          <ActionSection
            title={'Pending Team Invitations'}
            description={
              'These people have been invited to your team and have been sent an invitation email. They may join the team by accepting the email invitation.'
            }
          >
            {/* <!-- Pending Team Member Invitation List --> */}
            <div className="space-y-6">
              {team.team_invitations.map(invitation => (
                <div
                  className="flex items-center justify-between"
                  key={invitation.id}
                >
                  <div className="text-gray-600 dark:text-gray-400">
                    {invitation.email}
                  </div>

                  <div className="flex items-center">
                    {/* <!-- Batalkan Team Invitation --> */}
                    {userPermissions.canRemoveTeamMembers ? (
                      <Button color="warning"
                        onClick={() => BatalkanTeamInvitation(invitation)}
                      >
                        Batalkan
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </ActionSection>
        </div>
      ) : null}

      {team.users.length > 0 ? (
        <div>
          <SectionBorder />

          {/* <!-- Manage Team Members --> */}
          <div className="mt-10 sm:mt-0" />

          <ActionSection
            title={'Anggota Tim'}
            description={'Semua orang yang menjadi bagian dari tim ini.'}
          >
            {/* <!-- Team Member List --> */}
            <div className="space-y-6">
              {team.users.map(user => (
                <div
                  className="flex items-center justify-between"
                  key={user.id}
                >
                  <div className="flex items-center">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user.profile_photo_url}
                      alt={user.name}
                    />
                    <div className="ml-4 dark:text-white">{user.name}</div>
                  </div>

                  <div className="flex items-center">
                    {/* <!-- Manage Team Member Role --> */}
                    {userPermissions.canAddTeamMembers &&
                    availableRoles.length ? (
                      <button
                        className="ml-2 text-sm text-gray-400 underline"
                        onClick={() => manageRole(user)}
                      >
                        {displayableRole(user.membership.role)}
                      </button>
                    ) : availableRoles.length ? (
                      <div className="ml-2 text-sm text-gray-400">
                        {displayableRole(user.membership.role)}
                      </div>
                    ) : null}

                    {/* <!-- Leave Team --> */}
                    {page.props.auth.user?.id === user.id ? (
                      <Button color="danger"
                        className="cursor-pointer ml-6 text-sm text-red-500"
                        onClick={confirmLeavingTeam}
                      >
                        Tinggalkan
                      </Button>
                    ) : null}

                    {/* <!-- Remove Team Member --> */}
                    {userPermissions.canRemoveTeamMembers ? (
                      <Button color="warning"
                        className="cursor-pointer ml-6 text-sm text-red-500"
                        onClick={() => confirmTeamMemberRemoval(user)}
                      >
                        Hapus
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </ActionSection>
        </div>
      ) : null}

      {/* <!-- Role Management Modal --> */}
      <Modal
        show={currentlyManagingRole}
        onClose={() => setCurrentlyManagingRole(false)}
      >
        <Modal.Header>Kelola Peranan</Modal.Header> <Modal.Body></Modal.Body>
        {managingRoleFor ? (
          <div>
            <div className="relative z-0 mt-1 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer">
              {availableRoles.map((role, i) => (
                <button
                  type="button"
                  className={classNames(
                    'relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600',
                    {
                      'border-t border-gray-200 dark:border-gray-700 focus:border-none rounded-t-none':
                        i > 0,
                      'rounded-b-none':
                        i !== Object.keys(availableRoles).length - 1,
                    },
                  )}
                  onClick={() => updateRoleForm.setData('role', role.key)}
                  key={role.key}
                >
                  <div
                    className={classNames({
                      'opacity-50':
                        updateRoleForm.data.role &&
                        updateRoleForm.data.role !== role.key,
                    })}
                  >
                    {/* <!-- Role Name --> */}
                    <div className="flex items-center">
                      <div
                        className={classNames(
                          'text-sm text-gray-600 dark:text-gray-400',
                          {
                            'font-semibold':
                              updateRoleForm.data.role === role.key,
                          },
                        )}
                      >
                        {role.name}
                      </div>
                      {updateRoleForm.data.role === role.key ? (
                        <svg
                          className="ml-2 h-5 w-5 text-green-400"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      ) : null}
                    </div>

                    {/* <!-- Role Description --> */}
                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      {role.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <Modal.Footer>
          <Button color="failure" onClick={() => setCurrentlyManagingRole(false)}>
            Batalkan
          </Button>

          <Button color="blue"
            onClick={updateRole}
            className={classNames('ml-2', {
              'opacity-25': updateRoleForm.processing,
            })}
            disabled={updateRoleForm.processing}
          >
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <!-- Leave Team Confirmation Modal --> */}
      <Modal
        show={confirmingLeavingTeam}
        onClose={() => setConfirmingLeavingTeam(false)}
      >
        <Modal.Header>Tinggalkan Tim</Modal.Header>
        <Modal.Body>
        Apakah Anda yakin ingin meninggalkan tim ini?
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={() => setConfirmingLeavingTeam(false)}>
            Batalkan
          </Button>

          <Button color="warning"
            onClick={leaveTeam}
            className={classNames('ml-2', {
              'opacity-25': leaveTeamForm.processing,
            })}
            disabled={leaveTeamForm.processing}
          >
            Tinggalkan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <!-- Remove Team Member Confirmation Modal --> */}
      <Modal
        show={!!teamMemberBeingRemoved}
        onClose={() => setTeamMemberBeingRemoved(null)}
      >
        <Modal.Header>Hapus Anggota Tim</Modal.Header>
        <Modal.Body>
        Apakah Anda yakin ingin mengeluarkan orang ini dari tim?
          </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={() => setTeamMemberBeingRemoved(null)}>
            Batalkan
          </Button>

          <Button color="warning"
            onClick={removeTeamMember}
            className={classNames('ml-2', {
              'opacity-25': removeTeamMemberForm.processing,
            })}
            disabled={removeTeamMemberForm.processing}
          >
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
