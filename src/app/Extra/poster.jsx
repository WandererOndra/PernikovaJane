// Poster

export default function Poster({ title, date, image, alt, link }) {
  return (
    <div className="space-y-2 text-center">
      <div className="text-sm text-gray-500">{date}</div>
      <div className="text-lg font-semibold">{title}</div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02]"
      >
        <img
          src={image}
          alt={alt || title}
          className="w-full h-auto object-cover"
        />
      </a>
    </div>
  );
}
