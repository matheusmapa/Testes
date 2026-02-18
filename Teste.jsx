import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Stethoscope, Scissors, Baby, HeartPulse, Activity, BarChart2, 
  CheckCircle, Clock, ArrowRight, ArrowLeft, Play, Filter, CheckSquare, 
  Square, Edit2, Check, RotateCcw, Home, List, Plus, 
  ChevronDown, ChevronUp, Eye, Shield, Users, Calendar, Map, AlertTriangle, 
  AlertCircle, Trash2, XCircle, User, CreditCard, Smartphone, Key, Database, ExternalLink,
  RefreshCw, Loader2 
} from 'lucide-react';

import { db, auth } from './firebase'; 
import QuestionView from './QuestionView'; 
import ReportModal from './components/ReportModal'; 
import PerformanceView from './PerformanceView';
import { GeneralExamSetupView, TopicSelectionView } from './ExamSetup';
import LoginPage from './LoginPage';
import HomeView, { AreaHubView } from './HomeView';
import { Sidebar, MobileHeader, MobileMenu } from './components/Layout';
import { ToastContainer, ExitConfirmationModal, NotificationModal, GoalModal, ChangePasswordModal, CopyButton } from './components/Modals';
import FlashcardsView from './FlashcardsView'; // <--- ADICIONE ISSO

import { 
  collection, getDocs, doc, setDoc, addDoc, getDoc, onSnapshot, query, writeBatch, deleteDoc 
} from "firebase/firestore";
import { 
  signOut, onAuthStateChanged, updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider 
} from "firebase/auth";

// --- DADOS ESTÁTICOS DAS ÁREAS ---
const areasBase = [
  { id: 'cirurgia', title: 'Cirurgia Geral', icon: Scissors, color: 'bg-emerald-50 text-emerald-600', borderColor: 'hover:border-emerald-200' },
  { id: 'clinica', title: 'Clínica Médica', icon: Stethoscope, color: 'bg-blue-50 text-blue-600', borderColor: 'hover:border-blue-200' },
  { id: 'go', title: 'Ginecologia e Obstetrícia', icon: HeartPulse, color: 'bg-rose-50 text-rose-600', borderColor: 'hover:border-rose-200' },
  { id: 'pediatria', title: 'Pediatria', icon: Baby, color: 'bg-amber-50 text-amber-600', borderColor: 'hover:border-amber-200' },
  { id: 'preventiva', title: 'Preventiva', icon: Shield, color: 'bg-violet-50 text-violet-600', borderColor: 'hover:border-violet-200' },
];

const themesMap = {
    'clinica': ['Cardiologia', 'Dermatologia', 'Endocrinologia e Metabologia', 'Gastroenterologia', 'Hematologia', 'Hepatologia', 'Infectologia', 'Nefrologia', 'Neurologia', 'Pneumologia', 'Psiquiatria', 'Reumatologia'],
    'cirurgia': ['Abdome Agudo', 'Cirurgia Hepatobiliopancreática', 'Cirurgia Torácica e de Cabeça e Pescoço', 'Cirurgia Vascular', 'Cirurgia do Esôfago e Estômago', 'Coloproctologia', 'Hérnias e Parede Abdominal', 'Pré e Pós-Operatório', 'Queimaduras', 'Resposta Metabólica e Cicatrização', 'Trauma', 'Urologia'],
    'go': ['Ciclo Menstrual e Anticoncepção', 'Climatério e Menopausa', 'Doenças Intercorrentes na Gestação', 'Infecções Congênitas e Gestacionais', 'Infecções Ginecológicas e ISTs', 'Mastologia', 'Obstetrícia Fisiológica e Pré-Natal', 'Oncologia Pélvica', 'Parto e Puerpério', 'Sangramentos da Gestação', 'Uroginecologia e Distopias', 'Vitalidade Fetal e Amniograma'],
    'pediatria': ['Adolescência e Puberdade', 'Afecções Respiratórias', 'Aleitamento Materno e Nutrição', 'Cardiologia e Reumatologia Pediátrica', 'Crescimento e Desenvolvimento', 'Emergências e Acidentes', 'Gastroenterologia Pediátrica', 'Imunizações', 'Infectopediatria e Exantemáticas', 'Nefrologia Pediátrica', 'Neonatologia: Patologias', 'Neonatologia: Sala de Parto'],
    'preventiva': ['Atenção Primária e Saúde da Família', 'Estudos Epidemiológicos', 'Financiamento e Gestão', 'História e Princípios do SUS', 'Indicadores de Saúde e Demografia', 'Medicina Baseada em Evidências', 'Medicina Legal', 'Medidas de Associação e Testes Diagnósticos', 'Políticas Nacionais de Saúde', 'Saúde do Trabalhador', 'Vigilância em Saúde', 'Ética Médica e Bioética']
};

const areaNameMap = {
    'clinica': 'Clínica Médica',
    'cirurgia': 'Cirurgia Geral',
    'go': 'Ginecologia e Obstetrícia',
    'pediatria': 'Pediatria',
    'preventiva': 'Preventiva'
};

// --- HELPERS GLOBAIS ---
const getAvailableQuestionCount = (questionIndex, areaTitle, topic = null, excludedIds = new Set()) => {
  let filtered = questionIndex.filter(q => q.area === areaTitle);
  if (topic) filtered = filtered.filter(q => q.topic === topic);
  return filtered.filter(q => !excludedIds.has(q.id)).length;
};

const getRealQuestionCount = (questionIndex, areaTitle, topic = null) => {
  let filtered = questionIndex.filter(q => q.area === areaTitle);
  if (topic) filtered = filtered.filter(q => q.topic === topic);
  return filtered.length;
};

const getThemesForArea = (areaId, excludedIds = new Set(), questionIndex) => {
  const list = themesMap[areaId] || [];
  const areaName = areaNameMap[areaId];
  return list.map((theme, index) => ({
    id: index + 1,
    name: theme,
    count: getAvailableQuestionCount(questionIndex, areaName, theme, excludedIds),
    total: getRealQuestionCount(questionIndex, areaName, theme)
  }));
};

const calculateDetailedStats = (simulations, questionIndex) => {
  const stats = { totalQuestions: 0, totalCorrect: 0, byArea: {} };
  areasBase.forEach(area => { stats.byArea[area.title] = { total: 0, correct: 0 }; });
  stats.byArea['Geral'] = { total: 0, correct: 0 }; 

  simulations.forEach(sim => {
    if (sim.status === 'finished' && sim.answersData) {
      const questionIds = sim.questionIds || [];
      questionIds.forEach((qId, idx) => {
        const qIndex = questionIndex.find(q => q.id === qId);
        if (qIndex) {
            const userAnswer = sim.answersData[idx];
            if (userAnswer) {
              const isCorrect = userAnswer === qIndex.correctOptionId;
              stats.totalQuestions++;
              if (isCorrect) stats.totalCorrect++;
              const areaKey = qIndex.area || 'Geral';
              if (!stats.byArea[areaKey]) stats.byArea[areaKey] = { total: 0, correct: 0 };
              stats.byArea[areaKey].total++;
              if (isCorrect) stats.byArea[areaKey].correct++;
            }
        }
      });
    }
  });
  return stats;
};

