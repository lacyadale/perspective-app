// LACYCOM1 Data Persistence Manager - Core Foundation
// Optimized for progressive enhancement and bulletproof reliability

class PersistenceManager {
    constructor() {
        this.isInitialized = false;
        this.storage = null;
        this.cache = new Map();
        this.config = {
            dbName: 'EMADashboard',
            version: 1,
            stores: {
                assessments: 'assessments',
                userProfile: 'userProfile',
                sessions: 'sessions',
                preferences: 'preferences'
            }
        };
        
        this.init();
    }
    
    async init() {
        try {
            // Progressive fallback: IndexedDB -> LocalStorage -> Memory
            if (this.isIndexedDBSupported()) {
                await this.initIndexedDB();
            } else if (this.isLocalStorageSupported()) {
                this.initLocalStorage();
            } else {
                this.initMemoryStorage();
            }
            
            this.isInitialized = true;
            console.log('✅ Persistence Manager initialized:', this.storage.type);
        } catch (error) {
            console.error('❌ Persistence initialization failed:', error);
            this.initMemoryStorage(); // Ultimate fallback
            this.isInitialized = true;
        }
    }
    
    isIndexedDBSupported() {
        return typeof window !== 'undefined' && 
               'indexedDB' in window && 
               indexedDB !== null;
    }
    
    isLocalStorageSupported() {
        try {
            return typeof Storage !== 'undefined' && 
                   localStorage !== null;
        } catch {
            return false;
        }
    }
    
