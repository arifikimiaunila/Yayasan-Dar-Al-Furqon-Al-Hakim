import axios from 'axios';
import { Button, Modal, TextInput } from "flowbite-react";
import classNames from 'classnames';
import React, { PropsWithChildren, useRef, useState } from 'react';
import useRoute from '@/ts-js part/useRoute';
import InputError from '@/Components/InputError';


interface Props {
  title?: string;
  content?: string;
  button?: string;
  onConfirm(): void;
}

export default function ConfirmsPassword({
  title = 'Confirm Password',
  content = 'For your security, please confirm your password to continue.',
  button = 'Confirm',
  onConfirm,
  children,
}: PropsWithChildren<Props>) {
  const route = useRoute();
  const [confirmingPassword, setConfirmingPassword] = useState(false);
  const [form, setForm] = useState({
    password: '',
    error: '',
    processing: false,
  });
  const passwordRef = useRef<HTMLInputElement>(null);

  function startConfirmingPassword() {
    axios.get(route('password.confirmation')).then(response => {
      if (response.data.confirmed) {
        onConfirm();
      } else {
        setConfirmingPassword(true);

        setTimeout(() => passwordRef.current?.focus(), 250);
      }
    });
  }

  function confirmPassword() {
    setForm({ ...form, processing: true });

    axios
      .post(route('password.confirm'), {
        password: form.password,
      })
      .then(() => {
        closeModal();
        setTimeout(() => onConfirm(), 250);
      })
      .catch(error => {
        setForm({
          ...form,
          processing: false,
          error: error.response.data.errors.password[0],
        });
        passwordRef.current?.focus();
      });
  }

  function closeModal() {
    setConfirmingPassword(false);
    setForm({ processing: false, password: '', error: '' });
  }

  return (
    <span>
      <span onClick={startConfirmingPassword}>{children}</span>

      <Modal show={confirmingPassword} onClose={closeModal}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
          {content}

          <div className="mt-4">
            <TextInput
              ref={passwordRef}
              type="password"
              placeholder="Password"
              value={form.password}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: { currentTarget: { value: any; }; }) =>
                setForm({ ...form, password: e.currentTarget.value })
              }
            />

            <InputError message={form.error} className="mt-2" />
          </div>
          </Modal.Body>

        <Modal.Footer>
          <Button color="warning" onClick={closeModal}>Batalkan</Button>

          <Button color="blue"
            className={classNames('ml-2', { 'opacity-25': form.processing })}
            onClick={confirmPassword}
            disabled={form.processing}
          >
            {button}
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}
