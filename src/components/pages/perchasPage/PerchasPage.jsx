import { useState } from "react";

export default function GuarderiaKayaks() {
  const ROWS = 16;
  const COLS = 10;
  const columnas = "ABCDEFGHIJ".split("");

  const initialGrid = Array.from({ length: ROWS }, (_, row) =>
    Array.from({ length: COLS }, (_, col) => {
      const rand = Math.random();
      let estado = "disponible";
      if (rand < 0.15) estado = "ocupado";
      return { id: `${row + 1}${columnas[col]}`, estado };
    })
  );

  const [perchas, setPerchas] = useState(initialGrid);
  const [perchaSeleccionada, setPerchaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [seleccionadas, setSeleccionadas] = useState([]);

  const handleSeleccion = (row, col) => {
    const percha = perchas[row][col];
    if (percha.estado !== "disponible") return;
    setPerchaSeleccionada({ row, col, id: percha.id });
    setMostrarModal(true);
  };

  const confirmarSeleccion = () => {
    const actualizadas = [...perchas];
    actualizadas[perchaSeleccionada.row][perchaSeleccionada.col].estado =
      "seleccionado";
    setPerchas(actualizadas);
    setSeleccionadas((prev) => [...prev, perchaSeleccionada.id]);
    setMostrarModal(false);
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="max-w-4xl w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-8">
            🚣 El Rincon del Remo
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Seleccione una percha disponible para guardar su kayak
          </p>
        </div>

        {/* Leyenda */}
        <div className="flex justify-center gap-8 text-sm mt-12 ">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-pink-400 border border-pink-500 shadow-sm" />
            <span className="text-pink-600">Seleccionado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-black border border-gray-700 shadow-sm" />
            <span className="text-gray-800">Ocupado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-300 border border-blue-400 shadow-sm" />
            <span className="text-blue-700">Disponible</span>
          </div>
        </div>

        {/* Grid con cabeceras */}
        <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-md bg-white p-4 text-center mt-4">
          <div className="inline-block">
            {/* Encabezado de columnas */}
            <div className="grid grid-cols-[50px_repeat(10,28px)] gap-2 mb-2">
              <div></div>
              {columnas.map((letra) => (
                <div
                  key={letra}
                  className="text-center text-sm font-medium text-gray-700"
                >
                  {letra}
                </div>
              ))}
            </div>

            {/* Filas */}
            <div className="grid gap-2">
              {perchas.map((fila, rowIdx) => (
                <div
                  key={rowIdx}
                  className="grid grid-cols-[50px_repeat(10,28px)] gap-2 items-center"
                >
                  <div className="text-sm text-center font-semibold text-gray-600">
                    {rowIdx + 1}
                  </div>
                  {fila.map((percha, colIdx) => {
                    const base =
                      "w-7 h-7 rounded-full cursor-pointer duration-200 shadow hover:scale-105";
                    let estilo = "";

                    if (percha.estado === "disponible")
                      estilo =
                        "bg-blue-300 hover:bg-blue-400 border border-blue-400";
                    else if (percha.estado === "ocupado")
                      estilo =
                        "bg-black cursor-not-allowed border border-gray-700";
                    else if (percha.estado === "seleccionado")
                      estilo = "bg-pink-400 border border-pink-500";

                    return (
                      <div
                        key={percha.id}
                        onClick={() => handleSeleccion(rowIdx, colIdx)}
                        className={`${base} ${estilo}`}
                        title={`Percha ${percha.id}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen de selección */}
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Resumen de selección
          </h3>
          <p className="text-sm text-gray-600">
            <strong>Total:</strong> {seleccionadas.length} percha(s)
            seleccionada(s)
          </p>
          {seleccionadas.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-2">
              {seleccionadas.map((id) => (
                <span
                  key={id}
                  className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium"
                >
                  {id}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-2xl text-center space-y-4 w-80 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800">
              Confirmar selección
            </h2>
            <p className="text-gray-600">
              ¿Deseas guardar tu kayak en la percha{" "}
              <strong className="text-blue-700">{perchaSeleccionada.id}</strong>
              ?
            </p>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => setMostrarModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarSeleccion}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-sm"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
