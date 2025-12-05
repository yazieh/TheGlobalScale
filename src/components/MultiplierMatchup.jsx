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
    const [userIncome, setUserIncome] = useState(50000);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Calculate stats
    const multiplier = userIncome / targetCountry.medianIncome;
    const yearsToEarn = Math.floor(multiplier);

    // Calculate relative widths for the bar graph
    // User is always 100% width relative to themselves, but to show scale against Country:
    // If User = 100%, Country = 100 / multiplier
    const countryBarWidth = Math.max(0.5, (1 / multiplier) * 100); // Min 0.5% visibility

    return (
        <div id="matchup-section" className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAFAFA] font-sans relative">

            {/* Background Ambience (Subtler) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

            {/* Header / Nav Anchor */}
            <div className="absolute top-10 left-0 w-full flex justify-center opacity-30 pointer-events-none">
                <ChevronDown className="animate-bounce" />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full max-w-5xl px-6 relative z-10 flex flex-col gap-12"
            >

                {/* Top Control Bar: User Input & Country Selector */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-zinc-100 pb-12">

                    {/* Input Side */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#121212]/40 mb-2">My Annual Income</label>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-light text-zinc-400">$</span>
                            <input
                                type="number"
                                value={userIncome}
                                onChange={(e) => setUserIncome(Number(e.target.value))}
                                className="text-4xl md:text-5xl font-bold bg-transparent border-b border-transparent hover:border-zinc-200 focus:border-[var(--color-accent)] outline-none w-48 transition-all text-[#121212] p-0"
                            />
                        </div>
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
                            <ChevronDown size={16} className={`text-zinc-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
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
                <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-8 md:p-12 relative overflow-hidden">

                    {/* Watermark X Behavior */}
                    <div className="absolute -right-10 -bottom-20 text-[300px] leading-none font-black text-[var(--color-accent)] opacity-[0.07] select-none pointer-events-none">
                        x
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

                        {/* Text Context */}
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-light text-zinc-600">
                                It would take a median worker in <span className="font-semibold text-zinc-900 border-b-2 border-[#121212]/10">{targetCountry.name}</span>
                            </h2>

                            <div className="flex items-baseline gap-4">
                                <span className="text-6xl md:text-8xl font-black text-[#121212] tracking-tighter">
                                    {yearsToEarn}
                                </span>
                                <span className="text-xl md:text-2xl font-bold uppercase tracking-widest text-[var(--color-accent)]">Years</span>
                            </div>

                            <p className="text-lg text-zinc-500">
                                to earn what you generate in <span className="font-semibold text-zinc-900">one single year</span>.
                            </p>
                        </div>

                        {/* The Visualization Bars */}
                        <div className="flex flex-col gap-6 justify-center pl-0 md:pl-12 border-l border-transparent md:border-zinc-100">

                            {/* User Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    <span>You</span>
                                    <span>1 Year</span>
                                </div>
                                <div className="h-4 w-full bg-[var(--color-accent)] rounded-full shadow-[0_0_15px_oklch(51.4%_0.222_16.935_/_0.3)]"></div>
                            </div>

                            {/* Country Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    <span>{targetCountry.name}</span>
                                    <span>1 Year Income</span>
                                </div>
                                <div className="w-full bg-zinc-100 rounded-full h-4 overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${countryBarWidth}%` }}
                                        transition={{ duration: 1, type: "spring" }}
                                        className="h-full bg-zinc-800 absolute top-0 left-0 rounded-full"
                                    />
                                </div>
                                <p className="text-xs text-zinc-400 text-right">
                                    Their year is <span className="font-bold text-zinc-600">{countryBarWidth.toFixed(2)}%</span> of yours.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
