// Centralized widget configuration and optimization
const WidgetConfig = {
    // Symbol mapping for easy management
    symbols: {
        tech: [
            { exchange: 'NASDAQ', symbol: 'AAPL', name: 'Apple' },
            { exchange: 'NASDAQ', symbol: 'GOOGL', name: 'Google' },
            { exchange: 'NASDAQ', symbol: 'TSLA', name: 'Tesla' },
            { exchange: 'NASDAQ', symbol: 'META', name: 'Meta' },
            { exchange: 'NASDAQ', symbol: 'NVDA', name: 'NVIDIA' },
            { exchange: 'NASDAQ', symbol: 'MSFT', name: 'Microsoft' },
            { exchange: 'NASDAQ', symbol: 'AMZN', name: 'Amazon' },
            { exchange: 'OTC', symbol: 'XIACY', name: 'Xiaomi' }
        ]
    },

    // Get TradingView formatted symbol
    getFormattedSymbol(exchange, symbol) {
        return `${exchange}:${symbol}`;
    },

    // Get symbols for ticker tape
    getTickerTapeSymbols() {
        return this.symbols.tech.map(s => ({
            proName: this.getFormattedSymbol(s.exchange, s.symbol),
            title: s.name
        }));
    },

    // Parse query string for dynamic symbol
    getSymbolFromQuery() {
        const params = new URLSearchParams(window.location.search);
        return params.get('tvwidgetsymbol') || null;
    },

    // Widget default settings
    defaults: {
        colorTheme: 'light',
        locale: 'en',
        isTransparent: false,
        showSymbolLogo: true
    },

    // Performance optimization: Lazy load widgets
    lazyLoadWidget(container, config) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.initializeWidget(container, config);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '100px'
        });
        
        observer.observe(container);
    },

    // Initialize widget with config
    initializeWidget(container, config) {
        // Create script element
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = config.src;
        
        // Add configuration
        script.innerHTML = JSON.stringify({
            ...this.defaults,
            ...config.settings
        });
        
        container.appendChild(script);
    },

    // Dynamic widget creation
    createDynamicWidget(type, symbol, container) {
        const widgetTypes = {
            'single-quote': {
                src: 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js',
                settings: {
                    symbol: symbol,
                    width: '100%'
                }
            },
            'mini-chart': {
                src: 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js',
                settings: {
                    symbol: symbol,
                    width: '100%',
                    height: 220,
                    dateRange: '1D',
                    trendLineColor: 'rgba(41, 98, 255, 1)',
                    underLineColor: 'rgba(41, 98, 255, 0.3)',
                    underLineBottomColor: 'rgba(41, 98, 255, 0)'
                }
            },
            'technical-analysis': {
                src: 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js',
                settings: {
                    symbol: symbol,
                    interval: '1m',
                    width: '100%',
                    height: 450,
                    showIntervalTabs: true
                }
            },
            'symbol-info': {
                src: 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js',
                settings: {
                    symbol: symbol,
                    width: '100%'
                }
            },
            'company-profile': {
                src: 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js',
                settings: {
                    symbol: symbol,
                    width: '100%',
                    height: 480
                }
            }
        };

        const config = widgetTypes[type];
        if (config) {
            this.initializeWidget(container, config);
        }
    },

    // Batch load optimization for multiple widgets
    batchLoadWidgets(widgets) {
        // Group widgets by priority
        const priorityGroups = {
            high: [],    // Above the fold
            medium: [],  // Visible on scroll
            low: []      // Far below fold
        };

        widgets.forEach(widget => {
            const rect = widget.element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                priorityGroups.high.push(widget);
            } else if (rect.top < window.innerHeight * 2) {
                priorityGroups.medium.push(widget);
            } else {
                priorityGroups.low.push(widget);
            }
        });

        // Load by priority with delays
        priorityGroups.high.forEach(w => this.initializeWidget(w.element, w.config));
        
        setTimeout(() => {
            priorityGroups.medium.forEach(w => this.lazyLoadWidget(w.element, w.config));
        }, 100);
        
        setTimeout(() => {
            priorityGroups.low.forEach(w => this.lazyLoadWidget(w.element, w.config));
        }, 500);
    },

    // Performance monitoring
    monitorPerformance() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
                
                // Count widgets
                const widgetCount = document.querySelectorAll('.tradingview-widget-container').length;
                console.log(`Total widgets loaded: ${widgetCount}`);
                
                // Average load time per widget
                console.log(`Average per widget: ${Math.round(loadTime / widgetCount)}ms`);
            });
        }
    }
};

// Export for use in other scripts
window.WidgetConfig = WidgetConfig;