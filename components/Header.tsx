'use client'

import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SearchModal = dynamic(() => import('./SearchModal').then((m) => m.SearchModal), {
  ssr: false,
})

const Header = ({ trendingCoins = [] }: { trendingCoins?: TrendingCoin[] }) => {
  const pathname = usePathname()

  return (
    <header>
      <div className="main-container inner">
        <Link href="/">
          <Image src="/logo.svg" alt="CoinPulse logo" width={132} height={40} />
        </Link>

        <nav>
          <Link
            href={'/'}
            className={cn('nav-link', {
              'is-active': pathname === '/',
              'is-home': true,
            })}
          >
            Home
          </Link>

          <SearchModal initialTrendingCoins={trendingCoins} />
          <Link
            href={'/coins'}
            className={cn('nav-link', {
              'is-active': pathname === '/coins',
            })}
          >
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
