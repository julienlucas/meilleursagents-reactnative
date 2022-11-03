export interface Message {
  body?: string;
  contact: {
    email: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
  };
  date: Date | string;
  id: number;
  read: boolean;
  subject: string;
  type: string;
}
