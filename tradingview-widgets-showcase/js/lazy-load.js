// Custom element for lazy loading TradingView widgets
// Based on TradingView's lazy loading best practices

class LazyLoad extends HTMLElement {
    constructor() {
        super();
        this._hasLoaded = false;
        this._observer = null;
    }

    connectedCallback() {
        // Create IntersectionObserver to detect when element enters viewport
        this._observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !this._hasLoaded) {
                        this._loadContent();
                        this._hasLoaded = true;
                        this._observer.disconnect();
                    }
                });
            },
            {
                // Load widget 50px before it enters viewport
                rootMargin: "50px",
                // Trigger when 10% of element is visible
                threshold: 0.1
            }
        );
        
        this._observer.observe(this);
    }

    disconnectedCallback() {
        if (this._observer) {
            this._observer.disconnect();
        }
    }

    _loadContent() {
        const template = this.querySelector("template");
        if (template) {
            // Clone template content
            const content = template.content.cloneNode(true);
            
            // Remove template from DOM
            template.remove();
            
            // Add loading indicator removal
            const loadingIndicator = this.querySelector('.widget-loading');
            if (loadingIndicator) {
                loadingIndicator.remove();
            }
            
            // Append cloned content
            this.appendChild(content);
            
            // Execute scripts (TradingView widgets need script execution)
            const scripts = content.querySelectorAll("script");
            scripts.forEach((oldScript) => {
                const newScript = document.createElement("script");
                
                // Copy all attributes
                Array.from(oldScript.attributes).forEach((attr) => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                
                // Copy script content
                newScript.textContent = oldScript.textContent;
                
                // Replace old script with new one to trigger execution
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
            
            // Dispatch custom event for tracking
            this.dispatchEvent(new CustomEvent('widget-loaded', {
                bubbles: true,
                detail: { widgetType: this.getAttribute('data-widget-type') }
            }));
        }
    }
}

// Register the custom element
customElements.define("lazy-load", LazyLoad);

// Advanced lazy loading with priority queue
class WidgetLoader {
    constructor() {
        this.queue = [];
        this.loading = false;
        this.loadedCount = 0;
        this.maxConcurrent = 2; // Max widgets loading at once
        this.activeLoaders = 0;
    }

    addToQueue(element, priority = 0) {
        this.queue.push({ element, priority });
        this.queue.sort((a, b) => b.priority - a.priority);
        this.processQueue();
    }

    async processQueue() {
        if (this.activeLoaders >= this.maxConcurrent || this.queue.length === 0) {
            return;
        }

        const { element } = this.queue.shift();
        this.activeLoaders++;

        try {
            await this.loadWidget(element);
            this.loadedCount++;
            this.updateStats();
        } catch (error) {
            console.error('Widget loading failed:', error);
        } finally {
            this.activeLoaders--;
            this.processQueue();
        }
    }

    loadWidget(element) {
        return new Promise((resolve) => {
            element.addEventListener('widget-loaded', () => resolve(), { once: true });
            element._loadContent();
        });
    }

    updateStats() {
        const event = new CustomEvent('widgets-stats-update', {
            detail: { loadedCount: this.loadedCount }
        });
        document.dispatchEvent(event);
    }
}

// Initialize widget loader
const widgetLoader = new WidgetLoader();

// Utility function to create lazy-loaded widget
function createLazyWidget(widgetType, config) {
    const lazyElement = document.createElement('lazy-load');
    lazyElement.setAttribute('data-widget-type', widgetType);
    
    // Add loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'widget-loading';
    loadingDiv.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading ${widgetType} widget...</p>
    `;
    lazyElement.appendChild(loadingDiv);
    
    // Create template with widget content
    const template = document.createElement('template');
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container';
    
    // Create script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = config.src;
    script.textContent = JSON.stringify(config.settings);
    
    widgetContainer.appendChild(script);
    template.content.appendChild(widgetContainer);
    lazyElement.appendChild(template);
    
    return lazyElement;
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            widgetsLoaded: 0,
            totalLoadTime: 0,
            firstWidgetTime: null,
            lastWidgetTime: null
        };
        
        this.startTime = performance.now();
        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener('widget-loaded', (e) => {
            this.metrics.widgetsLoaded++;
            
            const currentTime = performance.now();
            if (!this.metrics.firstWidgetTime) {
                this.metrics.firstWidgetTime = currentTime - this.startTime;
            }
            this.metrics.lastWidgetTime = currentTime - this.startTime;
            
            this.updateDisplay();
        });
    }

    updateDisplay() {
        const display = document.getElementById('perfMetrics');
        if (display) {
            display.innerHTML = `
                <div>Widgets Loaded: ${this.metrics.widgetsLoaded}</div>
                <div>First Widget: ${Math.round(this.metrics.firstWidgetTime)}ms</div>
                <div>Last Widget: ${Math.round(this.metrics.lastWidgetTime)}ms</div>
            `;
        }
    }

    getMetrics() {
        return this.metrics;
    }
}

// Export utilities
window.LazyLoad = LazyLoad;
window.WidgetLoader = widgetLoader;
window.createLazyWidget = createLazyWidget;
window.PerformanceMonitor = PerformanceMonitor;