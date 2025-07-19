// src/data/dummyHRData.ts

export type AlertLevel = 'normal' | 'elevated' | 'danger';

export interface HRReading {
  id: string;            // device identifier
  timestamp: string;     // ISO timestamp
  heartRate: number;     // bpm
  level: AlertLevel;     // normal | elevated | danger
  isOnline: boolean;     // device connectivity
  battery: number | null;// null when offline
}

// Extend HRReading to include athlete info
export interface AthleteReading extends HRReading {
  athlete: string;
  sport: string;
}

// Define the three athletes
const athletes = [
  { name: 'Kuzi Bvunyenge', sport: 'Sprinting' },
  { name: 'Lutho Vananda', sport: 'football' },
  { name: 'Peter Horn', sport: 'Body-Building' },
];

// Generate dummy heart‑rate readings for each athlete
export const generateAthleteReadings = (
  readingsPerAthlete = 50,
  intervalMs = 60000 // 1 second intervals
): AthleteReading[] => {
  const result: AthleteReading[] = [];
  const now = Date.now();

  athletes.forEach((athlete, idx) => {
    for (let i = 0; i < readingsPerAthlete; i++) {
      const timestamp = new Date(now + i * intervalMs).toISOString();
      const heartRate = Math.floor(50 + Math.random() * 130);
      let level: AlertLevel = 'normal';
      if (heartRate >= 120 && heartRate < 150) level = 'elevated';
      else if (heartRate >= 150) level = 'danger';
      const isOnline = Math.random() > 0.1;
      const battery = isOnline ? Math.floor(20 + Math.random() * 80) : null;
      result.push({
        id: `device-${idx + 1}`,
        timestamp,
        heartRate,
        level,
        isOnline,
        battery,
        athlete: athlete.name,
        sport: athlete.sport,
      });
    }
  });

  return result;
};

// Pre‑generate a batch of dummy readings
export const dummyReadings: AthleteReading[] = generateAthleteReadings();

//Creates a “real‑time” feed simulator for AthleteReading
export const createRealTimeFeed = (
  readings = dummyReadings,
  intervalMs = 5000
): ((callback: (reading: AthleteReading) => void) => () => void) => {
  return (callback) => {
    let idx = 0;
    const timerId = window.setInterval(() => {
      if (idx >= readings.length) {
        clearInterval(timerId);
      } else {
        callback(readings[idx]);
        idx += 1;
      }
    }, intervalMs);

    return () => clearInterval(timerId);
  };
};

// Compute summary statistics for the dashboard based on dummy readings
export const getDashboardStats = () => {
  // Build a set of all distinct athlete names
  const uniqueAthletes = new Set(
    dummyReadings.map(r => r.athlete)
  );

  // Calculate the average heart rate across all readings,
  // rounding to the nearest whole number
  const avgHearRate = Math.round(
    dummyReadings
      .reduce((sum, r) => sum + r.heartRate, 0)  // sum all heartRate values
      / dummyReadings.length                     // divide by count of readings
  );

  // Build a set of athlete names for readings where the device is online,
  // treating “online” as an indication of currently active athletes
  const activeAthletes = new Set(
    dummyReadings
      .filter(r => r.isOnline)    // only readings with isOnline === true
      .map(r => r.athlete)         // map to athlete names
  );

  return {
    totalAthletes: uniqueAthletes.size,  // number of distinct athletes
    avgHearRate,                         // rounded average HR
    activeAthletes: activeAthletes.size  // number of currently active athletes
  };
};
