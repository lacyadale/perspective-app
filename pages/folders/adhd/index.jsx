import Card from '../../../components/Card';

export default function ADHDFolder() {
  const cards = [
    {
      title: 'Trigger: Boring Task',
      description: 'You lose focus before you even start.',
    },
    {
      title: 'Reaction: Scroll/Procrastinate',
      description: 'You end up doomscrolling or avoiding the task entirely.',
    },
    {
      title: 'Original Purpose',
      description: 'Stimulate the brain to stay engaged.',
    },
    {
      title: 'Repurpose Plan',
      description: 'Gamify it or set a timer to “beat the clock.”',
    },
    {
      title: 'Core Function',
      description: 'You naturally filter out low-interest signals and chase spark.',
    }
  ];

  return (
    <div className="min-h-screen bg-yellow-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">ADHD Folder</h1>
      {cards.map((card, idx) => (
        <Card key={idx} title={card.title} description={card.description} />
      ))}
    </div>
  );
}
