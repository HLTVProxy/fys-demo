import useSWR from 'swr';
import type { User } from '../types/user';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUsers() {
  const { data, error, isLoading } = useSWR<User[]>(
    'https://jsonplaceholder.typicode.com/users',
    fetcher
  );

  return {
    users: data,
    isLoading,
    isError: error,
  };
}

export function useUser(id: string) {
  const { data, error, isLoading } = useSWR<User>(
    id ? `https://jsonplaceholder.typicode.com/users/${id}` : null,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
