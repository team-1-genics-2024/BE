import { Storage } from "@google-cloud/storage";

let storage: Storage;

if (process.env.NODE_ENV === "production") {
  storage = new Storage();
} else if (process.env.NODE_ENV === "development") {
  storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
  });
}

export {
  storage
};