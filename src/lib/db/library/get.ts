import { getQueryBuilder } from "../query";
import { Piece, Table } from "../types";

export const getLibrary = async () => {
  const sql = getQueryBuilder()
  const library = await sql`
    SELECT 
        id,
        title,
        composer,
        arranger,
        year,
        notes,
        date_purchased,
        expiry,
        price
    FROM
        library
    ORDER BY
        LOWER(title) ASC
    `
    return library as Table<Piece>
}