import { revalidatePath } from 'next/cache';
import { useFormStatus } from 'react-dom';


const useIsLoading = () => {
  const { pending } = useFormStatus();
  return pending;
};

// aria-live="polite" className="sr-only" role="status"

export const query = async (prev: any, payload: any) => {

  try {
    // parse

    // do work

    revalidatePath('/');

    return {

    };
  } catch (error) {
    console.error(error);

    return {

    };
  }

};
