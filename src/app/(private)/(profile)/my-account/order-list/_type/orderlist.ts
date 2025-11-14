export interface MeetAssistOrder {
  id: number;
  order_no: string;
  total_amount: string;
  discount: string;
  service_type: string;
  invoice_id: number;
  invoice_no: string;
  invoice_due: string;
  status: string;
  total_travelers: number;
  contact_email: string;
  contact_phone: string;
  reporting_time: string;
  flight_time: string;
  created_at: string;
}

export interface LoungeOrder {
  id: number;
  order_no: string;
  total_amount: string;
  discount: string;
  invoice_no: string;
  invoice_due: string;
  invoice_id: number;
  status: string;
  total_travelers: number;
  contact_email: string;
  contact_phone: string;
  reporting_time: string;
  flight_time: string;
  created_at: string;
}
export interface BaggageOrder {
  id: number;
  order_no: string;
  total_amount: string;
  discount: string;
  invoice_no: string;
  invoice_due: string;
  invoice_id: number;
  status: string;
  total_baggages: number;
  contact_email: string;
  contact_phone: string;
  reporting_time: string;
  flight_time: string;
  created_at: string;
}

export interface Traveler {
  id: number;
  order_id: number;
  name: string;
  passport_number: string;
}

export interface Tracking {
  id: number;
  status: string;
  details: string;
  user_id: number;
  created_at: string; // ISO date string
}

type OrderDetailsStatus =
  | 'Upcoming'
  | 'Completed'
  | 'Cancelled'
  | 'In Progress'
  | 'Incomplete'
  | 'Unpaid'
  | 'Paid';

export interface MeetAndAssistOrderDetails {
  id: number;
  order_no: string;
  invoice_id: number;
  invoice_no: string;
  invoice_due: string;
  meet_and_assist_name: string;
  meet_and_assist_category_id: number;
  total_amount: string;
  discount: string;
  status: OrderDetailsStatus;
  invoice_status: OrderDetailsStatus;
  service_type: string;
  contact_email: string;
  contact_phone: string;
  reporting_time: string; // ISO date string
  flight_number: string;
  flight_time: string; // ISO date string
  user_id: number;
  user_type: string;
  airport_id: number;
  total_travelers: number;
  supplier_org_name: string;
  supplier_logo: string;
  supplier_address: string;
  supplier_name: string;
  supplier_email: string;
  supplier_phone_number: string;
  airport_name: string;
  airport_iata_code: string;
  airport_city_name: string;
  airport_latitude: number;
  airport_longitude: number;
  created_at: string; // ISO date string
  travelers: Traveler[];
  tracking: Tracking[];
}
export interface LoungeOrderDetails {
  id: number;
  order_no: string;
  invoice_id: number;
  invoice_no: string;
  invoice_due: string;
  total_amount: string;
  discount: string;
  status: OrderDetailsStatus;
  invoice_status: OrderDetailsStatus;
  contact_email: string;
  contact_phone: string;
  reporting_time: string; // ISO date string
  flight_number: string;
  flight_time: string; // ISO date string
  airport_id: number;
  total_travelers: number;
  supplier_org_name: string;
  supplier_logo: string;
  supplier_address: string;
  supplier_name: string;
  supplier_email: string;
  supplier_phone_number: string;
  airport_name: string;
  airport_iata_code: string;
  airport_city_name: string;
  airport_latitude: number;
  airport_longitude: number;
  created_at: string; // ISO date string
  supplier_id: number;
  travelers: Traveler[];
  tracking: Tracking[];
}
export interface BaggageOrderDetails {
  id: number;
  order_no: string;
  invoice_id: number;
  invoice_no: string;
  invoice_due: string;
  total_amount: string;
  discount: string;
  status: OrderDetailsStatus;
  invoice_status: OrderDetailsStatus;
  contact_email: string;
  contact_phone: string;
  reporting_time: string; // ISO date string
  flight_number: string;
  flight_time: string; // ISO date string
  supplier_org_name: string;
  supplier_logo: string;
  supplier_address: string;
  supplier_name: string;
  supplier_email: string;
  supplier_phone_number: string;
  airport_name: string;
  airport_iata_code: string;
  airport_city_name: string;
  airport_latitude: number;
  airport_longitude: number;
  created_at: string; // ISO date string
  total_baggages: number;
  travelers: Traveler[];
  tracking: Tracking[];
}

// Generic service order type
export type ServiceOrder = {
  id: number;
  total_amount: string;
  discount: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'In Progress' | 'Incomplete' | 'Unassigned'; // from your union earlier
  total_travelers: number;
  supplier_org_name: string;
  supplier_logo: string;
  supplier_address: string;
  supplier_name: string;
  supplier_email: string;
  supplier_phone_number: string;
};

// Invoice details type
export type InvoiceDetails = {
  id: number;
  invoice_no: string;
  order_no: string;
  order_booking_id: number;
  due: string;
  net_total: string;
  total_discount: string;
  invoice_status: 'Paid' | 'Unpaid' | 'Partially Paid'; // extend if more statuses exist
  user_id: number;
  user_type: 'B2C' | 'B2B' | string;
  created_at: string; // ISO Date string
  contact_email: string;
  contact_phone: string;
  reporting_time: string; // ISO Date string
  flight_number: string;
  flight_time: string; // ISO Date string
  airport_name: string;
  airport_iata_code: string;
  airport_city_name: string;
  airport_latitude: number;
  airport_longitude: number;
  meetAndAssistOrder?: ServiceOrder;
  loungeOrder?: ServiceOrder;
  baggageOrder?: ServiceOrder;
};
