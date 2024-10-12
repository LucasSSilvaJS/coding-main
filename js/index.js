(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

const botaoLimpar = document.getElementById('limpar');
const form = document.forms['formulario'];

const formSchema = {};

function limparFormulario(){
    form.reset();
}

function enviarFormulario(event){
    event.preventDefault();
    transformarArrayEmObjeto();
    console.log(formSchema);
    alert('Enviado com sucesso');
}

function obterValoresSelectMultiplo(){
    const selectElement = document.getElementById('linguagem');
    const linguagensSelecionadas = Array.from(selectElement.selectedOptions).map(option => option.value);
    return linguagensSelecionadas;
}

function transformarArrayEmObjeto(){
    const formData = new FormData(form);
    const dados = Array.from(formData.entries());
    dados.forEach(([chave, valor]) => formSchema[chave] = valor);
    formSchema.linguagem = obterValoresSelectMultiplo();
}

function verificarObrigatoriedadeCheckbox(){
    const turnos = document.querySelectorAll('input[type=checkbox]');
    
    turnos.forEach(turno => {
        turno.addEventListener('change', () => {
            const foiChecado = Array.from(turnos).some(turno => turno.checked === true);
            if(foiChecado){
                turnos.forEach(turno => turno.required = false);
            }else{
                turnos.forEach(turno => turno.required = true);
            }
        });
    });
}

function aplicarMascara(){
    const telefoneInput = document.getElementById('telefone');
    VMasker(telefoneInput).maskPattern('(99) 99999-9999');
}

aplicarMascara();
verificarObrigatoriedadeCheckbox();

botaoLimpar.addEventListener('click', limparFormulario);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(form.checkValidity()){
        enviarFormulario(e);
    }else{
        alert('Erro ao enviar o formulário!')
    }
});