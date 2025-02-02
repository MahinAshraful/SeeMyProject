import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { isLoading, forgotPassword } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full bg-black neon-border pixel-corners'
            >
                <div className='p-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center text-yellow-400'>
                        FORGOT PASSWORD
                    </h2>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <p className='text-yellow-400 mb-6 text-center font-pixel'>
                                Enter your email address and we'll send you a reset link
                            </p>
                            <Input
                                icon={Mail}
                                type='email'
                                placeholder='Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='text-yellow-400 border-2 border-yellow-400 focus:border-pink-400'
                                required
                            />

                            <div className='flex flex-col gap-4 mt-6'>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className='w-full py-3 px-4 bg-yellow-400 text-black font-bold pixel-corners arcade-btn hover:bg-pink-400 transition-colors'
                                    type='submit'
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "SEND RESET LINK"}
                                </motion.button>

                                <Link to='/login'>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className='w-full py-3 px-4 bg-transparent text-yellow-400 border-2 border-yellow-400 font-bold pixel-corners arcade-btn hover:text-pink-400 hover:border-pink-400 transition-colors flex items-center justify-center gap-2'
                                    >
                                        <ArrowLeft size={16} /> BACK TO LOGIN
                                    </motion.button>
                                </Link>
                            </div>
                        </form>
                    ) : (
                        <div className='text-center'>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className='w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4'
                            >
                                <Mail className='h-8 w-8 text-black' />
                            </motion.div>
                            <p className='text-yellow-400 mb-6'>
                                If an account exists for {email}, you will receive a password reset link shortly.
                            </p>
                            <Link to='/login'>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className='w-full py-3 px-4 bg-yellow-400 text-black font-bold pixel-corners arcade-btn hover:bg-pink-400 transition-colors flex items-center justify-center gap-2'
                                >
                                    <ArrowLeft size={16} /> BACK TO LOGIN
                                </motion.button>
                            </Link>
                        </div>
                    )}
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
        </div>
    );
};

export default ForgotPasswordPage;
