import { getQueryBuilder } from "../query";
import { Piece } from "../types";

export const addPieceToLibrary = async(piece: Omit<Piece, 'id'>) => {
    const sql = getQueryBuilder();
    
    const [result] = await sql`
        INSERT INTO library
        (title, composer, arranger, year, notes, date_purchased, expiry, price)
        VALUES
        (${piece.title}, ${piece.composer}, ${piece.arranger}, ${piece.year}, ${piece.notes}, ${piece.date_purchased}, ${piece.expiry}, ${piece.price})
    `;
    
    return result as Piece;
    }