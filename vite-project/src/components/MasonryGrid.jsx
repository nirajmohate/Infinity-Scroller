import { timeAgo } from "../utils/helpers";

export default function MasonryGrid({ posts }) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="mb-4 break-inside-avoid bg-white shadow rounded overflow-hidden"
        >
          <img src={post.image} className="w-full" />
          <div className="p-3">
            <h3 className="font-semibold">{post.title}</h3>
            <span className="text-xs text-gray-500">
              {timeAgo(post.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
