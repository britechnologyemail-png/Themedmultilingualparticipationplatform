import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Heart,
  Shield,
  FileText,
  CircleHelp,
  Settings
} from 'lucide-react';
import { DynamicFooterMenu } from './DynamicFooterMenu';

export function Footer() {
  const { t, language } = useLanguage();

  // Fonction de partage sur les réseaux sociaux
  const handleSocialShare = (platform: string) => {
    const currentUrl = window.location.href;
    const pageTitle = document.title;
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(pageTitle);

    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          '_blank',
          'width=600,height=400'
        );
        toast.success(
          language === 'fr' ? 'Partage sur Facebook ouvert' :
          language === 'de' ? 'Facebook-Freigabe geöffnet' :
          'Facebook share opened'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
          '_blank',
          'width=600,height=400'
        );
        toast.success(
          language === 'fr' ? 'Partage sur Twitter ouvert' :
          language === 'de' ? 'Twitter-Freigabe geöffnet' :
          'Twitter share opened'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
          '_blank',
          'width=600,height=400'
        );
        toast.success(
          language === 'fr' ? 'Partage sur LinkedIn ouvert' :
          language === 'de' ? 'LinkedIn-Freigabe geöffnet' :
          'LinkedIn share opened'
        );
        break;
      case 'instagram':
        // Instagram ne permet pas le partage direct via URL
        // On affiche un message invitant à partager manuellement
        toast.info(
          language === 'fr' ? '📸 Instagram : Partagez cette page manuellement dans votre story !' :
          language === 'de' ? '📸 Instagram: Teilen Sie diese Seite manuell in Ihrer Story!' :
          '📸 Instagram: Share this page manually in your story!',
          {
            duration: 5000
          }
        );
        break;
    }
  };

  const footerLinks = {
    platform: [
      { label: t('nav.consultations'), path: '/consultations' },
      { label: t('nav.legislativeConsultations'), path: '/legislative-consultations' },
      { label: t('nav.assemblies'), path: '/assemblies' },
      { label: t('nav.petitions'), path: '/petitions' },
      { label: t('nav.conferences'), path: '/conferences' },
      { label: t('nav.votes'), path: '/votes' },
      { label: language === 'fr' ? 'Signalements' : language === 'de' ? 'Meldungen' : 'Reports', path: '/signalements' },
      { label: language === 'fr' ? '🌟 Espace Jeunesse' : language === 'de' ? '🌟 Jugendraum' : '🌟 Youth Space', path: '/youth-space' },
      { label: t('nav.themes'), path: '/themes' },
    ],
    resources: [
      { label: t('footer.howItWorks'), path: '/how-it-works' },
      { label: t('footer.faq'), path: '/faq' },
      { label: t('footer.guides'), path: '/guides' },
      { label: t('footer.organizationProfile'), path: '/organization' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Dynamic Horizontal Menu */}
      <DynamicFooterMenu />
      
      {/* Centered Container with max-width */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1400px] px-6 lg:px-8 py-12">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* About Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <motion.h3 
                  className="text-2xl font-bold mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  CiviX
                </motion.h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                {t('footer.description')}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <a href="mailto:contact@civix.ch" className="hover:text-blue-400 transition-colors">
                    contact@civix.ch
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <a 
                    href="tel:+41000000000" 
                    className="hover:text-blue-300 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-blue-400" />
                    +32 2 000 00 00
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Bruxelles, Belgique</span>
                </div>
              </div>
            </motion.div>

            {/* Platform Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white mb-4">{t('footer.platform')}</h4>
              <ul className="space-y-2">
                {footerLinks.platform.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="text-sm hover:text-blue-400 transition-colors flex items-center gap-1 group"
                    >
                      <span className="w-0 h-0.5 bg-blue-400 group-hover:w-2 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white mb-4">{t('footer.resources')}</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.path} 
                      className="text-sm hover:text-blue-400 transition-colors flex items-center gap-1 group"
                    >
                      <span className="w-0 h-0.5 bg-blue-400 group-hover:w-2 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white mb-4">{t('footer.newsletter')}</h4>
              <div>
                <p className="text-sm text-gray-400 mb-4">
                  {language === 'fr' ? 'Restez informé de l\'actualité démocratique' : 
                   language === 'de' ? 'Bleiben Sie über demokratische Neuigkeiten informiert' : 
                   'Stay informed about democratic news'}
                </p>
                <Link to="/newsletter">
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder={t('footer.emailPlaceholder')}
                      className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      {t('footer.subscribe')}
                    </motion.button>
                  </div>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Social Links */}
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.button
                      key={social.label}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSocialShare(social.label.toLowerCase());
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Copyright */}
              <motion.div 
                className="text-sm text-gray-400 text-center md:text-right"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <p className="flex items-center justify-center md:justify-end gap-1">
                  © 2025 CiviX • {t('footer.madeWith')} 
                  <Heart className="w-4 h-4 text-red-500 inline animate-pulse" /> 
                  {t('footer.forCitizens')}
                </p>
                <p className="text-xs mt-1">{t('footer.rightsReserved')}</p>
              </motion.div>
            </div>

            {/* Trust Badges */}
            <motion.div 
              className="mt-6 pt-6 border-t border-gray-800 flex flex-wrap justify-center gap-6 text-xs text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-500" />
                <span>{t('footer.secureData')}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4 text-blue-500" />
                <span>{t('footer.gdprCompliant')}</span>
              </div>
              <div className="flex items-center gap-1">
                <CircleHelp className="w-4 h-4 text-purple-500" />
                <span>{t('footer.support247')}</span>
              </div>
              <Link 
                to="/admin"
                className="flex items-center gap-1 hover:text-gray-300 transition-colors group"
              >
                <Settings className="w-4 h-4 text-amber-500 group-hover:rotate-90 transition-transform duration-300" />
                <span>{t('footer.backOffice')}</span>
              </Link>
              <Link 
                to="/saas"
                className="flex items-center gap-1 hover:text-gray-300 transition-colors group"
              >
                <Settings className="w-4 h-4 text-blue-500 group-hover:rotate-90 transition-transform duration-300" />
                <span>{t('footer.saasBackOffice')}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}