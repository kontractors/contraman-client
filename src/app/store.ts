import {configureStore} from '@reduxjs/toolkit';
import {commandPaletteReducer} from '../features/navigator';

export const store = configureStore({
    reducer: {
        commandPalette: commandPaletteReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