    async initIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.config.dbName, this.config.version);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.storage = new IndexedDBStorage(request.result);
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create object stores
                Object.values(this.config.stores).forEach(storeName => {
                    if (!db.objectStoreNames.contains(storeName)) {
                        const store = db.createObjectStore(storeName, { 
                            keyPath: 'id',
                            autoIncrement: true 
                        });
                        
                        // Add indexes for common queries
                        if (storeName === 'assessments') {
                            store.createIndex('timestamp', 'timestamp', { unique: false });
                            store.createIndex('successRate', 'successRate', { unique: false });
                        }
                        
                        if (storeName === 'sessions') {
                            store.createIndex('startTime', 'startTime', { unique: false });
                        }
                    }
                });
            };
        });
    }
    
    initLocalStorage() {
        this.storage = new LocalStorageWrapper();
    }
    
    initMemoryStorage() {
        this.storage = new MemoryStorage();
    }
    
    // Core persistence methods
    async saveAssessment(assessmentData) {
        if (!this.isInitialized) {
            await this.init();
        }
        
        try {
            const assessment = {
                id: this.generateId(),
                timestamp: new Date().toISOString(),
                ...assessmentData,
                version: '1.0'
            };
            
            // Cache for immediate access
            this.cache.set(`assessment_${assessment.id}`, assessment);
            
            // Persist to storage
            await this.storage.save('assessments', assessment);
            
            console.log('✅ Assessment saved:', assessment.id);
            return assessment.id;
            
        } catch (error) {
            console.error('❌ Failed to save assessment:', error);
            throw new Error('Assessment save failed');
        }
    }
    
    async getAssessments(options = {}) {
        if (!this.isInitialized) {
            await this.init();
        }
        
        try {
            const { limit = 50, sortBy = 'timestamp', order = 'desc' } = options;
            
            // Try cache first for recent data
            const cachedData = Array.from(this.cache.values())
                .filter(item => item.timestamp)
                .sort((a, b) => {
                    const aVal = a[sortBy];
                    const bVal = b[sortBy];
                    return order === 'desc' ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
                })
                .slice(0, limit);
            
            if (cachedData.length >= limit) {
                return cachedData;
            }
            
            // Fetch from storage
            const assessments = await this.storage.getAll('assessments', options);
            
            // Update cache
            assessments.forEach(assessment => {
                this.cache.set(`assessment_${assessment.id}`, assessment);
            });
            
            return assessments;
            
        } catch (error) {
            console.error('❌ Failed to get assessments:', error);
            return [];
        }
    }
    
    async saveUserProfile(profileData) {
        if (!this.isInitialized) {
            await this.init();
        }
        
        try {
            const profile = {
                id: 'user_profile',
                lastUpdated: new Date().toISOString(),
                ...profileData
            };
            
            this.cache.set('user_profile', profile);
            await this.storage.save('userProfile', profile);
            
            console.log('✅ User profile saved');
            return true;
            
        } catch (error) {
            console.error('❌ Failed to save user profile:', error);
            return false;
        }
    }
    
    async getUserProfile() {
        if (!this.isInitialized) {
            await this.init();
        }
        
        try {
            // Check cache first
            if (this.cache.has('user_profile')) {
                return this.cache.get('user_profile');
            }
            
            // Fetch from storage
            const profile = await this.storage.get('userProfile', 'user_profile');
            
            if (profile) {
                this.cache.set('user_profile', profile);
            }
            
            return profile || this.getDefaultProfile();
            
        } catch (error) {
            console.error('❌ Failed to get user profile:', error);
            return this.getDefaultProfile();
        }
    }
    
    getDefaultProfile() {
        return {
            id: 'user_profile',
            riskTolerance: 'moderate',
            experienceLevel: 'intermediate',
            preferredSetupType: 'balanced',
            totalAssessments: 0,
            averageSuccessRate: 0,
            createdAt: new Date().toISOString()
        };
    }
    
    // Session management
    async saveSession(sessionData) {
        if (!this.isInitialized) {
            await this.init();
        }
        
        try {
            const session = {
                id: this.generateId(),
                startTime: new Date().toISOString(),
                ...sessionData
            };
            
            await this.storage.save('sessions', session);
            return session.id;
            
        } catch (error) {
            console.error('❌ Failed to save session:', error);
            return null;
        }
    }
    
    // Preferences management
    async savePreference(key, value) {
        if (!this.isInitialized) {
            await this.init();
        }
        
        try {
            const preference = {
                id: key,
                value: value,
                lastUpdated: new Date().toISOString()
            };
            
            this.cache.set(`pref_${key}`, preference);
            await this.storage.save('preferences', preference);
            
            return true;
        } catch (error) {
            console.error('❌ Failed to save preference:', error);
            return false;
        }
    }
    
    async getPreference(key, defaultValue = null) {
        if (!this.isInitialized) {
            await this.init();
        }
        
        try {
            // Check cache first
            const cacheKey = `pref_${key}`;
            if (this.cache.has(cacheKey)) {
                return this.cache.get(cacheKey).value;
            }
            
            // Fetch from storage
            const preference = await this.storage.get('preferences', key);
            
            if (preference) {
                this.cache.set(cacheKey, preference);
                return preference.value;
            }
            
            return defaultValue;
            
        } catch (error) {
            console.error('❌ Failed to get preference:', error);
            return defaultValue;
        }
    }
    
    // Utility methods
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    async exportData() {
        if (!this.isInitialized) {
            await this.init();
        }
        
        try {
            const data = {
                assessments: await this.getAssessments({ limit: 1000 }),
                userProfile: await this.getUserProfile(),
                exportDate: new Date().toISOString(),
                version: '1.0'
            };
            
            return JSON.stringify(data, null, 2);
            
        } catch (error) {
            console.error('❌ Failed to export data:', error);
            throw new Error('Data export failed');
        }
    }
    
    async clearAllData() {
        if (!this.isInitialized) {
            await this.init();
        }
        
        try {
            await this.storage.clear();
            this.cache.clear();
            console.log('✅ All data cleared');
            return true;
            
        } catch (error) {
            console.error('❌ Failed to clear data:', error);
            return false;
        }
    }
    
    // Health check
    async healthCheck() {
        try {
            const testData = { test: true, timestamp: Date.now() };
            const testId = await this.storage.save('assessments', testData);
            const retrieved = await this.storage.get('assessments', testId);
            await this.storage.delete('assessments', testId);
            
            return {
                status: 'healthy',
                storageType: this.storage.type,
                canWrite: !!testId,
                canRead: !!retrieved,
                timestamp: new Date().toISOString()
            };
            
        } catch (error) {
            return {
                status: 'unhealthy',
                error: error.message,
                storageType: this.storage?.type || 'unknown',
                timestamp: new Date().toISOString()
            };
        }
    }
}

