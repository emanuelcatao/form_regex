  # Validação de formulário com RegEx
  
  Esse projeto é resultado do estudo de RegEx em Linguagens Formais. Com o intuito de aproveitar a oportunidade, decidi por incluir uma integração com api do notion para salvar os dados válidos enviados por meio dos campos de formulário à api. Aqui as expressões regulares são usadas para validar campos segundo esse formato:

<b>Nome:</b>
No máximo 50 símbolos alfabéticos e espaço [a-zA-Z ]. </br></br>
<b>CPF:</b> somente algarismos numéricos [0-9] ou algarismos no formato padrão do CPF "000.000.000-00", ou seja, com ponto na posições 3 e 7 da string e hífen na posição 11. </br></br>
<b>E-mail:</b> o nome de usuário deverá ter no mínimo 2 símbolos alfanuméricos, ponto ou underline [\w\._] seguido de '@', que por sua vez concatena com o domínio (utilizar a mesma regra do nome do usuário). Para terminar, depois do domínio, deverá ter, obrigatoriamente, um ponto seguido do tipo de registro, que é formado por três símbolos alfabéticos minúsculos [a-z].</br></br>
<b>Telefone:</b> dois formatos possíveis, sendo o primeiro constituído por somente 11 números; e o segundo pelo "(00)00000-0000".</br>

O projeto foi executado em next e typescript (meu typescript é horrível, então releva aí, vlw 😜)
