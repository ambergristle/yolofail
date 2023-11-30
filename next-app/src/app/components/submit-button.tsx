'use client';

import { useFormStatus } from 'react-dom';
import { ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/button';

type SubmitButtonProps = {
  size?: 'icon';
  children: React.ReactNode;
}

export const SubmitButton = ({
  size,
  children,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      variant="outline"
      size={size}
    >
      {pending ? (
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : children}
    </Button>
  );
};
