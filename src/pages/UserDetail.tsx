import { useUser } from '../hooks/useApi';
import { useParams, Link } from 'wouter';

export function UserDetail() {
  const params = useParams();
  const { user, isLoading, isError } = useUser(params.id as string);

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
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <Link
          href="/users"
          className="text-blue-500 hover:text-blue-600 mb-4 inline-block"
        >
          ← 返回用戶列表
        </Link>

        <h1 className="text-3xl font-bold mb-6 text-gray-800">{user?.name}</h1>

        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-700">用戶名：</span>
            <span className="text-gray-600">{user?.username}</span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Email：</span>
            <span className="text-gray-600">{user?.email}</span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">電話：</span>
            <span className="text-gray-600">{user?.phone}</span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">網站：</span>
            <span className="text-gray-600">{user?.website}</span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">公司：</span>
            <span className="text-gray-600">{user?.company?.name}</span>
          </div>

          <div>
            <span className="font-semibold text-gray-700">地址：</span>
            <span className="text-gray-600">
              {user?.address?.street}, {user?.address?.city}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
