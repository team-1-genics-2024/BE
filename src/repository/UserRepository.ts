import database from "../config/database";

const db = database;

export class UserRepository {
  static async create(email: string, hashedPassword: string, name: string, googleId?: string) {
    return db.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        googleId: googleId || null,
      }
    });
  }

  static async all() {
    return db.user.findMany();
  }

  static async findByEmail(email: string) {
    return db.user.findUnique({
      where: {
        email: email
      }
    });
  }

  static async findByGoogleId(googleId: string) {
    return db.user.findUnique({
      where: {
        googleId: googleId
      }
    });
  }

  static async findById(id: number) {
    return db.user.findUnique({
      where: {
        id: id
      }
    });
  }

  static async findByIdAndUpdate(id: number, data: any) {
    return db.user.update({
      where: {
        id: id
      },
      data: data
    });
  }

  static async deleteById(id: number) {
    return db.user.delete({
      where: {
        id: id
      }
    });
  }
}