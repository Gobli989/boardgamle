import { createContext, useContext, useEffect, useState } from "react";
import { Peer } from "peerjs";

const context = createContext<Peer | null>(null);

export default function PeerProvider(props: { children?: React.ReactNode }) {

    const [p, setP] = useState<Peer | null>(null);

    useEffect(() => {
        const peer = new Peer();

        peer.on("open", (id) => {
            console.log("id:", id);
            setP(peer);
        });
    }, []);

    return <context.Provider value={p} >
        {props.children}
    </context.Provider>;
}

export function usePeer() {
    return useContext(context);
}