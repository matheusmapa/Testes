import React, { useState, useEffect } from 'react';
import { Mail, Lock, Map, AlertCircle, User, LifeBuoy } from 'lucide-react';
import { auth, googleProvider, db } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup,
  getAdditionalUserInfo
} from "firebase/auth";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

export default function LoginPage({ globalError, supportLink }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('forceSignUp') === 'true') {
      setIsSignUp(true);
      sessionStorage.removeItem('forceSignUp');
    }
  }, []);

  useEffect(() => {
    if (globalError) setError(globalError);
  }, [globalError]);

  // Função para disparar o email via Firebase Trigger Email Extension (Design Turbinado)
  const sendWelcomeEmail = async (userEmail, userName) => {
      try {
          const linkPlataforma = window.location.origin; 
          const linkPlanos = `${window.location.origin}/planos.html`;

          const emailHtml = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);">
                
                <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 48px 20px; text-align: center; border-bottom: 4px solid #60a5fa;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                        Bem-vindo ao MedMapa! 🩺
                    </h1>
                    <p style="color: #e0f2fe; font-size: 18px; margin-top: 12px; margin-bottom: 0; font-weight: 500;">
                        Sua jornada rumo à aprovação começa aqui.
                    </p>
                </div>

                <div style="padding: 40px 32px; color: #334155;">
                    <p style="font-size: 18px; margin-top: 0; color: #0f172a;">Olá, <strong>${userName || 'Futuro(a) Doutor(a)'}</strong>! 👋</p>
                    
                    <p style="font-size: 16px; line-height: 1.6;">
                        Sua conta foi criada com sucesso! Você já está logado e pode dar aquela <strong>espiadinha</strong> por dentro da nossa plataforma para ver como a nossa tecnologia funciona.
                    </p>

                    <p style="font-size: 16px; line-height: 1.6;">
                        O <strong>MedMapa</strong> foi desenvolvido para otimizar seu tempo, focando exatamente naquilo que as bancas de residência mais cobram.
                    </p>

                    <div style="margin: 40px 0; background: linear-gradient(to right, #eff6ff, #ffffff); border: 2px solid #bfdbfe; border-radius: 16px; padding: 32px 24px; text-align: center; box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.1);">
                        <div style="display: inline-block; background-color: #dbeafe; color: #1e40af; font-size: 13px; font-weight: bold; padding: 6px 16px; border-radius: 20px; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px;">
                            Desbloqueie seu Potencial
                        </div>
                        <h3 style="color: #1e3a8a; margin-top: 0; margin-bottom: 16px; font-size: 24px; font-weight: 800;">
                            Pronto para acelerar sua aprovação? 🚀
                        </h3>
                        <p style="font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
                            Quem quer ser aprovado de verdade não tem tempo a perder. Tenha acesso a <strong>simulados ilimitados</strong>, estatísticas avançadas e <strong>todas as áreas liberadas</strong> com o nosso acesso completo.
                        </p>
                        <a href="${linkPlanos}" style="background: linear-gradient(to bottom, #2563eb, #1d4ed8); color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.4); border: 1px solid #1e40af;">
                            ⭐ Ver Planos de Acesso
                        </a>
                    </div>

                    <div style="text-align: center; margin-top: 32px;">
                        <p style="font-size: 14px; color: #64748b; margin-bottom: 12px;">Quer apenas continuar explorando a plataforma?</p>
                        <a href="${linkPlataforma}" style="background-color: #f1f5f9; color: #475569; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block; border: 1px solid #cbd5e1;">
                            Dar uma espiadinha no Painel
                        </a>
                    </div>
                </div>

                <div style="background-color: #f8fafc; padding: 32px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
                        Você está recebendo este email porque se cadastrou no MedMapa.
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
                        Precisa de ajuda? Basta responder a esta mensagem ou falar com nosso suporte.
                    </p>
                </div>
            </div>
          `;

          await addDoc(collection(db, "mail"), {
              to: userEmail,
              message: {
                  subject: "🚀 Bem-vindo(a) ao MedMapa! Sua aprovação começa aqui.",
                  html: emailHtml
              }
          });
      } catch (err) {
          console.error("Erro ao enfileirar email de boas vindas:", err);
      }
  };

  const handleGoogleLogin = async () => {
      setIsLoading(true);
      setError('');
      try {
          const result = await signInWithPopup(auth, googleProvider);
          const additionalInfo = getAdditionalUserInfo(result);

          if (additionalInfo.isNewUser) {
              const userRef = doc(db, "users", result.user.uid);
              const displayName = result.user.displayName || 'Novo Usuário';
              const pendingPlan = sessionStorage.getItem('pendingCheckoutPlan');
              
            // --- CÁLCULO DO HORÁRIO ESTRATÉGICO PARA O 1º E-MAIL ---
            const now = new Date();
            const currentHour = now.getHours(); // Pega a hora local do aluno
            let targetTime = new Date(now.getTime());

            // Se for de madrugada (entre 22h e 07h), agenda para as 09h da manhã!
            if (currentHour >= 22 || currentHour < 7) {
                if (currentHour >= 22) {
                    targetTime.setDate(targetTime.getDate() + 1); // Joga para o dia seguinte
                }
                targetTime.setHours(9, 0, 0, 0); // Define cravado para as 09:00
            } else {
                // Horário comercial: manda em exata 1 hora
                targetTime.setHours(targetTime.getHours() + 1);
            }
            const momentoPrimeiroEmail = targetTime.getTime();

            // Salva no banco de dados
            await setDoc(userRef, {
                name: name, // (ou displayName, dependendo se é Google ou Email)
                email: email, // (ou result.user.email)
                role: 'student',
                createdAt: new Date().toISOString(),
                source: pendingPlan ? 'landing_page' : 'organico',
                welcomeEmailSent: !pendingPlan,
                funnelStatus: 'active',
                nextFunnelEmailAt: momentoPrimeiroEmail // <--- USA A VARIÁVEL AQUI
            });

            await setDoc(userRef, {
                name: name,
                email: email,
                role: 'student',
                createdAt: new Date().toISOString(),
                source: pendingPlan ? 'landing_page' : 'organico',
                welcomeEmailSent: !pendingPlan,
                funnelStatus: 'active',
                nextFunnelEmailAt: umaHoraNoFuturo // <--- A MÁGICA COMEÇA AQUI
            });

              sessionStorage.setItem('justSignedUp', 'true');

              // Verifica se ele veio da LP. Se NÃO veio, manda o e-mail de Boas Vindas!
              if (!pendingPlan) {
                  await sendWelcomeEmail(result.user.email, displayName);
              }
          }
      } catch (err) {
          console.error(err);
          if (err.code === 'auth/account-exists-with-different-credential') {
              setError(`Este e-mail já está associado a outra conta. Tente entrar usando e-mail e senha.`);
          } else if (err.code === 'auth/popup-closed-by-user') {
              setError(''); 
          } else if (err.code === 'permission-denied') {
              setError("Erro de permissão no banco de dados. Contate o suporte.");
          } else {
              setError(`Erro ao autenticar com o Google. Tente novamente.`);
          }
          setIsLoading(false);
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (isSignUp) {
        if (email !== confirmEmail) { setError("Os e-mails não coincidem."); setIsLoading(false); return; }
        if (password !== confirmPassword) { setError("As senhas não coincidem."); setIsLoading(false); return; }
    }

    try {
        if (isSignUp) {
            sessionStorage.setItem('justSignedUp', 'true');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            
            const userRef = doc(db, "users", userCredential.user.uid);
            const pendingPlan = sessionStorage.getItem('pendingCheckoutPlan');

            await setDoc(userRef, {
                name: name,
                email: email,
                role: 'student',
                createdAt: new Date().toISOString(),
                source: pendingPlan ? 'landing_page' : 'organico', // <--- MÁGICA PARA O BACKEND AQUI
                welcomeEmailSent: !pendingPlan
            });

            // Verifica se ele veio da LP. Se NÃO veio, manda o e-mail de Boas Vindas!
            if (!pendingPlan) {
                await sendWelcomeEmail(email, name);
            }

        } else {
            await signInWithEmailAndPassword(auth, email, password);
        }
    } catch (err) {
        console.error(err);
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
            setError("E-mail ou senha incorretos. (Dica: Se criou a conta com o Google, tente clicar no botão acima).");
        } else if (err.code === 'auth/email-already-in-use') {
            setError("Este e-mail já está registado. Se usou o Google antes, clique no botão 'Continuar com o Google' abaixo.");
        } else if (err.code === 'auth/weak-password') {
            setError("A senha deve ter pelo menos 6 caracteres.");
        } else if (err.code === 'permission-denied') {
            setError("Erro de permissão no banco de dados. Contate o suporte.");
        } else {
            setError("Erro ao autenticar. Verifique os seus dados e tente novamente.");
        }
        setIsLoading(false);
    }
  };

  const toggleMode = () => { setIsSignUp(!isSignUp); setError(''); setPassword(''); setConfirmPassword(''); };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-sans text-slate-800">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row min-h-[600px] mb-6">
        
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 to-blue-900 p-12 flex-col justify-between text-white relative">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10"><div className="bg-white/10 p-2 rounded-lg backdrop-blur-md border border-white/20"><Map size={32} className="text-white" /></div><h1 className="text-3xl font-bold tracking-tight">MedMapa</h1></div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">A sua aprovação na residência começa aqui.</h2>
            <p className="text-blue-100 text-lg font-light leading-relaxed">Acesso exclusivo ao banco de questões mais inteligente do mercado!</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          <div className="mb-6"><h2 className="text-3xl font-bold text-slate-900 mb-2">{isSignUp ? 'Criar Conta' : 'Login'}</h2><p className="text-slate-500 text-base">{isSignUp ? 'Crie a sua conta para começar a estudar.' : 'Bem-vindo de volta! Faça o seu login.'}</p></div>
          
          {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r flex flex-col gap-2">
                  <div className="flex items-start gap-3"><AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} /><p className="text-sm text-red-700 font-medium leading-relaxed">{error}</p></div>
              </div>
          )}

          <div className="mb-6">
              <button type="button" onClick={handleGoogleLogin} disabled={isLoading} className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 15.02 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continuar com o Google
              </button>
          </div>

          <div className="flex items-center gap-4 mb-6"><div className="flex-1 h-px bg-gray-200"></div><span className="text-sm font-medium text-gray-400">Ou use o seu e-mail</span><div className="flex-1 h-px bg-gray-200"></div></div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (<div><label className="block text-sm font-semibold text-slate-700 mb-1">Nome Completo</label><div className="relative group"><User className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" /><input type="text" required={isSignUp} value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. João da Silva" className="pl-12 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800" /></div></div>)}
            <div><label className="block text-sm font-semibold text-slate-700 mb-1">E-mail</label><div className="relative group"><Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" /><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className="pl-12 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800" /></div></div>
            {isSignUp && (<div><label className="block text-sm font-semibold text-slate-700 mb-1">Confirmar E-mail</label><div className="relative group"><Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" /><input type="email" required={isSignUp} value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} placeholder="Confirme o seu e-mail" className="pl-12 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800" /></div></div>)}
            <div><label className="block text-sm font-semibold text-slate-700 mb-1">Senha</label><div className="relative group"><Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" /><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-12 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800" /></div></div>
            {isSignUp && (<div><label className="block text-sm font-semibold text-slate-700 mb-1">Confirmar Senha</label><div className="relative group"><Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" /><input type="password" required={isSignUp} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="pl-12 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800" /></div></div>)}
            <button type="submit" disabled={isLoading} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 mt-2 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">{isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <span>{isSignUp ? 'Criar Conta' : 'Entrar'}</span>}</button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600 text-sm">{isSignUp ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}<button onClick={toggleMode} className="ml-2 text-blue-700 font-bold hover:underline focus:outline-none">{isSignUp ? 'Faça Login' : 'Cadastre-se'}</button></p>
          </div>
        </div>
      </div>

      {supportLink && (
        <a href={supportLink.startsWith('http') ? supportLink : `https://${supportLink}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-700 transition-colors px-6 py-3 rounded-full bg-white shadow-md border border-gray-200 hover:border-blue-300">
            <LifeBuoy size={20} className="text-blue-600" /> Precisa de ajuda? Fale com o Suporte
        </a>
      )}
    </div>
  );
}
