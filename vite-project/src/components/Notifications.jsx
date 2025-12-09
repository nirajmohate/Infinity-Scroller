export default function Notifications({ items }) {
  return (
    <div className="bg-white p-4 shadow rounded mt-4">
      <h2 className="font-semibold mb-2">Notifications</h2>

      <ul className="space-y-2 text-sm">
        {items.map((item, i) => (
          <li key={i} className="bg-gray-100 p-2 rounded">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
