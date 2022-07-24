const DEFAULT_INPUT = '';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  render() {
    return React.createElement('div', null,
      React.createElement('h1', null, 'Microtodo'),
      React.createElement('h2', null, `${this.state.date.getFullYear()}/${this.state.date.getMonth()}/${this.state.date.getDate()}`),
      React.createElement(Todo, { name: 'main' }, null),
    );
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: DEFAULT_INPUT,
      items: [],
      name: props.name,
    };
  }

  addItem = () => {
    if (this.state.inputValue) {
      this.state.items.push(this.state.inputValue);
      this.setState({ inputValue: DEFAULT_INPUT });
    }
  }

  deleteItem = (index) => {
    const newItems = this.state.items.filter((itemValue, itemIndex) => {
      return itemIndex != index;
    });
    this.setState({ items: newItems });
  }

  changeInput = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    return React.createElement('div', null,
      React.createElement('ul', null,
        this.state.items.map((item, index) => {
          return React.createElement('li', null,
            `${item}`,
            React.createElement('button', { onClick: () => { this.deleteItem(index) } }, 'Done'),
          )
        }),
      ),
      React.createElement('div', null,
        React.createElement('input', { onChange: this.changeInput, value: this.state.inputValue, type: 'text', placeholder: 'What do you need todo? ' }, null),
        React.createElement('button', { onClick: this.addItem }, 'Add item'),
      ),
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App, { toWhat: 'World!' }, null));
// root.render(React.createElement(Button, null, null));