/**
 * Footer Dynamic Menu - React Query Hooks
 * 
 * Custom hooks for managing footer menu data with React Query
 * Provides data fetching, caching, and mutation capabilities
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { toast } from 'sonner';
import type {
  FooterMenuDataDTO,
  FooterMenuConfigDTO,
  FooterMenuItemDTO,
  FooterMenuStatsDTO,
  CreateFooterMenuItemDTO,
  UpdateFooterMenuItemDTO,
  UpdateFooterMenuConfigDTO,
  BatchUpdateMenuOrderDTO,
} from '../types';

// ==================== Query Keys ====================

export const footerMenuKeys = {
  all: ['footerMenu'] as const,
  data: () => [...footerMenuKeys.all, 'data'] as const,
  config: () => [...footerMenuKeys.all, 'config'] as const,
  items: () => [...footerMenuKeys.all, 'items'] as const,
  activeItems: () => [...footerMenuKeys.all, 'activeItems'] as const,
  item: (id: string) => [...footerMenuKeys.all, 'item', id] as const,
  stats: () => [...footerMenuKeys.all, 'stats'] as const,
};

// ==================== Query Hooks ====================

/**
 * Get complete footer menu data (config + items)
 */
export function useFooterMenuData() {
  return useQuery({
    queryKey: footerMenuKeys.data(),
    queryFn: async () => {
      const response = await apiService.footerMenu.getFooterMenuData();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Get footer menu configuration
 */
export function useFooterMenuConfig() {
  return useQuery({
    queryKey: footerMenuKeys.config(),
    queryFn: async () => {
      const response = await apiService.footerMenu.getFooterMenuConfig();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Get all footer menu items
 */
export function useFooterMenuItems() {
  return useQuery({
    queryKey: footerMenuKeys.items(),
    queryFn: async () => {
      const response = await apiService.footerMenu.getFooterMenuItems();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Get active and visible menu items for display
 */
export function useActiveFooterMenuItems() {
  return useQuery({
    queryKey: footerMenuKeys.activeItems(),
    queryFn: async () => {
      const response = await apiService.footerMenu.getActiveFooterMenuItems();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Get single menu item by ID
 */
export function useFooterMenuItem(id: string) {
  return useQuery({
    queryKey: footerMenuKeys.item(id),
    queryFn: async () => {
      const response = await apiService.footerMenu.getFooterMenuItem(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Get footer menu statistics
 */
export function useFooterMenuStats() {
  return useQuery({
    queryKey: footerMenuKeys.stats(),
    queryFn: async () => {
      const response = await apiService.footerMenu.getFooterMenuStats();
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes (stats change more frequently)
    gcTime: 5 * 60 * 1000,
  });
}

// ==================== Mutation Hooks ====================

/**
 * Create new menu item
 */
export function useCreateFooterMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateFooterMenuItemDTO) => {
      const response = await apiService.footerMenu.createFooterMenuItem(data);
      return response.data;
    },
    onSuccess: (newItem) => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: footerMenuKeys.all });
      
      toast.success('Menu item created successfully', {
        description: `${newItem.label.en} has been added to the menu`,
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to create menu item', {
        description: error.message,
      });
    },
  });
}

/**
 * Update menu item
 */
export function useUpdateFooterMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: UpdateFooterMenuItemDTO }) => {
      const response = await apiService.footerMenu.updateFooterMenuItem(id, updates);
      return response.data;
    },
    onSuccess: (updatedItem) => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: footerMenuKeys.all });
      
      toast.success('Menu item updated successfully', {
        description: `${updatedItem.label.en} has been updated`,
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to update menu item', {
        description: error.message,
      });
    },
  });
}

/**
 * Toggle menu item active state
 */
export function useToggleMenuItemActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiService.footerMenu.toggleMenuItemActive(id);
      return response.data;
    },
    onSuccess: (item) => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: footerMenuKeys.all });
      
      const statusText = item.isActive ? 'activated' : 'deactivated';
      toast.success(`Menu item ${statusText}`, {
        description: `${item.label.en} is now ${statusText}`,
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to toggle menu item', {
        description: error.message,
      });
    },
  });
}

/**
 * Toggle menu item visibility
 */
export function useToggleMenuItemVisibility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiService.footerMenu.toggleMenuItemVisibility(id);
      return response.data;
    },
    onSuccess: (item) => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: footerMenuKeys.all });
      
      const visibilityText = item.isVisible ? 'visible' : 'hidden';
      toast.success(`Menu item ${visibilityText}`, {
        description: `${item.label.en} is now ${visibilityText}`,
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to toggle visibility', {
        description: error.message,
      });
    },
  });
}

/**
 * Delete menu item
 */
export function useDeleteFooterMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiService.footerMenu.deleteFooterMenuItem(id);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: footerMenuKeys.all });
      
      toast.success('Menu item deleted successfully', {
        description: 'The menu item has been removed',
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to delete menu item', {
        description: error.message,
      });
    },
  });
}

/**
 * Batch update menu items order
 */
export function useBatchUpdateMenuOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BatchUpdateMenuOrderDTO) => {
      const response = await apiService.footerMenu.batchUpdateMenuOrder(data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: footerMenuKeys.all });
      
      toast.success('Menu order updated successfully', {
        description: 'The menu items have been reordered',
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to update menu order', {
        description: error.message,
      });
    },
  });
}

/**
 * Update footer menu configuration
 */
export function useUpdateFooterMenuConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: UpdateFooterMenuConfigDTO) => {
      const response = await apiService.footerMenu.updateFooterMenuConfig(updates);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: footerMenuKeys.all });
      
      toast.success('Menu configuration updated', {
        description: 'The footer menu settings have been saved',
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to update configuration', {
        description: error.message,
      });
    },
  });
}

// ==================== Export All ====================

export const footerMenuHooks = {
  // Queries
  useFooterMenuData,
  useFooterMenuConfig,
  useFooterMenuItems,
  useActiveFooterMenuItems,
  useFooterMenuItem,
  useFooterMenuStats,
  
  // Mutations
  useCreateFooterMenuItem,
  useUpdateFooterMenuItem,
  useToggleMenuItemActive,
  useToggleMenuItemVisibility,
  useDeleteFooterMenuItem,
  useBatchUpdateMenuOrder,
  useUpdateFooterMenuConfig,
};
