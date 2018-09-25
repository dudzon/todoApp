var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoForm = function (_React$Component) {
    _inherits(TodoForm, _React$Component);

    function TodoForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TodoForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TodoForm.__proto__ || Object.getPrototypeOf(TodoForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            todos: [],
            todosList: [],
            validFormTitle: false,
            validFormDescription: true

            // They say that refs are obsolete but this is very small application so sometimes they come in handy
        }, _this.titleInput = React.createRef(), _this.descriptionInput = React.createRef(), _this.handleTitleChange = function (event) {
            // Reversing to the initial title state after submitting the form or negative validation 
            _this.clearFormStateTitle();
            var newTitle = event.target.value;
            _this.setState(function (prevState) {
                return {
                    todos: Object.assign({}, prevState.todos, {
                        title: newTitle
                    })
                };
            });
            _this.validateTitleInput();
        }, _this.clearFormStateTitle = function () {
            _this.setState({
                validFormTitle: false
            });
        }, _this.handleDescriptionChange = function (event) {
            // Reversing to the initial input description state. It's true because this field is optional when validated.  
            _this.clearFormStateDescription();
            var newDescription = event.target.value;
            _this.setState(function (prevState) {
                return {
                    todos: Object.assign({}, prevState.todos, {
                        description: newDescription
                    })
                };
            });
            _this.validateDescriptionInput();
        }, _this.clearFormStateDescription = function () {
            _this.setState({
                validFormDescription: true
            });
        }, _this.handleSubmit = function (event) {
            event.preventDefault();

            // Validation if the given conditions are met

            if (_this.state.validFormTitle && _this.state.validFormDescription) {
                _this.setState(function (prevState) {
                    return {
                        todosList: [].concat(_toConsumableArray(prevState.todosList), [_this.state.todos])
                    };
                });
            }
            // Just to be sure what's going on :)
            console.log('\'New todo added: ' + _this.state.todos.title + ' ' + _this.state.todos.description + ' ');
            console.log(_this.state);

            // Clear the current todo, waiting for another 
            _this.clearTodos();
        }, _this.clearTodos = function () {
            _this.setState(function (prevState) {
                return {
                    todos: Object.assign({}, prevState.todos, {
                        title: '',
                        description: ''
                    })
                };
            });
        }, _this.checkValidity = function () {
            var checkTitleLength = _this.titleInput.current.value.length;
            var checkDescLength = _this.descriptionInput.current.value.length;

            if (!_this.state.validFormTitle) {
                if (checkTitleLength < 10) {
                    alert('Tytuł za krótki');
                }
                if (checkTitleLength > 255) {
                    alert('Tytuł za długi');
                }
            }
            if (!_this.state.validFormDescription) {
                if (checkDescLength > 255) {
                    alert('Opis za długi');
                }
            }
        }, _this.removeLastTodo = function (event) {
            event.preventDefault();
            var newTodoList = _this.state.todosList.slice();
            var removeLast = newTodoList.splice(newTodoList.length - 1, 1);
            _this.setState({ todosList: newTodoList });
        }, _this.removeAllTodos = function (event) {
            event.preventDefault();
            _this.setState({
                todosList: []
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // Updating the todo title 

    _createClass(TodoForm, [{
        key: 'validateTitleInput',


        //  Validating the length of the title input

        value: function validateTitleInput() {
            var checkLength = this.titleInput.current.value.length;
            if (checkLength >= 10 && checkLength <= 255) {
                this.setState({
                    validFormTitle: true
                });
            }
        }

        // Helper function for title input 

        // Updating the todo description 

    }, {
        key: 'validateDescriptionInput',


        //  Validating the length of the description input

        value: function validateDescriptionInput() {
            var checkLength = this.descriptionInput.current.value.length;
            if (checkLength > 255) {
                this.setState({
                    validFormDescription: false
                });
            }
        }

        // Helper function for description input 

        //  Form submission


        //   Check if the inputs value met the given conditions

        //  That's clear 


        // That's also clear

    }, {
        key: 'render',
        value: function render() {
            var todosTitle = this.state.todosList.length ? 'Twoje tuduusy :( ' : 'Fajrant, nie masz tuduusów :)';
            var todoItem = void 0;
            if (this.state.todosList.length) {
                todoItem = this.state.todosList.map(function (item, index) {
                    return React.createElement(
                        'div',
                        { className: 'px-0', key: index },
                        React.createElement(
                            'h3',
                            { style: { color: 'red' } },
                            ' ',
                            item.title,
                            ' '
                        ),
                        React.createElement(
                            'p',
                            null,
                            ' ',
                            item.description
                        )
                    );
                });
            }
            return React.createElement(
                'div',
                { className: 'container mt-5' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-sm-12 col-md-6 mx-auto my-0' },
                        React.createElement(
                            'form',
                            { action: '', method: '', onSubmit: this.handleSubmit },
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'todoTitle' },
                                    'Todo title'
                                ),
                                React.createElement('input', { type: 'text', className: 'form-control', id: 'todoTitle', 'aria-describedby': 'todoTitle', placeholder: 'Enter Todo', name: 'todoTitle', onChange: this.handleTitleChange, value: this.state.todos.title, ref: this.titleInput, required: true })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    { 'for': 'todoDesc' },
                                    'Todo Description'
                                ),
                                React.createElement('textarea', { type: 'text', className: 'form-control', id: 'todoDesc', placeholder: 'Todo Description', name: 'todoDesc', rows: '10', onChange: this.handleDescriptionChange, value: this.state.todos.description, ref: this.descriptionInput })
                            ),
                            React.createElement(
                                'div',
                                { className: 'd-flex justify-content-sm-between' },
                                React.createElement(
                                    'button',
                                    { type: 'submit', className: 'btn btn-primary mr-5', onClick: this.checkValidity },
                                    'Add Todo'
                                ),
                                React.createElement(
                                    'button',
                                    { className: 'btn btn-danger mr-5', onClick: this.removeAllTodos },
                                    'Clear Todos'
                                ),
                                React.createElement(
                                    'button',
                                    { className: 'btn btn-warning', onClick: this.removeLastTodo },
                                    'Remove Todo'
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'h2',
                    { className: 'mt-5 text-center' },
                    todosTitle
                ),
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { className: 'col-sm-12 col-md-6 mx-auto my-0' },
                        todoItem
                    )
                )
            );
        }
    }]);

    return TodoForm;
}(React.Component);

var root = document.querySelector('#root');
ReactDOM.render(React.createElement(TodoForm, null), root);