import Head from 'next/head';
import Link from 'next/link';
import Card from '../components/Card';

export default function Home() {
  const folders = [
    { title: 'Anxiety', path: '/folders/anxiety' },
    { title: 'Burnout', path: '/folders/burnout' },
    { title: 'ADHD', path: '/folders/adhd' },
  ];

  return (
    <div className="min-h-screen bg-yellow-100 text-gray-800 p-8">
      <Head>
        <title>Perspective App</title>
      </Head>
      <h1 className="text-4xl font-bold mb-6">Perspective App</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {folders.map((folder) => (
          <Link key={folder.title} href={folder.path}>
            <a>
              <Card title={folder.title} description={`Go to the ${folder.title} folder`} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
