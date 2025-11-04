import { useState } from "react";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { SignalCanvas } from "./SignalCanvas";
import { ArrowRight } from "lucide-react";

export function TimeShiftDemo() {
  const [shift, setShift] = useState(0);

  // Original signal: x(t) = sin(t) + 0.5*sin(3t)
  const originalSignal = (t: number) => {
    return Math.sin(t) + 0.5 * Math.sin(3 * t);
  };

  // Time-shifted signal: y(t) = x(t - t0)
  const shiftedSignal = (t: number) => {
    return originalSignal(t - shift);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
        <h3 className="text-blue-900 mb-2">Time Shifting</h3>
        <p className="text-gray-700 mb-2 text-sm sm:text-base">
          Time shifting delays or advances a signal in time without changing its shape.
        </p>
        <div className="bg-white rounded p-2 sm:p-3 mt-3">
          <p className="text-gray-800 text-sm sm:text-base">
            <span className="inline-block mr-2">Mathematical representation:</span>
            <code className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">y(t) = x(t - t₀)</code>
          </p>
          <ul className="mt-2 text-gray-700 text-xs sm:text-sm space-y-1 ml-4">
            <li>• If t₀ &gt; 0: Signal is delayed (shifted right)</li>
            <li>• If t₀ &lt; 0: Signal is advanced (shifted left)</li>
          </ul>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Control</CardTitle>
          <CardDescription>Adjust the time shift parameter to see the effect</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <label className="text-gray-700">Time Shift (t₀)</label>
              <Input
                type="number"
                value={shift}
                onChange={(e) => setShift(parseFloat(e.target.value) || 0)}
                className="w-24 text-center"
                step={0.1}
              />
            </div>
            <Slider
              value={[shift]}
              onValueChange={(value) => setShift(value[0])}
              min={-5}
              max={5}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>-5 (advance)</span>
              <span>0</span>
              <span>+5 (delay)</span>
            </div>
          </div>

          <SignalCanvas
            originalSignal={originalSignal}
            transformedSignal={shiftedSignal}
            title={`y(t) = x(t - ${shift.toFixed(2)})`}
          />

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-800">
                  Current transformation: The signal is {shift > 0 ? 'delayed' : shift < 0 ? 'advanced' : 'not shifted'}
                  {shift !== 0 && ` by ${Math.abs(shift).toFixed(2)} time units`}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
