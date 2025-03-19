import Peer from "peerjs";
import Navbar from "../../components/navbar/Navbar";
import { usePeer } from "../../components/peer/PeerProvider";
import { useState } from "react";
import { EyeCrossedIcon, EyeIcon, QRCode } from "../../icons/Icons";
import { useOverlay } from "../../components/OverlayContext";
import QRCodeOverlay from "../../components/overlays/QRCodeOverlay";
import MultiplayerJoinOverlay from "../../components/overlays/MultiplayerJoinOverlay";

export default function MultiplayerPage() {

    // const peer = usePeer();

    return <div className="min-w-full min-h-screen dark:bg-stone-900 overflow-x-hidden">
        <Navbar />

        <main className="block max-w-screen-md mx-auto dark:text-white py-5 px-8 md:px-0">
            <h1 className="text-4xl text-center font-bold pt-5 dark:text-white">Boardgamle</h1>
            <p className="text-lg text-center dark:text-white tracking-widest">Multiplayer</p>

            <MultiplayerLobby />

            {/* {
                peer ?
                 :
                <p>Somehow you are not connected</p>
            } */}

        </main>

    </div>;
}

function MultiplayerLobby(props: { peer?: Peer }) {
    const overlay = useOverlay();
    const peer = props.peer;

    const [idHidden, setIdHidden] = useState<boolean>(true);

    return <>

        <div className="flex items center justify-center my-10">
            <button className="bg-lime-500 font-bold text-lg px-10 py-3 rounded-xl text-black hover:scale-105 transition" onClick={() => {
                overlay.showAlert({
                    id: "multi_join_overlay",
                    showCloseButton: true,
                    content: <MultiplayerJoinOverlay />
                });
            }}>Join others</button>
        </div>

        <p className="text-xs">Your identifier:</p>

        <div className="w-full h-14 px-5 py-2 flex flex-row items-center rounded-xl gap-3 border border-stone-500">
            <input type="text" className={`flex-1 h-full bg-transparent border-none outline-none text-sm ${idHidden && "blur-sm"}`} readOnly value={"8dd03cf6-7f1c-43e2-b2f0-cb0377b2ec9b"} />

            <button className="w-10 h-10 hover:bg-stone-500 transition flex items-center justify-center rounded-xl" onClick={() => {
                overlay.showAlert({
                    id: "qrcode_overlay",
                    showCloseButton: true,
                    content: <QRCodeOverlay data="8dd03cf6-7f1c-43e2-b2f0-cb0377b2ec9b" />
                });
            }}>
                <QRCode className="fill-black dark:fill-white w-5 h-5" />
            </button>

            <button className="w-10 h-10 hover:bg-stone-500 transition flex items-center justify-center rounded-xl" onClick={() => setIdHidden(!idHidden)}>
                {
                    idHidden ?
                        <EyeCrossedIcon className="fill-black dark:fill-white w-5 h-5" /> :
                        <EyeIcon className="fill-black dark:fill-white w-5 h-5" />
                }
            </button>
        </div>

    </>
}