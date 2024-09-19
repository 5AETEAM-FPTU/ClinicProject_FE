import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs';
import { set } from 'lodash';

export interface ILoading {
    isLoading: boolean
    showDesc: boolean;
    desc: string;
}

const initialState: ILoading = {
    isLoading: false,
    showDesc: false,
    desc: ''
}
const slice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<{ showDesc?: boolean, desc?: string } | undefined>) => {
            state.isLoading = true;
            state.showDesc = action.payload?.showDesc || false;
            state.desc = action.payload?.desc || '';
        },
        setLoaded: (state) => {
            state.isLoading = false;
        }
    },
})

export const {
    setLoaded, setLoading
} = slice.actions

export default slice.reducer
