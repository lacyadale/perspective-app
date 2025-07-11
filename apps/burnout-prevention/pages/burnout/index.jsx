import Card from '../../../components/Card';

export default function BurnoutFolder() {
  const cards = [
    {
      title: 'Trigger: Constant Demands',
      description: 'You feel overwhelmed by back-to-back expectations.',
    },
    {
      title: 'Reaction: Shutdown',
      description: 'You go numb or disengage completely.',
    },
    {
      title: 'Original Purpose',
      description: 'Protect your energy and sanity from depletion.',
    },
    {
      title: 'Repurpose Plan',
      description: 'Mini-breaks + boundary statements = better stamina.',
    },
    {
      title: 'Core Function',
      description: 'You recognize when energy systems are unsustainable.',
    }
  ];

  return (
    <div className="min-h-screen bg-yellow-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Burnout Folder</h1>
      {cards.map((card, idx) => (
        <Card key={idx} title={card.title} description={card.description} />
      ))}
    </div>
  );
}
