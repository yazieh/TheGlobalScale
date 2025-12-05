import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, RefreshCw, Pencil, Play, Pause, RotateCcw } from 'lucide-react';

const COUNTRIES = [
    { id: 'ind', name: 'India', flag: '🇮🇳', medianIncome: 2000, color: 'from-orange-400 to-green-500' },
    { id: 'bdi', name: 'Burundi', flag: '🇧🇮', medianIncome: 240, color: 'from-green-600 to-red-500' },
    { id: 'nga', name: 'Nigeria', flag: '🇳🇬', medianIncome: 1200, color: 'from-green-500 to-white' },
];

function AnimatedNumber({ value }) {
    const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span>{display}</motion.span>;
}



export default function MultiplierMatchup() {
    const [targetCountry, setTargetCountry] = useState(COUNTRIES[1]);

    // UX State
    const [userIncome, setUserIncome] = useState(50000);
    const [isEditingIncome, setIsEditingIncome] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Stats
    const multiplier = userIncome / targetCountry.medianIncome;
    const yearsToEarn = Math.floor(multiplier);

    // Race State
    const [isPlaying, setIsPlaying] = useState(true);
    const [elapsed, setElapsed] = useState(0);
    const requestRef = useRef();
    const previousTimeRef = useRef();

    // Time Simulation Configuration
    // We want to simulate days passing quickly to show high numbers.
    // Let's say 1 real second = 5 simulated days.
    const SIMULATION_SPEED = 5; // days per second
    const DAYS_IN_YEAR = 365;

    const userDailyRate = userIncome / DAYS_IN_YEAR;
    const countryDailyRate = targetCountry.medianIncome / DAYS_IN_YEAR;

    const animate = time => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;
            // Convert real ms to simulated days
            // deltaTime (ms) / 1000 = seconds. * speed = days.
            const daysPassed = (deltaTime / 1000) * SIMULATION_SPEED;
            setElapsed(prev => prev + daysPassed);
        }
        previousTimeRef.current = time;
        if (isPlaying) {
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(requestRef.current);
            previousTimeRef.current = undefined;
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [isPlaying]);

    const resetRace = () => {
        setIsPlaying(false);
        setElapsed(0);
        previousTimeRef.current = undefined;
    };

    const daysDisplay = Math.floor(elapsed);
    const userTotal = (elapsed * userDailyRate).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const countryTotal = (elapsed * countryDailyRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div id="matchup-section" className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAFAFA] font-sans relative">

            {/* Texture & Gradient */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)] opacity-[0.04] blur-[150px] rounded-full pointer-events-none" />

            {/* Header / Nav Anchor */}
            <div className="absolute top-10 left-0 w-full flex justify-center opacity-30 pointer-events-none">
                <ChevronDown className="animate-bounce" />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full max-w-6xl px-6 relative z-10 flex flex-col gap-12"
            >

                {/* Top Control Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-zinc-100 pb-12 z-20">
                    {/* Input Side (Revised UX) */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left relative group">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#121212]/40 mb-2">My Annual Income</label>
                        {isEditingIncome ? (
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-light text-zinc-400">$</span>
                                <input
                                    autoFocus
                                    type="number"
                                    value={userIncome}
                                    onBlur={() => setIsEditingIncome(false)}
                                    onChange={(e) => {
                                        setUserIncome(Number(e.target.value));
                                        setElapsed(0); // Reset race on edit
                                    }}
                                    className="text-4xl md:text-5xl font-bold bg-transparent border-b-2 border-[var(--color-accent)] outline-none w-48 transition-all text-[#121212] p-0"
                                />
                            </div>
                        ) : (
                            <div
                                onClick={() => setIsEditingIncome(true)}
                                className="flex items-baseline gap-2 cursor-pointer hover:opacity-70 transition-opacity"
                            >
                                <span className="text-4xl md:text-5xl font-bold text-[#121212] flex gap-1">
                                    $<AnimatedNumber value={userIncome} />
                                </span>
                                <Pencil size={18} className="text-zinc-300 group-hover:text-[var(--color-accent)] transition-colors" />
                            </div>
                        )}
                    </div>

                    {/* Selector Side */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 bg-white border border-zinc-200 shadow-sm px-6 py-3 rounded-xl hover:shadow-md transition-all text-left w-64 justify-between group"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{targetCountry.flag}</span>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Comparing to</span>
                                    <span className="font-semibold text-[#121212]">{targetCountry.name}</span>
                                </div>
                            </div>
                            <ChevronDown size={16} className={`text - zinc - 400 transition - transform ${isDropdownOpen ? 'rotate-180' : ''} `} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 top-full mt-2 w-64 bg-white border border-zinc-100 shadow-xl rounded-xl p-2 z-50 overflow-hidden"
                                >
                                    {COUNTRIES.map(c => (
                                        <button
                                            key={c.id}
                                            onClick={() => {
                                                setTargetCountry(c);
                                                setIsDropdownOpen(false);
                                                setElapsed(0); // Reset race on switch
                                            }}
                                            className="w-full text-left px-4 py-3 text-sm text-[#121212] hover:bg-zinc-50 rounded-lg flex items-center gap-3 transition-colors"
                                        >
                                            <span className="text-lg">{c.flag}</span>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{c.name}</span>
                                                <span className="text-xs text-zinc-400">Median: ${c.medianIncome}</span>
                                            </div>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>


                {/* The Hero Card Area */}
                <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-8 md:p-12 relative overflow-hidden flex flex-col items-center">

                    {/* Watermark X */}
                    <motion.div
                        key={targetCountry.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 0.07, scale: 1 }}
                        className="absolute -right-10 -bottom-20 text-[300px] leading-none font-black text-[var(--color-accent)] select-none pointer-events-none"
                    >
                        x
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10 w-full">

                        {/* Visual Context (Left) */}
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-light text-zinc-600 leading-snug">
                                It takes them <span className="font-bold text-[#121212]">{yearsToEarn} years</span> to earn what you make in <span className="font-bold text-[#121212]">1 year</span>.
                            </h2>
                            <p className="text-zinc-500">
                                Comparing earnings over <span className="text-[var(--color-accent)] font-semibold">simulated time</span>.
                            </p>

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="bg-[#121212] text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-zinc-800 transition-all border border-transparent shadow-lg hover:shadow-xl"
                                >
                                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                                    {isPlaying ? "Pause Time" : "Resume Time"}
                                </button>
                                <button
                                    onClick={resetRace}
                                    className="bg-white border border-zinc-200 text-zinc-600 px-4 py-3 rounded-full hover:bg-zinc-50 transition-all hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)]"
                                >
                                    <RotateCcw size={16} />
                                </button>
                            </div>
                        </div>

                        {/* The Income Race (Right) */}
                        <div className="flex flex-col gap-6 w-full p-8 bg-zinc-50 rounded-2xl border border-zinc-100 shadow-inner relative overflow-hidden">

                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Simulated Time Elapsed</span>
                                <div className="bg-white px-3 py-1 rounded-full border border-zinc-200 text-xs font-mono font-medium text-zinc-500 shadow-sm">
                                    Day {daysDisplay}
                                </div>
                            </div>

                            {/* User Ticker */}
                            <div className="space-y-2 relative">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    <span>You Earned</span>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm flex justify-between items-center group relative overflow-hidden">
                                    <div className="absolute left-0 top-0 h-1 w-full bg-[var(--color-accent)] opacity-20 animate-pulse"></div>
                                    <div className="flex flex-col relative z-10">
                                        <span className="text-5xl font-black text-[#121212] tracking-tighter tabular-nums">
                                            ${userTotal}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Target Logic */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    <span>{targetCountry.name} Earned</span>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm flex justify-between items-center opacity-80">
                                    <div className="flex flex-col">
                                        <span className="text-5xl font-black text-zinc-300 tracking-tighter tabular-nums">
                                            ${countryTotal}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}

