import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import { Button, Label, TextInput, Checkbox, Modal  } from 'flowbite-react';
import React, { useState } from 'react';
import useRoute from '@/ts-js part/useRoute';
import ActionMessage from '@/Components/ActionMessage';
import ActionSection from '@/Components/ActionSection';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import SectionBorder from '@/Components/SectionBorder';
import { ApiToken } from '@/types';
import useTypedPage from '@/ts-js part/useTypedPage';

interface Props {
  tokens: ApiToken[];
  availablePermissions: string[];
  defaultPermissions: string[];
}

export default function APITokenManager({
  tokens,
  availablePermissions,
  defaultPermissions,
}: Props) {
  const route = useRoute();
  const createApiTokenForm = useForm({
    name: '',
    permissions: defaultPermissions,
  });
  const updateApiTokenForm = useForm({
    permissions: [] as string[],
  });
  const deleteApiTokenForm = useForm({});
  const [displayingToken, setDisplayingToken] = useState(false);
  const [managingPermissionsFor, setManagingPermissionsFor] =
    useState<ApiToken | null>(null);
  const [apiTokenBeingDeleted, setApiTokenBeingDeleted] =
    useState<ApiToken | null>(null);
  const page = useTypedPage();

  function createApiToken() {
    createApiTokenForm.post(route('api-tokens.store'), {
      preserveScroll: true,
      onSuccess: () => {
        setDisplayingToken(true);
        createApiTokenForm.reset();
      },
    });
  }

  function manageApiTokenPermissions(token: ApiToken) {
    updateApiTokenForm.setData('permissions', token.abilities);
    setManagingPermissionsFor(token);
  }

  function updateApiToken() {
    if (!managingPermissionsFor) {
      return;
    }
    updateApiTokenForm.put(
      route('api-tokens.update', [managingPermissionsFor]),
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => setManagingPermissionsFor(null),
      },
    );
  }

  function confirmApiTokenDeletion(token: ApiToken) {
    setApiTokenBeingDeleted(token);
  }

  function deleteApiToken() {
    if (!apiTokenBeingDeleted) {
      return;
    }
    deleteApiTokenForm.delete(
      route('api-tokens.destroy', [apiTokenBeingDeleted]),
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => setApiTokenBeingDeleted(null),
      },
    );
  }

  return (
  <>
    <div>
      {/* <!-- Generate API Token --> */}
      <FormSection
        onSubmit={createApiToken}
        title={'Create API Token'}
        description={
          'API tokens allow third-party services to authenticate with our application on your behalf.'
        }
        renderActions={() => (
          <>
            <ActionMessage
              on={createApiTokenForm.recentlySuccessful}
              className="mr-3"
            >
              Berhasil dibuat.
            </ActionMessage>

            <Button color="blue"
              className={classNames({
                'opacity-25': createApiTokenForm.processing,
              })}
              disabled={createApiTokenForm.processing}
            >
              Buat
            </Button>
          </>
        )}
      >
        {/* <!-- Token Name --> */}
        <div className="col-span-6 
        sm:col-span-4">
          <Label htmlFor="name"value="Name"/>
          <TextInput
            id="name"
            type="text"
            value={createApiTokenForm.data.name}
            onChange={e =>
              createApiTokenForm.setData('name', e.currentTarget.value)
            }
            autoFocus
          />
          <InputError
            message={createApiTokenForm.errors.name}
            className="mt-2"
          />
        </div>

        {/* <!-- Token Permissions --> */}
        {availablePermissions.length > 0 && (
          <div className="col-span-6">
            <Label htmlFor="permissions" value="Izin"/>

            <div className="mt-2 grid grid-cols-1 
            md:grid-cols-2 gap-4">
              {availablePermissions.map(permission => (
                <div key={permission}>
                  <label className="flex items-center">
                    <Checkbox
                      value={permission}
                      checked={createApiTokenForm.data.permissions.includes(
                        permission,
                      )}
                      onChange={e => {
                        if (
                          createApiTokenForm.data.permissions.includes(
                            e.currentTarget.value,
                          )
                        ) {
                          createApiTokenForm.setData(
                            'permissions',
                            createApiTokenForm.data.permissions.filter(
                              p => p !== e.currentTarget.value,
                            ),
                          );
                        } else {
                          createApiTokenForm.setData('permissions', [
                            e.currentTarget.value,
                            ...createApiTokenForm.data.permissions,
                          ]);
                        }
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-600 
                    dark:text-gray-400">
                      {permission}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </FormSection>

      {tokens.length > 0 ? (
        <div>
          <SectionBorder />

          {/* <!-- Manage API Tokens --> */}
          <div className="mt-10 sm:mt-0">
            <ActionSection
              title={'Manage API Tokens'}
              description={
                'You may delete any of your existing tokens if they are no longer needed.'
              }
            >
              {/* <!-- API Token List --> */}
              <div className="space-y-6">
                {tokens.map(token => (
                  <div
                    className="flex items-center justify-between"
                    key={token.id}
                  >
                    <div className="break-all dark:text-white">
                      {token.name}
                    </div>

                    <div className="flex items-center">
                      {token.last_used_ago && (
                        <div className="text-sm text-gray-400">
                          Last used {token.last_used_ago}
                        </div>
                      )}

                      {availablePermissions.length > 0 ? (
                        <Button color="blue"
                          onClick={() => manageApiTokenPermissions(token)}
                        >
                          Permissions
                        </Button>
                      ) : null}

                      <Button color ="warning"
                        onClick={() => confirmApiTokenDeletion(token)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ActionSection>
          </div>
        </div>
      ) : null}

       {/* <!-- Token Value Modal --> */}
       <Modal
        show={displayingToken}
        onClose={() => setDisplayingToken(false)}
      >
        <Modal.Header>API Token</Modal.Header>
          <Modal.Body>
          <div>
            Please copy your new API token. For your security, it won't be shown
            again.
          </div>

          <div className="mt-4 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded font-mono text-sm text-gray-500">
            {page.props?.jetstream?.flash?.token}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={() => setDisplayingToken(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <!-- API Token Permissions Modal --> */}
      <Modal
        show={!!managingPermissionsFor}
        onClose={() => setManagingPermissionsFor(null)}
      >
        <Modal.Header>API Token Permissions</Modal.Header>
          <Modal.Body className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePermissions.map(permission => (
              <div key={permission}>
                <label className="flex items-center">
                  <Checkbox
                    value={permission}
                    checked={updateApiTokenForm.data.permissions.includes(
                      permission,
                    )}
                    onChange={e => {
                      if (
                        updateApiTokenForm.data.permissions.includes(
                          e.currentTarget.value,
                        )
                      ) {
                        updateApiTokenForm.setData(
                          'permissions',
                          updateApiTokenForm.data.permissions.filter(
                            p => p !== e.currentTarget.value,
                          ),
                        );
                      } else {
                        updateApiTokenForm.setData('permissions', [
                          e.currentTarget.value,
                          ...updateApiTokenForm.data.permissions,
                        ]);
                      }
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {permission}
                  </span>
                </label>
              </div>
            ))}
          </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={() => setManagingPermissionsFor(null)}>
            Batalkan
          </Button>

          <Button color="success"
            onClick={updateApiToken}
            className={classNames('ml-2', {
              'opacity-25': updateApiTokenForm.processing,
            })}
            disabled={updateApiTokenForm.processing}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <!-- Delete Token Confirmation Modal --> */}
      <Modal
        show={!!apiTokenBeingDeleted}
        onClose={() => setApiTokenBeingDeleted(null)}
      >
        <Modal.Header>'Delete API Token</Modal.Header>
        <Modal.Body>
          Are you sure you would like to delete this API token?
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={() => setApiTokenBeingDeleted(null)}>
            Batalkan
          </Button>

          <Button color="warning"
            onClick={deleteApiToken}
            className={classNames('ml-2', {
              'opacity-25': deleteApiTokenForm.processing,
            })}
            disabled={deleteApiTokenForm.processing}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
</>
  );
}
