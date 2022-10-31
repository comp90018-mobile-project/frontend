import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents, createEvent, fetchEvent, updateEventParticipants, updateEventActive } from "../services/api";

const eventSlice = createSlice({
    name: "event",
    initialState: {
        events: [],
        newEvent: '',
        eventDisplay: ''
    },
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload;
        },
        creatEvents: (state, action) => {
            state.newEvent = action.payload
            state.events.push(state.newEvent)
        },
        fetchEvent: (state, action) => {
            state.eventDisplay = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            const { data } = { ...action.payload };
            state.events = data;
        });
        builder.addCase(createEvent.fulfilled, (state, action) => {
            const newEvent = {...action.payload}
            state.newEvent = newEvent
            state.events.push(newEvent);
            console.log("finish update 1")
        });
        builder.addCase(fetchEvent.fulfilled, (state, action) => {
            const data = { ...action.payload };
            state.eventDisplay = data.data
            console.log("finish fetch event", state.eventDisplay)
        });
        builder.addCase(updateEventParticipants.fulfilled, (state, action) => {
            const { data } = {...action.payload}
            state.eventDisplay.participants = data
            // const {username, avatar, email, event_hosted, event_history, event_participated, health_status} = data;
            // state.username = username;
            // state.avatar = avatar;
            // state.email = email;
            // state.eventhistory = event_history;
            // state.hostevent = event_hosted;
            // state.participantevent = event_participated;
            // state.covid = health_status;
            // console.log('after quit or cancel event', data)
        });
        builder.addCase(updateEventActive.fulfilled, (state, action) => {
            // const data = { ...action.payload };
            // state.eventDisplay = data
            // console.log("updated active in event")
            // const data = {...action.payload}
            // if (data === "ended") {
            //     state.eventDisplay = {}
            // }
        });
        builder.addCase(updateEventActive.rejected, (state, action) => {
            console.log('update active fail')
        })
    }

})

export default eventSlice.reducer;
export const { setEvents, creatEvents } = eventSlice.actions;
