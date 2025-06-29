import { useState, useEffect } from "react";
import { getPerchas, crearPercha } from "../../../service/perchas";
import { useAuth } from "../../context/authContext/AuthContext";
import AddKayakModal from "../myKayaks/addKayakModal";

export default function GuarderiaKayaks() {
  const [perchas, setPerchas] = useState([]);
  const [perchaSeleccionada, setPerchaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [perchaId, setPerchaId] = useState(null);

  const { userInfo } = useAuth();

  const ROWS = 10;
  const COLS = 10;
  const columnas = "ABCDEFGHIJ".split("");
  const PRECIO_POR_PERCHA = 1500;

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const getAllPerchas = async () => {
      try {
        const data = await getPerchas();
        console.log("📋 Perchas obtenidas del servidor:", data);

        const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

        data.forEach((percha) => {
          const row = Number.parseInt(percha.location.slice(0, -1)) - 1;
          const col = columnas.indexOf(percha.location.slice(-1));
          if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
            grid[row][col] = {
              id: percha.location,
              estado: percha.isOccupied ? "ocupado" : "disponible",
              perchaData: percha, // Guardar datos completos para debug
            };
          }
        });

        setPerchas(grid);
      } catch (error) {
        console.error("Error al obtener perchas:", error);
      }
    };

    getAllPerchas();
  }, []);
  const handleSeleccion = (row, col) => {
    const percha = perchas[row][col];
    if (!percha || percha.estado !== "disponible") return;

    const tienePercha = perchas.some((row) =>
      row.some(
        (percha) =>
          percha?.estado === "ocupado" && seleccionadas.includes(percha.id)
      )
    );

    if (tienePercha) {
      alert(
        "Ya tienes una percha ocupada. No puedes ocupar más de una percha."
      );
      return;
    }

    const actualizadas = [...perchas];
    actualizadas[row][col].estado = "seleccionado";
    setPerchas(actualizadas);
    setPerchaSeleccionada({ row, col, id: percha.id });
    setMostrarModal(true);
  };

  const handleCancelar = () => {
    setMostrarModal(false);
    if (perchaSeleccionada) {
      const actualizadas = [...perchas];
      actualizadas[perchaSeleccionada.row][perchaSeleccionada.col].estado =
        "disponible";
      setPerchas(actualizadas);
      setPerchaSeleccionada(null);
    }
  };

  const handleCreate = async () => {
    try {
      if (!perchaSeleccionada) return;
      if (!userInfo?.oid) {
        alert(
          "Error: No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente."
        );
        return;
      }
      const id = perchaSeleccionada.id;
      console.log("🆔 ID de percha seleccionada:", id);

      // Verificar si la percha ya existe en los datos del servidor
      const perchaActual =
        perchas[perchaSeleccionada.row][perchaSeleccionada.col];
      console.log("📊 Datos actuales de la percha:", perchaActual);

      const match = id.match(/^(\d+)([A-J])$/);
      if (!match) {
        console.error("❌ Formato de ID inválido:", id);
        alert("Error: Formato de percha inválido");
        return;
      }

      const rowFromId = Number.parseInt(match[1]);
      const columnFromId = match[2];

      if (!userInfo?.oid) {
        console.error("No se encontró el ID del usuario");
        alert("Error: No se pudo obtener el ID del usuario");
        return;
      }

      const data = {
        row: rowFromId,
        column: columnFromId,
        userId: userInfo.oid,
      };

      const response = await crearPercha(data);
      console.log("Percha creada:", response);

      const perchaId = response.id || response.perchaId;
      console.log("ID de la percha creada:", perchaId);
      setPerchaId(perchaId);

      const actualizadas = [...perchas];
      const [fila, columna] = perchaSeleccionada.id.split("");
      const filaNum = parseInt(fila) - 1;
      const colNum = columnas.indexOf(columna);

      if (actualizadas[filaNum] && actualizadas[filaNum][colNum]) {
        actualizadas[filaNum][colNum].estado = "ocupado";
        setPerchas(actualizadas);
        setSeleccionadas((prev) => [...prev, perchaSeleccionada.id]);
      } else {
        console.error("No se pudo encontrar la percha en la matriz");
      }

      // Aquí abrimos el modal de AddKayak
      setIsModalOpen(true);

      setMostrarModal(false);
    } catch (error) {
      console.error("Error creando percha:", error);
      alert("Error al crear la percha. Por favor, intenta nuevamente.");
    }
  };

  const totalPerchasOcupadas = perchas
    .flat()
    .filter((p) => p?.estado === "ocupado").length;

  const totalAPagar = totalPerchasOcupadas * PRECIO_POR_PERCHA;

  const handlePagar = () => {
    alert(`Gracias por tu pago de $${totalAPagar}!`);
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-blue-100 dark:bg-[#003459] relative">
      <div className="max-w-4xl w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-100 mb-8">
            El Rincon del Remo 🚣
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-md font-bold mt-2">
            Seleccione una percha disponible para guardar su kayak
          </p>
        </div>

        {/* Leyenda */}
        <div className="flex justify-center gap-8 text-sm mt-12 ">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-pink-400 border border-pink-500 shadow-sm" />
            <span className="text-pink-600 dark:text-pink-400">
              Seleccionado
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-black border border-gray-700 shadow-sm" />
            <span className="text-gray-800 dark:text-gray-200">Ocupado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-300 border border-blue-400 shadow-sm" />
            <span className="text-blue-700 dark:text-blue-200">Disponible</span>
          </div>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-md bg-white p-4 text-center mt-4">
          <div className="inline-block">
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
                    if (!percha) return <div key={colIdx} />;
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

        {/* Resumen de perchas */}
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Tus perchas
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Total:</strong> {totalPerchasOcupadas} percha(s)
              ocupada(s)
            </p>
            {totalPerchasOcupadas > 0 && (
              <div className="mt-1 flex flex-wrap gap-2">
                {perchas
                  .flat()
                  .filter((p) => p?.estado === "ocupado")
                  .map((percha) => (
                    <span
                      key={percha.id}
                      className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium"
                    >
                      {percha.id}
                    </span>
                  ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center border-t pt-4 mt-2">
            <p className="text-md font-semibold text-gray-700">
              Total a pagar:
              <span className="text-blue-700 ml-2">${totalAPagar}</span>
            </p>
            <button
              onClick={handlePagar}
              className="bg-green-500 hover:bg-green-600 cursor-pointer text-white text-sm font-medium px-4 py-2 rounded shadow"
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
      <AddKayakModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        perchaId={perchaId}
      />
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
                onClick={handleCancelar}
                className="bg-gray-300 cursor-pointer text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 shadow-sm"
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
