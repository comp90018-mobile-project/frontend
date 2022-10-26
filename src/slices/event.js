import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents, createEvent } from "../services/api";

const eventSlice = createSlice({
    name: "event",
    initialState: {
        events: [],
        newEvent: ''
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
        },
        creatEvents: (state, action) => {
            state.newEvent = action.payload
            state.events.push(state.newEvent)
            // console.log("create event success")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            const { data } = { ...action.payload };
            state.events = data;
        });
        builder.addCase(createEvent.fulfilled, (state, action) => {
            const { data } = { ...action.payload };
            state.newEvent = action.payload
            state.events.push(state.newEvent)
        })
    }

})

export default eventSlice.reducer;
export const { setEvents, creatEvents } = eventSlice.actions;
