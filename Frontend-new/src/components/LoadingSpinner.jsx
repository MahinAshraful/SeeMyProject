



import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className='relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-sky-900'>
			{/* Simple Loading Spinner */}
			<motion.div
				className='w-16 h-16 border-4 border-t-4 border-blue-200 rounded-full border-t-blue-500'
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	);
};

export default LoadingSpinner;
