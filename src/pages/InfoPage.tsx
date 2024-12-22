const InfoPage: React.FC = () => {
    return (
        <div className='container'>
            <header className='text-center py-1'>
                <h1>Administración de Blacklist</h1>
            </header>
            <main className='my-3'>
                <p>
                    La Blacklist es una lista de contactos bloqueados que no pueden interactuar con el chatbot. Este sistema permite gestionar de manera eficiente las interacciones no deseadas.
                </p>
                <h2 className='mb-3'>Características Principales</h2>
                <ul>
                    <li className='mb-2'>Agregar usuarios a la lista negra fácilmente.</li>
                    <li className='mb-2'>Eliminar usuarios de la lista cuando sea necesario.</li>
                    <li className='mb-2'>Sincronización con bases de datos para garantizar persistencia.</li>
                    <li className='mb-2'>Interfaz intuitiva para una gestión sencilla.</li>
                </ul>
            </main>
            <footer className='bg-light text-center py-3'>
                <p className='mb-0'>Desarrollado por Jean Santos para una gestión eficiente del sistema de chatbot.</p>
            </footer>
        </div>
    )
}
export default InfoPage