import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';

const COUNTRIES = [
    { id: 'ind', name: 'India', flag: '🇮🇳', medianIncome: 2000, color: 'from-orange-400 to-green-500' },
    { id: 'bdi', name: 'Burundi', flag: '🇧🇮', medianIncome: 240, color: 'from-green-600 to-red-500' },
    { id: 'nga', name: 'Nigeria', flag: '🇳🇬', medianIncome: 1200, color: 'from-green-500 to-white' },
];

export default function MultiplierMatchup() {
    const [targetCountry, setTargetCountry] = useState(COUNTRIES[1]); // Default Burundi
    const [userIncome, setUserIncome] = useState(50000); // Mock default Annual Post-Tax
    const [isHovering, setIsHovering] = useState(false);

    const multiplier = Math.floor(userIncome / targetCountry.medianIncome);
    const yearsToEarn = Math.floor(userIncome / targetCountry.medianIncome);

    return (
        <div id="matchup-section" className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAFAFA] font-sans relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)] opacity-5 blur-[120px] rounded-full pointer-events-none" />

            {/* Header / Nav Anchor */}
            <div className="absolute top-10 left-0 w-full flex justify-center opacity-30">
                <ChevronDown className="animate-bounce" />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-10 items-center"
            >

                {/* LEFT: THE USER (YOU) */}
                <div className="flex flex-col justify-center items-start space-y-8">
                    <div className="space-y-2">
                        <span className="text-sm font-bold uppercase tracking-widest text-[#121212]/40">Your Year</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl md:text-5xl font-light text-[#121212]">$</span>
                            <input
                                type="number"
                                value={userIncome}
                                onChange={(e) => setUserIncome(Number(e.target.value))}
                                className="text-4xl md:text-5xl font-bold bg-transparent border-b-2 border-zinc-200 focus:border-[var(--color-accent)] outline-none w-56 transition-colors"
                            />
                        </div>
                        <p className="text-sm text-zinc-400">Annual Post-Tax Income</p>
                    </div>

                    <div className="h-[1px] w-full bg-zinc-200"></div>

                    <div className="space-y-4">
                        <h3 className="text-2xl font-medium text-[#121212]">The Power Gap</h3>
                        <p className="text-lg text-zinc-500 font-light leading-relaxed">
                            You generate in <span className="text-[var(--color-accent)] font-semibold">1 year</span> what takes a median worker in {targetCountry.name} a lifetime to accumulate.
                        </p>
                    </div>
                </div>

                {/* RIGHT: THE COMPARISON (THEM) */}
                <div className="relative flex flex-col justify-center items-center">

                    {/* The Switcher */}
                    <div className="absolute top-0 right-0">
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-sm font-semibold bg-white border border-zinc-200 shadow-sm px-4 py-2 rounded-full hover:shadow-md transition-all">
                                <RefreshCw size={14} className="text-zinc-400" />
                                Switch Country
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-zinc-100 shadow-xl rounded-xl p-2 hidden group-hover:block transistion-all opacity-0 group-hover:opacity-100 z-50">
                                {COUNTRIES.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => setTargetCountry(c)}
                                        className="w-full text-left px-3 py-2 text-sm text-[#121212] hover:bg-zinc-50 rounded-lg flex items-center gap-2"
                                    >
                                        <span>{c.flag}</span> {c.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* The Multiplier Visualization */}
                    <div className="flex flex-col items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={targetCountry.id + userIncome}
                                initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                                exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="relative"
                            >
                                <h1 className="text-[120px] md:text-[180px] font-black leading-none text-[#121212] tracking-tighter mix-blend-multiply">
                                    {yearsToEarn}
                                    <span className="text-4xl font-bold text-[var(--color-accent)] absolute top-4 -right-8">x</span>
                                </h1>
                            </motion.div>
                        </AnimatePresence>

                        <motion.div
                            key={targetCountry.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-center"
                        >
                            <p className="text-xl font-medium text-[#121212]">Years of Labor</p>
                            <div className="flex items-center justify-center gap-2 mt-2 px-4 py-1.5 bg-zinc-100 rounded-full">
                                <span>{targetCountry.flag}</span>
                                <span className="text-sm font-semibold text-zinc-600">{targetCountry.name} Median</span>
                            </div>
                        </motion.div>
                    </div>

                </div>

            </motion.div>
        </div>
    );
}
