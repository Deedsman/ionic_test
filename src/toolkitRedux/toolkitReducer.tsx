import { createReducer, createAction } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    specialist: [{
        full_name: "Александр Карачинский",
        avatar: '/assets/man.svg',
        variant_data_time: {
            days: [{ day: 'сегодня', number: 26, month: "май" }, { day: 'ср', number: 27, month: "май" }, { day: 'чт', number: 28, month: "май" }, { day: 'пт', number: 29, month: "май" }, { day: 'сб', number: 30, month: "май" }],
            time: [{ time: "18:00" }, { time: "18:30" }, { time: "20:00" }, { time: "20:30" }]
        },
        current_write_time: {}

    }]
}
export const get_specialist_state: any = createAction('GET_SPECIALIST_STATE')
export const set_user_state: any = createAction('SET_USER_STATE');
export const add_new_write: any = createAction('ADD_NEW_WRITE');

export default createReducer(initialState, {
    [set_user_state]: function (state, action: any) {
        //debugger;
        state.user = { username: action.payload.split('@')[0] }
    },
    [get_specialist_state]: function (state, action: any) {
        return state
    },
    [add_new_write]: function (state, action: any) {
        state.specialist[0].current_write_time = { new_day: action.payload.day, new_time: action.payload.time }
    }
})
