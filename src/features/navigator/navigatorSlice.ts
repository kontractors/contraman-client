import { createSlice } from '@reduxjs/toolkit';

const navigatorSlice = createSlice({
    name: 'navigator',
    initialState: {
        isOpen: false
    },
    reducers: {
        openPalette: state => { state.isOpen = true },
        closePalette: state => { state.isOpen = false },
        togglePalette: state => { state.isOpen = !state.isOpen }
    }
});

export const { openPalette, closePalette, togglePalette } = navigatorSlice.actions;
export default navigatorSlice.reducer;
