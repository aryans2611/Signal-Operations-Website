import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { TimeShiftDemo } from "./components/TimeShiftDemo";
import { TimeReversalDemo } from "./components/TimeReversalDemo";
import { AmplitudeScalingDemo } from "./components/AmplitudeScalingDemo";
import { TimeScalingDemo } from "./components/TimeScalingDemo";
import { Activity } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
            <h1 className="text-indigo-900">Signal Operations</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Explore fundamental signal transformations in signal processing. 
            Interact with each operation to understand how signals are manipulated in time and amplitude domains.
          </p>
        </div>

        {/* Main Content */}
        <Card className="shadow-xl border-0">
          <CardContent className="p-3 sm:p-6">
            <Tabs defaultValue="time-shift" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6 h-auto">
                <TabsTrigger value="time-shift" className="text-xs sm:text-sm px-2 py-2">Time Shifting</TabsTrigger>
                <TabsTrigger value="time-reversal" className="text-xs sm:text-sm px-2 py-2">Time Reversal</TabsTrigger>
                <TabsTrigger value="amplitude" className="text-xs sm:text-sm px-2 py-2">Amplitude Scaling</TabsTrigger>
                <TabsTrigger value="time-scaling" className="text-xs sm:text-sm px-2 py-2">Time Scaling</TabsTrigger>
              </TabsList>

              <TabsContent value="time-shift">
                <TimeShiftDemo />
              </TabsContent>

              <TabsContent value="time-reversal">
                <TimeReversalDemo />
              </TabsContent>

              <TabsContent value="amplitude">
                <AmplitudeScalingDemo />
              </TabsContent>

              <TabsContent value="time-scaling">
                <TimeScalingDemo />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center text-gray-500 text-xs sm:text-sm px-4">
          <p>Interactive Signal Processing Demonstrations</p>
        </div>
      </div>
    </div>
  );
}
