
export class Character {
  name!: string;
  initiative!: number;
  dynamicData!: Record<string, string | number>; // Object to store dynamic data fields
};