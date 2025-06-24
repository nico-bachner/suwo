import { addToEquipment } from "@/features/equipment/add_equipment";

export default function AddToEqipmentForm() {
  return (
    <div>
      <p className="text-center text-2xl font-bold">Add eqipment</p>
      <form
        className="flex flex-col gap-4"
        action={addToEquipment}
        encType="multipart/form-data"
        >
        <label className="flex flex-col">
          Name:
          <input
            type="text"
            name="name"
            required
            className="border border-gray-300 rounded p-2"
          />
        </label>
        <label className="flex flex-col">
          Description:
          <textarea
            name="description"
            className="border border-gray-300 rounded p-2"
          />
        </label>
        <label className="flex flex-col">
          Inventory:
          <input
            type="number"
            name="inventory"
            required
            className="border border-gray-300 rounded p-2"
          />
        </label>
        <label className="flex flex-col">
          Condition:
          <select
            name="condition"
            required
            className="border border-gray-300 rounded p-2"
          >
            <option value="new">New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </label>
        <label className="flex flex-col">
          Condition description:
          <textarea
            name="condition_description"
            className="border border-gray-300 rounded p-2"
          />
        </label>
        <label className="flex flex-col">
          Acquisition date:
          <input
            type="date"
            name="acquisition_date"
            required
            className="border border-gray-300 rounded p-2"
          />
        </label>
        <label className="flex flex-col">
          Acquisition price:
          <input
            type="number"
            name="aquisition_price"
            step="0.01"
            className="border border-gray-300 rounded p-2"
          />
        </label>
        <label className="flex flex-col">
        Image:
        <input
            type="file"
            name="image"
            accept="image/*"
            className="border border-gray-300 rounded p-2"
        />
        </label>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Equipment
        </button>
        </form>
    </div>
    );
}
