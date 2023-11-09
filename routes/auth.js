/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express'); // Importamos el router de Express.
const router = Router(); // Guardamos el Router de Express, en una variable.
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post(
    '/new', 
    [   // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 carácteres').isLength({ min: 6}),
        validarCampos
    ], 
    crearUsuario );

router.post('/', 
    [ // middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 carácteres').isLength({ min: 6}),
        validarCampos
    ], loginUsuario );

router.get('/renew', validarJWT, revalidarToken);

module.exports = router; // Exportamos el router cómo un módulo.