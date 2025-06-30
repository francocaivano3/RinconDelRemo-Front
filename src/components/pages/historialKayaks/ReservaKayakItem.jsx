


const ReservaKayakItem = () =>{

    
    return(
        <>
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"></div>
                        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">

                            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl w-[90%] sm:w-[900px] shadow-xl">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                    Confirmar reserva del kayak : {kayak.nombre}
                                </h3>
                                <div className="grid grid-cols-2 gap-3 m-7">
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Ruler size={18} className="mr-2 text-gray-400 dark:text-white" />
                                        <span className="text-sm">{kayak.longitud}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Users size={18} className="mr-2 text-gray-400 dark:text-white" />
                                        <span className="text-sm">{kayak.capacidad}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Package size={18} className="mr-2 text-gray-400 dark:text-white" />
                                        <span className="text-sm">{kayak.material}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Calendar size={18} className="mr-2 text-gray-400 dark:text-white" />
                                        <span className="text-sm">{kayak.fechaCompra}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Calendar size={18} className="mr-2 text-gray-400 dark:text-white" />
                                        <span className="text-sm">Tu reserva comienza : {stringNow}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Calendar size={18} className="mr-2 text-gray-400 dark:text-white" />
                                        <span className="text-sm">Tu reserva finaliza : {stringOneHourLater}</span>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowEditModal(false)}
                                        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg">
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => handleReservationCofirm()}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
    )
}


export default ReservaKayakItem;