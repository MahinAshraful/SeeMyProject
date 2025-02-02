import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";

import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Landing from "./pages/landing";
import Navbar from "./components/Navbar";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    if (!user.isVerified) {
        return <Navigate to='/verify-email' replace />;
    }

    return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user?.isVerified) {
        return <Navigate to='/project' replace />;
    }

    return children;
};

const ProtectedProjectRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    return children;
};



function App() {
    const { isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) return <LoadingSpinner />;

    return (
        <div className="relative min-h-screen overflow-hidden bg-black">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
                
                body {
                    font-family: 'Press Start 2P', cursive;
                    background: #000;
                    
                }
                .neon-border {
                    box-shadow: 0 0 10px #FFFF00, 0 0 20px #FFFF00, 0 0 30px #FFFF00;
                    animation: neon 1.5s ease-in-out infinite alternate;
                }
                @keyframes neon {
                    from { box-shadow: 0 0 10px #FFFF00, 0 0 20px #FFFF00, 0 0 30px #FFFF00; }
                    to { box-shadow: 0 0 5px #FFFF00, 0 0 10px #FFFF00, 0 0 15px #FFFF00; }
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
                .pac-dot {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #FFFF00;
                    border-radius: 50%;
                    z-index: 0;
                    animation: blink 0.5s ease-in-out infinite alternate;
                }
                @keyframes blink {
                    from { opacity: 1; }
                    to { opacity: 0.5; }
                }
                @keyframes float {
                    0% {
                        transform: translateY(0) translateX(0);
                    }
                    50% {
                        transform: translateY(-20px) translateX(20px);
                    }
                    100% {
                        transform: translateY(0) translateX(0);
                    }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>

            <div className="absolute inset-0">
                <FloatingShape color='bg-red-500/40' size='w-64 h-64' top='15%' left='15%' delay={0} />
                <FloatingShape color='bg-pink-500/40' size='w-48 h-48' top='50%' left='60%' delay={2} />
                <FloatingShape color='bg-blue-500/40' size='w-32 h-32' top='30%' left='40%' delay={4} />
            </div>

            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="pac-dot"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                <Navbar/>
                <Routes>
                    <Route
                        path='/'
                        element={<Landing />}
                    />
                    <Route
                        path='/signup'
                        element={
                            <RedirectAuthenticatedUser>
                                <SignUpPage />
                            </RedirectAuthenticatedUser>
                        }
                    />
                    <Route
                        path='/login'
                        element={
                            <RedirectAuthenticatedUser>
                                <div className="flex items-center justify-center h-screen">
                                <LoginPage />
                                </div>
                            </RedirectAuthenticatedUser>
                        }
                    />
                    <Route path='/verify-email' element={<EmailVerificationPage />} />
                    <Route
                        path='/forgot-password'
                        element={
                            <RedirectAuthenticatedUser>
                                <ForgotPasswordPage />
                            </RedirectAuthenticatedUser>
                        }
                    />

                    
                    <Route
                        path='/dashboard'
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />

					<Route
						path='/home'
						element={
							<ProtectedProjectRoute>
							<Home />
							</ProtectedProjectRoute>
						}
						/>

                    <Route
                        path='/reset-password/:token'
                        element={
                            <RedirectAuthenticatedUser>
                                <ResetPasswordPage />
                            </RedirectAuthenticatedUser>
                        }
                    />
                    <Route
					path='/project'
					element={
						<ProtectedProjectRoute>
							<Project />
						</ProtectedProjectRoute>
					}
				/>

                    {/* catch all routes */}
                    <Route path='*' element={<Navigate to='/' replace />} />


                </Routes>
                <Toaster 
                    toastOptions={{
                        style: {
                            background: '#000',
                            color: '#FFFF00',
                            border: '2px solid #FFFF00',
                            fontFamily: '"Press Start 2P", cursive',
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default App;
