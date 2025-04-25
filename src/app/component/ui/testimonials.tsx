import React from 'react'
import { motion } from 'framer-motion'

interface typo {
    title : string,
    description : string
}

function Testimonials({title, description} : typo) {
  return (
    <motion.div
    initial={{x:40}}
    animate={{x:0}}
    transition={{duration:0.5, ease:"easeInOut" }}
     className='text-white w-[500px] cursor-pointer h-[150px] hover:scale-150 shadow-lg shadow-blue-500 rounded-xl my-10 px-3 py-2'>
        <div className='text-slate-400'>
            {title}
        </div> 
        <div className='pt-3'>
            {description}
        </div>
    </motion.div>
  )
}

export default Testimonials
