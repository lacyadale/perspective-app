export default function Card({ title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 m-4 hover:bg-yellow-50 transition">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
