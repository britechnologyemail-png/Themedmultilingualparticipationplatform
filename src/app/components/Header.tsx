import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Users, Menu } from 'lucide-react';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-semibold text-gray-900">DemoPart</div>
              <div className="text-xs text-gray-500">Plateforme citoyenne</div>
            </div>
          </Link>

          {/* Navigation principale - Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/consultations" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('nav.consultations')}
            </Link>
            <Link to="/assemblies" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('nav.assemblies')}
            </Link>
            <Link to="/petitions" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('nav.petitions')}
            </Link>
            <Link to="/conferences" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('nav.conferences')}
            </Link>
            <Link to="/votes" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('nav.votes')}
            </Link>
            <Link to="/themes" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('nav.themes')}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
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

            {/* Profile Link */}
            <Link
              to="/profile"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Users className="w-4 h-4" />
              {t('nav.profile')}
            </Link>

            {/* Mobile menu button */}
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
