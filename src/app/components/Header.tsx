import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Users, Menu, LogIn, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { AuthModal } from './AuthModal';
import { UserMenu } from './UserMenu';
import { GlobalSearch } from './GlobalSearch';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { isLoggedIn, user, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Centered Container with max-width */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1400px] px-6 lg:px-8">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 gap-6">
            {/* Logo - Left aligned */}
            <Link to="/" className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="w-6 h-6 text-white" />
              </motion.div>
              <div className="hidden md:block">
                <motion.div 
                  className="text-xl font-semibold text-gray-900"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span
                    className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto]"
                    animate={{
                      backgroundPosition: ["0% center", "200% center", "0% center"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    CiviAgora
                  </motion.span>
                </motion.div>
                <motion.div 
                  className="text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Plateforme citoyenne
                </motion.div>
              </div>
            </Link>

            {/* Navigation principale - Center aligned */}
            <nav className="hidden lg:flex items-center justify-center gap-1">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50/50 text-center whitespace-nowrap text-[15px]">
                {t('nav.home')}
              </Link>
              <Link to="/consultations" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50/50 text-center whitespace-nowrap text-[15px]">
                {t('nav.consultations')}
              </Link>
              <Link to="/assemblies" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50/50 text-center whitespace-nowrap text-[15px]">
                {t('nav.assemblies')}
              </Link>
              <Link to="/petitions" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50/50 text-center whitespace-nowrap text-[15px]">
                {t('nav.petitions')}
              </Link>
              <Link to="/conferences" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50/50 text-center whitespace-nowrap text-[15px]">
                {t('nav.conferences')}
              </Link>
              <Link to="/votes" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50/50 text-center whitespace-nowrap text-[15px]">
                {t('nav.votes')}
              </Link>
              <Link to="/themes" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50/50 text-center whitespace-nowrap text-[15px]">
                {t('nav.themes')}
              </Link>
            </nav>

            {/* Actions - Right aligned */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-blue-50/50 hover:bg-blue-100/50 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline">{language === 'fr' ? 'Rechercher' : language === 'de' ? 'Suchen' : 'Search'}</span>
                <kbd className="hidden xl:inline-block px-2 py-0.5 text-xs bg-white border border-gray-300 rounded">
                  Ctrl+K
                </kbd>
              </button>

              {/* Search Icon (Mobile) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-blue-50/50"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              {/* Language Selector */}
              <Select value={language} onValueChange={(value) => setLanguage(value as 'fr' | 'de' | 'en')}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">FR</SelectItem>
                  <SelectItem value="de">DE</SelectItem>
                  <SelectItem value="en">EN</SelectItem>
                </SelectContent>
              </Select>

              {/* Auth Button or User Menu */}
              {isLoggedIn && user ? (
                <div className="hidden md:block">
                  <UserMenu
                    userName={`${user.firstName} ${user.lastName}`}
                    userEmail={user.email}
                    onLogout={logout}
                  />
                </div>
              ) : (
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <LogIn className="w-4 h-4" />
                  {language === 'fr' && 'Connexion'}
                  {language === 'de' && 'Anmelden'}
                  {language === 'en' && 'Login'}
                </Button>
              )}

              {/* Mobile menu button */}
              <button className="lg:hidden p-2 rounded-lg hover:bg-blue-50/50">
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
      />

      {/* Global Search */}
      <GlobalSearch
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />
    </header>
  );
}