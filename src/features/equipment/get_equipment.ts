import { getEquipmentFromDB } from "@/lib/db/equipment/get";
import { Equipment } from "@/lib/db/types";

export const getEquipment = async () => {
    const equipment = await getEquipmentFromDB() as Equipment[];
    return equipment.map(item => ({
        ...item,
        date_purchased: item.acquisition_date ? new Date(item.acquisition_date) : null,
    }));

}