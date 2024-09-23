/**
 * Import 'file-type' ES-Module in CommonJS Node.js module
 */
export default async (buffer: Buffer) => {
  const { fileTypeFromBuffer } = await (eval('import("file-type")') as Promise<
    typeof import('file-type')
  >);
  return fileTypeFromBuffer(buffer);
};
