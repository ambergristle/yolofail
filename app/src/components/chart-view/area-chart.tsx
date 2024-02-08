'use client';

import { AreaChart, AreaChartProps, Legend } from '@tremor/react';

import { cn } from '@/lib/utils';

/**
 * custom tooltip and legend are necessary to
 * override default category labels (keys). there's
 * also some stylistic defaulting going on
 */

type PropTypes<
  T extends { [key: string]: unknown }, 
  Index extends string & keyof T, 
  Key extends string & Exclude<keyof T, Index>
> = {
  data: T[];
  index: Index;
  categories: Key[];
  colors: AreaChartProps['colors'];
  getLabel: (key: Key) => string;
  formatValue: (value: number) => string;
}

const SeriesChart = <
  T extends { [key: string]: unknown }, 
  Index extends string & keyof T, 
  Key extends string & Exclude<keyof T, Index>
>({
    data,
    index,
    categories,
    colors,
    getLabel,
    formatValue,
  }: PropTypes<T, Index, Key>) => {

  return (
    <div className="h-96 w-full">
      <div className="flex h-9 w-full items-center justify-end">
        <Legend
          className="mt-3"
          categories={categories.map(getLabel)}
          colors={colors}
        />
      </div>
      <AreaChart
        data={data}
        index={index}
        categories={categories}
        colors={colors}
        valueFormatter={formatValue}
        showAnimation
        showXAxis={false}
        showYAxis={false}
        showLegend={false}
        customTooltip={({ payload, active, label }) => {
          if (!active || !payload) return null;

          return (
            <div className="rounded-tremor-default border border-tremor-border bg-tremor-background text-tremor-default shadow-tremor-dropdown dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:shadow-dark-tremor-dropdown">
              <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
                <p className="font-medium text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
                  {label}
                </p>
              </div>
              <div className="space-y-1 px-4 py-2">
                {payload.map((category) => (
                  <div 
                    key={`${category.dataKey}-${category.value}`} 
                    className="flex items-center justify-between space-x-8"
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className={cn(
                          // common
                          'size-3 shrink-0 rounded-tremor-full border-2',
                          // light
                          'border-tremor-background shadow-tremor-card',
                          // dark
                          'dark:border-dark-tremor-background dark:shadow-dark-tremor-card',
                          `bg-${category.color}-500`,
                        )}
                      />
                      <p
                        className={cn(
                          // commmon
                          'whitespace-nowrap text-right',
                          // light
                          'text-tremor-content',
                          // dark
                          'dark:text-dark-tremor-content',
                        )}
                      >
                        {getLabel(category.dataKey as Key)}
                      </p>
                    </div>
                    <p
                      className={cn(
                        // common
                        'whitespace-nowrap text-right font-medium tabular-nums',
                        // light
                        'text-tremor-content-emphasis',
                        // dark
                        'dark:text-dark-tremor-content-emphasis',
                      )}
                    >
                      {formatValue(category.value as number)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default SeriesChart;
