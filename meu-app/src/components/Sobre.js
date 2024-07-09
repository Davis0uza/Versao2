import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import image1 from '../Assets/Contactos-photo.jpg';

function Sobre() {
    return (
        <div>
            <Container fluid className="sobre-container">
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col md={8} className="text-center text-white">
                        <h1 className="mb-4">Simplificamos o processo de transação!</h1>
                        <p className="lead">
                            Este site baseia-se numa plataforma que facilita não apenas a compra de jogos digitais, mas também a sua revenda entre os usuários, proporcionando um ambiente seguro, confiável e conveniente para transações online.
                        </p>
                    </Col>
                </Row>
            </Container>
            <div className='text-descritivo'>
                <Row className="justify-content-center align-items-center">
                    <Col md={6} className="text-black">
                        <p className="lead2">
                            Neste site o comprador consegue fazer registo, tem biblioteca de software porém não tem acesso a dados nem histórico das vendas. O vendedor também faz o registo, este tem que subscrever o plano para ativar a página empresarial e só depois é que ele pode efetuar compras, ter biblioteca, publicar jogos, dlcs, editar ou eliminar artigos, ter acesso às estatísticas das vendas da página como stock total vendido e do volume de vendas mensais através de gráficos e widgets.
                            O admin é um perfil privado, este não pode comprar artigos, tem acesso à lista de vendedores e dos seus respetivos produtos, pode bloquear ou eliminar produtos ou utilizadores. Também consegue editar os jogos em destaque e pôr o site em modo de manutenção e adicionar programas à lista de programas  bloqueados.
                        </p>
                    </Col>
                    <Col md={6} className="image-column">
                        <Image src={image1} alt="Icon or Image" className="content-image" fluid />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Sobre;