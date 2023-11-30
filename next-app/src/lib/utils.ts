import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
 
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const parserFactory = <S extends z.ZodSchema>(schema: S) => {
  return (data: unknown): S['_output'] => {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error('', { cause: error });
      }

      throw error;
    }
  };
};




import { isArray, isObject } from './types';

export const stripEmptyProperties = (data: object, empty: unknown[] = [undefined, '']) => {
  if (!isObject(data)) {
    throw new Error(`Invalid parameter type: ${typeof data}`);
  }

  if (data instanceof Date) return data;

  return Object.entries(data).reduce((copy: { [key: string]: unknown }, [key, value]) => {
    if (empty.includes(value)) return copy;

    copy[key] = (isArray(value) || isObject(value))
      ? stripEmptyProperties(value, empty)
      : value;

    return copy;
  }, isArray(data) ? [] : {});
};


export const downloadFileFromUrl = (url: string, fileName: string) => {
  const downloadLink = window.document.createElement('a');

  downloadLink.href = url;
  downloadLink.setAttribute('download', fileName);
  downloadLink.setAttribute('target', '_blank');
  downloadLink.setAttribute('noopener', 'true');
  downloadLink.setAttribute('noreferrer', 'true');

  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.parentNode?.removeChild(downloadLink);
};
