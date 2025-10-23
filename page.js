import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, BrainCircuit } from 'lucide-react';

export default function App() {
  const [pageMode, setPageMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notificationSent, setNotificationSent] = useState(false);

  const InputField = ({ id, type, placeholder, value, onChange, icon: Icon }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input id={id} name={id} type={type} required className="w-full pl-10 pr-4 py-3 bg-neutral-800/70 border border-neutral-700/80 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 ease-in-out" placeholder={placeholder} value={value} onChange={onChange} disabled={loading}/>
    </div>
  );

  const clearState = () => {
    setUsername(''); setEmail(''); setPassword(''); setConfirmPassword(''); setError(null); setLoading(false); setNotificationSent(false);
  };

  const handleLogin = async(e)=>{e.preventDefault();setLoading(true);setError(null);setTimeout(()=>setLoading(false),1000);};
  const handleSignUp = async(e)=>{e.preventDefault();if(password!==confirmPassword){setError("Passwords do not match. Please try again.");return;}setLoading(true);setError(null);setTimeout(()=>setLoading(false),1000);};
  const handleForgotPassword = async(e)=>{e.preventDefault();setLoading(true);setError(null);setNotificationSent(false);setTimeout(()=>{setLoading(false);setNotificationSent(true);},1000);};

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 font-sans relative overflow-hidden bg-neutral-900">
      <style>{`
        @keyframes fadeIn {from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
        @keyframes subtlePulse {0%,100%{filter:drop-shadow(0 0 4px rgba(52,211,153,0.3));}50%{filter:drop-shadow(0 0 8px rgba(52,211,153,0.7));}}
        @keyframes shake {0%,100%{transform:translateX(0);}10%,30%,50%,70%,90%{transform:translateX(-5px);}20%,40%,60%,80%{transform:translateX(5px);}}
      `}</style>

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-900 via-black to-neutral-900"></div>

      <div className="relative z-10 max-w-md w-full backdrop-blur-lg rounded-2xl shadow-xl shadow-green-500/10 p-8 border border-neutral-800">
        <div className="text-center mb-8" style={{ animation: 'fadeIn 0.5s ease-out' }}>
          <BrainCircuit className="h-10 w-10 text-green-400 mx-auto mb-4" style={{ animation: 'subtlePulse 2.5s ease-in-out infinite' }} />
          <h1 className="text-4xl font-extrabold text-green-400 tracking-wider uppercase mb-2">MONOSID</h1>
          <p className="text-gray-400">
            {pageMode==='login'&&'Welcome back. Access your account.'}
            {pageMode==='signup'&&'Create your new account.'}
            {pageMode==='forgot'&&'Reset your password.'}
          </p>
        </div>

        <div key={pageMode} style={{ animation: 'fadeIn 0.5s ease-out' }}>
          {pageMode==='login'&&(
            <form onSubmit={handleLogin} className="space-y-6">
              <InputField id="email" type="email" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)} icon={Mail}/>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400"/></div>
                <input id="password" name="password" type={showPassword?'text':'password'} required className="w-full pl-10 pr-12 py-3 bg-neutral-800/70 border border-neutral-700/80 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 ease-in-out" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading}/>
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-400" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<EyeOff className="h-5 w-5"/>:<Eye className="h-5 w-5"/>}</button>
              </div>

              <div className="text-right -mt-2">
                <button type="button" className="text-sm font-medium text-green-500 hover:text-green-400 hover:underline focus:outline-none" onClick={()=>{setPageMode('forgot');clearState();}}>Forgot Password?</button>
              </div>

              {error&&<div key={error} className="text-red-400 bg-red-900/50 border border-red-500 p-3 rounded-lg text-center text-sm" style={{animation:'shake 0.5s ease-in-out'}}>{error}</div>}

              <button type="submit" disabled={loading} className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium ${loading?'bg-gray-600 cursor-not-allowed':'bg-green-500 text-neutral-900 font-bold hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-green-500 hover:shadow-lg hover:shadow-green-500/40'} transition-all duration-200 ease-in-out active:scale-[0.98]`}>
                {loading?<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>:'Log In'}
              </button>
            </form>
          )}

          {pageMode==='signup'&&(
            <form onSubmit={handleSignUp} className="space-y-6">
              <InputField id="username" type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} icon={User}/>
              <InputField id="email" type="email" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)} icon={Mail}/>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400"/></div>
                <input id="password" type={showPassword?'text':'password'} required className="w-full pl-10 pr-12 py-3 bg-neutral-800/70 border border-neutral-700/80 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 ease-in-out" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading}/>
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-400" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<EyeOff className="h-5 w-5"/>:<Eye className="h-5 w-5"/>}</button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400"/></div>
                <input id="confirmPassword" type={showConfirmPassword?'text':'password'} required className="w-full pl-10 pr-12 py-3 bg-neutral-800/70 border border-neutral-700/80 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 ease-in-out" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} disabled={loading}/>
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-400" onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword?<EyeOff className="h-5 w-5"/>:<Eye className="h-5 w-5"/>}</button>
              </div>

              {error&&<div key={error} className="text-red-400 bg-red-900/50 border border-red-500 p-3 rounded-lg text-center text-sm" style={{animation:'shake 0.5s ease-in-out'}}>{error}</div>}

              <button type="submit" disabled={loading} className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium ${loading?'bg-gray-600 cursor-not-allowed':'bg-green-500 text-neutral-900 font-bold hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-green-500 hover:shadow-lg hover:shadow-green-500/40'} transition-all duration-200 ease-in-out active:scale-[0.98]`}>
                {loading?<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>:'Create Account'}
              </button>
            </form>
          )}

          {pageMode==='forgot'&&(
            <>
              {notificationSent?(
                <div className="text-center">
                  <Mail className="h-10 w-10 text-green-400 mx-auto mb-4"/>
                  <h3 className="text-lg font-medium text-white">Notification Sent</h3>
                  <p className="text-gray-400 mt-2">If an account exists for {email}, you will receive a notification with instructions.</p>
                </div>
              ):(
                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <InputField id="email" type="email" placeholder="Email or Username" value={email} onChange={(e)=>setEmail(e.target.value)} icon={Mail}/>
                  {error&&<div key={error} className="text-red-400 bg-red-900/50 border border-red-500 p-3 rounded-lg text-center text-sm" style={{animation:'shake 0.5s ease-in-out'}}>{error}</div>}
                  <button type="submit" disabled={loading} className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium ${loading?'bg-gray-600 cursor-not-allowed':'bg-green-500 text-neutral-900 font-bold hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-green-500 hover:shadow-lg hover:shadow-green-500/40'} transition-all duration-200 ease-in-out active:scale-[0.98]`}>
                    {loading?<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>:'Get Notification'}
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            {pageMode==='login'&&"Don't have an account?"}
            {pageMode==='signup'&&"Already have an account?"}
            {pageMode==='forgot'&&"Remember your password?"}
            <button onClick={()=>{if(pageMode==='login'){setPageMode('signup');}else{setPageMode('login');}clearState();}} className="ml-2 font-medium text-green-500 hover:text-green-400 hover:underline focus:outline-none" disabled={loading}>
              {pageMode==='login'?'Sign Up':'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
