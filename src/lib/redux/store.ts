import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { baseApi } from './RTK_API';
import modifyReducer from './slice/ModifySearchState';
import noticeSliceReducer from './slice/noticeSlice';
import bookFormReducer from './slice/bookFormSlice';
import popupReducer from './slice/popupSlice';

const noticePersistConfig = {
  key: 'session_notice',
  storage: storageSession,
};
const popupPersistConfig = {
  key: 'session_popup',
  storage: storageSession,
};
const bookFormPersistConfig = {
  key: 'book_form',
  storage: storageSession,
};

const noticePersist = persistReducer(noticePersistConfig, noticeSliceReducer);
const popupPersist = persistReducer(popupPersistConfig, popupReducer);
const bookFormPersist = persistReducer(bookFormPersistConfig, bookFormReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    searchExpand: modifyReducer,
    notice: noticePersist,
    popup: popupPersist,
    bookForm: bookFormPersist,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
