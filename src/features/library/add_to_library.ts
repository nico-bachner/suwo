'use server'

import { addPieceToLibrary } from "@/lib/db/library/add";
import { Piece } from "@/lib/db/types";
export const addToLibrary = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

  const piece: Omit<Piece, 'id'> = {
    title: data.title as string,
    composer: data.composer as string,
    arranger: data.arranger as string,
    year: parseInt(data.year as string, 10),
    notes: data.notes as string,
    date_purchased: data.date_purchased ? new Date(data.date_purchased as string) : undefined,
    expiry: data.expiry ? new Date(data.expiry as string) : undefined,
    price: data.price ? parseFloat(data.price as string) : undefined,
  };
    await addPieceToLibrary(piece);
}