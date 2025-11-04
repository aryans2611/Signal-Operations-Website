import { useEffect, useRef, useState } from "react";

interface SignalCanvasProps {
  originalSignal: (t: number) => number;
  transformedSignal: (t: number) => number;
  title: string;
  showOriginal?: boolean;
}

export function SignalCanvas({
  originalSignal,
  transformedSignal,
  title,
  showOriginal = true,
}: SignalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({
    width: 800,
    height: 300,
  });

  // Handle responsive canvas sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = Math.min(
          300,
          Math.max(200, width * 0.375),
        ); // Maintain aspect ratio with min/max
        setCanvasSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () =>
      window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize.width * dpr;
    canvas.height = canvasSize.height * dpr;
    ctx.scale(dpr, dpr);

    const width = canvasSize.width;
    const height = canvasSize.height;
    const centerY = height / 2;

    // Clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let x = 0; x <= width; x += width / 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = 0; y <= height; y += height / 10) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Draw axis labels with values
    ctx.fillStyle = "#4b5563";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    // X-axis tick marks and labels (time values: -10, -5, 0, 5, 10)
    const xTicks = [-10, -5, 0, 5, 10];
    xTicks.forEach((tickValue) => {
      const xPos = width / 2 + (tickValue / 10) * (width / 2);

      // Draw tick mark
      ctx.strokeStyle = "#6b7280";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(xPos, centerY - 5);
      ctx.lineTo(xPos, centerY + 5);
      ctx.stroke();

      // Draw label
      ctx.fillStyle = "#4b5563";
      ctx.fillText(tickValue.toString(), xPos, centerY + 8);
    });

    // Y-axis tick marks and labels (amplitude values)
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const yTicks = [2, 1, 0, -1, -2];
    yTicks.forEach((tickValue) => {
      const yPos = centerY - tickValue * (height / 4);

      // Draw tick mark
      ctx.strokeStyle = "#6b7280";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 5, yPos);
      ctx.lineTo(width / 2 + 5, yPos);
      ctx.stroke();

      // Draw label
      if (yPos >= 15 && yPos <= height - 15) {
        // Only draw if within bounds
        ctx.fillStyle = "#4b5563";
        ctx.fillText(
          tickValue.toString(),
          width / 2 - 10,
          yPos,
        );
      }
    });

    // Draw original signal (if enabled)
    if (showOriginal) {
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const t = ((x - width / 2) / width) * 20;
        const y = centerY - originalSignal(t) * (height / 4);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw transformed signal
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let x = 0; x < width; x++) {
      const t = ((x - width / 2) / width) * 20;
      const y = centerY - transformedSignal(t) * (height / 4);

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw axis title labels
    ctx.fillStyle = "#374151";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Time (t)", width - 40, centerY + 25);

    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Amplitude", 0, 0);
    ctx.restore();
  }, [
    originalSignal,
    transformedSignal,
    showOriginal,
    canvasSize,
  ]);

  return (
    <div className="space-y-2">
      <h3 className="text-center text-gray-700 text-sm sm:text-base px-2 break-words">
        {title}
      </h3>
      <div ref={containerRef} className="w-full">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "auto" }}
          className="border border-gray-200 rounded-lg shadow-sm"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm px-2">
        {showOriginal && (
          <div className="flex items-center gap-2">
            <div
              className="w-6 sm:w-8 h-0.5 bg-gray-400 border-dashed"
              style={{ borderTop: "2px dashed #94a3b8" }}
            />
            <span className="text-gray-600">
              Original Signal
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="w-6 sm:w-8 h-0.5 bg-indigo-500" />
          <span className="text-gray-600">
            Transformed Signal
          </span>
        </div>
      </div>
    </div>
  );
}