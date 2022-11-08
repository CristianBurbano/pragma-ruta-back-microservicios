export interface ImageServiceInterface {
  getImage(id: string): Promise<any>;
  deleteImage(id: string): Promise<void>;
  uploadImage(file: Express.Multer.File): Promise<any>;
}
