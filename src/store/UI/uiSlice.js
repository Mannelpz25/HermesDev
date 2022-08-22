import { createSlice } from "@reduxjs/toolkit";


export const uiSlice = createSlice({

    name: 'ui',
    initialState: {
        isMenuOpen: false,
        anchorEl: null
    },
    reducers: {
        onOpenMenu: (state, action) => {
            state.isMenuOpen = true;
        },
        onCloseMenu: (state) => {
            state.isMenuOpen = false;
            state.anchorEl = null;
        },
        setAnchorEl:(state, action) => {
            state.anchorEl = action.payload;
        }
    }
});

//-Exportaciones:
export const { onOpenMenu, onCloseMenu, setAnchorEl } = uiSlice.actions;