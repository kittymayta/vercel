import Login from '../src/pages/login/login';
import { render, screen } from '@testing-library/react';
import { GoogleOAuthProvider } from '@react-oauth/google';


test('renders Login', async() => {
  render(
    <GoogleOAuthProvider clientId="338339807279-3fke3b892u4vr6hq23kn0at1f8tabl3p.apps.googleusercontent.com">
        <Login />
    </GoogleOAuthProvider>);
    // Verificar que este el texto inicial
  expect(
    screen.getByText('Plataforma de Gestión documental para la acreditación y certificación de laboratorios e institutos de investigación')
  ).toBeInTheDocument();
  
  // Ver si renderiza las imagenes
  expect(screen.getByTestId('Imagen fondo')).toBeInTheDocument();
  expect(screen.getByAltText('Imagen 1')).toBeInTheDocument(); // Logo Unsa
  expect(screen.getByAltText('Imagen 2')).toBeInTheDocument(); // Logo del isntituto

  //Renderizar el boton de google
  expect(screen.getByTestId('Boton Google')).toBeInTheDocument();

  // Mensjae de error
  const errorMessage = screen.queryByText(/Error en el inicio de sesión/i);
  expect(errorMessage).not.toBeInTheDocument(); // Al inicio sin mensaje ps

  // Elementos del Footer
  expect(screen.getByText(/vri.institutoinvestigacion@unsa.edu.pe/i)).toBeInTheDocument();
  expect(screen.getByText(/\+51 916 559 387/i)).toBeInTheDocument();
  expect(screen.getByText(/Dirección de Instituto de Investigación - UNSA/i)).toBeInTheDocument();
});