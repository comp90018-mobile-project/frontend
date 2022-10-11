import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents } from "../services/api";

const eventSlice = createSlice({
    name: "event",
    initialState: {
        events: []
        // name: "default",
        // organiser: "default",
        // preview: "default",
        // longitude: "default",
        // latitude: "default",
        // participants: [],
        // settings: {
        //     duration: 90,
        //     num_of_participants: "5",
        //     type: "sports",
        //     theme_color: "#FFFFFF",
        //     description: "A short description",
        //     start_time: "2020-09-10 14:00:23"
        // },
        // image: []
    },
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload;
            console.log("test1")
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            const { data } = { ...action.payload };
            console.log("test2",data);
            state.events = data;
        });
    }
})

export default eventSlice.reducer;
export const { setEvents } = eventSlice.actions;