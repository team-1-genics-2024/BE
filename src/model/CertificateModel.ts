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

export interface GetCertificateRequest {
  userId: number;
  classId: number;
}

export interface GetCertificateResponse {
  certificate: Certificate;
}

export interface GetCertificateByUserRequest {
  userId: number;
}

export interface GetCertificateByUserResponse {
  certificates: Certificate[];
}