import * as React from "react";

import { useStore } from "lib/stores/store";

export default function Overview() {
    const tabs = useStore((state) => state.tabs);
    const addTab = useStore((state) => state.addTab);

    return (
        <Box sx={{ display: "flex" }}>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                <Toolbar />

                <h1>Welcome!</h1>
                <button onClick={addTab}>Add a tab</button>

                <Typography paragraph>Render Overview Component here</Typography>
            </Box>
        </Box>
    );
}
