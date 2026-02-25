import {
    getHealthStatus
} from "./healthApi";

const initialState = {
    health: {},
    loading: false,
    error: null
};

const healthSlice = createSlice({
    name: "health",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getHealthStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.health = action.payload?.data
            })

            .addCase(getHealthStatus.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getHealthStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error;
            })
    }
})

export default healthSlice.reducer;