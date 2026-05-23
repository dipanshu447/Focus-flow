import { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  FiCamera, FiClock, FiActivity,
  FiCheckCircle, FiChevronDown, FiLogOut, FiMoon, FiSun, FiEdit2, FiCheck, FiTrash2
} from 'react-icons/fi';
import ConfirmationModal from '../../components/ConfirmationModal';
import { totalStudiedHour, weeklyFocusTime } from '../../utils/analytics';
import useFocus from '../../hooks/useFocus';
import { useNavigate } from 'react-router';
import { deleteAccount, getUser, updateProfile } from '../../api/user';
import type { userDataObj, Role } from '../../types/userTypes';
import useDarkMode from '../../hooks/useDarkMode';


export default function ProfilePage() {
  const [userData, setUserData] = useState<userDataObj | null>(null);
  const { tasks, sessions } = useFocus();
  const taskDone = tasks.filter(task => task.completed).length;
  const navigate = useNavigate();
  const { setTheme } = useDarkMode();

  const [isEditing, setIsEditing] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const stats = [
    { label: "Total Focus", value: totalStudiedHour(sessions), icon: FiClock },
    { label: "This Week", value: weeklyFocusTime(sessions), icon: FiActivity },
    { label: "Total Sessions", value: sessions.length, icon: FiCheckCircle },
    { label: "Tasks Done", value: taskDone, icon: FiCheckCircle },
  ];

  const roles: Role[] = [
    'Student',
    'Professional',
    'Freelancer',
    'Competitive Exam Aspirant',
    'Other'
  ];

  function formatDate(ISOdate: string) {
    const date = new Date(ISOdate);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
    return formattedDate;
  }

  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      setUserData(data.user);
    }
    fetchUser()
  }, []);

  const handleSaveProfile = async () => {
    try {
      await updateProfile(userData);
      if (userData?.theme) setTheme(userData.theme);
      setIsEditing(false);
      setIsRoleDropdownOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    navigate("/signup");
  };

  const handleDeleteAccount = async () => {
    try {
      const data = await deleteAccount();

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      console.log(data);

      setShowDeleteModal(false);

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const pageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const deleteModalIcon = (
    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
      <FiTrash2 size={20} />
    </div>
  );

  return (
    <div className={`h-screen w-full overflow-hidden`}>
      {/* --- Logout Modal --- */}
      <AnimatePresence>
        {showLogoutModal && (
          <ConfirmationModal modalTitle="Sign Out?" modalSubtext="Are you sure you want to step away from your focus workspace?" leftBtntext="Cancel" rightBtntext="Sign Out" leftBtnfunc={() => setShowLogoutModal(false)} rightBtnfunc={handleLogout} />
        )}
      </AnimatePresence>
      {/* --- Delete Account Modal --- */}
      <AnimatePresence>
        {showDeleteModal && (
          <ConfirmationModal ModalIcon={deleteModalIcon} modalTitle="Delete Identity?" modalSubtext="This action is irreversible. All your focus history, objectives, and consistency data will be permanently erased." leftBtntext="Cancel" rightBtntext="Delete Forever" leftBtnfunc={() => setShowDeleteModal(false)} rightBtnfunc={handleDeleteAccount} />
        )}
      </AnimatePresence>
      <div className="h-full w-full text-[#111] dark:text-[#e5e5e5] font-sans transition-colors duration-500 flex flex-col overflow-y-auto custom-scrollbar">
        <div className="flex-1 w-full px-8 py-16 md:px-16 lg:px-24 mx-auto flex flex-col gap-14 pb-24">
          <motion.header variants={pageVariants} initial="hidden" animate="visible" className="flex flex-col gap-3">
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-light tracking-wide text-black/90 dark:text-white/90">Identity</motion.h1>
            <motion.p variants={itemVariants} className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-black/40 dark:text-white/30 font-medium">
              Your focus signature.
            </motion.p>
          </motion.header>
          <motion.div variants={pageVariants} initial="hidden" animate="visible" className="flex flex-col gap-16">
            {/* ================= PROFILE INFO (VIEW & EDIT MODE) ================= */}
            <motion.section variants={itemVariants} className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
              <div className="flex flex-col gap-5 shrink-0">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-linear-to-br from-black/6 to-transparent dark:from-white/6 dark:to-transparent border border-black/5 dark:border-neutral-900 flex items-center justify-center overflow-hidden relative group">
                  {userData?.avatarUrl ? (
                    <img
                      src={userData.avatarUrl}
                      alt="Profile"
                      className="w-full h-full object-cover grayscale" />
                  ) : (
                    <span className="text-5xl md:text-6xl font-light text-black/20 dark:text-white/20 uppercase">
                      {userData?.name ? userData.name.charAt(0) : '?'}
                    </span>
                  )}
                  <AnimatePresence>
                    {isEditing && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/20 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none"
                      >
                        <FiCamera size={24} className="text-white/80" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex flex-col gap-8 w-full max-w-md pt-2">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-light text-black/30 dark:text-neutral-500">
                    {userData?.createdAt && `Member since ${formatDate(userData.createdAt)}`}
                  </span>
                  <button
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                    className={`cursor-pointer flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-medium transition-all border ${isEditing
                      ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                      : 'bg-transparent text-black/40 dark:text-white/40 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:text-black/80 dark:hover:text-white/80'
                      }`}>
                    {isEditing ? <><FiCheck size={12} /> Save</> : <><FiEdit2 size={10} /> Edit</>}
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-medium text-black/40 dark:text-white/30 ml-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData?.name}
                      onChange={(e) => setUserData(prev => (!prev ? null : { ...prev, name: e.target.value }))}
                      placeholder="Enter your name"
                      className="w-full bg-transparent border-b border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 py-2 text-2xl font-light text-black/90 dark:text-white/90 placeholder-black/20 dark:placeholder-white/20 focus:outline-none focus:border-black/50 dark:focus:border-white/50 transition-colors" />
                  ) : (
                    <h2 className="py-2 text-2xl font-light text-black/90 dark:text-white/90 border-b border-transparent">
                      {userData?.name || 'Unknown'}
                    </h2>
                  )}
                </div>
                {(userData?.role || isEditing) && <div className="flex flex-col gap-2 relative">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-medium text-black/40 dark:text-white/30 ml-1">Primary Role</label>
                  {isEditing ? (
                    <button
                      onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                      className="w-full flex items-center justify-between bg-transparent border-b border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 py-2 text-lg font-light text-black/80 dark:text-white/80 transition-colors focus:outline-none text-left">
                      {userData?.role}
                      <FiChevronDown size={16} className={`transition-transform duration-300 opacity-50 ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <p className="py-2 text-lg font-light text-black/60 dark:text-white/60 border-b border-transparent">
                      {userData?.role}
                    </p>
                  )}
                  <AnimatePresence>
                    {isEditing && isRoleDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-full mt-2 py-2 bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-neutral-900 rounded-2xl shadow-xl z-20 flex flex-col">
                        {roles.map(r => (
                          <button
                            key={r}
                            onClick={() => { setUserData(prev => (!prev ? null : { ...prev, role: r })); setIsRoleDropdownOpen(false); }}
                            className={`px-5 py-3 text-sm font-light text-left transition-colors ${userData?.role === r ? 'bg-black/3 dark:bg-white/3 text-black dark:text-white' : 'text-black/60 dark:text-white/60 hover:bg-black/2 dark:hover:bg-white/2'}`}>
                            {r}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>}
              </div>
            </motion.section>
            {/* ================= FOCUS SUMMARY ================= */}
            <motion.section variants={itemVariants} className="flex flex-col gap-5">
              <h3 className="text-[9px] tracking-[0.3em] uppercase text-black/40 dark:text-white/30 font-medium ml-1">Focus Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="p-5 rounded-3xl bg-black/2 dark:bg-[#080808] border border-black/3 dark:border-white/2 flex flex-col gap-4 hover:border-black/6 dark:hover:border-white/5 transition-colors cursor-default">
                    <div className="text-black/30 dark:text-white/20"><stat.icon size={16} /></div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/30">{stat.label}</span>
                      <span className="text-2xl font-light text-black/80 dark:text-white/80">{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
            {/* ================= APPEARANCE & MOTIVATION ================= */}
            <motion.section variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-10 border-t border-black/4 dark:border-white/3">
              <div className="flex flex-col gap-4 shrink-0">
                <h3 className="text-[9px] tracking-[0.3em] uppercase text-black/40 dark:text-white/30 font-medium ml-1">Appearance</h3>
                <div className={`flex items-center p-1 rounded-full w-fit border transition-colors duration-300 ${isEditing ? 'bg-black/3 dark:bg-white/3 border-black/5 dark:border-white/2' : 'bg-transparent border-transparent'}`}>
                  <button
                    onClick={() => { isEditing && setUserData(prev => (!prev ? prev : { ...prev, theme: 'light' })); localStorage.setItem("theme", "light"); }}
                    disabled={!isEditing}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-[9px] uppercase tracking-widest font-medium transition-all
                      ${userData?.theme === 'light'
                        ? 'bg-white text-black shadow-sm dark:bg-[#1a1a1a] dark:text-white'
                        : 'text-black/40 dark:text-white/40'
                      }
                      ${!isEditing && userData?.theme !== 'light' ? 'opacity-30 cursor-default' : ''}
                      ${isEditing && userData?.theme !== 'light' ? 'hover:text-black/70 dark:hover:text-white/70 cursor-pointer' : ''}
                    `}>
                    <FiSun size={12} /> Light
                  </button>
                  <button
                    onClick={() => { isEditing && setUserData(prev => (!prev ? prev : { ...prev, theme: 'dark' })); localStorage.setItem("theme", "dark"); }}
                    disabled={!isEditing}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-[9px] uppercase tracking-widest font-medium transition-all
                      ${userData?.theme === 'dark'
                        ? 'bg-[#1a1a1a] text-white shadow-sm dark:bg-white dark:text-black'
                        : 'text-black/40 dark:text-white/40'}
                      ${!isEditing && userData?.theme !== 'dark' ? 'opacity-30 cursor-default' : ''}
                      ${isEditing && userData?.theme !== 'dark' ? 'hover:text-black/70 dark:hover:text-white/70 cursor-pointer' : ''}`}>
                    <FiMoon size={12} /> Dark
                  </button>
                </div>
              </div>
            </motion.section>
            {/* ================= ACCOUNT ACTIONS ================= */}
            <motion.section variants={itemVariants} className="pt-6 flex items-center justify-between">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-black/70 dark:text-white/70 transition-colors text-[10px] uppercase tracking-widest font-medium">
                <FiLogOut size={14} /> Log Out
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-[9px] uppercase tracking-[0.2em] font-medium text-black/30 hover:text-red-500/80 dark:text-neutral-500 dark:hover:text-red-400/80 transition-colors px-2">
                Delete Account
              </button>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}