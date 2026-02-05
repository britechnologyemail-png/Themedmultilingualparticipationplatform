/**
 * Header Menu API Hooks
 * 
 * React Query hooks for managing the dynamic header menu
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { headerMenuApi } from '../services/headerMenuApi';
import type {
  HeaderMenuDataDTO,
  HeaderMenuConfigDTO,
  HeaderMenuItemDTO,
  HeaderMenuStatsDTO,
  CreateHeaderMenuItemDTO,
  UpdateHeaderMenuItemDTO,
  UpdateHeaderMenuConfigDTO,
  BatchUpdateMenuOrderDTO,
} from '../types';

// ==================== Query Keys ====================

export const headerMenuKeys = {
  all: ['headerMenu'] as const,
  data: () => [...headerMenuKeys.all, 'data'] as const,
  config: () => [...headerMenuKeys.all, 'config'] as const,
  items: () => [...headerMenuKeys.all, 'items'] as const,
  activeItems: () => [...headerMenuKeys.all, 'activeItems'] as const,
  item: (id: string) => [...headerMenuKeys.all, 'item', id] as const,
  stats: () => [...headerMenuKeys.all, 'stats'] as const,
};

// ==================== Queries ====================

/**
 * Get complete header menu data (config + items)
 */
export function useHeaderMenuData() {
  return useQuery({
    queryKey: headerMenuKeys.data(),
    queryFn: async () => {
      const response = await headerMenuApi.getHeaderMenuData();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Get header menu configuration
 */
export function useHeaderMenuConfig() {
  return useQuery({
    queryKey: headerMenuKeys.config(),
    queryFn: async () => {
      const response = await headerMenuApi.getHeaderMenuConfig();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Get all header menu items
 */
export function useHeaderMenuItems() {
  return useQuery({
    queryKey: headerMenuKeys.items(),
    queryFn: async () => {
      const response = await headerMenuApi.getHeaderMenuItems();
      return response.data;
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Get active and visible header menu items for display
 */
export function useActiveHeaderMenuItems() {
  return useQuery({
    queryKey: headerMenuKeys.activeItems(),
    queryFn: async () => {
      const response = await headerMenuApi.getActiveHeaderMenuItems();
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Get single header menu item by ID
 */
export function useHeaderMenuItem(id: string) {
  return useQuery({
    queryKey: headerMenuKeys.item(id),
    queryFn: async () => {
      const response = await headerMenuApi.getHeaderMenuItem(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Get header menu statistics
 */
export function useHeaderMenuStats() {
  return useQuery({
    queryKey: headerMenuKeys.stats(),
    queryFn: async () => {
      const response = await headerMenuApi.getHeaderMenuStats();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// ==================== Mutations ====================

/**
 * Create new header menu item
 */
export function useCreateHeaderMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateHeaderMenuItemDTO) => {
      const response = await headerMenuApi.createHeaderMenuItem(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: headerMenuKeys.all });
      toast.success('Menu item created successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to create menu item', {
        description: error.message,
      });
    },
  });
}

/**
 * Update header menu item
 */
export function useUpdateHeaderMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateHeaderMenuItemDTO;
    }) => {
      const response = await headerMenuApi.updateHeaderMenuItem(id, updates);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: headerMenuKeys.all });
      queryClient.invalidateQueries({ queryKey: headerMenuKeys.item(variables.id) });
      toast.success('Menu item updated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to update menu item', {
        description: error.message,
      });
    },
  });
}

/**
 * Toggle header menu item active state
 */
export function useToggleHeaderMenuItemActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await headerMenuApi.toggleHeaderMenuItemActive(id);
      return response.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: headerMenuKeys.all });
      queryClient.invalidateQueries({ queryKey: headerMenuKeys.item(id) });
      toast.success('Menu item status updated');
    },
    onError: (error: Error) => {
      toast.error('Failed to update menu item status', {
        description: error.message,
      });
    },
  });
}

/**
 * Toggle header menu item visibility
 */
export function useToggleHeaderMenuItemVisibility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await headerMenuApi.toggleHeaderMenuItemVisibility(id);
      return response.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: headerMenuKeys.all });
      queryClient.invalidateQueries({ queryKey: headerMenuKeys.item(id) });
      toast.success('Menu item visibility updated');
    },
    onError: (error: Error) => {
      toast.error('Failed to update menu item visibility', {
        description: error.message,
      });
    },
  });
}

/**
 * Delete header menu item
 */
export function useDeleteHeaderMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await headerMenuApi.deleteHeaderMenuItem(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: headerMenuKeys.all });
      toast.success('Menu item deleted successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to delete menu item', {
        description: error.message,
      });
    },
  });
}

/**
 * Batch update header menu items order (for drag & drop)
 */
export function useBatchUpdateHeaderMenuOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BatchUpdateMenuOrderDTO) => {
      const response = await headerMenuApi.batchUpdateHeaderMenuOrder(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: headerMenuKeys.all });
      toast.success('Menu order updated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to update menu order', {
        description: error.message,
      });
    },
  });
}

/**
 * Update header menu configuration
 */
export function useUpdateHeaderMenuConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: UpdateHeaderMenuConfigDTO) => {
      const response = await headerMenuApi.updateHeaderMenuConfig(updates);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: headerMenuKeys.all });
      toast.success('Configuration updated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to update configuration', {
        description: error.message,
      });
    },
  });
}
