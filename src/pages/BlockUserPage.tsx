import { useNavigate } from 'react-router-dom';
import { addCustomerToBlacklist } from '../services';
import { FC, useState } from 'react';
import { Phone, UserCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const BlockUserPage: FC = () => {

    interface FormData {
        name: string;
        number: string;
    }

    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        number: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addCustomerToBlacklist(formData)
            .catch(error => console.log(error))
            .finally(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Contacto bloqueado correctamente.',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        title: 'swal-title-custom'
                    }
                });
                navigate('/');
            })
    }

    return (
        <div className='container py-5'>
            <div className='form-container'>
                <div className='card'>
                    <div className='card-body'>
                        <div className='text-center mb-4'>
                            <h1 className='h2 mb-3'>Blacklist</h1>
                            <p className='text-muted'>
                                Agrega clientes a la lista negra
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label htmlFor='name' className='form-label'>
                                    Nombre
                                </label>
                                <div className='input-group'>
                                    <span className='input-group-text'>
                                        <UserCircle size={20} />
                                    </span>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='name'
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        placeholder='John Doe'
                                        required
                                    />
                                </div>
                            </div>

                            <div className='mb-4'>
                                <label htmlFor='number' className='form-label'>
                                    Número de teléfono
                                </label>
                                <div className='input-group'>
                                    <span className='input-group-text'>
                                        <Phone size={20} />
                                    </span>
                                    <input
                                        type='tel'
                                        className='form-control'
                                        id='number'
                                        value={formData.number}
                                        onChange={(e) =>
                                            setFormData({ ...formData, number: e.target.value })
                                        }
                                        placeholder='593 XXX XXX XXXX'
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type='submit'
                                className='btn w-100'
                                style={{ backgroundColor: '#2c2c54', color: 'white' }}
                            >
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BlockUserPage