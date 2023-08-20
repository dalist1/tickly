// /api/storage

import { kv } from "@vercel/kv"
import { NextResponse } from "next/server"

export const runtime = 'edge'

export async function POST(request) {
  console.log("api was called for POST")
  const res = await request.json()
  const { strategyName, td } = res
  const totalTime = td?.totalTime 
  console.log('total time is', (totalTime || 0))

  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
  const key = `${strategyName}-${today}`;  

  let existingTotalTime = await kv.get(key)


  console.log("prev total time", existingTotalTime)
  console.log("adding an additional", totalTime)
  const updatedTotalTime = (existingTotalTime || 0) + (totalTime || 0)

  await kv.set(key, updatedTotalTime.toString())
  console.log("added the updatedTotalTime", updatedTotalTime)
}


export async function GET(request) {
  const strategyName = request.nextUrl.searchParams.get('strategyName')

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  });
  

  const timeData = {};
  for (const date of dates) {
    const key = `${strategyName}-${date}`
    const totalTime = await kv.get(key)
    timeData[date] = parseFloat(totalTime).toFixed(2)
  }

  return NextResponse.json(timeData)
}