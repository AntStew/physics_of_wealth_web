# Rocketship View Component Structure

This directory contains the refactored and organized components for the Rocketship View (Control Center).

## Directory Structure

```
rocketship/
├── components/          # Reusable UI components
│   ├── CircularGauge.tsx
│   ├── CoreMetricsSection.tsx
│   ├── EngineTypeBarChart.tsx
│   ├── ETFManagementSection.tsx
│   ├── FinancialPerformanceSection.tsx
│   ├── InfoTooltip.tsx
│   ├── PortfolioValueLineChart.tsx
│   └── SystemAnalysisSection.tsx
├── hooks/               # Custom React hooks
│   └── useRocketshipMetrics.ts
├── utils/               # Utility functions and constants
│   └── metrics.ts
├── HUDWidget.tsx        # Main HUD widget container
├── index.ts            # Barrel exports
└── README.md           # This file
```

## Component Organization

### Main Component
- **`RocketshipView.tsx`** (in parent directory): Main entry point, orchestrates the view

### HUD Widget
- **`HUDWidget.tsx`**: Container component that combines all metric sections

### Section Components
- **`CoreMetricsSection.tsx`**: Displays circular gauges for Overall Health and Engine Integrity
- **`FinancialPerformanceSection.tsx`**: Shows financial metrics and performance bars
- **`SystemAnalysisSection.tsx`**: Contains charts for portfolio analysis

### Chart Components
- **`CircularGauge.tsx`**: Reusable circular progress gauge
- **`PortfolioValueLineChart.tsx`**: Exponential line chart showing portfolio growth
- **`EngineTypeBarChart.tsx`**: Horizontal bar chart for engine type distribution

### UI Components
- **`InfoTooltip.tsx`**: Tooltip button for metric descriptions
- **`ETFManagementSection.tsx`**: Table and management interface for ETFs

### Hooks
- **`useRocketshipMetrics.ts`**: Custom hook that calculates all portfolio metrics using `useMemo` for performance

### Utils
- **`metrics.ts`**: 
  - Metric descriptions
  - Classification functions
  - Status text generators
  - Engine type breakdown calculator

## Benefits of This Structure

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused or tested independently
3. **Maintainability**: Easier to locate and modify specific functionality
4. **Performance**: Calculations are memoized in hooks
5. **Readability**: Main component is now ~50 lines instead of ~990 lines
6. **Testability**: Individual components can be tested in isolation

## Usage

```tsx
import { RocketshipView } from "@/components/control-center/RocketshipView";

<RocketshipView engines={engines} />
```

## Future Improvements

- Add unit tests for individual components
- Extract chart logic into a shared chart library
- Add Storybook stories for component documentation
- Consider adding error boundaries for chart components

