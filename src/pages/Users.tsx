import { useUsers } from '../hooks/useApi';
import { Link } from 'wouter';
import type { User } from '../types/user';

export function Users() {
  const { users, isLoading, isError } = useUsers();

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600 text-xl">載入用戶資料時發生錯誤</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600 text-xl">載入中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          用戶列表
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users?.map((user: User) => (
            <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-600 mb-2">@{user.username}</p>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <Link
                href={`/users/${user.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors inline-block"
              >
                查看詳情
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
