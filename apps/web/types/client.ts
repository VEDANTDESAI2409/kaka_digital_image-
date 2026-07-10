export interface Client {
  id: string;

  primaryContactName: string;

  primaryPhone: string;
  primaryWhatsApp?: string;
  primaryEmail?: string;

  partnerName?: string;
  partnerPhone?: string;
  partnerWhatsApp?: string;
  partnerEmail?: string;

  address?: string;
  city?: string;
  state?: string;
  pincode?: string;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateClientDto {
  primaryContactName: string;

  primaryPhone: string;
  primaryWhatsApp?: string;
  primaryEmail?: string;

  partnerName?: string;
  partnerPhone?: string;
  partnerWhatsApp?: string;
  partnerEmail?: string;

  address?: string;
  city?: string;
  state?: string;
  pincode?: string;

  notes?: string;
}

export type UpdateClientDto = Partial<CreateClientDto>;