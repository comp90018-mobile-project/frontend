import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents, createEvent, fetchEvent, updateEventParticipants, updateEventActive } from "../services/api";
import { cancelEvent } from "../services/api";

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
            const {data} = {...action.payload}
            state.newEvent = data
            state.events.push(data);
            
        });
        builder.addCase(fetchEvent.fulfilled, (state, action) => {
            const data = { ...action.payload };
            state.eventDisplay = data.data
            console.log("finish fetch event", state.eventDisplay)
        });
        builder.addCase(updateEventParticipants.fulfilled, (state, action) => {
            const { data } = {...action.payload}
            state.eventDisplay.participants = data
        });
        builder.addCase(updateEventActive.fulfilled, (state, action) => {
            const {event_id, active} = {...action.payload}
            const index = state.events.findIndex((e) => e._id == event_id)
            state.events[index].active = active
        });
        builder.addCase(updateEventActive.rejected, (state, action) => {
            console.log('update active fail')
        })
        builder.addCase(cancelEvent.fulfilled, (state, action) => {
            const eventId = action.payload
            state.eventDisplay = {}
            let events = [...state.events]
            events = events.filter((e) => e._id != eventId)
            state.events = events
        })
    }

})

export default eventSlice.reducer;
export const { setEvents, creatEvents } = eventSlice.actions;
