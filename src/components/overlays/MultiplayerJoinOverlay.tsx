import { useState } from "react";
import { QRCode } from "../../icons/Icons";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function MultiplayerJoinOverlay() {

    const [scanning, setScanning] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    if (scanning) {
        return <Scanner
            onScan={(codes) => {
                alert(codes[0].rawValue)
            }}
            allowMultiple={false}
            formats={[ "qr_code" ]}
        />
    }

    return (

        <div>
            <h1 className="text-4xl text-center font-bold pt-5 dark:text-white">Boardgamle</h1>
            <p className="text-lg text-center dark:text-white tracking-widest">Multiplayer</p>

            <p className="text-sm mt-10">Friend's identifier:</p>
            <div className="w-full h-14 px-5 py-2 flex flex-row items-center rounded-xl gap-3 border border-stone-500">
                <input
                    type="text"
                    className="flex-1 h-full bg-transparent border-none outline-none text-sm placeholder:italic"
                    placeholder="Input your friend's ID here"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                />

                <button className="w-10 h-10 hover:bg-stone-500 transition flex items-center justify-center rounded-xl" onClick={() => {
                    // alert("Show camera to take qrcode for scanning.");
                    setScanning(true);
                }}>
                    <QRCode className="fill-black dark:fill-white w-5 h-5" />
                </button>
            </div>

            <button className="mt-5 bg-lime-500 hover:scale-105 transition text-black w-full py-3 rounded-xl text-lg font-bold">
                Join
            </button>
        </div>

    );
}