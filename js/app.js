const DEFAULT_INPUT = '';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  render() {
    return React.createElement('div', { id: 'app' },
      React.createElement('h2', null, `${this.state.date.getFullYear()}/${this.state.date.getMonth()}/${this.state.date.getDate()}`),
      React.createElement(Todo, { name: 'main' }, null),
    );
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    const items = localStorage.getItem('items');

    this.state = {
      inputValue: DEFAULT_INPUT,
      items: items ? JSON.parse(items) : [],
      name: props.name,
    };
  }

  addItem = () => {
    if (this.state.inputValue) {
      this.state.items.push(this.state.inputValue);
      this.setState({ inputValue: DEFAULT_INPUT });
      this.updateStorage(this.state.items);  
    }
  }

  deleteItem = (index) => {
    const newItems = this.state.items.filter((itemValue, itemIndex) => {
      return itemIndex != index;
    });
    this.setState({ items: newItems });
    this.updateStorage(newItems);
  }

  updateStorage = (items) => {
    localStorage.setItem('items', JSON.stringify(items));
  }

  changeInput = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    return React.createElement('div', null,
      React.createElement('div', { class: 'u-full-width' },
        React.createElement('input', { 
          onChange: this.changeInput, 
          value: this.state.inputValue, 
          type: 'text', 
          placeholder: 'What do you need todo? ', 
          id: 'add-input'
        }, null),
        React.createElement('button', { onClick: this.addItem, id: 'action-button' }, '+'),
      ),
      React.createElement('div', null,
        this.state.items.map((item, index) => {
          return React.createElement('div', { class: 'u-full-width' },
            React.createElement('p', { class: 'todo-item' }, `${item}`),
            React.createElement('button', { onClick: () => { this.deleteItem(index) }, id: 'action-button' }, 'V'),
          )
        }),
      ),
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App, null, null));
