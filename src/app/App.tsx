import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { ThemesPage } from './pages/ThemesPage';
import { ThemeDetailPage } from './pages/ThemeDetailPage';
import { PetitionsPage } from './pages/PetitionsPage';
import { VotesPage } from './pages/VotesPage';
import { AssembliesPage } from './pages/AssembliesPage';
import { ConferencesPage } from './pages/ConferencesPage';
import { ConsultationsPage } from './pages/ConsultationsPage';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/themes" element={<ThemesPage />} />
              <Route path="/themes/:themeId" element={<ThemeDetailPage />} />
              <Route path="/petitions" element={<PetitionsPage />} />
              <Route path="/votes" element={<VotesPage />} />
              <Route path="/assemblies" element={<AssembliesPage />} />
              <Route path="/conferences" element={<ConferencesPage />} />
              <Route path="/consultations" element={<ConsultationsPage />} />
              <Route path="/profile" element={<PlaceholderPage title="Mon Profil" />} />
            </Routes>
          </main>
          <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-600 text-sm">
                <p>© 2025 DemoPart - Plateforme de Démocratie Participative</p>
                <p className="mt-2">Conçu pour les collectivités et leurs citoyens</p>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

// Placeholder component for pages not yet implemented
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl mb-4 text-gray-900">{title}</h1>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-lg text-blue-900">
          Cette page est en cours de développement. Revenez bientôt !
        </p>
        <p className="text-sm text-blue-700 mt-2">
          La plateforme comprendra des fonctionnalités complètes pour les {title.toLowerCase()}.
        </p>
      </div>
    </div>
  );
}