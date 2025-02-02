import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-black neon-border pixel-corners'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center text-yellow-400'>
					WELCOME BACK
				</h2>

				<form onSubmit={handleLogin}>
					<Input
						icon={Mail}
						type='email'
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='text-yellow-400 border-2 border-yellow-400 focus:border-pink-400'
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='text-yellow-400 border-2 border-yellow-400 focus:border-pink-400'
					/>

					<div className='flex items-center mb-6'>
						<Link to='/forgot-password' className='text-sm text-yellow-400 hover:text-pink-400 transition-colors'>
							Forgot password?
						</Link>
					</div>
					{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 bg-yellow-400 text-black font-bold pixel-corners arcade-btn hover:bg-pink-400 transition-colors'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "LOGIN"}
					</motion.button>
				</form>
			</div>
			<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-yellow-400 hover:text-pink-400 transition-colors'>
						Sign up
					</Link>
				</p>
			</div>
			<style jsx global>{`
				@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

				body {
					font-family: 'Press Start 2P', cursive;
					background: #000;
					overflow: hidden;
				}
				.pixel-corners {
					clip-path: polygon(
						0 10px, 10px 10px, 10px 0,
						calc(100% - 10px) 0, calc(100% - 10px) 10px,
						100% 10px, 100% calc(100% - 10px),
						calc(100% - 10px) calc(100% - 10px),
						calc(100% - 10px) 100%, 10px 100%,
						10px calc(100% - 10px), 0 calc(100% - 10px)
					);
				}
				.arcade-btn {
					position: relative;
					transform: scale(1);
					transition: transform 0.2s;
					box-shadow: 0 6px 0 #000;
				}

				.arcade-btn:active {
					transform: scale(0.95) translateY(4px);
					box-shadow: 0 2px 0 #000;
				}
				.neon-border {
					animation: rainbow-neon 4s linear infinite;
				}
				@keyframes rainbow-neon {
					0% { box-shadow: 0 0 10px #FF0000, 0 0 20px #FF0000, 0 0 30px #FF0000; }
					25% { box-shadow: 0 0 10px #FFB8FF, 0 0 20px #FFB8FF, 0 0 30px #FFB8FF; }
					50% { box-shadow: 0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF; }
					75% { box-shadow: 0 0 10px #FFB851, 0 0 20px #FFB851, 0 0 30px #FFB851; }
					100% { box-shadow: 0 0 10px #FF0000, 0 0 20px #FF0000, 0 0 30px #FF0000; }
				}
			`}</style>
		</motion.div>
	);
};
export default LoginPage;
