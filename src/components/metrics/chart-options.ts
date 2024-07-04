import { Legend } from 'chart.js'
import { callback, color } from 'chart.js/helpers'

export const setChartOptions = (configure = '1') => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
  const primaryColor = documentStyle.getPropertyValue('--primary-color')
  const grayLineColor = documentStyle.getPropertyValue('--gray-line-color')

  if (configure === '1') {
    return {
      plugins: {
        legend: {
          display: false,
          labels: {
            color: textColor
          }
        },
        tooltip: {
          padding: 10,
          backgroundColor: primaryColor,
          footerColor: 'white',
          footerFont: {
            size: '10px',
            weight: 'semibold'
          },
          callbacks: {
            footer: (tooltipItems: any) => {
              let sum = 0

              tooltipItems.forEach(function (tooltipItem: any) {
                sum = tooltipItem.parsed.y
              })
              return 'GPA: ' + sum
            },
            title: (tooltipItems: any) => {
              return null
            },
            label: (tooltipItems: any) => {
              return null
            }
          }
        }
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          font: {
            size: 24
          },
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: 'transparent'
          },
          border: {
            color: 'transparent'
          }
        },
        y: {
          font: {
            size: 24
          },
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: grayLineColor
          },
          border: {
            color: 'transparent'
          },
          min: 2,
          max: 4
        }
      }
    }
  }
}

export const defaultValues = {
  defaultDataX: [null, 2.9, 3.1, 3.5, 3.3]
}
