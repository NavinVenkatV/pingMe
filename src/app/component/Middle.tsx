import { motion } from "framer-motion";

export const Middle = () => {
    return (
        <div className="text-white p-6 md:p-10">
            <div className="text-3xl md:text-5xl text-center">
                <span className="text-blue-500">pingMe</span> to Monitor your Business!
            </div>
            <div className="relative flex flex-col md:flex-row items-center justify-center mt-10 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full sm:w-[400px] md:w-[500px] h-[300px] md:h-[500px] flex items-center justify-center rounded-xl"
                >
                    <img src="slide/s1.png" alt="image1" className="w-full h-full object-cover rounded-xl" />
                </motion.div>

                <div className="w-full sm:w-[300px] h-auto md:h-[500px] flex flex-col text-slate-400  items-center justify-center p-4 md:p-6 rounded-xl ">
                    <div className="text-sm md:text-lg leading-6">
                        <p>🔹 <b>Real-time Website Monitoring</b> – Get instant alerts when your site is down.</p>
                        <p>🔹 <b>24/7 Uptime Tracking</b> – Stay ahead of issues before they affect users.</p>
                        <p>🔹 <b>Performance Insights</b> – Track response times & optimize your site.</p>
                        <p>🔹 <b>Automated Health Checks</b> – Ensure seamless customer experiences.</p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full sm:w-[400px] md:w-[500px] h-[300px] md:h-[500px] flex items-center justify-center rounded-xl"
                >
                    <img src="slide/s2.jpg" alt="image2" className="w-full h-full object-cover rounded-xl" />
                </motion.div>
            </div>
        </div>
    );
};


export const Middle2 = () => {
    return (
        <div className="text-white p-6 md:p-10">
            <div className="text-3xl md:text-5xl text-center">
                Ship <span className="text-blue-500">Higher-Quality</span> Software Faster
            </div>
            <div className="relative flex flex-col md:flex-row items-center justify-center mt-10 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full sm:w-[400px] md:w-[500px] h-[300px] md:h-[500px] flex items-center justify-center rounded-xl"
                >
                    <img src="slide/s1.png" alt="image1" className="w-full h-full object-cover rounded-xl" />
                </motion.div>

                <div className="w-full sm:w-[300px] h-auto md:h-[500px] flex flex-col text-slate-400  items-center justify-center p-4 md:p-6 rounded-xl ">
                    <div className="text-sm md:text-lg leading-6">
                        <p>🔹 <b>Instant Website Monitoring</b> – Receive alerts the moment your site goes down.</p>
                        <p>🔹 <b>Round-the-Clock Uptime Tracking</b> – Detect and fix issues before they impact users.</p>
                        <p>🔹 <b>Performance Analytics</b> – Measure load times and enhance efficiency.</p>
                        <p>🔹 <b>Automated Site Audits</b> – Keep your website running smoothly without manual checks.</p>

                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full sm:w-[400px] md:w-[500px] h-[300px] md:h-[500px] flex items-center justify-center rounded-xl"
                >
                    <img src="slide/s2.jpg" alt="image2" className="w-full h-full object-cover rounded-xl" />
                </motion.div>
            </div>
        </div>
    );
};
