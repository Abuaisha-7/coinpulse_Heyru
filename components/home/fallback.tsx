import DataTable from '@/components/DataTable'

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image bg-dark-400" />

        <div className="info">
          <div className="header-line-lg bg-dark-400" />
          <div className="header-line-sm bg-dark-400" />
        </div>
      </div>

      <div className="flex gap-2 my-3 items-center">
        <div className="period-button-skeleton bg-dark-400" />
        <div className="period-button-skeleton bg-dark-400" />
        <div className="period-button-skeleton bg-dark-400" />
      </div>

      <div className="chart">
        <div className="chart-skeleton bg-dark-400" />
      </div>
    </div>
  )
}

export const TrendingCoinsFallback = () => {
  const columns = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: () => (
        <div className="name-link">
          <div className="name-image bg-dark-400" />
          <div className="name-line bg-dark-400" />
        </div>
      ),
    },
    {
      header: '24h Change',
      cellClassName: 'change-cell',
      cell: () => (
        <div className="price-change">
          <div className="change-icon bg-dark-400" />
          <div className="change-line bg-dark-400" />
        </div>
      ),
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: () => <div className="price-line bg-dark-400" />,
    },
  ]

  const data = Array.from({ length: 6 }, (_, i) => ({ id: `placeholder-${i}` }))

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>

      <div>
        <DataTable
          data={data}
          columns={columns}
          rowKey={(row) => row.id}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  )
}

export default CoinOverviewFallback
