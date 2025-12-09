export default function Header({ unread, clearAll, markRead }) {
  return (
    <header className="max-w-6xl mx-auto flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">TG Infinite Image Blog</h1>

      <div className="flex gap-4 items-center">
        <div className="relative">
          <button onClick={markRead} className="border p-2 rounded bg-white">
            🔔
          </button>
          {unread > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex justify-center items-center">
              {unread}
            </span>
          )}
        </div>

        <button
          onClick={clearAll}
          className="bg-red-100 text-red-600 px-3 py-2 rounded"
        >
          Clear All
        </button>
      </div>
    </header>
  );
}
