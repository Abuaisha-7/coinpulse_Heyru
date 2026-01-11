import { fetcher } from '@/lib/coingecko.actions'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const coinId = searchParams.get('coinId')
  const days = searchParams.get('days')

  try {
    if (!coinId) {
      return NextResponse.json({ error: 'coinId is required' }, { status: 400 })
    }
    if (days != null && !/^\d+(\.\d+)?$/.test(days)) {
      return NextResponse.json({ error: 'days must be a number' }, { status: 400 })
    }
    const data = await fetcher(`coins/${coinId}/ohlc`, {
      vs_currency: 'usd',
      days: days || '1',
    })
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
