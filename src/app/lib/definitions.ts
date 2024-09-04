export class Character {
  name!: string;
  initiative!: number;
  initiativeDisplay!: number;
  fileReference!: File;
  active!: boolean;
  // TODO: remove this field and read the dynamic data from the fileReference
  dynamicData!: Record<string, string | number>; // Object to store dynamic data fields
}
