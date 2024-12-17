import { Game } from "../types/Game";

/**
 * Renders the canvas with the correct image and sizes
 * 
 * @param localGameData 
 * @param canvasRef 
 */
export function renderCanvas(game: Game, imageSize: number, canvasRef: React.MutableRefObject<HTMLCanvasElement | null>) {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const image = new Image();
    image.src = game.imageUrl;

    image.onload = () => {
        const imgWidth = image.width;
        const imgHeight = image.height;
        const ratio = imgWidth / imgHeight;

        canvas.width = imgWidth;
        canvas.height = imgHeight;

        // Draw the image on the canvas
        ctx.drawImage(
            image,
            0,
            0,
            imgWidth,
            imgWidth *ratio,
            0,
            0,
            imgWidth,
            imgWidth * ratio,
        );
    };
}