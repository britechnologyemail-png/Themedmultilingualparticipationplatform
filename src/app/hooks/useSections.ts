/**
 * Sections Management - React Query Hooks
 * 
 * Custom hooks for managing platform sections using React Query.
 * Provides data fetching, caching, and mutation capabilities.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  SectionDTO,
  SectionConfigDTO,
  SectionsSummaryDTO,
  SectionKey,
  UpdateSectionConfigDTO,
  CreateSectionConfigDTO,
  BatchUpdateSectionsDTO,
  UpdateSectionOrderDTO,
} from '../types';

import * as sectionsApi from '../services/sectionsApi';

// Query keys for React Query
export const sectionsKeys = {
  all: ['sections'] as const,
  summary: () => [...sectionsKeys.all, 'summary'] as const,
  lists: () => [...sectionsKeys.all, 'list'] as const,
  list: (filters?: string) => [...sectionsKeys.lists(), filters] as const,
  details: () => [...sectionsKeys.all, 'detail'] as const,
  detail: (key: SectionKey) => [...sectionsKeys.details(), key] as const,
  config: (key: SectionKey) => [...sectionsKeys.all, 'config', key] as const,
  active: () => [...sectionsKeys.all, 'active'] as const,
  featured: () => [...sectionsKeys.all, 'featured'] as const,
  header: () => [...sectionsKeys.all, 'header'] as const,
  footer: () => [...sectionsKeys.all, 'footer'] as const,
};

// ==================== Query Hooks ====================

/**
 * Get all sections with configuration and statistics
 */
export function useAllSections() {
  return useQuery({
    queryKey: sectionsKeys.lists(),
    queryFn: async () => {
      const response = await sectionsApi.getAllSections();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get sections summary with aggregated statistics
 */
export function useSectionsSummary() {
  return useQuery({
    queryKey: sectionsKeys.summary(),
    queryFn: async () => {
      const response = await sectionsApi.getSectionsSummary();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get a specific section by key
 */
export function useSection(key: SectionKey) {
  return useQuery({
    queryKey: sectionsKeys.detail(key),
    queryFn: async () => {
      const response = await sectionsApi.getSection(key);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get section configuration only
 */
export function useSectionConfig(key: SectionKey) {
  return useQuery({
    queryKey: sectionsKeys.config(key),
    queryFn: async () => {
      const response = await sectionsApi.getSectionConfig(key);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get active sections only
 */
export function useActiveSections() {
  return useQuery({
    queryKey: sectionsKeys.active(),
    queryFn: async () => {
      const response = await sectionsApi.getActiveSectionsApi();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get featured sections
 */
export function useFeaturedSections() {
  return useQuery({
    queryKey: sectionsKeys.featured(),
    queryFn: async () => {
      const response = await sectionsApi.getFeaturedSectionsApi();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get sections visible in header
 */
export function useSectionsForHeader() {
  return useQuery({
    queryKey: sectionsKeys.header(),
    queryFn: async () => {
      const response = await sectionsApi.getSectionsForHeader();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get sections visible in footer
 */
export function useSectionsForFooter() {
  return useQuery({
    queryKey: sectionsKeys.footer(),
    queryFn: async () => {
      const response = await sectionsApi.getSectionsForFooter();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// ==================== Mutation Hooks ====================

/**
 * Create new section
 */
export function useCreateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSectionConfigDTO) => sectionsApi.createSection(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: sectionsKeys.all });
      toast.success('Section créée avec succès');
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(`Erreur lors de la création: ${error.message}`);
    },
  });
}

/**
 * Update section configuration
 */
export function useUpdateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ key, updates }: { key: SectionKey; updates: UpdateSectionConfigDTO }) =>
      sectionsApi.updateSection(key, updates),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: sectionsKeys.detail(variables.key) });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.config(variables.key) });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.summary() });
      toast.success('Section mise à jour avec succès');
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(`Erreur lors de la mise à jour: ${error.message}`);
    },
  });
}

/**
 * Delete section (soft delete)
 */
export function useDeleteSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (key: SectionKey) => sectionsApi.deleteSection(key),
    onSuccess: (_, key) => {
      queryClient.invalidateQueries({ queryKey: sectionsKeys.all });
      toast.success('Section désactivée avec succès');
    },
    onError: (error: Error) => {
      toast.error(`Erreur lors de la suppression: ${error.message}`);
    },
  });
}

/**
 * Toggle section status (active/inactive)
 */
export function useToggleSectionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (key: SectionKey) => sectionsApi.toggleSectionStatus(key),
    onSuccess: (response, key) => {
      queryClient.invalidateQueries({ queryKey: sectionsKeys.detail(key) });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.config(key) });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.summary() });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.active() });
      
      const newStatus = response.data.status === 'active' ? 'activée' : 'désactivée';
      toast.success(`Section ${newStatus} avec succès`);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(`Erreur lors du changement de statut: ${error.message}`);
    },
  });
}

/**
 * Toggle section visibility in specific location
 */
export function useToggleSectionVisibility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ key, location }: { key: SectionKey; location: keyof SectionConfigDTO['visibility'] }) =>
      sectionsApi.toggleSectionVisibility(key, location),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: sectionsKeys.detail(variables.key) });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.config(variables.key) });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.header() });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.footer() });
      toast.success('Visibilité mise à jour avec succès');
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(`Erreur lors de la mise à jour de la visibilité: ${error.message}`);
    },
  });
}

/**
 * Toggle section featured status
 */
export function useToggleSectionFeatured() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (key: SectionKey) => sectionsApi.toggleSectionFeatured(key),
    onSuccess: (response, key) => {
      queryClient.invalidateQueries({ queryKey: sectionsKeys.detail(key) });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.config(key) });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.featured() });
      
      const featured = response.data.display.featured ? 'mise en avant' : 'retirée de la mise en avant';
      toast.success(`Section ${featured} avec succès`);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(`Erreur lors de la mise à jour: ${error.message}`);
    },
  });
}

/**
 * Update section display order
 */
export function useUpdateSectionOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ key, order }: { key: SectionKey; order: number }) =>
      sectionsApi.updateSectionOrder(key, order),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: sectionsKeys.detail(variables.key) });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.config(variables.key) });
      queryClient.invalidateQueries({ queryKey: sectionsKeys.lists() });
      toast.success('Ordre mis à jour avec succès');
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(`Erreur lors de la mise à jour de l'ordre: ${error.message}`);
    },
  });
}

/**
 * Batch update multiple sections
 */
export function useBatchUpdateSections() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BatchUpdateSectionsDTO) => sectionsApi.batchUpdateSections(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: sectionsKeys.all });
      toast.success(`${response.data.length} section(s) mise(s) à jour avec succès`);
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(`Erreur lors de la mise à jour: ${error.message}`);
    },
  });
}

/**
 * Batch update sections order
 */
export function useBatchUpdateSectionsOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSectionOrderDTO) => sectionsApi.batchUpdateSectionsOrder(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: sectionsKeys.all });
      toast.success('Ordre des sections mis à jour avec succès');
      return response.data;
    },
    onError: (error: Error) => {
      toast.error(`Erreur lors de la mise à jour de l'ordre: ${error.message}`);
    },
  });
}
