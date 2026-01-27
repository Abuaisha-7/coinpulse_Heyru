import { searchCoins } from '@/lib/coingecko.actions'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q') || ''

    const results = await searchCoins(q)

    return NextResponse.json(results)
  } catch (error) {
    console.error('API /api/search error:', error)
    return NextResponse.json([], { status: 500 })
  }
}
