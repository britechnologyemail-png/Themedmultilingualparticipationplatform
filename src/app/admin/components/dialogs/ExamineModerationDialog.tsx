import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Textarea } from '../../../components/ui/textarea';
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  User,
  Calendar,
  FileText,
  Flag,
  TrendingUp,
  Users,
  AlertTriangle,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';
import type { 
  ModerationItemDTO, 
  ModerationStatus, 
  ModerationPriority, 
  ModerationContentType 
} from '../../../types';

interface ExamineModerationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: ModerationItemDTO | null;
  language: 'fr' | 'de' | 'en';
  onApprove: (itemId: string, comment?: string) => Promise<void>;
  onReject: (itemId: string, comment: string) => Promise<void>;
  isProcessing?: boolean;
}

export function ExamineModerationDialog({
  open,
  onOpenChange,
  item,
  language,
  onApprove,
  onReject,
  isProcessing = false
}: ExamineModerationDialogProps) {
  const [moderationComment, setModerationComment] = useState('');

  // Réinitialiser le commentaire quand la dialog se ferme ou qu'un nouvel item est sélectionné
  useEffect(() => {
    if (!open) {
      setModerationComment('');
    }
  }, [open]);

  if (!item) return null;

  const tLocal = (value: string | { fr: string; de: string; en: string }) => {
    if (typeof value === 'string') return value;
    return value[language] || value.fr || value.en;
  };

  const getPriorityBadge = (priority: ModerationPriority) => {
    const variants: Record<string, { label: string; color: string }> = {
      urgent: { 
        label: language === 'fr' ? 'Urgent' : language === 'de' ? 'Dringend' : 'Urgent', 
        color: 'bg-red-100 text-red-700 border-red-300' 
      },
      high: { 
        label: language === 'fr' ? 'Élevé' : language === 'de' ? 'Hoch' : 'High', 
        color: 'bg-orange-100 text-orange-700 border-orange-300' 
      },
      medium: { 
        label: language === 'fr' ? 'Moyen' : language === 'de' ? 'Mittel' : 'Medium', 
        color: 'bg-yellow-100 text-yellow-700 border-yellow-300' 
      },
      low: { 
        label: language === 'fr' ? 'Faible' : language === 'de' ? 'Niedrig' : 'Low', 
        color: 'bg-gray-100 text-gray-700 border-gray-300' 
      }
    };

    const variant = variants[priority] || variants.low;
    return (
      <Badge className={`${variant.color} border`}>
        {variant.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: ModerationStatus) => {
    const variants: Record<string, { label: string; color: string; icon: any }> = {
      pending: { 
        label: language === 'fr' ? 'En attente' : language === 'de' ? 'Ausstehend' : 'Pending', 
        color: 'bg-orange-100 text-orange-700 border-orange-300', 
        icon: Clock 
      },
      approved: { 
        label: language === 'fr' ? 'Approuvé' : language === 'de' ? 'Genehmigt' : 'Approved', 
        color: 'bg-green-100 text-green-700 border-green-300', 
        icon: CheckCircle 
      },
      rejected: { 
        label: language === 'fr' ? 'Rejeté' : language === 'de' ? 'Abgelehnt' : 'Rejected', 
        color: 'bg-red-100 text-red-700 border-red-300', 
        icon: XCircle 
      },
      flagged: { 
        label: language === 'fr' ? 'Signalé' : language === 'de' ? 'Gemeldet' : 'Flagged', 
        color: 'bg-amber-100 text-amber-700 border-amber-300', 
        icon: Flag 
      },
      escalated: { 
        label: language === 'fr' ? 'Escaladé' : language === 'de' ? 'Eskaliert' : 'Escalated', 
        color: 'bg-purple-100 text-purple-700 border-purple-300', 
        icon: TrendingUp 
      }
    };

    const variant = variants[status] || variants.pending;
    const Icon = variant.icon;
    
    return (
      <Badge className={`${variant.color} border flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: ModerationContentType) => {
    const types: Record<string, { label: string; color: string }> = {
      proposal: { 
        label: language === 'fr' ? 'Proposition' : language === 'de' ? 'Vorschlag' : 'Proposal', 
        color: 'bg-blue-100 text-blue-700 border-blue-300' 
      },
      comment: { 
        label: language === 'fr' ? 'Commentaire' : language === 'de' ? 'Kommentar' : 'Comment', 
        color: 'bg-purple-100 text-purple-700 border-purple-300' 
      },
      petition: { 
        label: language === 'fr' ? 'Pétition' : language === 'de' ? 'Petition' : 'Petition', 
        color: 'bg-cyan-100 text-cyan-700 border-cyan-300' 
      },
      signalement: { 
        label: language === 'fr' ? 'Signalement' : language === 'de' ? 'Meldung' : 'Report', 
        color: 'bg-red-100 text-red-700 border-red-300' 
      },
      annotation: { 
        label: language === 'fr' ? 'Annotation' : language === 'de' ? 'Anmerkung' : 'Annotation', 
        color: 'bg-green-100 text-green-700 border-green-300' 
      },
      poll_response: { 
        label: language === 'fr' ? 'Réponse sondage' : language === 'de' ? 'Umfrageantwort' : 'Poll response', 
        color: 'bg-pink-100 text-pink-700 border-pink-300' 
      },
      user_profile: { 
        label: language === 'fr' ? 'Profil utilisateur' : language === 'de' ? 'Benutzerprofil' : 'User profile', 
        color: 'bg-indigo-100 text-indigo-700 border-indigo-300' 
      }
    };

    const variant = types[type] || types.comment;
    return (
      <Badge className={`${variant.color} border`}>
        {variant.label}
      </Badge>
    );
  };

  const handleApprove = async () => {
    try {
      await onApprove(item.id, moderationComment || undefined);
      toast.success(
        language === 'fr' ? 'Contenu approuvé avec succès' :
        language === 'de' ? 'Inhalt erfolgreich genehmigt' :
        'Content approved successfully'
      );
      onOpenChange(false);
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de l\'approbation' :
        language === 'de' ? 'Fehler bei der Genehmigung' :
        'Error approving content'
      );
    }
  };

  const handleReject = async () => {
    if (!moderationComment.trim()) {
      toast.error(
        language === 'fr' ? 'Un commentaire est requis pour rejeter' :
        language === 'de' ? 'Ein Kommentar ist erforderlich zum Ablehnen' :
        'A comment is required to reject'
      );
      return;
    }

    try {
      await onReject(item.id, moderationComment);
      toast.success(
        language === 'fr' ? 'Contenu rejeté' :
        language === 'de' ? 'Inhalt abgelehnt' :
        'Content rejected'
      );
      onOpenChange(false);
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors du rejet' :
        language === 'de' ? 'Fehler bei der Ablehnung' :
        'Error rejecting content'
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <DialogTitle className="text-2xl">
              {language === 'fr' ? 'Examen de modération' :
               language === 'de' ? 'Moderationsprüfung' :
               'Moderation Review'}
            </DialogTitle>
          </div>
          <DialogDescription>
            {language === 'fr' ? 'Examinez le contenu et prenez une décision de modération' :
             language === 'de' ? 'Überprüfen Sie den Inhalt und treffen Sie eine Moderationsentscheidung' :
             'Review the content and make a moderation decision'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header with Author Info */}
          <div className="flex items-start justify-between pb-4 border-b">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {item.author.avatar ? (
                  <img 
                    src={item.author.avatar} 
                    alt={item.author.name} 
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.author.name}
                  </h3>
                  <p className="text-sm text-gray-600">{item.author.email}</p>
                  {item.author.warningsCount > 0 && (
                    <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>
                        {item.author.warningsCount} {language === 'fr' ? 'avertissement(s)' : 
                                                     language === 'de' ? 'Warnung(en)' : 
                                                     'warning(s)'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {new Date(item.createdAt).toLocaleString(
                  language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US',
                  {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              {getStatusBadge(item.status)}
              {getPriorityBadge(item.priority)}
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {language === 'fr' ? 'Type:' : language === 'de' ? 'Typ:' : 'Type:'}
              </span>
              {getTypeBadge(item.contentType)}
            </div>
            {item.processTitle && (
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {language === 'fr' ? 'Processus:' : language === 'de' ? 'Prozess:' : 'Process:'}
                </span>
                <Badge variant="outline" className="bg-gray-50">
                  {tLocal(item.processTitle)}
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-3">
            {item.content.title && (
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">
                  {tLocal(item.content.title)}
                </h4>
              </div>
            )}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                {tLocal(item.content.text)}
              </p>
            </div>
          </div>

          {/* Automated Flags */}
          {item.automatedFlags && item.automatedFlags.length > 0 && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-yellow-900 mb-2">
                    {language === 'fr' ? 'Détection automatique' :
                     language === 'de' ? 'Automatische Erkennung' :
                     'Automated detection'}
                  </p>
                  <div className="space-y-2">
                    {item.automatedFlags.map((flag, idx) => (
                      <div key={idx} className="text-sm">
                        <p className="font-medium text-yellow-800">
                          {tLocal(flag.ruleName)} ({flag.confidence}% {language === 'fr' ? 'confiance' : language === 'de' ? 'Vertrauen' : 'confidence'})
                        </p>
                        <p className="text-yellow-700">{tLocal(flag.reason)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Reports */}
          {item.reportsCount > 0 && (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-900">
                    {item.reportsCount} {language === 'fr' ? 'signalement(s) utilisateur' :
                                         language === 'de' ? 'Benutzermeldung(en)' :
                                         'user report(s)'}
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    {language === 'fr' ? 'Ce contenu a été signalé par des utilisateurs' :
                     language === 'de' ? 'Dieser Inhalt wurde von Benutzern gemeldet' :
                     'This content has been reported by users'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Moderation History */}
          {item.moderationHistory && item.moderationHistory.length > 0 && (
            <div className={`p-4 rounded-lg border ${
              item.status === 'approved' 
                ? 'bg-green-50 border-green-200'
                : item.status === 'rejected'
                ? 'bg-red-50 border-red-200'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-start gap-3">
                {item.status === 'approved' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : item.status === 'rejected' ? (
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <Clock className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-2">
                    {language === 'fr' ? 'Historique de modération' :
                     language === 'de' ? 'Moderationsverlauf' :
                     'Moderation history'}
                  </p>
                  <div className="space-y-2">
                    {item.moderationHistory.map((history, idx) => (
                      <div key={idx} className="text-sm">
                        <p className="font-medium text-gray-800">
                          {history.moderatorName} - {new Date(history.performedAt).toLocaleString(
                            language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US'
                          )}
                        </p>
                        {history.reason && (
                          <p className="text-gray-700 mt-1">{tLocal(history.reason)}</p>
                        )}
                        {history.comment && (
                          <p className="text-gray-600 italic mt-1">"{history.comment}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Moderation Action Section */}
          {item.status === 'pending' || item.status === 'flagged' ? (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Commentaire de modération' :
                   language === 'de' ? 'Moderationskommentar' :
                   'Moderation comment'}
                </label>
                <Textarea
                  value={moderationComment}
                  onChange={(e) => setModerationComment(e.target.value)}
                  placeholder={
                    language === 'fr' ? 'Ajoutez un commentaire expliquant votre décision (optionnel pour approbation, requis pour rejet)...' :
                    language === 'de' ? 'Fügen Sie einen Kommentar hinzu, der Ihre Entscheidung erklärt (optional für Genehmigung, erforderlich für Ablehnung)...' :
                    'Add a comment explaining your decision (optional for approval, required for rejection)...'
                  }
                  rows={4}
                  className="resize-none"
                />
              </div>

              {!moderationComment.trim() && (
                <p className="text-xs text-amber-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {language === 'fr' ? 'Un commentaire est requis pour rejeter une contribution' :
                   language === 'de' ? 'Ein Kommentar ist erforderlich, um einen Beitrag abzulehnen' :
                   'A comment is required to reject a contribution'}
                </p>
              )}
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-200">
              <div className={`p-4 rounded-lg flex items-center gap-3 ${
                item.status === 'approved'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                {item.status === 'approved' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'fr' ? `Contribution ${item.status === 'approved' ? 'approuvée' : 'rejetée'}` :
                     language === 'de' ? `Beitrag ${item.status === 'approved' ? 'genehmigt' : 'abgelehnt'}` :
                     `Contribution ${item.status === 'approved' ? 'approved' : 'rejected'}`}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === 'fr' ? 'Cette contribution a déjà été traitée' :
                     language === 'de' ? 'Dieser Beitrag wurde bereits bearbeitet' :
                     'This contribution has already been processed'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dialog Footer with Actions */}
        {(item.status === 'pending' || item.status === 'flagged') && (
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </Button>
            <Button
              onClick={handleReject}
              variant="destructive"
              disabled={!moderationComment.trim() || isProcessing}
              className="gap-2"
            >
              <XCircle className="w-4 h-4" />
              {language === 'fr' ? 'Rejeter' : language === 'de' ? 'Ablehnen' : 'Reject'}
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isProcessing}
              className="gap-2 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4" />
              {language === 'fr' ? 'Approuver' : language === 'de' ? 'Genehmigen' : 'Approve'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
