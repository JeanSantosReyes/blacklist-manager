import { useNavigate } from 'react-router-dom';
import { actionBlock } from '../services';

const BlockUser: React.FC = () => {

    const navigate = useNavigate();

    // eslint-disable-next-line
    const addBlock = (number: string) => {
        actionBlock('add', number)
            .catch(error => console.log(error))
            .finally(() => navigate('/'))
    }

    return (
        <>
            {/* Sección de hero */}
            <section className='hero bg-primary text-white text-center d-flex align-items-center justify-content-center' style={{ height: '90vh' }}>
                <div>
                    <h1>Transformamos ideas en realidades</h1>
                    <p className='lead'>Desarrollamos soluciones tecnológicas personalizadas para tu negocio</p>
                    <a href='#services' className='btn btn-light btn-lg'>Descubre más</a>
                </div>
            </section>

            {/* Sección de servicios */}
            <section id='services' className='container my-5'>
                <div className='text-center mb-5'>
                    <h2>Nuestros Servicios</h2>
                    <p className='lead'>Ofrecemos una gama completa de servicios tecnológicos para satisfacer tus necesidades</p>
                </div>
                <div className='row text-center'>
                    <div className='col-md-4'>
                        <div className='card shadow-sm'>
                            <div className='card-body'>
                                <h3 className='card-title'>Desarrollo de Software</h3>
                                <p className='card-text'>Creamos aplicaciones a medida para optimizar tus procesos y mejorar tu productividad.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card shadow-sm'>
                            <div className='card-body'>
                                <h3 className='card-title'>Consultoría TI</h3>
                                <p className='card-text'>Te ayudamos a implementar la mejor estrategia tecnológica para tu negocio.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card shadow-sm'>
                            <div className='card-body'>
                                <h3 className='card-title'>Ciberseguridad</h3>
                                <p className='card-text'>Protege tu empresa con nuestras soluciones avanzadas en seguridad informática.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default BlockUser