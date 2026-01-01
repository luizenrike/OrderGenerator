document.addEventListener('DOMContentLoaded', () => {
    const btnSendOrder = document.getElementById('btnSendOrder');
    const btnClearLog = document.getElementById('btnClearLog');

    btnSendOrder.addEventListener('click', async () => {
        const ativo = document.getElementById('ativo').value;
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const preco = parseFloat(document.getElementById('preco').value);
        const lado = document.getElementById('compra').checked ? "C" : "V";
        const enderecoAPI = document.getElementById('enderecoAPI').value;

        if (!ativo || isNaN(quantidade) || isNaN(preco)) {
            addLog({sucesso: false, msg_erro: "Por favor, preencha todos os campos corretamente." });
            return;
        }

        const payload = {
            ativo: ativo,
            lado: lado,
            quantidade: quantidade,
            preco: preco
        };

        try {
            const response = await fetch(enderecoAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            addLog(result);

        } catch (error) {
            addLog({ sucesso: false, msg_erro: "Falha na conexão com a API : " + error.message});
        }
    });

    btnClearLog.addEventListener('click', () => {
        clearLog();
    });

});

function addLog(payload) {
    const consoleLog = document.getElementById('console_log');

    const timestamp = new Date().toLocaleTimeString();
    const formattedJson = JSON.stringify(payload, null, 2);

    consoleLog.textContent += `\n[${timestamp}]\n${formattedJson}\n`;
    consoleLog.scrollTop = consoleLog.scrollHeight;
}

function clearLog(){
   const consoleLog = document.getElementById('console_log');
   consoleLog.textContent = ''; 
}