export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background relative overflow-hidden">
      {/* Subtle neon background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 text-center">
        {/* Spinner */}
        <div className="mb-6 flex justify-center">
          <div className="relative h-16 w-16">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent border-r-accent animate-spin" />

            {/* Middle ring (reverse) */}
            <div
              className="absolute inset-2 rounded-full border-4 border-transparent border-b-neon-purple border-l-neon-purple animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
            />

            {/* Inner ring */}
            <div
              className="absolute inset-4 rounded-full border-4 border-transparent border-t-neon-teal animate-spin"
              style={{ animationDuration: "2s" }}
            />

            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-accent" />
            </div>
          </div>
        </div>

        {/* Text */}
        <p className="text-lg font-medium text-foreground">
          Analyzing domain
        </p>
        <p className="text-sm text-foreground/60 mt-1">
          Fetching intelligence data
        </p>
      </div>
    </div>
  );
}
