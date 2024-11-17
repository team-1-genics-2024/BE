// export class CertificateRepository {
//   static async create(id: string, userId: number, classId: number) {
//     return await db.certificate.create({
//       data: {
//         id,
//         userId,
//         classId
//       }
//     });
//   }

//   static async findByUserIdAndClassId(userId: number, classId: number) {
//     return await db.certificate.findUnique({
//       where: {
//         userId_classId: {
//           userId,
//           classId
//         }
//       }
//     });
//   }
// }

// model Certificate {
//   id        String   @id
//   userId    Int
//   classId   Int
//   createdAt DateTime @default(now()) @db.Timestamp(6)
//   updatedAt DateTime @default(now()) @db.Timestamp(6)
//   user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//   class     Class    @relation(fields: [classId], references: [id], onDelete: Cascade)

//   @@unique([userId, classId])
//   @@map("certificates")
// }

export interface Certificate {
  id: string;
  userId: number;
  classId: number;
  user: {
    id: number;
    name: string;
  };
  class: {
    id: number;
    name: string;
  }
}

export interface CreateCertificateRequest {
  userId: number;
  classId: number;
}

export interface CreateCertificateResponse {
  id: string;
  userId: number;
  classId: number;
}

export interface GetCertificateRequest {
  userId: number;
  classId: number;
}

export interface GetCertificateResponse {
  certificate: Certificate;
}