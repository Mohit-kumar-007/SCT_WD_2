import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer, Flag } from 'lucide-react';

interface LapTime {
  id: number;
  time: string;
}

function App() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<LapTime[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [
        ...prevLaps,
        { id: Date.now(), time: formatTime(time) },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Stopwatch</h1>
            <p className="text-gray-400">Skill Craft Technology</p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
            <div className="flex items-center justify-center mb-8">
              <Timer className="w-8 h-8 mr-2" />
              <div className="text-6xl font-mono font-bold tracking-wider">
                {formatTime(time)}
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={handleStartStop}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isRunning
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" /> Start
                  </>
                )}
              </button>
              <button
                onClick={handleLap}
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                disabled={!isRunning}
              >
                <Flag className="w-5 h-5 mr-2" /> Lap
              </button>
              <button
                onClick={handleReset}
                className="flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
              >
                <RotateCcw className="w-5 h-5 mr-2" /> Reset
              </button>
            </div>

            {laps.length > 0 && (
              <div className="bg-gray-900 rounded-xl p-4">
                <h2 className="text-xl font-semibold mb-4">Lap Times</h2>
                <div className="max-h-60 overflow-y-auto">
                  {laps.map((lap, index) => (
                    <div
                      key={lap.id}
                      className="flex justify-between py-2 px-4 border-b border-gray-700 last:border-0"
                    >
                      <span>Lap {laps.length - index}</span>
                      <span className="font-mono">{lap.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;