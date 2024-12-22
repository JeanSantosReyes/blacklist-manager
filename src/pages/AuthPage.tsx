import { useState, useRef, ChangeEvent, KeyboardEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyApi } from '../services';
import { useAuth } from '../context';

const AuthPage: FC = () => {

    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [code, setCode] = useState<string[]>(new Array(6).fill(''));
    const [error, setError] = useState<string>('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const isDigit = (value: string): boolean => {
        return value.length === 1 && !isNaN(Number(value));
    };

    const handleChange = (value: string, index: number): void => {
        if (isDigit(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            setError('');
            // Focus en el siguiente input de entrada
            if (index < 5 && value) {
                inputRefs.current[index + 1]?.focus();
            }
            // Enviar formulario al ingresar el ultimo dígito
            if (index === 5 && newCode.every((digit) => digit !== '')) {
                handleSubmit(newCode.join(''));
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
        if (e.key === 'Backspace') {
            const newCode = [...code];
            if (newCode[index]) {
                newCode[index] = '';
            } else if (index > 0) {
                newCode[index - 1] = '';
                inputRefs.current[index - 1]?.focus();
            }
            setCode(newCode);
            setError('');
        }
    };

    const handleSubmit = (codeString: string): void => {
        try {
            verifyApi(codeString)
                .then(() => {
                    setAuth(true);
                    navigate('/app');
                })
                .catch(() => {
                    setError('Código incorrecto. Inténtalo de nuevo.');
                    setCode(new Array(6).fill(''));
                    inputRefs.current[0]?.focus();
                })
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div className='d-flex vh-100 align-items-center'>
            <div style={{ textAlign: 'center', maxWidth: '400px', height: '200px', margin: '0 auto' }}>
                <h2>Bienvenido</h2>
                <p>Accede a la aplicación de autenticación en tu teléfono móvil y escribe el código temporal aquí.</p>

                <div className='d-flex justify-content-center' style={{ gap: '10px', margin: '20px 0' }}>
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            type='text'
                            value={digit}
                            maxLength={1}
                            ref={(el) => (inputRefs.current[index] = el)}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index)}
                            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
                            style={{
                                width: '40px',
                                height: '40px',
                                fontSize: '20px',
                                textAlign: 'center',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        />
                    ))}
                </div>

                {error && <p className='text-danger'>{error}</p>}

            </div>
        </div>
    )
}
export default AuthPage