import React from 'react';
import Aos from 'aos';
import Form from './components/Form';
import Card from './components/Card';
import Header from './components/Header';
import DeckFilters from './components/DeckFilters';
import 'aos/dist/aos.css';
import Footer from './components/Footer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      token: '',
      isSaveButtonDisabled: true,
      tryunfoDeck: [],
      /**
       * Criação de um estado que guarda o backup do baralho original, sugestão do aluno Carlos Rosa:
       * Fonte -> https://github.com/tryber/sd-017-project-tryunfo/pull/2
      */
      tryunfoDeckBackup: [],
      hasTrunfo: false,
      nameFilter: '',
      rareFilter: 'todas',
      trunfoFilter: false,
    };
  }

  componentDidMount() {
    Aos.init({ duration: 1000 });
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.ableButton);
  }

  /**
   * Consultado o repositório do aluno Pedro Goulart como referência para o uso do método Number()
   * Link -> https://github.com/tryber/sd-017-project-tryunfo/pull/57/commits/aca956df5135f59eb6717ff9efe327020516a4b1
   */

  ableButton = () => {
    this.onClickFilter();
    // Desconstrução dos estados
    const { cardName, cardImage, cardDescription, cardRare,
      cardAttr1, cardAttr2, cardAttr3 } = this.state;
    // Variáveis para não usar magic number nas verificações condicionais
    const ATTRLIMITER = 90;
    const ALLATTRSUMLIMITER = 210;
    // Estruturas condicionais
    if (
      cardName !== '' && cardImage !== '' && cardDescription !== '' && cardRare !== ''
      && Number(cardAttr1) >= 0 && Number(cardAttr1) <= ATTRLIMITER
      && Number(cardAttr2) >= 0 && Number(cardAttr2) <= ATTRLIMITER
      && Number(cardAttr3) >= 0 && Number(cardAttr3) <= ATTRLIMITER
      && Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= ALLATTRSUMLIMITER
    ) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  onSaveButtonClick = () => {
    const { cardName, cardDescription, cardImage, cardRare, cardTrunfo,
      cardAttr1, cardAttr2, cardAttr3 } = this.state;
    this.setState((prevState) => ({
      tryunfoDeck: [...prevState.tryunfoDeck, {
        cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardTrunfo,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        token: JSON.stringify(Math.random()),
      }],
      tryunfoDeckBackup: [...prevState.tryunfoDeck, {
        cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardTrunfo,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        token: JSON.stringify(Math.random()),
      }],
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: cardTrunfo ? true : prevState.hasTrunfo,
    }));
  }

  onClickDelete = ({ target }) => {
    const { tryunfoDeck } = this.state;
    // Recuperação do elemento pai ao clicar no botão excluir
    const selectedCard = target.parentElement.firstChild;
    const recoveredId = selectedCard.getAttribute('id');
    // Novo array com cartas excluidas
    const newTryunfoDeck = tryunfoDeck.filter((card) => card.token !== recoveredId);

    this.setState({
      tryunfoDeck: newTryunfoDeck,
      tryunfoDeckBackup: newTryunfoDeck,
    }, () => {
      const hasTrunfo = newTryunfoDeck.some((card) => card.cardTrunfo === true);
      return hasTrunfo ? this.setState({ hasTrunfo: true })
        : this.setState({ hasTrunfo: false });
    });
  }

  /**
   * A lógica base para a função onClickFilter foi derivada do repositório do aluno Jotta Novaes
   * Link -> https://github.com/tryber/sd-017-project-tryunfo/pull/84
   */
  onClickFilter = () => {
    const { tryunfoDeckBackup, nameFilter, rareFilter, trunfoFilter } = this.state;
    const filteredDeck = tryunfoDeckBackup.filter((card) => card.cardName.toLowerCase()
      .includes(nameFilter.toLowerCase())
        && (card.cardRare === rareFilter || rareFilter === 'todas')
        && (card.cardTrunfo || !trunfoFilter));
    this.setState({
      tryunfoDeck: filteredDeck,
    });
    return filteredDeck;
  };

  render() {
    const
      {
        cardName,
        cardDescription,
        cardAttr1, cardAttr2, cardAttr3, cardImage,
        cardRare,
        cardTrunfo,
        isSaveButtonDisabled,
        hasTrunfo,
        token,
        tryunfoDeck,
      } = this.state;
    return (
      <>
        <Header />
        <div className="container-fluid d-flex flex-row py-5">
          <div className="container-fluid d-flex flex-column justify-content-around ms-4">
            <h2 className="fs-2 text-center mb-5" data-aos="fade-down">
              Adicionar Nova Carta
            </h2>
            <Form
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              hasTrunfo={ hasTrunfo }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onInputChange={ this.onInputChange }
              onSaveButtonClick={ this.onSaveButtonClick }
            />
          </div>
          <div className="container-fluid d-flex flex-column align-items-center h-75">
            <h2 className="fs-2 text-center mb-5" data-aos="fade-left">
              Pré Visualização da Carta
            </h2>
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
          </div>
        </div>
        <div className="container-fluid p-0">
          <DeckFilters onInputChange={ this.onInputChange } />
          <div
            className="container-fluid d-flex flex-row flex-wrap
          justify-content-around align-items-center"
          >
            {
              tryunfoDeck.map((card) => (
                <div
                  className="content d-flex flex-column align-items-center"
                  key={ card.token }
                >
                  <Card
                    key={ token }
                    token={ card.token }
                    cardName={ card.cardName }
                    cardImage={ card.cardImage }
                    cardAttr1={ card.cardAttr1 }
                    cardAttr2={ card.cardAttr2 }
                    cardAttr3={ card.cardAttr3 }
                    cardTrunfo={ card.cardTrunfo }
                    cardRare={ card.cardRare }
                    cardDescription={ card.cardDescription }
                  />
                  <button
                    type="button"
                    data-testid="delete-button"
                    className="btn btn-primary my-5"
                    onClick={ this.onClickDelete }
                  >
                    Excluir
                  </button>
                </div>
              ))
            }
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
