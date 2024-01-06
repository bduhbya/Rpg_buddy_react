export class Character {
  name!: string;
  initiative!: number;
  fileReference!: File;
  dynamicData!: Record<string, string | number>; // Object to store dynamic data fields
}
