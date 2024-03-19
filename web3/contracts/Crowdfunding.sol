// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    // Para mapaer dentro de campaigns
    mapping(uint256 => Campaign) public campaigns;

    // Número de campañas que se han creado
    uint256 public numberOfCampaigns = 0;

    // public especifica si la funcion se puede usar en el Frontend, se debe especificar si retorna algo (numero)
    function createCampaign(
        address _owner, 
        string memory _title, 
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns(uint256) {
        // Rellena el array de campaigns con objetos basados en el Campaign 
        Campaign storage campaign = campaigns[numberOfCampaigns];

        // requiere es un if y no va a proseguir con el código si la condición no se satisface
        require(campaign.deadline < block.timestamp, "Choose a date in the future.");

        // instancia los parametros
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        // incrementa el número de campañas que se han creado
        numberOfCampaigns++;

        // Retorna el index de la campaña nueva
        return numberOfCampaigns - 1;
    }

    // public denota que no es una funcion interna, payable denota que se va a enviar crypto con la función
    function donateToCampaign(uint256 _id) public payable {
        // crea nueva variable para el monto que se enviara desde el frontend
        uint256 amount = msg.value;

        // trae la campaña a la cual se quiere donar
        Campaign storage campaign = campaigns[_id];

        // pushea el address del donador al array de donadores de la campaña
        campaign.donators.push(msg.sender);
        // pushea el monto que se quiere donar de la campaña
        campaign.donations.push(amount);


        // REALIZA TRANSACCION: sent es una variable booleana que informa si la transaccion se envió o no, payable le envía el dinero al owner de la campaña, se usa "," porque payable retorna 2 valores
        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        // si se envió aumenta el valor de lo enviado al monto total de la campaña
        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    // view especifica que retorna data que solo está disponible para leer, retorna un array de adresses en memoria que guardamos previamente y un array de números de las cantidades de donaciones guardadas previamente en memoria
    function getDonators(uint256 _id) view public returns(
        address[] memory, 
        uint256[] memory
    ) {
        // retorna los valores guardados en los arrays de donadores y donaciones de la campaña especifica
        return(campaigns[_id].donators, campaigns[_id].donations);
    }

    // retorna el array de campañas
    function getCampaigns() view public returns(Campaign[] memory)  {
        // crea nueva variable "allCampaigns" de tipo array con items con la estructura de "Campaign" y las crea tantas veces como existan "numberOfCampaigns" retornando un array de items con estructura de Campaigns vacíos
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        // loop para popular el array
        for(uint i = 0; i < numberOfCampaigns; i++) {
            // crea nueva variable "item" que traerá cada campaña de storage "campaigns"
            Campaign storage item = campaigns[i];

            // traemos las campañas del storage con la función de arriba y las populamos al nuevo array de "allCampaigns"
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}