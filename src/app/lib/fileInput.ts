// src/lib/fileInput.ts

export async function promptForFile(): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";

    input.addEventListener("change", (event) => {
      const fileInput = event.target as HTMLInputElement;
      const files = fileInput.files;

      if (files && files.length > 0) {
        resolve(files[0]);
      } else {
        resolve(null);
      }
    });

    input.click();
  });
}