const getCorrectlyAnsweredIds = (simulations, questionIndex) => {
  const ids = new Set();
  simulations.forEach(sim => {
    if (sim.status === 'finished' && sim.answersData) {
      const questionIds = sim.questionIds || [];
      questionIds.forEach((qId, idx) => {
        const qIndex = questionIndex.find(q => q.id === qId);
        if (qIndex && sim.answersData[idx] === qIndex.correctOptionId) {
          ids.add(qId);
        }
      });
    }
  });
  return ids;
};

const calculateTopicPerformance = (simulations, areaTitle, questionIndex) => {
  const topicStats = {};
  simulations.forEach(sim => {
    if (sim.status === 'finished' && sim.answersData) {
      const questionIds = sim.questionIds || [];
      questionIds.forEach((qId, idx) => {
        const q = questionIndex.find(qi => qi.id === qId);
        if (q && q.area === areaTitle) {
           const topic = q.topic;
           const userAnswer = sim.answersData[idx];
           const isCorrect = userAnswer === q.correctOptionId;
           if (!topicStats[topic]) topicStats[topic] = { total: 0, correct: 0 };
           if (userAnswer) {
             topicStats[topic].total++;
             if (isCorrect) topicStats[topic].correct++;
           }
        }
      });
    }
  });
  const topicsArray = Object.keys(topicStats).map(topic => {
    const { total, correct } = topicStats[topic];
    return { name: topic, total, correct, percentage: total === 0 ? 0 : Math.round((correct / total) * 100) };
  });
  const activeTopics = topicsArray.filter(t => t.total > 0);
  activeTopics.sort((a, b) => a.percentage - b.percentage || b.total - a.total);
  return activeTopics.slice(0, 3); 
};

const checkIsYesterday = (lastDateStr) => {
    if (!lastDateStr) return false;
    const parts = lastDateStr.split('/');
    if (parts.length !== 3) return false;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const lastDate = new Date(year, month, day);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return lastDate.getDate() === yesterday.getDate() && lastDate.getMonth() === yesterday.getMonth() && lastDate.getFullYear() === yesterday.getFullYear();
};

// --- APP COMPONENT ---
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [globalLoginError, setGlobalLoginError] = useState('');
  const [renewalLink, setRenewalLink] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
        try {
            const configDoc = await getDoc(doc(db, "config", "general"));
            if (configDoc.exists() && configDoc.data().renewalLink) {
                setRenewalLink(configDoc.data().renewalLink);
            }
        } catch (error) {
            console.error("Erro ao carregar configurações:", error);
        }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    let unsubscribeDoc = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeDoc(); 

      if (user) {
        const docRef = doc(db, "users", user.uid);
        
        unsubscribeDoc = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                if (userData.role !== 'admin') {
                    const subDate = userData.subscriptionUntil ? new Date(userData.subscriptionUntil) : null;
                    const now = new Date();
                    if (!subDate || subDate < now) {
                        signOut(auth);
                        setGlobalLoginError("Sua matrícula venceu, contate um administrador para efetivar novamente.");
                        setCurrentUser(null);
                        setIsLoading(false);
                        return;
                    }
                }
                setGlobalLoginError(''); 
                setCurrentUser({ ...user, ...userData }); 
            } else {
                signOut(auth);
                setGlobalLoginError("Conta não encontrada. Contate o suporte.");
                setCurrentUser(null);
            }
            setIsLoading(false);
        }, (error) => {
            console.error("Erro ao buscar perfil:", error);
            setGlobalLoginError("Erro ao verificar conta.");
            setCurrentUser(null);
            setIsLoading(false);
        });
      } else {
        setCurrentUser(null);
        setIsLoading(false);
      }
    });

    return () => {
        unsubscribeAuth();
        unsubscribeDoc();
    };
  }, []);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return <>{currentUser ? <Dashboard user={currentUser} onLogout={() => signOut(auth)} /> : <LoginPage globalError={globalLoginError} renewalLink={renewalLink} />}</>;
}

