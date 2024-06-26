import { useState, useEffect } from "react";

import { FADEOUT_TIME } from "../types";

export default function RegisterComponent({ title, vis, children }: {
    title: string, vis: boolean, children: React.ReactNode
}) {
    const [invisStyle, setInvisStyle] = useState<any>({ display: "none" });
    useEffect(() => {
        if (vis) {
            setInvisStyle({ animation: "fade-out 1s" });
        }
        else {
            setTimeout(() => setInvisStyle({ display: "none" }), FADEOUT_TIME);
        }
    }, [vis]);

    return (
        <div className="inner-box" style={
            vis ? { display: "flex", animation: "fade-in 1s" } : invisStyle
        }>
            <h1 className="us-emoji-small">🌎</h1>
            <h2 className="info-section-title">{title}</h2>
            {children}
        </div>
    )
}