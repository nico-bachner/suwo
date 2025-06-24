import { addToLibrary } from "@/features/library/add_to_library";

export default function AddToLibraryForm() {
  return (
    <div>
      <p className="text-center text-2xl font-bold">Add a new piece to the library</p>
      <form className="flex flex-col gap-4" action={addToLibrary}>
        <label className="flex flex-col">
          <span>Title *</span>
          <input type="text" name="title" required className="border p-2 rounded" />
        </label>

        <label className="flex flex-col">
          <span>Composer *</span>
          <input type="text" name="composer" required className="border p-2 rounded" />
        </label>

        <label className="flex flex-col">
          <span>Arranger</span>
          <input type="text" name="arranger" className="border p-2 rounded" />
        </label>

        <label className="flex flex-col">
          <span>Year *</span>
          <input type="number" name="year" required className="border p-2 rounded" />
        </label>

        <label className="flex flex-col">
          <span>Notes</span>
          <textarea name="notes" className="border p-2 rounded" />
        </label>

        <label className="flex flex-col">
          <span>Date Purchased</span>
          <input type="date" name="date_purchased" className="border p-2 rounded" />
        </label>

        <label className="flex flex-col">
          <span>Expiry Date - if the piece is a rental</span>
          <input type="date" name="expiry" className="border p-2 rounded" />
        </label>

        <label className="flex flex-col">
          <span>Price</span>
          <input type="number" name="price" step="0.01" className="border p-2 rounded" />
        </label>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Add Piece
        </button>
      </form>
    </div>
  );
}
