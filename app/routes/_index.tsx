import {
  type ClientLoaderFunction,
  json,
  useLoaderData,
} from '@remix-run/react'

// 遅延を発生させるユーティリティ関数
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const loader: LoaderFunction = async () => {
  // 5秒の遅延をシミュレーション
  await delay(5000)
  return json({})
}

export const clientLoader: ClientLoaderFunction = async () => {
  const startTime = performance.now()

  // 3秒の遅延をシミュレーション
  await delay(3000)

  const endTime = performance.now()
  const loadTime = ((endTime - startTime) / 1000).toFixed(2)

  return json({
    message: `クライアントでのデータの処理に${loadTime}秒かかりました`,
  })
}
clientLoader.hydrate = true

export default function Index() {
  const { message } = useLoaderData<typeof clientLoader>()

  return (
    <>
      {message ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center space-y-2">
            <h1 className="text-xl">ちいかたの低パフォーマンスサイト</h1>
            <p>{message}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      )}
    </>
  )
}
