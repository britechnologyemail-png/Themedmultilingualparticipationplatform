import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import { MapPin, Plus, Search, Edit, Trash2, Map } from 'lucide-react';
import { TerritoryElementDialog } from '../components/dialogs/OrganizationDialogs';
import { toast } from 'sonner';

interface TerritoryElement {
  id: string;
  name: string;
  type: 'street' | 'avenue' | 'park' | 'square';
  description?: string;
  createdAt: string;
}

export function TerritoryManagement() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState<TerritoryElement | null>(null);

  const [elements, setElements] = useState<TerritoryElement[]>([
    {
      id: '1',
      name: 'Rue de la Croix-Rouge',
      type: 'street',
      description: 'Rue principale du centre-ville',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Avenue de France',
      type: 'avenue',
      description: 'Grande avenue reliant le lac au centre',
      createdAt: '2024-01-16'
    },
    {
      id: '3',
      name: 'Parc des Bastions',
      type: 'park',
      description: 'Grand parc public historique',
      createdAt: '2024-01-17'
    },
    {
      id: '4',
      name: 'Place de Neuve',
      type: 'square',
      description: 'Place culturelle majeure',
      createdAt: '2024-01-18'
    },
    {
      id: '5',
      name: 'Rue du Rhône',
      type: 'street',
      description: 'Rue commerçante principale',
      createdAt: '2024-01-19'
    },
    {
      id: '6',
      name: 'Jardin Anglais',
      type: 'park',
      description: 'Jardin public au bord du lac',
      createdAt: '2024-01-20'
    },
    {
      id: '7',
      name: 'Avenue Giuseppe-Motta',
      type: 'avenue',
      description: 'Avenue bordant le lac Léman',
      createdAt: '2024-01-21'
    },
    {
      id: '8',
      name: 'Place du Bourg-de-Four',
      type: 'square',
      description: 'Place historique de la vieille ville',
      createdAt: '2024-01-22'
    }
  ]);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      street: language === 'fr' ? 'Rue' : language === 'de' ? 'Straße' : 'Street',
      avenue: language === 'fr' ? 'Avenue' : language === 'de' ? 'Allee' : 'Avenue',
      park: language === 'fr' ? 'Parc / Jardin' : language === 'de' ? 'Park / Garten' : 'Park / Garden',
      square: language === 'fr' ? 'Place' : language === 'de' ? 'Platz' : 'Square'
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      street: 'bg-blue-100 text-blue-700 border-blue-200',
      avenue: 'bg-purple-100 text-purple-700 border-purple-200',
      park: 'bg-green-100 text-green-700 border-green-200',
      square: 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const filteredElements = elements.filter((element) => {
    const matchesSearch = element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         element.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || element.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAdd = (newElement: any) => {
    const element: TerritoryElement = {
      ...newElement,
      id: `${elements.length + 1}`,
      createdAt: new Date().toISOString()
    };
    setElements([...elements, element]);
  };

  const handleEdit = (updatedElement: any) => {
    setElements(elements.map(el => 
      el.id === selectedElement?.id ? { ...el, ...updatedElement } : el
    ));
    setSelectedElement(null);
  };

  const handleDelete = () => {
    if (selectedElement) {
      setElements(elements.filter(el => el.id !== selectedElement.id));
      toast.success('Élément supprimé avec succès');
      setSelectedElement(null);
      setDeleteDialogOpen(false);
    }
  };

  const openEditDialog = (element: TerritoryElement) => {
    setSelectedElement(element);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (element: TerritoryElement) => {
    setSelectedElement(element);
    setDeleteDialogOpen(true);
  };

  // Calculate statistics
  const stats = {
    total: elements.length,
    streets: elements.filter(e => e.type === 'street').length,
    avenues: elements.filter(e => e.type === 'avenue').length,
    parks: elements.filter(e => e.type === 'park').length,
    squares: elements.filter(e => e.type === 'square').length
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {language === 'fr' ? 'Gestion du territoire' :
             language === 'de' ? 'Gebietsverwaltung' :
             'Territory Management'}
          </h1>
          <p className="text-gray-600">
            {language === 'fr' ? 'Gérez les rues, avenues et espaces publics de votre territoire' :
             language === 'de' ? 'Verwalten Sie die Straßen, Alleen und öffentlichen Plätze Ihres Gebiets' :
             'Manage the streets, avenues and public spaces of your territory'}
          </p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          {language === 'fr' ? 'Ajouter' : language === 'de' ? 'Hinzufügen' : 'Add'}
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Map className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Rues' : language === 'de' ? 'Straßen' : 'Streets'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{stats.streets}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Avenues' : language === 'de' ? 'Alleen' : 'Avenues'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{stats.avenues}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Parcs' : language === 'de' ? 'Parks' : 'Parks'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{stats.parks}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Places' : language === 'de' ? 'Plätze' : 'Squares'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{stats.squares}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={language === 'fr' ? 'Rechercher...' : language === 'de' ? 'Suchen...' : 'Search...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {language === 'fr' ? 'Tous les types' : language === 'de' ? 'Alle Typen' : 'All types'}
                </SelectItem>
                <SelectItem value="street">
                  {language === 'fr' ? 'Rues' : language === 'de' ? 'Straßen' : 'Streets'}
                </SelectItem>
                <SelectItem value="avenue">
                  {language === 'fr' ? 'Avenues' : language === 'de' ? 'Alleen' : 'Avenues'}
                </SelectItem>
                <SelectItem value="park">
                  {language === 'fr' ? 'Parcs / Jardins' : language === 'de' ? 'Parks / Gärten' : 'Parks / Gardens'}
                </SelectItem>
                <SelectItem value="square">
                  {language === 'fr' ? 'Places' : language === 'de' ? 'Plätze' : 'Squares'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Elements Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {language === 'fr' ? 'Éléments du territoire' :
               language === 'de' ? 'Gebietselemente' :
               'Territory Elements'}
            </span>
            <Badge variant="outline">{filteredElements.length} éléments</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {language === 'fr' ? 'Nom' : language === 'de' ? 'Name' : 'Name'}
                </TableHead>
                <TableHead>
                  {language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'}
                </TableHead>
                <TableHead>
                  {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                </TableHead>
                <TableHead>
                  {language === 'fr' ? 'Créé le' : language === 'de' ? 'Erstellt am' : 'Created'}
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredElements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    {language === 'fr' ? 'Aucun élément trouvé' :
                     language === 'de' ? 'Keine Elemente gefunden' :
                     'No elements found'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredElements.map((element) => (
                  <TableRow key={element.id}>
                    <TableCell className="font-medium">{element.name}</TableCell>
                    <TableCell>
                      <Badge className={`${getTypeColor(element.type)} border`}>
                        {getTypeLabel(element.type)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                      {element.description || '-'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(element.createdAt).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(element)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteDialog(element)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <TerritoryElementDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleAdd}
      />

      {/* Edit Dialog */}
      {selectedElement && (
        <TerritoryElementDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          element={selectedElement}
          onSave={handleEdit}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'fr' ? 'Confirmer la suppression' :
               language === 'de' ? 'Löschen bestätigen' :
               'Confirm Deletion'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'fr' 
                ? `Êtes-vous sûr de vouloir supprimer "${selectedElement?.name}" ? Cette action est irréversible.`
                : language === 'de'
                ? `Sind Sie sicher, dass Sie "${selectedElement?.name}" löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`
                : `Are you sure you want to delete "${selectedElement?.name}"? This action cannot be undone.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              {language === 'fr' ? 'Supprimer' : language === 'de' ? 'Löschen' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
