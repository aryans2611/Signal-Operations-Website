import { useState } from "react";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { SignalCanvas } from "./SignalCanvas";
import { ArrowRight } from "lucide-react";

export function AmplitudeScalingDemo() {
  const [scale, setScale] = useState(1);

  // Original signal: x(t) = sin(t) * exp(-t^2/20)
  const originalSignal = (t: number) => {
    return Math.sin(t * 2) * Math.exp(-(t * t) / 20);
  };

  // Amplitude-scaled signal: y(t) = A * x(t)
  const scaledSignal = (t: number) => {
    return scale * originalSignal(t);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
        <h3 className="text-green-900 mb-2">Amplitude Scaling</h3>
        <p className="text-gray-700 mb-2 text-sm sm:text-base">
          Amplitude scaling multiplies the signal's amplitude by a constant factor, making it larger or smaller.
        </p>
        <div className="bg-white rounded p-2 sm:p-3 mt-3">
          <p className="text-gray-800 text-sm sm:text-base">
            <span className="inline-block mr-2">Mathematical representation:</span>
            <code className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">y(t) = A · x(t)</code>
          </p>
          <ul className="mt-2 text-gray-700 text-xs sm:text-sm space-y-1 ml-4">
            <li>• If A &gt; 1: Signal is amplified (increased amplitude)</li>
            <li>• If 0 &lt; A &lt; 1: Signal is attenuated (decreased amplitude)</li>
            <li>• If A &lt; 0: Signal is inverted and scaled</li>
          </ul>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Control</CardTitle>
          <CardDescription>Adjust the amplitude scaling factor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <label className="text-gray-700">Amplitude Factor (A)</label>
              <Input
                type="number"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value) || 0)}
                className="w-24 text-center"
                step={0.1}
              />
            </div>
            <Slider
              value={[scale]}
              onValueChange={(value) => setScale(value[0])}
              min={-3}
              max={3}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>-3 (inverted & amplified)</span>
              <span>0</span>
              <span>+3 (amplified)</span>
            </div>
          </div>

          <SignalCanvas
            originalSignal={originalSignal}
            transformedSignal={scaledSignal}
            title={`y(t) = ${scale.toFixed(2)} · x(t)`}
          />

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-800">
                  {scale > 1 && `The signal is amplified by a factor of ${scale.toFixed(2)}.`}
                  {scale === 1 && "The signal remains unchanged (original amplitude)."}
                  {scale > 0 && scale < 1 && `The signal is attenuated to ${(scale * 100).toFixed(0)}% of its original amplitude.`}
                  {scale === 0 && "The signal is completely suppressed (zero amplitude)."}
                  {scale < 0 && scale > -1 && `The signal is inverted and attenuated to ${(Math.abs(scale) * 100).toFixed(0)}% of its original amplitude.`}
                  {scale <= -1 && `The signal is inverted and amplified by a factor of ${Math.abs(scale).toFixed(2)}.`}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h4 className="text-red-900 mb-1">A &lt; 0</h4>
              <p className="text-sm text-gray-700">
                Inverted signal
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="text-yellow-900 mb-1">0 &lt; A &lt; 1</h4>
              <p className="text-sm text-gray-700">
                Attenuated signal
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="text-green-900 mb-1">A &gt; 1</h4>
              <p className="text-sm text-gray-700">
                Amplified signal
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
