import { PageLayout } from "@/components/server/page_layout";
import { getEquipment } from "@/features/equipment/get_equipment";
import AddToEqipmentForm from "./add_eqipment_form";

export default async function Page() {
  const eqipment = await getEquipment();

  return (
    <PageLayout title="Equipment" className="prose">
      <p>
        The collection of equipment owned by the SUWO is used for rehearsals, performances, and other events. 
        It includes a variety of percussion, stands, and other items necessary for the operation of the ensemble.
    </p>

      <div className="overflow-x-auto my-4">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-amber-900">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Description</th>
              <th className="border px-4 py-2 text-left">Inventory</th>
              <th className="border px-4 py-2 text-left">Condition</th>
              <th className="border px-4 py-2 text-left">Condition description</th>
              <th className="border px-4 py-2 text-left">Aquisition date</th>
              <th className="border px-4 py-2 text-left">Aquisition price</th>
              <th className="border px-4 py-2 text-left">Image</th>
            </tr>
            
          </thead>
          <tbody>
            {eqipment.map((item) => (
              <tr key={item.id} className="hover:bg-gray-900">
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">{item.inventory}</td>
                <td className="border px-4 py-2">{item.condition}</td>
                <td className="border px-4 py-2">{item.condition_description || "-"}</td>
                <td className="border px-4 py-2">
                  {item.acquisition_date?.toLocaleDateString() || "-"}
                </td>
                <td className="border px-4 py-2">
                  {item.acquisition_price ? `$${item.acquisition_price.toFixed(2)}` : "-"}
                </td>
                <td className="border px-4 py-2">
                {item.image ? (
                    <img
                    src={`data:image/*;base64,${item.image}`}
                    alt={item.name}
                    className="w-16 h-auto"
                    />
                ) : (
                    "-"
                )}
                </td>
              </tr>
            ))}
            </tbody>
            </table>
        </div>

    { /* Only show if user has permission */}
      <AddToEqipmentForm />
    </PageLayout>
  );
}