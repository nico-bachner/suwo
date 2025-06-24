import { PageLayout } from "@/components/server/page_layout";
import { getFullLibrary } from "@/features/library/get_library";
import AddToLibraryForm from "./add_to_library_form";

export default async function Page() {
  const library = await getFullLibrary();

  return (
    <PageLayout title="Library" className="prose">
      <p>
        The SUWO library is a collection of music scores and parts that are
        available for members to borrow. It includes a wide range of repertoire
        for concert band, wind ensemble, and other ensembles.
      </p>

      <div className="overflow-x-auto my-4">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-amber-900">
            <tr>
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Composer</th>
              <th className="border px-4 py-2 text-left">Arranger</th>
              <th className="border px-4 py-2 text-left">Year</th>
              <th className="border px-4 py-2 text-left">Date Purchased</th>
              <th className="border px-4 py-2 text-left">Expiry</th>
              <th className="border px-4 py-2 text-left">Price</th>
              <th className="border px-4 py-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {library.map((piece) => (
              <tr key={piece.id} className="hover:bg-gray-900">
                <td className="border px-4 py-2">{piece.title}</td>
                <td className="border px-4 py-2">{piece.composer}</td>
                <td className="border px-4 py-2">{piece.arranger || "-"}</td>
                <td className="border px-4 py-2">{piece.year}</td>
                <td className="border px-4 py-2">
                  {piece.date_purchased?.toLocaleDateString() || "-"}
                </td>
                <td className="border px-4 py-2">
                  {piece.expiry?.toLocaleDateString() || "-"}
                </td>
                <td className="border px-4 py-2">
                  {piece.price ? `$${piece.price.toFixed(2)}` : "-"}
                </td>
                <td className="border px-4 py-2">{piece.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    { /* Only show if user has permission */}
      <AddToLibraryForm />
    </PageLayout>
  );
}
