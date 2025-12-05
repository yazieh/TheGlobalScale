import { motion, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, Heart, Droplets, Utensils, ShieldCheck, Pill } from 'lucide-react';

const IMPACT_METRICS = [
    { id: 'nets', label: 'Malaria Nets', icon: ShieldCheck, cost: 2, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'meals', label: 'School Meals', icon: Utensils, cost: 0.25, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'water', label: 'People Water/Year', icon: Droplets, cost: 1.5, color: 'text-blue-500', bg: 'bg-blue-50' }, // Iodine deficiency / clean water
    { id: 'worms', label: 'Deworming Pills', icon: Pill, cost: 0.5, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

function ImpactCard({ metric, donationAmount, delay }) {
    const count = Math.floor(donationAmount / metric.cost);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, duration: 0.5 }}
            className={`p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col items-center text-center gap-3`}
        >
            <div className={`w-12 h-12 rounded-full ${metric.bg} ${metric.color} flex items-center justify-center`}>
                <metric.icon size={24} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
                <span className="text-4xl font-black text-[#121212] tracking-tight tabular-nums">
                    {count.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{metric.label}</span>
            </div>
            <div className="text-[10px] text-zinc-300 font-medium">
                ${metric.cost.toFixed(2)} / unit
            </div>
        </motion.div>
    );
}

export default function DonationFlow() {
    // Mock Data (Ideally passed from parent)
    const userIncome = 50000;
    const targetMedian = 240; // Burundi
    const startingRatio = Math.floor(userIncome / targetMedian); // ~208x

    // State
    const [targetRatio, setTargetRatio] = useState(100); // Default target (e.g. 100x)

    // Logic: Reduce the gap.
    const impliedTheirIncome = userIncome / targetRatio;
    const donationAmount = Math.max(0, Math.floor(impliedTheirIncome - targetMedian));

    return (
        <div id="donation-section" className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAFAFA] text-[#121212] font-sans py-24 px-6 relative">

            <div className="max-w-5xl w-full flex flex-col gap-16">

                {/* Header */}
                <div className="text-center space-y-4">
                    <p className="text-zinc-400 uppercase tracking-widest text-xs font-bold">The Equalizer</p>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                        Choose your <span className="text-[var(--color-accent)]">Fairness</span>.
                    </h2>
                    <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-light">
                        You are currently <span className="font-bold text-zinc-900">{startingRatio}x</span> wealthier than a peer in Burundi.
                        <br />Adjust the scale below to change that reality for one person.
                    </p>
                </div>

                {/* Control Panel */}
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-zinc-100 p-8 md:p-12">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
                        {/* Input Side */}
                        <div className="w-full md:w-1/2 space-y-8">
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-zinc-900 flex justify-between items-end">
                                    <span>Inequality Gap:</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-black text-[var(--color-accent)]">{targetRatio}x</span>
                                        <span className="text-xs text-zinc-400 block font-normal">wealthier than them</span>
                                    </div>
                                </label>

                                {/* Reversed Slider: Left (high ratio/cheap) -> Right (low ratio/expensive) */}
                                <input
                                    type="range"
                                    min="20"
                                    max={startingRatio}
                                    step="1"
                                    value={targetRatio}
                                    onChange={(e) => setTargetRatio(Number(e.target.value))}
                                    className="w-full h-4 bg-zinc-100 rounded-full appearance-none cursor-pointer accent-[var(--color-accent)] hover:accent-rose-600 transition-all dir-rtl"
                                    style={{ direction: 'rtl' }}
                                />
                                <div className="flex justify-between text-xs text-zinc-400 font-medium uppercase tracking-wider">
                                    <span>20x (Radical)</span>
                                    <span>{startingRatio}x (Status Quo)</span>
                                </div>
                            </div>

                            <div className="bg-zinc-50 rounded-xl p-6 flex justify-between items-center border border-zinc-100">
                                <div className="flex flex-col">
                                    <span className="text-zinc-500 font-medium text-xs uppercase tracking-wider">Required Contribution</span>
                                    <span className="text-zinc-300 text-[10px]">To achieve this ratio</span>
                                </div>
                                <span className="text-3xl font-black text-[#121212]">${donationAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* CTA Side */}
                        <div className="w-full md:w-auto">
                            <button className="bg-[#121212] text-white text-lg font-bold px-10 py-5 rounded-2xl w-full md:w-auto shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                                <Heart className="fill-rose-500 text-rose-500" strokeWidth={0} />
                                <span>Bridge the Gap</span>
                            </button>
                            <p className="text-center text-xs text-zinc-300 mt-3">Secure transfer via Stripe</p>
                        </div>
                    </div>

                    {/* Impact Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {IMPACT_METRICS.map((m, i) => (
                            <ImpactCard key={m.id} metric={m} donationAmount={donationAmount} delay={i * 0.1} />
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}
