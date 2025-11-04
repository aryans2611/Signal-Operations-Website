import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { SignalCanvas } from "./SignalCanvas";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowRight } from "lucide-react";

export function TimeReversalDemo() {
  const [reversed, setReversed] = useState(false);
  const [phaseShift, setPhaseShift] = useState(0);
  const [amplitudeScale, setAmplitudeScale] = useState(1);

  // Original signal: Asymmetric signal to show reversal clearly
  const originalSignal = (t: number) => {
    if (t < -2) return 0;
    if (t < 0) return (t + 2) * 0.5;
    if (t < 2) return 1 - t * 0.3;
    if (t < 4) return 0.4 * Math.exp(-(t - 2));
    return 0;
  };

  // Time-reversed signal with phase shift and amplitude: y(t) = A * x(-(t - t₀))
  const transformedSignal = (t: number) => {
    const timeTransformed = reversed ? -(t - phaseShift) : (t - phaseShift);
    return amplitudeScale * originalSignal(timeTransformed);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4">
        <h3 className="text-purple-900 mb-2">Time Reversal</h3>
        <p className="text-gray-700 mb-2 text-sm sm:text-base">
          Time reversal flips the signal about the vertical axis (t = 0), creating a mirror image in time.
        </p>
        <div className="bg-white rounded p-2 sm:p-3 mt-3">
          <p className="text-gray-800 text-sm sm:text-base">
            <span className="inline-block mr-2">Mathematical representation:</span>
            <code className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">y(t) = x(-t)</code>
          </p>
          <ul className="mt-2 text-gray-700 text-xs sm:text-sm space-y-1 ml-4">
            <li>• The signal is flipped horizontally</li>
            <li>• What was at time t is now at time -t</li>
            <li>• Often used in correlation and convolution operations</li>
          </ul>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Control</CardTitle>
          <CardDescription>Toggle time reversal to see the effect</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            {/* Time Reversal Toggle */}
            <div className="flex items-center justify-between bg-purple-50 p-4 rounded-lg border border-purple-200">
              <Label htmlFor="reversal-toggle" className="text-gray-700">
                Apply Time Reversal
              </Label>
              <Switch
                id="reversal-toggle"
                checked={reversed}
                onCheckedChange={setReversed}
              />
            </div>

            {/* Phase Shift Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <label className="text-gray-700">Phase Shift (t₀)</label>
                <Input
                  type="number"
                  value={phaseShift}
                  onChange={(e) => setPhaseShift(parseFloat(e.target.value) || 0)}
                  className="w-24 text-center"
                  step={0.1}
                />
              </div>
              <Slider
                value={[phaseShift]}
                onValueChange={(value) => setPhaseShift(value[0])}
                min={-5}
                max={5}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>-5</span>
                <span>0</span>
                <span>+5</span>
              </div>
            </div>

            {/* Amplitude Scale Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <label className="text-gray-700">Amplitude Scale (A)</label>
                <Input
                  type="number"
                  value={amplitudeScale}
                  onChange={(e) => setAmplitudeScale(parseFloat(e.target.value) || 1)}
                  className="w-24 text-center"
                  step={0.1}
                />
              </div>
              <Slider
                value={[amplitudeScale]}
                onValueChange={(value) => setAmplitudeScale(value[0])}
                min={-3}
                max={3}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>-3</span>
                <span>0</span>
                <span>+3</span>
              </div>
            </div>
          </div>

          <SignalCanvas
            originalSignal={originalSignal}
            transformedSignal={transformedSignal}
            title={reversed ? `y(t) = ${amplitudeScale.toFixed(1)} × x(-(t - ${phaseShift.toFixed(1)}))` : `y(t) = ${amplitudeScale.toFixed(1)} × x(t - ${phaseShift.toFixed(1)})`}
            showOriginal={true}
          />

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-800">
                  {reversed 
                    ? "Time reversal is active. The signal is flipped horizontally. You can also adjust phase shift and amplitude."
                    : "Time reversal is off. Toggle the switch above to flip the signal. You can still adjust phase shift and amplitude."}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <h4 className="text-indigo-900 mb-2">Original: x(t)</h4>
              <p className="text-sm text-gray-700">
                The signal as a function of positive and negative time
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 className="text-purple-900 mb-2">Reversed: x(-t)</h4>
              <p className="text-sm text-gray-700">
                The signal flipped about the vertical axis
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
