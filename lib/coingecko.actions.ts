'server-only'

import qs from 'query-string'

const BASE_URL = process.env.COINGECKO_BASE_URL
const API_KEY = process.env.COINGECKO_API_KEY

if (!BASE_URL) throw new Error('Could not get base url')
if (!API_KEY) throw new Error('Could not get api key')

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  )

  const response = await fetch(url, {
    headers: {
      'x-cg-demo-api-key': API_KEY,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: { revalidate },
  })

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}))

    throw new Error(`API Error: ${response.status}: ${errorBody.error || response.statusText} `)
  }

  return response.json()
}

export async function getPools(
  id: string,
  network?: string | null,
  contractAddress?: string | null
): Promise<PoolData> {
  const fallback: PoolData = {
    id: "",
    address: "",
    name: "",
    network: "",
  };

  if (network && contractAddress) {
    try {
const poolData = await fetcher<{ data: PoolData[] }>(
      `/onchain/networks/${network}/tokens/${contractAddress}/pools`
    );

    return poolData.data?.[0] ?? fallback;
    } catch (error) {
      console.log(error)
       return fallback;
    }
    
  }

  try {
    const poolData = await fetcher<{ data: PoolData[] }>(
      "/onchain/search/pools",
      { query: id }
    );

    return poolData.data?.[0] ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * SearchCoins: Implements the "Two-Step Data Merge"
 * 1. Search for coin IDs based on query
 * 2. Fetch full market data (price, 24h change) for those IDs
 */
export async function searchCoins(query: string) {
  if (!query) return [];

  try {
    // STEP 1: Get matching coin IDs
    // Returns: { coins: [{ id: 'bitcoin', ... }, { id: 'wrapped-bitcoin', ... }] }
    const searchResults = await fetcher<{ coins: SearchCoin[] }>("search", { query });

    if (!searchResults.coins || searchResults.coins.length === 0) return [];

    // Extract IDs and join them: "bitcoin,ethereum,cardano"
    const ids = searchResults.coins
      .slice(0, 10)
      .map((coin) => coin.id)
      .join(",");

    // STEP 2: Fetch actual market data (Price & 24h change) using the IDs
    // The markets endpoint provides the 'current_price' and 'price_change_percentage_24h'
    const enrichedCoins = await fetcher<SearchCoin[]>("coins/markets", {
      vs_currency: "usd",
      ids: ids,
      order: "market_cap_desc",
      sparkline: false,
      price_change_percentage: "24h",
    });

    return enrichedCoins;
  } catch (error) {
    console.error("searchCoins error:", error);
    return [];
  }
}

export async function getTrendingCoins(): Promise<TrendingCoin[]> {
  try {
    const res = await fetcher<{ coins: TrendingCoin[] }>('search/trending')
    return res.coins ?? []
  } catch (error) {
    console.error('getTrendingCoins error:', error)
    return []
  }
}

