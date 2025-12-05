import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Coffee, Pizza, Beer, Shirt, Heart } from 'lucide-react';

const IMPACT_RATES = {
    meals: 0.20, // $0.20 per meal (approx WFP)
    nets: 2.00,  // $2.00 per net (approx AMF)
};

const ITEMS = [
    { id: 'coffee', name: 'Morning Coffee', cost: 5, icon: Coffee },
    { id: 'lunch', name: 'Work Lunch', cost: 15, icon: Pizza },
    { id: 'drinks', name: 'Friday Night', cost: 50, icon: Beer },
    { id: 'clothes', name: 'New Outfit', cost: 80, icon: Shirt },
];

export default function PerspectiveBridge() {
    const [selectedItem, setSelectedItem] = useState(ITEMS[2]); // Default to "Friday Night"
    const [customAmount, setCustomAmount] = useState(50);
    const [activeTab, setActiveTab] = useState('meals'); // meals | nets

    const amount = selectedItem ? selectedItem.cost : customAmount;
    const impactCount = Math.floor(amount / IMPACT_RATES[activeTab]);

    return (
        <div id="bridge-section" className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-zinc-50 py-20 px-6 font-sans">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl w-full"
            >
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-[#121212]">
                    The <span className="text-[var(--color-accent)]">Power</span> of Your Pocket Change
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* LEFT SIDE: The User's World */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 h-full flex flex-col">
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-6">Your Reality</h3>

                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedItem(item)}
                                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all duration-300
                                ${selectedItem && selectedItem.id === item.id
                                            ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-lg scale-105'
                                            : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
                                        }
                            `}
                                >
                                    <item.icon size={24} />
                                    <span className="text-sm font-medium">{item.name}</span>
                                    <span className="text-xs opacity-80">${item.cost}</span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-zinc-100 flex justify-between items-center px-2">
                            <span className="text-zinc-500 font-medium">Wait, I spend...</span>
                            <div className="flex items-center gap-1 text-2xl font-bold text-[#121212]">
                                $
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => {
                                        setCustomAmount(Number(e.target.value));
                                        setSelectedItem(null);
                                    }}
                                    className="w-24 bg-transparent border-b-2 border-zinc-200 focus:border-[var(--color-accent)] outline-none text-center transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: The Impact Reality */}
                    <div className="relative bg-[#121212] p-8 rounded-2xl shadow-xl text-white h-full overflow-hidden min-h-[400px] flex flex-col">
                        {/* Decorative background pulse */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-accent)] opacity-10 blur-[80px] rounded-full animate-pulse"></div>

                        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-6 relative z-10">Equivalent Impact</h3>

                        <div className="flex gap-4 mb-8 relative z-10">
                            <button
                                onClick={() => setActiveTab('meals')}
                                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeTab === 'meals' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                            >
                                Meals
                            </button>
                            <button
                                onClick={() => setActiveTab('nets')}
                                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeTab === 'nets' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                            >
                                Malaria Nets
                            </button>
                        </div>

                        <div className="flex-grow flex flex-col items-center justify-center relative z-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${amount}-${activeTab}`}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    className="text-center"
                                >
                                    <span className="text-7xl md:text-8xl font-black text-[var(--color-accent)] tracking-tighter">
                                        {impactCount}
                                    </span>
                                    <p className="text-xl text-zinc-300 mt-2 font-light">
                                        {activeTab === 'meals' ? 'School Meals' : 'Life-Saving Nets'}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="absolute bottom-6 right-6 z-10">
                            <Heart className="text-[var(--color-accent)] animate-bounce" size={24} />
                        </div>
                    </div>

                </div>

            </motion.div>
        </div>
    );
}
