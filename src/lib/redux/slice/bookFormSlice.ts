import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { allKeyValuesExist } from '@/components/homepage/CopyInformation';

// Define the shape of the state for each form
// interface ServiceFormState {
//   flight_number: string;
//   flight_time?: string;
//   reporting_time?: string;
//   contact_email: string;
//   contact_phone: string;
// }

interface Baggage {
  total_baggages: number;
  isBook: string;
}
interface Lounge {
  total_travelers: number;
  isBook: string;
}

interface MeetAndAssistFormState {
  category_id: string;
  service_type: string;
  total_travelers: number;
  isBook: string;
}
interface FormsState {
  meetAndAssistBooking: MeetAndAssistFormState;
  loungeBooking: Lounge;
  baggageBooking: Baggage;
}

// Set initial state for all forms
const initialState: FormsState = {
  loungeBooking: {
    total_travelers: 0,
    isBook: '',
  },
  meetAndAssistBooking: {
    service_type: '',
    total_travelers: 0,
    category_id: '',
    isBook: '',
  },
  baggageBooking: {
    total_baggages: 0,
    isBook: '',
  },
};

const bookFormSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    updateMeetAndAssistForm: (state, action: PayloadAction<Partial<MeetAndAssistFormState>>) => {
      state.meetAndAssistBooking = { ...state.meetAndAssistBooking, ...action.payload };
    },

    resetMeetAndAssistForm: (state, action: PayloadAction<Partial<MeetAndAssistFormState>>) => {
      state.meetAndAssistBooking = initialState.meetAndAssistBooking;
    },

    // Action to update the lounge booking form
    updateLoungeBooking: (state, action: PayloadAction<Partial<Lounge>>) => {
      state.loungeBooking = { ...state.loungeBooking, ...action.payload };
    },

    // Action to reset the lounge booking form
    resetLoungeBooking: (state) => {
      state.loungeBooking = initialState.loungeBooking;
    },

    // Action to update the third form
    updateBaggageForm: (state, action: PayloadAction<Partial<Baggage>>) => {
      state.baggageBooking = { ...state.baggageBooking, ...action.payload };
    },
    resetBaggageForm: (state, action: PayloadAction<Partial<any>>) => {
      state.baggageBooking = initialState.baggageBooking;
    },
    clearAllItems: () => initialState,
  },
});

export const selectTotalFilledForms = (state: RootState) => {
  const forms = [
    state.bookForm.meetAndAssistBooking,
    state.bookForm.loungeBooking,
    state.bookForm.baggageBooking,
  ];

  let count = 0;
  forms.forEach((form) => {
    const countValue = allKeyValuesExist(form);
    if (countValue) {
      count += 1;
    }
  });
  return count;
};

export const {
  updateLoungeBooking,
  resetLoungeBooking,
  updateMeetAndAssistForm,
  updateBaggageForm,
  resetBaggageForm,
  resetMeetAndAssistForm,
  clearAllItems,
} = bookFormSlice.actions;

export default bookFormSlice.reducer;
