import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-yellow-100 text-gray-800 p-8">
      <Head>
        <title>Perspective App</title>
      </Head>
      <h1 className="text-4xl font-bold mb-4">Welcome to Perspective</h1>
      <p className="text-lg">Click a folder to explore your emotional logic layers.</p>
    </div>
  )
}
