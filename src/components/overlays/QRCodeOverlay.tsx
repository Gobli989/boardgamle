import QRCode from "react-qr-code";

export default function QRCodeOverlay(props: {data: string}) {
    return <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">Scan me!</h1>
        <div className="bg-white p-5 my-5 rounded-xl">
            <QRCode value={props.data} />
        </div>
        <p className="text-balance">Players who want to join can scan this QR Code.</p>
    </div>;
}