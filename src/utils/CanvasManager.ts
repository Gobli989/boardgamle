import { LocalGameData } from "../types/LocalGameData";

/**
 * Renders the canvas with the correct image and sizes
 * 
 * @param localGameData 
 * @param canvasRef 
 */
export function renderCanvas(localGameData: LocalGameData, canvasRef: React.MutableRefObject<HTMLCanvasElement | null>) {
    if (!localGameData.correctGame || !canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const WIDTH = localGameData.imageSize;
    const HEIGHT = localGameData.imageSize;

    canvas.width = WIDTH;

    const image = new Image();
    image.src = localGameData.correctGame.imageURL;

    image.onload = () => {
        const imgWidth = image.width;
        const imgHeight = image.height;
        const ratio = Math.max(WIDTH / imgWidth, HEIGHT / imgHeight);

        canvas.height = imgHeight * ratio;

        // Draw the image on the canvas
        ctx.drawImage(
            image,
            0,
            0,
            imgWidth,
            imgHeight,
            0,
            0,
            imgWidth * ratio,
            imgHeight * ratio,
        );
    };
}