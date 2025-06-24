'use server'

import { addEquipmentToDB } from '@/lib/db/equipment/add';
import { Equipment } from '@/lib/db/types';
import { Buffer } from 'buffer';

export const fileToBase64 = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString('base64');
}

export const addToEquipment = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const imageFile = formData.get("image") as File | null;
  const base64Image = imageFile ? await fileToBase64(imageFile) : undefined;

  const equipment: Omit<Equipment, 'id'> = {
    name: data.name as string,
    description: data.description as string,
    inventory: parseInt(data.inventory as string, 10),
    condition: data.condition as string,
    condition_description: data.condition_description as string,
    acquisition_date: data.acquisition_date ? new Date(data.acquisition_date as string) : undefined,
    acquisition_price: data.acquisition_price ? parseFloat(data.acquisition_price as string) : undefined,
    image: base64Image,
  };

  await addEquipmentToDB(equipment);
};

