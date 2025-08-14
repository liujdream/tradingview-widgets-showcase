# TradingView Widgets Showcase

A modern, responsive web application showcasing various TradingView widgets for real-time financial data visualization.

## 🆕 New Features Available!

- **Optimized Version** (`optimized.html`) - Performance-focused with lazy loading
- **Advanced Version** (`advanced.html`) - Template-based dynamic page builder
- **Extended Hours** (`extended-hours.html`) - Pre-market and post-market data display

## 🚀 Quick Start

1. Clone or download this repository
2. Choose your version:
   - **Standard**: Open `tradingview-widgets-showcase/index.html`
   - **Optimized**: Open `tradingview-widgets-showcase/optimized.html`
   - **Advanced**: Open `tradingview-widgets-showcase/advanced.html`
   - **Extended Hours**: Open `tradingview-widgets-showcase/extended-hours.html` (Pre/Post Market)
3. No installation or build process required!

## 📊 Featured Widgets

### 1. **Tickers**
   - Single ticker widgets for major tech stocks (AAPL, GOOGL, TSLA, META, NVDA, MSFT, AMZN, XIACY)
   - Continuous ticker tape with real-time price updates
   - Symbol Info cards with pre-market and post-market data

### 2. **Watchlist Widgets**
   - **Market Overview**: Multi-tab view of Indices, Futures, and Forex
   - **Stock Market**: Trending stocks and hot lists
   - **Market Data**: Comprehensive quotes across sectors

### 3. **Symbol Details**
   - Symbol information and statistics
   - Technical analysis with indicators
   - Fundamental data and financials
   - Company profiles

### 4. **Additional Features**
   - Real-time news feed
   - Economic calendar
   - Interactive multi-symbol charts

## 🎨 Design Features

- **Modern UI**: Clean, minimalist design with smooth animations
- **Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Performance**: Optimized loading with lazy initialization
- **Navigation**: Smooth scrolling with active section highlighting

## 📁 Project Structure

```
tradingview-widgets-showcase/
├── index.html             # Standard showcase
├── optimized.html         # Performance optimized version
├── advanced.html          # Template-based page builder
├── extended-hours.html    # Pre/Post market data display
├── css/
│   ├── styles.css         # Main styling
│   └── responsive-widgets.css # Responsive widget sizing
├── js/
│   ├── main.js            # Interactive features
│   ├── widget-config.js   # Widget configuration system
│   └── lazy-load.js       # Custom lazy loading component
└── assets/                # Additional resources
```

## 🎯 Optimization Features (optimized.html)

### Performance Enhancements
- **Lazy Loading**: Widgets load only when visible in viewport
- **Progressive Loading**: Staggered widget initialization to prevent browser blocking
- **On-Demand Loading**: Market overview loads only when requested
- **Performance Monitoring**: Real-time widget count and load time tracking

### Dynamic Features
- **Query String Support**: Load specific symbols via URL parameters (e.g., `?tvwidgetsymbol=NASDAQ:AAPL`)
- **Dynamic Widget Creation**: Select and load widgets for any symbol on-the-fly
- **Centralized Configuration**: Single source of truth for all widget settings
- **Symbol Mapping System**: Easy management of symbol lists

### Best Practices Implementation
- Follows TradingView's recommendations for multiple widgets
- Optimized script loading order
- Efficient DOM manipulation
- Memory-conscious widget management

## 📈 Extended Hours Trading (extended-hours.html)

### Pre-Market & Post-Market Features
- **Symbol Info Widget**: Best option for displaying extended hours data
- Shows regular session price ("At close") and extended hours prices
- Displays Pre-Market (4:00 AM - 9:30 AM ET) data when active
- Shows Post-Market (4:00 PM - 8:00 PM ET) data when available
- Includes timestamp for extended hours prices

### Key Benefits
- Real-time pre-market and after-hours price updates
- Compact "quote card" design perfect for dashboards
- Side-by-side comparison of different widget types
- Support for all major US exchanges

### Usage
- Direct access: `extended-hours.html`
- With specific symbol: `extended-hours.html?symbol=NASDAQ:AAPL`

## 🛠️ Customization

### Change Tracked Symbols
Edit the symbol arrays in the widget configurations within `index.html`:
```javascript
"symbols": [
    {"proName": "NASDAQ:AAPL", "title": "Apple"},
    // Add your symbols here
]
```

### Modify Theme
Change `"colorTheme": "light"` to `"colorTheme": "dark"` in widget configurations for dark mode.

### Adjust Layout
The grid-based CSS allows easy rearrangement of widgets by modifying `styles.css`.

## 💻 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers

## 🚦 Usage Examples

### For Personal Finance Dashboard
Perfect for tracking your investment portfolio with real-time market data.

### For Business Websites
Enhance your financial website with professional market data widgets.

### For Educational Purposes
Learn about financial markets with comprehensive data visualization.

## 📈 Widget Categories

| Category | Description | Use Case |
|----------|-------------|----------|
| Tickers | Individual stock quotes | Portfolio tracking |
| Watchlists | Market overviews | Market analysis |
| Charts | Technical analysis | Trading decisions |
| News | Market updates | Stay informed |
| Calendar | Economic events | Planning ahead |

## ⚡ Performance Tips

1. **Limit Active Widgets**: Too many widgets may slow page loading
2. **Use Lazy Loading**: Widgets load as needed when scrolling
3. **Optimize for Mobile**: Consider fewer widgets on mobile devices

## 🔧 Development

### Adding New Widgets

1. Visit [TradingView Widget Library](https://www.tradingview.com/widget-docs/)
2. Configure your desired widget
3. Copy the embed code
4. Add to the appropriate section in `index.html`
5. Style with existing CSS classes

### Local Development

Simply edit files and refresh your browser - no build process needed!

## 📝 Notes

- Free tier data may have 15-minute delay
- Some features require TradingView account
- Widgets update automatically with market data

## 🤝 Contributing

Feel free to fork this project and customize it for your needs. Contributions are welcome!

## 📄 License

This project uses TradingView's free widgets. Please review [TradingView's terms](https://www.tradingview.com/policies/) for widget usage.

## 🙏 Credits

- Financial data provided by [TradingView](https://www.tradingview.com/)
- Built with HTML5, CSS3, and vanilla JavaScript

## 📞 Support

For widget-specific issues, consult [TradingView Documentation](https://www.tradingview.com/widget-docs/)

---

**Live Demo**: Open `index.html` in your browser to see it in action!

**Last Updated**: 2024