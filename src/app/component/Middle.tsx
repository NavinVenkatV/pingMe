import { motion } from "framer-motion";
import Image from "next/image";

export const Middle = () => {
    return (
        <div className="text-white p-6 md:p-10">
            <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}   
            className="text-3xl md:text-5xl text-center">
                <span className="text-blue-500">pingMe</span> to Monitor your Business!
            </motion.div>
            <div className="relative flex flex-col md:flex-row items-center justify-center mt-10 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full sm:w-[400px] md:w-[500px] h-[300px] md:h-[500px] flex items-center justify-center rounded-xl overflow-hidden"
                >
                    <Image 
                        width={500}
                        height={500}
                        src="/slide/s1.png"
                        alt="Website monitoring dashboard"
                        className="w-full h-full object-contain p-3"
                        priority
                        quality={90}
                    />
                </motion.div>

                <div className="w-full sm:w-[300px] h-auto md:h-[500px] flex flex-col text-slate-400  items-center justify-center p-4 md:p-6 rounded-xl ">
                    <div className="text-sm md:text-lg leading-6">
                        <p>🔹 <b>Real-time Website Monitoring</b> &ndash; Get instant alerts when your site is down.</p>
                        <p>🔹 <b>24/7 Uptime Tracking</b> &ndash; Stay ahead of issues before they affect users.</p>
                        <p>🔹 <b>Performance Insights</b> &ndash; Track response times & optimize your site.</p>
                        <p>🔹 <b>Automated Health Checks</b> &ndash; Ensure seamless customer experiences.</p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full sm:w-[400px] md:w-[500px] h-[300px] md:h-[500px] flex items-center justify-center rounded-xl overflow-hidden"
                >
                    <Image 
                        width={500}
                        height={500}
                        src="/slide/s2.jpg"
                        alt="Performance analytics visualization"
                        className="w-full h-full object-contain"
                        priority
                        quality={90}
                    />
                </motion.div>
            </div>
        </div>
    );
};


export const Middle2 = () => {
    return (
        <div className="text-white p-6 md:p-10 mt-10">
            <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}      
            className="text-3xl md:text-5xl text-center">
                Ship <span className="text-blue-500">Higher-Quality</span> Software Faster
            </motion.div>
            <div className="relative flex flex-col md:flex-row items-center justify-center mt-10 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full sm:w-[400px] md:w-[500px] h-[300px] md:h-[500px] flex items-center justify-center rounded-xl overflow-hidden"
                >
                    <Image 
                        width={500}
                        height={500}
                        src="/slide/s1.png"
                        alt="Website monitoring dashboard"
                        className="w-full h-full object-contain p-3"
                        priority
                        quality={90}
                    />
                </motion.div>

                <div className="w-full sm:w-[300px] h-auto md:h-[500px] flex flex-col text-slate-400  items-center justify-center p-4 md:p-6 rounded-xl ">
                    <div className="text-sm md:text-lg leading-6">
                        <p>🔹 <b>Instant Website Monitoring</b> &ndash; Receive alerts the moment your site goes down.</p>
                        <p>🔹 <b>Round-the-Clock Uptime Tracking</b> &ndash; Detect and fix issues before they impact users.</p>
                        <p>🔹 <b>Performance Analytics</b> &ndash; Measure load times and enhance efficiency.</p>
                        <p>🔹 <b>Automated Site Audits</b> &ndash; Keep your website running smoothly without manual checks.</p>

                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full sm:w-[400px] md:w-[500px] h-[300px] md:h-[500px] flex items-center justify-center rounded-xl overflow-hidden"
                >
                    <Image 
                        width={500}
                        height={500}
                        src="/slide/s2.jpg"
                        alt="Performance analytics visualization"
                        className="w-full h-full object-contain"
                        priority
                        quality={90}
                    />
                </motion.div>
            </div>
        </div>
    );
};
