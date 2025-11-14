export type Traveler = {
  name: string;
  passport_number?: string;
};

export type BaggageForm = Partial<{
  total_baggages: number;
  reporting_time: string;
  flight_number: string;
  flight_time: string;
  contact_email: string;
  contact_phone: string;
}>;

export type MeetAndAssistForm = Partial<{
  category_id: number | string;
  total_travelers: number;
  reporting_time: string;
  flight_number: string;
  service_type: string;
  flight_time: string;
  contact_email: string;
  contact_phone: string;
  travelers: Traveler[];
}>;

export type LoungeForm = Partial<{
  total_travelers: number;
  reporting_time: string;
  flight_number: string;
  flight_time: string;
  contact_email: string;
  contact_phone: string;
  travelers: Traveler[];
}>;

export type BookingForm = Partial<{
  baggage: BaggageForm;
  meet_and_assist: MeetAndAssistForm;
  lounge: LoungeForm;
  payment_gateway: 'SSL' | 'BKASH';
}>;

export interface IOrderList {
  multiple?: boolean;
  payment_gateway?: 'SSL' | 'BKASH';
  invoice_id: number;
}
export interface IBikashType {
  multiple?: boolean;
  invoice_id: number;
}
