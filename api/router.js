const express = require('express');
const router = express.Router(); //retorna um middleware


module.exports = function (server) {

    //passando o router para o servidor para a url /api 
    server.use('localhost', router);

    const schoolService = require('./school_service');
    router.get('/get_all_students', schoolService.findAllStudents);
    // router.post('/usuarios', autenticacaoService.registrar);
    // router.post('/usuarios/master', autenticacaoService.registrarUsuarioMaster);
    // router.post('/login', autenticacaoService.login);
    // router.post('/login/:id_conta', autenticacaoService.login); // Login após ter passado pelos multi vínculos
    // router.put('/usuario', autenticacaoService.salvarUsuario);
    // router.get('/usuarios', autenticacaoService.findAllUsuarios);
    // router.get('/usuario/:email', autenticacaoService.findUsuarioByEmail);
    // router.get('/usuario/:id_conta/:email', autenticacaoService.findUsuarioByIdContaByEmail);
    // router.delete('/usuario/:_id', autenticacaoService.deletarUsuario); // Atualizar/Editar cliente
    // router.put('/usuario/:email', autenticacaoService.alterarSenha);
    // router.put('/alterar_senha_admin/:email/:id_conta', autenticacaoService.alterarSenhaAdmin);
    // router.post('/esqueceu_senha', autenticacaoService.esqueceu_senha);
    // router.post('/recuperar_senha/alterar/:id_conta/:id_usuario', autenticacaoService.alterarSenhaRecuperar);
    // router.post('/recuperar_senha/verifica_token', autenticacaoService.verificaTokenEsqueceuSenha);
    // router.get('/nova_senha/:token', autenticacaoService.verificaTokenSenha);
    // router.put('/nova_senha', autenticacaoService.alterarSenhaEsquecida);
    // router.get('/renew_token/:email', autenticacaoService.renovarToken);
    // router.get('/n_usuarios', autenticacaoService.getNUsuarios); // Contar

    return router;
};
