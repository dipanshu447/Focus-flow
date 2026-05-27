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
import { toast } from 'sonner';

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
      if(userData) localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Profile updated");
      if (userData?.theme) setTheme(userData.theme);
      setIsEditing(false);
      setIsRoleDropdownOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    toast.success("Logged out successfully");
    navigate("/signup");
  };

  const handleDeleteAccount = async () => {
    try {
      const data = await deleteAccount();

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      console.log(data);
      toast.success("Account Deleted successfully");

      setShowDeleteModal(false);

      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete Account");  
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
    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 grayscale">
      <FiTrash2 size={20} />
    </div>
  );

  return (
    <div className="h-screen w-full overflow-hidden text-[#111] dark:text-[#e5e5e5] font-sans transition-colors duration-500 selection:bg-black/10 dark:selection:bg-white/20 mt-10 sm:mt-0">
      <AnimatePresence>
        {showLogoutModal && (
          <ConfirmationModal
            modalTitle="Sign Out?"
            modalSubtext="Are you sure you want to step away from your focus workspace?"
            leftBtntext="Cancel"
            rightBtntext="Sign Out"
            leftBtnfunc={() => setShowLogoutModal(false)}
            rightBtnfunc={handleLogout}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showDeleteModal && (
          <ConfirmationModal
            ModalIcon={deleteModalIcon}
            modalTitle="Delete Identity?"
            modalSubtext="This action is irreversible. All your focus history, objectives, and consistency data will be permanently erased."
            leftBtntext="Cancel"
            rightBtntext="Delete Forever"
            leftBtnfunc={() => setShowDeleteModal(false)}
            rightBtnfunc={handleDeleteAccount}
          />)}
      </AnimatePresence>
      <div className="h-full w-full flex flex-col overflow-y-auto custom-scrollbar">
        <div className="flex-1 w-full max-w-5xl px-6 py-12 md:px-12 lg:px-24 mx-auto flex flex-col gap-10 md:gap-14 pb-24">
          <motion.header variants={pageVariants} initial="hidden" animate="visible" className="flex flex-col gap-3">
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-light tracking-tight text-black/90 dark:text-white/90">
              Identity
            </motion.h1>
            <motion.p variants={itemVariants} className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-black/50 dark:text-white/40 font-bold">
              Your focus signature.
            </motion.p>
          </motion.header>
          <motion.div variants={pageVariants} initial="hidden" animate="visible" className="flex flex-col gap-16">
            <motion.section variants={itemVariants} className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-14 items-start">
              <div className="flex flex-col gap-5 shrink-0 self-center md:self-start">
                <div className="size-24 md:size-32 lg:size-36 rounded-full bg-linear-to-br from-neutral-200 to-white dark:from-neutral-900 dark:to-black border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group">
                  {userData?.avatarUrl ? (
                    <img
                      src={userData.avatarUrl}
                      alt="Profile"
                      className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-4xl md:text-5xl lg:text-6xl font-light text-black/50 dark:text-white/20 uppercase select-none">
                      {userData?.name ? userData.name.charAt(0) : '?'}
                    </span>
                  )}
                  <AnimatePresence>
                    {isEditing && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/40 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
                        <FiCamera size={24} className="text-black/80 dark:text-white/80" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex flex-col gap-6 md:gap-8 w-full max-w-md pt-0 md:pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-black/50 dark:text-white/30">
                    {userData?.createdAt && `Member since ${formatDate(userData.createdAt)}`}
                  </span>
                  <button
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                    className={`cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 sm:px-4 sm:py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border ${isEditing
                      ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                      : 'bg-neutral-200 dark:bg-neutral-900 text-black/60 dark:text-white/60 border-transparent hover:bg-black/10 dark:hover:bg-white/10 hover:text-black/90 dark:hover:text-white/90'
                      }`}>
                    {isEditing ? <><FiCheck size={12} /> Save</> : <><FiEdit2 size={10} /> Edit Profile</>}
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-black/50 dark:text-white/40 ml-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData?.name || ''}
                      onChange={(e) => setUserData(prev => (!prev ? null : { ...prev, name: e.target.value }))}
                      placeholder="Enter your name"
                      className="w-full bg-transparent border-b border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 py-2 text-xl md:text-2xl font-light text-black/90 dark:text-white/90 placeholder-black/20 dark:placeholder-white/20 focus:outline-none focus:border-black/50 dark:focus:border-white/50 transition-colors" />
                  ) : (
                    <h2 className="py-2 text-xl md:text-2xl font-light text-black/90 dark:text-white/90 border-b border-transparent truncate">
                      {userData?.name || 'Unknown'}
                    </h2>
                  )}
                </div>
                {(userData?.role || isEditing) && (
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-black/50 dark:text-white/40 ml-1">Primary Role</label>
                    {isEditing ? (
                      <button
                        onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                        className="w-full flex items-center justify-between bg-transparent border-b border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 py-2 text-base md:text-lg font-light text-black/80 dark:text-white/80 transition-colors focus:outline-none text-left">
                        {userData?.role || 'Select a role'}
                        <FiChevronDown size={16} className={`transition-transform duration-300 opacity-50 ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <p className="py-2 text-base md:text-lg font-light text-black/60 dark:text-white/60 border-b border-transparent">
                        {userData?.role || 'Not specified'}
                      </p>
                    )}
                    <AnimatePresence>
                      {isEditing && isRoleDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-full mt-2 py-2 bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-2xl shadow-xl z-20 flex flex-col">
                          {roles.map(r => (
                            <button
                              key={r}
                              onClick={() => { setUserData(prev => (!prev ? null : { ...prev, role: r })); setIsRoleDropdownOpen(false); }}
                              className={`px-5 py-3 text-sm font-light text-left transition-colors ${userData?.role === r
                                ? 'bg-black/5 dark:bg-white/10 text-black dark:text-white font-medium'
                                : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5'
                                }`}>
                              {r}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.section>
            <motion.section variants={itemVariants} className="flex flex-col gap-5">
              <h3 className="text-[9px] tracking-[0.3em] uppercase text-black/50 dark:text-white/40 font-bold ml-1">Focus Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="p-5 md:p-6 rounded-3xl bg-neutral-100 dark:bg-neutral-950 border border-black/5 dark:border-white/5 flex flex-col gap-4 hover:border-black/10 dark:hover:border-white/10 transition-colors cursor-default">
                    <div className="text-black/50 dark:text-white/40"><stat.icon size={18} /></div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-black/50 dark:text-white/40">{stat.label}</span>
                      <span className="text-2xl md:text-3xl font-light tracking-tight text-black/90 dark:text-white/90">{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
            <motion.section variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pt-10 border-t border-black/5 dark:border-white/5">
              <div className="flex flex-col gap-4 shrink-0">
                <h3 className="text-[9px] tracking-[0.3em] uppercase text-black/50 dark:text-white/40 font-bold ml-1">Appearance</h3>
                <div className={`flex items-center p-1.5 rounded-full w-fit border transition-colors duration-300 ${isEditing ? 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5' : 'bg-transparent border-transparent'}`}>
                  <button
                    onClick={() => { isEditing && setUserData(prev => (!prev ? prev : { ...prev, theme: 'light' })); localStorage.setItem("theme", "light"); }}
                    disabled={!isEditing}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest font-bold transition-all
                      ${userData?.theme === 'light'
                        ? 'bg-white text-black shadow-md dark:bg-white dark:text-black border border-black/5 dark:border-white/10'
                        : 'text-black/50 dark:text-white/40 border border-transparent'
                      }
                      ${!isEditing && userData?.theme !== 'light' ? 'opacity-60 cursor-default' : ''}
                      ${isEditing && userData?.theme !== 'light' ? 'hover:text-black/70 dark:hover:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer' : ''}
                    `}>
                    <FiSun size={14} className="shrink-0" /> Light
                  </button>
                  <button
                    onClick={() => { isEditing && setUserData(prev => (!prev ? prev : { ...prev, theme: 'dark' })); localStorage.setItem("theme", "dark"); }}
                    disabled={!isEditing}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest font-bold transition-all
                      ${userData?.theme === 'dark'
                        ? 'bg-black text-white shadow-md dark:bg-[#1a1a1a] dark:text-white border border-black/10 dark:border-white/10'
                        : 'text-black/50 dark:text-white/40 border border-transparent'
                      }
                      ${!isEditing && userData?.theme !== 'dark' ? 'opacity-60 cursor-default' : ''}
                      ${isEditing && userData?.theme !== 'dark' ? 'hover:text-black/70 dark:hover:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer' : ''}
                    `}>
                    <FiMoon size={14} className="shrink-0" /> Dark
                  </button>
                </div>
              </div>
            </motion.section>
            <motion.section variants={itemVariants} className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-0">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center justify-center sm:justify-start gap-3 px-6 py-3.5 sm:px-5 sm:py-2.5 rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors text-[10px] uppercase tracking-[0.2em] font-bold w-full sm:w-auto cursor-pointer">
                <FiLogOut size={14} /> Log Out
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-[9px] uppercase tracking-[0.2em] font-bold text-black/60 hover:text-black dark:text-white/50 dark:hover:text-white transition-colors px-2 py-3 sm:py-2 w-full sm:w-auto text-center cursor-pointer">
                Delete Account
              </button>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}