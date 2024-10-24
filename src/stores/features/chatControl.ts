import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs';
import { set } from 'lodash';

export interface ChatRoomStatus {
    isEndConversation: boolean
}

const initialState: ChatRoomStatus = {
    isEndConversation: false
}
const slice = createSlice({
    name: 'chatControl',
    initialState,
    reducers: {
        setEndConversation: (state, action: PayloadAction<boolean>) => {
            state.isEndConversation = action.payload
        }
    },
})

export const {
    setEndConversation
} = slice.actions

export default slice.reducer
