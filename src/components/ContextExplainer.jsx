import { motion } from 'framer-motion';
import { HelpCircle, Globe, Info } from 'lucide-react';
import { useState } from 'react';

const EXPLAINERS = [
    {
        title: "Why Median, not Average?",
        icon: Info,
        content: "If Bill Gates walks into a bar of 50 people, the 'average' income jumps to $100 million. But everyone else is still poor. The median tells the true story of the middle person."
    },
    {
        title: "Purchasing Power (PPP)",
        icon: Globe,
        content: "Earning $10 in India buys more food than $10 in New York. We adjust all numbers for 'Purchasing Power Parity' to compare actual standard of living, not just currency."
    },
    {
        title: "Where is this data from?",
        icon: HelpCircle,
        content: "We use the latest data from the World Bank and World Inequality Database (WID.world), blending household surveys and tax data for the most accurate global picture."
    }
];

export default function ContextExplainer() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="w-full bg-white text-[#121212] py-24 px-6 relative z-10 border-b border-zinc-100">
            <div className="max-w-4xl mx-auto space-y-24">

                {/* 1. The Luck Narrative (Birth Lottery) */}
                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-6"
                    >
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            You won the <span className="text-[var(--color-accent)]">Birth Lottery</span>.
                        </h2>
                        <p className="text-xl md:text-2xl text-zinc-600 font-light max-w-2xl mx-auto leading-relaxed">
                            You had a <span className="font-bold text-[#121212]">0.8% probability</span> of being born into this income bracket.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-zinc-50 rounded-3xl p-8 md:p-12 border border-zinc-100">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold">The Global Village</h3>
                            <p className="text-zinc-600 leading-relaxed">
                                If the world were a village of just 100 people, <span className="font-bold text-[#121212] underline decoration-rose-300 decoration-2 underline-offset-2">92 of them</span> would trade places with you instantly.
                            </p>
                            <p className="text-zinc-600 leading-relaxed">
                                Your hard work is real. But your <span className="italic font-serif text-lg">starting line</span> was determined by luck alone.
                            </p>
                        </div>
                        <div className="h-48 grid grid-cols-10 grid-rows-10 gap-1 p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm relative overflow-hidden">
                            {[...Array(100)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: i * 0.005 }}
                                    className={`rounded-full ${i < 92 ? 'bg-zinc-200' : 'bg-[var(--color-accent)]'}`}
                                />
                            ))}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">Only 8 people live here</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. The Insight Strip (Explainers) */}
                <div className="space-y-8">
                    <div className="text-center">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">The Methodology</p>
                        <h3 className="text-2xl font-bold">Understanding the Numbers</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {EXPLAINERS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all group cursor-default"
                            >
                                <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-50 transition-colors">
                                    <item.icon size={20} className="text-zinc-400 group-hover:text-rose-500 transition-colors" />
                                </div>
                                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    {item.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
