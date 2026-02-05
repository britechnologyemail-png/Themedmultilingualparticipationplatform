import React, { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Share2, Facebook, Twitter, Linkedin, Mail, Copy, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';

interface ShareButtonProps {
  title: string;
  description?: string;
  url?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  showLabel?: boolean;
}

export function ShareButton({
  title,
  description,
  url,
  variant = 'outline',
  size = 'default',
  className = '',
  showLabel = true,
}: ShareButtonProps) {
  const { language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Générer l'URL complète si non fournie
  const shareUrl = url || window.location.href;

  const handleShare = async (platform?: 'facebook' | 'twitter' | 'linkedin' | 'email') => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description || '');

    if (platform === 'facebook') {
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
    } else if (platform === 'twitter') {
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
    } else if (platform === 'linkedin') {
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
    } else if (platform === 'email') {
      const emailSubject = encodedTitle;
      const emailBody = encodeURIComponent(
        language === 'fr'
          ? `Bonjour,\n\nJe souhaite partager avec vous :\n\n${title}\n${description ? `\n${description}\n` : ''}\nVous pouvez consulter ici : ${shareUrl}\n\nCordialement`
          : language === 'de'
          ? `Hallo,\n\nIch möchte mit Ihnen teilen:\n\n${title}\n${description ? `\n${description}\n` : ''}\nSie können hier einsehen: ${shareUrl}\n\nMit freundlichen Grüßen`
          : `Hello,\n\nI would like to share with you:\n\n${title}\n${description ? `\n${description}\n` : ''}\nYou can view here: ${shareUrl}\n\nBest regards`
      );
      window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
      toast.success(
        language === 'fr' ? 'Client email ouvert' :
        language === 'de' ? 'E-Mail-Client geöffnet' :
        'Email client opened'
      );
    } else {
      // Copier le lien dans le presse-papiers
      await copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      // Essayer l'API native Clipboard d'abord
      await navigator.clipboard.writeText(text);
      toast.success(
        language === 'fr' ? 'Lien copié dans le presse-papiers' :
        language === 'de' ? 'Link in Zwischenablage kopiert' :
        'Link copied to clipboard',
        {
          description: text
        }
      );
    } catch (err) {
      // Méthode de fallback pour les navigateurs plus anciens
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          toast.success(
            language === 'fr' ? 'Lien copié dans le presse-papiers' :
            language === 'de' ? 'Link in Zwischenablage kopiert' :
            'Link copied to clipboard',
            {
              description: text
            }
          );
        } else {
          throw new Error('Copy command failed');
        }
      } catch (fallbackErr) {
        toast.error(
          language === 'fr' ? 'Impossible de copier le lien' :
          language === 'de' ? 'Link konnte nicht kopiert werden' :
          'Unable to copy link',
          {
            description: language === 'fr' ? `Copiez manuellement : ${text}` :
                        language === 'de' ? `Manuell kopieren: ${text}` :
                        `Copy manually: ${text}`
          }
        );
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  const getLabel = () => {
    if (!showLabel) return null;
    return language === 'fr' ? 'Partager' :
           language === 'de' ? 'Teilen' :
           'Share';
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={`gap-2 ${className}`}
        onClick={() => setIsDialogOpen(true)}
      >
        <Share2 className="w-4 h-4" />
        {getLabel()}
      </Button>

      {/* Dialog de partage */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-600" />
              {language === 'fr' ? 'Partager' :
               language === 'de' ? 'Teilen' :
               'Share'}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' ? 'Partagez ce contenu avec votre réseau' :
               language === 'de' ? 'Teilen Sie diesen Inhalt mit Ihrem Netzwerk' :
               'Share this content with your network'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {/* Titre et description du contenu */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
              {description && (
                <p className="text-sm text-gray-600">{description}</p>
              )}
            </div>

            {/* Options de partage sur les réseaux sociaux */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                {language === 'fr' ? 'Partager sur les réseaux sociaux' :
                 language === 'de' ? 'In sozialen Netzwerken teilen' :
                 'Share on social media'}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleShare('facebook');
                    setIsDialogOpen(false);
                  }}
                  className="gap-2 justify-start h-auto p-4"
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium">Facebook</div>
                    <div className="text-xs text-gray-500">
                      {language === 'fr' ? 'Partager sur Facebook' :
                       language === 'de' ? 'Auf Facebook teilen' :
                       'Share on Facebook'}
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    handleShare('twitter');
                    setIsDialogOpen(false);
                  }}
                  className="gap-2 justify-start h-auto p-4"
                >
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <div className="text-left">
                    <div className="font-medium">Twitter</div>
                    <div className="text-xs text-gray-500">
                      {language === 'fr' ? 'Partager sur Twitter' :
                       language === 'de' ? 'Auf Twitter teilen' :
                       'Share on Twitter'}
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    handleShare('linkedin');
                    setIsDialogOpen(false);
                  }}
                  className="gap-2 justify-start h-auto p-4"
                >
                  <Linkedin className="w-5 h-5 text-blue-700" />
                  <div className="text-left">
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-xs text-gray-500">
                      {language === 'fr' ? 'Partager sur LinkedIn' :
                       language === 'de' ? 'Auf LinkedIn teilen' :
                       'Share on LinkedIn'}
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    handleShare('email');
                    setIsDialogOpen(false);
                  }}
                  className="gap-2 justify-start h-auto p-4"
                >
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium">Email</div>
                    <div className="text-xs text-gray-500">
                      {language === 'fr' ? 'Partager par email' :
                       language === 'de' ? 'Per E-Mail teilen' :
                       'Share via email'}
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Copier le lien */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                {language === 'fr' ? 'Ou copier le lien' :
                 language === 'de' ? 'Oder Link kopieren' :
                 'Or copy link'}
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    copyToClipboard(shareUrl);
                    setIsDialogOpen(false);
                  }}
                  className="gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {language === 'fr' ? 'Copier' :
                   language === 'de' ? 'Kopieren' :
                   'Copy'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
