import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { CheckCircle, AlertTriangle, MessageSquare, Shield } from 'lucide-react';

interface ModerationGuideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'fr' | 'de' | 'en';
}

export function ModerationGuideDialog({ open, onOpenChange, language }: ModerationGuideDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-2xl">
                {language === 'fr' ? 'Guide de modération' : 
                 language === 'de' ? 'Moderationsleitfaden' : 
                 'Moderation Guide'}
              </DialogTitle>
              <DialogDescription>
                {language === 'fr' ? 'Meilleures pratiques pour une modération efficace et équitable' :
                 language === 'de' ? 'Best Practices für eine effektive und faire Moderation' :
                 'Best practices for effective and fair moderation'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Section 1: Principes généraux */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              {language === 'fr' ? 'Principes généraux' :
               language === 'de' ? 'Allgemeine Prinzipien' :
               'General Principles'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 pl-7">
              <li className="list-disc">
                {language === 'fr' ? 'Restez objectif et impartial dans toutes vos décisions' :
                 language === 'de' ? 'Bleiben Sie bei allen Entscheidungen objektiv und unparteiisch' :
                 'Remain objective and impartial in all your decisions'}
              </li>
              <li className="list-disc">
                {language === 'fr' ? 'Appliquez les règles de manière cohérente et équitable' :
                 language === 'de' ? 'Wenden Sie die Regeln konsequent und fair an' :
                 'Apply rules consistently and fairly'}
              </li>
              <li className="list-disc">
                {language === 'fr' ? 'Privilégiez la pédagogie plutôt que la sanction' :
                 language === 'de' ? 'Bevorzugen Sie Pädagogik statt Bestrafung' :
                 'Prioritize education over punishment'}
              </li>
            </ul>
          </div>

          {/* Section 2: Processus de modération */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              {language === 'fr' ? 'Processus de modération' :
               language === 'de' ? 'Moderationsprozess' :
               'Moderation Process'}
            </h3>
            <ol className="space-y-2 text-sm text-gray-700 pl-7">
              <li className="list-decimal">
                <strong>
                  {language === 'fr' ? 'Examiner' :
                   language === 'de' ? 'Prüfen' :
                   'Review'}:
                </strong>{' '}
                {language === 'fr' ? 'Lisez attentivement le contenu et son contexte' :
                 language === 'de' ? 'Lesen Sie den Inhalt und seinen Kontext sorgfältig' :
                 'Carefully read the content and its context'}
              </li>
              <li className="list-decimal">
                <strong>
                  {language === 'fr' ? 'Évaluer' :
                   language === 'de' ? 'Bewerten' :
                   'Evaluate'}:
                </strong>{' '}
                {language === 'fr' ? 'Vérifiez si le contenu respecte les règles de la plateforme' :
                 language === 'de' ? 'Prüfen Sie, ob der Inhalt den Plattformregeln entspricht' :
                 'Check if the content complies with platform rules'}
              </li>
              <li className="list-decimal">
                <strong>
                  {language === 'fr' ? 'Décider' :
                   language === 'de' ? 'Entscheiden' :
                   'Decide'}:
                </strong>{' '}
                {language === 'fr' ? 'Prenez une décision motivée (approuver, rejeter, ou signaler)' :
                 language === 'de' ? 'Treffen Sie eine begründete Entscheidung (genehmigen, ablehnen oder melden)' :
                 'Make a reasoned decision (approve, reject, or flag)'}
              </li>
              <li className="list-decimal">
                <strong>
                  {language === 'fr' ? 'Documenter' :
                   language === 'de' ? 'Dokumentieren' :
                   'Document'}:
                </strong>{' '}
                {language === 'fr' ? 'Ajoutez un commentaire expliquant votre décision, surtout en cas de rejet' :
                 language === 'de' ? 'Fügen Sie einen Kommentar hinzu, der Ihre Entscheidung erklärt, insbesondere bei Ablehnung' :
                 'Add a comment explaining your decision, especially in case of rejection'}
              </li>
            </ol>
          </div>

          {/* Section 3: Situations courantes */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {language === 'fr' ? 'Situations courantes' :
               language === 'de' ? 'Häufige Situationen' :
               'Common Situations'}
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium text-sm text-green-900">
                  {language === 'fr' ? '✓ Approuver lorsque :' :
                   language === 'de' ? '✓ Genehmigen wenn:' :
                   '✓ Approve when:'}
                </p>
                <ul className="text-xs text-green-800 mt-1 pl-4 space-y-1">
                  <li className="list-disc">
                    {language === 'fr' ? 'Le contenu est constructif et respectueux' :
                     language === 'de' ? 'Der Inhalt ist konstruktiv und respektvoll' :
                     'Content is constructive and respectful'}
                  </li>
                  <li className="list-disc">
                    {language === 'fr' ? 'Il contribue positivement au débat' :
                     language === 'de' ? 'Er trägt positiv zur Debatte bei' :
                     'It contributes positively to the debate'}
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium text-sm text-red-900">
                  {language === 'fr' ? '✗ Rejeter lorsque :' :
                   language === 'de' ? '✗ Ablehnen wenn:' :
                   '✗ Reject when:'}
                </p>
                <ul className="text-xs text-red-800 mt-1 pl-4 space-y-1">
                  <li className="list-disc">
                    {language === 'fr' ? 'Contenu offensant, haineux ou discriminatoire' :
                     language === 'de' ? 'Beleidigender, hasserfüllter oder diskriminierender Inhalt' :
                     'Offensive, hateful or discriminatory content'}
                  </li>
                  <li className="list-disc">
                    {language === 'fr' ? 'Informations fausses ou trompeuses' :
                     language === 'de' ? 'Falsche oder irreführende Informationen' :
                     'False or misleading information'}
                  </li>
                  <li className="list-disc">
                    {language === 'fr' ? 'Spam ou contenu publicitaire' :
                     language === 'de' ? 'Spam oder Werbeinhalte' :
                     'Spam or advertising content'}
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="font-medium text-sm text-amber-900">
                  {language === 'fr' ? '⚠ Signaler pour escalade lorsque :' :
                   language === 'de' ? '⚠ Zur Eskalation melden wenn:' :
                   '⚠ Flag for escalation when:'}
                </p>
                <ul className="text-xs text-amber-800 mt-1 pl-4 space-y-1">
                  <li className="list-disc">
                    {language === 'fr' ? 'Le contenu est ambigu et nécessite un avis supplémentaire' :
                     language === 'de' ? 'Der Inhalt ist mehrdeutig und erfordert zusätzliche Meinung' :
                     'Content is ambiguous and requires additional review'}
                  </li>
                  <li className="list-disc">
                    {language === 'fr' ? 'Il pourrait enfreindre des lois (diffamation, menaces, etc.)' :
                     language === 'de' ? 'Er könnte Gesetze verletzen (Verleumdung, Drohungen usw.)' :
                     'It may violate laws (defamation, threats, etc.)'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4: Conseils */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-sm text-blue-900 mb-2">
              💡 {language === 'fr' ? 'Conseils pratiques' :
                   language === 'de' ? 'Praktische Tipps' :
                   'Practical Tips'}
            </h4>
            <ul className="text-xs text-blue-800 space-y-1 pl-4">
              <li className="list-disc">
                {language === 'fr' ? 'Traitez les contenus urgents en priorité' :
                 language === 'de' ? 'Behandeln Sie dringende Inhalte vorrangig' :
                 'Prioritize urgent content'}
              </li>
              <li className="list-disc">
                {language === 'fr' ? 'Utilisez les actions en masse pour gagner du temps' :
                 language === 'de' ? 'Verwenden Sie Massenaktionen, um Zeit zu sparen' :
                 'Use bulk actions to save time'}
              </li>
              <li className="list-disc">
                {language === 'fr' ? 'Restez cohérent avec les décisions précédentes' :
                 language === 'de' ? 'Bleiben Sie konsistent mit früheren Entscheidungen' :
                 'Stay consistent with previous decisions'}
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            {language === 'fr' ? 'Fermer' :
             language === 'de' ? 'Schließen' :
             'Close'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
