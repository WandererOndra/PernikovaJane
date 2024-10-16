"use client";

export default function Fun() {
  // Open new window with the specified URL
  const openFormUrl = () => {
    window.open("https://kotva.wufoo.com/forms/zwaq9x71kve9rt/", "_blank");
  };

  return (
    <main>
      {/* Poster */}
      <div className="flex flex-col items-center py-5 gap-5 lg:pt-10 lg:px-32">
        <div 
          className="relative w-72 h-96 bg-cover bg-center cursor-pointer transition-transform duration-500 hover:scale-110 rounded-lg"
          style={{ backgroundImage: "url('/stopovacka.png')" }}
          onClick={openFormUrl} // Open the URL on click
        >
          <div className="absolute inset-0 bg-blue-600 bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity duration-500 hover:opacity-100 rounded-lg">
            <span className="text-white text-2xl font-bold">Přihlásit se</span>
          </div>
        </div>
      </div>
    </main>
  );
}
