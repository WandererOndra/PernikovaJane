//About.js

import Image from "next/image";

export default function About() {
  return (
    <main>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full">
          <Image
            src="/vedouci.jpg"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 'auto', height: 'auto' }}
            alt="Obrázek členů"
            priority={true}
          />
        </div>
        <div className="mx-auto my-0 md:my-8 px-4 py-4 md:pb-10 sm:px-6 lg:mx-8">
          <div className="text-center my-8 md:px-32">
            <div className="text-4xl sm:text-6xl md:text-8xl my-9 tracking-tighter">
              <h2>Něco málo o nás</h2>
            </div>
            <div className="text-lg sm:text-2xl">
              <p>Jako skupina vedoucích jsme na letním táboře v roce 2011 začali uvažovat o tom, jak bychom mohli zachránit právě prodávaný objekt základny, protože nikdo z nás si letní prázdniny bez Hněvkova nedokázal představit. Po několika jednáních s paní starostkou, radními a zastupiteli jsme se rozhodli založit občanské sdružení, které by mohlo provozovat nejen letní dětské rekreace, ale také další volnočasové aktivity pro děti z Králík a okolí. A tak se také stalo. V květnu roku 2012 vzniklo občanské sdružení K. O. T. V. A. (Králická organizace tvorby volnočasových aktivit) dnes již z.s. K.O.T.V.A.</p>
            </div>
          </div>
          <div className="flex flex-col items-center sm:flex-row sm:justify-around">
            <div className="text-center mb-4 sm:mr-4 sm:mb-0 flex flex-col items-center basis-1/3">
              <Image
                src="/regi.png"
                width={200}
                height={200}
                alt="Obrázek předsedkyně"
                priority={true}
              />
              <h5 className="text-lg font-semibold">REGINA MATOULKOVÁ</h5>
              <p className="text-sm">Předsedkyně sdružení a programová vedoucí.💪</p>
            </div>
            <div className="text-center mb-4 sm:mr-4 sm:mb-0 flex flex-col items-center basis-1/3">
              <Image
                src="/pita.png"
                width={200}
                height={200}
                alt="Obrázek místopředsedkyně"
                priority={true}
              />
              <h5 className="text-lg font-semibold">PETRA HANÁKOVÁ</h5>
              <p className="text-sm">Místopředsedkyně sdružení a hlavní vedoucí.😎</p>
            </div>
            <div className="text-center mb-4 sm:mr-4 sm:mb-0 flex flex-col items-center basis-1/3">
              <Image
                src="/paja.png"
                width={200}
                height={200}
                alt="Obrázek hospodářky"
                priority={true}
              />
              <h5 className="text-lg font-semibold">PAVLÍNA HANÁKOVÁ</h5>
              <p className="text-sm">Hospodářka.📚</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
