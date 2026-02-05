/**
 * Sections Management API Service
 * 
 * Service for managing platform sections configuration and statistics.
 * Simulates API calls with mock data for development/demo purposes.
 */

import {
  SectionDTO,
  SectionConfigDTO,
  SectionsSummaryDTO,
  SectionKey,
  UpdateSectionConfigDTO,
  CreateSectionConfigDTO,
  BatchUpdateSectionsDTO,
  UpdateSectionOrderDTO,
  ApiResponse,
} from '../types';

import {
  mockSections,
  mockSectionsSummary,
  getSectionByKey,
  getActiveSections,
  getSectionsSortedByOrder,
  getFeaturedSections,
  getSectionsVisibleInHeader,
  getSectionsVisibleInFooter,
} from '../data/sectionsMock';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== Sections API Functions ====================

/**
 * Get all sections with configuration and statistics
 */
export async function getAllSections(): Promise<ApiResponse<SectionDTO[]>> {
  await delay();
  
  return {
    data: getSectionsSortedByOrder(),
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Get sections summary with aggregated statistics
 */
export async function getSectionsSummary(): Promise<ApiResponse<SectionsSummaryDTO>> {
  await delay();
  
  return {
    data: mockSectionsSummary,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Get a specific section by key
 */
export async function getSection(key: SectionKey): Promise<ApiResponse<SectionDTO>> {
  await delay();
  
  const section = getSectionByKey(key);
  
  if (!section) {
    throw new Error(`Section with key '${key}' not found`);
  }
  
  return {
    data: section,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Get section configuration only
 */
export async function getSectionConfig(key: SectionKey): Promise<ApiResponse<SectionConfigDTO>> {
  await delay();
  
  const section = getSectionByKey(key);
  
  if (!section) {
    throw new Error(`Section with key '${key}' not found`);
  }
  
  return {
    data: section.config,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Create new section configuration
 */
export async function createSection(data: CreateSectionConfigDTO): Promise<ApiResponse<SectionConfigDTO>> {
  await delay();
  
  const newSection: SectionConfigDTO = {
    id: `section-config-${data.key}-${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    updatedBy: 'current-user-id',
  };
  
  // In real implementation, this would save to the database
  console.log('Creating new section:', newSection);
  
  return {
    data: newSection,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Update section configuration
 */
export async function updateSection(
  key: SectionKey,
  updates: UpdateSectionConfigDTO
): Promise<ApiResponse<SectionConfigDTO>> {
  await delay();
  
  const section = getSectionByKey(key);
  
  if (!section) {
    throw new Error(`Section with key '${key}' not found`);
  }
  
  const updatedConfig: SectionConfigDTO = {
    ...section.config,
    ...updates,
    visibility: updates.visibility 
      ? { ...section.config.visibility, ...updates.visibility }
      : section.config.visibility,
    display: updates.display
      ? { ...section.config.display, ...updates.display }
      : section.config.display,
    accessControl: updates.accessControl
      ? { ...section.config.accessControl, ...updates.accessControl }
      : section.config.accessControl,
    features: updates.features
      ? { ...section.config.features, ...updates.features }
      : section.config.features,
    metadata: updates.metadata
      ? { ...section.config.metadata, ...updates.metadata }
      : section.config.metadata,
    updatedAt: new Date().toISOString(),
    updatedBy: 'current-user-id',
  };
  
  // In real implementation, this would update the database
  console.log('Updating section:', key, updates);
  
  // Update the mock data in place
  const sectionIndex = mockSections.findIndex(s => s.config.key === key);
  if (sectionIndex !== -1) {
    mockSections[sectionIndex].config = updatedConfig;
  }
  
  return {
    data: updatedConfig,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Delete section configuration (soft delete - sets status to inactive)
 */
export async function deleteSection(key: SectionKey): Promise<ApiResponse<void>> {
  await delay();
  
  const section = getSectionByKey(key);
  
  if (!section) {
    throw new Error(`Section with key '${key}' not found`);
  }
  
  // In real implementation, this would soft delete from the database
  console.log('Deleting section:', key);
  
  // Update status to inactive
  section.config.status = 'inactive';
  section.config.updatedAt = new Date().toISOString();
  section.config.updatedBy = 'current-user-id';
  
  return {
    data: undefined,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Toggle section status (active/inactive)
 */
export async function toggleSectionStatus(key: SectionKey): Promise<ApiResponse<SectionConfigDTO>> {
  await delay();
  
  const section = getSectionByKey(key);
  
  if (!section) {
    throw new Error(`Section with key '${key}' not found`);
  }
  
  const newStatus = section.config.status === 'active' ? 'inactive' : 'active';
  
  section.config.status = newStatus;
  section.config.updatedAt = new Date().toISOString();
  section.config.updatedBy = 'current-user-id';
  
  console.log(`Toggling section ${key} status to:`, newStatus);
  
  return {
    data: section.config,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Toggle section visibility in specific location
 */
export async function toggleSectionVisibility(
  key: SectionKey,
  location: keyof SectionConfigDTO['visibility']
): Promise<ApiResponse<SectionConfigDTO>> {
  await delay();
  
  const section = getSectionByKey(key);
  
  if (!section) {
    throw new Error(`Section with key '${key}' not found`);
  }
  
  section.config.visibility[location] = !section.config.visibility[location];
  section.config.updatedAt = new Date().toISOString();
  section.config.updatedBy = 'current-user-id';
  
  console.log(`Toggling section ${key} visibility for ${location}:`, section.config.visibility[location]);
  
  return {
    data: section.config,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Toggle section featured status
 */
export async function toggleSectionFeatured(key: SectionKey): Promise<ApiResponse<SectionConfigDTO>> {
  await delay();
  
  const section = getSectionByKey(key);
  
  if (!section) {
    throw new Error(`Section with key '${key}' not found`);
  }
  
  section.config.display.featured = !section.config.display.featured;
  section.config.updatedAt = new Date().toISOString();
  section.config.updatedBy = 'current-user-id';
  
  console.log(`Toggling section ${key} featured status to:`, section.config.display.featured);
  
  return {
    data: section.config,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Update section display order
 */
export async function updateSectionOrder(key: SectionKey, newOrder: number): Promise<ApiResponse<SectionConfigDTO>> {
  await delay();
  
  const section = getSectionByKey(key);
  
  if (!section) {
    throw new Error(`Section with key '${key}' not found`);
  }
  
  section.config.display.order = newOrder;
  section.config.updatedAt = new Date().toISOString();
  section.config.updatedBy = 'current-user-id';
  
  console.log(`Updating section ${key} order to:`, newOrder);
  
  return {
    data: section.config,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Batch update multiple sections
 */
export async function batchUpdateSections(data: BatchUpdateSectionsDTO): Promise<ApiResponse<SectionConfigDTO[]>> {
  await delay(700);
  
  const updatedConfigs: SectionConfigDTO[] = [];
  
  for (const update of data.updates) {
    const section = getSectionByKey(update.key);
    
    if (!section) {
      console.warn(`Section with key '${update.key}' not found, skipping`);
      continue;
    }
    
    const updatedConfig: SectionConfigDTO = {
      ...section.config,
      ...update.changes,
      visibility: update.changes.visibility 
        ? { ...section.config.visibility, ...update.changes.visibility }
        : section.config.visibility,
      display: update.changes.display
        ? { ...section.config.display, ...update.changes.display }
        : section.config.display,
      accessControl: update.changes.accessControl
        ? { ...section.config.accessControl, ...update.changes.accessControl }
        : section.config.accessControl,
      features: update.changes.features
        ? { ...section.config.features, ...update.changes.features }
        : section.config.features,
      metadata: update.changes.metadata
        ? { ...section.config.metadata, ...update.changes.metadata }
        : section.config.metadata,
      updatedAt: new Date().toISOString(),
      updatedBy: 'current-user-id',
    };
    
    // Update the mock data
    const sectionIndex = mockSections.findIndex(s => s.config.key === update.key);
    if (sectionIndex !== -1) {
      mockSections[sectionIndex].config = updatedConfig;
    }
    
    updatedConfigs.push(updatedConfig);
  }
  
  console.log('Batch updated sections:', updatedConfigs.length);
  
  return {
    data: updatedConfigs,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Batch update sections order
 */
export async function batchUpdateSectionsOrder(data: UpdateSectionOrderDTO): Promise<ApiResponse<SectionConfigDTO[]>> {
  await delay(500);
  
  const updatedConfigs: SectionConfigDTO[] = [];
  
  for (const item of data.sections) {
    const section = getSectionByKey(item.key);
    
    if (!section) {
      console.warn(`Section with key '${item.key}' not found, skipping`);
      continue;
    }
    
    section.config.display.order = item.order;
    section.config.updatedAt = new Date().toISOString();
    section.config.updatedBy = 'current-user-id';
    
    updatedConfigs.push(section.config);
  }
  
  console.log('Batch updated section orders:', updatedConfigs.length);
  
  return {
    data: updatedConfigs,
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Get active sections only
 */
export async function getActiveSectionsApi(): Promise<ApiResponse<SectionDTO[]>> {
  await delay();
  
  return {
    data: getActiveSections(),
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Get featured sections
 */
export async function getFeaturedSectionsApi(): Promise<ApiResponse<SectionDTO[]>> {
  await delay();
  
  return {
    data: getFeaturedSections(),
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Get sections visible in header
 */
export async function getSectionsForHeader(): Promise<ApiResponse<SectionDTO[]>> {
  await delay();
  
  return {
    data: getSectionsVisibleInHeader(),
    timestamp: new Date().toISOString(),
    success: true,
  };
}

/**
 * Get sections visible in footer
 */
export async function getSectionsForFooter(): Promise<ApiResponse<SectionDTO[]>> {
  await delay();
  
  return {
    data: getSectionsVisibleInFooter(),
    timestamp: new Date().toISOString(),
    success: true,
  };
}
