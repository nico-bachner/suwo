import { getLibrary } from "@/lib/db/library/get";
import { Piece } from "@/lib/db/types";

export const getFullLibrary = async () => {
    const library = await getLibrary() as Piece[];
    return library.map(piece => ({
        ...piece,
        date_purchased: piece.date_purchased ? new Date(piece.date_purchased) : undefined,
        expiry: piece.expiry ? new Date(piece.expiry) : undefined,
    }));

}