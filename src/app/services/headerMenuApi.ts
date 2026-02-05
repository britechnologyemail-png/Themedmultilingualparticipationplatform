/**
 * Header Menu API Service
 * 
 * API functions for managing the dynamic header menu
 */

import type {
  ApiResponse,
  HeaderMenuDataDTO,
  HeaderMenuConfigDTO,
  HeaderMenuItemDTO,
  HeaderMenuStatsDTO,
  CreateHeaderMenuItemDTO,
  UpdateHeaderMenuItemDTO,
  UpdateHeaderMenuConfigDTO,
  BatchUpdateMenuOrderDTO,
} from '../types';

import {
  mockHeaderMenuData,
  mockHeaderMenuConfig,
  mockHeaderMenuItems,
  mockHeaderMenuStats,
  getActiveHeaderMenuItems,
  getHeaderMenuItemById,
  toggleHeaderMenuItemActive,
  toggleHeaderMenuItemVisibility,
  updateHeaderMenuItemOrder,
  updateMockHeaderMenuConfig,
} from '../data/headerMenuMock';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== Header Dynamic Menu API ====================

export const headerMenuApi = {
  /**
   * Get complete header menu data (config + items)
   */
  async getHeaderMenuData(): Promise<ApiResponse<HeaderMenuDataDTO>> {
    await delay(300);
    return {
      data: mockHeaderMenuData,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get header menu configuration only
   */
  async getHeaderMenuConfig(): Promise<ApiResponse<HeaderMenuConfigDTO>> {
    await delay(200);
    return {
      data: mockHeaderMenuConfig,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get all header menu items
   */
  async getHeaderMenuItems(): Promise<ApiResponse<HeaderMenuItemDTO[]>> {
    await delay(250);
    return {
      data: mockHeaderMenuItems,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get active and visible menu items for display
   */
  async getActiveHeaderMenuItems(): Promise<ApiResponse<HeaderMenuItemDTO[]>> {
    await delay(200);
    return {
      data: getActiveHeaderMenuItems(),
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get single menu item by ID
   */
  async getHeaderMenuItem(id: string): Promise<ApiResponse<HeaderMenuItemDTO>> {
    await delay(150);
    const item = getHeaderMenuItemById(id);
    
    if (!item) {
      throw new Error(`Menu item with ID ${id} not found`);
    }

    return {
      data: item,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Create new menu item
   */
  async createHeaderMenuItem(data: CreateHeaderMenuItemDTO): Promise<ApiResponse<HeaderMenuItemDTO>> {
    await delay(400);
    
    const newItem: HeaderMenuItemDTO = {
      id: `header-menu-item-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockHeaderMenuItems.push(newItem);

    return {
      data: newItem,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Update menu item
   */
  async updateHeaderMenuItem(
    id: string,
    updates: UpdateHeaderMenuItemDTO
  ): Promise<ApiResponse<HeaderMenuItemDTO>> {
    await delay(350);
    
    const item = getHeaderMenuItemById(id);
    if (!item) {
      throw new Error(`Menu item with ID ${id} not found`);
    }

    Object.assign(item, updates, {
      updatedAt: new Date().toISOString(),
    });

    return {
      data: item,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Toggle menu item active state
   */
  async toggleHeaderMenuItemActive(id: string): Promise<ApiResponse<HeaderMenuItemDTO>> {
    await delay(250);
    
    const item = toggleHeaderMenuItemActive(id);
    if (!item) {
      throw new Error(`Menu item with ID ${id} not found`);
    }

    return {
      data: item,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Toggle menu item visibility
   */
  async toggleHeaderMenuItemVisibility(id: string): Promise<ApiResponse<HeaderMenuItemDTO>> {
    await delay(250);
    
    const item = toggleHeaderMenuItemVisibility(id);
    if (!item) {
      throw new Error(`Menu item with ID ${id} not found`);
    }

    return {
      data: item,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Delete menu item
   */
  async deleteHeaderMenuItem(id: string): Promise<ApiResponse<{ success: boolean }>> {
    await delay(300);
    
    const index = mockHeaderMenuItems.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Menu item with ID ${id} not found`);
    }

    mockHeaderMenuItems.splice(index, 1);

    return {
      data: { success: true },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Batch update menu items order
   */
  async batchUpdateHeaderMenuOrder(data: BatchUpdateMenuOrderDTO): Promise<ApiResponse<HeaderMenuItemDTO[]>> {
    await delay(400);
    
    data.items.forEach(({ id, order }) => {
      updateHeaderMenuItemOrder(id, order);
    });

    return {
      data: mockHeaderMenuItems.sort((a, b) => a.order - b.order),
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Update header menu configuration
   */
  async updateHeaderMenuConfig(updates: UpdateHeaderMenuConfigDTO): Promise<ApiResponse<HeaderMenuConfigDTO>> {
    await delay(350);
    
    const updatedConfig = updateMockHeaderMenuConfig(updates);

    return {
      data: updatedConfig,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get header menu statistics
   */
  async getHeaderMenuStats(): Promise<ApiResponse<HeaderMenuStatsDTO>> {
    await delay(300);
    
    // Dynamically calculate stats
    const stats: HeaderMenuStatsDTO = {
      ...mockHeaderMenuStats,
      totalItems: mockHeaderMenuItems.length,
      activeItems: mockHeaderMenuItems.filter(item => item.isActive).length,
      inactiveItems: mockHeaderMenuItems.filter(item => !item.isActive).length,
      visibleItems: mockHeaderMenuItems.filter(item => item.isVisible && item.showInHeader).length,
    };

    return {
      data: stats,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};
