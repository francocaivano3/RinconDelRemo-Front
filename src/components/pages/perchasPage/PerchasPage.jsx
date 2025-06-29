import { useState, useEffect } from "react";
import { getPerchas, crearPercha } from "../../../service/perchas";
import { paymetMp } from "../../../service/paymet";
import { useAuth } from "../../context/authContext/AuthContext";
import { useTranslate } from "../../../hooks/useTranslate";
import AddKayakModal from "../myKayaks/addKayakModal";

export default function GuarderiaKayaks() {

  const [perchas, setPerchas] = useState([]);
  const [perchaSeleccionada, setPerchaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalAddKayak, setMostrarModalAddKayak] = useState(false);
  const [showPaymet, setShowPaymet] = useState(false);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [perchaId, setPerchaId] = useState(null);


  const translate = useTranslate();
  const { userInfo } = useAuth();

  const ROWS = 10;
  const COLS = 10;
  const columnas = "ABCDEFGHIJ".split("");
  const PRECIO_POR_PERCHA = 20000;

  const totalPerchasOcupadas = perchas
  .flat()
  .filter((p) => p?.estado === "ocupado").length;

const totalAPagar = totalPerchasOcupadas * PRECIO_POR_PERCHA;

const [formData, setFormData] = useState({
  amount: totalAPagar,
  description: "",
  email: "",
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  useEffect(() => {
    const getAllPerchas = async () => {
      try {
        const data = await getPerchas();
        const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

        data.forEach((percha) => {
          const row = parseInt(percha.location.slice(0, -1)) - 1;
          const col = columnas.indexOf(percha.location.slice(-1));

          if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
            grid[row][col] = {
              id: percha.location,
              estado: percha.isOccupied ? "ocupado" : "disponible",
            };
          }
        });

        setPerchas(grid);
      } catch (error) {
        console.error(error);
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
        translate(
          "Ya tienes una percha ocupada. No puedes ocupar más de una percha."
        )
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

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        amount: totalAPagar,
        description: formData.description || "Pago por alquiler de percha",  // Usamos un valor por defecto si no hay descripción
        email: formData.email,
      };
      const response = await paymetMp(data);
      console.log("Pago exitoso", response);
      const linkPago = response.paymentUrl
      console.log("Link de pago:", linkPago);
      
// Abrir en nueva pestaña
window.open(linkPago, '_blank');
    

      setMostrarModal(false);
      setShowPaymet(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    try {
      if (!perchaSeleccionada) return;
      const tienePercha = perchas.some((row) =>
        row.some(
          (percha) =>
            percha?.estado === "ocupado" && seleccionadas.includes(percha.id)
        )
      );

      if (tienePercha) {
        alert(
          translate(
            "Ya tienes una percha ocupada. No puedes ocupar más de una percha."
          )
        );
        return;
      }

      const id = perchaSeleccionada.id;
      const row = parseInt(id.slice(0, -1));
      const column = id.slice(-1);

      if (!userInfo?.oid) {
        console.error("No se encontró el ID del usuario");
        alert("Error: No se pudo obtener el ID del usuario");
        return;
      }

      const data = {
        Row: row,
        Column: column,
        OwnerId: userInfo.oid,
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

      setMostrarModal(false);
      setMostrarModalAddKayak(true);
    } catch (error) {
      console.error("Error creando percha:", error);
      alert("Error al crear la percha. Por favor, intenta nuevamente.");
    }
  };



  const handlePagar = () => {
    setShowPaymet(true);
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-blue-100 dark:bg-[#003459] relative">
      <div className="max-w-4xl w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-100 mb-8">
            El Rincon del Remo 🚣
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-md font-bold mt-2">
            {translate(
              "Seleccione una percha disponible para guardar su kayak"
            )}
          </p>
        </div>

        {/* Leyenda */}
        <div className="flex justify-center gap-8 text-sm mt-12 ">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-pink-400 border border-pink-500 shadow-sm" />
            <span className="text-pink-600 dark:text-pink-400">
              {translate("Seleccionado")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-black border border-gray-700 shadow-sm" />
            <span className="text-gray-800 dark:text-gray-200">
              {translate("Ocupado")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-300 border border-blue-400 shadow-sm" />
            <span className="text-blue-700 dark:text-blue-200">
              {translate("Disponible")}
            </span>
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
              {translate("Tus perchas")}
            </h3>
            <p className="text-sm text-gray-600">
              <strong>{translate("Total:")}</strong> {totalPerchasOcupadas}{" "}
              {translate("percha(s) ocupada(s)")}
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
              {translate("Total a pagar:")}
              <span className="text-blue-700 ml-2">${totalAPagar}</span>
            </p>
            <button
              onClick={handlePagar}
              className="bg-green-500 hover:bg-green-600 cursor-pointer text-white text-sm font-medium px-4 py-2 rounded shadow"
            >
              {translate("Pagar")}
            </button>
          </div>
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
     {showPaymet && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
    <div className="bg-white dark:bg-[#003459] p-6 rounded-xl shadow-2xl max-w-md w-full animate-fade-in">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Confirmar Pago
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Total a pagar:
            <strong className="text-blue-700 dark:text-blue-300 ml-2">
              ${totalAPagar}
            </strong>
          </p>
        </div>

        <form onSubmit={handleSumbit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Monto
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              ${totalAPagar}
              </span>
              <input
      type="number"
      step="0.01"
      min="0"
      className="w-full pl-10 pr-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-[#003459] border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
      value={totalAPagar}
      disabled
    />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Descripción
            </label>
            <input
            onChange={handleChange}
            name="descripcion"
            value={formData.descripcion}
                  type="text"
              className="w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-[#003459] border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
              placeholder="Ej: Pago por percha"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
            onChange={handleChange}
            name="email"
            value={formData.email}
              type="email"
              className="w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-[#003459] border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
              placeholder="ejemplo@email.com"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowPaymet(false)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-[#4b5c68] transition-colors duration-300 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-green-600 font-medium shadow-sm transition-colors duration-300"
            >
              Confirmar Pago
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
      <AddKayakModal
        isOpen={mostrarModalAddKayak}
        onClose={() => setMostrarModalAddKayak(false)}
        perchaId={perchaId}
      />
    </div>
  );
}
