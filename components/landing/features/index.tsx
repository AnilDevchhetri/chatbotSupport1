import {
    Bot,
    MessageSquare,
    BookOpen,
    Code2,
    Wallet,
    Layers,
} from "lucide-react";

const features = [
    {
        icon: Bot,
        title: "AI-Powered Responses",
        desc: "Deliver instant, human-like replies to customer queries using advanced AI trained on your business data.",
    },
    {
        icon: MessageSquare,
        title: "Omnichannel Support",
        desc: "Manage conversations across website, chat, and messaging platforms from a single unified inbox.",
    },
    {
        icon: BookOpen,
        title: "Smart Knowledge Base",
        desc: "Automatically learn from your content and improve responses over time with a dynamic knowledge system.",
    },
    {
        icon: Code2,
        title: "Easy Embed Script",
        desc: "Add the chatbot to your website in seconds with a simple script. No complex setup required.",
    },
    {
        icon: Wallet,
        title: "Cost-Friendly Pricing",
        desc: "Affordable plans designed for startups and growing teams without compromising on powerful features.",
    },
    {
        icon: Layers,
        title: "Multiple Chatbots",
        desc: "Create and manage multiple chatbots for different products, teams, or use cases from one dashboard.",
    },
];



const Features = () => {
    return (
        <section id="features" className="py-32 px-6 max-w-6xl mx-auto">

            {/* Header */}
            <div className="mb-20">
                <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-6">
                    Designed for modern support teams
                </h2>
                <p className="text-xl text-zinc-500 font-light max-w-xl leading-relaxed">
                    Empower your business with AI-driven customer support that is fast,
                    scalable, and always available.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent hover:border-white/10 transition-all"
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-2xl bg-[#0A0A0E] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Icon className="w-6 h-6 text-zinc-300" />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-medium text-white mb-3">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-zinc-400 font-light leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    );
                })}
            </div>

        </section>
    );
};

export default Features;