import { S3 } from 'aws-sdk';
import { Inject, Injectable } from '@nestjs/common';
import { FileS3Response } from '../../domain/model/file';
import { IFileRepository } from '../../domain/repositories/file.repository';

@Injectable()
export class FileRepository implements IFileRepository {
  private client: S3;

  async insert(file: Express.Multer.File): Promise<FileS3Response> {
    const nameSepared = file.originalname.split('.');
    const extension = nameSepared[nameSepared.length - 1];
    const bucket = 'pragma-ruta-back-clean-architecture-cristian-burbano';
    const name = new Date().getTime().toString() + '.' + extension;
    const result = await this.client
      .upload({
        Bucket: bucket,
        Key: name,
        Body: Buffer.from((file.buffer as any).data),
        ContentType: file.mimetype,
      })
      .promise();
    console.log(result);
    return {
      filename: name,
      url: result.Location,
    };
  }

  async delete(filename: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'pragma-ruta-back-clean-architecture-cristian-burbano',
        Key: filename,
      })
      .promise();
  }

  constructor(@Inject('awsConfig') aws: any) {
    this.client = new S3({
      credentials: { accessKeyId: aws.key, secretAccessKey: aws.secret_key },
    });
  }
}
