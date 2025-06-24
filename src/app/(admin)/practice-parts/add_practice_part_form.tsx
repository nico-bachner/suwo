import { addPracticePart } from "@/features/practice_parts/add_practice_part";
import { Instrument, Piece } from "@/lib/db/types";

interface AddPracticePartFormProps {
  instruments: Instrument[];
  library: Piece[];
}

export default function AddPracticePartForm({ instruments, library }: AddPracticePartFormProps) {
  return (
    <div className="mt-8">
      <p className="text-center text-2xl font-bold">Add a new practice part</p>
      <form action={addPracticePart} className="flex flex-col gap-4 mt-4">
        <label className="flex flex-col">
          Piece:
          <select
            name="piece"
            required
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Select a piece</option>
            {library.map((piece) => (
              <option key={piece.id} value={piece.id}>
                {piece.title}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          Instrument:
          <select
            name="instrument"
            required
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Select an instrument</option>
            {instruments.map((inst) => (
              <option key={inst.name} value={inst.name}>
                {inst.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          URL:
          <input
            type="url"
            name="url"
            placeholder="https://example.com/part.pdf"
            required
            className="border border-gray-300 rounded p-2"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Practice Part
        </button>
      </form>
    </div>
  );
}
