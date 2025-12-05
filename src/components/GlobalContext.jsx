import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GlobalContext() {
    const country = "Switzerland";
    const userPercentile = 94; // User is in top 6% (94th percentile)
    const [hoveredData, setHoveredData] = useState(null);

    // Mock distribution curve data points (SVG path commands would be complex, simplifying with a shape)
    // A bell-curve-ish shape skewed right (wealth distribution)
    const graphWidth = 800;
    const graphHeight = 300;

    // Generating a simplified path for the distribution
    const pathD = `M0,${graphHeight} Q${graphWidth * 0.2},${graphHeight} ${graphWidth * 0.4},${graphHeight * 0.7} T${graphWidth},${graphHeight * 0.1} L${graphWidth},${graphHeight} Z`;

    // Calculate user position on the graph (approximate for visual)
    const userX = (userPercentile / 100) * graphWidth;
    const userY = graphHeight * 0.25; // Approximate y at that x

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAFAFA] text-[#121212] p-6 font-sans selection:bg-[var(--color-accent)] selection:text-white">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-2xl mb-12"
            >
                <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold mb-4">
                    Global Wealth Perspective
                </p>
                <h1 className="text-5xl font-bold tracking-tight mb-6">
                    You are an outlier.
                </h1>
                <p className="text-xl text-zinc-600 leading-relaxed font-light">
                    Living in <span className="font-semibold text-black underline decoration-[var(--color-accent)] decoration-2 underline-offset-4">{country}</span>, your standard of living is an anomaly in human history.
                </p>
            </motion.div>

            {/* Visualization Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative w-full max-w-4xl h-[400px] flex items-end justify-center mb-12"
            >
                {/* The Curve Container */}
                <div className="relative w-full h-full overflow-visible">
                    <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="w-full h-full overflow-visible drop-shadow-xl ">
                        <defs>
                            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* The Curve Area */}
                        <motion.path
                            d={pathD}
                            fill="url(#gradient)"
                            stroke="var(--color-accent)"
                            strokeWidth="3"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {/* User Marker Line */}
                        <motion.line
                            x1={userX}
                            y1={graphHeight}
                            x2={userX}
                            y2={userY}
                            stroke="var(--color-accent)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 2, duration: 0.5 }}
                        />

                        {/* User Marker Dot */}
                        <motion.circle
                            cx={userX}
                            cy={userY}
                            r="6"
                            fill="var(--color-accent)"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 2.5 }}
                        />
                        <motion.circle
                            cx={userX}
                            cy={userY}
                            r="12"
                            fill="var(--color-accent)"
                            opacity="0.3"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 2.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                        />
                    </svg>

                    {/* Annotation for User */}
                    <motion.div
                        className="absolute transform -translate-x-1/2 bg-white border border-zinc-200 shadow-lg rounded-lg px-4 py-2 text-sm z-10"
                        style={{ left: `${userPercentile}%`, top: '15%' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.6 }}
                    >
                        <span className="font-bold text-[var(--color-accent)]">You are here</span>
                        <br />Top 6% Globally
                    </motion.div>

                    {/* Annotation for Median */}
                    <div
                        className="absolute transform -translate-x-1/2 bottom-0 flex flex-col items-center group cursor-pointer"
                        style={{ left: '50%' }}
                    >
                        <div className="w-[1px] h-32 bg-zinc-300 group-hover:bg-zinc-800 transition-colors"></div>
                        <div className="mt-2 text-xs font-mono text-zinc-400 group-hover:text-black bg-zinc-100 px-2 py-1 rounded">Global Median</div>
                    </div>
                </div>
            </motion.div>

            {/* Footer / CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="flex gap-4"
            >
                <button
                    onClick={() => document.getElementById('matchup-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                    See My True Impact
                </button>
                <button className="bg-white text-zinc-600 border border-zinc-200 px-8 py-3 rounded-full font-medium hover:bg-zinc-50 transition-all">
                    How is this calculated?
                </button>
            </motion.div>

        </div >
    );
}
