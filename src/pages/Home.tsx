import { useAppStore } from '../store/app';

export function Home() {
  const { count, increment, decrement, reset } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          計數器範例
        </h1>

        <div className="text-center">
          <div className="text-6xl font-bold text-blue-600 mb-8">{count}</div>

          <div className="space-x-4 mb-6">
            <button
              onClick={increment}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              增加
            </button>
            <button
              onClick={decrement}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              減少
            </button>
          </div>

          <button
            onClick={reset}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            重置
          </button>
        </div>
      </div>
    </div>
  );
}
