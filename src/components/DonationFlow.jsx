import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Check, Heart, ShieldCheck } from 'lucide-react';

const CHARITIES = [
    {
        id: 'givedirectly',
        name: 'GiveDirectly',
        desc: 'Sends cash directly to people in poverty. Proven to be the most efficient way to empower recipients.',
        tags: ['Efficiency', 'Empowerment'],
        color: 'bg-emerald-500',
        link: 'https://givedirectly.org'
    },
    {
        id: 'amf',
        name: 'Against Malaria',
        desc: 'Provides long-lasting insecticidal nets. One of the most cost-effective ways to save lives.',
        tags: ['Health', 'Lifesaving'],
        color: 'bg-rose-500',
        link: 'https://www.againstmalaria.com/'
    },
    {
        id: 'hki',
        name: 'Helen Keller Intl',
        desc: 'Vitamin A supplementation to prevent blindness and death in children.',
        tags: ['Health', 'Vision'],
        color: 'bg-amber-500',
        link: 'https://helenkellerintl.org/'
    }
];

export default function DonationFlow() {
    const [selectedCharity, setSelectedCharity] = useState(null);
    const [amount, setAmount] = useState(50); // Default donation

    return (
        <div id="donation-section" className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAFAFA] text-[#121212] font-sans py-20 px-6 relative">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-50/50 to-transparent pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl w-full z-10 flex flex-col gap-12"
            >

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-rose-100/50 text-rose-700 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider mb-2">
                        <Heart size={14} className="fill-rose-700" />
                        <span>Pass the Luck</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        Turn Awareness into <span className="text-[var(--color-accent)]">Action</span>.
                    </h2>
                    <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
                        You have the power to change the trajectory of lives simply by sharing a fraction of your luck.
                    </p>
                </div>

                {/* Charity Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {CHARITIES.map((charity) => (
                        <div
                            key={charity.id}
                            onClick={() => setSelectedCharity(charity.id)}
                            className={`
                relative p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-4 group hover:shadow-xl
                ${selectedCharity === charity.id ? 'border-[var(--color-accent)] bg-white shadow-xl scale-105' : 'border-zinc-100 bg-white shadow-sm hover:border-zinc-200'}
              `}
                        >
                            {selectedCharity === charity.id && (
                                <div className="absolute -top-3 -right-3 bg-[var(--color-accent)] text-white p-1 rounded-full shadow-lg">
                                    <Check size={16} strokeWidth={3} />
                                </div>
                            )}

                            <div className={`w-12 h-12 rounded-xl ${charity.color} flex items-center justify-center text-white shadow-md`}>
                                <ShieldCheck />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-1">{charity.name}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">{charity.desc}</p>
                            </div>

                            <div className="flex gap-2 mt-auto pt-4">
                                {charity.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-500 px-2 py-1 rounded-md">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Amount & Action */}
                <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">

                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Pledge Amount</label>
                        <div className="flex items-center gap-2 border-b-2 border-zinc-100 focus-within:border-[var(--color-accent)] transition-colors pb-1">
                            <span className="text-3xl font-light text-zinc-400">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="text-4xl font-black outline-none w-48 bg-transparent"
                            />
                        </div>
                        <p className="text-xs text-zinc-400 pl-1">
                            ≈ {(amount / 2).toFixed(0)} Malaria Nets
                        </p>
                    </div>

                    <button
                        className="w-full md:w-auto bg-[var(--color-accent)] hover:bg-rose-700 text-white text-lg font-bold py-4 px-12 rounded-xl transition-all shadow-lg hover:shadow-rose-500/30 flex items-center justify-center gap-3 active:scale-95"
                    >
                        <span>Make it Count</span>
                        <ArrowRight size={20} />
                    </button>

                </div>

                <p className="text-center text-xs text-zinc-400 max-w-lg mx-auto">
                    This demo does not process real payments. In a production version, this would connect to Stripe or the charity's donation page directly.
                </p>

            </motion.div>
        </div>
    );
}
