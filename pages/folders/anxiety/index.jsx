import Card from '../../../components/Card';

export default function AnxietyFolder() {
  const cards = [
    {
      title: 'Trigger: Social Situation',
      description: 'You feel nervous before walking into a group event.',
    },
    {
      title: 'Reaction: Avoidance',
      description: 'You cancel plans or ghost the group chat.',
    },
    {
      title: 'Original Purpose',
      description: 'Protection from rejection or shame.',
    },
    {
      title: 'Repurpose Plan',
      description: 'Breathe + reframe: “Safety isn’t always silence.”',
    },
    {
      title: 'Core Function',
      description: 'You notice when a situation feels unsafe before others do.',
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
