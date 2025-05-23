import KayakList from "../../kayakList/KayakList";


const HistorialKayaks = () =>{
    return(
        <>
            <div className="w-full p-4">
              <h4>
                Tus alquileres anteriores
              </h4>
            </div>
            <div className="flex justify-center w-full m-auto">
                <KayakList/>
            </div>
        </>
    )
}

export default HistorialKayaks;