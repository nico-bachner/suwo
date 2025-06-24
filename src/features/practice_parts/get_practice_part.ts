import { getPracticePartsFromDB } from "@/lib/db/practice_parts/get";
import { PracticePart } from "@/lib/db/types";

export const getPracticeParts = async () => {
    const parts = await getPracticePartsFromDB() as PracticePart[];
    return parts;
}