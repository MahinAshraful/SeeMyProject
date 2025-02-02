import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="min-h-screen w-full flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full bg-black neon-border pixel-corners'
			>
				<div className='p-8'>
					<h2 className='text-3xl font-bold mb-6 text-center text-yellow-400'>
						CREATE ACCOUNT
					</h2>

					<form onSubmit={handleSignUp}>
						<Input
							icon={User}
							type='text'
							placeholder='Full Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='text-yellow-400 border-2 border-yellow-400 focus:border-pink-400'
						/>

						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='text-yellow-400 border-2 border-yellow-400 focus:border-cyan-400'
						/>

						<Input
							icon={Lock}
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='text-yellow-400 border-2 border-yellow-400 focus:border-orange-400'
						/>

						<div className="mb-6">
							<PasswordStrengthMeter password={password} />
						</div>

						{error && <p className='text-red-500 font-semibold mb-4'>{error}</p>}

						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='w-full py-3 px-4 bg-yellow-400 text-black font-bold pixel-corners arcade-btn hover:bg-pink-400 transition-colors mt-4'
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "SIGN UP"}
						</motion.button>
					</form>
				</div>
				<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
					<p className='text-sm text-gray-400'>
						Already have an account?{" "}
						<Link to='/login' className='text-yellow-400 hover:text-pink-400 transition-colors'>
							Login
						</Link>
					</p>
				</div>
				<style jsx global>{`
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
		</div>
	);
};
export default SignUpPage;
