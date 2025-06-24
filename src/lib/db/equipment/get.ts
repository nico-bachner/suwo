import { getQueryBuilder } from "../query"
import { Equipment, Table } from "../types"

export const getEquipmentFromDB = async () => {
  const sql = getQueryBuilder()

  const equipment = await sql`
    SELECT *
    FROM equipment
    ORDER BY name ASC
  `
    return equipment as Table<Equipment>
}

