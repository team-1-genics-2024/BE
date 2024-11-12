import { GetSignedUrlConfig } from "@google-cloud/storage";
import { storage } from "../config/cloudStorage";

export class StorageUtils {
  static async getSignedUrl (filename: string): Promise<string> {
    const options = {
      version: "v4",
      action: "read",
      expires: Date.now() + 60 * 60 * 1000
    } as GetSignedUrlConfig; 

    const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME as string;
    const [url] = await storage.bucket(bucketName).file(filename).getSignedUrl(options);
    return url;
  }
}