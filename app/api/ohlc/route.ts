import { fetcher } from '@/lib/coingecko.actions'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const coinId = searchParams.get('coinId')
  const days = searchParams.get('days')

  try {
    const data = await fetcher(`coins/${coinId}/ohlc`, {
      vs_currency: 'usd',
      days: days || '1',
    })
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}