export default function ImageUpload({ previews, handleFileChange, publish }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-semibold mb-2">Upload Images</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="w-full text-sm"
      />

      {previews.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {previews.map((img, i) => (
              <div key={i} className="border rounded overflow-hidden">
                <img src={img} className="h-24 w-full object-cover" />
              </div>
            ))}
          </div>

          <button
            onClick={publish}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
          >
            Publish
          </button>
        </>
      )}
    </div>
  );
}
