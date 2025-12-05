import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, Check, Heart, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

const CHARITIES = [
    {
        id: 'givedirectly',
        name: 'GiveDirectly',
        desc: 'Sends cash directly to people in poverty. Efficiency: 93%.',
        color: 'bg-emerald-500',
        tags: ['Cash', 'Efficiency']
    },
    {
        id: 'amf',
        name: 'Against Malaria',
        desc: 'Provides mosquito nets. $2 per net. Proven to save lives.',
        color: 'bg-rose-500',
        tags: ['Health', 'Impact']
    },
];

export default function DonationFlow() {
    const [selectedCharity, setSelectedCharity] = useState('givedirectly');

    // Simulation Data (mirrors MultiplierMatchup defaults for now)
    const userIncome = 50000;
    const targetMedian = 240; // Burundi
    const currentMultiplier = Math.floor(userIncome / targetMedian); // ~208x

    // Gap Closer State
    const [targetMultiplier, setTargetMultiplier] = useState(currentMultiplier);

    // Calculate Donation needed to reduce the ratio
    // If I want to be only "100x" richer instead of "208x":
    // This means I keep (100 * targetMedian). The rest is donated.
    // Donation = UserIncome - (TargetMultiplier * TargetMedian)
    const donationAmount = Math.max(0, userIncome - (targetMultiplier * targetMedian));

    const percentageGiven = ((donationAmount / userIncome) * 100).toFixed(1);
    const impactEquivalent = Math.floor(donationAmount / 2); // Nets approx

    return (
        <div id="donation-section" className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-900 text-white font-sans py-20 px-6 relative overflow-hidden">

            {/* Background Ambience allowing for a darker, more serious "Action" mode */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(225,29,72,0.15),transparent_70%)] pointer-events-none" />
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="max-w-5xl w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >

                {/* Left Col: The Logic / Gap Closer */}
                <div className="space-y-12">

                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                            <Scale size={14} />
                            <span>Equalizer Engine</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                            Choose your <br /><span className="text-rose-500">Unfairness Level</span>.
                        </h2>
                        <p className="text-zinc-400 text-lg">
                            You currently earn <span className="text-white font-bold">{currentMultiplier}x</span> more than a peer in Burundi.
                            <br />How much of that gap are you willing to close?
                        </p>
                    </div>

                    {/* The Slider Mechanism */}
                    <div className="bg-zinc-800/50 rounded-3xl p-8 border border-zinc-700/50 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-rose-500 opacity-30" />

                        <div className="flex justify-between items-end mb-8">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Target Multiplier</label>
                                <div className="text-5xl font-black tabular-nums tracking-tighter">
                                    {targetMultiplier}x
                                </div>
                                <p className="text-xs text-zinc-400">Richer than them</p>
                            </div>

                            <div className="text-right space-y-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Pledge Amount</label>
                                <div className="text-4xl font-bold text-rose-400 tabular-nums">
                                    ${donationAmount.toLocaleString()}
                                </div>
                                <p className="text-xs text-rose-400/70">
                                    {percentageGiven}% of annual income
                                </p>
                            </div>
                        </div>

                        <input
                            type="range"
                            min={1}
                            max={currentMultiplier}
                            step={1}
                            value={targetMultiplier}
                            onChange={(e) => setTargetMultiplier(Number(e.target.value))}
                            className="w-full h-4 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-rose-500 hover:accent-rose-400 transition-all"
                        />

                        <div className="flex justify-between mt-4 text-xs font-medium text-zinc-600 uppercase tracking-wider">
                            <span>1x (Equality)</span>
                            <span>{currentMultiplier}x (Status Quo)</span>
                        </div>

                        {/* Visual Bars Closing Gap */}
                        <div className="mt-10 space-y-3 pt-8 border-t border-zinc-700/50">
                            <div className="flex items-center gap-4 text-sm text-zinc-400">
                                <div className="w-24 text-right">You (After)</div>
                                <div className="flex-1 h-3 bg-zinc-700 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: `${(targetMultiplier / currentMultiplier) * 100}%` }}
                                        className="h-full bg-white"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-zinc-400">
                                <div className="w-24 text-right">Them</div>
                                <div className="flex-1 h-3 bg-zinc-700 rounded-full overflow-hidden">
                                    <div className="h-full w-[1px] bg-rose-500" /> {/* Just a sliver */}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Right Col: The Action / Impact */}
                <div className="bg-white text-zinc-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full min-h-[500px]">

                    <div className="space-y-8 relative z-10">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Immediate Impact</h3>
                            <p className="text-zinc-500">Your choice doesn't just reduce a number. It buys survival.</p>
                        </div>

                        {/* Impact Stat */}
                        <div className="flex items-center gap-6">
                            <div className="bg-rose-100 p-4 rounded-2xl text-rose-600">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <div className="text-5xl font-black text-rose-600 tracking-tighter">
                                    {impactEquivalent.toLocaleString()}
                                </div>
                                <div className="font-bold text-zinc-900 uppercase tracking-wide">Malaria Nets</div>
                            </div>
                        </div>

                        {/* Charity Selector Mini */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Recipient Fund</label>
                            <div className="grid grid-cols-2 gap-3">
                                {CHARITIES.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => setSelectedCharity(c.id)}
                                        className={`
                                    p-4 rounded-xl border-2 text-left transition-all
                                    ${selectedCharity === c.id ? 'border-rose-500 bg-rose-50' : 'border-zinc-100 hover:border-zinc-200'}
                                `}
                                    >
                                        <div className="font-bold text-sm">{c.name}</div>
                                        <div className="text-[10px] text-zinc-500 font-medium uppercase mt-1">{c.tags[0]}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button className="bg-[#121212] hover:scale-[1.02] active:scale-[0.98] text-white w-full py-5 rounded-xl font-bold text-lg mt-8 flex items-center justify-center gap-3 transition-all shadow-xl group">
                        <span>Finalize Impact</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Decor */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                </div>

            </motion.div>
        </div>
    );
}
