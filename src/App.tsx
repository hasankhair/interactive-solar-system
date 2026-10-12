import { useState, useEffect, useRef, useCallback } from 'react';
import { planets, PlanetData } from './data/planets';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [angles, setAngles] = useState<number[]>(planets.map(() => Math.random() * Math.PI * 2));
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    setAngles(prev => prev.map((angle, i) => {
      return angle + planets[i].orbitalSpeed * speed * delta * 0.5;
    }));

    animationRef.current = requestAnimationFrame(animate);
  }, [speed]);

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animate]);

  const getPlanetPosition = (planet: PlanetData, angle: number) => {
    const x = Math.cos(angle) * planet.radius;
    const y = Math.sin(angle) * planet.radius * 0.35;
    return { x, y };
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative select-none">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 250 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 0.5,
              height: Math.random() * 2 + 0.5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-3 pb-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-200 via-orange-300 to-yellow-500 bg-clip-text text-transparent">
          ✦ Interactive Solar System ✦
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">Click on any planet to explore its details</p>
      </div>

      {/* Solar System Container */}
      <div className="relative z-10 flex items-center justify-center" style={{ height: 'calc(100vh - 160px)' }}>
        <div className="relative" style={{ width: '900px', height: '480px' }}>
          {/* Orbit paths */}
          {planets.map((planet) => (
            <div
              key={`orbit-${planet.id}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: planet.radius * 2,
                height: planet.radius * 2 * 0.35,
                left: `calc(50% - ${planet.radius}px)`,
                top: `calc(50% - ${planet.radius * 0.35}px)`,
                border: '1px solid rgba(100, 116, 139, 0.2)',
              }}
            />
          ))}

          {/* Sun */}
          <div
            className="absolute rounded-full z-15"
            style={{
              width: 54,
              height: 54,
              left: 'calc(50% - 27px)',
              top: 'calc(50% - 27px)',
              background: 'radial-gradient(circle at 40% 40%, #ffffff, #fff700, #ff8c00, #ff4500)',
              boxShadow: '0 0 30px #ffaa00, 0 0 60px #ff880088, 0 0 100px #ff660044, 0 0 150px #ff440022',
            }}
          >
            <div className="absolute inset-[-8px] rounded-full animate-pulse opacity-40" style={{
              background: 'radial-gradient(circle, #ff8c0044 0%, transparent 70%)',
            }} />
          </div>

          {/* Planets - sorted by y-position for depth */}
          {[...planets.map((planet, index) => ({ planet, index, angle: angles[index] }))]
            .sort((a, b) => {
              const posA = getPlanetPosition(a.planet, a.angle);
              const posB = getPlanetPosition(b.planet, b.angle);
              return posA.y - posB.y;
            })
            .map(({ planet, index }) => {
              const pos = getPlanetPosition(planet, angles[index]);
              const isSelected = selectedPlanet?.id === planet.id;
              const isBehindSun = pos.y < 0;
              const zIndex = isBehindSun ? 10 : 20;
              const opacity = isBehindSun ? 0.85 : 1;

              return (
                <div
                  key={planet.id}
                  className="absolute cursor-pointer transition-all duration-150"
                  style={{
                    width: planet.size + 20,
                    height: planet.size + 30,
                    left: `calc(50% + ${pos.x}px - ${(planet.size + 20) / 2}px)`,
                    top: `calc(50% + ${pos.y}px - ${(planet.size + 30) / 2}px)`,
                    zIndex: isSelected ? 50 : zIndex,
                    opacity,
                  }}
                  onClick={() => setSelectedPlanet(isSelected ? null : planet)}
                >
                  <div
                    className="rounded-full transition-transform duration-150"
                    style={{
                      width: planet.size,
                      height: planet.size,
                      margin: '0 auto',
                      background: planet.id === 'earth'
                        ? `radial-gradient(circle at 35% 35%, #6bc5f8, #4fa3e0 40%, #2d7ab5 70%, #1a5580)`
                        : planet.id === 'jupiter'
                        ? `radial-gradient(circle at 35% 35%, #e8c080, #c8a060 40%, #a07840 70%, #806030)`
                        : planet.id === 'mars'
                        ? `radial-gradient(circle at 35% 35%, #f09070, #e07040 40%, #b05030 70%, #803020)`
                        : `radial-gradient(circle at 35% 35%, ${planet.color}ee, ${planet.color}aa 50%, ${planet.color}55)`,
                      boxShadow: isSelected
                        ? `0 0 10px ${planet.color}, 0 0 20px ${planet.color}88, 0 0 30px ${planet.color}44`
                        : `0 0 4px ${planet.color}44`,
                      transform: isSelected ? 'scale(1.4)' : 'scale(1)',
                    }}
                  />
                  {/* Saturn's rings */}
                  {planet.id === 'saturn' && (
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        width: planet.size * 2,
                        height: planet.size * 0.5,
                        left: `calc(50% - ${planet.size}px)`,
                        top: `${planet.size / 2 - planet.size * 0.25}px`,
                        border: `2px solid ${planet.color}88`,
                        borderRadius: '50%',
                        transform: 'rotateX(75deg)',
                        boxShadow: `inset 0 0 4px ${planet.color}44`,
                      }}
                    />
                  )}
                  {/* Planet label */}
                  <div
                    className="text-center whitespace-nowrap pointer-events-none mt-1"
                    style={{
                      fontSize: '9px',
                      color: isSelected ? planet.color : '#9ca3af',
                      fontWeight: isSelected ? 600 : 400,
                      textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                    }}
                  >
                    {planet.name}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Planet Info Panel */}
      <div
        className={`absolute top-16 right-4 z-40 transition-all duration-300 ${
          selectedPlanet ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
      >
        {selectedPlanet && (
          <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700/70 rounded-2xl p-5 w-72 sm:w-80 shadow-2xl shadow-black/50">
            <button
              onClick={() => setSelectedPlanet(null)}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-600/50 transition-colors"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="rounded-full shrink-0"
                style={{
                  width: Math.max(selectedPlanet.size * 2, 30),
                  height: Math.max(selectedPlanet.size * 2, 30),
                  background: `radial-gradient(circle at 35% 35%, ${selectedPlanet.color}ee, ${selectedPlanet.color}66)`,
                  boxShadow: `0 0 15px ${selectedPlanet.color}55`,
                }}
              />
              <div>
                <h2 className="text-xl font-bold" style={{ color: selectedPlanet.color }}>
                  {selectedPlanet.name}
                </h2>
                <p className="text-gray-500 text-xs">Planet #{planets.findIndex(p => p.id === selectedPlanet.id) + 1} from the Sun</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">{selectedPlanet.description}</p>
            <div className="space-y-0">
              <InfoRow icon="📏" label="Diameter" value={selectedPlanet.actualDiameter} />
              <InfoRow icon="☀️" label="Distance from Sun" value={selectedPlanet.distanceFromSun} />
              <InfoRow icon="🔄" label="Orbital Period" value={selectedPlanet.orbitalPeriod} />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gray-900/70 backdrop-blur-md border-t border-gray-700/40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all font-medium shadow-lg shadow-blue-900/30 text-sm"
          >
            {isPlaying ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <polygon points="6,3 20,12 6,21" />
                </svg>
                Play
              </>
            )}
          </button>

          {/* Speed Control */}
          <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
            <span className="text-gray-400 text-sm whitespace-nowrap">Speed:</span>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="flex-1 cursor-pointer"
            />
            <span className="text-white font-mono text-sm w-12 text-right font-semibold">{speed.toFixed(1)}x</span>
          </div>

          {/* Speed presets */}
          <div className="flex gap-1.5">
            {[0.5, 1, 2, 5, 10].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  speed === s
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-700/40 last:border-0">
      <span className="text-gray-400 text-sm flex items-center gap-1.5">
        <span>{icon}</span>
        {label}
      </span>
      <span className="text-white font-medium text-sm">{value}</span>
    </div>
  );
}

export default App;
