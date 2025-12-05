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
                <div
                    className="relative w-full h-full"
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const p = Math.min(100, Math.max(0, (x / rect.width) * 100));
                        setHoveredData(p);
                    }}
                    onMouseLeave={() => setHoveredData(null)}
                >
                    <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="w-full h-full overflow-visible drop-shadow-xl">
                        <defs>
                            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="povertyGradient" x1="0" x2="1" y1="0" y2="0">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Regions: Poverty Trap (Bottom 10%) */}
                        <rect x="0" y="0" width={graphWidth * 0.1} height={graphHeight} fill="url(#povertyGradient)" opacity="0.3" />

                        {/* Income Landmarks (Vertical Dashed Lines) */}
                        {/* $2.15/day - Approx 10th percentile */}
                        <line x1={graphWidth * 0.1} y1={0} x2={graphWidth * 0.1} y2={graphHeight} stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                        <text x={graphWidth * 0.1 + 5} y={graphHeight - 5} className="text-[9px] fill-zinc-400 font-mono uppercase tracking-wider">Extreme Poverty</text>

                        {/* Global Median - 50th percentile */}
                        <line x1={graphWidth * 0.5} y1={0} x2={graphWidth * 0.5} y2={graphHeight} stroke="#121212" strokeWidth="1" strokeDasharray="2 2" opacity="0.2" />
                        <text x={graphWidth * 0.5 + 5} y={graphHeight - 5} className="text-[9px] fill-zinc-400 font-mono uppercase tracking-wider">Global Middle</text>

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

                        {/* Hover Scanner Line */}
                        {hoveredData && (
                            <line
                                x1={(hoveredData / 100) * graphWidth}
                                y1="0"
                                x2={(hoveredData / 100) * graphWidth}
                                y2={graphHeight}
                                stroke="#121212"
                                strokeWidth="1"
                                strokeDasharray="2 2"
                                opacity="0.5"
                            />
                        )}

                        {/* User Marker */}
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

                        <motion.circle
                            cx={userX}
                            cy={userY}
                            r="6"
                            fill="var(--color-accent)"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 2.5 }}
                        />
                    </svg>

                    {/* Rich Tooltips */}
                    {hoveredData && (
                        <div
                            className="absolute top-10 transform -translate-x-1/2 pointer-events-none bg-white/90 backdrop-blur border border-zinc-200 shadow-xl p-3 rounded-xl z-50 min-w-[140px]"
                            style={{ left: `${hoveredData}%` }}
                        >
                            <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1">
                                {Math.floor(hoveredData)}th Percentile
                            </div>
                            <div className="text-sm font-bold text-[#121212] mb-1">
                                <span className="text-[var(--color-accent)]">
                                    ~${(Math.pow(1.05, hoveredData) * 300).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </span> / year
                            </div>
                            <div className="text-[10px] text-zinc-500">
                                Pop: ~{(80000000).toLocaleString()} ppl
                            </div>
                        </div>
                    )}

                    {/* Annotation for User */}
                    <motion.div
                        className="absolute transform -translate-x-1/2 bg-white border border-zinc-200 shadow-lg rounded-lg px-4 py-2 text-sm z-10"
                        style={{ left: `${userPercentile}%`, top: '15%' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.6 }}
                    >
                        <span className="font-bold text-[var(--color-accent)]">You</span>
                    </motion.div>
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
