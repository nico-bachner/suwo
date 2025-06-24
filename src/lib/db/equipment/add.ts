import { getQueryBuilder } from "../query";
import { Equipment } from "../types";


export const addEquipmentToDB = async (equipment: Omit<Equipment, 'id'>) => {
    const sql = getQueryBuilder();

    const [result] = await sql`
        INSERT INTO equipment
        (name, description, inventory, condition, condition_description, acquisition_date, acquisition_price, image)
        VALUES
        (${equipment.name}, ${equipment.description}, ${equipment.inventory}, ${equipment.condition}, ${equipment.condition_description}, ${equipment.acquisition_date}, ${equipment.acquisition_price}, ${equipment.image})`;

    return result as Equipment;
}