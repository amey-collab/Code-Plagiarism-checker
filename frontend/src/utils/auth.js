import { useMemo } from 'react';

const STORAGE_KEY = 'codeplagiarism-user';

export const getStoredUser = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
};

export const setStoredUser = (payload) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const clearStoredUser = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const useAuth = () => {
  return useMemo(() => getStoredUser(), []);
};
