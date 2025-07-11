import Card from '../../../components/Card';

export default function AnxietyFolder() {
  const cards = [
    {
      title: 'Trigger: What if...?',
      description: 'Your mind loops on worst-case scenarios.',
    },
    {
      title: 'Reaction: Avoid or Overprepare',
      description: 'You freeze or exhaust yourself with contingency plans.',
    },
    {
      title: 'Original Purpose',
      description: 'Stay safe by anticipating risk.',
    },
    {
      title: 'Repurpose Plan',
      description: 'Focus on small wins + reality testing.',
    },
    {
      title: 'Core Function',
      description: 'You’re wired to spot danger before others do.',
    }
  ];

  return (
    <div className="min-h-screen bg-yellow-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Anxiety Folder</h1>
      {cards.map((card, idx) => (
        <Card key={idx} title={card.title} description={card.description} />
      ))}
    </div>
  );
}