// --- DASHBOARD ---
function Dashboard({ user, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedArea, setSelectedArea] = useState(null);
  const [activeExamData, setActiveExamData] = useState(null);
  const [selectedSimulationId, setSelectedSimulationId] = useState(null); 
  const [notification, setNotification] = useState(null);
  const [dailyGoal, setDailyGoal] = useState(user.dailyGoal || 50);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [toasts, setToasts] = useState([]);
  
  const [questionsIndex, setQuestionsIndex] = useState([]);
  const [isIndexLoading, setIsIndexLoading] = useState(true);

  // NOVO: Estado para saber qual operação está em loading (Resume/Review)
  const [loadingOp, setLoadingOp] = useState(null); 

  const examStateRef = useRef(null);

  const [mySimulations, setMySimulations] = useState([]);
  const [lastExamResults, setLastExamResults] = useState(null);
  const [userStats, setUserStats] = useState({ questionsToday: 0, correctAnswers: 0, totalAnswers: 0, streak: 0 });

  const addToast = (title, message, type = 'info') => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, title, message, type }]);
      setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id));
      }, 3000); 
  };

  const removeToast = (id) => {
      setToasts(prev => prev.filter(t => t.id !== id));
  };

  // --- 1. CARREGAMENTO DO INDEX (FATIAMENTO / SHARDING) ---
  useEffect(() => {
    const loadMetadata = async () => {
        try {
            // Tenta buscar os fragmentos na coleção 'system_index'
            const shardsQuery = query(collection(db, "system_index"));
            const shardsSnapshot = await getDocs(shardsQuery);

            if (!shardsSnapshot.empty) {
                // Se achou fragmentos, junta todos em um único array
                let fullIndex = [];
                shardsSnapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.items) {
                        fullIndex = [...fullIndex, ...data.items];
                    }
                });
                setQuestionsIndex(fullIndex);
            } else {
                // FALLBACK: Se não tiver index gerado, tenta o método antigo ou lê tudo (lento)
                const oldConfigDoc = await getDoc(doc(db, "config", "questions_metadata"));
                if (oldConfigDoc.exists()) {
                     setQuestionsIndex(oldConfigDoc.data().index || []);
                } else {
                    // Fallback final: lê do banco (lento, mas funciona)
                    if(user.role === 'admin') addToast('Aviso', 'Index não encontrado. Gere nas configurações.', 'warning');
                    const q = query(collection(db, "questions"));
                    const snapshot = await getDocs(q);
                    const tempIndex = snapshot.docs.map(doc => ({
                        id: doc.id,
                        area: doc.data().area,
                        topic: doc.data().topic,
                        correctOptionId: doc.data().correctOptionId
                    }));
                    setQuestionsIndex(tempIndex);
                }
            }
        } catch (error) {
            console.error("Erro ao carregar index:", error);
            // Mantém array vazio para não quebrar
        } finally {
            setIsIndexLoading(false);
        }
    };
    loadMetadata();
  }, [user.role]);

  // --- 2. FUNÇÃO GERADORA (COM FATIAMENTO) ---
  const generateMetadata = async () => {
    if(user.role !== 'admin') return;
    const loadingToast = Date.now();
    addToast('Gerando Index...', 'Lendo banco e fatiando arquivos...', 'info');
    
    try {
        const q = query(collection(db, "questions"));
        const snapshot = await getDocs(q);
        
        const fullIndex = snapshot.docs.map(doc => ({
            id: doc.id,
            area: doc.data().area,
            topic: doc.data().topic,
            correctOptionId: doc.data().correctOptionId,
        }));

        const CHUNK_SIZE = 2000; 
        const chunks = [];
        
        for (let i = 0; i < fullIndex.length; i += CHUNK_SIZE) {
            chunks.push(fullIndex.slice(i, i + CHUNK_SIZE));
        }

        const batch = writeBatch(db);
        
        chunks.forEach((chunk, index) => {
            const shardRef = doc(db, "system_index", `shard_${index}`);
            batch.set(shardRef, { items: chunk, updatedAt: new Date().toISOString() });
        });

        await batch.commit();
        
        setQuestionsIndex(fullIndex);
        
        removeToast(loadingToast);
        addToast('Sucesso', `Index gerado! (${fullIndex.length} questões em ${chunks.length} partes)`, 'success');

    } catch (error) {
        removeToast(loadingToast);
        console.error(error);
        addToast('Erro', 'Falha ao gerar index: ' + error.message, 'error');
    }
  };

  const fetchFullQuestions = async (ids) => {
    const promises = ids.map(id => getDoc(doc(db, "questions", id)));
    const docs = await Promise.all(promises);
    return docs.map(d => d.exists() ? { id: d.id, ...d.data() } : null).filter(Boolean);
  };

  useEffect(() => {
    if (!user) return;
    const qSims = query(collection(db, `users/${user.uid}/simulations`));
    const unsubSims = onSnapshot(qSims, (snapshot) => {
       const sims = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
       sims.sort((a,b) => b.id - a.id); 
       setMySimulations(sims);
    });
    
    const docStats = doc(db, "users", user.uid, "stats", "main");
    const unsubStats = onSnapshot(docStats, (docSnap) => {
        if(docSnap.exists()) {
            const data = docSnap.data();
            const today = new Date().toLocaleDateString('pt-BR');
            if (data.lastStudyDate !== today) {
                setUserStats({ ...data, questionsToday: 0 });
            } else {
                setUserStats(data);
            }
        }
    });
    return () => { unsubSims(); unsubStats(); };
  }, [user]);

  const realStats = useMemo(() => calculateDetailedStats(mySimulations, questionsIndex), [mySimulations, questionsIndex]);
  const excludedIds = useMemo(() => getCorrectlyAnsweredIds(mySimulations, questionsIndex), [mySimulations, questionsIndex]);
  const accuracy = realStats.totalQuestions > 0 ? Math.round((realStats.totalCorrect / realStats.totalQuestions) * 100) : 0;
  const streak = userStats.streak || 0;

  const dynamicAreas = useMemo(() => {
    return areasBase.map(area => {
      const totalDB = getRealQuestionCount(questionsIndex, area.title);
      const uniqueCompleted = questionsIndex.filter(q => q.area === area.title && excludedIds.has(q.id)).length;
      const progress = totalDB > 0 ? Math.round((uniqueCompleted / totalDB) * 100) : 0;
      return { ...area, count: `${getAvailableQuestionCount(questionsIndex, area.title, null, excludedIds)} Questões`, progress };
    });
  }, [questionsIndex, excludedIds]);

  const handleViewSwitch = (newView) => {
      if (currentView === 'question_mode' && newView !== 'question_mode') {
          setPendingNavigation(newView);
          setIsExitModalOpen(true);
      } else {
          setCurrentView(newView);
          if (newView !== 'question_mode') {
             examStateRef.current = null;
          }
      }
  };

  const confirmExitWithoutSaving = () => {
      setIsExitModalOpen(false);
      if (pendingNavigation) {
          setCurrentView(pendingNavigation);
          setPendingNavigation(null);
          examStateRef.current = null;
      }
  };

  const handleSaveAndExitFromModal = async () => {
      setIsExitModalOpen(false);
      if (examStateRef.current && pendingNavigation) {
          const { questions, answers, index, id } = examStateRef.current;
          await handleExamPause(questions, answers, index, id);
          setCurrentView(pendingNavigation);
          setPendingNavigation(null);
          examStateRef.current = null;
      } else {
          confirmExitWithoutSaving();
      }
  };

  const handleUpdateProgress = (questions, answers, index, id) => {
      examStateRef.current = { questions, answers, index, id };
  };

  const handleSaveGoal = async (newGoal) => {
    setDailyGoal(newGoal);
    setIsGoalModalOpen(false);
    if (user && user.uid) {
        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, { dailyGoal: newGoal }, { merge: true });
        } catch (error) {
            console.error("Erro ao salvar meta:", error);
        }
    }
  };

  const handleLaunchExam = async (filters = {}, limit = 5) => {
    if (limit <= 0) {
        addToast('Atenção', 'A quantidade de questões deve ser maior que zero.', 'error');
        return;
    }
    const validQuestionsPool = questionsIndex.filter(q => {
        if (filters.areaId && q.area !== areaNameMap[filters.areaId]) return false;
        if (filters.topics && filters.topics.length > 0 && !filters.topics.includes(q.topic)) return false;
        return true;
    });

    if (validQuestionsPool.length === 0) {
      setNotification({ title: "Sem questões", message: "Não encontramos questões com estes filtros.", type: "info" });
      return;
    }

    let selectedIds = [];

    if (filters.topics && filters.topics.length > 0) {
        const questionsByTopic = {};
        filters.topics.forEach(t => questionsByTopic[t] = { new: [], old: [] });

        validQuestionsPool.forEach(q => {
            if (questionsByTopic[q.topic]) {
                if (excludedIds.has(q.id)) {
                    questionsByTopic[q.topic].old.push(q);
                } else {
                    questionsByTopic[q.topic].new.push(q);
                }
            }
        });

        const targetPerTopic = Math.ceil(limit / filters.topics.length);
        let backupPool = [];

        Object.keys(questionsByTopic).forEach(topic => {
            const { new: newQs, old: oldQs } = questionsByTopic[topic];
            const shuffledNew = newQs.sort(() => 0.5 - Math.random());
            const takeNew = shuffledNew.slice(0, targetPerTopic);
            selectedIds.push(...takeNew.map(q => q.id));
            const needed = targetPerTopic - takeNew.length;
            if (needed > 0) {
                const shuffledOld = oldQs.sort(() => 0.5 - Math.random());
                const takeOld = shuffledOld.slice(0, needed);
                selectedIds.push(...takeOld.map(q => q.id));
                backupPool.push(...shuffledOld.slice(needed));
            } else {
                 backupPool.push(...oldQs);
            }
            backupPool.push(...shuffledNew.slice(targetPerTopic));
        });

        if (selectedIds.length < limit && backupPool.length > 0) {
            const missing = limit - selectedIds.length;
            backupPool.sort((a, b) => {
                const aIsOld = excludedIds.has(a.id);
                const bIsOld = excludedIds.has(b.id);
                return aIsOld === bIsOld ? 0.5 - Math.random() : aIsOld ? 1 : -1;
            });
            selectedIds.push(...backupPool.slice(0, missing).map(q => q.id));
        }
        selectedIds = selectedIds.sort(() => 0.5 - Math.random()).slice(0, limit);
    } else {
        const newQs = validQuestionsPool.filter(q => !excludedIds.has(q.id));
        const oldQs = validQuestionsPool.filter(q => excludedIds.has(q.id));
        let selection = newQs.sort(() => 0.5 - Math.random()).slice(0, limit);
        if (selection.length < limit) {
            const missing = limit - selection.length;
            selection.push(...oldQs.sort(() => 0.5 - Math.random()).slice(0, missing));
        }
        selectedIds = selection.sort(() => 0.5 - Math.random()).map(q => q.id);
    }

    try {
        const fullQuestions = await fetchFullQuestions(selectedIds);
        
        if (fullQuestions.length === 0) {
            addToast('Erro', 'Não foi possível carregar as questões.', 'error');
            return;
        }

        setActiveExamData({ questionsData: fullQuestions, answersData: {}, currentIndex: 0, id: Date.now() });
        handleViewSwitch('question_mode');
    } catch (error) {
        console.error("Erro no fetch lazy:", error);
        addToast('Erro', 'Erro de conexão.', 'error');
    }
  };

  const handleLaunchSmartExam = async (questionsListLite) => {
    if (!questionsListLite || questionsListLite.length === 0) {
        addToast('Erro', 'Lista de questões vazia.', 'error');
        return;
    }

    try {
        const ids = questionsListLite.map(q => q.id);
        const fullQuestions = await fetchFullQuestions(ids);

        setActiveExamData({ 
            questionsData: fullQuestions, 
            answersData: {}, 
            currentIndex: 0, 
            id: Date.now() 
        });
        handleViewSwitch('question_mode');
    } catch (error) {
        addToast('Erro', 'Erro ao baixar caderno de erros.', 'error');
    }
  };

  const handleExamPause = async (questions, answers, currentIndex, originId = null) => {
    const answeredCount = Object.keys(answers).length;
    if(user) {
        const simId = String(originId || Date.now());
        const simData = { 
            id: Number(simId), 
            date: new Date().toLocaleDateString('pt-BR'), 
            title: selectedArea ? `Simulado ${selectedArea.title}` : 'Simulado Misto',
            type: selectedArea ? 'Área Específica' : 'Misto', 
            status: 'open', 
            total: questions.length, 
            correct: 0, 
            progress: answeredCount, 
            areas: selectedArea ? [selectedArea.title] : ['Misto'], 
            questionIds: questions.map(q => q.id), 
            answersData: answers,
            lastIndex: currentIndex
        };
        await setDoc(doc(db, `users/${user.uid}/simulations`, simId), simData);
        addToast('Progresso Salvo', 'Você pode continuar depois em "Meus Simulados".', 'success');
        setCurrentView('home'); 
        examStateRef.current = null;
    }
  };

  const handleExamFinish = async (results, questions, answers, originId = null) => {
    const answeredCount = Object.keys(answers).length;
    const simId = String(originId || Date.now());
    setLastExamResults({ id: Number(simId), total: questions.length, correct: results.correct, answered: answeredCount });

    if(user) {
        const simData = { 
            id: Number(simId), 
            date: new Date().toLocaleDateString('pt-BR'), 
            title: selectedArea ? `Simulado ${selectedArea.title}` : 'Simulado Misto',
            type: selectedArea ? 'Área Específica' : 'Misto', 
            status: 'finished', 
            total: questions.length, 
            correct: results.correct, 
            progress: answeredCount, 
            areas: selectedArea ? [selectedArea.title] : ['Misto'], 
            questionIds: questions.map(q => q.id), 
            answersData: answers 
        };
        await setDoc(doc(db, `users/${user.uid}/simulations`, simId), simData);

        const today = new Date().toLocaleDateString('pt-BR');
        const lastDate = userStats.lastStudyDate;
        let newStreak = userStats.streak || 0;
        let newQuestionsToday = userStats.questionsToday || 0;

        if (lastDate !== today) newQuestionsToday = 0;
        newQuestionsToday += answeredCount;

        if (lastDate !== today) {
            if (checkIsYesterday(lastDate)) newStreak += 1;
            else newStreak = 1;
        }

        const newStats = {
            questionsToday: newQuestionsToday,
            totalAnswers: (userStats.totalAnswers || 0) + answeredCount,
            correctAnswers: (userStats.correctAnswers || 0) + results.correct,
            streak: newStreak,
            lastStudyDate: today 
        };
        await setDoc(doc(db, "users", user.uid, "stats", "main"), newStats, { merge: true });
    }
    setCurrentView('simulation_summary');
    examStateRef.current = null;
  };

  const handleDeleteSimulation = async (simId) => {
    if (!user) return;
    try {
        await deleteDoc(doc(db, `users/${user.uid}/simulations`, String(simId)));
        addToast('Excluído', 'Simulado removido com sucesso.', 'success');
    } catch (error) {
        console.error("Erro ao excluir simulado:", error);
        addToast('Erro', 'Não foi possível excluir o simulado.', 'error');
    }
  };

  const handleResumeExam = async (simId) => {
    const sim = mySimulations.find(s => s.id === simId);
    if (!sim) return;
    
    // ATIVA LOADING ESPECÍFICO PARA ESTE ID
    setLoadingOp(simId);

    let questions = [];
    if (sim.questionsData) {
        questions = sim.questionsData; 
    } else if (sim.questionIds) {
        // SEM TOAST AQUI, USANDO O BUTTON LOADING
        try {
            questions = await fetchFullQuestions(sim.questionIds);
        } catch (e) {
            addToast('Erro', 'Erro ao recuperar questões.', 'error');
            setLoadingOp(null); // PARA O LOADING EM ERRO
            return;
        }
    }
    
    if (questions.length === 0) {
        addToast('Erro', 'Não foi possível carregar as questões. Tente novamente.', 'error');
        setLoadingOp(null); // PARA O LOADING EM ERRO
        return;
    }
    setActiveExamData({ questionsData: questions, answersData: sim.answersData || {}, currentIndex: sim.lastIndex || 0, id: sim.id });
    handleViewSwitch('question_mode');
    setLoadingOp(null); // RESETA APÓS MUDAR A VIEW
  };

  const handleResetQuestions = async () => {
     if(!user) return;
     const q = query(collection(db, `users/${user.uid}/simulations`));
     const snapshot = await getDocs(q);
     const batch = writeBatch(db);
     snapshot.docs.forEach((doc) => batch.delete(doc.ref));
     await batch.commit();
     await setDoc(doc(db, "users", user.uid, "stats", "main"), { totalAnswers: 0, correctAnswers: 0 }, { merge: true });
     addToast('Resetado', 'Histórico de questões resetado.', 'success');
  };

  const handleResetHistory = async () => {
    if(!user) return;
    const q = query(collection(db, `users/${user.uid}/simulations`));
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    await setDoc(doc(db, "users", user.uid, "stats", "main"), { questionsToday: 0, correctAnswers: 0, totalAnswers: 0, streak: 0, lastStudyDate: null });
    addToast('Apagado', 'Todo o histórico foi apagado.', 'success');
  };

  const [reviewData, setReviewData] = useState(null);
  
  const handleReviewClick = async (simId) => {
      const sim = mySimulations.find(s => s.id === simId);
      if(!sim) return;
      
      setLoadingOp(simId); // LOADING NO BOTÃO

      let fullSim = { ...sim };
      if (!sim.questionsData && sim.questionIds) {
          try {
             const qs = await fetchFullQuestions(sim.questionIds);
             fullSim.questionsData = qs;
          } catch(e) {
             addToast('Erro', 'Não foi possível carregar as questões.', 'error');
             setLoadingOp(null);
             return;
          }
      }
      setReviewData(fullSim);
      setSelectedSimulationId(simId);
      handleViewSwitch('review_mode');
      setLoadingOp(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <HomeView user={user} userStats={userStats} dailyGoal={dailyGoal} accuracy={accuracy} streak={streak} dynamicAreas={dynamicAreas} setIsGoalModalOpen={setIsGoalModalOpen} setSelectedArea={setSelectedArea} setCurrentView={handleViewSwitch} realStats={realStats} isIndexLoading={isIndexLoading} />;
      case 'flashcards': return <FlashcardsView user={user} onBack={() => handleViewSwitch('home')} />;
      case 'my_simulations': return <MySimulationsView simulations={mySimulations} onCreateNew={() => handleViewSwitch('general_exam_setup')} onResume={handleResumeExam} onViewResults={handleReviewClick} onDelete={handleDeleteSimulation} loadingOp={loadingOp} />;
      case 'review_mode': return <ReviewExamView simulation={reviewData} onBack={() => handleViewSwitch('my_simulations')} user={user} addToast={addToast} allQuestions={questionsIndex} />;
      case 'general_exam_setup': return (
          <GeneralExamSetupView 
              user={user} // PASSANDO USER
              onBack={() => handleViewSwitch('my_simulations')} 
              onLaunchExam={(topics, count) => handleLaunchExam({ topics: topics }, count)} 
              areasBase={areasBase} 
              excludedIds={excludedIds} 
              allQuestions={questionsIndex}
              themesMap={themesMap}
              areaNameMap={areaNameMap}
              getThemesForArea={getThemesForArea}
          />
      );
      case 'area_hub': return <AreaHubView area={selectedArea} stats={realStats.byArea[selectedArea.title] || { total: 0, correct: 0 }} worstTopics={calculateTopicPerformance(mySimulations, selectedArea.title, questionsIndex)} onBack={() => handleViewSwitch('home')} onStartTraining={() => handleViewSwitch('topic_selection')} user={user} />;
      case 'topic_selection': return (
          <TopicSelectionView 
              user={user} // PASSANDO USER
              area={selectedArea} 
              onBack={() => handleViewSwitch('area_hub')} 
              onLaunchExam={(topics, count) => handleLaunchExam({ areaId: selectedArea.id, topics: topics }, count)} 
              excludedIds={excludedIds} 
              allQuestions={questionsIndex} 
              getThemesForArea={getThemesForArea} 
          />
      );
      case 'question_mode': return <QuestionView area={selectedArea} initialData={activeExamData} user={user} onExit={() => handleViewSwitch('home')} onFinish={handleExamFinish} onPause={handleExamPause} onUpdateProgress={handleUpdateProgress} addToast={addToast} />;
      case 'simulation_summary': return <SimulationSummaryView results={lastExamResults} onHome={() => handleViewSwitch('home')} onNewExam={() => handleViewSwitch('general_exam_setup')} onReview={() => handleReviewClick(lastExamResults?.id)} loadingReview={loadingOp === lastExamResults?.id} />;
      case 'settings': return <SettingsView user={user} onBack={() => handleViewSwitch('home')} onResetQuestions={handleResetQuestions} onResetHistory={handleResetHistory} addToast={addToast} onGenerateMetadata={generateMetadata} />;
      case 'performance': return <PerformanceView detailedStats={realStats} simulations={mySimulations} allQuestions={questionsIndex} onLaunchExam={(topics, count) => handleLaunchExam({ topics: topics }, count)} onLaunchSmartExam={handleLaunchSmartExam} onBack={() => handleViewSwitch('home')} areasBase={areasBase} />;
      case 'add_question': return <AddQuestionView onBack={() => handleViewSwitch('home')} addToast={addToast} />;
      default: return <div>Erro: View não encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-800 relative">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      {isGoalModalOpen && <GoalModal currentGoal={dailyGoal} onSave={handleSaveGoal} onClose={() => setIsGoalModalOpen(false)} />}
      {notification && <NotificationModal title={notification.title} message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      
      {isExitModalOpen && (
          <ExitConfirmationModal 
              onClose={() => setIsExitModalOpen(false)} 
              onConfirmExit={confirmExitWithoutSaving}
              onSaveAndExit={handleSaveAndExitFromModal}
          />
      )}

      {/* --- CORREÇÃO NA SIDEBAR --- */}
      <Sidebar 
          currentView={currentView} 
          setCurrentView={handleViewSwitch} 
          onLogout={onLogout} 
          user={user} 
          collapsed={isSidebarCollapsed}
          toggleCollapsed={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <MobileHeader isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      {isMobileMenuOpen && <MobileMenu currentView={currentView} setCurrentView={handleViewSwitch} onLogout={onLogout} user={user} setIsMobileMenuOpen={setIsMobileMenuOpen} />}
      
      {/* --- CORREÇÃO CRÍTICA NO PADDING --- */}
      {/* Mudamos 'md:' para 'lg:' para respeitar o tablet portrait como mobile */}
      <main className={`
          flex-1 p-6 
          pt-24 lg:pt-6 
          transition-all duration-300 
          ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
      `}>
        {renderContent()}
      </main>
    </div>
  );
}

// ... Resto dos componentes (ReviewExamView, MySimulationsView, etc.) MANTIDOS IGUAIS ...

function ReviewExamView({ simulation, onBack, allQuestions, user, addToast }) { 
    if (!simulation) return <div>Carregando...</div>;
    const questions = simulation.questionsData || [];
    const userAnswers = simulation.answersData || {};
    const [reportModalConfig, setReportModalConfig] = useState({ isOpen: false, type: 'error', questionId: null });
    const openReportModal = (questionId, type) => { setReportModalConfig({ isOpen: true, type, questionId }); };
    return (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-5xl mx-auto">
          {reportModalConfig.isOpen && (<ReportModal isOpen={true} onClose={() => setReportModalConfig({ ...reportModalConfig, isOpen: false })} questionId={reportModalConfig.questionId} userId={user?.uid} type={reportModalConfig.type} addToast={addToast} />)}
          <div className="flex items-center justify-between mb-8"><button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors font-medium"><ArrowLeft size={20} className="mr-2" /> Voltar para Meus Simulados</button><div className="text-right"><span className="text-sm font-bold text-slate-500 bg-gray-100 px-3 py-1 rounded-full">Revisão: {simulation.title}</span></div></div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8 flex justify-between items-center"><div><h2 className="text-2xl font-bold text-slate-900">Resumo do Desempenho</h2><p className="text-slate-500">Data: {simulation.date}</p></div><div className="text-right"><div className="text-3xl font-bold text-blue-600">{simulation.correct}/{simulation.total}</div><div className="text-sm font-medium text-gray-400">Acertos</div></div></div>
          <div className="space-y-6">{questions.map((q, index) => { 
              const userAnswer = userAnswers[index]; 
              const isCorrect = userAnswer === q.correctOptionId; 
              return (
                <div key={q.id} className={`bg-white rounded-2xl border overflow-hidden ${isCorrect ? 'border-emerald-200' : 'border-red-200'}`}>
                    <div className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${isCorrect ? 'bg-emerald-50' : 'bg-red-50'}`}>
                        <div className="flex items-center gap-2"><h3 className={`font-bold flex items-center gap-2 ${isCorrect ? 'text-emerald-800' : 'text-red-800'}`}>{isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />} Questão {index + 1}</h3><span className="text-sm font-medium opacity-70">{q.topic}</span></div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500 bg-white/50 px-2 py-1 rounded-lg border border-black/5 font-bold uppercase tracking-wider"><span>ID</span><CopyButton text={q.id} className="text-gray-400 hover:text-blue-600" /></div>
                             <button onClick={() => openReportModal(q.id, 'suggestion')} className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-colors" title="Sugerir Edição"><Edit2 size={16} /></button>
                            <button onClick={() => openReportModal(q.id, 'error')} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Reportar Erro"><AlertTriangle size={16} /></button>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-slate-800 mb-4">{q.text}</p>
                        <div className="space-y-2 mb-4">{q.options.map(opt => { let optClass = "p-3 rounded-lg border border-gray-100 text-gray-600"; if (opt.id === q.correctOptionId) optClass = "p-3 rounded-lg border border-emerald-500 bg-emerald-50 text-emerald-800 font-bold"; else if (opt.id === userAnswer && !isCorrect) optClass = "p-3 rounded-lg border border-red-500 bg-red-50 text-red-800 font-bold"; return (<div key={opt.id} className={optClass}><span className="uppercase mr-2">{opt.id})</span> {opt.text}</div>); })}</div>
                        <div className="bg-gray-50 p-4 rounded-xl text-sm text-slate-600"><span className="font-bold block mb-1">Comentário:</span>{q.explanation}</div>
                    </div>
                </div>
              ); 
          })}</div>
        </div>
    );
}

function MySimulationsView({ simulations, onCreateNew, onResume, onViewResults, onDelete, loadingOp }) {
    const [activeTab, setActiveTab] = useState('finished');
    const [simToDelete, setSimToDelete] = useState(null);
    const openSims = simulations.filter(s => s.status === 'open');
    const finishedSims = simulations.filter(s => s.status === 'finished');
    const confirmDelete = () => { if(simToDelete && onDelete) { onDelete(simToDelete.id); setSimToDelete(null); } };
    return (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-5xl mx-auto">
          {simToDelete && (<NotificationModal title="Excluir Simulado?" message="Todo o progresso será perdido." type="error" isDangerous={true} confirmText="Sim, Excluir" cancelText="Cancelar" onClose={() => setSimToDelete(null)} onConfirm={confirmDelete} />)}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"><div><h1 className="text-3xl font-bold text-slate-900 mb-2">Meus Simulados</h1><p className="text-slate-500">Gerencie seus treinos e acompanhe seu histórico.</p></div><button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all"><Plus size={20} /> Novo Simulado</button></div>
          <div className="flex border-b border-gray-200 mb-6"><button onClick={() => setActiveTab('open')} className={`pb-3 px-6 font-medium text-sm transition-colors relative ${activeTab === 'open' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Em Andamento ({openSims.length}){activeTab === 'open' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>}</button><button onClick={() => setActiveTab('finished')} className={`pb-3 px-6 font-medium text-sm transition-colors relative ${activeTab === 'finished' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Concluídos ({finishedSims.length}){activeTab === 'finished' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>}</button></div>
          <div className="space-y-4">
            {activeTab === 'open' ? (openSims.length > 0 ? (openSims.map(sim => (<div key={sim.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><Clock size={24} /></div><div><h3 className="font-bold text-slate-900">{sim.title}</h3><div className="flex items-center gap-2 text-sm text-gray-500"><span>{sim.date}</span><span>•</span><span>{sim.type}</span></div></div></div><div className="flex items-center gap-4 md:gap-6"><div className="text-right hidden md:block"><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Progresso</p><p className="font-bold text-slate-700">{sim.progress} / {sim.total}</p></div><button onClick={() => onResume(sim.id)} disabled={loadingOp === sim.id} className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors">{loadingOp === sim.id ? <Loader2 className="animate-spin" size={16} /> : <>Continuar <ArrowRight size={16} /></>}</button><button onClick={() => setSimToDelete(sim)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={20} /></button></div></div>))) : <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">Nenhum simulado em aberto</div>) : (finishedSims.length > 0 ? (finishedSims.map(sim => (<div key={sim.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4"><div className="flex items-center gap-4 w-full md:w-auto"><div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle size={24} /></div><div><h3 className="font-bold text-slate-900">{sim.title}</h3><div className="flex items-center gap-2 text-sm text-gray-500"><span>{sim.date}</span><span>•</span><span>{sim.type}</span></div></div></div><div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end"><div className="text-right md:mr-4"><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nota</p><p className="font-bold text-emerald-600">{sim.correct} / {sim.total} ({Math.round((sim.correct/sim.total)*100)}%)</p></div><div className="flex gap-2"><button onClick={() => onViewResults(sim.id)} disabled={loadingOp === sim.id} className="bg-white border border-gray-200 hover:bg-gray-50 text-slate-600 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors">{loadingOp === sim.id ? <Loader2 className="animate-spin" size={18} /> : <><Eye size={18} /> Detalhes</>}</button><button onClick={() => setSimToDelete(sim)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200"><Trash2 size={20} /></button></div></div></div>))) : <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">Nenhum simulado concluído</div>)}
          </div>
        </div>
    );
}

function SimulationSummaryView({ results, onHome, onNewExam, onReview, loadingReview }) {
  if (!results) return null;
  const totalQuestions = results.total;
  const answeredCount = results.answered;
  const correctCount = results.correct;
  const wrongCount = answeredCount - correctCount;
  const unansweredCount = totalQuestions - answeredCount;
  const percentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  let message = "Bom começo!"; let colorClass = "text-blue-600";
  if (percentage >= 80) { message = "Excelente Desempenho!"; colorClass = "text-emerald-600"; } 
  else if (percentage < 50 && answeredCount > 0) { message = "Vamos reforçar os estudos?"; colorClass = "text-orange-600"; }
  else if (answeredCount === 0) { message = "Nenhuma questão respondida."; colorClass = "text-gray-500"; }

  return (
    <div className="max-w-3xl mx-auto pt-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100">
        <div className="inline-flex p-4 rounded-full bg-gray-50 mb-6"><Activity size={48} className={colorClass} /></div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Simulado Finalizado</h2>
        <p className="text-slate-500 text-lg mb-8">{message}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="p-4 bg-gray-50 rounded-2xl"><div className="text-sm text-gray-500 mb-1 font-bold">Total</div><div className="text-2xl font-bold text-slate-800">{totalQuestions}</div></div>
            <div className="p-4 bg-emerald-50 rounded-2xl"><div className="text-sm text-emerald-600 mb-1 font-bold">Acertos</div><div className="text-2xl font-bold text-emerald-700">{correctCount}</div></div>
            <div className="p-4 bg-red-50 rounded-2xl"><div className="text-sm text-red-600 mb-1 font-bold">Erros</div><div className="text-2xl font-bold text-red-700">{wrongCount}</div></div>
            <div className="p-4 bg-yellow-50 rounded-2xl"><div className="text-sm text-yellow-600 mb-1 font-bold">Nulas</div><div className="text-2xl font-bold text-yellow-700">{unansweredCount}</div></div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4 mb-2 overflow-hidden"><div className={`h-4 rounded-full transition-all duration-1000 ${percentage >= 80 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-blue-500' : 'bg-orange-500'}`} style={{ width: `${percentage}%` }}></div></div>
        <p className="text-sm text-gray-400 font-medium mb-10 text-right">Aproveitamento (Respondidas): {percentage}%</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={onHome} className="px-8 py-3.5 rounded-xl font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"><Home size={20} /> Voltar ao Início</button>
            <button onClick={onReview} disabled={loadingReview} className="px-8 py-3.5 rounded-xl font-bold text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">{loadingReview ? <Loader2 className="animate-spin" size={20} /> : <><List size={20} /> Revisar Questões</>}</button>
            <button onClick={onNewExam} className="px-8 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2"><Play size={20} fill="currentColor" /> Novo Simulado</button>
        </div>
      </div>
    </div>
  );
}

function SettingsView({ user, onBack, onResetQuestions, onResetHistory, addToast, onGenerateMetadata }) {
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const openModal = (type) => setModalConfig({ isOpen: true, type });
  const handleConfirm = () => { if (modalConfig.type === 'questions') onResetQuestions(); else if (modalConfig.type === 'history') onResetHistory(); setModalConfig({ ...modalConfig, isOpen: false }); };
  const [name, setName] = useState(user.name || '');
  const [whatsapp, setWhatsapp] = useState(user.whatsapp || ''); 
  const [isSaving, setIsSaving] = useState(false);
  const [adminRenewalLink, setAdminRenewalLink] = useState('');
  const [activeRenewalLink, setActiveRenewalLink] = useState('');
  const [isAdminSaving, setIsAdminSaving] = useState(false);
  const subDate = user.subscriptionUntil ? new Date(user.subscriptionUntil) : null;
  const daysLeft = subDate ? Math.ceil((subDate - new Date()) / (1000 * 60 * 60 * 24)) : 0;
  const formattedDate = subDate ? subDate.toLocaleDateString('pt-BR') : 'N/A';
  const isExpired = subDate && new Date() > subDate;

  useEffect(() => {
    const fetchRenewalLink = async () => {
        try {
            const configDoc = await getDoc(doc(db, "config", "general"));
            if (configDoc.exists() && configDoc.data().renewalLink) {
                const link = configDoc.data().renewalLink;
                setActiveRenewalLink(link);
                if (user.role === 'admin') setAdminRenewalLink(link);
            }
        } catch (error) {
            console.error("Erro ao buscar link de renovação:", error);
        }
    };
    fetchRenewalLink();
  }, [user.role]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
        if(auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: name });
            await setDoc(doc(db, "users", user.uid), { name: name, whatsapp: whatsapp }, { merge: true });
            addToast('Sucesso', 'Perfil atualizado com sucesso!', 'success');
        }
    } catch (error) { 
        console.error(error); 
        addToast('Erro', 'Erro ao atualizar perfil.', 'error');
    } finally { 
        setIsSaving(false); 
    }
  };

  const handleSavePassword = async (currentPassword, newPassword) => {
      setIsSaving(true);
      try {
          if (auth.currentUser) {
              const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
              await reauthenticateWithCredential(auth.currentUser, credential);
              await updatePassword(auth.currentUser, newPassword);
              addToast('Sucesso', 'Senha alterada com sucesso!', 'success');
              setIsPasswordModalOpen(false); 
          }
      } catch (error) { 
          console.error(error); 
          addToast('Erro', 'Erro ao alterar senha. Verifique a senha atual.', 'error');
      } finally { 
          setIsSaving(false); 
      }
  };

  const handleSaveAdminLink = async () => {
    setIsAdminSaving(true);
    try {
        await setDoc(doc(db, "config", "general"), { renewalLink: adminRenewalLink }, { merge: true });
        setActiveRenewalLink(adminRenewalLink);
        addToast('Sucesso', 'Link de renovação atualizado.', 'success');
    } catch (error) {
        console.error(error);
        addToast('Erro', 'Erro ao atualizar link.', 'error');
    } finally {
        setIsAdminSaving(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-4xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-8"><button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors font-medium"><ArrowLeft size={20} className="mr-2"/> Voltar</button><h1 className="text-3xl font-bold text-slate-900">Configurações</h1></div>
      {modalConfig.isOpen && (<NotificationModal title={modalConfig.type === 'questions' ? "Resetar Questões?" : "Apagar Tudo?"} message={modalConfig.type === 'questions' ? "Todas as questões voltarão a ser 'novas'. Seu histórico de acertos será apagado, mas sua sequência de dias (streak) será mantida." : "CUIDADO: Isso apagará TODO o seu histórico, incluindo sua sequência de dias (streak)."} isDangerous={true} confirmText={modalConfig.type === 'questions' ? "Sim, Resetar Questões" : "Sim, Apagar Tudo"} type="error" onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} onConfirm={handleConfirm} />)}
      {isPasswordModalOpen && (<ChangePasswordModal onClose={() => setIsPasswordModalOpen(false)} onSave={handleSavePassword} isLoading={isSaving} />)}
      
      <div className="space-y-6">
        
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 right-0 p-4 opacity-10 ${isExpired ? 'text-red-500' : 'text-emerald-500'}`}><CreditCard size={120} /></div>
            <div className="flex items-center gap-4 mb-6 relative z-10"><div className={`p-3 rounded-full ${isExpired ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}><Calendar size={24} /></div><div><h2 className="text-xl font-bold text-slate-900">Minha Assinatura</h2><p className="text-slate-500 text-sm">Detalhes do seu plano atual</p></div></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100"><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</p><div className={`text-lg font-bold flex items-center gap-2 ${isExpired ? 'text-red-600' : 'text-emerald-600'}`}>{isExpired ? <XCircle size={20} /> : <CheckCircle size={20} />}{isExpired ? 'Expirada' : 'Ativa'}</div></div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100"><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Vencimento</p><p className="text-lg font-bold text-slate-700">{formattedDate}</p></div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100"><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tempo Restante</p><p className={`text-lg font-bold ${daysLeft < 5 ? 'text-orange-600' : 'text-slate-700'}`}>{daysLeft > 0 ? `${daysLeft} dias` : '0 dias'}</p></div>
            </div>
            
            {activeRenewalLink && (
                <div className="relative z-10 text-right">
                    <button 
                        onClick={() => window.open(activeRenewalLink, '_blank')}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg shadow-emerald-200 transition-colors flex items-center justify-center gap-2 md:inline-flex w-full md:w-auto"
                    >
                        Renovar Assinatura Agora <ExternalLink size={16} />
                    </button>
                </div>
            )}
        </div>

        {user.role === 'admin' && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-slate-800 p-3 rounded-full text-blue-400"><Database size={24} /></div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Administração do Sistema</h2>
                        <p className="text-slate-400 text-sm">Configurações globais da plataforma</p>
                    </div>
                </div>
                
                {/* BOTÃO NOVO PARA GERAR INDEX */}
                <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700 mb-6">
                    <div>
                        <h4 className="font-semibold text-white">Atualizar Metadados de Questões</h4>
                        <p className="text-xs text-slate-400 max-w-md">Gera o índice leve para performance. Execute sempre que adicionar muitas questões novas.</p>
                    </div>
                    <button onClick={onGenerateMetadata} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        <RefreshCw size={18} /> Gerar Index
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                        Link de Renovação de Assinatura
                        <span className="text-xs font-normal text-slate-500">(Este link aparecerá para os alunos)</span>
                    </label>
                    <div className="flex gap-2">
                        <input 
                            type="url" 
                            value={adminRenewalLink} 
                            onChange={(e) => setAdminRenewalLink(e.target.value)}
                            placeholder="https://exemplo.com/pagamento"
                            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500" 
                        />
                        <button 
                            onClick={handleSaveAdminLink}
                            disabled={isAdminSaving}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                        >
                            {isAdminSaving ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </div>
            </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6"><div className="bg-blue-100 p-3 rounded-full text-blue-600"><User size={24} /></div><div><h2 className="text-xl font-bold text-slate-900">Meu Perfil</h2><p className="text-slate-500 text-sm">Gerencie suas informações pessoais</p></div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nome Completo</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-bold">SEU ID:</span> 
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded">{user.uid}</span>
                        <CopyButton text={user.uid} className="text-blue-500 hover:text-blue-700" />
                    </div>
                </div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-2">E-mail</label><input type="email" value={user.email} disabled className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" /></div>
                <div className="md:col-span-2"><label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"><Smartphone size={16} className="text-green-600" /> WhatsApp (Opcional)</label><input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="(00) 00000-0000" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" /><p className="text-xs text-gray-400 mt-1">Usaremos apenas para comunicações importantes sobre sua conta.</p></div>
            </div>
            <div className="text-right"><button onClick={handleSaveProfile} disabled={isSaving || (name === user.name && whatsapp === user.whatsapp)} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Salvar Alterações</button></div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"><div className="flex items-center gap-4 mb-6"><div className="bg-orange-100 p-3 rounded-full text-orange-600"><Key size={24} /></div><div><h2 className="text-xl font-bold text-slate-900">Segurança</h2><p className="text-slate-500 text-sm">Gerencie sua senha de acesso</p></div></div><div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white rounded-xl border border-gray-100"><div className="mb-4 md:mb-0"><h4 className="font-semibold text-slate-800">Alterar Senha</h4><p className="text-xs text-gray-500">Recomendamos usar uma senha forte e única.</p></div><button onClick={() => setIsPasswordModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition-colors"><Key size={18} /> Alterar Senha</button></div></div>
        
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6 shadow-sm"><div className="flex items-center gap-4 mb-6"><div className="bg-red-100 p-3 rounded-full text-red-600"><AlertTriangle size={24} /></div><div><h2 className="text-xl font-bold text-red-700">Zona de Perigo</h2><p className="text-red-500 text-sm">Ações irreversíveis de gerenciamento de dados</p></div></div><div className="space-y-4"><div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white rounded-xl border border-red-100"><div className="mb-4 md:mb-0"><h4 className="font-semibold text-slate-800">Resetar Questões</h4><p className="text-xs text-gray-500">Apaga o histórico de respostas. As questões voltam a ser novas.</p></div><button onClick={() => openModal('questions')} className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors"><RotateCcw size={18} /> Resetar Questões</button></div><div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white rounded-xl border border-red-100"><div className="mb-4 md:mb-0"><h4 className="font-semibold text-slate-800">Resetar Tudo</h4><p className="text-xs text-gray-500">Apaga tudo, inclusive sua sequência (streak).</p></div><button onClick={() => openModal('history')} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"><Trash2 size={18} /> Resetar Tudo</button></div></div></div>
      </div>
    </div>
  );
}

function AddQuestionView({ onBack, addToast }) {
    const [area, setArea] = useState(areasBase[0].id);
    const [topic, setTopic] = useState('');
    const [institution, setInstitution] = useState('');
    const [year, setYear] = useState('');
    const [text, setText] = useState('');
    const [options, setOptions] = useState([{ id: 'a', text: '' }, { id: 'b', text: '' }, { id: 'c', text: '' }, { id: 'd', text: '' }, { id: 'e', text: '' }]);
    const [correctOptionId, setCorrectOptionId] = useState('a');
    const [explanation, setExplanation] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const availableThemes = useMemo(() => themesMap[area] || [], [area]);

    useEffect(() => { setTopic(''); }, [area]);
    const handleOptionChange = (id, newText) => { setOptions(prev => prev.map(opt => opt.id === id ? { ...opt, text: newText } : opt)); };
    const handleSave = async (e) => {
        e.preventDefault(); setIsSaving(true);
        const optionA = options.find(o => o.id === 'a').text.trim();
        const optionB = options.find(o => o.id === 'b').text.trim();
        if (!text || !topic || !optionA || !optionB) { 
            addToast('Atenção', 'Preencha a Área, Tópico, Enunciado e as Alternativas A e B.', 'error');
            setIsSaving(false); return; 
        }
        const validOptions = options.filter(opt => opt.text.trim() !== '');
        if (!validOptions.find(o => o.id === correctOptionId)) { 
            addToast('Erro', 'A alternativa correta selecionada está vazia.', 'error');
            setIsSaving(false); return; 
        }
        try {
            const questionData = { area: areaNameMap[area], topic: topic, institution: institution || "", year: year ? parseInt(year) : "", text: text, options: validOptions, correctOptionId: correctOptionId, explanation: explanation || "", createdAt: new Date().toISOString(), hasImage: false, id: null };
            await addDoc(collection(db, "questions"), questionData);
            addToast('Sucesso', 'Questão adicionada com sucesso!', 'success');
            setText(''); setOptions([{ id: 'a', text: '' }, { id: 'b', text: '' }, { id: 'c', text: '' }, { id: 'd', text: '' }, { id: 'e', text: '' }]); setExplanation('');
        } catch (error) { 
            addToast('Erro', 'Erro ao salvar no banco de dados.', 'error'); 
        } finally { setIsSaving(false); }
    };
    return (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-4xl mx-auto pb-10"><div className="flex items-center justify-between mb-8"><button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors font-medium"><ArrowLeft size={20} className="mr-2" /> Voltar</button><h1 className="text-2xl font-bold">Nova Questão</h1></div><form onSubmit={handleSave} className="space-y-6"><div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6"><div><label className="block text-sm font-bold text-slate-700 mb-2">Área</label><select value={area} onChange={e => setArea(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">{areasBase.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}</select></div><div><label className="block text-sm font-bold text-slate-700 mb-2">Tema</label><select value={topic} onChange={e => setTopic(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"><option value="">Selecione...</option>{availableThemes.map(t => <option key={t} value={t}>{t}</option>)}</select></div><div><label className="block text-sm font-bold text-slate-700 mb-2">Instituição (Opcional)</label><input type="text" value={institution} onChange={e => setInstitution(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800" placeholder="Ex: USP, UNIFESP..." /></div><div><label className="block text-sm font-bold text-slate-700 mb-2">Ano (Opcional)</label><input type="number" value={year} onChange={e => setYear(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800" placeholder="Ano (opcional)" /></div></div><div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-slate-700 mb-2">Enunciado</label><textarea value={text} onChange={e => setText(e.target.value)} rows={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-y" /></div><div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4"><h3 className="font-bold text-slate-900 border-b border-gray-100 pb-2 mb-4">Alternativas</h3>{options.map((opt) => (<div key={opt.id} className="flex items-start gap-3"><div className="mt-3"><input type="radio" name="correctOption" checked={correctOptionId === opt.id} onChange={() => setCorrectOptionId(opt.id)} className="w-5 h-5 text-blue-600 focus:ring-blue-500 cursor-pointer"/></div><div className="flex-1"><label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Opção {opt.id}</label><textarea value={opt.text} onChange={e => handleOptionChange(opt.id, e.target.value)} rows={2} className={`w-full px-4 py-3 border rounded-xl resize-none ${correctOptionId === opt.id ? 'bg-emerald-50 border-emerald-200 focus:ring-emerald-500' : 'bg-gray-50 border-gray-200 focus:ring-blue-500'}`} placeholder={`Texto da alternativa ${opt.id.toUpperCase()}`} /></div></div>))}</div><div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"><label className="block text-sm font-bold text-slate-700 mb-2">Comentário</label><textarea value={explanation} onChange={e => setExplanation(e.target.value)} rows={4} className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl resize-y" /></div><div className="flex justify-end gap-4"><button type="button" onClick={onBack} className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50">Cancelar</button><button type="submit" disabled={isSaving} className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50">{isSaving ? 'Salvando...' : 'Salvar Questão'}</button></div></form></div>
    );
}
