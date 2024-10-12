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

function addWasValidate(){
    form.classList.add('was-validated');
}

function aplicarMascara(){
    const telefoneInput = document.getElementById('telefone');
    VMasker(telefoneInput).maskPattern('(99) 99999-9999');
}

aplicarMascara();

verificarObrigatoriedadeCheckbox();

botaoLimpar.addEventListener('click', limparFormulario);
form.addEventListener('submit', enviarFormulario);