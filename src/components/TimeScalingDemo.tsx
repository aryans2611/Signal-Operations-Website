import { useState } from "react";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { SignalCanvas } from "./SignalCanvas";
import { ArrowRight } from "lucide-react";

export function TimeScalingDemo() {
  const [scale, setScale] = useState(1);

  // Original signal: x(t) with clear features
  const originalSignal = (t: number) => {
    return Math.sin(t) * Math.exp(-(t * t) / 30) + 0.3 * Math.sin(3 * t) * Math.exp(-(t * t) / 30);
  };

  // Time-scaled signal: y(t) = x(t/a) or x(at) depending on convention
  // Using y(t) = x(at) convention where a > 1 compresses, a < 1 expands
  const scaledSignal = (t: number) => {
    return originalSignal(t * scale);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4">
        <h3 className="text-orange-900 mb-2">Time Scaling</h3>
        <p className="text-gray-700 mb-2 text-sm sm:text-base">
          Time scaling compresses or expands a signal in the time domain, making it faster or slower.
        </p>
        <div className="bg-white rounded p-2 sm:p-3 mt-3">
          <p className="text-gray-800 text-sm sm:text-base">
            <span className="inline-block mr-2">Mathematical representation:</span>
            <code className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">y(t) = x(a·t)</code>
          </p>
          <ul className="mt-2 text-gray-700 text-xs sm:text-sm space-y-1 ml-4">
            <li>• If a &gt; 1: Signal is compressed (faster, narrower)</li>
            <li>• If 0 &lt; a &lt; 1: Signal is expanded (slower, wider)</li>
            <li>• If a &lt; 0: Signal is both reversed and scaled</li>
          </ul>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Control</CardTitle>
          <CardDescription>Adjust the time scaling factor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <label className="text-gray-700">Time Scaling Factor (a)</label>
              <Input
                type="number"
                value={scale}
                onChange={(e) => setScale(Math.max(0.01, parseFloat(e.target.value) || 0.1))}
                className="w-24 text-center"
                step={0.1}
                min={0.01}
              />
            </div>
            <Slider
              value={[scale]}
              onValueChange={(value) => setScale(value[0])}
              min={0.1}
              max={3}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0.1 (expanded)</span>
              <span>1.0</span>
              <span>3.0 (compressed)</span>
            </div>
          </div>

          <SignalCanvas
            originalSignal={originalSignal}
            transformedSignal={scaledSignal}
            title={`y(t) = x(${scale.toFixed(2)}·t)`}
          />

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-800">
                  {scale > 1 && `The signal is compressed by a factor of ${scale.toFixed(2)}. It appears ${scale.toFixed(1)}× faster/narrower.`}
                  {scale === 1 && "The signal remains unchanged (original time scale)."}
                  {scale < 1 && `The signal is expanded by a factor of ${(1/scale).toFixed(2)}. It appears ${(1/scale).toFixed(1)}× slower/wider.`}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="text-blue-900 mb-2">Compression (a &gt; 1)</h4>
              <p className="text-sm text-gray-700 mb-2">
                The signal becomes narrower and events happen faster
              </p>
              <p className="text-xs text-gray-600">
                Example: Playing audio at 2× speed
              </p>
            </div>
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
              <h4 className="text-teal-900 mb-2">Expansion (0 &lt; a &lt; 1)</h4>
              <p className="text-sm text-gray-700 mb-2">
                The signal becomes wider and events happen slower
              </p>
              <p className="text-xs text-gray-600">
                Example: Playing audio at 0.5× speed
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="text-amber-900 mb-2">Note on Duration</h4>
            <p className="text-sm text-gray-700">
              Time scaling affects the duration of the signal inversely to the scaling factor. 
              A signal compressed by factor 2 will have half its original duration.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
