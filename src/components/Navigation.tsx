import { Link, useLocation } from 'wouter';

export function Navigation() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path ? 'bg-blue-600' : 'hover:bg-blue-600';
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="max-w-6xl mx-auto flex space-x-4">
        <Link
          href="/"
          className={`px-4 py-2 rounded transition-colors ${isActive('/')}`}
        >
          首頁
        </Link>
        <Link
          href="/users"
          className={`px-4 py-2 rounded transition-colors ${isActive(
            '/users'
          )}`}
        >
          用戶列表
        </Link>
      </div>
    </nav>
  );
}