// Storage implementations
class IndexedDBStorage {
    constructor(db) {
        this.db = db;
        this.type = 'IndexedDB';
    }
    
    async save(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    async get(storeName, id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(id);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    async getAll(storeName, options = {}) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onsuccess = () => {
                let results = request.result;
                
                // Apply sorting and limiting
                if (options.sortBy && options.order) {
                    results.sort((a, b) => {
                        const aVal = a[options.sortBy];
                        const bVal = b[options.sortBy];
                        return options.order === 'desc' ? 
                            bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
                    });
                }
                
                if (options.limit) {
                    results = results.slice(0, options.limit);
                }
                
                resolve(results);
            };
            request.onerror = () => reject(request.error);
        });
    }
    
    async delete(storeName, id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);
            
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }
    
    async clear() {
        const storeNames = ['assessments', 'userProfile', 'sessions', 'preferences'];
        
        for (const storeName of storeNames) {
            await new Promise((resolve, reject) => {
                const transaction = this.db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);
                const request = store.clear();
                
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        }
    }
}

class LocalStorageWrapper {
    constructor() {
        this.type = 'LocalStorage';
        this.prefix = 'ema_dashboard_';
    }
    
    async save(storeName, data) {
        const key = `${this.prefix}${storeName}_${data.id}`;
        localStorage.setItem(key, JSON.stringify(data));
        return data.id;
    }
    
    async get(storeName, id) {
        const key = `${this.prefix}${storeName}_${id}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    
    async getAll(storeName, options = {}) {
        const prefix = `${this.prefix}${storeName}_`;
        const results = [];
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) {
                const data = JSON.parse(localStorage.getItem(key));
                results.push(data);
            }
        }
        
        // Apply sorting and limiting
        if (options.sortBy && options.order) {
            results.sort((a, b) => {
                const aVal = a[options.sortBy];
                const bVal = b[options.sortBy];
                return options.order === 'desc' ? 
                    bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
            });
        }
        
        return options.limit ? results.slice(0, options.limit) : results;
    }
    
    async delete(storeName, id) {
        const key = `${this.prefix}${storeName}_${id}`;
        localStorage.removeItem(key);
        return true;
    }
    
    async clear() {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.prefix)) {
                keysToRemove.push(key);
            }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }
}

class MemoryStorage {
    constructor() {
        this.type = 'Memory';
        this.data = new Map();
    }
    
    async save(storeName, data) {
        const key = `${storeName}_${data.id}`;
        this.data.set(key, JSON.parse(JSON.stringify(data)));
        return data.id;
    }
    
    async get(storeName, id) {
        const key = `${storeName}_${id}`;
        const data = this.data.get(key);
        return data ? JSON.parse(JSON.stringify(data)) : null;
    }
    
    async getAll(storeName, options = {}) {
        const prefix = `${storeName}_`;
        const results = [];
        
        for (const [key, value] of this.data.entries()) {
            if (key.startsWith(prefix)) {
                results.push(JSON.parse(JSON.stringify(value)));
            }
        }
        
        // Apply sorting and limiting
        if (options.sortBy && options.order) {
            results.sort((a, b) => {
                const aVal = a[options.sortBy];
                const bVal = b[options.sortBy];
                return options.order === 'desc' ? 
                    bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
            });
        }
        
        return options.limit ? results.slice(0, options.limit) : results;
    }
    
    async delete(storeName, id) {
        const key = `${storeName}_${id}`;
        return this.data.delete(key);
    }
    
    async clear() {
        this.data.clear();
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersistenceManager;
} else if (typeof window !== 'undefined') {
    window.PersistenceManager = PersistenceManager;
}