import KayakList from "../../kayakList/KayakList";


const HistorialKayaks = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="w-full p-4">
          <div className="mb-10 relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#71c4ca] to-blue-500/20 dark:from-green-600 dark:to-blue-500 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-6 w-32 h-32 bg-gradient-to-tr from-[#71c4ca] to-blue-500/20 dark:from-green-600 dark:to-blue-500 rounded-full blur-xl"></div>
            <div className="relative">
              <h1 className="text-4xl font-extrabold text-[#007178] tracking-tight dark:text-white">Historial</h1>
              <p className="text-gray-500 dark:text-gray-300 max-w-2xl mt-4">Explora y administrá tu colección personal de kayaks. Mantené un registro detallado de cada embarcación.</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full m-auto">
          <KayakList />
        </div>
      </div>

    </>
  )
}

export default HistorialKayaks;