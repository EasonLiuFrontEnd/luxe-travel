import { NextRequest, NextResponse } from 'next/server'

const EXTERNAL_API_BASE = 'https://luxetravel-peach.vercel.app'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params
    const searchParams = request.nextUrl.searchParams

    const apiPath = path.join('/')
    const queryString = searchParams.toString()
    const fullUrl = `${EXTERNAL_API_BASE}/api/${apiPath}${queryString ? `?${queryString}` : ''}`

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Next.js Proxy',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `API 請求失敗: ${response.status}` },
        { status: response.status },
      )
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Proxy 伺服器錯誤' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params
    const body = await request.text()

    const apiPath = path.join('/')
    const fullUrl = `${EXTERNAL_API_BASE}/api/${apiPath}`

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Next.js Proxy',
      },
      body,
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `API 請求失敗: ${response.status}` },
        { status: response.status },
      )
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Proxy 伺服器錯誤' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params
    const body = await request.text()

    const apiPath = path.join('/')
    const fullUrl = `${EXTERNAL_API_BASE}/api/${apiPath}`

    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Next.js Proxy',
      },
      body,
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `API 請求失敗: ${response.status}` },
        { status: response.status },
      )
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Proxy 伺服器錯誤' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params

    const apiPath = path.join('/')
    const fullUrl = `${EXTERNAL_API_BASE}/api/${apiPath}`

    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Next.js Proxy',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `API 請求失敗: ${response.status}` },
        { status: response.status },
      )
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Proxy 伺服器錯誤' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
